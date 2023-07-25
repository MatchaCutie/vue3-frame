<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in"> -->
    <keep-alive v-if="cachedViews.includes($route.name)">
      <router-view />
    </keep-alive>
    <router-view v-else />
    <!-- </transition> -->
  </section>
</template>

<script>
import useStore from '@/stores'
import { mapState } from 'pinia'
export default {
  name: 'AppMain',
  computed: {
    ...mapState(useStore, {
      cachedViews: (store) => store.tagsView.cachedViews,
      username: (store) => store.user.name
    }),
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
#yanduApp {
  position: fixed;
  top: 10%;
  left: 0%;
  width: 280px;
  height: 460px;
  z-index: 9999;
  display: none;
}
</style>
