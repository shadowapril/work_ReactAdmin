import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';

import './left_nav.css'
import menuList from "../../../config/menuConfig";
import {createSaveTitleAction} from "../../../redux/action_creators/menu_action";

const { SubMenu,Item } = Menu;

class LeftNav extends Component {

    createMenu = (target)=>{
        return target.map((item)=>{
            const icon = React.createElement(Icon[item.icon],{},null)
            if(!item.children){
                return(
                    <Item key={item.key} icon={icon} onClick={()=>{this.props.saveTitle(item.title)}}>
                        <Link to={item.path}>
                            {item.title}
                        </Link>
                    </Item>)
            } else {
                return(
                    <SubMenu key={item.key} icon={icon} title={item.title}>
                        {this.createMenu(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    render() {
        let {pathname} = this.props.location
        return (
            <div>
                <header className="nav-header">
                    <h1>Dashboard</h1>
                </header>
                <Menu
                    defaultSelectedKeys={pathname.indexOf('product') !== -1 ? 'product' : pathname.split('/').reverse()[0]}
                    defaultOpenKeys={pathname.split('/').splice(2)}
                    mode="inline"
                    theme="dark"
                >
                    {this.createMenu(menuList)}
                </Menu>
            </div>
        );
    }
}

export default connect(
    state =>({}),
    {
        saveTitle:createSaveTitleAction
    }
)(withRouter(LeftNav));