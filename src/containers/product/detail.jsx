import React, {Component} from 'react';
import {Button, Card, List} from "antd";
import {
    DoubleLeftOutlined,
} from '@ant-design/icons';
import {connect} from "react-redux";

import './detail.css'

class Detail extends Component {
    state = {
        categoryId:'',
        categoryName:'',
        desc:'',
        detail:'',
        imgs:[],
        name:'',
        price:'',
    }

    componentDidMount() {
        const reduxProdList = this.props.productList
        const reduxCateList = this.props.categoryList
        const {id} = this.props.match.params
        if(reduxProdList.length) {
            let result = reduxProdList.find((item)=>{
                return item._id === id
            })
            if(result) {
                const {categoryId,desc,detail,imgs,name,price} = result
                this.categoryId = categoryId
                this.setState({categoryId,desc,detail,imgs,name,price})
            }
        } else this.getProductById(id)
        if(reduxCateList.length){
            // there will show something strange about React setState async
            // console.log('cateList from redux', reduxCateList)
            // console.log('cateId from self state', this.state.categoryId)
            let result = reduxCateList.find((item)=>{
                return item._id = this.categoryId
            })
            this.setState({categoryName:result.name})
        }
    }

    getProductById = async (id)=>{
        // Can't use this function because server error
        // let result = await reqProductById(id)
        // console.log(result)
    }

    render() {
        return (
            <div>
                <Card title={
                    <div className="left-top">
                        <Button type="link" size="small" onClick={()=>{this.props.history.goBack()}}>
                            <DoubleLeftOutlined style={{fontSize:'20px'}} />
                        </Button>
                        <span>Product Detail</span>
                    </div>
                }>

                    <List>
                        <List.Item>
                            <div>
                                <span className="prod-name">ProductName: </span>
                                <span className="prod-desc">{this.state.name}</span>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div>
                                <span className="prod-name">ProductDescription: </span>
                                <span className="prod-desc">{this.state.desc}</span>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div>
                                <span className="prod-name">ProductPrice: </span>
                                <span className="prod-desc">{this.state.price}</span>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div>
                                <span className="prod-name">ProductCategory: </span>
                                <span className="prod-desc">{this.state.categoryName}</span>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div>
                                <span className="prod-name">ProductImages: </span>
                                {
                                    this.state.imgs.map((item,index)=>{
                                        return <img key={index} src={`/upload/`+item} alt="img" />
                                    })
                                }
                            </div>
                        </List.Item>
                        <List.Item>
                                <span className="prod-name">ProductDetail: </span>
                                <span className="prod-detail" dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
                        </List.Item>
                    </List>
                </Card>
            </div>
        );
    }
}

export default connect(
    state=>({
        productList:state.productList,
        categoryList:state.categoryList,
    }),
)(Detail);