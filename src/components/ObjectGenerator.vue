<template>
    <div>
        <div>{{schema.title}}</div>
        <component v-bind:is="map[value.type]" v-for="(value, name) in schema.properties" :schema="value" :name="name" :output="output[name]" :key="name"></component>
    </div>
</template>
<script>
import StringGenerator from './StringGenerator.vue';
import IntegerGenerator from './IntegerGenerator.vue';
import ArrayGenerator from './ArrayGenerator.vue'

export default {
    props: ['schema', 'output'],
    data() {
        return {
            map: {
                string: StringGenerator,
                integer: IntegerGenerator,
                array: ArrayGenerator,
            },
        };
    }
}
</script>