import React, {Component, Fragment} from 'react';
import {Button, Card, Form, Input, Modal, Table, message, Tree} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {connect} from "react-redux";

import {PAGE_SIZE} from "../../config";
import menuList from "../../config/menuConfig";
import {reqAddRole, reqAuthRole, reqRoleList} from "../../api";

class Role extends Component {

    state = {
        isShowAdd: false,
        isShowAuth: false,

        roleList: [],
        menuList,

        // tree state
        expandedKeys: [],
        checkedKeys: [],
        selectedKeys: [],
        autoExpandParent:true,

        _id: '',
    }

    componentDidMount() {
        this.getRoleList()
    }

    formRef = React.createRef();

    getRoleList = async ()=>{
        let result = await reqRoleList()
        const {status,data} = result
        if(status===0){
            this.setState({roleList:data})
        }
    }

    handleOk = async (values)=>{
        let result = await reqAddRole(values)
        const {status} = result
        if(status===0) {
            message.success('Add Role success!')
            this.getRoleList()
        }
        this.setState({
            isShowAdd:false
        })
    }

    handleCancel = ()=>{
        this.setState({
            isShowAdd:false
        })
    }

    simClick = () => {
        document.getElementById('confirmRoleBtn').click()
    }

    handleAuthOk = async ()=>{
        const {username} = this.props.userInfo.user
        const {_id, checkedKeys} = this.state
        let result = await reqAuthRole({_id,menus:checkedKeys,auth_name:username})
        const {status} = result
        if(status===0) {
            message.success('Auth Role success!')
            this.getRoleList()
        } else {
            message.error('Operation failed')
        }
        this.setState({
            isShowAuth:false,
        })
    }

    handleAuthCancel = ()=>{
        this.setState({
            isShowAuth:false,
        })
    }

    showAuth = (id)=>{
        const {roleList} = this.state
        let result  = roleList.find((item)=>{
            return item._id === id
        })
        if(result) this.setState({
            checkedKeys:result.menus
        })
        this.setState({
            isShowAuth:true,
            _id: id,
        })
    }

    showAdd = ()=>{
        this.setState({
            isShowAdd:true
        })
        this.formRef.current.resetFields();

    }

    // tree call
     onExpand = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        // setExpandedKeys(expandedKeysValue);
        // setAutoExpandParent(false);
        this.setState({
            expandedKeys: expandedKeysValue,
            autoExpandParent: false,
        })
    };

     onCheck = (checkedKeysValue) => {
        console.log('onCheck', checkedKeysValue);
        //setCheckedKeys(checkedKeysValue);
         this.setState({
             checkedKeys:checkedKeysValue,
         })
    };

     onSelect = (selectedKeysValue,info) => {
         console.log('onSelect', info);
        // setSelectedKeys(selectedKeysValue);
         this.setState({
             selectedKeys:selectedKeysValue,
         })
    };

    render() {
        // Role add data
        const dataSource = this.state.roleList
        const columns = [
            {
                title: 'RoleName',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'CreateTime',
                dataIndex: 'create_time',
                key: 'create_time',
                render: item => {
                    return dayjs(item).format('YYYY-MM-DD HH:mm:ss')
                }
            },
            {
                title: 'AuthTime',
                dataIndex: 'auth_time',
                key: 'auth_time',
                render: item => {
                    if (item) {
                        return dayjs(item).format('YYYY-MM-DD HH:mm:ss')
                    }
                    return item;
                }
            },
            {
                title: 'AuthorBy',
                dataIndex: 'auth_name',
                key: 'auth_name'
            },
            {
                title: 'Operation',
                key: 'operator',
                render: (item) => (
                    <Button type="link" onClick={()=>{this.showAuth(item._id)}}>AllocatePermission</Button>
                ),
                width: "25%",
                align: 'center'
            }
        ];

        // Tree data
        const treeData =this.state.menuList;



        return (
            <Fragment>
                <Card extra={<Button type={"primary"} onClick={()=>{this.showAdd()}}><PlusCircleOutlined/>Add Role</Button>}>

                </Card>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered={true}
                    pagination={{defaultPageSize:PAGE_SIZE}}
                    rowKey={"_id"}
                />

                <Modal
                    title={"Add Role"}
                    visible={this.state.isShowAdd}
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
                            name="roleName"
                            initialValue={this.state.modalCurrentValue}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input role name!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input role name" />
                        </Form.Item>
                        <Form.Item hidden>
                            <Button type="primary" htmlType="submit" className="unknown-form-button" id="confirmRoleBtn">
                                Invisible
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>

                <Modal
                    title={"AuthManage"}
                    visible={this.state.isShowAuth}
                    onOk={this.handleAuthOk}
                    onCancel={this.handleAuthCancel}
                >
                    <Tree
                        checkable
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={this.state.checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                        treeData={treeData}
                    />

                </Modal>
            </Fragment>
        );
    }
}

export default connect(
    state =>({userInfo:state.userInfo}),
    {

    }
)(Role);