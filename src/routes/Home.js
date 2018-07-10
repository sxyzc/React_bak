import React, { Component } from 'react'
import { Tooltip,Table, Divider,Button,Avatar,Layout,Menu, Icon, Switch,Input } from 'antd';
import { Link} from 'react-router-dom';
import Amount from './Amount'
import Panel from './Panel'
const Search = Input.Search;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class home extends React.Component {
  state = {
    menukey:'1',
  }

  changekey = (info) => {
    this.setState({
      menukey: info.key,
    });
  }

  render() {
    return (
        <Layout>
        <Sider
          theme="light"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        >
          <div style={{ minHeight: 100 ,paddingLeft:80,paddingTop:20}} >
            <Avatar size="large" icon="user" />
            <div style={{ marginTop: 10}}>A机构</div>
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} onClick={this.changekey}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">我的白条</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="edit" />
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
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <Link style={{ position:'fixed',right:30}} to="/login">退出登录</Link>
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