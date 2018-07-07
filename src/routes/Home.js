import React, { Component } from 'react'
import { Tooltip,Table, Divider,Button,Avatar,Layout,Menu, Icon, Switch,Input } from 'antd';
import { Link} from 'react-router-dom';
import Amount from './Amount'
const Search = Input.Search;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const input = {
  'width':'265px',
  'display':'inline-block'
}
const upload = {
  'width':'265px',
  'display':'inline-block',
  'padding-bottom':'35px'
}
const tip={
  'fontSize':'20px'
}
const iousColumns = [{
    title: '发放机构',
    dataIndex: 'sender',
  }, {
    title: '接收机构',
    dataIndex: 'receiver',
  }, {
    title: '白条数量',
    dataIndex: 'num',
  }, {
    title: '已还数量',
    dataIndex: 'returnNum',
  },{
    title: '白条状态',
    render: (text, record) => (
      <Button size="small">&nbsp;回收&nbsp;</Button>
    ),
}];
const iousData = [{
    key: '1',
    sender: '机构A',
    receiver:'机构B',
    num: 4723646,
    returnNum:0,
  }, {
    key: '2',
    sender: '机构C',
    receiver:'机构D',
    num: 13426,
    returnNum:0,
  }, {
    key: '3',
    sender: '机构E',
    receiver:'机构F',
    num: 434265,
    returnNum:0,
}];
const tradeColumns = [{
    title: '合同号',
    dataIndex: 'contract',
  }, {
    title: '销售方账号',
    dataIndex: 'sender',
  }, {
    title: '购买方账号',
    dataIndex: 'receiver',
  }, {
    title: '白条金额',
    dataIndex: 'Num',
  },{
    title: '交易时间',
    dataIndex: 'time',
  },{
    title: '修改状态',
    render: (text, record) => (
      <Button size="small">&nbsp;修改&nbsp;</Button>
    ),
}];
const tradeData = [{
    key: '1',
    contract:1,
    sender:'机构A',
    receiver:'机构B',
    Num:545342,
    time:'2018年7月5日 下午4:41'
  },{
    key: '2',
    contract:2,
    sender:'机构C',
    receiver:'机构D',
    Num:1534564,
    time:'2018年7月5日 下午4:56'
  },{
    key: '3',
    contract:3,
    sender:'机构E',
    receiver:'机构F',
    Num:345646,
    time:'2018年7月5日 下午6:41'
}]


class Panel extends Component {
  constructor(props) {
    super(props);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }
  handleAmountChange(value) {
    this.setState({amount:value});
  }
  state = {
    amount:152000000,
    editing:false,
    iconType:"edit",
    text:"修改"
  }
  editClick = () => {
    if(this.state.editing==true){
      this.setState({
        iconType:"edit",
        text:"修改"
      });
    }
    else{
      this.setState({
        iconType:"save",
        text:"保存"
      });
    }
    console.log(this.state.iconType)
    this.setState({
      editing: !this.state.editing,
    });
  }

  render() {
    var key=this.props.menukey
    if(key==1)
      return (<div>
        <span style={tip}>我发行的白条额度：
        <Amount editing={this.state.editing} 
                amount={this.state.amount}
                onAmountChange={this.handleAmountChange}/>
        </span>
        </div>)
    else if(key==2) 
    return(<div className="container">
      <br /><br />
      <span style={tip}>销售方账号&nbsp;&nbsp;&nbsp;</span><Input size="large" style={input}/>
      <br /><br />
      <span style={tip}>购买方账号&nbsp;&nbsp;&nbsp;</span><Input size="large" style={input}/>
      <br /><br />
      <span style={tip}>交易类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Input size="large" style={input}/>
      <br /><br />
      <span style={tip}>交易金额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Input size="large" style={input}/>
      <br /><br />
      <span style={tip}>上传文件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Input size="large" type='file' style={upload}/>
      <br /><br /><br />
      <Button type="primary" size="large" style={{width: 385}}>提交</Button>
    </div>)
    else if(key==3)
      return(<div>
              <Search
                placeholder="输入机构号搜索"
                enterButton="搜索"
                size="large"
                onSearch={value => console.log(value)}
                style={{marginLeft:'70%',marginBottom:22,width: '30%',minWidth:280}}
              />
              <Table columns={iousColumns} dataSource={iousData} />
            </div>)
    else if(key==4)
      return(<div>
          <Search
            placeholder="输入合同号搜索"
            enterButton="搜索"
            size="large"
            onSearch={value => console.log(value)}
            style={{marginLeft:'70%',marginBottom:22,width: '30%',minWidth:280}}
          />
          <Table columns={tradeColumns} dataSource={tradeData} />
          </div>)
    else 
    return(<div></div>)
  }

}
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
            <Avatar size="large" src="./bg.jpg" />
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