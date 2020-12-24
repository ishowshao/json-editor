<template>
    <el-form-item :label="name" :key="name">
        <el-input v-model="value"></el-input>
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
