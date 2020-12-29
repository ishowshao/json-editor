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
                <div v-for="block in page.blocks" :key="block.id" :class="{active: block.active, 'has-active': block.components.find(c => c.active)}" class="block-container" @click="active(block)">
                    <component
                        v-bind:is="block.component"
                        :blockId="block.id"
                        :instanceData="block.data"
                        :components="block.components" @component-active="onComponentActive"></component>
                </div>
            </div>
        </div>
        <div class="form">
            <h3>表单</h3>  
            <el-form v-show="form.active" v-for="form in forms" :ref="`form${form.id}`" :key="form.id" label-width="80px">
                <div>{{form.id}}</div>
                <object-editor v-if="form.schema" :ref="`root${form.id}`" :schema="form.schema" :instanceData="form.data" @change="onChange(form)"></object-editor>
                <el-button @click="save(form)">保存</el-button>
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
            const data = {};
            data.blocks = this.page.blocks.map(block => {
                return {
                    name: block.name,
                    components: [],
                    data: block.data,
                };
            });
            return data;
            // return this.components.map(c => {
            //     return {
            //         name: c.name,
            //         data: c.data,
            //     };
            // });
        },
        forms() {
            const result = [];
            const blocks = this.page.blocks;
            result.push(...blocks);
            for (let i = 0; i < blocks.length; i++) {
                result.push(...blocks[i].components);
            }
            return result;
        }
    },
    methods: {
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
            if (!component.active) {
                this.forms.forEach(c => c.active = false);
                component.active = true;
                const schema = component.schema;
                // this.gen(component);
            }
        },
        onComponentActive(component) {
            console.log(component, 'active');
            if (!component.active) {
                this.forms.forEach(c => c.active = false);
                component.active = true;
            }
        },
        increase(component) {
            console.log(component);
        },
        addBlock(type) {
            const {schema, component, name} = componentsMap[type];
            this.page.blocks.push({
                id: String(Math.random()).substr(2, 5),
                name: name,
                active: false,
                schema: schema,
                component: component,
                components: [],
                data: {},
            });
        },
        addComponent(type) {
            let block = this.page.blocks.find(block => block.active);
            if (!block) {
                this.addBlock('block');
                block = this.page.blocks[this.page.blocks.length - 1];
            }
            const {schema, component, name} = componentsMap[type];
            block.components.push({
                id: String(Math.random()).substr(2, 5),
                name: name,
                active: false,
                schema: schema,
                component: component,
                data: {},
            });
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
.container .block-container.active, .container .block-container.has-active {
    border: 2px solid #81b0ff;
}

.x-component {
    position: absolute;
}
</style>
