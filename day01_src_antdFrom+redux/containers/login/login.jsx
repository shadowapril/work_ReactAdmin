import React, {Component} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import './login.css'
import {createDemo1Action,createDemo2Action} from "../../redux/action_creators/test_action";

class Login extends Component {

    componentDidMount() {
        console.log('login mounted...', this.props)
    }

    render() {


        const onFinish = (values) => {
            console.log('Received values of form: ', values);
            this.props.demo1('zou')
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className="login">
                <header className="login-header">
                    <h1>TOP-MALL 后台管理系统{this.props.test}</h1>
                </header>

                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                                {
                                    min: 4,
                                    message: 'Password should more than 4 bit!'
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );
    }
}



export default connect(
    state => ({test:state.test}),
    {
        demo1:createDemo1Action,
        demo2:createDemo2Action,
    }
)(Login)