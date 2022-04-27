<template>
  <div>
    <el-dialog
      :title="$t('label.feedbackTitle')"
      v-model="visiable"
      :close-on-click-modal="false"
      @opened="openDialog"
    >
      <div
        class="border-t border-b border-solid border-gray-200 max-h-48 overflow-y-auto"
        ref="history"
      >
        <div v-if="nothingTip" class="text-center text-gray-400 text-xs py-5">
          <span class="tip_content">{{ $t('tip.noFeedbackLog') }}</span>
        </div>
        <div
          class="sent_message pb-4 text-right mr-4"
          v-for="(message, index) in cookie"
          :key="index"
        >
          <div class="text-xs text-gray-400">{{ message.split(',')[0] }}</div>
          <i class="iconfont iconchenggong"></i>
          <div
            class="bg-gray-200 rounded text-center inline-block px-3 py-1 max-w-6xl"
          >
            <p class="text-gray-900 text-justify inline-block m-auto">
              {{ message.split('=')[1] }}
            </p>
            <div class="text-xs text-gray-400 text-right mt-1">
              {{ message.split(',')[1].split('=')[0] }}
            </div>
          </div>
        </div>
      </div>
      <el-form :model="form" :rules="rules" ref="formRef" label-position="top" class="mt-6">
        <el-form-item :label="$t('label.email')" prop="name">
          <el-col :span="11">
            <el-input
              v-model="form.name"
              :placeholder="$t('placeHolder.email')"
              prefix-icon="el-icon-message"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('label.feedBackContent')" prop="massage">
          <el-input
            v-model="form.massage"
            type="textarea"
            :autosize="{ minRows: 6 }"
            :placeholder="$t('placeHolder.content')"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeFeedBack">{{ $t('label.cancel') }}</el-button>
        <el-button type="primary" @click="feedBack">{{
          $t('label.send')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, unref, toRaw } from 'vue'
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElCol,
  ElInput,
  ElButton,
  ElMessage,
  FormInstance,
  FormRules,
} from 'element-plus/dist/index.full'

export default defineComponent({
  components: {
    ElDialog,
    ElForm,
    ElFormItem,
    ElCol,
    ElInput,
    ElButton,
  },
  props: {
    visiable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['fbDialogVisiable'],
  setup(_, context) {
    const state = reactive({
      nothingTip: true,
      cookie: [],
      form: {
        name: '',
        massage: '',
      },
    })
    const checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的邮箱地址'))
    }
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: '请输入您的邮箱地址', trigger: 'blur' },
        { validator: checkEmail, trigger: 'blur' },
      ],
      massage: [
        { required: true, message: '请输入反馈的内容', trigger: 'blur' },
      ],
    })
    const history = ref(null)
    const formRef = ref<FormInstance>()
    const openDialog = () => {
      if (process.client) {
        history.scrollTop = history.scrollHeight
      }
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    const closeFeedBack = () => {
      context.emit('fbDialogVisiable')
      resetForm(formRef)
    }

    const getCookie = () => {
      if (process.client) {
        const cookie = document.cookie.split(';')
        cookie.forEach((item) => {
          if (item.indexOf('@') != -1 && state.cookie.indexOf(item) == -1) {
            return state.cookie.push(item)
          }
        })
        if (state.cookie.length != 0) {
          state.nothingTip = false
          state.form.name = state.cookie[state.cookie.length - 1]
            .split(',')[0]
            .trim()
        }
      }
    }

    const feedBack = () => {
      ;async (formEl: FormInstance | undefined) => {
        if (!formEl) return false
        await formEl.validate(async (valid) => {
          if (!valid) return false
          const { data: res } = await useFetch('/feedBack/massage', {
            params: state.form,
            method: 'post',
          })
          const response = toRaw(unref(res))
          if (response.code !== 200) {
            return ElMessage.error({ message: '发送失败！', center: true })
          } else {
            const newDate = new Date()
            const name = `${state.form.name},${newDate.toLocaleString()}`
            const message = state.form.massage
            if (process.client) {
              document.cookie = `${name}=` + message
            }
            getCookie()
            ElMessage.success({
              message: '发送成功，请耐心等待回复！',
              center: true,
            })
            state.form.massage = ''
            formEl.clearValidate()
          }
        })
      }
    }

    return {
      ...toRefs(state),
      rules,
      openDialog,
      closeFeedBack,
      feedBack,
    }
  },
})
</script>

<style lang="scss" scoped>
.tip_content::before {
  content: '';
  width: 70px;
  height: 1px;
  background-color: #dee1e6;
  display: inline-block;
  position: relative;
  top: -5px;
  left: -8px;
}

.tip_content::after {
  content: '';
  width: 70px;
  height: 1px;
  background-color: #dee1e6;
  display: inline-block;
  position: relative;
  top: -5px;
  left: 8px;
}

.sent_message:nth-child(1) {
  padding-top: 15px;
}
</style>
