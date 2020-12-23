<template>
    <div>
        <div>{{ schema.title }}</div>
        <component v-bind:is="map[value.type]" v-for="(value, name) in schema.properties" :key="schema.id + name" :ref="name" :schema="value" :name="name"></component>
    </div>
</template>
<script>
import StringGenerator from './StringGenerator.vue';
import IntegerGenerator from './IntegerGenerator.vue';
import ArrayGenerator from './ArrayGenerator.vue';

export default {
    props: ['schema', 'output'],
    data() {
        return {
            map: {
                string: StringGenerator,
                integer: IntegerGenerator,
                array: ArrayGenerator
            }
        };
    },
    methods: {
        getValue() {
            const value = {
                id: this.schema.id,
            };
            for (const key in this.schema.properties) {
                if (this.schema.properties.hasOwnProperty(key)) {
                    value[key] = this.$refs[key][0].getValue();
                }
            }
            return value;
        }
    },
    created() {
        console.log('object created');
    }
};
</script>
