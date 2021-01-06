<template>
    <div id="app">
        <div class="header">
            <div class="logo">
                <span>建站</span>
            </div>
            <div class="actions">
                <el-button type="primary" @click="savePageData">保存</el-button>
            </div>
        </div>
        <div class="main">
            <div class="components">
                <h3>模块列表</h3>
                <div>
                    <el-button size="small" @click="addBlock(`block`)">空白模块</el-button>
                </div>
                <h3>组件列表</h3>
                <div>
                    <el-button size="small" @click="addComponent(`plain-text`)">简单文本</el-button>
                </div>
                <div>
                    <el-button size="small" @click="addComponent(`background`)">背景颜色组件</el-button>
                </div>
                <div>
                    <el-button size="small" @click="addComponent(`size`)">调整宽高组件</el-button>
                </div>
            </div>
            <div class="canvas-container">
                <div class="canvas" @mousedown="onCanvasMouseDown" @mouseup="onCanvasMouseUp" @mouseleave="onCanvasMouseLeave" @mousemove="onCanvasMouseMove">
                    <div class="container">
                        <div v-for="block in page.blocks" :key="block.id" :class="{active: block.active, 'has-active': block.components.find(c => c.active)}" class="block-container" @click="active(block)" @mousemove="(e) => { onMouseMove(e, block) }">
                            <component
                                v-bind:is="block.component"
                                :blockId="block.id"
                                :instanceData="block.data"
                                :components="block.components"
                                @component-active="onComponentActive"></component>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form">
                <h3>表单</h3>  
                <el-form v-show="form.active" v-for="form in forms" :ref="`form${form.id}`" :key="form.id" label-width="80px">
                    <div>{{form.id}}</div>
                    <object-editor v-if="form.schema" :ref="`root${form.id}`" :schema="form.schema" :instanceData="form.data" @change="onChange(form)"></object-editor>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import eventbus from '@/lib/eventbus';
import id from '@/lib/id';
import schema2output from '@/lib/output';

import block from './components/components/block/';
import background from './components/components/background/';
import size from './components/components/size/';
import plainText from './components/components/plain-text/';

const componentsMap = {
    block,
    background,
    size,
    'plain-text': plainText,
};

export default {
    name: 'App',
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
                    components: block.components.map(c => {
                        return {
                            name: c.name,
                            data: c.data,
                        };
                    }),
                    data: block.data,
                };
            });
            return data;
        },
        forms() {
            console.log('forms active')
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
            eventbus.emit('change', component.id, value);
        },
        onChange(component) {
            const value = this.$refs[`root${component.id}`][0].getValue();
            console.log(value);
            this.output = value;
            // emit
            eventbus.emit('change', component.id, value);
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
        addBlock(block) {
            let name, data;
            if (typeof block === 'string') {
                name = block;
                data = {};
            } else {
                name = block.name;
                data = block.data;
            }
            const {schema, component} = componentsMap[name];
            const item = {
                id: id(),
                name: name,
                active: false,
                schema: schema,
                component: component,
                components: [],
                data: data,
                mouse: {
                    clientX: 0,
                    clientY: 0,
                },
            };
            this.page.blocks.push(item);
            if (typeof block !== 'string') {
                block.components.forEach(component => {
                    this.addComponent(component, item);
                });
            }
            return item;
        },
        addComponent(comp, block = null) {
            let name, data;
            if (typeof comp === 'string') {
                name = comp;
                data = this.getDefaultData(componentsMap[name].schema);
            } else {
                name = comp.name;
                data = comp.data;
            }
            if (!block) {
                block = this.page.blocks.find(block => block.active);
                if (!block) {
                    this.addBlock('block');
                    block = this.page.blocks[this.page.blocks.length - 1];
                }
            }

            const {schema, component} = componentsMap[name];
            const item = {
                id: id(),
                name: name,
                active: false,
                schema: schema,
                component: component,
                data: data,
            };
            block.components.push(item);
        },
        savePageData() {
            window.localStorage.setItem('data', JSON.stringify(this.pageData));
        },
        getDefaultData(schema) {
            return schema2output(schema);
        },
        onMouseMove(e, block) {
            // console.log(e.offsetX, e.offsetY);
            block.mouse.clientX = e.clientX;
            block.mouse.clientY = e.clientY;
        },
        onCanvasMouseMove(e) {
            eventbus.emit('canvas-mousemove', e);
        },
        onCanvasMouseLeave(e) {
            eventbus.emit('canvas-mouseleave', e);
        },
        onCanvasMouseDown(e) {
            eventbus.emit('canvas-mousedown', e);
        },
        onCanvasMouseUp(e) {
            eventbus.emit('canvas-mouseup', e);
        },
    },
    created() {
        eventbus.on('change', (id, data) => {
            console.log(id, 'changed', data);
            const blocks = this.page.blocks;
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.id === id) {
                    block.data = data;
                    return;
                } else {
                    const components = block.components;
                    for (let j = 0; j < components.length; j++) {
                        const c = components[j];
                        if (c.id === id) {
                            c.data = data;
                            return;
                        }
                    }
                }
            }
        });
    },
    mounted() {
        let pageData = window.localStorage.getItem('data');
        if (pageData) {
            pageData = JSON.parse(pageData);
            pageData.blocks.forEach(block => {
                this.addBlock(block);
            });
        }
    }
};
</script>

<style>
body {
    margin: 0;
}
.header {
    display: flex;
    position: absolute;
    top: 0;
    width: 100vw;
    height: 64px;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.08);
}
.header .logo {
    width: 200px;
    line-height: 64px;
}
.header .actions {
    text-align: right;
    line-height: 64px;
    flex: 1;
    padding-right: 40px;
}
.main {
    display: flex;
    position: absolute;
    top: 64px;
    bottom: 0;
    left: 0;
    right: 0;
}
.components {
    width: 20vw;
}
.canvas-container {
    width: 50vw;
    overflow-y: auto;
    background-color: #f4f7f9;
    padding-top: 80px;
}
.canvas {
    width: 375px;
    margin: 0 auto;
}
.form {
    width: 30vw;
}
.container {
    background: #ffffff;
}
.container > div {
    position: relative;
    box-sizing: border-box;
}
.block-container.active::after, .block-container.has-active::after {
    content: "";
    position: absolute;
    border: 2px solid #81b0ff;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
}
/* .container .block-container.active, .container .block-container.has-active {
    border: 2px solid #81b0ff;
} */
</style>
