import React, { Component } from 'react'
import { Dropdown,Modal,Upload,message,Select,Form,Tooltip,Table, Divider,Button,Avatar,Layout,Menu, Icon, Switch,Input } from 'antd';
import { Link} from 'react-router-dom';
import Amount from './Amount'
import axios from 'axios'
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
const input = {
  'width':'265px',
  'display':'inline-block'
}
const upload = {
  'marginTop':'-31px',
  'marginLeft':'670px',
  'display':'block',
}
const tip={
  'fontSize':'20px'
}
const inline= {
  'display':'inline-block'
}
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

class Panel extends Component {
  constructor(props) {
    super(props);
    this.getLimitFromServer();
  }

  // handleRecycleClick = (e) => {
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

  getLimitFromServer = () => {
    // 从服务器获取amount
    let win = this;
    if(this.state.updateAmount){
      console.log("getting amount");
      axios({
        method:'post',
        url:'http://172.20.10.9:8080/blockchain/get_entity_iou_limit',
        data:{
          orgID:"bussiness_final"
        },
      }).then(function(res){
        // console.log(res.data);
        win.setState({amount:res.data.iouLimit});
        win.setState({updateAmount:false});
        // console.log(res.data.iouLimit);
      }).catch(function(error){
        console.log("error");     
        console.log(error);       
      });
    }
  }
  
  handleAmountChange(value) {
    this.setState({amount:value});
    //axios上去
  }

  state= {
    currentOrg: "机构A",
    updateAmount: true,
    amount:50,
    editing:false,
    fileList: [],
    uploading: false,
    havefile:false,
    ifTradeSearch: false,
    transactions: []
  }

  submitClick = (e) => {
    console.log("here")
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.havefile==true){
          console.log('Received values of form: ', values);
          axios.post('http://172.20.10.9:8080/SUPL_DEMO/add_transaction',values)        
              .then(function(res){   
                  console.log("res");        
                  console.log(res); 
                  if(res.data.status=="1"){
                    message.success('录入交易成功');
                  }                         
              })       
              .catch(function(error){
                  console.log("error");     
                  console.log(error);       
              });   
          this.setState({updateAmount:true});
          }
        else{
          message.error('还没有上传合同文件');
        }
      }
    })
  }
  handleUpload = () => {
    console.log(this.state.fileList);
    this.setState({
      uploading: true,     
    });
    var files = this.state.fileList;
    reqwest({
      url: 'http://172.20.10.9:8080/blockchain/upload',
      method: 'post',
      processData: false,
      data: files,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
          havefile: true,
        });
        message.success('上传成功');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('上传失败');
      },
    });
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
          // key: ""+(tradeData.length+1),
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

  render() {  

    const { uploading } = this.state;  
    const { getFieldDecorator } = this.props.form
    var key=this.props.menukey;

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

    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    if( key ==3 ){
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

    if( key ==4 ){
      console.log("   @@@@@@@@");
      var pageNum = 1;
      var pageSize =10;

      axios({
        //url: 'http://172.20.10.9:8080/blockchain/login',
        url: 'http://172.20.10.9:8080/blockchain/transactionlist',
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
            //iousData = res.data;
            console.log(res); 
            console.log(tradeData);
            tradeData = [];
            for (let i = 0; i < res.data.length; i++) {
              tradeData.push({
                key: ((i+1)+""),
                contract: i,//res.data[i]['conID'],
                sender: res.data[i]['buyOrg'],
                receiver: res.data[i]['saleOrg'],
                Num: res.data[i]['amount'],
                time: res.data[i]['updateTime'],
              });
            }
            console.log(tradeData);
            console.log("1111111");
      })
      .catch((error) => {
        console.log("error");     
        console.log(error);       
        message.error('账号与密码不符！');
      });
    }

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
      <Form onSubmit={this.submitClick} className="submit-form">

      <span style={tip}>销售方账号&nbsp;&nbsp;&nbsp;</span>
      <FormItem style={inline}>
      {getFieldDecorator('saleOrg', {
      rules: [{ required: true, message: '您还没有输入销售方账号！' }],
      })(<Input size="large" style={input}/>)}</FormItem>
      <br />

      <span style={tip}>购买方账号&nbsp;&nbsp;&nbsp;</span>
      <FormItem style={inline}>
      {getFieldDecorator('buyOrg', {
      rules: [{ required: true, message: '您还没有输入购买方账号！' }],
      })(<Input size="large" style={input}/>)}</FormItem>
      <br />

      <span style={tip}>交易类型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <FormItem style={inline}>
      {getFieldDecorator('transType', {
      rules: [{ required: true, message: '您还没有选择交易类型！' }],
      })(
        <Select size="large" style={input}>
          <Option value="U">材料交易</Option>
          <Option value="F">成品交易</Option>
        </Select>    
      )}</FormItem>
      <br />

      <span style={tip}>交易金额&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <FormItem style={inline}>
      {getFieldDecorator('amount', {
      rules: [{ required: true, message: '您还没有输入交易金额！' }],
      })(<Input size="large" style={input}/>)}</FormItem>
      <br />
      <div>
            <span style={tip}>上传合同&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Upload {...props} style={inline}>
                <Button style={inline}>
                  <Icon type="upload" /> 选择文件
                </Button>
            </Upload>

            <Button
                className="upload-demo-start"
                type="primary"
                onClick={this.handleUpload}
                disabled={this.state.fileList.length === 0}
                loading={uploading}
                style={upload}
              >
                {uploading ? '上传中' : '开始上传' }
            </Button>
      </div>
      <br />

      <Button type="primary" htmlType="submit" size="large" className="submit-form-button" 
      style={{width: 385}}>提交</Button>

      </Form>
    </div>)
    else if(key==3)
      return(<div>
              <Table columns={iousColumns} dataSource={iousData} />
            </div>)
    else if(key==4)
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
    else 
    return(<div></div>)
  }
}
const WrappedPanel = Form.create()(Panel);
export default WrappedPanel;