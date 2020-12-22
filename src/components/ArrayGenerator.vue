<template>
    <div>
        <div>Array {{ schema.title }}</div>
        <component v-bind:is="map[schema.items.type]" v-for="(item, index) in items" :key="index" :ref="index" :schema="schema.items" :name="schema.items.title"></component>
        <el-button @click="addItem">+</el-button>
        <el-button>-</el-button>
    </div>
</template>
<script>
import ObjectGenerator from './ObjectGenerator.vue';
import StringGenerator from './StringGenerator.vue';
import IntegerGenerator from './IntegerGenerator.vue';

export default {
    props: ['schema'],
    data() {
        return {
            map: {
                object: ObjectGenerator,
                string: StringGenerator,
                integer: IntegerGenerator
            },
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
    }
};
</script>
