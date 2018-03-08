
import React from 'react';
import {List} from 'antd';

export default class ListImage extends React.Component {


	constructor(props) {
		super(props);
		console.log(props.array)
		this.state={
			array:props.array,
		}
	}

	render() {
		return (
			 <List
		      size="large"
		      dataSource={this.state.array}
		      renderItem={item => (<List.Item><img alt="lm" className="listimage" src={item}  /></List.Item>)}
		    />
		);
	}
}
