import React, {Component} from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import {Layout,Spin} from 'antd';
import '../../style/index.less';
import SiderCustom from '../common/SiderCustom';
import HeaderCustom from '../common/HeaderCustom';
import MIndex from '../index/Index';
import noMatch from '../common/404';
import Userlist from '../user/userlist';
import Categorylist from '../shop/categorylist';
import Static from '../static/Static';
import Floorlist from '../floor/floorlist';
import Shopadd from '../shop/shopadd';
import Shoplist from '../shop/shoplist';
import Category from '../shop/category';
import Productlist from '../product/productlist';
import Schoolconfig from '../schoolconfig/schoolconfig';
const {Content, Footer} = Layout;




export default class App extends Component {
     
      constructor(props) {
        super(props);
        Static.app=this;
    }


    state = {
        collapsed: localStorage.getItem("mspa_SiderCollapsed") === "true",
        loading:false
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("mspa_SiderCollapsed") === null) {
            localStorage.setItem("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;
        let name;
        if (Static.school === null) {
            return <Redirect to="/login"/>
        } else {
            name = Static.school.schoolName;
        }
       
        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>
                    <Content style={{margin: '0 16px'}}>
                     <Spin spinning={this.state.loading} size="large">
                        <Switch>  
                            <Route exact path={'/app'} component={MIndex} />
                            <Route exact path={'/app/userlist'} component={Userlist} />
                            <Route exact path={'/app/categorylist'} component={Categorylist} />
                            <Route exact path={'/app/category'} component={Category} />
                            <Route exact path={'/app/floorlist'} component={Floorlist} />
                            <Route exact path={'/app/shopadd'} component={Shopadd} />
                            <Route exact path={'/app/shoplist'} component={Shoplist} />
                             <Route exact path={'/app/productlist'} component={Productlist} />
                              <Route exact path={'/app/schoolconfig'} component={Schoolconfig} />
                            <Route component={noMatch} />
                        </Switch>
                         </Spin>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        react-antd ©2017 Created by sunwou
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
