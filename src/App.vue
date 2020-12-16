<template>
  <div id="app">
    <div class="schema">
      <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea">
      </el-input>
    </div>
    <div class="form">form</div>
    <div class="output">output</div>
  </div>
</template>

<script>
import schema from '@/assets/input.json'

export default {
  name: "App",
  components: {},
  data() {
    return {
      textarea: JSON.stringify(schema, null, '  '),
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  display: flex;
}
.schema {
  width: 40vw;
  padding: 10px;
  box-sizing: border-box;
}
.form {
  width: 30vw;
}
</style>
