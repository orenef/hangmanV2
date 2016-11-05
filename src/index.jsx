import "babel-polyfill";
import "./view/stickman.css";
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './view/components/Layout'

ReactDOM.render(<Layout message="You are alive!"/>, document.getElementById('test'));

