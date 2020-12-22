<template>
    <div id="app">
        <div class="canvas">
            <h4>画布</h4>
            <div>
                <div>comp1</div>
                <div>comp2</div>
            </div>
        </div>
        <div class="schema">
            <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea"> </el-input>
            <el-button @click="gen">生成</el-button>
        </div>
        <div class="form">
            <el-form ref="form" label-width="80px">
                <object-generator ref="root" :schema="schema" :output="output"></object-generator>
                <el-form-item>
                    <el-button @click="generateOutput">生成output</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="output">
            <h4>output</h4>
            <code><pre>{{output}}</pre></code>
        </div>
    </div>
</template>

<script>
import input from '@/assets/input.json';
import schema2output from '@/lib/output';
import ObjectGenerator from './components/ObjectGenerator.vue';

export default {
    name: 'App',
    components: {
        ObjectGenerator
    },
    data() {
        return {
            textarea: JSON.stringify(input, null, '  '),
            schema: {},
            output: null,
        };
    },
    methods: {
        gen() {
            this.schema = JSON.parse(this.textarea);
        },
        generateOutput() {
            const value = this.$refs['root'].getValue();
            console.log(value);
            this.output = value;
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
.canvas {
    width: 20vw
}
.schema {
    width: 30vw;
    padding: 10px;
    box-sizing: border-box;
}
.form {
    width: 20vw;
}
.output {
    padding: 0 10px;
    width: 30vw;
}
</style>
