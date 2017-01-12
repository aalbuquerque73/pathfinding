import React, { Component } from 'react';

export default class Cell extends Component {
	constructor() {
  	super();
    this.cost = parseInt(Math.random() * 255).toString(16);
  }
	render() {
  	const style = {
    	display: 'inline-block',
      position: 'relative',
    	backgroundColor: `#${this.cost}0000`,
      width: 10,
      height: 10,
      padding: 0,
      margin: 0
    };
  	return <div style={style}></div>;
  }
}
