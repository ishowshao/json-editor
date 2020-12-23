import Vuex from 'vuex';

const store = new Vuex.Store({
    state: {
        data: {}
    },
    mutations: {
        change(state, data) {
            state.data = data;
        }
    }
});

export default store;
