<template>
  <div>
    <!-- <el-card v-if="this.$route.path === '/'" class="treeCard"> -->
    <el-card class="hot-card-container">
      <transition name="emerge" appear>
        <keep-alive>
          <div class="hot-card">
            <div class="hot-title">
              <i class="iconfont iconremen"></i>{{ $t('label.hotCode') }}
            </div>
            <el-row :gutter="8">
              <el-col
                v-show="index < 60"
                v-for="(item, index) in hotData"
                :key="index"
                :span="4"
              >
                <div @click="hotSearch(item)" class="hot-small-card">
                  <p>{{ item }}</p>
                </div>
              </el-col>
            </el-row>
            <transition name="hotEmerge">
              <keep-alive>
                <el-row :gutter="8" v-show="showMore">
                  <el-col
                    v-show="index >= 60"
                    v-for="(item, index) in hotData"
                    :key="index"
                    :span="4"
                  >
                    <div @click="hotSearch(item)" class="hot-small-card">
                      <p>{{ item }}</p>
                    </div>
                  </el-col>
                </el-row>
              </keep-alive>
            </transition>
            <el-row class="show-more-row">
              <el-col :span="5">
                <div
                  class="shrink"
                  v-if="hotData.length > 60"
                  @click="toggle()"
                >
                  {{ showMore ? $t('label.fold') : $t('label.showMore') }}
                  <i
                    :class="
                      showMore ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                    "
                  ></i>
                </div>
              </el-col>
            </el-row>
          </div>
        </keep-alive>
      </transition>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { hotCode } from 'public/hotCode'
import { ElCard, ElRow, ElCol } from 'element-plus/dist/index.full'
import Header from './Header.vue'

export default defineComponent({
  components: {
    ElCard,
    ElRow,
    ElCol,
  },
  setup() {
    const { router } = Header
    const hotData = hotCode
    let showMore = ref(false)
    const toggle = () => {
      showMore.value = !showMore.value
    }
    const hotSearch = (item) => {
      router.push({
        path: 'table',
        query: {
          key: encodeURIComponent(item),
        },
      })
    }
    return {
      hotData,
      showMore,
      toggle,
      hotSearch,
    }
  },
})
</script>

<style lang="scss" scoped>
.hot-card-container {
  margin: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 65%;
  background-color: rgba(255, 255, 255, 0.01);
  border: rgba(255, 255, 255, 0.01);
  .hot-card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15) !important;
    padding: 10px 20px 20px 20px;
    .el-row {
      display: flex;
      flex-wrap: wrap;
    }

    .el-col {
      margin-top: 5px;
    }

    .el-card__body {
      padding: 10px 20px 20px 20px;
    }

    .hot-title {
      font-size: 16px;
      color: #f56c6c;
      font-weight: bold;
      margin: 0 auto 10px auto;
      text-align: center;
      .iconfont {
        font-size: 20px;
      }
    }

    .hot-small-card {
      height: 100%;
      text-align: center;
      box-sizing: border-box;
      border: 1px solid rgba(95, 92, 92, 0.1);
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
      border-radius: 5px;
      padding: 20px 0;
      color: #606266;
      &:hover {
        color: #409eff;
        cursor: pointer;
        background-color: rgba(97, 93, 93, 0.06);
      }
    }

    .show-more-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .shrink {
        font-size: 14px;
        cursor: pointer;
        color: grey;
        text-align: center;
        margin-top: 10px;
        &:hover {
          color: #409eff;
        }
      }
    }
    .hotEmerge-enter-active {
      transition: all 0.5s linear;
    }

    .hotEmerge-enter {
      transform: translateY(100%);
    }
  }
}
</style>
