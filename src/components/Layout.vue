<template>
    <div
        :style="{top: `${instanceData.layout.top}px`, left: `${instanceData.layout.left}px`, width: `${instanceData.layout.width}px`, 'z-index': zIndex}"
        @mousedown.stop="onMouseDown"
        @mouseup="onMouseUp"
        @mousemove.prevent="onMouseMove"
        @click.stop="active"
        :class="{active: component.active}"
        class="x-component">
        <slot></slot>
        <div class="handle handle-l" @mousedown.stop="onHandleMouseDown" @mouseup.stop="onHandleMouseUp"></div>
        <div class="handle handle-r" @mousedown.stop="onHandleMouseDown" @mouseup.stop="onHandleMouseUp"></div>
        <div v-if="handle.inUse" class="handle-canvas"></div>
    </div>
</template>
<script>
import eventbus from '@/lib/eventbus';

export default {
    props: ['component', 'instanceData', 'zIndex'],
    data() {
        return {
            target: null,
            clientX: null,
            clientY: null,
            top: null,
            left: null,
            handle: {
                inUse: false,
                x: null,
                y: null,
                width: null,
            },
        };
    },
    methods: {
        active() {
            this.$emit('active', this.component);
        },
        onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('mousedown', e, this.component);
            this.target = e.target;
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.top = Number(this.component.data.layout.top) || 0;
            this.left = Number(this.component.data.layout.left) || 0;
        },
        onMouseUp(e) {
            if (this.target) {
                this.target = null;
                this.component.data.layout.top = this.top + e.clientY - this.clientY;
                this.component.data.layout.left = this.left + e.clientX - this.clientX;
            }
        },
        onMouseMove(e) {
            if (this.target) {
                // console.log(this.target);
                this.component.data.layout.top = this.top + e.clientY - this.clientY;
                this.component.data.layout.left = this.left + e.clientX - this.clientX;
            }
            if (this.handle.clientX) {
                console.log(e.clientX, e.clientY);
                this.instanceData.layout.width = Number(this.handle.width) + e.clientX - this.handle.clientX;
            }
        },
        onHandleMouseDown(e) {
            this.target = null;
            this.handle.inUse = true;
            this.handle.x = e.clientX;
            this.handle.width = this.instanceData.layout.width;
        },
        onHandleMouseMove(e) {
            if (this.handle.inUse) {
                console.log(e.clientX, e.clientY);
                this.instanceData.layout.width = Number(this.handle.width) + e.clientX - this.handle.x;
            }
        },
        onHandleMouseUp(e) {
            if (this.handle.inUse) {
                this.active();
                this.handle.inUse = false;
            }
        },
    },
    mounted() {
        eventbus.on('canvas-mousemove', (e) => {
            this.onHandleMouseMove(e);
        });
        eventbus.on('canvas-mouseup', (e) => {
            this.onHandleMouseUp(e);
        });
    },
}
</script>
<style>
.x-component {
    position: absolute;
    z-index: 2;
    /* background-color: white; */
}
.x-component.active::after  {
    content: "";
    position: absolute;
    border: 1px dashed #81b0ff;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.handle {
    display: none;
    position: absolute;
    width: 7px;
    height: 7px;
    box-sizing: border-box;
    border: 1px solid black;
    z-index: 10;
    background-color: #ffffff;
}
.x-component.active .handle {
    display: block;
}
.handle-l {
    top: 50%;
    left: -3px;
}
.handle-r {
    top: 50%;
    right: -3px;
}
</style>