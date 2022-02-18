import React, {Component} from 'react';
import {Card, Button, Select, Input, Table, message} from 'antd';
import {
    PlusSquareOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import {connect} from "react-redux";

import {reqProductList, reqSearchProduct, reqUpdateProdStatus} from "../../api";
import {PAGE_SIZE} from "../../config";
import {createSaveProductAction} from "../../redux/action_creators/product_action";

const { Option } = Select;
class Product extends Component {

    state = {
        productList:[],
        total:1,
        current:1,
        keyWord:'',
        searchType:'productName',
    }

    componentDidMount() {
        this.getProductList()
    }

    getProductList = async (number=1)=>{
        let result
        if(this.isSeach){
            const {searchType, keyWord} = this.state
            result = await reqSearchProduct(number,PAGE_SIZE,searchType,keyWord)
        } else {
            result = await reqProductList(number,PAGE_SIZE)
        }
        const {status, data} = result
        if(status===0){
            this.setState({
                total:data.total,
                productList:data.list,
                current:data.pageNum,
            })
            this.props.saveProduct(data.list)
        } else message.error('Operation failed!')
    }

    updateProdStatus = async ({_id,status})=>{
        let productList = [...this.state.productList]
        status = status === 1 ? 2 : 1
        let result = await reqUpdateProdStatus(_id,status)
        if(result.status===0) {
            message.success('Update success!',1)
            productList = productList.map((item)=>{
                if(item._id === _id){
                    item.status = status
                }
                return item
            })
            this.setState({
                productList
            })
        }
        else message.error('Update failed!',1)
    }

    search = async ()=>{
        this.isSeach = true
        this.getProductList()
    }

    render() {

        const dataSource = this.state.productList;

        const columns = [
            {
                title: 'Goods Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Goods Description',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                align:"center",
                width:'10%',
                render:(price)=>'$ '+price
            },
            {
                title: 'Status',
                // dataIndex: 'status',
                key: 'status',
                align:"center",
                width:'10%',
                render:(item)=>{
                    const {status} = item
                    return (
                        <div>
                            <Button
                                type={status === 1 ? 'danger' : 'primary'}
                                onClick={()=>{this.updateProdStatus(item)}}
                            >
                                {status === 1 ? 'Pull Back' : 'Push Back'}
                            </Button>
                            <span style={{marginLeft:"5px"}}>{status === 1 ? 'On Sale' : 'Off Sale'}</span>
                        </div>
                    )
                }
            },
            {
                title: 'Operation',
                //dataIndex: 'opera',
                key: 'opera',
                align:"center",
                width:'10%',
                render:(item)=>{
                    return (
                        <div>
                            <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${item._id}`)}}>Good Details</Button>
                                <br/>
                            <Button type="link" onClick={()=>{this.props.history.push(`/admin/prod_about/product/add_update/${item._id}`)}}>Good Update</Button>
                        </div>
                    )
                }
            },
        ];

        return (
            <Card
                title={
                    <div>
                        <Select
                            defaultValue="productName"
                            onChange={(value)=>{this.setState({searchType:value})}}
                        >
                            <Option value="productName">Search by name</Option>
                            <Option value="productDesc">Search by description</Option>
                        </Select>
                        <Input
                            placeholder="Please input keyword"
                            style={{margin:'0px 10px',width:'20%'}}
                            allowClear
                            onChange={(event)=>{this.setState({keyWord:event.target.value})}}
                        />
                        <Button type="primary" onClick={this.search}> <SearchOutlined />Search</Button>
                    </div>
                }
                extra={<Button type="primary" onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}}><PlusSquareOutlined />Add</Button>}
                >

                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                    rowKey='_id'
                    pagination={{
                        total:this.state.total,
                        pageSize:PAGE_SIZE,
                        current:this.state.current,
                        onChange:this.getProductList
                    }}
                />
            </Card>
        );
    }
}

export default connect(
    state => ({}),
    {
        saveProduct:createSaveProductAction
    }
)(Product)