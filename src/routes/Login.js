import React from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import logo from '../logo.png'

const input = {
    'width':'25%',
};
const logostyle = {
    'width':'100px',
};
const title = {
    'fontSize':'20px',
    'marginTop':'10px'
}
const App = () => (
    <div className="container">
        <br /><br />
        <img src={logo} alt="logo" style={logostyle}/>  
        <div style={title}>企业实训-四方精创</div>   
        <br />
        <Select placeholder="选择机构类型" size="large" style={input}>
            {/* <Option value="lucy">上游</Option>
            <Option value="lucy">核心企业</Option>
            <Option value="lucy">下游</Option>
            <Option value="lucy">工厂</Option> */}
        </Select>
        <br /><br />
        <Input placeholder="输入机构号" size="large" style={input}/>
        <br /><br />
        <Input placeholder="输入密码" size="large" style={input}/>
        <br /><br /><br />
        <Button type="primary" size="large" style={input}>登录</Button>
    </div>
  );
  
  export default App;