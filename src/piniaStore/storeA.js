import { defineStore } from 'pinia';

export const storeA = defineStore('storeA', {
  state: () => {
    return {
      piniaMsg: 'hello aofei',
    };
  },
  // 动态设置state
  getters: {},
  // 可异步获取state
  actions: {},
});
