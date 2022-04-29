<template>
  <div>
    <el-dialog
      :title="$t('label.feedbackTitle')"
      v-model="dialogVisiable"
      :close-on-click-modal="false"
      @opened="openDialog"
    >
      <div
        class="border-t border-b border-solid border-gray-200 max-h-60 overflow-y-auto dark:bg-black-dark dark:border-gray-800"
        ref="history"
      >
        <div
          v-if="nothingTip"
          class="text-center text-gray-400 text-xs py-5 dark:text-gray-500"
        >
          <div class="flex justify-center">
            <div
              class="w-14 h-px bg-gray-200 relative top-2 dark:bg-gray-700"
            ></div>
            <div class="px-2">{{ $t('tip.noFeedbackLog') }}</div>
            <div
              class="w-14 h-px bg-gray-200 relative top-2 dark:bg-gray-700"
            ></div>
          </div>
        </div>
        <div
          v-else
          class="first:pt-4 pb-4 text-right mr-4"
          v-for="(item, index) in log"
          :key="index"
        >
          <div class="text-xs text-gray-400">{{ item.email }}</div>
          <i
            class="iconfont iconchenggong text-green-500 pr-1 relative top-1"
          ></i>
          <div
            class="bg-gray-200 rounded text-center inline-block px-3 py-1 max-w-6xl dark:bg-gray-800"
          >
            <p
              class="text-gray-900 text-justify inline-block m-auto dark:text-gray-300"
            >
              {{ item.message }}
            </p>
            <div class="text-xs text-gray-400 text-right mt-1">
              {{ item.time }}
            </div>
          </div>
        </div>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-position="top"
        class="mt-6"
      >
        <el-form-item :label="$t('label.email')" prop="email">
          <el-col :span="24">
            <el-input
              v-model="form.email"
              :placeholder="$t('placeHolder.email')"
              :prefix-icon="Message"
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
        <el-button type="danger" plain @click="closeFeedBack(formRef)">{{
          $t('label.cancel')
        }}</el-button>
        <el-button type="primary" plain @click="feedBack(formRef)">{{
          $t('label.send')
        }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  unref,
  toRaw,
  nextTick,
  computed,
} from 'vue'
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
import { Message } from '@element-plus/icons-vue'
import { useFeedBackStore } from '~~/store/feedBack'

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
  setup(props, context) {
    const globalI18n = useState('globalI18n')
    const feedBackStore = useFeedBackStore()
    const log = ref([])
    const state = reactive({
      nothingTip: true,
      form: {
        email: '',
        massage: '',
      },
    })
    const dialogVisiable = computed({
      get() {
        return props.visiable
      },
      set() {},
    })
    const checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(
        new Error(
          globalI18n.value === 'en'
            ? 'Please input the correct email address'
            : '请输入正确的邮箱地址'
        )
      )
    }
    const rules = reactive<FormRules>({
      email: [
        {
          required: true,
          message:
            globalI18n.value === 'en'
              ? 'Please enter your e-mail address'
              : '请输入您的邮箱地址',
          trigger: 'blur',
        },
        { validator: checkEmail, trigger: 'blur' },
      ],
      massage: [
        {
          required: true,
          message:
            globalI18n.value === 'en'
              ? 'Please enter the feedback content'
              : '请输入反馈的内容',
          trigger: 'blur',
        },
      ],
    })
    const history = ref(null)
    const formRef = ref<FormInstance>()
    const openDialog = () => {
      nextTick(() => {
        history.value.scrollTop = history.value.scrollHeight
      })
    }

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    const closeFeedBack = (ref) => {
      context.emit('fbDialogVisiable')
      resetForm(ref)
    }

    const getLog = () => {
      log.value = feedBackStore.log
      if (log.value.length != 0) {
        state.nothingTip = false
        state.form.email = log.value[log.value.length - 1].email
      } else {
        state.nothingTip = true
      }
    }

    getLog()

    const feedBack = async (formEl: FormInstance | undefined) => {
      if (!formEl) return false
      await formEl.validate(async (valid) => {
        if (!valid) return false
        const { data: res } = await useFetch('/feedBack/massage', {
          params: state.form,
          method: 'post',
        })
        const response = toRaw(unref(res))
        if (response.code !== 200) {
          return ElMessage.error({
            message:
              globalI18n.value === 'en' ? 'Failed to send!' : '发送失败！',
            center: true,
          })
        } else {
          const time = new Date().toLocaleString()
          const email = state.form.email
          const message = state.form.massage
          const log = {
            time: time,
            email: email,
            message: message,
          }
          feedBackStore.changeFeedBack(log)
          ElMessage.success({
            message:
              globalI18n.value === 'en'
                ? 'Send successfully, please wait patiently for reply!'
                : '发送成功，请耐心等待回复！',
            center: true,
          })
          getLog()
          state.form.massage = ''
          formEl.clearValidate()
          openDialog()
        }
      })
    }

    return {
      dialogVisiable,
      log,
      ...toRefs(state),
      formRef,
      rules,
      history,
      openDialog,
      closeFeedBack,
      feedBack,
      Message,
    }
  },
})
</script>

<style lang="scss" scoped>
:deep(.el-dialog__title) {
  font-size: 16px;
}
:deep(.el-dialog__body) {
  padding-top: 0;
}
</style>
