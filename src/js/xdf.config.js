/**
 * 接口配置文件
 */

define(function (require, exports, module) {
  //java接口地址
  var _apiUrl = "";

  //主机域名
  var _Hostname = window.location.hostname;

  //java接口地址
  var _ApiUrlDev = "http://tprojectapi.cn";//dev
  var _ApiUrlUat = "http://uprojectapi.cn";//uat
  var _ApiUrlLine = "http://projectapi.cn";//line

  //前端地址
  var _feDev =  "h5project.cn";//dev
  var _feUat =  "uproject.cn";//uat
  var _feLine =  "project.cn";//line

  //判断当前是正式环境还是测试环境
  if (_Hostname == _feLine) {//line
    _apiUrl = _ApiUrlLine;
  }else if(_Hostname == _feUat){//uat
    _apiUrl = _ApiUrlUat;
  } else {//dev
    _apiUrl = _ApiUrlDev;
  }

  //输出接口地址
  return {
    "apiUrl": _apiUrl
  }
});