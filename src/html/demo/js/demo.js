require(["jquery", "xdf.util"],
  function ($, XDFUtil) {
    /**
     * 业务文件
     */
    var EduAdmin = {};
    console.log('111111' + XDFUtil.toDecimal('222.333'))
    //动态引入css
    //注意css文件的路径，相对于引用此css文件的html的所在路径
    require(['css!../css/demo3'], function () {
      console.log(33333333)
    });
    return EduAdmin;
  }
);