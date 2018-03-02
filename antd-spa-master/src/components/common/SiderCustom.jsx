import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Static from '../static/Static';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderCustom extends Component{
    constructor(props){
        super(props);
        const { collapsed }= props;
        this.state = {
            collapsed: collapsed,
            firstHide: true, //第一次先隐藏暴露的子菜单
            selectedKey: '', //选择的路径
            openKey: '', //打开的路径（选择的上一层）
            key:0,
        };
    }

    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps);
    }
    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        if(e.key==='外卖订单'||e.key==='堂食订单'){
                localStorage.setItem("orderType",e.key);
             if(!Static.order){
                Static.history.push({pathname:'/app/order'});
             }else{
                  let query=Static.order.state.query;
                  query.wheres[2].opertionValue=e.key;
                  Static.order.setState({query:query});
                  Static.order.getData();
             }
        }
        if(e.key==='轮播图'||e.key==='功能页面'){
           localStorage.setItem("carouselType",e.key);
            if(!Static.carousel){
                Static.history.push({pathname:'/app/carousel'});
             }else{
                  let query=Static.carousel.state.query;
                  query.wheres[1].opertionValue=e.key;
                  Static.carousel.setState({query:query,type:e.key});
                  Static.carousel.getData();
             }
        }

        
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render(){
        const { collapsed, firstHide, openKey, selectedKey } = this.state;
       
            return(
            <Sider
            trigger={null}
            collapsed={collapsed}
            >
                <div className="logo" style={collapsed?{backgroundSize:'70%'}:{backgroundSize:'30%'}}/>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={this.menuClick}
                    onOpenChange={this.openMenu}
                    openKeys={firstHide ? null : [openKey]}
                >

                    <Menu.Item key={"/app"}>
                        <Link to={"/app"}><Icon type="home" /><span>首页</span></Link>
                    </Menu.Item>
                     <SubMenu key="/app/carousel" title={<span><Icon type="user" />轮播图</span>}>
                       <Menu.Item key={"轮播图"}>
                            <span>轮播图列表</span>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="/app/carousel2" title={<span><Icon type="user" />功能页面</span>}>
                       <Menu.Item key={"功能页面"}>
                            <span>功能页面</span>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="/app/floor" title={<span><Icon type="user" />楼栋</span>}>
                       <Menu.Item key={"/app/floorlist"}>
                       <Link to={"/app/floorlist"}><span>查看楼栋</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="/app/categoryadd" title={<span><Icon type="edit" />店铺</span>}>
                       <Menu.Item key={"/app/categorylist"}>
                        <Link to={{pathname:"/app/categorylist",query:{type:'店铺分类'}}}><span>店铺分类</span></Link>
                         </Menu.Item>
                          <Menu.Item key={"/app/shopadd"}>
                        <Link to={{pathname:"/app/shopadd"}}><span>添加店铺</span></Link>
                         </Menu.Item>
                          <Menu.Item key={"/app/shoplist"}>
                        <Link to={{pathname:"/app/shoplist"}}><span>店铺列表</span></Link>
                         </Menu.Item>
                    </SubMenu>
                    <SubMenu key="/app/user" title={<span><Icon type="user" />用户</span>}>
                       <Menu.Item key={"/app/userlist"}>
                        <Link to={"/app/userlist"}><span>用户列表</span></Link>
                       </Menu.Item>
                    </SubMenu>
                     <SubMenu  key="/app/order" title={<span><Icon type="user" />订单</span>}>
                       <Menu.Item key={"外卖订单"}>
                            <span  >外卖订单</span>
                       </Menu.Item>
                       <Menu.Item key={"堂食订单"}>
                            <span  >堂食订单</span>
                       </Menu.Item>
                    </SubMenu>
                    <SubMenu key="/app/tj" title={<span><Icon type="user" />统计</span>}>
                       <Menu.Item key={"/app/tjsub"}>
                           <Link to={"/app/statistics"}><span>外卖统计</span></Link>
                       </Menu.Item>
                       <Menu.Item key={"/app/txlog"}>
                           <Link to={"/app/withdrawalslog"}><span>提现记录</span></Link>
                       </Menu.Item>
                    </SubMenu>
                    <Menu.Item key={"/app/schoolconfig"}>
                        <Link to={"/app/schoolconfig"}><Icon type="home" /><span>配置</span></Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
        
        
    }
}