<template>
    <el-form-item :label="name" :key="name">
        <el-color-picker v-model="value" @change="onChange"></el-color-picker>
    </el-form-item>
</template>
<script>
export default {
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
