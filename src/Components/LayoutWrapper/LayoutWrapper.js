import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard'
import DeliveryDetail from '../DeliveryDetail/DeliveryDetail'
import 'antd/dist/antd.css';
import './LayoutWrapper.css'
import { Icon } from 'antd';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;



export default class LayoutWraper extends Component {

    // constructor (props) {
    //     super(props);
        // this.signIn = this.signIn.bind(this);
        // if (this.props.token === null) {
        //     window.location.replace("./")
        //     }
    //   }
    
    // componentDidMount () {
    //     const { match } = this.props;
    //     // console.log(match.params.co_id);
    //      if (this.props.token === null) {
    //  window.location.replace("./")
    //  }
    //   }

  

    render() {
        const {dashboard, match} = this.props;
        // console.log(this.props);
        return (
            <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1"><Link to="/dashboard"> Dashboard </Link>  </Menu.Item>
                <Menu.Item key="2" className="logout"><Link to="/logout"> <Icon type="logout" /> </Link>  </Menu.Item>
                {/* <Menu.Item key="2"></Menu.Item>
                */}
                 {/* <span className="header_title">Customer Orders</span> */}
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <div>
            {dashboard? 
            <Dashboard  />
            :
            <DeliveryDetail id={match.params.customerOrder_id}
            shippingPoint={match.params.shippingPoint_id}
                                // dataDetail = {Data[dataId]}
           /> 
        }
         </div>
            </div>
         </Content>
        {/* <Footer style={{ textAlign: 'center' }}>LafargeHolcim 2019</Footer> */}
        </Layout>
        )
    }
}
