<template>
    <el-form-item :label="name" :key="name">
        <el-input v-model="value" @change="onChange"></el-input>
    </el-form-item>
</template>
<script>
export default {
    name: 'string-editor',
    props: ['schema', 'name', 'instanceData'],
    data() {
        return {
            value: null
        };
    },
    created() {
        this.value = this.instanceData || this.schema.default || null;
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
