import React, { Component } from 'react'
import { Dropdown,Modal,Upload,message,Select,Form,Tooltip,Table, Divider,Button,Avatar,Layout,Menu, Icon, Switch,Input } from 'antd';
import { Link} from 'react-router-dom';
import axios from 'axios'
import Myious from './Myious'
import AddTransaction from './AddTransaction'
import IousList from './IousList'
import TradeList from './TradeList'
import ConVertify from './ConVertify'
import reqwest from 'reqwest'
const Option = Select.Option;
const FormItem = Form.Item;
const Search = Input.Search;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function error(message) {
  Modal.error({
    title: '错误',
    content: message,
  });
}



class Panel extends Component {
  render() {  
    var key=this.props.menukey;
    if(key==1)
      return (<Myious />)
    else if(key==2) 
    return(<AddTransaction />)
    else if(key==5)
    return(<ConVertify />)
    else if(key==3)
    return(<IousList />)
    else if(key==4)
    return(<TradeList />)
    else 
    return(<div></div>)
  }
}
export default Panel;