import Reflux from 'reflux';
import GlobalAction from '../action/globalAction';
import Data from './data';
console.log(Data);
const globalStore = Reflux.createStore({

  listenable: [GlobalAction],

  // 获取菜单
  onFetchMenu (model) {
    let self = this;
    // TOOLS.fetchData({
    //   url: '/sys/menu/findMyMenuList',
    //   callback: function (result) {
    //     if (result.code === '200') {
    //       self.trigger(result.data)
    //     }
    //   }
    // })
    self.trigger(Data.data);
  },


});

export default globalStore;
