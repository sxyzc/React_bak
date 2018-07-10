import React, { Component } from 'react'
import Myious from './Myious'
import AddTransaction from './AddTransaction'
import IousList from './IousList'
import TradeList from './TradeList'
import ConVertify from './ConVertify'

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