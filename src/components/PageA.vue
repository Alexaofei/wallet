<template>
  <div class="hello">
    <h1>pageA</h1>
    <h2 @click="changeName">{{ name.a }}</h2>
    <h2 @click="changeName">{{ name.b }}</h2>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
const name = reactive({ a: "a" });
onMounted(() => {
  console.info("this is pageA");
});
function changeName() {
  name.b = "b";
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
