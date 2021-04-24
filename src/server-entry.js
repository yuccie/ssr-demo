import createApp from "./createApp";

export default (ctx) => {
    // 可能是异步路由钩子或组件，所以需要promise
    // 以便服务器能够等待所有的内容在渲染前就已经准备就绪。
    // const { app } = createApp(ctx);
    // return app;
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        // 服务端url跳转
        router.push(ctx.url);
        // 在路由完成初始导航时调用
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                // 这里匹配不到的路由错误，会在server里被拦截到
                return reject({ code: 404 })
            }
            // resolve(app);
            // 对所有匹配的路由组件调用 `asyncData()`
            // Promise.all(matchedComponents.map(Component => {
            //     if (Component.asyncData) {
            //         return Component.asyncData({
            //             store,
            //             route: router.currentRoute
            //         });
            //     }
            // })).then(() => {
            //     // 状态传递给renderer的上下文，方便后面客户端激活数据
            //     context.state = store.state
            //     resolve(app)
            // }).catch(reject);
            function myPromiseAll (iterator) {
                let count = 0//用于计数，当等于len时就resolve
                let len = iterator.length
                let res = []//用于存放结果
                return new Promise((resolve, reject) => {
                    // 数组的遍历这里i是index
                    for (let i in iterator) {
                        Promise.resolve(iterator[i])//先转化为Promise对象
                            .then((data) => {
                                res[i] = data;
                                if (++count === len) {
                                    resolve(res)
                                }
                            })
                            .catch(e => {
                                reject(e)
                            })
                    }
                })
            }
            // 对所有匹配的路由组件调用 `asyncData()`
            myPromiseAll(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    });
                }
            })).then(() => {
                // 状态传递给renderer的上下文，方便后面客户端激活数据
                ctx.state = store.state
                resolve(app)
            }).catch(reject);

        })
    })
};
