<template>
    <div>
        <div>Array {{ schema.title }}</div>
        <component v-bind:is="(schema.items.format ? schema.items.format : schema.items.type) + '-editor'" v-for="(item, index) in items" :key="index" :ref="index" :schema="schema.items" :name="schema.items.title" :instanceData="instanceData[index]" @change="onChange"></component>
        <el-button @click="addItem">+</el-button>
        <el-button>-</el-button>
    </div>
</template>
<script>
// import editorMap from './index';

export default {
    name: 'array-editor',
    props: ['schema', 'instanceData'],
    data() {
        return {
            map: editorMap,
            items: []
        };
    },
    created() {
        this.items.push(...this.schema.default);
    },
    methods: {
        addItem() {
            this.items.push(Object.create(this.schema.default));
        },
        getValue() {
            const value = this.items.map((item, index) => {
                return this.$refs[index][0].getValue();
            });
            return value;
        },
        onChange() {
            this.$emit('change');
        },
    }
};
</script>
