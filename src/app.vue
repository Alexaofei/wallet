<template>
  <img class="enter" @click="togglePop" :src="pic" alt="" />
  <Transition name="pop">
    <div v-show="show" class="pop_wrapper">
      <ul class="nav nav-tabs">
        <li v-for="(item, index) in tabList" :key="index" class="nav-item">
          <a :class="`nav-link ${item.active ? 'active' : ''}`" @click="switchNav(index)">{{ item.name }}</a>
        </li>
      </ul>
      <div class="tab-content">
        <Tokens v-if="tabList[0].active" />
      </div>
    </div>
  </Transition>
</template>
<script>
import { ref, reactive } from 'vue';
import pic from './assets/logo.jpg';
import Tokens from './components/tokens/index.vue';
import { storeA } from '@/piniaStore/storeA';
export default {
  components: { Tokens },
  setup() {
    const piniaStoreA = storeA();
    console.log(piniaStoreA.piniaMsg);
    let show = ref(false);
    const tabList = reactive([
      {
        name: 'Tokens',
        active: true,
      },
      {
        name: 'Settings',
        active: false,
      },
    ]);
    return {
      tabList,
      show,
      pic: chrome.runtime ? chrome.runtime.getURL('images/logo.jpg') : pic,
      piniaStoreA,
    };
  },
  async mounted() {},
  methods: {
    redirect(type) {
      switch (type) {
        case 1:
          window.open(chrome.runtime.getURL('index.html'));
          break;
        case 2:
          this.$router.push('/pageA');
          break;
      }
    },
    togglePop() {
      this.piniaStoreA.piniaMsg = 'changed';
      this.show = !this.show;
    },
    switchNav(index) {
      console.log(this.tabList);
      this.tabList.forEach((v, i) => {
        v.active = +i === +index;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.enter {
  position: fixed;
  width: 50px;
  left: 20px;
  top: calc(100vh / 2 - 25px);
  z-index: 9999;
  cursor: pointer;
}
.pop_wrapper {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 25%;
  background: #fff;
  z-index: 9999;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px 0 0 10px;
}
.pop-enter-active,
.pop-leave-active {
  transition: right 0.3s ease;
}
.pop-enter-from,
.pop-leave-to {
  right: -25%;
}
.nav-link {
  cursor: pointer;
}
.tab-content {
  padding: 20px 10px;
}
</style>
