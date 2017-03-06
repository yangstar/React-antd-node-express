import reqwest from 'reqwest';
import { browserHistory } from 'react-router';
import { Message, Modal } from 'antd';
const confirm = Modal.confirm;

// 线上环境数据接口api
const PRO_API = 'http://jxsmanage.zijincunguan.erongyun.net';
// 线上环境图片api
const PROIMG_API = 'http://img.zijincunguan.erongyun.net';

const isProduction = process.env.NODE_ENV === 'production';

const SERVER_URL = isProduction ? PRO_API : '';

const IMG_URL = isProduction ? PROIMG_API : 'http://192.168.3.178:3030/';

const TOOLS = {

  api: SERVER_URL, // 生产环境api地址

  imgApi: IMG_URL, // 图片地址

  proxyApi: 'http://10.10.1.80:8090', // 地开发模板下载导出的请求地址

  fetchData: function (req) {
    let self = this;
    reqwest({
      url: this.api + req.url,
      contentType: req.contentType || 'application/x-www-form-urlencoded',
      method: req.method || 'post',
      data: req.data,
      headers: {
        Token: localStorage.token || null
      },
      type: 'json',
      success: function (result) {
        if (result.code === '401') {
          confirm({
            title: result.msg,
            content: '是否返回登录页？',
            onOk () {
              self.logout();
              location.reload();
            },
            onCancel () {}
          });
        } else {
          req.callback(result);
        }
      },
      error: function (err) {
        console.log(err);
        if (err.status === 500) {
          Message.error('请求服务器失败...o(╯□╰)o');
        } else {
          Message.error('服务器响应超时，请重新请求...o(╯□╰)o');
        }
      },
    });
  },

  // 拦截跳转
  redirectToLogin: function () {
    if (!this.loggedIn()) {
      browserHistory.push('/login.html');
    }
  },

  // 退出
  logout: function (cb) {
    localStorage.clear();
    if (cb) { cb(); }
    this.redirectToLogin();
  },

  // 登录验证
  loggedIn: function () {
    return !!localStorage.token;
  },

  // 时间戳
  timeStamp: function () {
    let date = Date.now();
    return date;
  },

  // 格式化日期
  formatDate: function (value) {
    if (!value) { return ''; }
    let date = new Date(value);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1 > 9) ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
    let day = (date.getDate() > 9) ? (date.getDate()) : '0' + (date.getDate());
    return year + '-' + month + '-' + day;
  },

  // 数组去重
  unique: function (arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[elem]) {
        result.push(elem);
        hash[elem] = true;
      }
    }
    return result;
  },

  

};

window.TOOLS = TOOLS;


export default TOOLS;

