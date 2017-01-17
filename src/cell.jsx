import React, { Component } from 'react';

export default function Cell(props) {
	const cost = (255 - props.cost).toString(16);
	const style = {
		display: 'inline-block',
		position: 'relative',
		backgroundColor: `#${cost}${cost}${cost}`,
		width: props.size,
		height: props.size,
		padding: 0,
		margin: 0
	};
	const onClick = () => {
		if (props.onNewGoal) {
			props.onNewGoal(props.point);
		}
	};
	const title = `(${props.point.x}, ${props.point.y}): ${props.costs[props.point.value]}`;
	return <div title={title} style={style} onClick={onClick}></div>;
}
