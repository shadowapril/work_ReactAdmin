import React, {Component} from 'react';
import {Button,Popconfirm} from "antd";
import {withRouter} from 'react-router-dom'
import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons'
import screenfull from 'screenfull'
import {connect} from "react-redux";
import dayjs from "dayjs";

import './css/header.css'
import {createDeleteUserInfoAction} from "../../../redux/action_creators/login_action";
import {reqWeather} from "../../../api";
import menuList from "../../../config/menuConfig";

class Header extends Component {

    state = {
        isFull: false,
        myDate: dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
        weatherInfo: {},
        title:''
    }

    fullScreen = ()=> {
        screenfull.toggle()
    }

    componentDidMount() {

        screenfull.on('change', () => {
            let isFull = !this.state.isFull
            this.setState({isFull})
        });

        this.timeID = setInterval(()=>{
            this.setState({
                myDate:dayjs().format('YYYY年 MM月DD日 HH:mm:ss')
            })
        },1000)

        this.getWeather()
        this.getTitle()
    }

    componentWillUnmount() {
        clearInterval(this.timeID)
    }

    logOut = ()=>{
        this.props.deleteUser()
    }

    cancel = ()=>{

    }

    getWeather = async ()=> {
        let weatherInfo = await reqWeather()
        this.setState({weatherInfo})
    }

    getTitle = ()=>{
        let pathKey = this.props.location.pathname.split('/').reverse()[0]
        let title = ''
        menuList.forEach((item)=>{
            if(item.children instanceof Array){
                let tmp = item.children.find((citem)=>{
                    return citem.key === pathKey
                })
                if(tmp) title = tmp.title
            } else {
                if(pathKey === item.key) title = item.title
            }
        })
        this.setState({
            title
        })
    }

    render() {
        let {user} = this.props.userInfo
        return (
            <header className="admin-header">
                <div className="header-top">
                    <Button size="small" onClick={this.fullScreen}>
                        {
                            this.state.isFull?<FullscreenExitOutlined />:<FullscreenOutlined />
                        }
                    </Button>
                    <span className="user-name">Welcome,{user.username}</span>
                    <Popconfirm
                        title="Are you sure to sign out?"
                        onConfirm={this.logOut}
                        onCancel={this.cancel}
                        okText="Yes"
                        cancelText="No"
                    >

                        <Button type="link" href="#" className="sing-out">Logout</Button>
                    </Popconfirm>

                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        {this.props.title || this.state.title}
                    </div>
                    <div className="header-bottom-right">
                        {this.state.myDate}&nbsp;&nbsp;
                        {this.state.weatherInfo.weather}&nbsp;&nbsp;
                        {this.state.weatherInfo.temperature}℃
                    </div>
                </div>

            </header>
        );
    }
}

export default connect(
    state => ({
        userInfo:state.userInfo,
        title:state.title
    }),
    {
        deleteUser:createDeleteUserInfoAction
    }
)(withRouter(Header));