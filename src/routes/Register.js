import React from 'react';
import logo from '../logo.png'
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { Button,Input,Select } from 'antd';
const Option = Select.Option;

const input = {
    'width':'25%',
};
const logostyle = {
    'width':'100px',
};
const title = {
    'fontSize':'20px',
    'marginTop':'10px'
};
const App = () => (
    <div className="container">
        <br /><br />
        <img src={logo} alt="logo" style={logostyle}/>  
        <div style={title}>企业实训-四方精创</div>   
        <br />
        <Select placeholder="选择机构类型" size="large" style={input}>
            <Option value="upstream">上游企业</Option>
            <Option value="core">核心企业</Option>
            <Option value="downstream">下游企业</Option>
            <Option value="factory">工厂企业</Option>
        </Select>
        <br /><br />
        <Input placeholder="输入机构号" size="large" style={input}/>
        <br /><br />
        <Input placeholder="输入密码" size="large" style={input}/>
        <br /><br />
        <Button type="primary" size="large" style={input}>注册</Button>
        <br /><br />        
        <div>已经有账号？现在&nbsp;<Link to="/login">登录</Link></div>
    </div>
  );
  
  export default App;