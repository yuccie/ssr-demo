import createApp from "./createApp";

export default (ctx) => {
    // 可能是异步路由钩子或组件，所以需要promise
    // 以便服务器能够等待所有的内容在渲染前就已经准备就绪。
    // const { app } = createApp(ctx);
    // return app;
    return new Promise((resolve, reject) => {
        const { app, router } = createApp();

        // 服务端url跳转
        router.push(ctx.url);
        // 在路由完成初始导航时调用
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                // 这里匹配不到的路由错误，会在server里被拦截到
                return reject({ code : 404 })
            }
            resolve(app);
        })
    })
};
