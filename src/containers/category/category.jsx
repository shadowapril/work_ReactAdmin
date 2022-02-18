import React, {Component} from 'react';
import {Card, Button, Table, Modal, message, Form, Input} from 'antd';
import {
    PlusSquareOutlined,
} from '@ant-design/icons';
import {connect} from "react-redux";

import {reqAddCategory, reqCategoryList, reqUpdateCategory} from '../../api/'
import {PAGE_SIZE} from "../../config";
import {createSaveCategoryAction} from "../../redux/action_creators/category_action";

class Category extends Component {

    state = {
        categoryList:[],
        isModalVisible: false,
        operType:'',
        modalCurrentValue:'',
        modalCurrentId:'',
    }

    formRef = React.createRef();

    componentDidMount() {
        this.getCategoryList()
    }

    getCategoryList = async ()=>{
        let result = await reqCategoryList()
        const {status, data, msg} = result
        if(status===0) {
            this.setState({categoryList:data.reverse()})
            this.props.saveCategory(data)
        }
        else message.error(msg,1)
    }

    showAdd = () => {
        this.setState({
            isModalVisible:true,
            operType: 'add',
            modalCurrentValue:'',
            modalCurrentId:'',
        });
    };
    showUpdate = (item) => {
        const {_id, name} = item
        this.setState({
            isModalVisible:true,
            operType: 'update',
            modalCurrentValue:name,
            modalCurrentId:_id,
        });
    };

    handleOk = (values) => {
        const {operType,modalCurrentId} = this.state
        if(operType === 'add') this.toAdd(values)
        if(operType === 'update') {
            const categoryName = values.categoryName
            const categoryId = modalCurrentId
            const categoryObj = {categoryName,categoryId}
            this.toUpdate(categoryObj)
        }
        this.formRef.current.resetFields()
        this.setState({
            isModalVisible:false
        })

    };

    onFinishFailed = ()=>{
        message.warning('Invalid input, please check again!')
    }

    handleCancel = () => {
        this.formRef.current.resetFields()
        this.setState({
            isModalVisible:false
        })
    };

    simClick = () => {
        document.getElementById('confirmCategoryBtn').click()
    }

    toAdd = async (values)=> {
        let result = await reqAddCategory(values)
        const {status, data} = result
        if(status === 0) {
            message.success('Operation success!')
            let categoryList = [...this.state.categoryList]     //
            categoryList.unshift(data)                          // add one at first
            this.setState({categoryList})                  // update state
        }
        if(status === 1) message.error('Operation failed!',1)
    }

    toUpdate = async (categoryObj)=> {
        console.log(categoryObj)
        let result = await reqUpdateCategory(categoryObj)
        const {status} = result
        if(status === 0){
            message.success('Update category success!',1)
            this.getCategoryList()
        } else {
            message.warning('Update category failed!',1)
        }
    }

    render() {

        const dataSource = this.state.categoryList
        let {operType,isModalVisible} = this.state

        const columns = [
            {
                title: 'categoryName',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Operation',
                // dataIndex: 'categoryName',
                key: 'age',
                width: '25%',
                align: 'center',
                render:(item)=>{return <Button type="link" onClick={()=>{this.showUpdate(item)}}>Update Category</Button>}
            },
        ];

        return (
            <div >
                <Card
                    title=""
                    extra={<Button type="primary" shape="round" onClick={this.showAdd}>
                        <PlusSquareOutlined />
                        Add
                    </Button>}>
                    <Table
                        rowKey="_id"
                        dataSource={dataSource}
                        columns={columns}
                        bordered={true}
                        pagination={{
                            pageSize:PAGE_SIZE,
                            showQuickJumper:true
                        }}
                    />
                </Card>
                <Modal
                    title={operType === 'add' ? 'Add Category' : 'Update Category'}
                    visible={isModalVisible}
                    onCancel={this.handleCancel}
                    footer={
                        [<Button key="cancel" type="primary" htmlType="submit" onClick={this.handleCancel}>Cancel</Button>,
                        <Button key="ok" type="primary" htmlType="submit" onClick={this.simClick} >OK</Button>]     // Your are so boring....
                        }
                >
                    <Form
                        name="normal_login"
                        className="category-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.handleOk}
                        onFinishFailed={this.onFinishFailed}
                        ref={this.formRef}
                    >
                        <Form.Item
                            name="categoryName"
                            initialValue={this.state.modalCurrentValue}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input category type!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input category type" />
                        </Form.Item>
                        <Form.Item hidden>
                            <Button type="primary" htmlType="submit" className="unknown-form-button" id="confirmCategoryBtn">
                                OK
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}

export default connect(
    state =>({}),
    {
        saveCategory:createSaveCategoryAction
    }
)(Category);