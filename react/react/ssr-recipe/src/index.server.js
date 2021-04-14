import React from 'react';
import ReactDOMServer from 'react-dom/server';

const html = reactDOMServer.renderToString(
  <div>Hello Server Side Rendering</div>
);

console.log(html);
