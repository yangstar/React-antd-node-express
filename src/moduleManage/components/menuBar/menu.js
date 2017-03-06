import React from 'react';
import Reflux from 'reflux';
import { Menu, Icon } from 'antd';
import menuMapper from './menuMapper';
import GlobalStore from '../../reflux/store/globalStore';
import _ from 'lodash';

const SubMenu = Menu.SubMenu;


const MenuComponent = React.createClass({

  mixins: [Reflux.connect(GlobalStore, 'data')],

  getInitialState () {
    let opneKey = 'sysConfig';
    return {
      data: [],  // 菜单数据
      mode: 'inline',
      current: 'menu1',
      openKeys: [opneKey],
    };
  },

  componentDidMount () {
    // 获取菜单数据
    GlobalStore.onFetchMenu();
  },


  tabMapping (param, id) {
    var Component, tabContent;
    // console.log(param, id);
    switch (param){
      case 'menu1':
        require.ensure([], function (require) {
							Component = require('../../module/munuManage/menu1').default;
							tabContent = <Component menuId={id}/>;
						}, 'menu1');
        break;
      case 'menu2':
        require.ensure([], function (require) {
							Component = require('../../module/munuManage/menu1').default;
							tabContent = <Component menuId={id}/>;
						}, 'menu2');
        break;
    }

   
    // require.ensure([], function (require) {
    //   Component = menuMapper[param].default;
    //   tabContent = <Component menuId={id} />;
    // });

    return tabContent;
  },


  menuRender (data) {
    if (!data[0]) {
      return;
    }
    let menuComponent = [];
    data.forEach((item) => {
      let subMenu = [];
      let children = item.children ? item.children : [];
      children.forEach((its)=> {
        let secondMenu = (
          <Menu.Item id={its.id} key={its.key}><span className="nav-text">{its.label}</span></Menu.Item>);
        subMenu.push(secondMenu);
      });
      let firstMenu = (
        <SubMenu id={item.id} key={item.key}
                 title={<span><Icon type={item.iconType} /><span className="nav-text">{item.label}</span></span>}>
          {subMenu}
        </SubMenu>
      );
      menuComponent.push(firstMenu);
    });
    return menuComponent || (<Menu.Item ><span className="nav-text">{`获取菜单列表失败`}</span></Menu.Item>);
  },

  onToggle (info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
    });
  },



  handleActive (e) {
    // let content = this.tabMapping(e.key, e.item.props.id)

    var Component, tabContent;
    // console.log(param, id);
    let id = e.item.props.id;
    let _me = this;
    switch (e.key){
      case 'menu1':
        require.ensure([], function (require) {
							Component = require('../../module/munuManage/menu1').default;
							tabContent = <Component menuId={id}/>;
              let param = {
                key: e.key,
                title: e.item.props.children,
                content: tabContent,
              };
              _me.setState({
                current: e.key,
                openKeys: e.keyPath.slice(1),
              });
              _me.props.cbPane(param);
						}, 'menu1');
        break;
      case 'menu2':
        require.ensure([], function (require) {
							Component = require('../../module/munuManage/menu2').default;
							tabContent = <Component menuId={id}/>;
              let param = {
                key: e.key,
                title: e.item.props.children,
                content: tabContent,
              };
              _me.setState({
                current: e.key,
                openKeys: e.keyPath.slice(1),
              });
              _me.props.cbPane(param);
						}, 'menu2');
        break;
    }


    

  },

  render () {
    // 菜单数据
    let list = this.state.data;

    let mode = this.props.mode ? this.props.mode : this.state.mode;

    return (
      <Menu mode={mode} theme="dark" openKeys={this.state.openKeys}
            onOpen={this.onToggle}
            onClose={this.onToggle}
            selectedKeys={[this.state.current]}
            onClick={this.handleActive}>
        {this.menuRender(list)}
      </Menu>
    );
  }
});
export default MenuComponent;
