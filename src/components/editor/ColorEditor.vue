<template>
    <el-form-item :label="name" :key="name">
        <el-color-picker v-model="value"></el-color-picker>
    </el-form-item>
</template>
<script>
export default {
    props: ['schema', 'name'],
    data() {
        return {
            value: null
        };
    },
    created() {
        this.value = this.schema.default || null;
    },
    // watch: {
    //     value(newValue) {
    //         this.output = newValue;
    //     },
    // },
    methods: {
        getValue() {
            return this.value;
        },
    }
};
</script>
