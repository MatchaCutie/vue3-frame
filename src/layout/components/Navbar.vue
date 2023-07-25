<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img :src="avatar" class="user-avatar"> -->
          <span class="user-name text-base mr-1">{{ name }}</span>
          <el-icon class="bottom-arrow"><CaretBottom /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOut">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import useStore from '@/stores'
import userStore from '@/stores/modules/user'
import useAppStore from '@/stores/modules/app'
import { mapState, mapWritableState, mapActions } from 'pinia'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(useStore, {
      sidebar: (store) => store.app.sidebar,
      device: (store) => store.app.device,
      avatar: (store) => store.user.avatar,
      name: (store) => store.user.nickName
    }),
    ...mapWritableState(useStore, {
      showSettings: (store) => store.setting.showSettings
    }),
    setting: {
      get() {
        return this.showSettings
      },
      set(val) {
        this.showSettings = val
      }
    }
  },

  created() {},
  methods: {
    ...mapActions(userStore, ['logout']),
    ...mapActions(useAppStore, ['toggleSidebar']),
    toggleSideBar() {
      this.toggleSidebar()
    },
    async logOut() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout().then(() => {
          location.href = '/pipat/login'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right: 30px;
      .user-avatar {
        margin: 5px 10px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .avatar-wrapper {
        float: right;
        .user-name {
          height: 50px;
          line-height: 50px;
          text-align: center;
          display: inline-block;
        }
        .bottom-arrow {
          vertical-align: -2px;
          margin-left: 2px;
        }
      }
    }
  }
}
</style>
