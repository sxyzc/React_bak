import React, { Component } from 'react'
import { Spin,Button,message,Modal,Tooltip,Icon,Input } from 'antd';
import axios from '../http'
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
        loading:false,
    }
    cancle = (e) => {   
        this.setState({editing: false});
    }
    //   this.props.onAmountChange(value);

    editClick = (e) => {
        e.preventDefault()
        if(this.state.editing==true){//按钮是保存
            let win = this;
            var value=e.target.parentNode.firstChild.value
            console.log(value)
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
                        console.log(1)          
                            win.setState({loading: true});
                            axios({
                                method:'post',
                                url:'update_iou_limit',
                                data:{
                                    amount:value,
                                    orgID:"bussiness_final"
                                },
                            }).then((res) => {
                                console.log(res.data);
                                if(res.data.status=="1"){
                                    // 正确修改
                                    win.setState({amountValue: value});
                                    win.setState({editing: !win.state.editing});
                                    win.props.onAmountChange(value);
                                    console.log(win.state.amountValue);
                                    message.success('成功更新白条额度');
                                }
                                else{message.error('更新失败');}
                                win.setState({loading: false});
                            }).catch(function(error){
                                console.log("error");     
                                console.log(error);     
                                message.error('更新失败');
                                win.setState({loading: false});  
                            });
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
        return(        
        <div style={{marginTop:10}}>
            <Spin spinning={this.state.loading} tip="白条额度更新中……">
            <Input id="value" placeholder="输入你想发行的白条额度" style={{width:200}} />&nbsp;
            <Tooltip placement="top" title="保存">
                <Icon type="save" style={{ fontSize: 20}} onClick={this.editClick}/>
            </Tooltip>&nbsp;
            <Button style={{marginLeft:10}}size="small" onClick={this.cancle}>&nbsp;取消&nbsp;</Button>
            </Spin></div>
        )
      else return(<div style={{marginTop:10}}>
          <span id="amount">{amount}</span>&nbsp;
          <Tooltip placement="top" title="修改">
                <Icon type="edit" style={{ fontSize: 20}} onClick={this.editClick}/>
          </Tooltip>
          </div>)
    }
  }

export default Amount;