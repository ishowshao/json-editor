<template>
    <el-form-item :label="name" :key="name">
        <el-input v-model="value" type="number"></el-input>
    </el-form-item>
</template>
<script>
export default {
    props: ['schema', 'name'],
    data() {
        return {
            value: null,
        };
    },
    created() {
        this.value = this.schema.default;
    },
    watch: {
        value(newValue) {
            this.schema.value = Number(newValue);
        }
    }
}
</script>