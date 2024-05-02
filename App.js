import React from "react";
import ReactDOM from "react-dom/client";

//Parcel OP:-
// Created a Server
// HMR: Hot Module Replacement
// File Watcher Algorithm
// Bundling
// Minify
// Cleaning our Code 
// Dev and Production Build 
// Super fast build Algorithm
// image optimization
// Caching while development
// Compression 
// Compatible with other version of browser
// HTTPS on devicePixelRatio
// Port Number
// Consistent Hashing Algorithm
// Zero Config

const heading  = React.createElement(
    "h1",
    {id: 'title1'},
    "Heading 1"
);
const heading2  = React.createElement(
    "h2",
    {id: 'title2'},
    "Heading 2"
);
const container  = React.createElement(
    "div",
    {id: 'container'},
    [heading, heading2]
);

const root = ReactDOM.createRoot(document.getElementById('root'));

//passing a root element inside the root
root.render(container);