# custom-event-ts

[![Build Status](https://travis-ci.org/boycgit/custom-event-ts.svg?branch=master)](https://travis-ci.org/boycgit/custom-event-ts) [![Coverage Status](https://coveralls.io/repos/github/boycgit/custom-event-ts/badge.svg?branch=master)](https://coveralls.io/github/boycgit/custom-event-ts?branch=master) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![npm version](https://badge.fury.io/js/custom-event-ts.svg)](https://badge.fury.io/js/custom-event-ts)

A polyfill for CustomEvents on IE8+ written in Typescript

 - written in Typescript
 - fully tested
 - auto polyfill `CustomEvent` when using
 - offer `GlobalEvent` for easy use

一旦引用该组件，就会自动对 `CustomEvent` 进行 polyfill，同时提供组件 `GlobalEvent` 对象（默认导出）方便在全局进行自定义事件的订阅


## 参考文档
### 实现
 - [MDN - Custom Event](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)：官网对自定义事件的说明
 - [custom-event-js](https://github.com/shystruk/custom-event-js)：不仅有 polyfil，同时进一步有封装，方便不同库联调使用
 - [custom-event-polyfill](https://github.com/kumarharsh/custom-event-polyfill/blob/master/polyfill.js)： polyfill 库

### 教程
 - [创建和触发 events](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Creating_and_triggering_events)：官网详细使用文档，推荐阅读
 - [javascript自定义事件功能与用法实例分析](https://juejin.im/entry/5ad070b56fb9a028db591d49)：详细讲解自定义事件的用法



## Installation

### Node.js / Browserify

```bash
npm install custom-event-ts --save
```

```javascript
import GlobalEvent from "custom-event-ts";

// or
var GlobalEvent = require('custom-event-ts');

// Listen event 'SAY_HELLO'
GlobalEvent.on('SAY_HELLO', (data) => {
    console.log(data.detail) // { name: 'John' }
})

// Dispatch event 'SAY_HELLO' with data
GlobalEvent.dispatch('SAY_HELLO', { name: 'John' })

// Remove event listener
GlobalEvent.off('SAY_HELLO')

```

### Global object

在页面中可以直接使用打包好的文件：

```html
<script src="./dist/index.umd.min.js"></script>

```

通过 `window.GlobaEvent` 获取功能对象。


## Build & test

```bash
npm run build
```

```bash
npm test
```

```bash
npm run doc
```

then open the generated `out/index.html` file in your browser.

## License

[MIT](LICENSE).
