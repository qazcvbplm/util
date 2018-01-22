import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../../style/index.less';
import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import MIndex from '../index/Index';
import noMatch from './404';
import Categoryadd from '../shop/categoryadd';

const {Content, Footer} = Layout;

export default class App extends Component {
    state = {
        collapsed: localStorage.getItem("mspa_SiderCollapsed") === "true",
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
        if (localStorage.getItem("mspa_user") === null) {
            /*return <Redirect to="/login"/>*/
        } else {
            name = "administrtor";
        }

        return (
            <Layout className="ant-layout-has-sider" style={{height: '100%'}}>
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>
                    <Content style={{margin: '0 16px'}}>
                        <Switch>
                            <Route exact path={'/app'} component={MIndex} />
                            <Route exact path={'/app/categoryadd'} component={Categoryadd} />
                            <Route component={noMatch} />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        react-antd ©2017 Created by sunwou
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
