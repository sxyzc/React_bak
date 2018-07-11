import React, { Component } from 'react'
import { message,Modal,Tooltip,Icon,Input } from 'antd';
import axios from 'axios'
const confirm = Modal.confirm;

function error(message) {
    Modal.error({
      title: '错误',
      content: message,
    });
  }

class Amount extends Component {
    constructor(props) {
        super(props);
        this.editClick = this.editClick.bind(this);
        // this.showConfirm = this.showConfirm.bind(this);
      }

    state = {
        editing:false,
        amountValue:0,
    }

    //   this.props.onAmountChange(value);

    editClick = (e) => {        
        if(this.state.editing==true){//按钮是保存
            let win = this;
            var value=e.target.parentNode.firstChild.value
            if(value==""){error("您还没有输入数值！")}
            else{
                value=Number(value)
                if(value<0){error("白条额度不能为负")}
                else if(isNaN(value)){error("必须输入数字！")}
                else{
                    confirm({
                        title: '确定要修改你发行的白条额度吗？',
                        content: '你的白条额度将被修改为：'+String(value),
                    onOk(){
                        return new Promise((resolve, reject) => {
                            setTimeout(function(){
                                axios({
                                    method:'post',
                                    url:'http://127.0.0.1:8080/blockchain/update_iou_limit',
                                    data:{
                                        amount:value,
                                        orgID:"bussiness_final"
                                    },
                                }).then(function(res){
                                    
                                    console.log(res.data);
                                    if(res.data.status=="1"){
                                        // 正确修改
                                        win.setState({amountValue: value});
                                        win.setState({editing: !win.state.editing});
                                        win.props.onAmountChange(value);
                                        console.log(win.state.amountValue);
                                        message.success('成功更新白条额度');
                                    }
                                }).catch(function(error){
                                  console.log("error");     
                                  console.log(error);       
                              });
                                resolve("成功!"); //代码正常执行！
                            }, 500);
                        })
                        
                    },
                    onCancel() {
                        win.setState({editing: !win.state.editing});
                        console.log('取消');
                    },
                    });                    
                }
            }
        }
        else{this.setState({editing: !this.state.editing});}
        //按钮变化了
    }

    render() {
      const { confirmLoading, ModalText } = this.state;
      var editing=this.state.editing
      var amount=this.props.amount
      if(editing)
        return(<span>
            <Input id="value" placeholder="输入你想发行的白条额度" style={{width:200}} />&nbsp;
            <Tooltip placement="top" title="保存">
                <Icon type="save" style={{ fontSize: 20}} onClick={this.editClick}/>
            </Tooltip>
            </span>)
      else return(<span>
          <span id="amount">{amount}</span>&nbsp;
          <Tooltip placement="top" title="修改">
                <Icon type="edit" style={{ fontSize: 20}} onClick={this.editClick}/>
          </Tooltip>
          </span>)
    }
  }

export default Amount;