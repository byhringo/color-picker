import React from "react";

import Circle from "./Circle.js";
export default class Layout extends React.Component {
	constructor(){
		super();
		this.state = {color:[-1, -1, -1]}
	}

	setColor(newColor){
		this.setState({color:newColor});
	}

	componentToHex(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	}

	rgbToHex(c) {
	    return "#" + this.componentToHex(Math.round(c[0])) + this.componentToHex(Math.round(c[1])) + this.componentToHex(Math.round(c[2]));
	}

	render(){
		var colorInfo = null;

		if(this.state.color[0] != -1){
			var rgbText = "RGB-value: [" + Math.round(this.state.color[0]) + ", " + Math.round(this.state.color[1]) + ", " + Math.round(this.state.color[2]) + "]";
			var hexText = "Hex value: " + this.rgbToHex(this.state.color);
			var rgbString = "rgb("+Math.round(this.state.color[0])+", "+Math.round(this.state.color[1])+", "+Math.round(this.state.color[2])+")";

			colorInfo = (<div className="wrapper-colorinfo">
				<div className="solidcolorblock" style={{backgroundColor:rgbString}}></div>
				<div>
					<div className="colorinfo-text">{rgbText}</div>
					<div className="colorinfo-text">{hexText}</div>
				</div>
			</div>)
		}

		return (
			<div className="wrapper-all">
				<div className="wrapper-topbar">
					<div>Click a color to begin</div>
					{colorInfo}
				</div>
				<Circle
					layoutObj={this}
					setColor={this.setColor}
				/>
			</div>
		);
	}
}