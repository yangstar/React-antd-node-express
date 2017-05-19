import React from 'react';
import {Button, Table, Modal, Message} from 'antd';
import Json from './posts'
const confirm = Modal.confirm;

let MenuList = React.createClass({
 
  getInitialState() {
    return {
      image:'',
      dataList:[]
    }
  },
  commponentDidMount() {
    this.addDone()
  },
  // 加载图片
  loadImageAsync(url) {
    let _me = this;
    return new Promise(function(resolve, reject) {
      let image = new Image();
      
      image.onload = function () {
        resolve(image);
        console.log('image',image)
        
      }

      image.onerror = function () {
        reject(new Error('could not load image at' + url))
      }

      image.src = url;

     
    })
  },
  // 删除所有图片
  deleteImages () {
    let _me = this;
    let f = _me.refs.images
    let childs = f.childNodes;
    for(var i = childs.length - 1; i >= 0; i--) { 
      f.removeChild(childs[i]); 
    }
  },

  // 点击加载图片按钮
  handleClick(url) {
    let imageObject = this.loadImageAsync(url);
    let _me = this;
    imageObject.then(function(value) {
      console.log('加载成功啦', value);
      // _me.setState({image: value});
      _me.refs.images.appendChild(value)
    }).catch(console.log.bind(console));
    
  },

  // 点击加载json按钮
  handleLoadJson () {
    let _me = this;
    this.getJSON1("/posts.js").then(function(json) {
      // console.log('Contents: ' + json);
      // _me.setState({dataList: json});
      console.log(b)
    }, function(error) {
      console.error('出错了', error);
    }).catch(function(error) {
      // 处理 getJSON 和 前一个回调函数运行时发生的错误
      console.log('发生错误！', error);
    });
    

    // let [a, b, c] = [1,2,3]
    // console.log(a, b, c)

    // set数据结构
    // let s= new Set();
    // [1,2,3,4,5].forEach(x => s.add(x));

    // for(let i of s){
    //   console.log(i)
    // }
    // console.log(s.has(6))

    // 解构赋值默认值结合使用

    // 函数调用时，不赋初始值
    // 报错 property 'x' of undefined
    // function foo({x,y = 5}){
    //   console.log('参数在对象内部：',x,y)
    // }

    // foo()

    // 函数调用时，不赋初始值
    // x已经声明，但是默认值为空值，打印出来为undefined
    // function foo1(x,y = 5){
    //   console.log('参数不使用对象：',x,y)
    // }

    // foo1()
    // console.log('-----------',foo1)


    // var a='foo';
    // var b=['f','o','o']
    // var c = a.concat('999')
    // var d = Array.prototype.join.call(a, '-')
    // console.log(a.split('').reverse().join(''))
    // console.log(Math)

    // var a= 0.1+0.2;
    // var b= 0.3;
    // console.log(a === b);
    
  },

  getJSON1 (url) {
      var promise = new Promise(function(resolve, reject){
      var client = new XMLHttpRequest();
      client.open("GET", url);
      client.onreadystatechange = handler;
      client.responseType = "json";
      client.setRequestHeader("Accept", "application/json");
      client.send();

      function handler() {
          if (this.readyState !== 4) {
            return;
          }
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error(this.statusText));
          }
        };
      });

      return promise;
  },

  testThen() {
    let p1 = Promise.resolve(21);
    // p1.then(function(v){
    //   console.log('第一个then',v);
    //   return new Promise(function (resolve, reject) {
    //     resolve(v*2)
    //   })
    // })
    // .then(function (v) {
    //   console.log('第二个then', v)
    // })

    // var p = Promise.reject('oops').defer();
    p1.then(function fulfilled(v) {
      console.log(v.toLowerCase())
    },function reject(error){
      console.log('进来啦',error)
    })
    .catch(function(error) {
      console.error('发生错误***', error);
    })
  },
  // 测试promise.all
  testAll() {
    let p1 = Promise.resolve('hello');
    let p2 = Promise.resolve('2');
    let p3 = Promise.reject('error');

    Promise.all([p1,p2,p3]).then(function fulfilled(v) {
      console.log(v)
    },function reject(error) {
      console.log(error)
    })

    Promise.all([p1,p2]).then(function fulfilled(v) {
      console.log(v)
      return v
    },function reject(error) {
      console.log(error)
    }).then(function fulfilled(v) {
      console.log(v)
      let y = v.map(t => t+'3')
      return y;
    }, function reject(error) {
      console.log(error)
    }).then(function fulfilled(v) {
      console.log(v)
    }) 
  },
  testRace() {
    let p1 = Promise.resolve('hello');
    let p2 = Promise.resolve('2');
    let p3 = Promise.reject('error');

    Promise.race([p1,p2,p3]).then(function fulfilled(v) {
      console.log(v)
    },function reject(error) {
      console.log(error)
    })
  },
  // 给promise新增done
  addDone() {
    Promise.prototype.done = function (onFulfilled, onRejected) {
      this.then(onFulfilled, onRejected)
      .catch(function (reason) {
        setTimeout(() => {throw reason}, 0)
      })
    }
  },
  testDone() {
    this.addDone();
    // console.log(Promise.prototype)
    let p = Promise.resolve(20);
    p.then(function fulfilled(v) {
      v.getJSON1()
    }).done();
  },
  testYield() {
    var it=this.foo(6);
    var res= it.next();
    res.value;
    console.log(res.value)
  },
  *foo(x, y) {
    var y = x * (yield 'hello')
    return y
  },
  render () {
    console.log('this.state.image',this.state.image);
    console.log('this.state.dataList',this.state.dataList);

    return (
      <div >
        <br/><br/><br/>
        一、promise图片加载：
        <a href="javascript:;" onClick={this.handleClick.bind(this, 'https://www.baidu.com/img/bd_logo1.png')} >点我加载图片</a>
        &nbsp;&nbsp;&nbsp;
        <a href="javascript:;" onClick={this.deleteImages}>删除所有图片</a>
        <div ref="images"></div>
        <br/><br/><br/>
        二、promise Json加载：
        <a href="javascript:;" onClick={this.handleLoadJson}>点击加载json</a>
        <br/><br/><br/>
        三、promise then链式流测试：
        <a href="javascript:;" onClick={this.testThen}>点击测试then链式流</a>
        <br/><br/>
        测试结果：详见console

        <br/><br/><br/>
        四、promise.all([..]) 和 promise.race([..])
        <br/><br/>
        <a href="javascript:;" onClick={this.testAll}>点击测试promise.all</a>

        <br/><br/>
        <a href="javascript:;" onClick={this.testRace}>点击测试promise.race</a>
        <br/><br/>
        <a href="javascript:;" onClick={this.testDone}>点击测试自定义属性promise.done</a>
        <br/><br/>
        <a href="javascript:;" onClick={this.testYield}>点击测试生成器 yield</a>
        
      </div>

    );
  }
});
export default MenuList;
