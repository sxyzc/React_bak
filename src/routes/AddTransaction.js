import React, { Component } from 'react'
import { Upload,message,Select,Form,Tooltip,Button,Layout,Menu, Icon, Input } from 'antd';

import axios from 'axios'
import reqwest from 'reqwest'
const Option = Select.Option;
const FormItem = Form.Item;

const tip={
    'fontSize':'20px'
  }
const inline= {
  'display':'inline-block'
}
const input = {
  'width':'265px',
  'display':'inline-block'
}
const upload = {
  'marginTop':'-61px',
  'marginLeft':'254px',
  'display':'block',
}
class AddTransaction extends Component {
      state= {
        amount:50,
        editing:false,
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
                  axios({
                    //url: 'http://47.106.237.105:8080/blockchain/add_transaction',
                    url: 'http://172.20.10.9:8080/blockchain/add_transaction',
                    method: 'post',
                    data: values,
                    withCredentials: true,
                  })        
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
          withCredentials: true,
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

    render() {
      const { getFieldDecorator } = this.props.form
      const { uploading } = this.state;  
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
      <div style={{textAlign:'left',marginLeft:343}}>
            <span style={tip}>上传合同&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Upload {...props} style={inline}>
                <Button style={inline}>
                  <Icon type="upload" /> 选择文件
                </Button>
            </Upload>

            <Button
                className="upload-demo-start"
                onClick={this.handleUpload}
                ghost={this.state.fileList.length === 0}
                loading={uploading}
                style={upload}
              >
                {uploading ? '上传中' : '开始上传' }
            </Button>
      </div>
      <br />

      <Button type="primary" htmlType="submit" size="large" className="submit-form-button" 
      style={{width: 385,marginTop:30}}>提交</Button>

      </Form>
    </div>)
    }
  }

const WrappedAddTransaction = Form.create()(AddTransaction);
export default WrappedAddTransaction;