import React, { Component } from 'react'
import { Table,message,Button,Layout,Menu, Icon, Input } from 'antd';
import axios from 'axios'
import reqwest from 'reqwest'

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
      <Button size="small" onClick={this.handleRecycleClick}>&nbsp;回收&nbsp;</Button>
    ),
}];

var iousData = [{
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
        this.init();
      }

    init(){
        console.log("   @@@@@@@@");
        iousColumns[0]['title']="ssss";
        var pageNum = 1;
        var pageSize =10;

        axios({
        //url: 'http://172.20.10.9:8080/blockchain/login',
        url: 'http://172.20.10.9:8080/blockchain/ioulist',
        method: 'post',
        data: {
            "pageNum": "1",
            "pageSize":"10",
        },
        withCredentials: true,
        })
        .then((res) => {
            console.log("res");        
            console.log(res); 
            console.log(res); 
            console.log(iousData);
            iousData = [];
            for (let i = 0; i < res.data.length; i++) {
                iousData.push({
                key: ((i+1)+""),
                sender: res.data[i]['fromOrg'],
                receiver: res.data[i]['recOrg'],
                num: res.data[i]['amount'],
                returnNum: res.data[i]['paidAmt'],
                });
            }

            console.log(iousData);
            console.log("1111111");
        })
        .catch((error) => {
        console.log("error");     
        console.log(error);       
        message.error('账号与密码不符！');
        });
    }

    handleRecycleClick = (record) => {
        console.log(1)
        console.log(record)
        // var Target=e.currentTarget
        // console.log(Target)
        // console.log(Target.record.num)
        // console.log(Target.record.key)
        var iouId="00000022"
        var max=4723646//当前白条数量
        var amount=1
    
        // var amount=prompt("输入想要回收的白条额度")  
        // amount=Number(amount)
        // if(amount<0){error("回收额度不能为负！")}
        // else if(isNaN(amount)){error("必须输入数字！")}
        // else if(amount>max){error("回收额度超过当前白条数量！")}
        // else{
        //   var values={}
        //   values.iouId=iouId
        //   values.amount=amount
        //   console.log(values)    
        //   axios.post('http://172.20.10.9:8080/blockchain/recycle_iou',values) 
        //   .then(function(res){ 
        //     console.log("res"); 
        //     console.log(res); 
        //     if(res.data.status=="1"){
        //       message.success('回收白条成功');
        //     } 
        //   }) 
        //   .catch(function(error){
        //     console.log("error"); 
        //     console.log(error); 
        //   }); 
        // }
      }
   
    state= {
      amount:50,
      editing:false,
      fileList: [],
      uploading: false,
      havefile:false,
    }
  render() {
    return(<div>
    <Table columns={iousColumns} dataSource={iousData} />
  </div>)
  }
}

export default IousList;

