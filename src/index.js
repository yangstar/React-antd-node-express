import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import 'antd/dist/antd.css';
import TOOLS from './util/util';
import App from './moduleManage/index';

// 根路由
const routeConfig = {
  path: '/',
  component: 'div',
  indexRoute: { component: App },
  childRoutes: [
    {
      path: 'index.html', // 内容路由
      component: App
    }
  ]
};

ReactDOM.render(
  <Router history={ browserHistory } routes={ routeConfig }/>,
  document.getElementById('app')
);
