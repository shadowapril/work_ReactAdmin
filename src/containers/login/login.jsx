import React, {Component} from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import './login.css'
import {createSaveUserInfoAction} from "../../redux/action_creators/login_action";
import {reqLogin} from "../../api";


class Login extends Component {

    render() {

        const {isLogin} = this.props
        if (isLogin) {
            return <Redirect to="/admin/home"/>
        }

        const onFinish = async (values) => {
            const {username, password} = values
            let result = await reqLogin(username, password)
            const {status,msg,data} = result
            if(status === 0){
                // 路由覆盖但是页面不会刷新
                // 查阅资料疑似connect导致路由丢失 [https://www.h5w3.com/76159.html]，并且无法使用withRouter。 2022年2月8日17点27分，跳过此问题
                this.props.saveUserInfo(data)
                this.props.history.replace('/admin/home')

            } else {
                message.warn(msg)
            }
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
    state => ({isLogin:state.userInfo.isLogin}),
    {
        saveUserInfo:createSaveUserInfoAction,  //dispatchAction
    }
)(Login)