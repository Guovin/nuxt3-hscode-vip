<template>
  <div class="barcode">
    <div id="title">{{ $t('label.barcode') }}</div>
    <div class="row">
      <div class="format">
        <span class="title">{{ $t('label.format') }}</span>
        <el-cascader
          v-model="value"
          :show-all-levels="false"
          :options="barcodeOptions"
          :props="{ expandTrigger: 'hover' }"
        >
        </el-cascader>
      </div>
      <div class="width">
        <span class="title">{{ $t('label.width') }}</span>
        <el-input v-model="width" @blur="widthChange"></el-input>
      </div>
      <div class="width">
        <span class="title">{{ $t('label.height') }}</span>
        <el-input v-model="height" @blur="heightChange"></el-input>
      </div>
      <div class="color">
        <span class="title">{{ $t('label.color') }}</span>
        <el-color-picker
          v-model="color"
          @change="colorChange"
        ></el-color-picker>
        <div class="printDouble" v-show="pcStatus === false">
          <el-checkbox v-model="doublePrint" @change="doubleChange">{{
            $t('label.double')
          }}</el-checkbox>
        </div>
      </div>
      <div class="border-container">
        <span v-show="pcStatus === true" class="tip-text font-text">{{
          $t('label.font')
        }}</span>
        <div class="fontSize">
          <span class="title">{{ $t('label.size') }}</span>
          <el-input v-model="fontSize" @blur="fontChange"></el-input>
        </div>
        <div class="textMargin">
          <span class="title">{{ $t('label.barcode') }}</span>
          <el-input v-model="textMargin" @blur="textChange"></el-input>
        </div>
      </div>
      <div class="border-container" v-show="pcStatus === true">
        <span class="tip-text layout-text">{{ $t('label.layout') }}</span>
        <div class="printMargin">
          <span class="title">{{ $t('label.span') }}</span>
          <el-input v-model="barcodeBottom" @blur="bottomChange"></el-input>
        </div>
        <div class="printDouble">
          <el-checkbox v-model="doublePrint" @change="doubleChange">{{
            $t('label.double')
          }}</el-checkbox>
        </div>
        <div class="printBorder">
          <el-checkbox v-model="borderPrint" @change="doubleChange">{{
            $t('label.border')
          }}</el-checkbox>
        </div>
      </div>
    </div>
    <div class="text">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 12 }"
        :placeholder="$t('placeHolder.barcode')"
        v-model="text"
      >
      </el-input>
    </div>
    <div class="button">
      <el-button
        type="primary"
        @click="createBarCode"
        class="buttonYes"
        icon="el-icon-circle-check"
        >{{ $t('label.submit') }}</el-button
      >
      <el-tooltip
        v-if="saveStatus || status"
        class="item"
        effect="dark"
        :content="saveTip"
        placement="top"
      >
        <el-button
          type="success"
          @click="saveBarCode"
          class="buttonYes"
          icon="el-icon-download"
          >{{ $t('label.save') }}
        </el-button>
      </el-tooltip>
      <el-button
        type="warning"
        @click="printBarCode"
        class="buttonYes"
        v-if="status"
        icon="el-icon-printer"
        >{{ $t('label.print') }}
      </el-button>
    </div>
    <div class="canvas-show-div" v-show="status || saveStatus"></div>
    <div class="canvas" v-show="false">
      <img id="code" class="code" />
    </div>
    <iframe id="iframe" name="iframeName" style="display: none"> </iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { options } from '~/barcode'
import JsBarcode from 'jsbarcode'
import {
  ElCascader,
  ElInput,
  ElColorPicker,
  ElCheckbox,
  ElButton,
  ElTooltip,
  ElMessage,
} from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElCascader,
    ElInput,
    ElColorPicker,
    ElCheckbox,
    ElButton,
    ElTooltip,
  },
  setup() {
    const barcodeOptions = options
    const state = reactive({
      text: '',
      width: 2,
      height: 80,
      fontSize: 20,
      textMargin: 2,
      color: '#000000',
      value: ['CODE128', 'CODE128'],
      status: false,
      saveStatus: false,
      base64: [],
      imgSrc: [],
      pcStatus: true,
      barcodeBottom: 50,
      nowBottom: 50,
      doublePrint: true,
      borderPrint: false,
      saveTip: '',
    })

    const barCode = (id, text) => {
      JsBarcode(id, text, {
        format: state.value.length == 0 ? state.value[0] : state.value[1],
        lineColor: state.color,
        width: state.width,
        height: state.height,
        fontSize: state.fontSize,
        displayValue: true,
        textMargin: state.textMargin,
      })
    }

    const createBarCode = () => {
      if (process.client) {
        let text = state.text
        if (text != '') {
          let canvasTag = document.getElementsByClassName('canvas')[0]
          if (state.status == true || state.saveStatus == true) {
            canvasTag.innerHTML = ''
            let canvas = document.createElement('img')
            canvas.id = 'code'
            canvas.className = 'code'
            canvasTag.appendChild(canvas)
          }
          let textList = text.split('\n')
          try {
            textList.forEach((item, index) => {
              let id
              if (item == '') {
                return
              }
              if (index == 0) {
                id = '#code'
              } else {
                id = '#code' + index
                let canvas = document.createElement('img')
                canvas.id = 'code' + index
                canvas.className = 'code'
                canvasTag.appendChild(canvas)
              }
              barCode(id, item)
            })
            if (isPC()) {
              state.status = true
            } else {
              state.saveStatus = true
            }
            createPrint()
            let html = document.getElementsByClassName('code')
            Array.prototype.forEach.call(html, (item) => {
              state.imgSrc.push(item.src)
            })
            return ElMessage.success({
              message: '生成条形码成功！',
              center: true,
            })
          } catch (error) {
            console.log(error)
            return ElMessage.error({
              message: '请输入符合格式的数据！',
              center: true,
            })
          }
        } else {
          return ElMessage.error({
            message: '请输入条形码数据！',
            center: true,
          })
        }
      }
    }

    const createPrint = () => {
      let imgTag = document.getElementsByClassName('code')
      let iframe = document.getElementById('iframe')
      let table = document.createElement('table')
      table.style.width = '100%'
      if (state.borderPrint) {
        table.style.border = '1px solid #dcdfe6'
      }
      table.style.borderRadius = '4px'
      let allTrDiv = document.createElement('div')
      let newTr
      Array.prototype.forEach.call(imgTag, (item, index) => {
        let newImg = document.createElement('img')
        let imgTd = document.createElement('td')
        if (state.borderPrint) {
          imgTd.style.border = '1px solid #dcdfe6'
        }
        imgTd.style.borderRadius = '4px'
        imgTd.style.textAlign = 'center'
        newImg.src = item.src
        imgTd.appendChild(newImg)

        if (state.doublePrint === true) {
          imgTd.style.width = '50%'
          if (index % 2 == 0) {
            newTr = document.createElement('tr')
            newTr.appendChild(imgTd)
            if (index === imgTag.length - 1) {
              allTrDiv.appendChild(newTr)
            }
          } else {
            newTr = newTr.cloneNode(true)
            newTr.appendChild(imgTd)
            allTrDiv.appendChild(newTr)
            allTrDiv.appendChild(allTrDiv.cloneNode())
          }
        } else {
          imgTd.style.width = '100%'
          newTr = document.createElement('tr')
          newTr.appendChild(imgTd)
          allTrDiv.appendChild(newTr)
          allTrDiv.appendChild(allTrDiv.cloneNode())
        }
        newTr.style.height = state.barcodeBottom + 'px'
      })
      let newTbody = document.createElement('tbody')
      Array.prototype.forEach.call(allTrDiv.childNodes, (tr) => {
        newTbody.appendChild(tr)
      })
      table.appendChild(newTbody)
      let newTableDiv = document.createElement('div')
      newTableDiv.appendChild(table)
      iframe.contentDocument.body.innerHTML = newTableDiv.innerHTML
      let canvasDiv = document.getElementsByClassName('canvas-show-div')[0]
      canvasDiv.innerHTML = ''
      canvasDiv.appendChild(table)
      state.nowBottom = state.barcodeBottom
    }

    const printBarCode = () => {
      if (state.nowBottom != state.barcodeBottom) {
        createPrint()
      }
      window.frames['iframeName'].print()
    }
    const widthChange = () => {
      if (state.width == '') {
        state.width = 2
      }
    }
    const heightChange = () => {
      if (state.height == '') {
        state.height = 80
      }
    }
    const fontChange = () => {
      if (state.fontSize == '') {
        state.fontSize = 20
      }
    }
    const textChange = () => {
      if (state.textMargin == '') {
        state.textMargin = 2
      }
    }
    const colorChange = () => {
      if (state.color == null) {
        state.color = '#000000'
      }
    }
    const bottomChange = () => {
      if (state.barcodeBottom == '') {
        state.barcodeBottom = 50
      }
    }
    // 双排打印勾选事件
    const doubleChange = () => {
      // 重新生成打印内容
      createPrint()
    }
    // 判断PC端
    const isPC = () => {
      if (process.client) {
        var userAgentInfo = navigator.userAgent
        var Agents = new Array(
          'Android',
          'iPhone',
          'SymbianOS',
          'Windows Phone',
          'iPad',
          'iPod'
        )
        var flag = true
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false
            break
          }
        }
        return flag
      }
    }
    // 保存图片
    const saveFile = (data, filename) => {
      try {
        const save_link = document.createElementNS(
          'http://www.w3.org/1999/xhtml',
          'a'
        )
        save_link.href = data
        save_link.download = filename

        const event = document.createEvent('MouseEvents')
        event.initMouseEvent(
          'click',
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        )
        save_link.dispatchEvent(event)
      } catch (e) {
        throw new Error(e)
      }
    }

    const saveBarCode = () => {
      if (isPC()) {
        saveFile(state.imgSrc[0], 'hscodeVip-barCode')
      } else {
        state.saveTip = '请长按图片进行保存'
      }
    }

    if (isPC() === true) {
      state.pcStatus = true
      state.width = 2
      state.height = 80
      state.fontSize = 20
    }
    if (isPC() === false) {
      state.pcStatus = false
      state.width = 1
      state.height = 50
      state.fontSize = 10
    }

    return {
      barcodeOptions,
      ...toRefs(state),
      widthChange,
      heightChange,
      doubleChange,
      fontChange,
      textChange,
      bottomChange,
      colorChange,
      createBarCode,
      saveBarCode,
      printBarCode,
    }
  },
})
</script>
