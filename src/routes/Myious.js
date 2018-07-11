import React, { Component } from 'react'
import { Dropdown,Modal,Upload,message,Select,Form,Tooltip,Table, Divider,Button,Avatar,Layout,Menu, Icon, Switch,Input } from 'antd';
import axios from 'axios'
import Amount from './Amount'

const tip={
    'fontSize':'20px'
  }

class Myious extends Component {
    constructor(props) {
        super(props);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.getLimitFromServer();
        // this.showConfirm = this.showConfirm.bind(this);
      }

      state= {
        amount:50,
        editing:false,
        updateAmount: true,
      }

      getLimitFromServer = () => {
        // 从服务器获取amount
        let win = this;
        if(this.state.updateAmount){
          console.log("getting amount");
          axios({
            method:'post',
            url:'http://127.0.0.1:8080/blockchain/get_entity_iou_limit',
            data:{
              orgID:sessionStorage['orgID']
            },
            withCredentials: true,
          }).then(function(res){
            console.log(res.data.iouLimit);
            win.setState({amount:res.data.iouLimit});
            win.setState({updateAmount:false});
            // console.log(res.data.iouLimit);
          }).catch(function(error){
            console.log("error");     
            console.log(error);       
          });
        }
      }

    handleAmountChange(value) {
        this.setState({amount:value});
        //axios上去
    }

    render() {
      return(<div>
        <span style={tip}>我发行的白条额度：
        <Amount editing={this.state.editing} 
                amount={this.state.amount}
                onAmountChange={this.handleAmountChange}/>
        </span>
        </div>)
    }
  }

export default Myious;