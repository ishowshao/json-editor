<template>
    <div id="app">
        <div class="canvas">
            <div>添加组件：</div>
            <div>
                <el-button size="small">背景颜色组价</el-button>
                <el-button size="small">调整宽高组件</el-button>
            </div>
            <h4>画布</h4>
            <div class="container">
                <div v-for="comp in components" :key="comp.id" :class="{active: comp.active}" @click="active(comp)">
                    <h6>{{comp.name}}</h6>
                    <div :style="{width: (comp.data.width ? `${comp.data.width}px` : `0px`), height: (comp.data.height ? `${comp.data.height}px` : `0px`), border: `1px solid black`}"></div>
                    <el-button @click="increase(comp)">+</el-button>
                </div>
            </div>
        </div>
        <div class="schema">
            <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea"> </el-input>
            <el-button @click="gen">生成</el-button>
        </div>
        <div class="form">
            <el-form ref="form" label-width="80px">
                <object-generator v-if="schema" ref="root" :schema="schema"></object-generator>
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
import em from '@/lib/em';
import input from '@/assets/input.json';
import input2 from '@/assets/input2.json';

import schema2output from '@/lib/output';
import ObjectGenerator from './components/ObjectGenerator.vue';
const schemas = {
    comp1: input,
    comp2: input2,
};

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
            components: [
                {
                    id: 'comp1',
                    name: 'comp1',
                    active: true,
                    schema: input,
                    data: {},
                },
                {
                    id: 'comp2',
                    name: 'Block',
                    active: false,
                    schema: input2,
                    data: {
                        width: 10,
                        height: 10,
                    },
                },
                {
                    id: 'comp3',
                    name: 'Block',
                    active: false,
                    schema: input2,
                    data: {},
                },
            ]
        };
    },
    methods: {
        gen() {
            this.schema = null;
            this.$nextTick(() => {
                this.schema = JSON.parse(this.textarea);
            });
        },
        generateOutput() {
            const value = this.$refs['root'].getValue();
            console.log(value);
            this.output = value;
            // emit
            em.emit('change', value.id, value);
        },
        active(component) {
            this.components.forEach(c => c.active = false);
            component.active = true;
            const schema = component.schema;
            schema.id = component.id;
            this.textarea = JSON.stringify(schema, null, '  ');
        },
        increase(component) {
            console.log(component);
        },
    },
    created() {
        em.on('change', (id, data) => {
            console.log(id, 'changed', data);
            this.components.forEach(comp => {
                if (comp.id === id) {
                    Object.assign(comp.data, data);
                }
            });
        });
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
.container > div {
    box-sizing: border-box;
    border: 1px solid #ffffff;
}
.container .active {
    border: 1px solid #cccccc;
}
</style>
