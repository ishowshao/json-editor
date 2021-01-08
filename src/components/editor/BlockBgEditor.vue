<template>
    <div>
        <div>模块属性</div>
        <el-form-item :label="schema.title" :key="name">
            <div class="mb-3">
                <el-radio-group v-model="radio">
                    <el-radio-button label="使用颜色"></el-radio-button>
                    <el-radio-button label="使用图片"></el-radio-button>
                </el-radio-group>
            </div>
            <div v-if="radio === '使用颜色'">
                <el-input v-model="color"></el-input>
            </div>
            <div v-if="radio === '使用图片'">
                <el-input v-model="image"></el-input>
            </div>
        </el-form-item>
    </div>
</template>
<script>
export default {
    name: 'block-bg-editor',
    props: ['schema', 'name', 'instanceData'],
    data() {
        return {
            color: null,
            image: null,
            radio: '使用颜色'
        };
    },
    created() {
        this.color = this.instanceData || this.schema.default || null;
        this.image = this.instanceData || this.schema.default || null;
        // this.image = 'https://'
    },
    methods: {
        getValue() {
            return this.radio === '使用颜色' ? this.color : this.image;
        },
        onChange() {
            this.$emit('change');
        },
    }
};
</script>