import React, { Component } from 'react'
import { Spin,Table,message,Button,Layout,Menu, Icon, Input, Modal } from 'antd';
import reqwest from 'reqwest'
import axios from '../http'
function error(message) {
  Modal.error({
    title: '错误',
    content: message,
  });
}

class IousList extends Component {
    state= {
        pagination: {},
        loading: false,
        recyling:false,
        amount:50,
        editing:false,
        fileList: [],
        uploading: false,
        havefile:false,
        test:11,
        iouList:[],
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
            console.log(this.state.iouList);
            this.state.iouList = [];
            for (let i = 0; i < res.data.length; i++) {
              this.state.iouList.push({
                key: ((i+1)+""),
                sender: res.data[i]['fromOrg'],
                receiver: res.data[i]['recOrg'],
                num: res.data[i]['amount'],
                returnNum: res.data[i]['paidAmt'],
                iouId:res.data[i]['iouId'],
                });
            }

            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = res.data.length;
            this.setState({
              loading: false,
              data: this.state.iouList.results,
              pagination,
            });
            
            console.log(this.state.iouList);
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
        console.log(1);
        console.log(record);

        var max=record.num-record.returnNum//当前能归还的白条数量
        var amount=1
    
        var amount=prompt("输入想要回收的白条额度")  
        amount=Number(amount)
        if(amount<0){error("回收额度不能为负！")}
        else if(isNaN(amount)){error("必须输入数字！")}
        else if(amount>max){error("所设额度超过当前未归还的白条数量！")}
        else{
          this.setState({recyling:true});
          var values={}
          values.iouId=record.iouId
          values.amount=amount
          console.log(values)  
          console.log("2222");
          axios({
            //url: 'http://47.106.237.105:8080/blockchain/login',
            url: 'http://127.0.0.1:8080/blockchain/recycle_iou',
            method: 'post',
            data:{
              iouId:record.iouId,
              amount:amount,
            },
            withCredentials: true,
          })
          .then((res) => {
            console.log("res"); 
            console.log(res); 
            if(res.data.status=="1"){
              message.success('回收白条成功');
            } 
            this.componentDidMount()
            this.setState({recyling:false});
          })
          .catch((error) => {
            console.log("error");     
            console.log(error);       
            message.error('网络状态不佳！');
            this.setState({recyling:false});
          });
        }
        
      }

  render() {
    const columns = [{
      title: '发放机构',
      dataIndex: 'sender',
    }, {
      title: '接收机构',
      dataIndex: 'receiver',
    }, {
      title: '白条数量',
      dataIndex: 'num',
      align:"center",
    }, {
      title: '已还数量',
      dataIndex: 'returnNum',
      align:"center",
    },{
      title: '白条状态',
      align:"center",
      render: (text, record) => (
        <Button size="small" 
        disabled={record.sender!=sessionStorage['orgID']} 
        onClick={this.handleRecycleClick.bind(this,record)}>&nbsp;回收&nbsp;</Button>
      ),
  }];

    return(
    <Spin spinning={this.state.recyling} tip="白条回收中...">
    <Table columns={columns}
                  dataSource={this.state.iouList}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}/>
    </Spin>)
  }
}

export default IousList;


