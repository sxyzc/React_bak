import React, { Component } from 'react'
import { Table,message,Button,Layout,Menu, Icon, Input, Modal } from 'antd';
import reqwest from 'reqwest'
import axios from '../http'
function error(message) {
  Modal.error({
    title: '错误',
    content: message,
  });
}

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
        //console.log(record.currentTarget);
    
        // var Target=e.currentTarget
        // console.log(Target)
        // console.log(Target.record.num)
        // console.log(Target.record.key)
        var iouId="00000022"
        var max=4723646//当前白条数量
        var amount=1
    
        var amount=prompt("输入想要回收的白条额度")  
        amount=Number(amount)
        if(amount<0){error("回收额度不能为负！")}
        else if(isNaN(amount)){error("必须输入数字！")}
        else if(amount>max){error("回收额度超过当前白条数量！")}
        else{
          var values={}
          values.iouId=record.iouId
          values.amount=amount
          console.log(values)  
          console.log("2222");
          axios({
            //url: 'http://47.106.237.105:8080/blockchain/login',
            url: 'http://172.20.10.9:8080/blockchain/recycle_iou',
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
            this.handleTableChange;
          })
          .catch((error) => {
            console.log("error");     
            console.log(error);       
            message.error('网络状态不佳！');
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
    }, {
      title: '已还数量',
      dataIndex: 'returnNum',
    },{
      title: '白条状态',
      render: (text, record) => (
        <Button size="small" onClick={this.handleRecycleClick.bind(this,record)}>&nbsp;回收&nbsp;</Button>
      ),
  }];

//   var data = [{
//     key: '1',
//     sender: '机构A',
//     receiver:'机构B',
//     num: 4723646,
//     returnNum:0,
//   }, {
//     key: '2',
//     sender: '机构C',
//     receiver:'机构D',
//     num: 13426,
//     returnNum:0,
//   }, {
//     key: '3',
//     sender: '机构E',
//     receiver:'机构F',
//     num: 434265,
//     returnNum:0,
// }];


    return(<div>
      {/* <button>sssss{this.state.test}</button> */}
    <Table columns={columns}
                  dataSource={this.state.iouList}
                  pagination={this.state.pagination}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}/></div>)
  }
}

export default IousList;


