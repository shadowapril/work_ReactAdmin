import React, {Component, Fragment} from 'react';
import {reqAddUser, reqUserList,} from "../../api";
import {Button, Card, Form, Input, message, Modal, Select, Table,} from "antd";
import dayjs from "dayjs";
import {PlusCircleOutlined} from "@ant-design/icons";
import {PAGE_SIZE} from "../../config";


const { Option } = Select;
class User extends Component {

    state = {
        isShowAdd: false,

        userList: [],
        roleList: [],
    }


    componentDidMount() {
        this.getUserList()
    }

    formRef = React.createRef();

    getUserList = async ()=>{
        let result = await reqUserList()
        const {status,data} = result
        if(status===0) {
            this.setState({
                userList: data.users.reverse(),
                roleList: data.roles,
            })
        }
    }

    handleOk = async (values)=>{
        let result = await reqAddUser(values)
        const {status,data,msg} = result
        if(status===0) {
            message.success('Add User success!')
            let userList = [...this.state.userList]
            userList.unshift(data)
            this.setState({
                userList,
                isShowAdd:false
            })
            this.formRef.current.resetFields();
        } else message.error(msg,1)
    }

    handleCancel = ()=>{
        this.formRef.current.resetFields();
        this.setState({
            isShowAdd:false
        })
    }

    simClick = () => {
        document.getElementById('confirmUserBtn').click()
    }

    showAdd = ()=>{
        this.setState({
            isShowAdd:true
        })
    }

    render() {
        // Role add data
        const dataSource = this.state.userList
        const columns = [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: 'CreateTime',
                dataIndex: 'create_time',
                key: 'create_time',
                render: item => {
                    if (item) {
                        return dayjs(item).format('YYYY-MM-DD HH:mm:ss')
                    }
                    return item;
                }
            },
            {
                title: 'Role',
                dataIndex: 'role_id',
                key: 'role_id',
                render: item => {
                    if (item) {
                        const {roleList} = this.state;
                        if (roleList.length) {
                            let role = roleList.find(role => {
                                return role._id === item;
                            })
                            if (role) {
                                return role.name;
                            }
                        }
                    }
                    return item;
                }
            },
            {
                title: 'Operation',
                key: 'operator',
                render: (item) => {
                    return (
                        <Fragment>
                            <Button type="link">Update</Button>
                            <Button type="link">Delete</Button>
                        </Fragment>
                    );
                },
                width: "25%",
                align: 'center'
            }
        ];

        return (
            <Fragment>
                <Card extra={<Button type={"primary"} onClick={()=>{this.showAdd()}}><PlusCircleOutlined/>Add User</Button>}>

                </Card>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered={true}
                    pagination={{defaultPageSize:PAGE_SIZE}}
                    rowKey={"_id"}
                />

                <Modal
                    title={"Add User"}
                    visible={this.state.isShowAdd}
                    onCancel={this.handleCancel}
                    footer={
                        [<Button key="cancel" type="primary" htmlType="submit" onClick={this.handleCancel}>Cancel</Button>,
                            <Button key="ok" type="primary" htmlType="submit" onClick={this.simClick} >OK</Button>]     // Your are so boring....
                    }
                >
                    <Form
                        name="user_create"
                        className="user-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.handleOk}
                        onFinishFailed={this.onFinishFailed}
                        ref={this.formRef}
                    >
                        <Form.Item
                            name="username"
                            initialValue={this.state.modalCurrentValue}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input username!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            initialValue={''}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input password!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input password" />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            initialValue={''}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input phone number!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input phone number" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            initialValue={''}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input email!',
                                },
                            ]}
                        >
                            <Input placeholder="Please input email" />
                        </Form.Item>
                        <Form.Item
                            name="role_id"
                            initialValue={''}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose user role',
                                },
                            ]}
                        >
                            <Select
                                onChange={(value)=>{this.setState({searchType:value})}}
                            >
                                <Option value=''>Please choose user role</Option>
                                {
                                    this.state.roleList.map((item)=>{
                                        return <Option key={item._id} value={item._id}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item hidden>
                            <Button type="primary" htmlType="submit" className="unknown-form-button" id="confirmUserBtn">
                                OK
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>

            </Fragment>
        );
    }
}

export default User;