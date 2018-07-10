import React, { Component } from 'react'
import { Table,message,Button,Layout,Menu, Icon, Input } from 'antd';
import reqwest from 'reqwest'
import axios from '../http'

const columns = [{
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
      <Button size="small" onClick={this.handleRecycleClick}>&nbsp;回收&nbsp;</Button>
    ),
}];

var data = [{
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

class IousList extends Component {
    constructor(props) {
        super(props);        
        // this.init();
      }

    state= {
        data: [],
        pagination: {},
        loading: false,

        amount:50,
        editing:false,
        fileList: [],
        uploading: false,
        havefile:false,
    }

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
        console.log('params:', params);
        this.setState({ loading: true });
        axios({
            url: 'ioulist',
            method: 'post',
        })
        .then((res) => {
            console.log("res");        
            console.log(res); 
            console.log(data);
            data = [];
            for (let i = 0; i < res.data.length; i++) {
                data.push({
                key: ((i+1)+""),
                sender: res.data[i]['fromOrg'],
                receiver: res.data[i]['recOrg'],
                num: res.data[i]['amount'],
                returnNum: res.data[i]['paidAmt'],
                });
            }

            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = 200;
            this.setState({
              loading: false,
              data: data.results,
              pagination,
            });
            
            console.log(data);
            console.log("1111111");
        })
        .catch((error) => {
            console.log("error");     
            console.log(error);       
            message.error('获取白条列表失败');
        });

      }
    
      componentDidMount() {
        this.fetch();
      }

    handleRecycleClick = (record) => {
      }

  render() {
    return(<Table columns={columns}
                  dataSource={data}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}/>)
  }
}

export default IousList;


