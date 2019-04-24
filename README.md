# pico-player
一个基于 React 的网络音乐播放器

#### 界面

------

![screenshot](https://i.loli.net/2019/04/23/5cbf2ed87dbeb.png)

#### 主要技术栈

------



##### 生产依赖

- [React](https://github.com/facebook/react)：基于 React 构建用户基本界面；
- [prop-types](https://github.com/facebook/prop-types)：用来检查 React 组件中 props 的类型；
- [Material-UI](https://github.com/mui-org/material-ui)：使用 Material-UI 组件来搭建基本界面布局；
- [emotion](https://github.com/emotion-js/emotion)：使用 CSS-in-JS 方案处理动画和动态样式；
- [react-window](https://github.com/bvaughn/react-window)：使用虚拟列表技术优化多列表的渲染性能；
- [react-autosuggest](https://github.com/moroshko/react-autosuggest)：用来实现搜索自动补全；
- [axios](https://github.com/axios/axios)：用来抓取后端音乐数据；
- [ramda](https://github.com/ramda/ramda)： 用来处理和格式化数据的函数式编程库；
- [localForage](https://github.com/localForage/localForage)：用来缓存播放列表及最后播放的歌曲；

##### 开发依赖

- [parcel](https://github.com/parcel-bundler/parcel)：用来打包 WEB 应用程序；
- [eslint](https://eslint.org)：用来规范代码风格；
- [sass](https://github.com/sass/dart-sass)：作为 CSS 预编译；

#### 构建

------

```shell
# 安装依赖
yarn install
# 运行开发环境
yarn start
# 打包
yarn build
```

