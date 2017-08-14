define(function (require) {
  var $ = require("jquery");
  var Util = {};
  var XdfConfig = require("xdf.config");
  /**
   * 保留两位小数
   * 将浮点数四舍五入，取小数点后2位
   * @param x
   * @returns {*}
   */
  Util.toDecimal = function (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(x * 100) / 100;
    return f;
  };

  /**
   * 强制保留2位小数，如：2，会在2后面补上00.即2.00
   * @param x
   * @returns {*}
   */
  Util.toDecimal2 = function (x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  };

  //加法函数
  Util.addCalc = function (arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  };

//减法函数
  Util.subCalc = function (arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  };

//乘法函数
  Util.mulCalc = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
      m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  };


//除法函数
  Util.divCalc = function (arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
      t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    with (Math) {
      r1 = Number(arg1.toString().replace(".", ""));
      r2 = Number(arg2.toString().replace(".", ""));
      return (r1 / r2) * pow(10, t2 - t1);
    }
  };

  function ajaxData(_type, _funName, _data, _cbSuccess, _cbError, _cbBeforeSend, _cbComplete) {
    $.ajax({
      url: XdfConfig.apiUrl + _funName,
      type: _type,
      //headers:{"accessToken":_data.accessToken},//G_userInfo.AccessToken},
      xhrFields: {
        withCredentials: true
      },
      dataType: "json",
      data: _data || {},
      success: function (result) {
        typeof _cbSuccess == 'function' ? _cbSuccess(result) : '';
      },
      error: function (e) {
        typeof _cbError == 'function' ? _cbError(e) : '';
      },
      beforeSend: function (xhr) {
        //xhr.setRequestHeader("token","msg");//此处设置header参数键值对
        typeof _cbBeforeSend == 'function' ? _cbBeforeSend() : '';
      },
      complete: function () {
        typeof _cbComplete == 'function' ? _cbComplete() : '';
      }
    });
  }

  //get方法
  Util.getApi = function (_funName, _data, _cbSuccess, _cbError, _cbBeforeSend, _cbComplete) {
    ajaxData("GET", _funName, _data, _cbSuccess, _cbError, _cbBeforeSend, _cbComplete);
  };
  //post方法
  Util.postApi = function (_funName, _data, _cbSuccess, _cbError, _cbBeforeSend, _cbComplete) {
    ajaxData("POST", _funName, _data, _cbSuccess, _cbError, _cbBeforeSend, _cbComplete);
  };

  /**
   * 将json对象转化为get请求参数字符串
   * @param json
   * @returns {string}
   */
  Util.jsonToGetReqParam = function (json) {
    json = json || {};
    var paramAry = [];
    for (var key in json) {
      paramAry.push(key + "=" + json[key]);
    }
    return paramAry.join("&");
  };


  var Regex = {
    //数字
    Number: /^[0-9]+(.[0-9]+)?$/,
    //金额
    Money: /^[0-9]{1,8}(.[0-9]{1,2})?$/,
    //密码	密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
    Password: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
    //中文
    Chinese: /^[_\\W\\u4e00-\\u9fa5]{2,20}$/,
    //邮箱地址
    Email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    //身份证
    IdCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
    //日期 	“yyyy-mm-dd“ 格式的日期校验，已考虑平闰年。
    Date: /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,
    //手机号
    Phone: /^1\d{10}$/
  };

  //正则校验工具
  Util.Validate = {
    Regex: Regex,
    //正则判断
    is: function (regex, str) {
      var boolean = false;
      if (regex instanceof RegExp) {
        boolean = regex.test(str);
      } else if (typeof regex == "string") {
        boolean = Regex[regex] && Regex[regex].test(str);
      }
      return boolean;
    }
  };
  return Util;
});