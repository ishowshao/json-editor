<template>
  <div id="app">
    <div class="schema">
      <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea">
      </el-input>
      <el-button @click="gen">生成</el-button>
    </div>
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <div>{{form.title}}</div>
        <object-generator :schema="form"></object-generator>
      </el-form>
    </div>
    <div class="output">output</div>
  </div>
</template>

<script>
import schema from '@/assets/input.json'
import ObjectGenerator from './components/ObjectGenerator.vue'

export default {
  name: "App",
  components: {
    ObjectGenerator
  },
  data() {
    return {
      textarea: JSON.stringify(schema, null, '  '),
      form: {
      },
    }
  },
  methods: {
    gen() {
      const schema = JSON.parse(this.textarea);
      for (const i in schema.properties) {
        if (schema.hasOwnProperty(i)) {
          schema[i].value = null;
        }
      }
      this.form = schema;
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
