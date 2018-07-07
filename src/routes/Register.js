import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import logo from '../logo.png'
import axios from 'axios'
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { Checkbox,Form,Icon,Button,Input,Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const input = {
    'width':'25%',
};
class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            axios.post('http://47.106.237.105:8080/blockchain/register',values)        
                .then(function(res){   
                    console.log("res");        
                    console.log(res);        
                })       
                .catch(function(error){
                    console.log("error");     
                    console.log(error);       
                });           
          }
        });
      }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div className="container">
            <br /><br />
            <img src={logo} alt="logo" style={{width:100}}/>  
            <div style={{fontSize:20,marginTop:10}}>企业实训-四方精创</div>
            <br />
            <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
            {getFieldDecorator('type', {
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
              {getFieldDecorator('userName', {
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
                       placeholder="输入密码" size="large" style={input}/>
              )}
            </FormItem>                      
              <Button type="primary" htmlType="submit" className="login-form-button" 
                      size="large" style={input} >注册</Button>
              <br /><br />
              <div>已经有账号？现在&nbsp;<Link to="/register">登录</Link></div>
          </Form>
          </div>
        );  
    }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;