import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import { Layout } from 'antd';

import Header from "./header/header";
import LeftNav from "./left_nav/left_nav";
import Home from "../../components/home/home";
import Category from "../category/category";
import Product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import Bar from "../bar/bar";
import Line from "../line/line";
import Pie from "../pie/pie";

import {createDeleteUserInfoAction} from "../../redux/action_creators/login_action";
import {reqCategoryList} from "../../api";
import './css/admin.css'

const {Footer, Sider, Content } = Layout;

class Admin extends Component {

    componentDidMount() {
        // console.log('admin mounted...',this.props)
    }

    logout = ()=> {
        this.props.deleteUserInfo()
    }

    demo = async ()=> {
        let result = await reqCategoryList()
        console.log(result)
    }

    render() {
            const {isLogin} = this.props.userInfo
            if(!isLogin) {
                return <Redirect to="/login"/>
            } else {
                return (

                    <Layout className="admin-container">
                        <Sider className="admin-sider">
                            <LeftNav/>
                        </Sider>
                        <Layout>
                            <Header />
                            <Content className="admin-content">
                                <Switch>
                                    <Route path="/admin/home" component={Home}/>
                                    <Route path="/admin/prod_about/category" component={Category}/>
                                    <Route path="/admin/prod_about/product" component={Product}/>
                                    <Route path="/admin/user" component={User}/>
                                    <Route path="/admin/role" component={Role}/>
                                    <Route path="/admin/charts/bar" component={Bar}/>
                                    <Route path="/admin/charts/line" component={Line}/>
                                    <Route path="/admin/charts/pie" component={Pie}/>
                                    <Redirect to="/admin/home"/>
                                </Switch>
                            </Content>
                            <Footer className="admin-footer">推荐使用IE浏览器，获得最佳工作体验</Footer>
                        </Layout>
                    </Layout>

                    /*<div>
                        Admin pages...
                        <hr/>
                        Your name is {user.username}
                        <br/>
                        <button onClick={this.logout}>LOGOUT</button>
                        <button onClick={this.demo}>获取商品分类</button>
                    </div>*/
                )
            };
    }
}

// 从redux中获取状态和操作状态的方法
export default connect(
    state => ({userInfo:state.userInfo}),
    {
        deleteUserInfo:createDeleteUserInfoAction
    }
)(Admin)