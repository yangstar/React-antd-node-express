import React from 'react';
import { Menu, Icon, Tabs, Dropdown, Button } from 'antd';
import MenuComponent from './components/menuBar/menu';
import MenuManage from './module/munuManage/menu1';
import './assets/css/common.css';
const TabPane = Tabs.TabPane;

const App = React.createClass({

  getInitialState () {

    var initContent = <MenuManage/>
    var initKey = {title: '一级菜单', content: initContent, key: 'menu1'} 
    const panes = [initKey];
    return {
      visible: false,
      dropVisible: false,
      collapse: false,
      modalType: '',
      mode: false,
      currentPane: {},
      activeKey: panes[0].key,
      panes
    };
  },

  onCollapseChange () {
    this.setState({
      collapse: !this.state.collapse,
      mode: !this.state.collapse ? 'vertical' : 'inline'
    });
  },

  // 选项卡切换
  handleTabChange (activeKey) {
    let currentPane, panes = this.state.panes;
    panes = panes.filter((item, index)=> {return item.key === activeKey; });
    currentPane = panes[0];
    this.setState({activeKey, currentPane});
  },

  // 新增选项卡
  add (param) {
    let panes = this.state.panes;
    const activeKey = param.key;
    panes = panes.filter((item, index)=> {return item.key !== activeKey; });
    let currentPane = {title: param.title, content: param.content, key: activeKey};
    panes.push(currentPane);
    this.setState({panes, activeKey, currentPane});
  },


  onEdit (targetKey, action) {
    if (targetKey === 'channelRoleManage') {
      return;
    }
    this[action](targetKey);
  },

  remove (targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({panes, activeKey});
  },

  removeOther () {
    let panes = [];
    let current = this.state.currentPane;
    panes.push(current);
    this.setState({panes});
  },

  showModal (e) {
    this.setState({
      visible: true,
      modalType: e,
    });
  },

  handleCancel () {
    this.setState({
      visible: false
    });
  },

  handleMenuClick (e) {
    if (e) {
      this.setState({dropVisible: false});
    }
  },
  handleVisibleChange (flag) {
    this.setState({dropVisible: flag});
  },

  render () {

    const collapse = this.state.collapse;

    const childComponent = {
      visible: this.state.visible,
      modalType: this.state.modalType,
      callBack: this.handleCancel
    };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1"><a href="javascript:;" onClick={this.showModal.bind(this, 'pwd')}>修改密码</a></Menu.Item>
      </Menu>
    );
    const operations = this.state.panes.length > 3 ? (
      <Button className="ant-btn-icon" onClick={this.removeOther} title="关闭其它项"><Icon type="delete"/></Button>) : '';
      console.log(this.state.panes[0]);
    return (
      <div className={collapse ? 'ant-layout-aside ant-layout-aside-collapse' : 'ant-layout-aside'}>
        <aside className="ant-layout-sider">
          <div className="ant-layout-logo"><h2>模板CMS</h2></div>
          {/* <div className="ant-aside-action" onClick={this.onCollapseChange} >
           {collapse ? <Icon type="menu-unfold"/> : <Icon type="menu-fold"/>}
           </div>*/}
          {/* 菜单组件*/}
          <MenuComponent cbPane={this.add} mode={this.state.mode}/>
        </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
            <h2>模板CMS</h2>
            <div className="sign-bar">
              <i className="sign-header"></i>
              <span className="sign-phone">欢迎 ~，
                 <Dropdown overlay={menu}
                           onVisibleChange={this.handleVisibleChange}
                           visible={this.state.dropVisible}
                 >
                   <a href="javascript:;">{localStorage.userName}</a>
                 </Dropdown>
              </span>
                <span className="sign-out" onClick={this.showModal.bind(this, 'out')}>
                  <Icon type="poweroff"/>
                </span>
            </div>
          </div>
          <div className="ant-layout-container">
            <Tabs
              hideAdd
              tabBarExtraContent={operations}
              onChange={this.handleTabChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}>
              { this.state.panes[0] ?
                this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} ref="activeChild">
                  <div className="ant-layout-content">
                    <div style={{ height: 760 }}>
                      {pane.content}
                    </div>
                  </div>
                </TabPane>) :
                <TabPane tab="空页面" key="null">
                  <div className="ant-layout-content">
                    <div style={{ height: 760 }}>
                      <h3>404，您的页面走丢了哦~ o(╯□╰)o </h3>
                      <p>亲~，请重新打开页面……</p>
                    </div>
                  </div>
                </TabPane>
              }
            </Tabs>

          </div>
          <div className="ant-layout-footer">
            版权所有 © 2016 cattleya支持
          </div>
        </div>
      </div>
    );
  }
});

export default App;
