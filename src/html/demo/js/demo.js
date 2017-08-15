require(["xdf.reactBase"],
  function (XDFReactBase) {
   console.log('demo.js')
    var ReactDOM = XDFReactBase.ReactDOM;
    var React = XDFReactBase.React;
    var Util = XDFReactBase.Util;
    var $ = Util.$;

    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('example')
    );
  }
);