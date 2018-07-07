import React, { Component } from 'react'
import { Tooltip,Icon,Input } from 'antd';
import { message, Button } from 'antd';

class Amount extends Component {
    constructor(props) {
        super(props);
        this.editClick = this.editClick.bind(this);
      }
    
    state = {
        editing:false,
    }
    
    confirm() {
        message.info('Click on Yes.');
      }

    editClick = (e) => {
        
        if(this.state.editing==true){
            var value=e.target.parentNode.firstChild.value
            console.log(value)
            this.props.onAmountChange(value);
        }
        this.setState({editing: !this.state.editing,});
    }

    render() {
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