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

var tradeData = []

class TradeList extends Component {
    state= {

      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      data: [],
      pagination: {},
      loading: false,
      ifTradeSearch: false,
      transactions: []
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
        var tradeData=[]
          for (let i = 0; i < res.data.length; i++) {
            tradeData.push({
              key: ((i+1)+""),
              contract: String(i),
              sender: res.data[i]['buyOrg'],
              receiver: res.data[i]['saleOrg'],
              Num: res.data[i]['amount'],
              time: res.data[i]['updateTime'],
            });
          }
          const pagination = { ...this.state.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
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
    componentDidMount() {
      this.fetch();
    }

    changeTransactionStatus = (record) => {
      if(record.saleOrg=="机构A"){ // 销售方为当前客户,他的操作只能是将未发货改成已发货
  
      }else if(record.buyOrg=="机构A"){ // 购买方为当前客户,他的操作只能是将
  
      }
      console.log("click");
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
      filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
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
  return(<div>
          <Search
            placeholder="输入合同号搜索"
            enterButton="搜索"
            size="large"
            onSearch={value => this.searchTransactionByConID(value)}
            style={{marginLeft:'70%',marginBottom:22,width: '30%',minWidth:280}}
          /><Table columns={tradeColumns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}/>
                </div>)
  }
}
export default TradeList