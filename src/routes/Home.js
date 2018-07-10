import React from 'react'
import { message,Avatar,Layout,Menu, Icon } from 'antd';
import { Redirect } from 'react-router-dom';
import Panel from './Panel'
import axios from '../http'
const { Header, Content, Footer, Sider } = Layout;

export default class home extends React.Component {
  state = {
    menukey:'1',
    conID:'',
    redirect:0,
  }

  changekey = (info) => {
    this.setState({
      menukey: info.key,
    });
  }

  onTest = () => {
    Panel.iou
  }

  logout = () => {
    axios({
      url: 'logout',
      method: 'get',
    }).then((res) => {
      console.log("res");        
      console.log(res); 
      if(res.data.status=="1"){
        message.success('注销成功');
        sessionStorage['orgID'] =""
        this.setState({redirect: 1});
      }})
      .catch((error) => {
        console.log("error");     
        console.log(error);       
        message.error('网络状态不佳,注销失败');
      });
  }

  render() {
    if(this.state.orgID==''){
      this.setState({
        orgID: sessionStorage['orgID'],
      });
      console.log("ok");
    }
    if (this.state.redirect == 1) {
      return <Redirect push to="/login" />; 
    }
    return (
        <Layout>
        <Sider
          theme="light"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div style={{ minHeight: 100 ,paddingLeft:80,paddingTop:20}} >
            <Avatar size="large" icon="user" />
            <div style={{ marginTop: 10,width: 200,marginLeft: -80,textAlign: 'center'}}>
            {sessionStorage['orgID']}</div>
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} onClick={this.changekey}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">我的白条</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="book" />
              <span className="nav-text">录入交易</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="profile" />
              <span className="nav-text">白条列表</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="profile" />
              <span className="nav-text">交易列表</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="eye-o" />
              <span className="nav-text">合同验伪</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <a style={{ position:'absolute',right:30}} onClick={this.logout}>退出登录</a>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 480 }}>
                <Panel menukey={this.state.menukey} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}