import React from 'react';
import { Table, Modal } from 'antd';
import ModalBox from './commponent/modalBox'


let MenuList = React.createClass({
  getInitialState(){
    return {
      visible: false,
      modType: 'add',
      title: '新增',
      record: {},
      dataSource: []
    }
  },
  componentDidMount() {
    this.fetch();
  },
  // 初始化列表
  fetch () {
    let dataSource = [{
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
      detail: [
        {
          name: '租户1',
          phone: '13456790117',
        },
        {
          name: '租户2',
          phone: '13456790111',
        }, 
      ]
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
      detail:[]
    }];

    this.setState({
      dataSource: dataSource
    });
    
  },
  handleBtn (e){
    let _me = this;
    let modType = e.modType;
    this.setState({
      modType: e.modType,
      title: e.title,
      visible: true,
      record: e.record
    });

    switch(modType) {
      case 'add': 
        console.log('open add')
        break;
      case 'modify': 
        _me.refs.ModalBox.setFieldsValue(e.record);
        console.log('open modify')
        break;
      case 'delete': 
        console.log('open delete')
        break;
      case 'check': 
        console.log('open check')
        break;
      default:
        break;
    }

    
  },
  getTableArry (data, o) {
  　　let arry = [];

      for(let key in data) {
  　　　　let curKey = parseInt(key.replace(/[^0-9]+/g, '')); // 获取key里的数字标记
  　　　　let keyName =key.replace(/[^a-zA-Z]+/g, ''); // 获取 key里的字段名称
  　　　　if(!isNaN(curKey)){// 过滤掉不包含数字标记的
      　　　　if(`${curKey}` in arry) {// 过滤掉已经追加到arry的obj
  
      　　　　}else {
        　　    let obj = {};
                for (let i in o){
                  obj[i] = data[`${curKey}${i}`]
                } 
      　　　　   arry.push(obj)　　
      　　　　}
  　　    }
        
  　　}
      return arry;
  },
  handleOk() {
    
    let data = this.refs.ModalBox.getFieldsValue()
    
    this.refs.ModalBox.validateFields((err, values) => {
      console.log(err)

      if (!err) { // 校验通过
        console.log('Received values of form: ', values);

        this.setState({
          visible: false,
        });
        console.log('11111111111',data)
        let obj ={
          rederName:'',
          rederPhone:''
        }
        let aa = this.getTableArry(data, obj);
        console.log('22222222222',aa)
        this.resetForm();
        this.fetch();
      }else { // 校验不通过
        
      }
    });
    let modType = this.state.modType;
    switch(modType) {
      case 'add': 
        console.log('submit add')
        break;
      case 'modify': 
        console.log('submit modify')
        break;
      case 'delete': 
        console.log('submit delete')
        break;
      case 'check': 
        console.log('submit check')
        break;
      default:
        break;
    }
    
  },
  handleCancel() {
    this.setState({
      visible: false,
    });

    // 取消时，数据重新获取：要么重新发请求、要么初次进入时用reflux存放
    this.fetch();
    this.resetForm();
  },

  // 重置弹框表单
  resetForm() {
    this.refs.ModalBox.resetFields()
  },
  rowKey(data) {
    return data.key
  },

  // 新增
  addRecord () {
    let record = this.state.record;
    let obj = {
      name: '',
      phone: ''
    }
    record.detail.push(obj);
    
    this.setState({
      record: record
    });
  },
  // 删除
  deleteRecord (index) {
    let record = this.state.record;
    record.detail = record.detail.filter((item, k) => {
      return k !== index;
    })
    this.setState({
      record: record
    });
  },
  render () {
    // console.log('dataSource-----------',this.state.dataSource, this.state.record)
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '操作',
      render: (text, record) =>{
        console.log('record',record);
        let btnGroup =[
          <a href="javascript:;" onClick={this.handleBtn.bind(this, {modType:'modify' , title: '编辑', record: record})}>编辑 | </a>,
          <a href="javascript:;" onClick={this.handleBtn.bind(this, {modType:'delete' , title: '删除', record: record})}>删除 | </a>,
          <a href="javascript:;" onClick={this.handleBtn.bind(this, {modType:'check' , title: '查看', record: record})}>查看</a>
        ]
        return btnGroup;
      }
    }];
    const ModalBoxProps = {
      title:this.state.title,
      visible:this.state.visible,
      record: this.state.record,
      handleOk: this.handleOk,
      handleCancel: this.handleCancel,
      addRecord: this.addRecord,
      deleteRecord: this.deleteRecord
    }
    return (
      <div>
        <Table key={this.rowKey} dataSource={this.state.dataSource} columns={columns}/>
        {this.state.title}
        <ModalBox ref="ModalBox" {...ModalBoxProps}/>
      </div>
    );
  }
});

export default MenuList;

