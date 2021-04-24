import Vue from "vue";
import App from "./App";
import createRouter from './createRouter';
import createStore from './createStore';


export default function createApp(context) {
    const router = createRouter();
    const store = createStore();
    const app = new Vue({
        router,
        store,  // 注入store到根Vue实例
        render: (h) => h(App),
    });
    return {
        app,
        router,
        store
    };
}
