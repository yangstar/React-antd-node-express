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
  
  render () {
    
    return (
      <div >
        <br/><br/><br/>
        
      </div>

    );
  }
});
export default MenuList;
