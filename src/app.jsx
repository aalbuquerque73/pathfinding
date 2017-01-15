import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

import Board from './board';

const rand = Math.random;

class App extends Component {
  constructor() {
    super();

    this.state = {
      path: []
    };

    this.handleNewGoal = this.handleNewGoal.bind(this);
  }

  handleNewGoal(point) {
    this.setState({
      path: {
        start: this.state.path.goal,
        goal: point
      }
    });
  }

  componentWillReceiveProps(props) {}

  componentWillMount() {
    this.setState({ path: this.props.options.path });
  }

  render() {
    const reload = () => window.location.reload();

    const { size, width, height } = this.props.options;
    const path = this.state.path;
    const { start, goal } = path;

    return (
      <div>
        <Board size={size} map={`${width}x${height}`} path={path} onNewGoal={this.handleNewGoal} />
        <div className="notes">
          <div className="node start">start: ({start.x}, {start.y})</div>
          <div className="node goal">goal: ({goal.x}, {goal.y})</div>
        </div>
        <div className="command">
          <button className="button reload" onClick={reload}>Reload</button>
        </div>
      </div>
    );
  }
}

$(function() {
  const size = 10;
  const width = 10;
  const height = 10;

  const start = { x: parseInt(rand() * width), y: parseInt(rand() * height) };
  const goal = { x: parseInt(rand() * width), y: parseInt(rand() * height) };

  const path = { start, goal };

  const options = {
    size,
    width,
    height,
    path
  };

  render(
    <App options={options} />,
    $('.root')[0]
  );
});
