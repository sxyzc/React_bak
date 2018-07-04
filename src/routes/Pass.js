import React from 'react';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import logo from '../logo.png'

const title = {
  'fontSize':'35px',
};

const App = () => (
    <div className="container">
      <br /><br />
      <p style={title}>通过变更</p>
      <br />
      <Button type="primary" size="large">驳回</Button>
      <Button type="primary" size="large">通过</Button>
    </div>
  );
  
export default App;