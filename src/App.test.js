import { render, screen } from '@testing-library/react';
import SocialnetApp from './App';
//import ReactDOM from "react-dom";
import React from "react";

test('renders learn react link', () => {
  render(<SocialnetApp />);
  const imgElement = screen.getByAltText(/preloader/i);
  expect(imgElement).toBeInTheDocument();
});

/*
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocialnetApp />, div);
});*/
