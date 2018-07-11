import React, { Component } from 'react'
import { Modal,Upload,message,Select,Form,Tooltip,Button,Layout,Menu, Icon, Input } from 'antd';
import axios from '../http'
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
const submit={

}
class ConVertify extends Component {
    state= {
      amount:50,
      editing:false,
      fileList: [],
      uploading: false,
      havefile:false,
    }
    
    verifyClick = (e) => {
        console.log("verifying")
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            if(this.state.havefile==true){
              console.log('Received values of form: ', values);
              axios.post('checkConId/'+values.verifyConID)        
                  .then(function(res){   
                      console.log("res");        
                      console.log(res); 
                      if(res.data.status=="1"){
                        Modal.success({
                          title: '合同哈希匹配成功',
                          content: '',
                      })
                      }     
                      else{
                        Modal.success({
                          title: '合同哈希匹配失败',
                          content: '',
                      })
                      }                    
                  })       
                  .catch(function(error){
                      console.log("error");     
                      console.log(error);       
                      Modal.success({
                        title: '合同哈希匹配失败',
                        content: '',
                    })
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
        var formdata = new FormData();
        formdata.append("file",files[0]);
        reqwest({
          url: 'http://192.168.20.15:8080/blockchain/upload',
          method: 'post',
          processData: false,
          data: formdata,
          contentType: false,
          withCredentials: true,
          success: () => {
            this.setState({
              fileList: [],
              uploading: false,
              havefile: true,
            });
            message.success('合同上传成功');
          },
          error: () => {
            this.setState({
              uploading: false,
            });
            message.error('合同上传失败');
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
    <Form onSubmit={this.verifyClick} className="submit-form">

    <span style={tip}>合同ID&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <FormItem style={inline}>
    {getFieldDecorator('verifyConID', {
    rules: [{ required: true, message: '您还没有输入合同ID！' }],
    })(<Input size="large" style={input}/>)}</FormItem>
    <br />


    <div style={{textAlign:'left',marginLeft:346}}>
          <span style={tip}>上传合同&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Upload {...props} style={inline}>
              <Button style={inline}>
                <Icon type="upload" /> 选择文件
              </Button>
          </Upload>

          <Button
              className="upload-demo-start"
              onClick={this.handleUpload}
              loading={uploading}
              style={upload}
              ghost={this.state.fileList.length === 0}
            >
              {uploading ? '上传中' : '开始上传' }
          </Button>
    </div>
    <br />

    <Button type="primary" htmlType="submit" size="large" className="submit-form-button" 
    style={{width: 385,marginTop:70}}>提交</Button>

    </Form>
  </div>)
  }
}

const WrappedConVertify = Form.create()(ConVertify);
export default WrappedConVertify;


