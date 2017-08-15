(function(){
  /**
   * 默认应该维护lib对应的min文件
   */
  var requireConfigPath = {
    "jquery": "../lib/jquery-3.2.1.min",
    "mustache": "../lib/mustache.min",
    "xdf.config": "../js/xdf.config",
    "xdf.util": "../js/xdf.util",
    'jqueryForm':"../lib/jquery.form.min",
    'css':'../lib/css.min',
    'react':'../lib/react.min',
    'reactDom':'../lib/react-dom.min',
    'xdf.reactBase':'../js/xdf.reactBase'
  };

  require.config({
    paths: requireConfigPath,
    shim: {
      'mustache': {
        exports: 'mustache'
      },
      'jqueryForm':{
        deps: ['jquery'],
        exports: "jqueryForm"
      },
      'reactDom':{
        deps: ['react'],
        exports: "reactDom"
      }
    }
  });
})();
