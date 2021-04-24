import Vue from "vue";
import createApp from "./createApp";

const { app, router, store } = createApp();

// 其实相当于服务端调用客户端定义的方法，获取到数据后，放到store里，
// 同时将数据序列化一份放在全局对象的`__INITIAL_STATE__`下
// 右键源码可以看到类似这样的：`<script>window.__INITIAL_STATE__={"item":{"name":"item1","id":1}}</script>`
if (window.__INITIAL_STATE__) {
    // 激活状态数据
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    // app.$mount(); // 没有提供 elementOrSelector 参数，将在文档之外渲染并且随后挂载
    // $mount 函数的 hydrating 参数位置传入 true，来强制使用激活模式(hydration)，
    // 其实也就是复用服务端渲染好的html
  app.$mount('#app', true);
});
