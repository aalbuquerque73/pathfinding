import React, { Component } from 'react';

export default function Cell(props) {
	const cost = (255 - props.cost).toString(16);
	const cost2 = (255 - props.cost / 2).toString(16);
	const color = props.cost < 200 ? `#${cost}${cost}${cost}` : props.cost < 255 ? `#${cost2}${cost}${cost}` : `#${cost2}0000`;
	const style = {
		display: 'inline-block',
		position: 'relative',
		backgroundColor: color,
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
	const title = `(${props.point.x}, ${props.point.y}): ${props.costs[props.point.value]} => ${color}`;
	return <div title={title} style={style} onClick={onClick}></div>;
}
