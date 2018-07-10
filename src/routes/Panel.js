import React, { Component } from 'react'
import { Upload,message,Select,Form,Tooltip,Table, Divider,Button,Avatar,Layout,Menu, Icon, Switch,Input } from 'antd';
import { Link} from 'react-router-dom';
import Amount from './Amount'
import axios from 'axios'
import reqwest from 'reqwest'
const Option = Select.Option;
const FormItem = Form.Item;
const Search = Input.Search;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
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
      <Button size="small">&nbsp;回收&nbsp;</Button>
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
      <Button size="small">&nbsp;修改&nbsp;</Button>
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
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }
  
  handleAmountChange(value) {
    this.setState({amount:value});
    //axios上去
  }

  state = {
    amount:152000000,
    editing:false,
    iconType:"edit",
    text:"修改",
    fileList: [],
    uploading: false,
    havefile:false,
  }

  submitClick = (e) => {
    console.log("here")
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.havefile==true){
          console.log('Received values of form: ', values);
          axios.post('http://47.106.237.105:8080/SUPL_DEMO/add_transaction',values)        
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
          }
        else{
          message.error('还没有上传合同文件');
        }
      }
    })
  }
  handleUpload = () => {
    const { fileList } = this.state;
    
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,     
    });
    
    console.log(formData)//这玩意好像是空的

    // You can use any AJAX library you like
    reqwest({
      url: 'http://47.106.237.105:8080/SUPL_DEMO/upload',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
          havefile: true,
        });
        message.success('上传成功');
        this.props.form.resetFields();
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('上传失败');
      },
    });
  }

  editClick = () => {
    if(this.state.editing==true){
      this.setState({
        iconType:"edit",
        text:"修改"
      });
    }
    else{
      this.setState({
        iconType:"save",
        text:"保存"
      });
    }
    console.log(this.state.iconType)
    this.setState({
      editing: !this.state.editing,
    });
  }
  getInitialState(){
    return {amount}
  }

  render() {  

    const { uploading } = this.state;  
    const {getFieldDecorator} = this.props.form
    var key=this.props.menukey;
    if( key ==3 ){
      console.log("   @@@@@@@@");
      iousColumns[0]['title']="ssss";
      var pageNum = 1;
      var pageSize =10;

      axios({
        //url: 'http://47.106.237.105:8080/blockchain/login',
        url: 'http://110.64.88.38:8080/blockchain/ioulist',
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
        //url: 'http://47.106.237.105:8080/blockchain/login',
        url: 'http://110.64.88.38:8080/blockchain/transactionlist',
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

      <br />

      <Button type="primary" htmlType="submit" size="large" className="submit-form-button" 
      style={{width: 385}}>提交</Button>

      </Form>
    </div>)
    else if(key==3)
      return(<div>
              <Search
                placeholder="输入机构号搜索"
                enterButton="搜索"
                size="large"
                onSearch={value => console.log(value)}
                style={{marginLeft:'70%',marginBottom:22,width: '30%',minWidth:280}}
              />
              <Table columns={iousColumns} dataSource={iousData} />
            </div>)
    else if(key==4)
      return(<div>
          <Search
            placeholder="输入合同号搜索"
            enterButton="搜索"
            size="large"
            onSearch={value => console.log(value)}
            style={{marginLeft:'70%',marginBottom:22,width: '30%',minWidth:280}}
          />
          <Table columns={tradeColumns} dataSource={tradeData} />
          </div>)
    else 
    return(<div></div>)
  }
}
const WrappedPanel = Form.create()(Panel);
export default WrappedPanel;