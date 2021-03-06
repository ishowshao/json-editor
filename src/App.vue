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
      <div class="select-component">
        <div class="d-flex category">
          <div class="flex-grow-1 text-center">组件</div>
          <div class="flex-grow-1 text-center">模块</div>
          <div class="flex-grow-1 text-center">模板</div>
        </div>
        <div class="components d-flex">
          <div class="components-list">
            <div class="group">内容组件</div>
            <div class="component">文本</div>
          </div>
          <div class="components-style flex-grow-1">
            <div class="group">简单文本</div>
            <div class="example" @click="addComponent(`plain-text`)">请添加文本内容</div>
          </div>
        </div>
      </div>
      <div class="canvas-container">
        <div class="canvas" @mousedown="onCanvasMouseDown" @mouseup="onCanvasMouseUp" @mouseleave="onCanvasMouseLeave" @mousemove="onCanvasMouseMove">
          <div v-for="block in page.blocks" :key="block.id" :class="{ active: block.active || block.components.find(c => c.active), 'has-active': block.components.find(c => c.active) }" class="block-container" @mousedown="active(block)">
            <component v-bind:is="block.component" :blockId="block.id" :instanceData="block.data" :components="block.components" @component-active="onComponentActive"></component>
          </div>
        </div>
      </div>
      <div class="editor" style="padding: 20px;">
        <div v-show="form.active" v-for="form in forms" :ref="`form${form.id}`" :key="form.id">
          <object-editor v-if="form.schema" :ref="`root${form.id}`" :schema="form.schema" :instanceData="form.data" @change="onChange(form)" :root="true"></object-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventbus from '@/lib/eventbus';
import id from '@/lib/id';
import schema2output from '@/lib/output';

import componentsMap from '@/canvas/index';

export default {
  name: 'App',
  data() {
    return {
      schema: {},
      output: null,
      page: {
        blocks: []
      }
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
              data: c.data
            };
          }),
          data: block.data
        };
      });
      return data;
    },
    forms() {
      console.log('forms active');
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
    active(component, e) {
      console.log('active', component, e);
      if (!component.active) {
        this.forms.forEach(c => (c.active = false));
        component.active = true;
      }
    },
    onComponentActive(component) {
      console.log(component, 'active');
      if (!component.active) {
        this.forms.forEach(c => (c.active = false));
        component.active = true;
      }
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
      const { schema, component } = componentsMap[name];
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
          clientY: 0
        }
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
        block = this.page.blocks.find(block => {
          return block.active || block.components.find(c => c.active);
        });
        if (!block) {
          this.addBlock('block');
          block = this.page.blocks[this.page.blocks.length - 1];
        }
      }

      const { schema, component } = componentsMap[name];
      const item = {
        id: id(),
        name: name,
        active: false,
        schema: schema,
        component: component,
        data: data
      };
      block.components.push(item);
    },
    savePageData() {
      window.localStorage.setItem('data', JSON.stringify(this.pageData));
    },
    getDefaultData(schema) {
      return schema2output(schema);
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
    }
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
  height: 60px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
}
.header .logo {
  width: 200px;
  line-height: 60px;
}
.header .actions {
  text-align: right;
  line-height: 60px;
  flex: 1;
  padding-right: 40px;
}
.main {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}

.canvas-container {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f7fa;
  padding: 80px 0;
}
.canvas {
  width: 375px;
  min-height: 667px;
  background: #ffffff;
  margin: 0 auto;
  user-select: none;
}
.editor {
  box-sizing: border-box;
  width: 480px;
  height: 100%;
  overflow: auto;
}
.canvas > div {
  position: relative;
  box-sizing: border-box;
}
.block-container.active::after,
.block-container.has-active::after {
  content: '';
  position: absolute;
  border: 1px solid #0aaae6;
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
