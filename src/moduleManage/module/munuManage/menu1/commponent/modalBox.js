import React from 'react';
import {Button, Form, Input, Table, Modal, Icon} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;


let ModalBox = React.createClass({
  // 新增行
  addRecord() {
    this.props.addRecord()  
  },

  // 删除行
  deleteRecord(index) {
    this.props.deleteRecord(index)  
  },

  render () {
    const { getFieldProps }  = this.props.form;
    const nameProps = getFieldProps('name')
    const ageProps = getFieldProps('age')
    const addressProps = getFieldProps('address')
    let dataSource = [];
    dataSource = this.props.record.detail;
  
    let columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record, index) => {
            
            return <FormItem label=""><Input {...getFieldProps(`${index}rederName` ,{initialValue: record.name, rules:[{required:true, message:'姓名不能为空'}] })} /></FormItem>
        }
    },{
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        render: (text, record, index) => {
            return <FormItem label=""><Input {...getFieldProps(`${index}rederPhone` ,{initialValue: record.phone })} /></FormItem>
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record, index) => {
            let btnGroup = [
                <a href="javascript:;" style={{marginRight: 10}} onClick={this.addRecord}><Icon style={{fontSize: 16}} type="plus-circle-o" /></a>,
                <a href="javascript:;" onClick={this.deleteRecord.bind(this, index)}><Icon style={{fontSize: 16}} type="minus-circle-o" /></a>
            ]
            return btnGroup;
        }
    },
    ];
    return (
        <Modal  title={this.props.title}
                visible={this.props.visible}
                onOk={this.props.handleOk} 
                onCancel={this.props.handleCancel}
                width={900}
                >

            <Form >
                <FormItem
                label="用户名" 
                >
                    <Input {...nameProps} />
                </FormItem>
                <FormItem
                label="年龄" 
                >
                    <Input {...ageProps} />
                </FormItem>
                <FormItem
                label="住址" 
                >
                    <Input {...addressProps} />
                </FormItem>
                <Table size="middle" dataSource={dataSource} columns={columns}/>
            </Form>
      </Modal>

    );
  }
});
ModalBox = createForm()(ModalBox);
export default ModalBox;
