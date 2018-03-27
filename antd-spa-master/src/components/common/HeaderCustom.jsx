import React, { Component } from 'react';
import { Layout, Icon, Menu, Button} from 'antd';
/*import { Link } from 'react-router-dom';*/
import Static from '../static/Static';
const { Header } = Layout;
let that;
export default class HeaderCustom extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: props.collapsed,
            sendercount:0,
            shopcount:0,
        };
        that=this;
        this.init();
    };
    init(){
        var query={
            wheres:[
                {value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId},
                {value:'status',opertionType:'equal',opertionValue:'待审核'},
                {value:'isDelete',opertionType:'equal',opertionValue:false}
                ],
                pages:{currentPage:1,size:1}
        }
         Static.request('sender/find',{query:JSON.stringify(query)},function(res){
                   that.setState({
                    sendercount:res.params.total
                   })
         });
          Static.request('shopapply/find',{query:JSON.stringify(query)},function(res){
                   that.setState({
                    shopcount:res.params.total
                   })
         });
    };
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
        });
    };
    sender(){
         Static.history.push({pathname:'/app/sender'})
    };
    shopapply(){
        Static.history.push({pathname:'/app/shopapply'})
    };
    tixian(){
         Static.history.push({pathname:'/app/withdrawals'})
    };
    render(){
        return(
            <Header style={{ background: '#fff', padding: 0 }} className="header">
                <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item key="sender">
                        <a onClick={this.sender.bind(this)}>                            
                           <span> <Icon type="car" style={{fontSize:16, color: '#1DA57A' }}/>待审核配送员
                           <Button style={{background:'red'}} shape="circle" size="small"  type="danger">
                           <span style={{color:'#fff'}}>{this.state.sendercount}</span>
                           </Button>
                           </span>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="shop">
                        <a onClick={this.shopapply.bind(this)}>                            
                           <span> <Icon type="shop" style={{fontSize:16, color: '#1DA57A' }}/>待审核商家
                           <Button style={{background:'red'}} shape="circle" size="small"  type="danger">
                           <span style={{color:'#fff'}}>{this.state.shopcount}</span>
                           </Button>
                           </span>
                        </a>
                    </Menu.Item>
      
                    <Menu.Item key="tixain">
                        <a onClick={this.tixian.bind(this)}>                            
                            <Icon type="user" style={{fontSize:16, color: '#1DA57A' }}/>
                            {this.props.username}
                        </a>
                    </Menu.Item>
                 
              
                </Menu>
            </Header>
        )
    }
} 