import React from "react";

import Segment from "./Segment.js";

export default class Circle extends React.Component {
	constructor(){
		super();
		this.state = {expanded:true}
	}

	render(){
		var red = [255, 0, 0];
		var green = [0, 255, 0];
		var blue = [0, 0, 255];

		return (
			<div className="wrapper-circle">
				<Segment
					level={0}
					order={0}
					color={red}
					left={blue}
					right={green}
					visible={true}
					layoutObj={this.props.layoutObj}
					setColor={this.props.setColor}
				/>
				<Segment
					level={0}
					order={1}
					color={green}
					left={red}
					right={blue}
					visible={true}
					layoutObj={this.props.layoutObj}
					setColor={this.props.setColor}
				/>
				<Segment
					level={0}
					order={2}
					color={blue}
					left={green}
					right={red}
					visible={true}
					layoutObj={this.props.layoutObj}
					setColor={this.props.setColor}
				/>
			</div>
		);
	}
}