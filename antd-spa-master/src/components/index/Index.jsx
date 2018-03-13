import React, { Component } from 'react'; 
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import { Card, Row, Col, Collapse,Table,Tag} from 'antd';
/*import CountUp from 'react-countup';*/
import './index.less';
/*import ReactEcharts from 'echarts-for-react';*/
import Static from '../static/Static';
const Panel = Collapse.Panel;
const classify = [
    "社会",
    "爱情",
    "友情"
];
const text = [
    "只有人们的社会实践，才是人们对于外界认识的真理性的标准。真理的标准只能是社会的实践。",
    "这世界要是没有爱情，它在我们心中还会有什么意义！这就如一盏没有亮光的走马灯。",
    "友谊是灵魂的结合，这个结合是可以离异的，这是两个敏感，正直的人之间心照不宣的契约。"
];
const author = [
    " —— 毛泽东",
    " —— 歌德",
    " —— 伏尔泰"
];

let that;

export default class MIndex extends Component {
    constructor(props) {
         super(props);
         this.state={
            count:[0,0,0,0],
            query:{
                wheres:[{value:'schoolId',opertionType:'equal',opertionValue:Static.school.sunwouId}],
                pages:{currentPage:1,size:10}
            }
         }
         that=this;
         that.getData();
    };
    getData(){
        let that=this;
           Static.request('/statistics/schoolindex',{
            schoolId:Static.school.sunwouId
           },function(res){
              let temp=res.params; 
                 that.setState({
                   count:[temp.userActiveCount,temp.orderNumber,temp.schoolToDayTransactionMoney,temp.schoolMoney]
                 })
           }); 
           Static.request('/evaluate/find',{query:JSON.stringify(this.state.query)},function(res){
                 that.setState({
                    total:res.params.total,
                    data:res.params.pl
                 })
           });  
    };
    CountUp(){
        let imgSrc = ["mail","chat","cart","heart"];
        let imgName = ["活跃用户","订单数","交易额","余额"];
        let count = that.state.count;
        let cu = imgSrc.map(function(item,index){
            return(
                <Col md={6} key={item}>
                    <Card bordered={false} style={{cursor:'pointer'}}>
                        <div className='countBox'>
                            <img src={require('../../style/img/'+item+'.png')} alt=""/>
                            <dl>
                                <dt>{imgName[index]}</dt>
                              {/*  <dd><CountUp start={0} end=duration={2.75}/></dd>*/}
                              <dd>{count[index]} </dd>
                            </dl>
                        </div>
                    </Card>
                </Col>
            )
        });
        return cu;
    };
   /* getOption(){
        let option = {
            backgroundColor: "#fff",
            color: ['rgb(216, 151, 235)', 'rgb(246, 152, 153)', 'rgb(100, 234, 145)'],
            title: [{
                text: '账单/数量',
                left: '2%',
                top: '6%',
                textStyle: {
                    fontWeight:'normal',
                },
            }],
            tooltip: {
                trigger: 'axis'
            },
            grid:{
                left:'6%',
                width:'90%',
            },
            legend: {
                //x: 300,
                top: '7%',
                right: '3%',
                textStyle: {
                    color: 'gray',
                },
                data: ['外卖', '堂食']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine:{
                    lineStyle:{
                        color:'lightgray',
                    },
                },
                axisLabel:{
                    color:'gray'
                },
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            yAxis: {
                min: 10,
                max: 100,
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'lightgray',
                    },
                },
                axisLabel:{
                    color:'gray'
                },
            },
            series: [{
                name: '外卖',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [10, 40, 32, 20, 80, 90, 97]
            }, {
                name: '堂食',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [70, 50, 50, 87, 90, 80, 70]
            }]
        };
        return option;
    };*/
    Panel(){
        let panel = text.map(function(item,index){
            return(
                <Panel header={classify[index]} key={index}>
                    <p>{item}</p>
                    <p className="author">{author[index]}</p>
                </Panel>
            )
        });
        return panel;
    };
    render() {
            const columns = [{
              title: '订单号',
              key: 'orderId',
              dataIndex:'orderId'
            }/*,{
              title: '配送员',
              key: 'senderId',
              dataIndex:'senderId'
            }*/,{
              title: '店铺评分',
              key: 'shopNumber',
              render:function(text,record){
                   if(record.shopNumber===10){
                    return <Tag color="green">{record.shopNumber}分</Tag>
                   }
                   if(record.shopNumber>=8){
                    return <Tag color="cyan">{record.shopNumber}分</Tag>
                   }
                   if(record.shopNumber>=6){
                    return <Tag color="blue">{record.shopNumber}分</Tag>
                   }
                     if(record.shopNumber>=4){
                    return <Tag color="#f50">{record.shopNumber}分</Tag>
                   }
                    if(record.shopNumber>=2){
                    return <Tag color="red">{record.shopNumber}分</Tag>
                   }
                     if(record.shopNumber>=0){
                    return <Tag color="red">{record.shopNumber}分</Tag>
                   }
              }
            },{
              title: '配送员评分',
              key: 'senderNumber',
              render:function(text,record){
                   if(record.senderNumber===10){
                    return <Tag color="green">{record.senderNumber}分</Tag>
                   }
                   if(record.senderNumber>=8){
                    return <Tag color="cyan">{record.senderNumber}分</Tag>
                   }
                   if(record.senderNumber>=6){
                    return <Tag color="blue">{record.senderNumber}分</Tag>
                   }
                     if(record.senderNumber>=4){
                    return <Tag color="#f50">{record.senderNumber}分</Tag>
                   }
                    if(record.senderNumber>=2){
                    return <Tag color="red">{record.senderNumber}分</Tag>
                   }
                     if(record.senderNumber>=0){
                    return <Tag color="red">{record.senderNumber}分</Tag>
                   }
              }
            },{
              title: '描述店铺',
              key: 'shopDes',
              dataIndex:'shopDes'
            },{
              title: '描述配送员',
              key: 'senderDes',
              dataIndex:'senderDes'
            }];
        return (
            <div>
                <BreadcrumbCustom paths={['首页']}/>
                <div className='mindex'>
                    <Row gutter={16} style={{marginBottom:'20px'}}>
                        {this.CountUp()}
                    </Row>
                    <Row gutter={24} style={{marginBottom:'20px'}}>
                        <Col md={24}>
                          {/*  <Card bodyStyle={{padding: 0,height:'277px',overflow:'hidden'}}>
                                <ReactEcharts
                                    option={this.getOption()}
                                />
                            </Card>*/}
                        </Col>
                        {/*<Col md={8}>
                            <Card bodyStyle={{padding: 0}}>
                                <div className='avatar'>
                                    <Avatar
                                        shape='circle'
                                        src={zysoft}
                                        style={{width: '60px', height: '60px', borderRadius: '50%'}}
                                    />
                                    <p>onepieces</p>
                                    <p>471594060@qq.com</p>
                                </div>
                                <div className='weather'>
                                  
                                    <div className='weather-img'>
                                        <img src={require('../../style/img/0.png')} alt=""/>
                                    </div>
                                    <div className='weather-info'>
                                        <span>火星</span>&nbsp;<span>16℃</span>
                                    </div>
                                </div>
                            </Card>
                        </Col>*/}
                    </Row>
                    {/*<Row gutter={16} style={{marginBottom:'20px'}}>
                        <Col md={8}>
                            <Card>
                                <div>
                                    <h3>项目进度</h3>
                                    <p>C#Winform/Smart React</p>
                                </div>
                                <div className='pro'>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <p>ACQ1</p>
                                            <Progress type="dashboard" percent={25} width={125} id='pro1'/>
                                        </Col>
                                        <Col span={12}>
                                            <p>SmartPress</p>
                                            <Progress type="dashboard" percent={50} width={125} id='pro2'/>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <p>BUILD6</p>
                                            <Progress type="dashboard" percent={75} width={125} id='pro3'/>
                                        </Col>
                                        <Col span={12}>
                                            <p>MSPA</p>
                                            <Progress type="dashboard" percent={100} width={125} format={() => 'Done'} id='pro4'/>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card>
                                <div>
                                    <h3>项目流程</h3>
                                </div>
                                <div className="timeline">
                                    <Timeline>
                                        <Timeline.Item color="green">
                                            <p>创建项目 - 2017-10-01</p>
                                            <p>搭建UI框架 - 2017-10-02</p>
                                            <p>对接协议 - 2017-10-04</p>
                                            <p>实现功能 - 2017-10-05</p>
                                        </Timeline.Item>
                                        <Timeline.Item color="red">
                                            <p>通信调试 - 2017-10-10</p>
                                            <p>功能测试 - 2017-10-11</p>
                                            <p>错误调试 - 2017-10-13</p>
                                        </Timeline.Item>
                                        <Timeline.Item color="blue">
                                            <p>界面优化 - 2017-10-15</p>
                                            <p>性能优化 - 2017-10-17</p>
                                            <p>发布版本 - 2017-10-20</p>
                                        </Timeline.Item>
                                    </Timeline>
                                </div>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card bodyStyle={{height:'407px', overflow:'hidden'}}>
                                <div>
                                    <h3>人生感悟</h3>
                                </div>
                                <div className="collapse">
                                    <Collapse accordion defaultActiveKey={"0"}>
                                        {this.Panel()}
                                    </Collapse>
                                </div>
                            </Card>
                        </Col>
                    </Row>*/}
                    <Row>
                        <Col md={24}>
                            <Card>
                                <div style={{marginBottom:'20px'}}>
                                    <h3>用户评论</h3>
                                </div>
                                <Table
                                    columns={columns}
                                    dataSource={this.state.data}
                                   pagination={{
                                        pageSize:this.state.query.pages.size,
                                        total:this.state.total,
                                        showTotal: function (total) {  //设置显示一共几条数据
                                            return '共 ' + total + ' 条数据'; 
                                        },
                                        onChange:function(page,pagesize){
                                            let query=this.state.query;
                                            query.pages.currentPage=page;
                                            query.pages.size=pagesize;
                                             this.setState({
                                                query:query
                                             });
                                             this.getData();
                                        }.bind(this)
                                    }}
                                         />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
   