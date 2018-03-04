import React, {Component} from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import {Layout,Spin,Affix,Button,Modal} from 'antd';
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
import SenderList from '../apply/sender';
import Carousel from '../carousel/carousel';
import ShopApply from '../apply/shopapply';
import Order from '../order/order';
import Statistics from '../tj/statistics';
import ShopStatistics from '../tj/shopstatistics';
import Withdrawals from '../withdrawals/withdrawals';
import WithdrawalsLog from '../withdrawals/withdrawalsLog';
import ArticleList from '../article/articlelist';
import Rich from '../article/rich';
const {Content, Footer} = Layout;




export default class App extends Component {
     
      constructor(props) {
        super(props);
        this.state={
            visible:false,
            console:[],
            debug:false
        }
        Static.app=this;
        /*this.socket();*/
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
     socket(){
       let that=this;
       let socket = new WebSocket('wss://www.wojush.com/frame/ws/socket');
         socket.onmessage = function(e){
            that.state.console.push(e.data);
             that.setState({console:that.state.console})
         };
         socket.onerror=function(e){
                 console.log(e)
         }
         socket.onopen=function(e){
                 console.log("连接成功");
                 that.setState({debug:true})
         }
     };
    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("mspa_SiderCollapsed") === null) {
            localStorage.setItem("mspa_SiderCollapsed", false);
        }
    };

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
            <Modal
              title="控制台信息"
              visible={this.state.visible}
              onOk={() => this.setState({visible:false})}
              onCancel={() => this.setState({visible:false})}
              width={1200}
            >
              <div dangerouslySetInnerHTML={{__html: this.state.console}} />

            </Modal>
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
                              <Route exact path={'/app/sender'} component={SenderList} />
                               <Route exact path={'/app/shopapply'} component={ShopApply} />
                               <Route exact path={'/app/carousel'} component={Carousel} />
                                <Route exact path={'/app/order'} component={Order} />
                                 <Route exact path={'/app/statistics'} component={Statistics} />
                                 <Route exact path={'/app/shopstatistics'} component={ShopStatistics} />
                                 <Route exact path={'/app/withdrawals'} component={Withdrawals} />
                                 <Route exact path={'/app/withdrawalslog'} component={WithdrawalsLog} />
                                 <Route exact path={'/app/article'} component={ArticleList} />
                                  <Route exact path={'/app/rich'} component={Rich} />
                            <Route component={noMatch} />
                        </Switch>
                         </Spin>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        react-antd ©2017 Created by sunwou
                    </Footer>
                </Layout>
                {this.state.debug===true?<Affix style={{ position: 'absolute', top: '20', left: '20'}}>
                  <Button type="primary" onClick={() => this.setState({visible:true})}>Console</Button>
                </Affix>:null}
            </Layout>
        );
    }
}
