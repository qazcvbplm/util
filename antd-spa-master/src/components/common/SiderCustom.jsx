import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

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
        }
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
                    <SubMenu key="/app/floor" title={<span><Icon type="user" />楼栋管理</span>}>
                       <Menu.Item key={"/app/floorlist"}>
                       <Link to={"/app/floorlist"}><span>查看楼栋</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="/app/categoryadd" title={<span><Icon type="edit" />店铺管理</span>}>
                       <Menu.Item key={"/app/categorylist"}>
                        <Link to={{pathname:"/app/categorylist",query:{type:'店铺分类'}}}><span>查看店铺分类</span></Link>
                         </Menu.Item>
                          <Menu.Item key={"/app/shopadd"}>
                        <Link to={{pathname:"/app/shopadd"}}><span>添加店铺</span></Link>
                         </Menu.Item>
                          <Menu.Item key={"/app/shoplist"}>
                        <Link to={{pathname:"/app/shoplist"}}><span>店铺列表</span></Link>
                         </Menu.Item>
                    </SubMenu>
                    <SubMenu key="/app/user" title={<span><Icon type="user" />用户管理</span>}>
                       <Menu.Item key={"/app/userlist"}>
                        <Link to={"/app/userlist"}><span>用户列表</span></Link>
                       </Menu.Item>
                    </SubMenu>
                    <Menu.Item key={"/app/schoolconfig"}>
                        <Link to={"/app/schoolconfig"}><Icon type="home" /><span>学校配置</span></Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
        
        
    }
}