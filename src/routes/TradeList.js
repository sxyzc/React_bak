import React, { Component } from 'react'
import { Dropdown,Table,message,Button,Layout,Menu, Icon, Input } from 'antd';
import reqwest from 'reqwest'
import axios from '../http'
const Search = Input.Search;
function handleMenuClick(){

}
const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">未发货</Menu.Item>
      <Menu.Item key="2">已发货</Menu.Item>
    </Menu>
  );
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
        title: '下载合同',
        render: (text, record) => (
            <Button>下载</Button>
        //   <Button size="small" disabled={(record.sender!="机构A")&&(record.receiver!="机构A")} onClick={this.changeTransactionStatus(record)} >&nbsp;下载&nbsp;</Button>
        )
    },{
      title: '修改状态',
      render: (text, record) => (
        <Dropdown overlay={menu}>
          <Button size="small" disabled={record.sender!="机构A"}>
          &nbsp;修改&nbsp;<Icon type="down" />
          </Button>
        </Dropdown>
      ),
  }];
  var tradeData = [{
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


class TradeList extends Component {
    constructor(props) {
        super(props);        
        this.init();
      }

    changeTransactionStatus = (record) => {
        if(record.saleOrg=="机构A"){ // 销售方为当前客户,他的操作只能是将未发货改成已发货
    
        }else if(record.buyOrg=="机构A"){ // 购买方为当前客户,他的操作只能是将
    
        }
        console.log("click");
      }

    init(){
        console.log("   @@@@@@@@");
        var pageNum = 1;
        var pageSize =10;
  
        axios({
          url: 'transactionlist',
          method: 'post',
          data: {
              "pageNum": "1",
              "pageSize":"10",
          },
        })
        .then((res) => {
              console.log("res");        
              console.log(res); 
              tradeData = [];
              for (let i = 0; i < res.data.length; i++) {
                tradeData.push({
                  key: ((i+1)+""),
                  contract: i,
                  sender: res.data[i]['buyOrg'],
                  receiver: res.data[i]['saleOrg'],
                  Num: res.data[i]['amount'],
                  time: res.data[i]['updateTime'],
                });
              }
              console.log(tradeData);
        })
        .catch((error) => {
          console.log("error");     
          console.log(error);       
          message.error('账号与密码不符！');
        });
    }


    state= {
        ifTradeSearch: false,
        transactions: []
      }
    tradeBackAll = () => {
        this.setState({ifTradeSearch:false});
    }
    searchTransactionByConID = (conID) => {
    let win = this;
    axios({
        method:'post',
        url:'http://172.20.10.9:8080/blockchain/get_transaction/'+conID,
        data:{
        orgID:"bussiness_final"
        },
    }).then(function(res){
        console.log(res.data);
        if(!("status" in res.data)){
        console.log("in if");
        console.log(tradeData.length);
        let obj = {
            key: "1",
            contract:res.data.conID,
            sender:res.data.buyOrg,
            receiver: res.data.saleOrg,
            Num: res.data.amount,
            time: res.data.transTime
        }
        win.state.transactions.push(obj);
        // win.setState({transactions:});
        console.log(win.state.transactions);
        win.setState({ifTradeSearch:true});
        }else {
        message.error("该交易不存在",1)
        console.log("in else");
        }
    }).catch(function(error){
        console.log("error");     
        console.log(error);       
    });
    }
    render(){
        return(<div>
            <Search
              placeholder="输入合同号搜索"
              enterButton="搜索"
              size="large"
              onSearch={value => this.searchTransactionByConID(value)}
              style={{marginLeft:'70%',marginBottom:22,width: '30%',minWidth:280}}
            />
            {/* onSearch后要把对应的state里头的ifTradeSearch设置为true */}
            <Table columns={tradeColumns} dataSource={this.state.ifTradeSearch?this.state.transactions:tradeData} />
            <Button onClick={this.tradeBackAll} ghost={!this.state.ifTradeSearch}>返回全部</Button>
            </div>)
    }
}

export default TradeList