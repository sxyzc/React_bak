import React from 'react'
import logo from '../logo.png'
import axios from 'axios'
import { Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { message,Form,Icon,Button,Input,Select } from 'antd';
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
      values.iouLimit = "500";
      if (!err) {
        console.log('Received values of form: ', values);
        axios({
          method:'post',
          url:'http://127.0.0.1:8080/blockchain/register',
          data:values,
      }).then((res) => {
          if(res.data.status=="1"){
            message.success('注册成功');
            this.setState({redirect: 1});
          }
          else if(res.data.status=="0"){
            message.error('注册失败');
          }
      }).catch(function(error){
        console.log("error");     
        console.log(error);       
    });
      }
    });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致！');
    } else {
      callback();
    }
  }
    render() {
        if (this.state.redirect == 1) {
          console.log("this.state.redirect == 1")
          return <Redirect push to="/login" />; 
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
            <FormItem>
              {getFieldDecorator('password2', {
                rules: [{ required: true, message: '您还没有确认密码!' }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                type="password" placeholder="再次确认密码" size="large" style={input}/>
              )}
            </FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" 
                      size="large" style={input} >注册</Button>
              <br /><br />
          </Form>
          <div>已经有账号？现在&nbsp;<Link to="/login">登录</Link></div>
          </div>
        );  
    }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;