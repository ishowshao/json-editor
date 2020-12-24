<template>
    <div id="app">
        <div class="components">
            <h3>组件列表</h3>
            <div>
                <el-button size="small" @click="addToCanvas(`background`)">背景颜色组件</el-button>
            </div>
            <div>
                <el-button size="small">调整宽高组件</el-button>
            </div>
        </div>
        <div class="canvas">
            <h3>画布</h3>
            <div class="container">
                <div v-for="comp in components" :key="comp.id" :class="{active: comp.active}" @click="active(comp)">
                    <component v-bind:is="comp.component"></component>
                </div>
            </div>
        </div>
        <div class="form">
            <h3>表单</h3>  
            <el-form ref="form" label-width="80px">
                <object-generator v-if="schema" ref="root" :schema="schema"></object-generator>
            </el-form>
            <el-button @click="generateOutput">保存</el-button>
        </div>
        <div class="output">
            <h3>表单数据</h3>
            <code><pre>{{output}}</pre></code>
        </div>
        <div class="page">
            <h3>页面结构</h3>
            <code><pre>{{pageData}}</pre></code>
        </div>
    </div>
</template>

<script>
import em from '@/lib/em';
import input from '@/assets/input.json';
import input2 from '@/assets/input2.json';

import schema2output from '@/lib/output';
import ObjectGenerator from './components/ObjectGenerator.vue';

import background from './components/canvas/background';

const schemas = {
    comp1: input,
    comp2: input2,
};

const componentsMap = {
    background: background,
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
            components: []
        };
    },
    computed: {
        pageData() {
            return this.components.map(c => {
                return {
                    name: c.name,
                    data: c.data,
                };
            });
        }
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
            console.log('active', component);
            this.components.forEach(c => c.active = false);
            component.active = true;
            const schema = component.schema;
            schema.id = component.id;
            this.textarea = JSON.stringify(schema, null, '  ');
            this.gen();
        },
        increase(component) {
            console.log(component);
        },
        addToCanvas(type) {
            const {schema, component} = componentsMap[type];
            const item = {
                id: String(Math.random()).substr(2, 5),
                name: schema.title,
                active: false,
                schema: schema,
                component: component,
                data: {},
            };
            this.components.push(item);
        }
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
#app > div {
    width: 20vw;
    box-sizing: border-box;
}
.container > div {
    box-sizing: border-box;
    border: 1px solid #ffffff;
}
.container .active {
    border: 1px solid #cccccc;
}
</style>
