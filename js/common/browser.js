// 获取html节点和宽度
var html= document.getElementsByTagName("html")[0], 
	pageWidth = html.getBoundingClientRect().width;
// 屏幕宽度/数值=结果
html.style.fontSize = pageWidth/15 + "px";

var util = (function(){var system = {};
var p = navigator.platform;
var u = navigator.userAgent;

system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
if (system.win || system.mac || system.xll) {//如果是PC转
 if (u.indexOf('Windows Phone') > -1) {  //win手机端

  }else {
    //window.location.href = " pc_tip.html";
  }
}
})();