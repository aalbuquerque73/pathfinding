import React from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

import Board from './board';

$(function() {
  const size = 10;
  const width = 10;
  const height = 10;

  const start = { x: Math.random() * width, y: Math.random() * height };
  const end = { x: Math.random() * width, y: Math.random() * height };

  const path = { start, end };

  render(
    <Board size={size} map={`${width}x${height}`} path={path} />,
    $('.root')[0]
  );
});
