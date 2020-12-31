<template>
    <el-form-item :label="name" :key="name">
        <el-input v-model="value" type="number" @change="onChange"></el-input>
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
