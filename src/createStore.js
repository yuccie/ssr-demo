import Vue from 'vue';
import Vuex from 'vuex';
import { fetchItem, fetchItem1 } from './api';

Vue.use(Vuex);

export default function createStore() {
    return new Vuex.Store({
        state: {
            item: {},
            item1: {},
        },
        actions: {
            fetchItem({ commit }, id) {
                return fetchItem(id).then(item => {
                    commit('setItem', item);
                })
            },
            fetchItem1({ commit }, id) {
                return fetchItem1(id).then(item => {
                    commit('setItem1', item);
                })
            },
        },
        mutations: {
            setItem(state, item) {
                Vue.set(state, 'item', item);
            },
            setItem1(state, item) {
                Vue.set(state, 'item1', item);
            }
        }
    })
}