import React, { Component } from 'react';

export default class Cell extends Component {
	constructor() {
  	super();
    this.cost = parseInt(Math.random() * 255).toString(16);
  }
	render() {
		const cost = this.cost;
  	const style = {
    	display: 'inline-block',
      position: 'relative',
    	backgroundColor: `#${cost}${cost}${cost}`,
      width: 10,
      height: 10,
      padding: 0,
      margin: 0
    };
		const onClick = () => {
			if (this.props.onNewGoal) {
				this.props.onNewGoal(this.props.point);
			}
		};
  	return <div style={style} onClick={onClick}></div>;
  }
}
