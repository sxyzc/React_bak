import React from 'react'
import logo from '../logo.png'
import axios from 'axios'
import { browserHistory } from 'react-router';
import { message,Form,Icon,Button,Input,Select } from 'antd';
import { Router, Link, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { ENETRESET } from 'constants';
const Option = Select.Option;
const FormItem = Form.Item;
const input = {
    'width':'25%',
};
class NormalLoginForm extends React.Component {
  state = {
    redirect:0,
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    if (!err) {
        axios({
          //url: 'http://47.106.237.105:8080/blockchain/login',
          url: 'http://127.0.0.1:8080/blockchain/login',
          method: 'post',
          data: values,
          withCredentials: true,
        })
        .then((res) => {
              console.log("res");        
              console.log(res); 
              if(res.data.status=="1"){
                message.success('登录成功');
                sessionStorage['orgID'] =values.orgID;
                console.log(sessionStorage['orgID']);
                this.setState({redirect: 1});
              }
              else if(res.data.status=="0"){
                message.error('账号与密码不匹配！');
              }
              else if(res.data.status=="-1"){
                message.error('账号不存在！');
              }
              else if(res.data.status=="-2"){
                message.error('机构类型不匹配！');
              }
        })
        .catch((error) => {
          console.log("error");     
          console.log(error);       
          message.error('网络状态不佳！');
        });
      }
    });
  } 

    render() {
      if (this.state.redirect == 1) {
        return <Redirect push to="/home" />; 
      }
        const { getFieldDecorator } = this.props.form
        return (
            <div className="container">
            <br /><br />
            <img src={logo} alt="logo" style={{width:100}}/>  
            <div style={{fontSize:20,marginTop:10}}>企业实训-四方精创</div>
            <br />
            <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
            {getFieldDecorator('orgName', {
                    rules: [{ required: true, message: '您还没有选择机构类型！' }],
                })(
                <Select placeholder="选择机构类型" size="large" style={input}>
                        <Option value="upstream">上游企业</Option>
                        <Option value="core">核心企业</Option>
                        <Option value="downstream">下游企业</Option>
                        <Option value="factory">工厂企业</Option>
                </Select>      
                )}          
            </FormItem>
            <FormItem>
              {getFieldDecorator('orgID', {
                rules: [{ required: true, message: '您还没有输入机构号！' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    placeholder="输入机构号" size="large" style={input}/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '您还没有输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                type="password" placeholder="输入密码" size="large" style={input}/>
              )}
            </FormItem>                      
            <Button type="primary" htmlType="submit" className="login-form-button" 
                      size="large" style={input} >登录</Button>
              <br /><br />
              <div>还没有账号？现在&nbsp;<Link to="/register">注册</Link></div>
          </Form>
          </div>
          
        );  
    }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;