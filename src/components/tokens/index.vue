<template>
  <div class="list-item" v-for="(item, index) in coins" :key="index">
    <img class="icon" :src="item.picSrc" alt="" />
    <div>
      <div class="name">{{ item.name }}</div>
      <div class="num">{{ item.num }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import pic from '../../assets/logo.jpg';
import { storeA } from '@/piniaStore/storeA';
const piniaStoreA = storeA();
const picSrc = chrome.runtime ? chrome.runtime.getURL('images/logo.jpg') : pic;
const coins = reactive([
  {
    name: 'ETH',
    num: '1.34',
    usd: '2356',
    picSrc,
  },
  {
    name: 'XPET',
    num: '0',
    usd: '0',
    picSrc,
  },
  {
    name: 'BPET',
    num: '0',
    usd: '0',
    picSrc,
  },
]);

onMounted(() => {
  setInterval(() => {
    console.log(piniaStoreA.piniaMsg);
  }, 3000);
  console.log('this is tokensPage');
});
function changeName() {
  name.b = 'b';
}
</script>

<style lang="less" scoped>
@import '../../style/style.less';
@iconWidth: 35px;
.list-item {
  position: relative;
  background: #f1f1f1;
  height: @iconWidth;
  box-sizing: content-box;
  padding: 15px;
  padding-left: 15px + @iconWidth + 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  .icon {
    position: absolute;
    left: 15px;
    width: @iconWidth;
    border-radius: 30px;
  }
  .name {
    font-size: 13px;
    font-weight: bold;
    color: @gray;
  }
  .num {
    color: #999;
  }
}
</style>
