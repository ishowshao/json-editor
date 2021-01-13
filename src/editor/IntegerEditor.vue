<template>
    <el-form-item :label="schema.title" :key="name">
        <el-input-number v-model="value" controls-position="right" @change="onChange"></el-input-number>
    </el-form-item>
</template>
<script>
export default {
    name: 'integer-editor',
    props: ['schema', 'name', 'instanceData'],
    data() {
        return {
            value: null
        };
    },
    created() {
        this.value = this.instanceData || this.schema.default || null;
    },
    watch: {
        instanceData(newValue) {
            this.value = newValue;
        }
    },
    methods: {
        getValue() {
            return this.value;
        },
        onChange() {
            this.$emit('change');
        },
    }
};
</script>
