import Vue from "vue";
import App from "./App";
import createRouter from './createRouter';


export default function createApp(context) {
    const router = createRouter();
    const app = new Vue({
        router, // 注入router到根Vue实例
        render: (h) => h(App),
    });
    return {
        app,
        router
    };
}
