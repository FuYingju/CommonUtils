/*权限*/
var READ_CONTACTS = 0; // 获取联系人
var CALL_PHONE = 1; // 获取打电话
var CAMERA = 2; // 相机
var READ_EXTERNAL_STORAGE = 3; // 读取本地文件
var WRITE_EXTERNAL_STORAGE = 4; // 写文件
var REQUESTPERMISSIONS = [
	"android.permission.READ_CONTACTS",
	"android.permission.CALL_PHONE",
	"android.permission.CAMERA",
	"android.permission.READ_EXTERNAL_STORAGE",
	"android.permission.WRITE_EXTERNAL_STORAGE"
];
(function(mui, tools) {
	tools.DEBUG = true;//是否是开发环境  true开发环境  false 生产环境
	/**
	 * POST请求方法封装
	 * @param {Object} method 请求的接口名称
	 * @param {Object} paramIn 调用接口时的in参数 json格式
	 * @param {Object} successCallBack 成功是调用的回调函数
	 * @param {Object} errCallBack 出错时调用的回调函数
	 */
	tools.ajaxPost = function(method, paramIn, successCallBack, errCallBack) {
		var url = tools.getURL(method,paramIn);
		console.log("url------>"+url);
		console.log("method------>" + method);
		jQuery.ajax({
			url: method,
			type: "post",
			data: tools.getParam(paramIn),
			timeout: 30000,
			error: function(e, type) {
				console.log("errorMsg--------------->" + JSON.stringify(e));
				if(errCallBack != null) {
					errCallBack("请求服务器失败，请确认网络链接！");
				}
			},
			success: function(data) {
				successCallBack(data);
			},
			complete: function() {

			},
			dataType: "JSON"
		});
	}
	tools.ajaxGet = function(method, paramIn, successCallBack, errCallBack) {
			//		var url = tools.getURL(method,paramIn);
			console.log("method------" + method);
			console.log("paramIn------" + JSON.stringify(paramIn));
			console.log("paramInStr------" + JSON.stringify(tools.getParam(paramIn)));
			jQuery.ajax({
				url: method,
				type: "get",
				data: tools.getParam(paramIn),
				timeout: 30000,
				error: function(e, type) {
					console.log("errorMsg--------------->" + JSON.stringify(e));
					if(errCallBack != null) {
						errCallBack("请求服务器失败，请确认网络链接！");
					}
				},
				success: function(data) {
					successCallBack(data);
				},
				complete: function() {
	
				},
				dataType: "JSON"
			});
		}
	/**
	 * POST请求方法封装
	 * @param {Object} method 请求的接口名称
	 * @param {Object} paramIn 调用接口时的in参数 json格式
	 * @param {Object} successCallBack 成功是调用的回调函数
	 * @param {Object} errCallBack 出错时调用的回调函数
	 */
	tools.ajaxPost_encode = function(method, paramIn, successCallBack, errCallBack) {
		//		var url = tools.getURL(method, encodeURI(paramIn));
		console.log("method------" + method);
		console.log("paramIn------" + paramIn);
		jQuery.ajax({
			url: method,
			type: "post",
			data: tools.getParam(paramIn.filterEm()),
			timeout: 30000,
			error: function(e, type) {
				if(errCallBack != null) {
					errCallBack("请求服务器失败，请确认网络链接！");
				}
			},
			success: function(data) {
				if(data.retCode == 2){//对不起，您没有请求权限，请先登录系统
					t_toast(data.retMsg);
					localStorage.setItem('userInfo', null);//登录账号
					localStorage.setItem('userPhone', '');//登录账号
					localStorage.setItem('passWord', '');//登录账号
					var pathUrl = "";
					if(mui.os.ios) {
						pathUrl = "file://";
					}
					pathUrl += BASEPATH + 'www/pages/login.html';
					
//					if(mui.os.android) {
//						tools.fnCloseAllPages(plus.webview.currentWebview().id);
//					}
					tools.fnOpenWindow_1(pathUrl, 'HBuilder', {
						top: '0px',
						bottom: '0px'
					}, {
						type: "resetCheckRole"
					}, true, false);
					
					
				}else{
					successCallBack(data);
				}
				
			},
			complete: function() {

			},
			dataType: "JSON"
		});
	}
	
	tools.getURL = function(method, param) {
		return method +"?appSign=123456&device=Android&appPackage="+tools.getPackageName()+"&version="+tools.getVersion()+"&in="+ decodeURI(JSON.stringify(tools.getParam(param)));
	}

	tools.getParam = function(param) {
		var paramObj = {};

		//		if(localStorage.getItem("APP_PACKAGE") == null || localStorage.getItem("VERSION") == null){
		//			tools.initManifest();
		//		}

		paramObj.appSign = tools.APP_SIGN;
		paramObj.device = tools.DEVICE;
		//以下两个正式库测试库字段
		//manifest.json 也要对应修改
		paramObj.appPackage = tools.getPackageName();
		paramObj.version = tools.getVersion();
		paramObj.token = tools.getToken(paramObj);
		paramObj.userId = localStorage.getItem('userId');
		paramObj.roleId = localStorage.getItem('roleId');
		paramObj.shopId = localStorage.getItem('shopId');
		paramObj.versionCodeIn = tools.getVersion();
		if(param != null && "" != param) {
			var Md5Param = paramObj
			paramObj.in = param;
			var md5Str = tools.MD5(paramObj.appPackage + tools.APP_SIGN + paramObj.version + tools.DEVICE + param);
			paramObj.checkCode = md5Str;
		}
		return paramObj;
	}
	
	tools.getPackageName = function(){
		//获取APP包名在使用HBuilder真机运行时获取到的包名为HBuilder，打包之后获取到的包名为manisest设置的包名。
//		return plus.runtime.appid;
		return localStorage.getItem("appId");
	}
	
	tools.getVersion = function(){
		//获取版本号在使用HBuilder真机运行时获取到的版本号为HBuilder的版本号，打包之后获取到的版本号为manifest中配置的版本号。
//		return plus.runtime.version;
		return localStorage.getItem("appVersion");
	}
	
	tools.getAppName = function(){
		//获取版本号在使用HBuilder真机运行时获取到的版本号为HBuilder的版本号，打包之后获取到的版本号为manifest中配置的版本号。
//		return plus.runtime.version;
		return localStorage.getItem("appName");
	}
	tools.getRandom = function(len) {
		var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		var res = "";
		for(var i = 0; i < len; i++) {
			var id = Math.ceil(Math.random() * 35);
			res += chars[id];
		}
		return res;
	}
	/**
	 * 获取token参数
	 * @param {Object} obj
	 * 四位随机数 + tools.MD5(包名+版本号+app_sign+device) + 四位随机数
	 */
	tools.getToken = function(obj) {
		var random = tools.getRandom(4);
		var md5Str = tools.MD5(obj.appPackage + obj.appSign + obj.device + obj.version );
		return random + md5Str + random;
	}

	tools.MD5 = function(str) {
		return $.md5(str).toUpperCase();
	}

	/**
	 * 关闭窗口方法 
	 * @param {Object} id 关闭窗口的id
	 */
	tools.closeWindow = function(id) {
		var target = plus.webview.getWebviewById(id);
		if(target != null) {
			target.hide();
			target.close();
		}
	}

	/**
	 * 关闭除指定页面以外其他所有界面
	 * @param {Object} id
	 */
	tools.fnCloseAllPages = function(id) {
		var wvs = plus.webview.all();
		$(wvs).each(function(index, webView) {
			if(webView.id != id) {
				webView.close("none", 0);
			}
		});
	}

	/**
	 * 获取当前时间 字符串
	 * @returns 格式 yyyy-MM-dd
	 */
	tools.fnGetNowDateStr = function(date) {
		var date = new Date();
		return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	}

	tools.fnPageConfig = function() {
		tools.ajaxPost(
			PAGE_CONFIG_HOST,
			JSON.stringify({
				"role_id": localStorage.getItem("role_id")
			}),
			function(data) {
				if(data.retCode == 0) {
					localStorage.setItem("page_config", JSON.stringify(data.obj));
				} else {
					w_alert("无法获取功能列表，请确认网络连接");
				}
				fnCallBack();
			},
			function(e) {
				w_alert("无法获取功能列表，请确认网络连接");
				fnCallBack();
			}
		);
	}

	/**
	 * 打开页面，判断是否为网络链接
	 * @param {Object} path   页面地址   ../../ssaa.html
	 * @param {Object} pageId  页面id page.page_id
	 * @param {Object} styles 页面样式 
	 * @param {Object} param  传递参数
	 */
	tools.fnOpenWindow = function(path, pageId, styles, param) {
		if(path.indexOf(".html") != -1) {
			tools.fnOpenWindow_1(path, pageId, styles, param);
		} else {
			tools.fnGetPageByPageId_chek(pageId, function(page) {
				var url;
				if(page.page_url.startsWith("/pages")) {
					url = path + page.page_url;
				} else {
					url = page.page_url;
				}
				tools.fnOpenWindow_1(url, page.page_id, styles, param, true, false);
			});
		}
	}

	tools.getPage = function(pageNum, pageSize) {
		var page = new Object();
		page.pageNum = pageNum;
		page.pageSize = pageSize;
		return page;
	}

	
	
	/**
	 * 开启遮罩层
	 * @param {Object} msg 遮罩层显示文字信息
	 */
	tools.fnShowLineWaiting = function(msg){
		if(msg == null || msg == ""){
			msg = "加载中...";
		}
		tools.WAITING = plus.nativeUI.showWaiting(msg, {loading:{display:"inline"}});
	}
	
	/**
	 * 关闭遮罩层
	 */
	tools.fnCloseWaiting = function(){
		if(tools.WAITING != null){
			tools.WAITING.close();
			tools.WAITING = null;
		}
	}
	
	/**
	 * 开启遮罩层
	 * @param {Object} msg 遮罩层显示文字信息
	 */
	tools.fnShowLineWaitingNew = function(msg){
		if(msg == null || msg == ""){
			msg = "加载中...";
		}
		return plus.nativeUI.showWaiting(msg, {loading:{display:"inline"}});
	}
	
	/**
	 * 关闭遮罩层
	 */
	tools.fnCloseWaitingNew = function(waiting){
		if(waiting != null){
			waiting.close();
			waiting = null;
		}
	}
	/**
	 * 保留2位小数，如：2，会在2后面补上00.即2.00  3.145 = 3.15  3.144 = 3.14
	 * xb
	 */
	tools.toDecimal = function(x) {
		var f = parseFloat(x);
		if(isNaN(f)) {
			return false;
		}
		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');
		if(rs < 0) {
			rs = s.length;
			s += '.';
		}
		while(s.length <= rs + 2) {
			s += '0';
		}
		return s;
	}
	/**
	 * 将NULL转为"--"
	 */
	tools.nullToUnderline = function(str){
		if(str==null || str == "null" || str == ""){
			return "--";
		} else {
			//str = str.replace(/\</g,'&lt;');
			//str = str.replace(/\>/g,'&gt;');
			//str = str.replace(/\n/g,'<br/>');
		}
		return str;
	}
	/**
	 * 将NULL转为"0"
	 */
	tools.nullToZero = function(str){
		if(str==null || str == "null" || str == ""){
			return "0";
		} else {
		}
		return str;
	}
	
	/**
	 * 拨打电话  
	 */
	tools.toTel = function(phone){
		var btnArray = [] 
		var titleInfo ="";
		titleInfo+= "拨打号码:"+phone;
		btnArray = ['取消','拨打'];
		mui.confirm("", titleInfo, btnArray, function(e){
			if(e.index == 1) {            
				plus.device.dial(phone, true);            
			}   
		}, 'div');
		event.stopPropagation();
	}
	/**
	 * 直接打开指定url的页面
	 * @param {Object} url  用于直接打开网络地址，或者绝对路径的地址
	 * @param {Object} pageId
	 * @param {Object} styles
	 * @param {Object} param
	 */
	tools.fnOpenWindow_1 = function(url, pageId, styles, param, autosShow, waiting) {
		mui.openWindow({
			url: url,
			id: pageId,
			styles: styles,
			extras: param,
			show: {
				autoShow: autosShow,
				aniShow: 'slide-in-right',
			},
			waiting: {
				autoShow: waiting,
				title: '加载中...',
				options: {

				}
			}
		});
	}
	tools.fnCloseWebViewById = function(webViewId) {
		var targetWebView = plus.webview.getWebviewById(webViewId);
		if(targetWebView != null) {
			targetWebView.hide();
			targetWebView.close();
		}
	}

	/**
	 * 获取UUID
	 * @return {}
	 */
	tools.getUUID = function() {
		return UUID.prototype.createUUID().replaceAll("-", "");
	}

	/**
	 * 图片url转换
	 */
	tools.fnChangeImageUrl = function(url) {
		if(url == null){
			url = "";
		}
		url = url.replace("http://www.biaoshijia.com/res", WNBS_PHOTO_PATH);
		url = url.replace("http://39.108.215.72:8080/res", WNBS_PHOTO_PATH);
		return url;
	}

	
	/**
	 * 加密手机号，中间4位*
	 */
	tools.fnReplacePhone = function(phone) {
		if(phone != null && phone != "" && phone.length == 11) {
			return phone.substring(0, 3) + "****" + phone.substring(7, 11);
		} else if(phone != null && phone != "" && phone.length > 8 && phone.length < 11) {
			return phone.substring(0, 3) + "***" + phone.substring(phone.length - 4, phone.length);
		} else {
			return phone;
		}
	}
	
	
	/**
	 * 将字符串转换为日期   格式：YYYY-MM-DD HH24:MI:SS
	 * @param {Object} str
	 */
	tools.strToDate = function(str) {
		if(str != null){
			var tempStrs = str.split(" ");
			var dateStrs = tempStrs[0].split("-");
	
			var year = parseInt(dateStrs[0], 10);
			var month = parseInt(dateStrs[1], 10) - 1;
			var day = parseInt(dateStrs[2], 10);
	
			var timeStrs = tempStrs[1].split(":");
	
			var hour = parseInt(timeStrs[0], 10);
			var minute = parseInt(timeStrs[1], 10);
			var second = parseInt(timeStrs[2], 10);
			var date = new Date(year, month, day, hour, minute, second);
			return date;
		}else{
			return null;
		}
		
		
	}
	
	/**
	 * 将日期 转换为字符串  格式：YYYY-MM-DD HH24:MI:ss
	 */
	tools.dateToString= function(date){
		if(date == null || date == ""){
			return null;
		}else{
			var year = date.getFullYear();
			var month =(date.getMonth() + 1).toString(); 
		    var day = date.getDate().toString(); 
		    var hour = date.getHours().toString();
		    var minutes = date.getMinutes().toString();  
		    var seconds = date.getSeconds().toString();
		    
		    if (month.length == 1) { 
		        month = "0" + month; 
		    } 
		    if (day.length == 1) { 
		        day = "0" + day; 
		    }
		    if (hour.length == 1) { 
		        hour = "0" + hour; 
		    } 
		    if (minutes.length == 1) { 
		        minutes = "0" + minutes; 
		    }
		    if (seconds.length == 1) { 
		        seconds = "0" + seconds; 
		    }
		    var dateTime = year+"-"+month + "-" + day + " "+ hour+":"+minutes+":"+seconds;
		    return dateTime;
		}
		
	}
	/**
	 * 将日期 转换为字符串  格式：YYYY-MM-DD HH24:MI
	 */
	tools.dateToStringNoSs= function(date){
		if(date != null){
			date = tools.strToDate(date);
			var year = date.getFullYear();
			var month =(date.getMonth() + 1).toString(); 
		    var day = date.getDate().toString(); 
		    var hour = date.getHours().toString();
		    var minutes = date.getMinutes().toString();
		    if (month.length == 1) { 
		        month = "0" + month; 
		    } 
		    if (day.length == 1) { 
		        day = "0" + day; 
		    }
		    if (hour.length == 1) { 
		        hour = "0" + hour; 
		    } 
		    if (minutes.length == 1) { 
		        minutes = "0" + minutes; 
		    }
		  
		    var dateTime = year+"-"+month + "-" + day + " "+ hour+":"+minutes;
		    return dateTime;
		}else{
			return null;
		}
		
	}
	/**
	 * 将日期 转换为字符串  格式：MM月DD日
	 */
	tools.dateToString_day= function(date){ 
		date = new Date(date)
		var month =(date.getMonth() + 1).toString(); 
	  var day = (date.getDate()).toString();  
	  if (month.length == 1) { 
	      month = "0" + month; 
	  } 
	  if (day.length == 1) { 
	      day = "0" + day; 
	  }
	  var dateTime = month + "月" + day + "日";
	  return dateTime;
	}
	/**
	 * 将日期 转换为字符串  格式 ： HH24:MI
	 */
	tools.dateToString_hour= function(date){ 
		date = new Date(date)
		var hour = date.getHours().toString();
	    var minutes = date.getMinutes().toString();  
	  if (hour.length == 1) { 
	      hour = "0" + hour; 
	  } 
	  if (minutes.length == 1) { 
	      minutes = "0" + minutes; 
	  }
	  var dateTime = " " + hour + ":" + minutes;
	  return dateTime;
	}
	
	/**
	 * 判断两个日期,是否跨年并,跨年返回大年份
	 * 第一个参数小,第二个参数大
	 */
	tools.date_check_year= function(date1,date2){ 
		date1 = new Date(date1);
		date2 = new Date(date2);
		var year1 = date1.getFullYear();
		var year2 = date2.getFullYear();
		if(year1 != year2){
			return year2;
		}else{
			return null;
		}
	}
	
	/**
	 * 返回两个日期之间相差的时间
	 * @param {Object} d1  小的时间
	 * @param {Object} d2  大的时间
	 * @param {Object} index(参数作废)  返回的类型   1返回相差天数  2返回相差天数小时  3返回相差天数小时分钟  4返回相差天数小时分钟秒
	 */
	tools.fnTimeDifference= function(d1,d2,index){
		if(d1 == null || d1 == "" || d2 == null || d2 == "" ){
			return null;
		}
		var date1=new Date(d1); //开始时间  
		var date2=new Date(d2); //结束时间
		var date3=date2.getTime()-date1.getTime(); //时间差的毫秒数
		//计算出相差天数
		var days=Math.floor(date3/(24*3600*1000))
		
		//计算出小时数
		var leave1=date3%(24*3600*1000) //计算天数后剩余的毫秒数
		var hours=Math.floor(leave1/(3600*1000))
		//计算相差分钟数
		var leave2=leave1%(3600*1000) //计算小时数后剩余的毫秒数
		var minutes=Math.floor(leave2/(60*1000))
		//计算相差秒数
		var leave3=leave2%(60*1000) //计算分钟数后剩余的毫秒数
		var seconds=Math.round(leave3/1000);
		var timeStr = "";
		/*if(index == 1){//相差天数
			return days+"天";	
		}else if(index == 2){//相差天数小时
			return days+"天"+hours+"小时";	
		}else if(index == 3){//相差天数小时分钟
			return days+"天"+hours+"小时"+minutes+"分钟";	
		}else if(index == 4){//相差天数小时分钟秒
			return days+"天"+hours+"小时 "+minutes+"分钟"+seconds+"秒";	
		}*/
		if(days != 0 && days !="0"){
			timeStr +=  days+"天";	
		}
		if(hours != 0 && hours !="0"){
			timeStr +=  hours+"小时";	
		}
		if(days == 0 &&  hours == 0){
			timeStr +=  minutes+"分钟";	
		}
		return timeStr ; //days+"天"+hours+"小时 ";					
	}
	/**
	 * 时间1-时间2,返回差值,判断时间大小
	 * >0 说明时间1大
	 *  =0 说明相等
	 *  <0 说明时间2大
	 */
	tools.fnTimeDifferenceNew= function(d1,d2){
		if(d1 == null || d1 == "" || d2 == null || d2 == "" ){
			return null;
		}
		var date1=new Date(d1); //开始时间  
		var date2=new Date(d2); //结束时间
		var date3=date1.getTime()-date2.getTime(); //时间差的毫秒数
		return date3;
	}
	
}(mui, window.tools = {}));


/**
去掉空格方法
*/
String.prototype.Trim = function() {
	var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	return(m == null) ? "" : m[1];
};

/**
 * 替换所有字符的方法
 * @returns
 */
String.prototype.replaceAll = function(AFindText, ARepText) {
	var raRegExp = new RegExp(AFindText, "g");
	return this.replace(raRegExp, ARepText);
};
/**
 * 将NULL转为0
 */
function nullToEmptyNum(str){
	if(str==null || str == "null" || str=="" || str == undefined)
	{
		return "0";
	}
	return str;
}

/**
 * 将NULL转为"--"
 */
function nullToUnderline(str){
	if(str==null || str == "null" || str == ""){
		return "--";
	} else {
		//str = str.replace(/\</g,'&lt;');
		//str = str.replace(/\>/g,'&gt;');
		//str = str.replace(/\n/g,'<br/>');
	}
	return str;
}


/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
    var r1, r2, m, c;
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
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}
 
//给Number类型增加一个add方法，调用起来更加方便。
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
};

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
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
    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
 
// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function (arg) {
    return accMul(arg, this);
};

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul(arg1, arg2) {
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
}
 
// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
};


/** 
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
function accDiv(arg1, arg2) {
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
}
 
/**
 * 功能：输入框只能输入数字
 * obj：文本框对象
 * type：类型 只能输入小数
 */
function inputCheckDouble2(obj) {
	obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”,"-"以外的字符
	obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字而不是. 
	obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
	obj.value = obj.value.replace(/\-{2,}/g, "-"); //只保留第一个- 清除多余的
	obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}

/*提示语*/
function t_toast(msg) {
	mui.toast(msg)
}
/*计算两个日期之间差值*/
Date.prototype.diff = function(date){
	var allCz = (this.getTime() - date.getTime())/(24 * 60 * 60 * 1000);
	var dayStr = Math.floor(allCz);  //天
	var a = allCz-Math.floor(allCz); //
	var hourStr = Math.floor(a*24);  //小时
	var b = allCz-Math.floor(allCz)-(hourStr/24);
	var secStr = Math.floor(b*1440); //24*60=1440
  	return dayStr+"天"+hourStr+"小时"+secStr+"分钟";
}
  
/*
 *  方法:Array.remove(dx)
 *  功能:根据元素位置值删除数组元素.
 *  参数:元素值，数组下标
 *  返回:在原数组上修改数组
 */
Array.prototype.remove = function(dx) {
	if(isNaN(dx) || dx > this.length) {
		return false;
	}
	for(var i = 0, n = 0; i < this.length; i++) {
		if(this[i] != this[dx]) {
			this[n++] = this[i];
		}
	}
	this.length -= 1;
};

 /*自定义字符串格式化*/
  String.prototype.filterEm = function (args) { 
  	var temp = this ;
 	var reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
    temp=temp.replace(reg, "");
   	return temp;
  };
  

/**
 * 将图片压缩转成base64
 */
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	 
	if(width > height) {
		if(width > 500) {
			height = Math.round(height *= 500 / width);
			width = 500;
		}
	} else {
		if(height > 500) {
			width = Math.round(width *= 500 / height);
			height = 500;
		}
	}
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.8);  
	return dataURL;
}

function inputCheckNew(obj, type) {
	var input = obj.value.Trim();
	switch(type) {
		case 1:
			{
				if(obj.value.length == 1) {
					obj.value = obj.value.replace(/[^1-9]/g, '');
				} else {
					obj.value = parseInt(obj.value);
					if(obj.value.length == 1) {
						obj.value = obj.value.replace(/[^1-9]/g, '');
					} else {
						obj.value = obj.value.replace(/\D/g, '');
					}
				}
				break;
			}
		case 2:
			{
				obj.value = obj.value.replace(/[^\d.]/g, "");
				//必须保证第一位为数字而不是. 
				obj.value = obj.value.replace(/^\./g, "");
				//保证只有出现一个.而没有多个. 
				obj.value = obj.value.replace(/\.{2,}/g, ".");
				//保证.只出现一次，而不能出现两次以上 
				obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
				break;
			}
		case 3:
			{
				if(obj.value.length == 1) {
					obj.value = obj.value.replace(/[^0-9]/g, '');
				} else {
					obj.value = obj.value.replace(/\D/g, '');
				}
				break;
			}
		case 4:
			{
				if(obj.value.length == 1) {
					obj.value = obj.value.replace(/[^1-9]/g, '');
				} else {
					obj.value = obj.value.replace(/[^\d.]/g, "");
					//必须保证第一位为数字而不是. 
					obj.value = obj.value.replace(/^\./g, "");
					//保证只有出现一个.而没有多个. 
					obj.value = obj.value.replace(/\.{2,}/g, ".");
					//保证.只出现一次，而不能出现两次以上 
					obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
					//只能输入两个小数  
					obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
				}
				break;
			}
		case 5:
			{
				if(obj.value.length == 1) {
					obj.value = obj.value.replace(/[^0]/g, '');
				} else {
					obj.value = obj.value.replace(/[^\d.]/g, "");
					//必须保证第一位为数字而不是. 
					obj.value = obj.value.replace(/^\./g, "");
					//保证只有出现一个.而没有多个. 
					obj.value = obj.value.replace(/\.{2,}/g, ".");
					//保证.只出现一次，而不能出现两次以上 
					obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
					//只能输入三个小数  
					obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');
				}
				break;
			}
		case 6:
			{
				if(obj.value.length == 1) {
					obj.value = obj.value.replace(/[^0-9]/g, '');
				} else {
					obj.value = obj.value.replace(/[^\d.]/g, "");
					//必须保证第一位为数字而不是. 
					obj.value = obj.value.replace(/^\./g, "");
					//保证只有出现一个.而没有多个. 
					obj.value = obj.value.replace(/\.{2,}/g, ".");
					//保证.只出现一次，而不能出现两次以上 
					obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
					//只能输入两个小数  
					obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
				}
				break;
			}
		case 7:
			{
				if(obj.value.length == 1) {
					obj.value = obj.value.replace(/[^0-9]/g, '');
				} else {
					obj.value = obj.value.replace(/[^\d.]/g, "");
					//必须保证第一位为数字而不是. 
					obj.value = obj.value.replace(/^\./g, "");
					//保证只有出现一个.而没有多个. 
					obj.value = obj.value.replace(/\.{2,}/g, ".");
					//保证.只出现一次，而不能出现两次以上 
					obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
					//只能输入三个小数  
					obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3');
				}
				break;
			}
	}
}

/**
 * 验证是否为手机号码
 * @param value
 * @returns
 */
function _checkPhoneNumber(value){
	var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; //验证规则
	return !reg.test(value); //true
}


/** 
 * 用途：检查输入的电话号码格式是否正确 
 * 输入： 
 * strPhone：字符串 
 * 返回： 
 * 如果通过验证返回true,否则返回false 
 */ 
function _checkPhone(strPhone) 
{ 
	var phoneRegWithArea = /^[0][1-9][0-9]{1,2}-{0,1}[0-9]{5,10}$/; 
	var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/; 
	var phoneRegMobile = /^[1][3-9][0-9]{9}$/; /**手机号格式update by YufengJia 2015.08.01**/
	/*var prompt = "您输入的电话号码不正确!";*/
	if(strPhone.length == 11 && strPhone.charAt(0) == "1")
	{
		if( phoneRegMobile.test(strPhone) )
		{ 
			return true; 
		}
		else
		{ 
			return false; 
		} 
	}
	if( strPhone.length > 9 ) 
	{ 
		if( phoneRegWithArea.test(strPhone) )
		{ 
			return true; 
		}
		else
		{ 
			return false; 
		} 
	}
	else
	{ 
		if( phoneRegNoArea.test( strPhone ) )
		{ 
			return true; 
		}
		else
		{ 
			return false;
		} 
	}
} 

/**
 * 纯数字
 * @param {Object} obj
 */
function inputCheck(obj) {
	if(obj.value.length == 1) {
		obj.value = obj.value.replace(/[^0-9]/g, '');
	} else {
		obj.value = obj.value.replace(/\D/g, '');
	}
}

function hasPermission(requestCode) {
	/*if(DEBUG) {*/
		var main = plus.android.runtimeMainActivity();
		//var  Manifest = plus.android.importClass("android.Manifest");
		//拿到配置文件
		//var  Manifest = new Manifest();
		//拿到相应的权限
		var permissionUtils = plus.android.newObject("com.juchiwang.app.identifynew.PermissionUtils");
		var isPermission = plus.android.invoke(permissionUtils, "hasPermission", main, REQUESTPERMISSIONS[requestCode]);
		//t_toast("权限"+isPermission);
		return isPermission;
	/*}else{
		return true;
	}*/
}

function questPermission(requestCode) {
	if(DEBUG) {
		var main = plus.android.runtimeMainActivity();
		var permissionUtils = plus.android.newObject("com.juchiwang.app.identifynew.PermissionUtils");
		plus.android.invoke(permissionUtils, "requestWebViewPremission", main, requestCode);
		//	var hevent = plus.android.implements( "com.juchiwang.app.identifynew.PermissionUtils$RequestWebViewPremissionListener", {
		//      "requestPremissionCallBack":function(requestCode){
		//          requestAndroidPremissionCallBack(requestCode)
		//      }
		//  });
		//  plus.android.invoke(permissionUtils,'setRequestWebViewPremissionListener',hevent);
		//  plus.android.invoke(permissionUtils,"requestWebViewPremission",main,requestCode,'requestAndroidPremissionCallBack');\
		//再次校验一遍权限信息，查看是否已经成功获取授权
		return hasPermission(requestCode);
	}else{
		return true;
	}
}

/**
 * oppo手机权限闪退问题处理（假装）
 * 不会闪退了，即点完没反应
 */
function adc(){
	var main = plus.android.runtimeMainActivity();
	var a = plus.android.importClass('android.content.ContentProviderOperation');
	var b = plus.android.importClass('android.content.ContentResolver');
	var c = plus.android.importClass('android.database.Cursor');
	var cc = plus.android.importClass('android.net.Uri');
	var d = plus.android.importClass('android.test.AndroidTestCase');
	var e = plus.android.importClass('android.util.Log');
	var uri = cc.parse("content://com.android.contacts/contacts");
	var arr = ["_id"];
	var resolver = main.getContext().getContentResolver();
	var cursor = resolver.query(uri, arr, null, null, null);
	return cursor.moveToNext();		
}
/*提示框*/
function w_alert(msg, title, success) {
	if(title == null){
		title = tools.getAppName();
	}
	if(!success){
		mui.alert(msg, title, '确定');
	}else{
		mui.alert(msg, title, success, '确定');
	}
}

/*警告框*/
function m_confirm(msg, success) {
	var btnArray = ['取消', '确定'];
	mui.confirm(msg, "", btnArray, success, 'div');
}

/*提示语*/
function t_toast(msg) {
	mui.toast(msg)
}

//判断数组arr中的字符串是否在   str字符串中,如果不在则拼接数组字符串+";",最后拼接str字符串
function fnReasonCheck(arr,str){
	var reason= "";
	if(arr != null && arr.length>0){
		for(var i = 0;i<arr.length; i++){
			if(str.indexOf(arr[i]) == -1){
				reason = reason + arr[i]+";";
			}
			
		}
	}
	if(str != null && str != ""){
		reason = reason + str+";";
	}
	return reason;
}

/**
 * 比较两个日期的大小 日期格式为 yyyy-MM-dd
 * @param d1 
 * @param d2
 * @return 
 * 	d1 < d2 return -1
 * 	d1 = d2 return 0
 * 	d1 > d2 return 1
 */
function fnCompareDate(d1, d2) {
	/*第一个日期*/
	var strArray1 = d1.split("-");
	var year1 = strArray1[0];
	var month1 = strArray1[1];
	var day1 = strArray1[2];
	/*第二个日期*/
	var strArray2 = d2.split("-");
	var year2 = strArray2[0];
	var month2 = strArray2[1];
	var day2 = strArray2[2];

	if(parseInt(year1) < parseInt(year2)) {
		return -1;
	}
	if(parseInt(year1) > parseInt(year2)) {
		return 1;
	}
	if(parseInt(month1) < parseInt(month2)) {
		return -1;
	}
	if(parseInt(month1) > parseInt(month2)) {
		return 1;
	}
	if(parseInt(day1) < parseInt(day2)) {
		return -1
	}
	if(parseInt(day1) > parseInt(day2)) {
		return 1;
	}
	return 0;
};


/**
 * 显示师傅首字符  加 师傅     例:张三  返回 张师傅
 * @param {String} str
 */
function fnStringFirstChar(str) {
	var nameFirst ="";
	if(str != null && str !=""){
		nameFirst = str.substring(0,1)+"师傅";
	}
	return nameFirst;
}
