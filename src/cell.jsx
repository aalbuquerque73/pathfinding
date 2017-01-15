import React, { Component } from 'react';

export default function Cell(props) {
	const cost = props.cost;
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
		if (props.onNewGoal) {
			props.onNewGoal(props.point);
		}
	};
	return <div style={style} onClick={onClick}></div>;
}
