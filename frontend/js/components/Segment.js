import React from "react";

/*
Props:
level - what level does this segment exist at. Inner level = 0, next level = 1 etc.
order - where is this segment placed in the current level. Used to calculate absolute position.
color - the color this segment represents
left - the color that was to the left of the original color
right - the color that was to the right of the original color
*/
export default class Segment extends React.Component {
	constructor(){
		super();
		this.state = {expanded:false};
	}

	getColorLeft(){
		var a = Math.pow(0.333333, this.props.level+1);

		return this.lerpColors(this.props.color, this.props.left, a);
	}

	getColorRight(){
		var a = Math.pow(0.333333, this.props.level+1);

		return this.lerpColors(this.props.color, this.props.right, a);
	}

	lerpColors(c1, c2, a){
		return [	c1[0]*(1-a) + c2[0]*a,
					c1[1]*(1-a) + c2[1]*a,
					c1[2]*(1-a) + c2[2]*a
					];
	}

	calcAngleRadians(){
		var elemsInLevel = Math.pow(3, this.props.level + 1);
		return Math.PI*2 * ((this.props.order - this.props.level*10)/elemsInLevel);
	}

	toggleExpand(){
		if(this.props.level < 3){
			this.setState({expanded:!this.state.expanded});
		}
	}

	render(){
		var children = [];
		var elemsInLevel = Math.pow(3, this.props.level + 1);
		var distFromMiddle = 5 + (Math.pow(this.props.level, 1.1) *8);
		var radius = (7-(this.props.level*1.5))/2;
		var rgbString = "rgb("+Math.round(this.props.color[0])+", "+Math.round(this.props.color[1])+", "+Math.round(this.props.color[2])+")";

		if(this.props.level < 3){
			//Left subsegment
			children.push(
				<Segment
					level={this.props.level + 1}
					order={(this.props.order * 3) - 1}
					key={"segment nr. " + (this.props.order - 1) + " at level " + (this.props.level + 1)}
					color={this.getColorLeft()}
					left={this.props.left}
					right={this.props.color}
					visible={this.state.expanded && this.props.visible}
					layoutObj={this.props.layoutObj}
					setColor={this.props.setColor}
				/>);
			//Middle subsegment
			children.push(
				<Segment
					level={this.props.level + 1}
					order={(this.props.order * 3)}
					key={"segment nr. " + (this.props.order + " at level " + (this.props.level + 1))}
					color={this.props.color}
					left={this.props.left}
					right={this.props.right}
					visible={this.state.expanded && this.props.visible}
					layoutObj={this.props.layoutObj}
					setColor={this.props.setColor}
				/>);
			//Right subsegment
			children.push(
				<Segment
					level={this.props.level + 1}
					order={(this.props.order * 3) + 1}
					key={"segment nr. " + (this.props.order + 1) + " at level " + (this.props.level + 1)}
					color={this.getColorRight()}
					left={this.props.color}
					right={this.props.right}
					visible={this.state.expanded && this.props.visible}
					layoutObj={this.props.layoutObj}
					setColor={this.props.setColor}
				/>);
		}

		var style = {
			backgroundColor: rgbString,
			left:(50 - distFromMiddle*Math.cos(-0.5 * Math.PI - 2*(1/elemsInLevel)*this.props.order*Math.PI) - radius).toFixed(4) + "%",
			top:(50 + distFromMiddle*Math.sin(-0.5 * Math.PI - 2*(1/elemsInLevel)*this.props.order*Math.PI) - radius).toFixed(4) + "%",
			width:(radius*2)+"%",
			paddingTop:(radius*2)+"%",
			boxShadow:"0px 0px " + (radius*25) + "px " + rgbString,
		}

		return (
			<div className="wrapper-segment">
				<div
					className="segment-button"
					style={style}
					onClick={this.toggleExpand.bind(this)}
					onMouseOver={this.props.setColor.bind(this.props.layoutObj, this.props.color)}
					data-visible={this.props.visible}
				></div>
				{children}
			</div>
		);
	}
}