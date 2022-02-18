import React, {Component,Fragment} from 'react';
import {Button, Card, Form, Input, message, Select} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {connect} from "react-redux";

import {reqAddProduct, reqCategoryList} from "../../api";
import PicturesWall from "./picture_wall";
import RichTextEditor from "./rich_text_editor";


const {Option} = Select
class AddUpdate extends Component {

    picturesWall = React.createRef();

    richTextEditor = React.createRef();

    formRef = React.createRef();

    state = {
        categoryList: [],
        operType:'add',
        categoryId:'',
        name:'',
        desc:'',
        price:'',
        detail:'',
        imgs:[],
        _id:'',
    }

    componentDidMount() {
        const {categoryList,productList} = this.props
        const {id} = this.props.match.params
        if (categoryList.length) this.setState({categoryList})
        else this.getCategoryList()
        // About product update
        if(id) {
            this.setState({operType:'update'})
            if(productList.length){
                let result = productList.find((item)=>{
                    return item._id === id
                })
                console.log(result)
                if(result) this.setState({...result},() => {
                    /*
                    * 这边是巨坑，需要注意,需要初始化表单列表
                    * 如果不重置无法回显表单以及照片还有富文本
                    */
                    this.formRef.current.resetFields();
                    //回显照片
                    //this.picturesWall.current.setImgArr(imgs);
                    //回显富文本
                    //this.richTextEditor.current.setRichText(detail);
                })
            }
        }
    }

    getCategoryList = async ()=>{
        let result = await reqCategoryList()
        const {status,data,msg} = result
        if(status===0) this.setState({categoryList:data})
        else message.error(msg)
    }

    handleFinish = async (values)=>{
        let imgs = this.picturesWall.current.getImgArr()
        let detail = this.refs.richTextEditor.getRichText()
        let pCategoryId = values.categoryId
        console.log(values)
        console.log(values.categoryId)
        let result = await reqAddProduct({...values,imgs,detail,pCategoryId})
        const {status} = result
        if(status===0) {
            message.success('Add product success!')
            this.props.history.replace('/admin/prod_about/product')
        }
        else message.error('Add product failed!')
    }

    render() {
        const {operType,name} = this.state
        return (
            <Fragment>
                <Card title={
                    <Fragment>
                        <ArrowLeftOutlined style={{marginRight: '20px', color: '#1DA57A'}} onClick={() => {
                            this.props.history.goBack()
                        }}/>
                        <span>{operType==='update'?'Product Update' : 'Product Add'}</span>
                    </Fragment>
                }>
                    <Form labelCol={{md: 5}} wrapperCol={{md: 14}} onFinish={this.handleFinish} ref={this.formRef}>
                        <Form.Item label="Name" name="name"
                                   initialValue={name}
                                   rules={[{required: true, whitespace: true, message: 'Please input product name'}]}>
                            <Input autoComplete="off" placeholder={name}/>
                        </Form.Item>
                        <Form.Item label="Description" name="desc"
                                   rules={[{required: true, whitespace: true, message: 'Please input product description'}]}>
                            <Input autoComplete="off" placeholder="Please input product description"/>
                        </Form.Item>
                        <Form.Item label="Price" name="price"
                                   rules={[{required: true, message: 'Please input product price'}]}>
                            <Input type="number" autoComplete="off" addonBefore="$" addonAfter="Dollar"
                                   placeholder="Please input product price and number required"/>
                        </Form.Item>
                        <Form.Item label="Category" name="categoryId"
                                   rules={[{required: true, message: 'Please choose product category'}]}>
                            <Select allowClear placeholder={"Please choose product category"}>
                                <Option value=''>Please select product category</Option>
                                {
                                    this.state.categoryList.map((item)=>{
                                        return <Option key={item._id} value={item._id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Product images">
                            <PicturesWall ref={this.picturesWall}/>
                        </Form.Item>
                        <Form.Item label="Product details" wrapperCol={{md: 14}}>
                            <RichTextEditor ref="richTextEditor" />
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 10}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Fragment>
        );
    }
}

export default connect(
    state=>({
        categoryList:state.categoryList,
        productList:state.productList,
    }),
    {

    }
)(AddUpdate);