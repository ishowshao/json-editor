<template>
    <div id="app">
        <div class="components">
            <h3>模块列表</h3>
            <div>
                <el-button size="small" @click="addBlock(`block`)">空白模块</el-button>
            </div>
            <h3>组件列表</h3>
            <div>
                <el-button size="small" @click="addComponent(`background`)">背景颜色组件</el-button>
            </div>
            <div>
                <el-button size="small" @click="addComponent(`size`)">调整宽高组件</el-button>
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

import block from './components/components/block/';
import background from './components/components/background/';
import size from './components/components/size/';
import ObjectEditor from './components/editor/ObjectEditor.vue';

const componentsMap = {
    block,
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
            schema: {},
            output: null,
            page: {
                blocks: [],
            },
        };
    },
    computed: {
        pageData() {
            return this.page;
            // return this.components.map(c => {
            //     return {
            //         name: c.name,
            //         data: c.data,
            //     };
            // });
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
            this.gen(component);
        },
        increase(component) {
            console.log(component);
        },
        addBlock(type) {
            const {schema, component, name} = componentsMap[type];
            const item = {
                id: String(Math.random()).substr(2, 5),
                name: name,
                active: false,
                schema: schema,
                component: component,
                components: [],
            };
            this.components.push(item);
        },
        addComponent(block, type) {
            const {schema, component, name} = componentsMap[type];
            const item = {
                id: String(Math.random()).substr(2, 5),
                name: name,
                active: false,
                schema: schema,
                component: component,
                data: {},
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
    },
    mounted() {
        let pageData = window.localStorage.getItem('data');
        if (pageData) {
            pageData = JSON.parse(pageData);
            pageData.forEach(comp => {
                const {schema, component, name} = componentsMap[comp.name];
                const item = {
                    id: String(Math.random()).substr(2, 5),
                    name: name,
                    active: false,
                    schema: schema,
                    component: component,
                    data: comp.data,
                };
                this.components.push(item);
            });
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
