import React, {Component} from 'react'
import {Button, message, } from 'antd'
import {Routes, Route, Link, } from 'react-router-dom'

import Login from './containers/login/login'
import Admin from './containers/admin/admin'

class App extends Component {

    render() {
        return (
            <Routes>
                <Route path="/" element={<Admin/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        );
    }
}

export default App;