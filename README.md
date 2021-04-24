# ssr-demo

## 整体步骤

1. 需要两份配置，一份是构建客户端，一份是构建服务端
2. 既然区分了客户端和服务端，那之前的main.js就需要区分client-entry和server-entry
3. 同一份代码，要兼容客户端和服务端，还有vue-router，vuex等
4. 前端定义action方法和store，然后服务端会根据url调用action的方法，获取数据并自动存储到store里，同时服务端会将数据序列化一份放在全局对象上，这样客户端和服务端的数据就是同一份了
5. client-entry会判断是否存在全局对象`window.__INITIAL_STATE__`，存在的话，就会调用store.replaceState更新store里的数据。
6. 然后vue会判断是否服务端渲染，然后强制使用激活模式(hydration)，这样的话相当于vue又重新接管了页面上的元素，从而复用了服务端渲染的页面。
## 简介

初始化vue-ssr项目
## Project setup
```
yarn install
```
### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
