import React, { Component } from 'react'
import { Spin,Tooltip,Dropdown,Table,message,Button,Layout,Menu, Icon, Input, Modal } from 'antd';
import axios from '../http'
import './style.css';
const confirm = Modal.confirm;
function error(message) {
  Modal.error({
    title: '错误',
    content: message,
  });
}

const Search = Input.Search;

  var tradeData = []

var tradeData = []

class TradeList extends Component {
    state= {
      updating:false,
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      data: [],
      pagination: {},
      loading: false,
      ifTradeSearch: false,
      transactions: [],
    }

    //实现合同号搜索功能
    onInputChange = (e) => {
      this.setState({ searchText: e.target.value });
    }

    onSearch = () => {
      const { searchText } = this.state;
      const reg = new RegExp(searchText, 'gi');
      this.setState({
        filterDropdownVisible: false,
        filtered: !!searchText,
        data: this.state.data.map((record) => {
          console.log(record)
          const match = record.contract.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            contract: (
              <span>
                {record.contract.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i')).map((text, i) => (
                  text.toLowerCase() === searchText.toLowerCase()
                    ? <span key={i} className="highlight">{text}</span> : text // eslint-disable-line
                ))}
              </span>
            ),
          };
        }).filter(record => !!record),
      });
    }

    //实现远程加载数据
    handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    }
  
    fetch = (params = {}) => {
      this.setState({ loading: true });
      axios({
          url: 'transactionlist',
          method: 'post',
      })
      .then((res) => {
        console.log(res.data)
        var tradeData=[]
          for (let i = 0; i < res.data.length; i++) {
            tradeData.push({
              key: ((i+1)+""),
              contract: res.data[i]['conID'],
              sender: res.data[i]['buyOrg'],
              receiver: res.data[i]['saleOrg'],
              Num: res.data[i]['amount'],
              time: res.data[i]['updateTime'],
              latestStatus: res.data[i]['latestStatus']=="C"?"已完成":"未完成"
            });
          }
          const pagination = { ...this.state.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = res.data.length;
          this.setState({
            loading: false,
            pagination,
            data:tradeData,
          });         
      })
      .catch((error) => {
          console.log("error");     
          console.log(error);       
          message.error('获取交易列表失败');
      });

    }
    tradeBackAll = () => {
      this.setState({ifTradeSearch:false});
  }
  searchTransactionByConID = (conID) => {
    console.log("searchTransactionByConID")
  let win = this;
  axios({
      method:'post',
      url:'get_transaction/'+conID,
      data:{
      orgID:"bussiness_final"
      },
  }).then(function(res){
      console.log(res.data);
      if(!("status" in res.data)){
      console.log("in if");
      let obj = {
          key: "1",
          contract:res.data.conID,
          sender:res.data.buyOrg,
          receiver: res.data.saleOrg,
          Num: res.data.amount,
          time: res.data.transTime,
          latestStatus: res.data.latestStatus=="C"?"已完成":"未完成"
      }
      win.state.transactions.push(obj);
      console.log("1234564686")
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
    componentDidMount() {
      this.fetch();
    }

    handleStatusClick = (record) => {
      this.setState({transactions:[]});
      let win=this      
      confirm({
        title: '确认交易已完成吗?',
        content: '该操作不可逆，请谨慎确认。',
        onOk() {
          win.setState({updating:true});
          console.log(record)
          console.log("ok");
          axios({
            url: 'update_trans_status',
            method: 'post',
            data:{
              conID:record.contract,
            },
          })
          .then((res) => {            
            console.log("res"); 
            console.log(res); 
            if(res.data.status=="1"){
              Modal.success({title:'交易已完成！'})
              win.setState({updating:false});
              win.componentDidMount()
            } 
            else{
              Modal.error({title:'交易确认失败'})
            }            
          })
          .catch((error) => {
            console.log("error");     
            console.log(error);       
            message.error('网络状态不佳！');
            win.setState({updating:false});
          });
  
        },
        onCancel() {},
      });
  
    } 

render() {
  const tradeColumns = [{
    title: '合同号',
    dataIndex: 'contract',
    filterDropdown: (
      <div className="custom-filter-dropdown">
        <Input
          ref={ele => this.searchInput = ele}
          placeholder="Search name"
          value={this.state.searchText}
          onChange={this.onInputChange}
          onPressEnter={this.onSearch}
        />
        <Button type="primary" onClick={this.onSearch}>Search</Button>
      </div>
    ),
    filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
    filterDropdownVisible: this.state.filterDropdownVisible,
    onFilterDropdownVisibleChange: (visible) => {
      this.setState({
        filterDropdownVisible: visible,
      }, () => this.searchInput && this.searchInput.focus());
    },
  }, {
    title: '销售方账号',
    dataIndex: 'sender',
    align:"center",
  }, {
    title: '购买方账号',
    dataIndex: 'receiver',
    align:"center",
  }, {
    title: '白条金额',
    dataIndex: 'Num',
    align:"center",
  },{
    title: '交易时间',
    dataIndex: 'time',
    align:"center",
  },{
      title: '下载合同',
      align:"center",
      render: (text, record) => (
        <a style={{color:'inherit'}} 
        href={"http://192.168.20.15:8080/blockchain/download/"+record.contract}>
        <Tooltip placement="top" title="下载合同">
        <Button size="small" 
        icon="download"
        disabled={(record.sender!=sessionStorage['orgID'])&&(record.receiver!=sessionStorage['orgID'])} >
        </Button>
        </Tooltip>
        </a>        
      ),
  },{
    title: '交易状态',
    dataIndex: 'latestStatus',
    align:"center",
},{
  title: '操作',
  align:"center",
  render: (text, record) => (<span>
    <Button size="small"
            className={((((record.sender!=sessionStorage['orgID'])&&(record.receiver!=sessionStorage['orgID']))||(record.latestStatus!="未完成"))==true)?"hide":""}
            onClick={this.handleStatusClick.bind(this,record)}>
            完成交易</Button>
    </span>),
}];

  return(<Spin spinning={this.state.updating} tip="交易确认中...">
          <Search
            placeholder="输入合同号搜索"
            enterButton="搜索"
            size="large"
            onSearch={value => this.searchTransactionByConID(value)}
            style={{marginLeft:'70%',marginBottom:22,width: '30%',minWidth:280}}
          /><Table columns={tradeColumns}
                dataSource={this.state.ifTradeSearch?this.state.transactions:this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}/>
                </Spin>)
  }
}
export default TradeList