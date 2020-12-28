<template>
    <div id="app">
        <div class="components">
            <h3>组件列表</h3>
            <div>
                <el-button size="small" @click="addToCanvas(`background`)">背景颜色组件</el-button>
            </div>
            <div>
                <el-button size="small" @click="addToCanvas(`size`)">调整宽高组件</el-button>
            </div>
        </div>
        <div class="canvas">
            <h3>画布</h3>
            <div class="container">
                <div v-for="comp in components" :key="comp.id" :class="{active: comp.active}" @click="active(comp)">
                    <component v-bind:is="comp.component" :config="comp.data"></component>
                </div>
            </div>
        </div>
        <div class="form">
            <h3>表单</h3>  
            <el-form v-show="comp.active" v-for="comp in components" :ref="`form${comp.id}`" :key="comp.id" label-width="80px">
                <object-editor v-if="comp.schema" :ref="`root${comp.id}`" :schema="comp.schema" :instanceData="comp.data" @change="onChange(comp)"></object-editor>
                <el-button @click="save(comp)">保存</el-button>
            </el-form>
        </div>
        <div class="output">
            <h3>表单数据</h3>
            <code><pre>{{output}}</pre></code>
        </div>
        <div class="page">
            <h3>页面结构</h3>
            <code><pre>{{pageData}}</pre></code>
            <el-button @click="savePageData">保存</el-button>
        </div>
    </div>
</template>

<script>
import em from '@/lib/em';

import schema2output from '@/lib/output';

import background from './components/components/background/';
import size from './components/components/size/';
import ObjectEditor from './components/editor/ObjectEditor.vue';

const componentsMap = {
    background,
    size,
};

export default {
    name: 'App',
    components: {
        ObjectEditor,
    },
    data() {
        return {
            textarea: '',
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
        gen(component) {
            this.schema = null;
            this.$nextTick(() => {
                this.schema = component.schema;
            });
        },
        save(component) {
            const value = this.$refs[`root${component.id}`][0].getValue();
            console.log(value);
            this.output = value;
            // emit
            em.emit('change', component.id, value);
        },
        onChange(component) {
            const value = this.$refs[`root${component.id}`][0].getValue();
            console.log(value);
            this.output = value;
            // emit
            em.emit('change', component.id, value);
        },
        active(component) {
            console.log('active', component);
            this.components.forEach(c => c.active = false);
            component.active = true;
            const schema = component.schema;
            schema.id = component.id;
            this.textarea = JSON.stringify(schema, null, '  ');
            this.gen(component);
        },
        increase(component) {
            console.log(component);
        },
        addToCanvas(type) {
            const {schema, component, name} = componentsMap[type];
            const item = {
                id: String(Math.random()).substr(2, 5),
                name: name,
                active: false,
                schema: schema,
                component: component,
                data: {
                    color: '#00ff00'
                },
            };
            this.components.push(item);
        },
        savePageData() {
            window.localStorage.setItem('data', JSON.stringify(this.pageData));
        },
    },
    created() {
        em.on('change', (id, data) => {
            console.log(id, 'changed', data);
            this.components.forEach(comp => {
                if (comp.id === id) {
                    // Object.assign(comp.data, data);
                    comp.data = data;
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
