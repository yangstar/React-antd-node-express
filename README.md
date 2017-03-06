
### Development

```bash
$ npm install
$ npm start
```

####代理请求配置

修改target 如下
	

	var hostProxy = proxy({
	  	target: 'http://10.10.2.156:8080',
	 	changeOrigin: true,
	  	logLevel: 'debug'
	});



### release
   windows下使用(npm run build),其它使用deploy


```bash
$ npm run deploy
```

### 项目结构


    ├── dist              // 发布dist目录
    ├── build              // 开发build目录
    ├── src                // 开发目录
    │   ├─global        //  全局静态资源、组件
    │   │  │
    │   │  ├─assets     //  全局公用静态资源
    │   │  │  ├─css
    │   │  │  └─images
    │   │  │
    │   │  └─components //  全局公用组件
    │   │      
    │   ├─moduleManage  // 后台管理模块所有资源文件
    │   │  │
    │   │  ├─assets     // module公用静态资源
    │   │  │  ├─css
    │   │  │  └─images
    │   │  │
    │   │  ├─components // module公用组件
    │   │  │  
    │   │  │  
    │   │  ├─reflux     // module公用reflux
    │   │  │  ├─action
    │   │  │  └─store
    │   │  │
    │   │  └─module     // 业务功能模块
    │   │      │
    │   │      ├─systemConfig1
    │   │      │    │
    │   │      │    ├─components    // 模块内部组件
    │   │      │    │
    │   │      │    └─reflux        // 模块内部reflux
    │   │      │
    │   │      └─systemConfig2          
    │   │              
    │   └─util          // 全局公用方法
    │
    ├── index.template.html         // 页面模板
    ├── package.json       // 项目配置文件
    ├── README.md          // 说明
    ├── server.js          // server 配置文件
    ├── webpack.config.js          // webpack 配置文件
    └── webpack.config.production.js  // webpack配置文件

#

### 技术栈
    react + antd + es6 + react-router + reflux + webpack

### 注意
    1、项目涉及到的js文件后缀名全为.js
    2、文件命名为小驼峰格式，如： systemConfig


### 资料与感谢
    http://1x.ant.design/docs/react/int````roduce