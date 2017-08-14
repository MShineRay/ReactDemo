(function(){
  /**
   * 默认应该维护lib对应的min文件
   */
  var requireConfigPath = {
    "jquery": "../lib/jquery/v2.2.3/jquery-2.2.3.min",
    "select2": "../lib/Select2/js/select2.full.min",
    "mustache": "../lib/mustache/v2.2.1/mustache.min",
    "layer": "../lib/layer-v3.0.1/layer/layer",
    "laydateNew": "../lib/laydate-v1.1_new/laydate/laydate",
    "pagination": "../lib/pagination/1.0.x/pagination",
    "xdf.config": "../js/xdf.config",
    "xdf.util": "../js/xdf.util",
    "jqueryUI": "../lib/jquery-ui-1.12.1.custom/jquery-ui.min",
    "jqGrid":"../lib/jqgrid/js/jquery.jqGrid",
    "jqGridCn":"../lib/jqgrid/js/i18n/grid.locale-cn",
    "jquery-ui/ui/widget":"../lib/jquery.ui.widget",
    "jqueryIframeTransport":"../lib/jquery.iframe-transport",
    "fileupload":"../lib/jquery.fileupload",
    'jqueryForm':"../lib/jquery.form",
    "jqCookie": "../lib/jquery.cookie",
    'xdfTimePicker':"../lib/xdfTimePicker/js/xdf.timepicker",
    'css':'../lib/css.min'
  };

  require.config({
    paths: requireConfigPath,
    shim: {
      'mustache': {
        exports: 'mustache'
      },
      "layer": {
        deps: ['jquery'],
        exports: "layer"
      },
      "laydateNew": {
        exports: "laydate"
      },
      "fileupload":{
        deps: ['jquery',"jquery-ui/ui/widget","jqueryIframeTransport"],
        exports: "fileupload"
      },
      'jqueryForm':{
        deps: ['jquery'],
        exports: "jqueryForm"
      }
    }
  });
})();
