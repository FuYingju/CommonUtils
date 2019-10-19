var imgSize = 2 * 1024 * 1024;
/**
 * 图片url转换
 */
function fnChangeImageUrl(url){
	url = url.replace("http://www.biaoshijia.com/res",basePath);
	return url;
}

function fnChangeImageUrlForInfo(url){
// url =
// url.replace("http://www.biaoshijia.com/res","http://www.biaoshijia.com/xmpc");
	url = url.replace("http://www.biaoshijia.com/res","http://192.168.1.34:8080/xmpc");
	return url;
}

/**
 * 拼文件路径
 */
function fnChangeUrl(url){
	url = "http://www.biaoshijia.com/res"+url;
	return url;
}

function fnChangeUrlView(url){
	url = basePath+url;
	return url;
}



function fnChangeBasePathUrl(url){
	url = basePath+"/"+url;
	return url;
}

/**
 * 图片url转换
 */
function fnChangeImageBasePathUrl(url){
	url = url.replace(basePath+"/","");
	return url;
}

/**
 * 选中下拉框的值
 * 
 * @param {}
 *            id select 的id
 * @param {}
 *            value
 */
function fnCheckSelect(id,value){
	$("#"+id).val(value).trigger("change");
}

/**
 * 拼文件路径
 */
function fnChangeUrlLocal(url){
	url = "http://localhost:8080/xmmarketing/"+url;
	return url;
}

/**
 * str :打开页面标题 index : 弹框index传递给弹出页面 ratio : 截图宽高比例 imageBlockName
 * 是包含图片及上传按钮的div区域块ID
 */
function imgCropperShow(str,index,ratio,imageBlockName){
	var url = basePath + "/util/imgCropper?index=" + index + "&imageBlockName="+imageBlockName +"&ratio=" + ratio
	layer_full(str, url);
	// _layer_show(str, url,800,600);
}

/**
 * 关闭弹出框口
 */
function _layer_close() {
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

/**
 * 图片裁剪返回公方法
 * 
 * @param {}
 *            index
 * @param {}
 *            imageBlockName
 * @param {}
 *            imageData
 */
function _setUploadImg(index,imageBlockName,imageData){
		if(imageBlockName==''){
			imageBlockName = "upload_image";
		}
		var obj  = null ;
		var $imageBlock = $("#"+imageBlockName);
		var oldHtml = $imageBlock.html();
		var $img = $imageBlock.find("img") ;
		if($img[0]){// 存在img时
			$imageBlock.find("button").hide();
			$img.prop("src",imageData).show();
			$img.attr("image_type","base64");
			// $imageBlock.append('<button id="re-upload-img" type="button"
			// class="btn btn-success">重新选择</button>');
			$imageBlock.find("#re-upload-img").click(function(){
				this.remove();
				$imageBlock.find("button").show();
				$img.prop("src","").hide();
			});
		}else{// 不存在img时，自动加入图片预览
			// var html = '<img image_type="base64" style="width:
			// 100px;height:100px;border:1px solid #bbb;"
			// src="'+imageData+'"><br/><button id="re-upload-img" type="button"
			// class="btn btn-success">重新选择</button>';
			var html = '<img image_type="base64" style="width: 100%;height:100%;border:1px solid #bbb;" src="'+imageData+'">';
			$imageBlock.empty();
			$imageBlock.html(html);
			$imageBlock.find("#re-upload-img").click(function(){
				$imageBlock.empty();
				$imageBlock.html(oldHtml);
			});
		}
		
}


/**
 * 禁止浏览器后退
 */
$(function() {
　　if (window.history && window.history.pushState) {
　　$(window).on('popstate', function () {
　　window.history.pushState('forward', null, '#');
　　window.history.forward(1);
　　});
　　}
　　window.history.pushState('forward', null, '#'); // 在IE中必须得有这两行
	　　window.history.forward(1);
　　})

/* 禁止网页缩放 CTRL+鼠标键盘缩放 */
$(function() {
	var isFirefox=/Firefox/i.test(navigator.userAgent)?true:false;
	var unMouseBtn=function(e){
	  var e = e || window.event;
	  if(e.wheelDelta && e.ctrlKey){// IE/Opera/Chrome e.wheelDelta±120
	     e.preventDefault?e.preventDefault():e.returnValue=false;
	  }else if(e.detail && e.ctrlKey){// Firefox e.detail±3
	     e.preventDefault?e.preventDefault():e.returnValue=false;
	  }
	};
	var mousewheelevt=isFirefox?"DOMMouseScroll":"mousewheel";
	if(document.attachEvent){// IE/Opera/Chrome
	  document.attachEvent("on"+mousewheelevt,unMouseBtn);
	}else if(document.addEventListener){// Firefox
	  document.addEventListener(mousewheelevt,unMouseBtn,false);
	}
	var unCtrl=function(e){
	  var e = e || window.event;
	  var isFirefox=(/Firefox/i.test(navigator.userAgent))?true:false;
	  var code=isFirefox?"109,107,173,61":"109,107,189,187";
	  if(e.ctrlKey && code.indexOf(e.keyCode)!=-1){
	     e.preventDefault?e.preventDefault():e.returnValue=false;
	  }
	};
	document.onkeydown=unCtrl;
})
  
/**
 * 自定义layer弹框
 * 
 * @param title标题；
 * @param url请求的url；
 * @param w弹出层宽度（缺省调默认值）；
 * @param h弹出层高度（缺省调默认值）
 */
function layer_show(title, url, w, h) {
	if (title == null || title == '') {
		title = false;
	}
	if (url == null || url == '') {
		url = "404.html";
	}
	if (w == null || w == '') {
		w = 800;
	}
	if (h == null || h == '') {
		h = ($(window).height() - 50);
	}
	layer.open({
		type : 2,
		area : [ w + 'px', h + 'px' ],
		fix : true, // 不固定
		maxmin : true,
		shade : 0.4,
		title : title,
// offset: ['50%', '50%'],
		content : url
	});
	$(".layui-layer-maxmin").hide();
	$(".layui-layer-min").hide();// 最小化
	$(".layui-layer-max").hide();// 最大化
}

/**
 * 打开即全屏
 * 
 * @param title
 * @param url
 */
function layer_full(title, url) {
	var w, h;
	if (w == null || w == '') {
		w = 900;
	}
	if (h == null || h == '') {
		h = 500;
	}
	// 弹出即全屏
	var index = layer.open({
		type : 2,
		area : [ w + 'px', h + 'px' ],
		maxmin : true,
		shade : 0.4,
		title : title,
		content : url
	});
	layer.full(index);
	$(".layui-layer-maxmin").hide();
}

/**
 * 关闭弹出框口
 */
function layer_close() {
	$("input").blur();
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

/**
 * 警告
 * 
 * @param {}
 *            msg
 */
function w_alert(msg,callBack){
	layer.alert(msg, {icon : 0,title:'警告',closeBtn:0},function(index){
		if(callBack!=null){
			callBack.call(this);
		}
		layer.close(index);
	});
}

/**
 * 成功
 * 
 * @param {}
 *            msg
 */
function s_alert(msg,callBack){
	$("input").blur();
	layer.alert(msg, {icon : 1,title:'提示',closeBtn:0},function(index){
		if(callBack!=null){
			callBack.call(this);
		}
		layer.close(index);
	});
}

/**
 * 失败
 * 
 * @param {}
 *            msg
 */
function e_alert(msg,callBack){
	$("input").blur();
	layer.alert(msg, {icon : 2,title:'错误',closeBtn:0},function(index){
		if(callBack!=null){
			callBack.call(this);
		}
		layer.close(index);
	});
}

/**
 * layer弹出提示（关闭）
 */
function c_alert(index){
	top.layer.close(index);
}

/**
 * im弹出消息框
 */
function im_showUrlMsg(data){
	layer.open({
		type:1,
		shade: 0,
		offset:'rb',
		anim: 2,
		tipsMore:true,
		title:_getPushType(data.pushType),
		time:10000,
		content :'<div style="font-size:15px;text-align:left;color: #666;margin: 15px 15px 0px 15px;">'+data.content+'</div>',
		area: ['400px', '250px'],
		btn: ['查看详情','确定'],
		yes:function(index, layero){
			_fnChangeMsgIsRead(index,data.id);
			var obj = new Object();
			obj.name = data.title;
			obj.url = basePath + data.url;
			window.top.fnShowOrtherMenu(obj);
		},
		btn2:function(index, layero){
			_fnChangeMsgIsRead(index,data.id);
		}
	});
}

/**
 * im弹出消息框
 */
function im_showUrlMsg2(data){
	layer.open({
		type:1,
		shade: 0,
		offset:'rb',
		anim: 2,
		tipsMore:true,
		title:_getPushType(data.pushType),
		time:10000,
		content :'<div style="font-size:15px;text-align:left;color: #666;margin: 15px 15px 0px 15px;">'+data.content+'</div>',
		area: ['400px', '250px'],
		btn: ['查看详情','确定'],
		yes:function(index, layero){
			_fnChangeMsgIsRead(index,data.id);
			var obj = new Object();
			obj.name = data.title;
			obj.url =  data.url;
			window.top.fnShowOrtherMenu(obj);
		},
		btn2:function(index, layero){
			_fnChangeMsgIsRead(index,data.id);
		}
	});
}

/**
 * im弹出消息框
 */
function im_showMsg(data){
	layer.open({
		type:1,
		shade: 0,
		offset:'rb',
		anim: 2,
		tipsMore:true,
		title:_getPushType(data.pushType),
		time:10000,
		content :'<div style="font-size:15px;text-align:left;color: #666;margin: 15px 15px 0px 15px;">'+data.content+'</div>',
		area: ['400px', '250px'],
		btn: ['确定'],
		yes:function(index, layero){
			_fnChangeMsgIsRead(index,data.id);
			
		}
	});
}

/**
 * 格式化消息类型
 */
function _getPushType(type){
	var str = "新消息";
	switch (type) {
		case 0:str = "订单发货提醒 ";break;
		case 777:str = "客户咨询提醒 ";break;
		default:break;
	}
	return str;
}

function _fnChangeMsgIsRead(index,id){
	var saveObj = new Object();
	saveObj.id = id;
	$.post(basePath+"/im/set_read_detail_message",_CREATE_REQUEST_OBJ(saveObj));
	layer.close(index);
}

/**
 * 询问
 * 
 * @param {}
 *            msg
 */
function m_confirm(msg,callBack,callBack2){
	$("input").blur();
	layer.confirm(msg, {icon: 3, title:'提示',closeBtn:0},function(index){
		if(callBack!=null){
			callBack.call(this);
		}
		layer.close(index);
	},function(index){
		if(callBack2!=null){
			callBack2.call(this);
		}
		layer.close(index);
	});
}

/**
 * 询问
 * 
 * @param {}
 *            msg
 */
function m_confirm2(msg,callBack,callBack2){
	layer.confirm(msg, {icon: 3, title:'提示',closeBtn:0},function(index){
		if(callBack!=null){
			callBack.call(this);
		}
		layer.close(index);
	},function(index){
		if(callBack2!=null){
			callBack2.call(this);
		}
		layer.close(index);
	});
}


/**
 * ajax请求
 * @param vUrl 请求地址
 * @param vParam 可以是字符串，也可以是json
 * @param succfn 回调函数
 */
function ajaxPost(vUrl, vParam, succfn) {
	var loadIdx = layer.load();
	$.ajax({
		type : "post",
		url : vUrl,
		headers:{
			accessToken:window.localStorage.getItem("accessToken")
		},
		data : vParam,
		dataType : "json",
		error : function(e) {
			if(e.status == 1000){
				window.location.href = basePath + "/login";
			}else{
				layer.alert('请求错误，请刷新重试', {
					icon : 2
				});
			}
		},
		success : function(res){
			succfn(res);
		},
		complete : function() {// 关闭加载层
			layer.close(loadIdx);
		}
	});
}


/**
 * 无提示框的 ajax请求
 * 
 * @param vUrl
 * @param vParam
 *            可以是字符串，也可以是json
 * @param vDataType
 * @param succfn
 *            回调函数
 */
function ajax(vUrl, vParam, succfn) {
	$("input").blur();
	var loadIdx = layer.load();
	$.ajax({
		type : "post",
		//url : 'http://192.168.1.226:9900/bsxm_dms/dd',
		url : vUrl,
		headers:{
			accessToken:window.localStorage.getItem("accessToken")
		},
		data : vParam,
		dataType : "json",
		error : function(e) {
			//alert(JSON.stringify(e));
			if(e.status==1000){
				layer.alert('当前登录已超时请重新登录', {
					icon : 2
				},function(){
					//跳转到登陆页面
					var contextPath="bsxm_dms";
					var urlPath = document.location.toString();
					var loginUrl=urlPath.substring(0, urlPath.indexOf(contextPath)+contextPath.length)+"/login";
					top.location.href=loginUrl;
				});
			}else{
				var errorMsg='';
				var errorCode=e.status;
				if(e.responseText!=null&&e.responseText!=''){
					var retObj=JSON.parse(e.responseText);
					if(retObj.retCode!=null){
						errorMsg=retObj.retMsg;
						errorCode=retObj.retCode;
					}
				}
				layer.alert('请求错误，请刷新重试(errorCode:'+errorCode+errorMsg+')', {
					icon : 2
				});
			}
		},
		success : succfn,
		complete : function() {// 关闭加载层
			layer.close(loadIdx);
		}
	});
}

/**
 * 无提示框无遮罩层的 ajax请求
 * 
 * @param vUrl
 * @param vParam
 *            可以是字符串，也可以是json
 * @param vDataType
 * @param succfn
 *            回调函数
 */
function ajax2(vUrl, vParam, succfn) {
	$("input").blur();
	$.ajax({
		type : "post",
		url : vUrl,
		headers:{
			accessToken:window.localStorage.getItem("accessToken")
		},
		data : vParam,
		dataType : "json",
		error : function(e) {
			layer.alert('请求错误，请刷新重试', {
				icon : 2
			});
			},
		success : succfn,
		complete : function() {// 关闭加载层
			
		}
	});
}

function ajax3(vUrl, vParam, succfn) {
	$.ajax({
		type : "post",
		url : vUrl,
		headers:{
			accessToken:window.localStorage.getItem("accessToken")
		},
		data : vParam,
		dataType : "json",
		error : function(e) {
			layer.alert('请求错误，请刷新重试', {
				icon : 2
			});
			},
		success : succfn,
		complete : function() {// 关闭加载层
			
		}
	});
}

function ajax4(vUrl, vParam, succfn) {
	var loadIdx = layer.load();
	$.ajax({
		type : "post",
		url : vUrl,
		headers:{
			accessToken:window.localStorage.getItem("accessToken")
		},
		data : vParam,
		dataType : "json",
		error : function(e) {
			layer.alert('请求错误，请刷新重试', {
				icon : 2
			});
			},
		success : succfn,
		complete : function() {// 关闭加载层
			layer.close(loadIdx);
		}
	});
}

/**
 * 公共ajax,带有提示弹出框
 */
function ajaxCfm(msg, vUrl, vParam, callback) {
	$("input").blur();
	layer.confirm(msg,{ icon: 3}, function(index) {
		var loadIdx = layer.load();
		$.ajax({
			type : "post",
			url : vUrl,
			headers:{
				accessToken:window.localStorage.getItem("accessToken")
			},
			data : vParam,
			dataType : "json",
			error : function() {
				layer.alert('请求错误，请刷新重试', {
					icon : 2
				});
			},
			success : callback,
			complete : function() {// 关闭加载层
				layer.close(loadIdx);
			}
		});
		// 关闭提示窗口
		layer.close(index);
	});
}








/**
 * 公共ajax,带有提示弹出框
 */
function ajaxCfm2(msg, vUrl, vParam, callback) {
	layer.confirm(msg,{ icon: 3}, function(index) {
		var loadIdx = layer.load();
		$.ajax({
			type : "post",
			url : vUrl,
			headers:{
				accessToken:window.localStorage.getItem("accessToken")
			},
			data : vParam,
			dataType : "json",
			error : function() {
				layer.alert('请求错误，请刷新重试', {
					icon : 2
				});
			},
			success : callback,
			complete : function() {// 关闭加载层
				layer.close(loadIdx);
			}
		});
		// 关闭提示窗口
		layer.close(index);
	});
}


/**
 * 刷新父页面，弹出框调用
 */
function refreshPage() {
	parent.execIframeFunc("refresh()");
}

/**
 * 刷新当前页
 */
function refresh() {
	window.location.reload();
}

function fnCheckMobile(mobile){
	var reg = /^1[3|4|5|7|8]\d{9}$/;
    if(!(reg.test(mobile))){ 
        return false; 
    }else{
    	return true;
    }
}

/**
 * 获取当前时间
 * 
 * @returns {Date}
 */
function fnGetNowDate(){
	return new Date();
}
/**
 * 获取当前时间 字符串
 * 
 * @returns 格式 yyyy-MM-dd
 */
function fnGetNowDateStr(){
	var date = fnGetNowDate();
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

/**
 * 比较两个日期的大小 日期格式为 yyyy-MM-dd
 * 
 * @param d1
 * @param d2
 * @return d1 < d2 return -1 d1 < d2 return 0 d1 > d2 return 1
 */
function fnCompareDate(d1, d2){
	/* 第一个日期 */
	var strArray1 = d1.split("-");
	var year1 = strArray1[0];
	var month1 = strArray1[1];
	var day1 = strArray1[2];
	/* 第二个日期 */
	var strArray2 = d2.split("-");
	var year2 = strArray2[0];
	var month2 = strArray2[1];
	var day2 = strArray2[2];
	
	if(parseInt(year1) < parseInt(year2)){
		return -1;
	}
	if(parseInt(year1) > parseInt(year2)){
		return 1;
	}
	if(parseInt(month1) < parseInt(month2)){
		return -1;
	}
	if(parseInt(month1) > parseInt(month2)){
		return 1;
	}
	if(parseInt(day1) < parseInt(day2)){
		return -1
	}
	if(parseInt(day1) > parseInt(day2)){
		return 1;
	}
	return 0;
}

/**
 * 校验金额，最多保留两位小数（大于0）
 */
function fnCheckMoney(money){
	var ret=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
	if(ret.test(money)){
		return true;
	}else{
		return false;
	}
}

/**
 * 校验金额，最多保留两位小数（大于等于0）
 */
function fnCheckMoneyZero(money){
	var ret=/^((0)|([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
	if(ret.test(money)){
		return true;
	}else{
		return false;
	}
}



// 判断浏览器类型
// 返回类型说明 Sys.ie是获取到的是浏览器的版本号
// 使用方法：Browser.ie/firefox/chrom/opera等
function BrowserType(){
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :	// ie
	(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :	// 火狐
	(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :	// 谷歌
	(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :	// opera
	(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
	return Sys;
}

/*
 * open出的窗口居中，只能弹出一个 url：URL name：页面title名称 iWidth：宽 iHeight：高
 * 注意：使用此方法时，需要在使用页面的js中添加全局变量： var POP_UP_WIN = null; //弹出窗口用，判断是否弹出过窗口
 */
var POP_UP_WIN;
function fnOpenWindow(url,name,iWidth,iHeight)
{
	if(POP_UP_WIN){	// 判断是否弹出过窗口
		if(!POP_UP_WIN.closed){ 
			POP_UP_WIN.close(); 
		}
    } 
    var url;                             // 转向网页的地址;
    var name;                            // 网页名称，可为空;
    var iWidth;                          // 弹出窗口的宽度;
    var iHeight;                         // 弹出窗口的高度;
    // 获得窗口的垂直位置
    var iTop = (window.screen.availHeight-30-iHeight)/2;        
    // 获得窗口的水平位置
    var iLeft = (window.screen.availWidth-10-iWidth)/2;     
    POP_UP_WIN = window.open(url,name,'height='+iHeight+',innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=1,titlebar=yes');
}

function smalltoBIG(n)     
    {    
        var fraction = ['角', '分'];    
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];    
        var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];    
        var head = n < 0? '欠': '';    
        n = Math.abs(n);    
      
        var s = '';    
      
        for (var i = 0; i < fraction.length; i++)     
        {    
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');    
        }    
        s = s || '整';    
        n = Math.floor(n);    
      
        for (var i = 0; i < unit[0].length && n > 0; i++)     
        {    
            var p = '';    
            for (var j = 0; j < unit[1].length && n > 0; j++)     
            {    
                p = digit[n % 10] + unit[1][j] + p;    
                n = Math.floor(n / 10);    
            }    
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;    
        }    
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');    
    }  

    
/**
 * 替换所有字符的方法
 * 
 * @returns
 */
String.prototype.replaceAll = function (AFindText,ARepText){
	 var raRegExp = new RegExp(AFindText,"g");
	 return this.replace(raRegExp,ARepText);
};

/**
 * 将带时分秒的日期转为不带时分秒
 */
function getYYYYMMDD(str){
	if(str==null || str==""){
		return "";
	}
	return str.substring(0,10);
}

/**
 * 当字符串 超过长度length时 用...代替后面的数据
 * 
 * @param {}
 *            str
 * @param {}
 *            length
 * @return {String}
 */
function getsubString(str,length){
	if(str==null || str == ""){
		return "";
	}
	if(str.length>length){
		return str.substr(0,parseInt(length))+"...";
	}
	return str;
}

/**
 * 验证是否为手机号码
 * 
 * @param value
 * @returns
 */
function _checkPhoneNumber(value){
	var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; // 验证规则
	return !reg.test(value); // true
}

function _checkPhoneNumber02(value){
	var reg = /^[1|4][0|3|4|5|6|7|8|9][0-9]{9}$/; // 验证规则
	return !reg.test(value); // true
}
function _checkPhoneNumber03(value){
	var reg = /^[1|4][0|3|4|5|6|7|8|9][0-9]{8,9}$/; // 验证规则
	var phone = /^0\d{2,3}\d{7,8}$/; 
	return !(reg.test(value)||phone.test(value)); // true
}

/**
 * 用途：检查输入的电话号码格式是否正确 输入： strPhone：字符串 返回： 如果通过验证返回true,否则返回false
 */ 
function checkPhone(strPhone) 
{ 
	var phoneRegWithArea = /^[0][1-9][0-9]{1,2}-{0,1}[0-9]{5,10}$/; 
	var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/; 
	var phoneRegMobile = /^[1][3-9][0-9]{9}$/; /**
												 * 手机号格式update by YufengJia
												 * 2015.08.01*
												 */
	/* var prompt = "您输入的电话号码不正确!"; */
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
 * 之校验位数
 */
function _checkCardNum(value){
	var reg = /^\d{16}|\d{19}$/; // 验证规则
	return !reg.test(value); // true
}

/**
 * 去掉空格方法
 */
String.prototype.Trim = function() {
	var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	return (m == null) ? "" : m[1];
};

/**
 * 比较两个日期相差天数
 * 
 * @param {}
 *            strDateStart
 * @param {}
 *            strDateEnd
 * @return {}
 */
function getDays(strDateStart,strDateEnd){
   var strSeparator = "-"; // 日期分隔符
   var oDate1;
   var oDate2;
   var iDays;
   oDate1= strDateStart.split(strSeparator);
   oDate2= strDateEnd.split(strSeparator);
   var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
   var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
   iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)// 把相差的毫秒数转换为天数
   return iDays ;
}



Date.prototype.pattern = function(fmt) {
	var o = {

		"M+" : this.getMonth() + 1, // 月份

		"d+" : this.getDate(), // 日

		"h+" : this.getHours(), // 小时

		"H+" : this.getHours(), // 小时

		"m+" : this.getMinutes(), // 分

		"s+" : this.getSeconds(), // 秒

		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度

		"S" : this.getMilliseconds()
	// 毫秒

	};

	var week = {

		"0" : "\u65e5",

		"1" : "\u4e00",

		"2" : "\u4e8c",

		"3" : "\u4e09",

		"4" : "\u56db",

		"5" : "\u4e94",

		"6" : "\u516d"

	};

	if (/(y+)/.test(fmt)) {

		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));

	}

	if (/(E+)/.test(fmt)) {

		fmt = fmt
				.replace(
						RegExp.$1,
						((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f"
								: "\u5468")
								: "")
								+ week[this.getDay() + ""]);

	}

	for ( var k in o) {

		if (new RegExp("(" + k + ")").test(fmt)) {

			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));

		}

	}

	return fmt;

};


/* 页面遮罩层 */
function _m_show(str){
	$("#loadinghtml").html(str);
	$(".black_mark,.date_loading").show();
}
/* 关闭遮罩层 */
function _m_hide(){
	$(".black_mark,.date_loading").hide();
}

/**
 * 保留1位小数
 */
function toDecimalOne(x) { 
	var f = parseFloat(x); 
	if (isNaN(f)) { 
		return false; 
	} 
	var f = Math.round(x*10)/10; 
	var s = f.toString(); 
	var rs = s.indexOf('.'); 
	if (rs < 0) { 
		rs = s.length; 
		s += '.'; 
	} 
	while (s.length <= rs + 1) { 
		s += '0'; 
	} 
	return s; 
}

/**
 * 将NULL转为""
 */
function nullToEmpty(str){
	if(str==null || str == "null"){
		return "";
	}
	return str;
}

/**
 * 将NULL转为"" obj：对象 str:对象中属性
 */
function nullToEmptyUndefined(obj,str){
	if(obj == undefined || obj == null || obj[str] == null){
		return "";
	}
	if(obj[str]==null || obj[str] == "null"){
		return "";
	}
	return obj[str];
}

/**
 * 将NULL转为0
 */
function nullToEmptyNum(str){
	if(str==null || str == "null" || str=="" || str==undefined){
		return "0";
	}
	return str;
}

/**
 * 分转元，除100
 */
function nullToEmptyMoney(str){
	if(str==null || str == "null"){
		return "0.00";
	}
	return toDecimal(parseInt(nullToEmptyNum(str))/100);
}

/**
 * 元转分，乘100
 */
function yuanToFen(str){
	if(str==null || str == "null"){
		return "0";
	}
	return toDecimal(parseInt(nullToEmptyNum(str))*100);
}

/**
 * 分转元，除100
 */
function nullToEmptyMoney2(str){
	if(str==null || str == "null"){
		return "0.00";
	}
	return toDecimal(parseFloat(nullToEmptyNum(str))/100.00);
}

/**
 * 克转千克，除1000
 */
function nullToEmptyKg(str){
	if(str==null || str == "null"){
		return "0.00";
	}
	return toDecimal(parseFloat(nullToEmptyNum(str))/1000);
}


/**
 * 将NULL转为"--"
 */
function nullToUnderline(str){
	if(str==null || str == "null" || str == ""){
		return "--";
	}
	return str;
}

/**
 * 将NULL转为 0
 */
function nullToNumber(str){
	if(str==null || str == "null" || str == "" || str==undefined){
		return 0;
	}
	return str;
}

/**
 * 文本框只能输入两位小数
 */
function fnInitInputNumber(id){
	$("#"+id).on('keyup', function (event) {
	    var $amountInput = $(this);
	    // 响应鼠标事件，允许左右方向键移动
	    event = window.event || event;
	    if (event.keyCode == 37 | event.keyCode == 39) {
	        return;
	    }
	    
    	// 先把非数字的都替换掉，除了数字和.
    	$amountInput.val($amountInput.val().replace(/[^\d.]/g, "").
        // 只允许一个小数点
        replace(/^\./g, "").replace(/\.{2,}/g, ".").
        // 只能输入小数点后两位
        replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
    	var oldValue = $amountInput.val();
    	var arr = oldValue.split(".");
    	if(arr[0] !=""){
    	   if(arr.length==1){
    	   	$amountInput.val(parseFloat(arr[0].substring(0,7))); 
    	   }else{
    	   	$amountInput.val(parseFloat(arr[0].substring(0,7))+"."+arr[1]); 
    	   }
    	}
    });
	$("#"+id).on('blur', function () {
	    var $amountInput = $(this);
	    // 最后一位是小数点的话，移除
	    $amountInput.val($amountInput.val().replace(/[^\d.]/g, "").replace(/\.$/g, ""));
	    var oldValue = $amountInput.val();
    	var arr = oldValue.split(".");
    	if(arr[0] !=""){// 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    	   if(arr.length==1){
    	   	$amountInput.val(parseFloat(arr[0].substring(0,7))); 
    	   }else{
    	   	$amountInput.val(parseFloat(arr[0].substring(0,7))+"."+arr[1]); 
    	   }
    	}
	});
}

/**
 * 文本框只能输入整数
 */
function fnInitInputNumber2(id){
	$("#"+id).on('keyup', function (event) {
	    var $amountInput = $(this);
	    // 响应鼠标事件，允许左右方向键移动
	    event = window.event || event;
	    if (event.keyCode == 37 | event.keyCode == 39) {
	        return;
	    }
	    
    	// 先把非数字的都替换掉，除了数字和.
    	$amountInput.val($amountInput.val().replace(/[^\d]/g, ""));
    	var oldValue = $amountInput.val();
    	$amountInput.val(oldValue); 
    });
}

/**
 * 文本框只能输入整数
 */
function fnInitInputNumber3(id,type){
	$("#"+id).on('keyup', function (event) {
	    var $amountInput = $(this);
	    // 响应鼠标事件，允许左右方向键移动
	    event = window.event || event;
	    if (event.keyCode == 37 | event.keyCode == 39) {
	        return;
	    }
	    
	    // 先把非数字的都替换掉，除了数字和.
	    if(type != null && $amountInput.val().length == 1){
	    	$amountInput.val($amountInput.val().replace(/[^2-9]/g,''));
		} else {
			$amountInput.val($amountInput.val().replace(/[^\d]/g, ""));
		}
    	var oldValue = $amountInput.val();
    	$amountInput.val(oldValue); 
    });
}

/**
 * 获取UUID
 * 
 * @return {}
 */
function getUUID(){
	return UUID.prototype.createUUID().replaceAll("-","");
}

/**
 * 保留2位小数，如：2，会在2后面补上00.即2.00 3.145 = 3.15 3.144 = 3.14 xb
 */
function toDecimal(x) { 
	if(x == null || x == undefined){
		return "0.00";
	}
	var f = parseFloat(x); 
	if (isNaN(f)) { 
		return false; 
	} 
	var f = Math.round(x*100)/100; 
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
}

/**
 * 保留3位小数，如：2，会在2后面补上00.即2.00 3.145 = 3.15 3.144 = 3.14 xb
 */
function toDecimal3(x) { 
	var f = parseFloat(x); 
	if (isNaN(f)) { 
		return false; 
	} 
	var f = Math.round(x*1000)/1000; 
	var s = f.toString(); 
	var rs = s.indexOf('.'); 
	if (rs < 0) { 
		rs = s.length; 
		s += '.'; 
	} 
	while (s.length <= rs + 3) { 
		s += '0'; 
	} 
	return s; 
}

/**
 * 格式化时间 timeStr：时间字符串 startNum:截取起始序号 endNum：截取结束序号
 */
function fnShowTime(timeStr, startNum, endNum) {
	if (timeStr == null || timeStr == "") {
		return timeStr;
	}
	return timeStr.substring(startNum, endNum);
}

/**
 * 数组去重
 * 
 * @return {}
 */
Array.prototype.unique = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
	   	    res.push(this[i]);
	        json[this[i]] = 1;
        }
    }
	return res;
}

/**
 * 将光标指定到组件中
 * 
 * @param {}
 *            id
 */
function _fnFocus(id){
	$(id).focus();
	$(id).select();
}


/** ***************************跨域请求************************************************ */
var HTTP_SERVER=$.cookie('checkdataserver');
/**
 * 
 * @param {}
 *            actionName 请求的名称
 * @param {}
 *            vParam 请求的参数
 * @param {}
 *            callback 成功的回调函数
 */
function _jsonp_ajax(actionName,vParam,callback,errorBack,bfsend){
	var url=$.cookie(actionName);
	if(url==null||url==""){
		// w_alert("非法请求");
		return;
	}
	$.ajax({
		type : "post",
		url : HTTP_SERVER+url,
		data : vParam,
		dataType : "json",
		error : function() {
				if(errorBack!=null){
				    errorBack.call(this);
				}
			},
		success : callback,
		beforeSend:function(){
			if(bfsend!=null){
				bfsend.call(this);
			}
		}
		
	});
	
}

/**
 * 数字(正整数)判断(是数字：true,不是数字：false)
 * 
 * @param value
 *            20171026 by gunan
 */
function isNumber( value ) {
    return /(^[0-9]*$)/.test( value );
}

function _isundf(str){
	if(typeof(str)=="undefined"){ 
		return true;
	} 
	return false;
}

/**
 * 功能：输入框只能输入数字 obj：文本框对象 type：类型 只能输入小数
 */
 

function inputCheckDouble(obj){ 
	obj.value = obj.value.replace(/[^\d.-]/g,""); // 清除“数字”和“.”,"-"以外的字符
	obj.value = obj.value.replace(/^\./g,""); // 验证第一个字符是数字而不是.
	obj.value = obj.value.replace(/\.{2,}/g,"."); // 只保留第一个. 清除多余的
	obj.value = obj.value.replace(/\-{2,}/g,"-"); // 只保留第一个- 清除多余的
	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	obj.value=obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');// 只能输入两个小数
	 
}

/**
 * 功能：输入框只能输入数字 obj：文本框对象 type：类型 只能输入小数
 */
 

function inputCheckDouble2(obj){ 
	obj.value = obj.value.replace(/[^\d.]/g,""); // 清除“数字”和“.”,"-"以外的字符
	obj.value = obj.value.replace(/^\./g,""); // 验证第一个字符是数字而不是.
	obj.value = obj.value.replace(/\.{2,}/g,"."); // 只保留第一个. 清除多余的
	obj.value = obj.value.replace(/\-{2,}/g,"-"); // 只保留第一个- 清除多余的
	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	obj.value=obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');// 只能输入两个小数
	 
}

function inputCheckDouble3(obj){ 
	obj.value = obj.value.replace(/[^\d.]/g,""); // 清除“数字”和“.”,"-"以外的字符
	obj.value = obj.value.replace(/^\./g,""); // 验证第一个字符是数字而不是.
	obj.value = obj.value.replace(/\.{2,}/g,"."); // 只保留第一个. 清除多余的
	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	obj.value=obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');// 只能输入两个小数
	 
}

function inputCheckSmh(obj){
	obj.value = obj.value.replace(/[^\u4e00-\u9fa5a-zA-Z]{1}/g,"");
}

 
function inputCheckUnSmh(obj){
	obj.value = obj.value.replace(/[^a-zA-Z0-9_]/g,"");
}

function inputCheckDpi(obj){
	if(obj.value.length==1){
		obj.value=obj.value.replace(/[^0-9]/g,'');
	}else{
		obj.value = obj.value.replace(/[^\d*]/g,""); 
		// 必须保证第一位为数字而不是.
		obj.value = obj.value.replace(/^\*/g,""); 
		// 保证只有出现一个.而没有多个.
		obj.value = obj.value.replace(/\*{2,}/g,"*"); 
		// 保证.只出现一次，而不能出现两次以上
		obj.value = obj.value.replace("*","$#$").replace(/\*/g,"").replace("$#$","*");
		 
	}	
}

/**
 * 去掉英文单引号
 */
function _checkSubStr(obj){
	obj.value=obj.value.replace(/\'/g,'');
}

function inputCheckNotSmh(obj){
	obj.value = obj.value.replace(/[^\u0000-\u4e00\u9fa5-\uffffa-zA-Z]{1}/g,"");
}

function inputCheckNumFormat(obj, type){
	if(obj.value.length==1){
		obj.value=obj.value.replace(/[^0-9]/g,'');
	}else{
		obj.value = obj.value.replace(/[^\d.]/g,""); 
		// 必须保证第一位为数字而不是.
		obj.value = obj.value.replace(/^\./g,""); 
		// 保证只有出现一个.而没有多个.
		obj.value = obj.value.replace(/\.{2,}/g,"."); 
		// 保证.只出现一次，而不能出现两次以上
		
		obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		// 只能输入三个小数
		obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');
		if(obj.value.indexOf(".")!=-1){
			if(obj.value.split(".")[0].length>8){
				obj.value=obj.value.substring(0,8)+"."+obj.value.split(".")[1];
			}
		}else{
			obj.value=obj.value.substring(0,8)
		}
	} 
}

function inputCheckSpecIn(obj){
	obj.value = obj.value.replace(/</g,""); 
	obj.value = obj.value.replace(/>/g,""); 
}

function inputCheck(obj, type){
	var input = obj.value.Trim();
	switch (type) {
	case 1: {
		if(obj.value.length==1){
			obj.value=obj.value.replace(/[^1-9]/g,'');
		} else {
			obj.value = parseInt(obj.value);
			if(obj.value.length==1){
				obj.value=obj.value.replace(/[^1-9]/g,'');
			}else{
				obj.value=obj.value.replace(/\D/g,'');
			}
		}
		break;
	}
	case 2: {
		obj.value = obj.value.replace(/[^\d.]/g,""); 
		// 必须保证第一位为数字而不是.
		obj.value = obj.value.replace(/^\./g,""); 
		// 保证只有出现一个.而没有多个.
		obj.value = obj.value.replace(/\.{2,}/g,"."); 
		// 保证.只出现一次，而不能出现两次以上
		obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		break;
	}
	case 3: {
		if(obj.value.length==1){
			obj.value=obj.value.replace(/[^0-9]/g,'');
		} else {
			obj.value=obj.value.replace(/\D/g,'');
		}
		break;
	}
	case 4: {
		if(obj.value.length==1){
			obj.value=obj.value.replace(/[^1-9]/g,'');
		}else{
			obj.value = obj.value.replace(/[^\d.]/g,""); 
			// 必须保证第一位为数字而不是.
			obj.value = obj.value.replace(/^\./g,""); 
			// 保证只有出现一个.而没有多个.
			obj.value = obj.value.replace(/\.{2,}/g,"."); 
			// 保证.只出现一次，而不能出现两次以上
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			// 只能输入两个小数
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
		}	
		break;
	}
	case 5: {
		if(obj.value.length==1){
			obj.value=obj.value.replace(/[^0]/g,'');
		}else{
			obj.value = obj.value.replace(/[^\d.]/g,""); 
			// 必须保证第一位为数字而不是.
			obj.value = obj.value.replace(/^\./g,""); 
			// 保证只有出现一个.而没有多个.
			obj.value = obj.value.replace(/\.{2,}/g,"."); 
			// 保证.只出现一次，而不能出现两次以上
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			// 只能输入三个小数
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3');
		}	
		break;
	}
	case 6: {
		if(obj.value.length==1){
			obj.value=obj.value.replace(/[^0-9]/g,'');
		}else{
			obj.value = obj.value.replace(/[^\d.]/g,""); 
			// 必须保证第一位为数字而不是.
			obj.value = obj.value.replace(/^\./g,""); 
			// 保证只有出现一个.而没有多个.
			obj.value = obj.value.replace(/\.{2,}/g,"."); 
			// 保证.只出现一次，而不能出现两次以上
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			// 只能输入两个小数
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
		}	
		break;
	}
	case 7: {
		if(obj.value.length==1){
			obj.value=obj.value.replace(/[^0-9]/g,'');
		}else{
			obj.value = obj.value.replace(/[^\d.]/g,""); 
			// 必须保证第一位为数字而不是.
			obj.value = obj.value.replace(/^\./g,""); 
			// 保证只有出现一个.而没有多个.
			obj.value = obj.value.replace(/\.{2,}/g,"."); 
			// 保证.只出现一次，而不能出现两次以上
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			// 只能输入三个小数
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d).*$/,'$1$2.$3');
		}	
		break;
	}
	case 8: {
		if(obj.value.length==1){
			obj.value=obj.value.replace(/[^0-9]/g,'');
		}else{
			obj.value = obj.value.replace(/[^\d.]/g,""); 
			// 必须保证第一位为数字而不是.
			obj.value = obj.value.replace(/^\./g,""); 
			// 保证只有出现一个.而没有多个.
			obj.value = obj.value.replace(/\.{2,}/g,"."); 
			// 保证.只出现一次，而不能出现两次以上
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			// 只能输入一个小数
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3');
		}	
		break;
	}
	case 9: {
		if(obj.value.length==1){
			obj.value=obj.value.replace(/[^0-9]/g,'');
		}else{
			obj.value = obj.value.replace(/[^\d.]/g,""); 
			// 必须保证第一位为数字而不是.
			obj.value = obj.value.replace(/^\./g,""); 
			// 保证只有出现一个.而没有多个.
			obj.value = obj.value.replace(/\.{2,}/g,"."); 
			// 保证.只出现一次，而不能出现两次以上
			obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			// 只能输入三个小数
			obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');
		}	
		break;
	}
	case 10: {
		if(obj.value.length==1){
			obj.value=obj.value.replace(/[^0-9]/g,'');
		}else{
			obj.value=obj.value.replace(/[^0-9]/g,'');
		}	
		break;
	}
	}
}


/**
 * 特指某些输入框无法输入除了数字以外的值
 */
$.fn.onlyNum = function () {
     $(this).keypress(function (event) {
         var eventObj = event || e;
         var keyCode = eventObj.keyCode || eventObj.which;
         if ((keyCode >= 48 && keyCode <= 57))
             return true;
         else
             return false;
     }).focus(function () {
     /* 禁用输入法 */
         this.style.imeMode = 'disabled';
     }).bind("paste", function (event) {
     	/* 获取剪切板的内容 */
     	 var clipboard = event.clipboardData.getData("text");
         if (/^\d+$/.test(clipboard))
             return true;
         else
             return false;
     });
};

$.fn.onlyMoney=function(){
// var money;
	$(this).keypress(function(event){ 
		var eventObj = event || e;
		var keyCode = eventObj.keyCode || eventObj.which;
		return isMoneys($(this).val()+eventObj.key) ; 
	     }).focus(function () {
	     /* 禁用输入法 */
	         this.style.imeMode = 'disabled';
	     }).bind("paste", function (event) {
	     	/* 获取剪切板的内容 */
	     	 var clipboard = event.clipboardData.getData("text");
	         if (/^\d+$/.test(clipboard))
	             return true;
	         else
	             return false;
	     });
} 

function isMoneys( s ){   
	var regu = "^[0-9]+[\.]{0,1}[0-9]{0,2}$"; 
	var re = new RegExp(regu); 
	if (re.test(s)) { 
	return true; 
	} else { 
	return false; 
	} 
	} 

function _getNowMonth(len){
	if(len == null){len=0};
	 var date=new Date;
	 var year=date.getFullYear(); 
	 var month=date.getMonth()+1+len;
	 if(month < 10){
		 month = "0"+month; 
	 }
	 return year+"-"+month;
}

function _getNowMonth2(len){
	if(len == null){len=0};
	var date=new Date;
	var year=date.getFullYear(); 
	var month=date.getMonth()+1+len;
	return year+"-"+month;
}
function _getNowMonth3(len){
	if(len == null){len=0};
	var date=new Date;
	var month=date.getMonth()+1+len;
	if(month < 10){
		 month = "0"+month; 
	 }
	return month;
}
function _getNowYear(len){
	if(len == null){len=0};
	 var date = new Date;
	 var year=date.getFullYear() + len; 
	 return year;
}

/**
 * 格式化数据
 */
function _round(value, num) {            
	 var a, b, c, i;                               
	 a = value.toString();                         
	 b = a.indexOf(".");                           
	 c = a.length;                                 
	 if (num == 0) {                               
	     if (b != -1) {                            
	         a = a.substring(0, b);                
	     }                                         
	 } else {                                      
	     if (b == -1) {                            
	         a = a + ".";                          
	         for (i = 1; i <= num; i++) {          
	             a = a + "0";                      
	         }                                     
	     } else {                                  
	         a = a.substring(0, b + num + 1);      
	         for (i = c; i <= b + num; i++) {      
	             a = a + "0";                      
	         }                                     
	     }                                         
	 }  
	 return a;                                     
}

/**
 * 处理数字：千位符、保留小数位数
 * 
 * @param num
 *            值
 * @param del
 *            小数位
 * @param o
 *            o为true返回值为正数,否则为负数
 * @returns {String}
 */
function RetainedDecimalPlaces(num, del, o) {
    try {
        num += "";
        // num = _round(parseFloat(num),del)+""; //保留小数并四舍五入
        var str = "";
        if (!o) {
            if (num.substring(0, 1) == "-") str = "-";
        }
        // 清除字符串中的非数字 非.字符
        num = num.replace(/[^0-9|\.]/g, "");
        // 清除字符串开头的0
        if (/^0+/) num = num.replace(/^0+/, "");
        // 为整数字符串在末尾添加.0000
        if (!/\./.test(num)) num += ".0000";
        // 字符以.开头时，在开头添加0
        if (/^\./.test(num)) num = "0" + num; num += "0000"; // 在字符串末尾补零
        if (del == 2) num = num.match(/\d+\.\d{3}/)[0];
        if (del == 4) num = num.match(/\d+\.\d{4}/)[0];
        var num1 =num*1000;
        var num2= num1/10;
        var num3 = Math.round(num2);
        var num4= num3/100;
        num = num4;
        num = _round(parseFloat(num),del)+""; 
        // 千位符
        while (/\d{4}(\.|,)/.test(num)) // 符合条件则进行替换
            num = num.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); // 每隔3位添加一个
        return str + num;
    } catch (e) {
        alert(e);
    }
}

/**
 * 千位符
 */
function fnMoneyTo(value){
	if(value == null || value == undefined){
		return "0";
	}
	return RetainedDecimalPlaces(value,2,false);
}

/**
 * 从千位符转换回来
 */
function RetainedBackPlaces(num) {
	return num.replaceAll(",","");
}

/**
 * 处理数字：千位符、保留小数位数
 * 
 * @param num
 *            值
 * @param del
 *            小数位
 * @param o
 *            o为true返回值为正数,否则为负数
 * @returns {String}
 */
function RetainedDecimalPlaces(num, del, o) {
    try {
        num += "";
        // num = _round(parseFloat(num),del)+""; //保留小数并四舍五入
        var str = "";
        if (!o) {
            if (num.substring(0, 1) == "-") str = "-";
        }
        // 清除字符串中的非数字 非.字符
        num = num.replace(/[^0-9|\.]/g, "");
        // 清除字符串开头的0
        if (/^0+/) num = num.replace(/^0+/, "");
        // 为整数字符串在末尾添加.0000
        if (!/\./.test(num)) num += ".0000";
        // 字符以.开头时，在开头添加0
        if (/^\./.test(num)) num = "0" + num; num += "0000"; // 在字符串末尾补零
        if (del == 2) num = num.match(/\d+\.\d{3}/)[0];
        if (del == 4) num = num.match(/\d+\.\d{4}/)[0];
        var num1 =num*1000;
        var num2= num1/10;
        var num3 = Math.round(num2);
        var num4= num3/100;
        num = num4;
        num = _round(parseFloat(num),del)+""; 
        // 千位符
        while (/\d{4}(\.|,)/.test(num)) // 符合条件则进行替换
            num = num.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); // 每隔3位添加一个
        return str + num;
    } catch (e) {
        alert(e);
    }
}

/**
 * 格式化数据
 */
function _round(value, num) {            
	 var a, b, c, i;                               
	 a = value.toString();                         
	 b = a.indexOf(".");                           
	 c = a.length;                                 
	 if (num == 0) {                               
	     if (b != -1) {                            
	         a = a.substring(0, b);                
	     }                                         
	 } else {                                      
	     if (b == -1) {                            
	         a = a + ".";                          
	         for (i = 1; i <= num; i++) {          
	             a = a + "0";                      
	         }                                     
	     } else {                                  
	         a = a.substring(0, b + num + 1);      
	         for (i = c; i <= b + num; i++) {      
	             a = a + "0";                      
	         }                                     
	     }                                         
	 }  
	 return a;                                     
}


// 加法
Math.add = function(num1,num2){   
    var r1,r2,m;   
    try{r1=num1.toString().split(".")[1].length}catch(e){r1=0}   
    try{r2=num2.toString().split(".")[1].length}catch(e){r2=0}   
    m=Math.pow(10,Math.max(r1,r2))   
    return (num1*m+num2*m)/m   
}   

// 减法
Math.sub = function (num1,num2){  
  return Math.add(num1,-num2);   
}   

// 乘法
Math.mul = function (num1,num2){   
  var m=0,s1=num1.toString(),s2=num2.toString();   
  try{m+=s1.split(".")[1].length}catch(e){}   
  try{m+=s2.split(".")[1].length}catch(e){}   
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)   
}

// 除法
Math.div = function (num1,num2){   
var t1=0,t2=0,r1,r2;   
try{t1=num1.toString().split(".")[1].length}catch(e){}   
try{t2=num2.toString().split(".")[1].length}catch(e){}   
with(Math){   
    r1=Number(num1.toString().replace(".",""))   
    r2=Number(num2.toString().replace(".",""))   
    return (r1/r2)*pow(10,t2-t1);   
} 
} 


/**
 * 隔行换色
 */
function change_color_layout() {
	/* 这里编写页面需要动态计算子适应的方法 */
	// 表格隔行换色和鼠标滑过
	$(".normal_gray_table tbody tr:odd").addClass('table_td_bgckground');
	$(".normal_gray_table th:last-child,.normal_gray_table td:last-child").addClass('noboder');
	$(".normal_gray_table tbody tr").hover(function() {
		$(this).addClass("hovercolor");
	}, function() {
		$(this).removeClass("hovercolor");
	});
}

function _check_web_explorer(){
		
		
	  var chrome = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
		if (chrome) {
		  var chromeVersion = parseInt(chrome[2], 10);
		  // chrome浏览器 这里会输出chrome版本，自己判断下
		  
		} else {
		  var ieVersion = detectIE();
		  if (ieVersion !== false) {
		    if(parseInt(ieVersion)<=12){
		    	window.location.href =basePath+ "/update_explorer";
		    }
		  } else {
		    // 其他浏览器
		  }
		}
}
function detectIE() {
	  var ua = window.navigator.userAgent;

	  // Test values; Uncomment to check result …

	  // IE 10
	  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2;
		// Trident/6.0)';

	  // IE 11
	  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

	  // Edge 12 (Spartan)
	  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
		// like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

	  // Edge 13
	  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
		// (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	  var msie = ua.indexOf('MSIE ');
	  if (msie > 0) {
	    // IE 10 or older => return version number
	    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	  }

	  var trident = ua.indexOf('Trident/');
	  if (trident > 0) {
	    // IE 11 => return version number
	    var rv = ua.indexOf('rv:');
	    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	  }

	  var edge = ua.indexOf('Edge/');
	  if (edge > 0) {
	    // Edge (IE 12+) => return version number
	    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	  }

	  // other browser
	  return false;
	}

/**
 * 去掉换行
 */
function repalceTab(str){
	return str.replace(/(\n)+|(\r\n)+/g, "");
}

/**
 * 获取本月最后一天
 */
function _getMonthLastDay(){
	var date=new Date;
	var year=date.getFullYear(); 
	var month=date.getMonth()+1;
	var  day = new Date(year,month,0);
	if(month < 10){
		month = "0"+month; 
	}
	return year + '-' + month + '-' + day.getDate(); 
}
// ----------------------阿拉伯数字转中文数字方法开始--------------
// 单个数字转换用数组实现
var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"];
// 节权位同样用数组实现
var chnUnitSection = ["","万","亿","万亿","亿亿"];
// 节内权位同样用数组实现
var chnUnitChar = ["","十","百","千"];

// 节内转换算法
function fnSectionToChinese(section){
	var strIns = '', chnStr = '';
	var unitPos = 0;
	var zero = true;
	while(section > 0){
	   var v = section % 10;
	   if(v === 0){
	       if(!zero){
	           zero = true;
	           chnStr = chnNumChar[v] + chnStr;
	         }
	   }else{
	         zero = false;
	         strIns = chnNumChar[v];
	         strIns += chnUnitChar[unitPos];
	         chnStr = strIns + chnStr;
	   }
	   unitPos++;
	   section = Math.floor(section / 10);
	}
	return chnStr;
}

/**
 * 阿拉伯数字转中文数字:转换算法主函数 1.对“零”的第三个规则，把检测放在循环的最前面并默认为false，可以自然的丢弃最高小节的加零判断。
 * 2.单个数字转换用数组实现 3.节权位同样用数组实现 4.节内权位同样用数组实现
 */
function fnNumberToChinese(num){
	var unitPos = 0;
	var strIns = '', chnStr = '';
	var needZero = false;
	
	if(num === 0){
	   return chnNumChar[0];
	}
	while(num > 0){
	   var section = num % 10000;
	   if(needZero){
	       chnStr = chnNumChar[0] + chnStr;
	   }
	   strIns = fnSectionToChinese(section);
	   strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
	   chnStr = strIns + chnStr;
	   needZero = (section < 1000) && (section > 0);
	   num = Math.floor(num / 10000);
	   unitPos++;
	}
	return chnStr;
}
// ----------------------阿拉伯数字转中文数字方法结束--------------

/**
 * 给日期赋值 startId ：赋值开始日期 endId ：赋值结束日期 state ：根据状态判断赋值何种类型 1、当前时间和一月前 2、当前时间和三月前
 * 3、当前时间和半年前 4、或者空赋值当前时间和一年前
 */
function fnSetMonthDay2(startId,endId,state,callBack){
	$.ajax({
		type : "get",
		url : basePath+'/index/getServerDate',
		data : '',
		dataType : "json",
		error : function(e) {
			layer.alert('请求错误，请刷新重试', {
				icon : 2
			});
			},
		success : function(json){		
			var now_date = Date.parse(json);
			var date = new Date(now_date);
			 // 赋值当前时间及一年前时间
			if(!(state != 4 && state != undefined)){
				 $("#"+startId).val(getlastmonth(date,4));
				 $("#"+endId).val(getlastmonth(date,5));
			}
			// 赋值当前时间及一月前时间
			if(!(state != 1)){
				 $("#"+startId).val(getlastmonth(date,1));
				 $("#"+endId).val(getlastmonth(date,5));
			}
			// 赋值当前时间及三月前时间
			if(!(state != 2)){
				 $("#"+startId).val(getlastmonth(date,2));
				 $("#"+endId).val(getlastmonth(date,5));
			}
			// 赋值当前时间及半年前时间
			if(!(state != 3)){
				 $("#"+startId).val(getlastmonth(date,3));
				 $("#"+endId).val(getlastmonth(date,5));
			}
			callBack.call(this);
		}
	});
}

/**
 * 给日期赋值 startId ：赋值开始日期 endId ：赋值结束日期 state ：根据状态判断赋值何种类型 1、当前时间和一月前 2、当前时间和三月前
 * 3、当前时间和半年前 4、或者空赋值当前时间和一年前
 */
function fnSetMonthDay3(startId,endId,state){
	$.ajax({
		type : "get",
		url : basePath+'/index/getServerDate',
		data : '',
		dataType : "json",
		error : function(e) {
			layer.alert('请求错误，请刷新重试', {
				icon : 2
			});
			},
		success : function(json){		
			var now_date = Date.parse(json);
			var date = new Date(now_date);
			 // 赋值当前时间及一年前时间
			if(!(state != 4 && state != undefined)){
				 $("#"+startId).val(getlastmonth(date,4));
				 $("#"+endId).val(getlastmonth(date,5));
			}
			// 赋值当前时间及一月前时间
			if(!(state != 1)){
				 $("#"+startId).val(getlastmonth(date,1));
				 $("#"+endId).val(getlastmonth(date,5));
			}
			// 赋值当前时间及三月前时间
			if(!(state != 2)){
				 $("#"+startId).val(getlastmonth(date,2));
				 $("#"+endId).val(getlastmonth(date,5));
			}
			// 赋值当前时间及半年前时间
			if(!(state != 3)){
				 $("#"+startId).val(getlastmonth(date,3));
				 $("#"+endId).val(getlastmonth(date,5));
			}
		}
	});
}



/**
 * 给日期赋值 startId ：赋值开始日期 endId ：赋值结束日期 state ：根据状态判断赋值何种类型 1、当前时间和一月前 2、当前时间和三月前
 * 3、当前时间和半年前 4、或者空赋值当前时间和一年前
 */
function fnSetMonthDay(startId, endId, state) {
	$.ajax({
		type : "get",
		url : basePath + '/index/getServerDate',
		data : '',
		dataType : "json",
		error : function(e) {
			layer.alert('请求错误，请刷新重试', {
				icon : 2
			});
		},
		success : function(json) {
			var now_date = Date.parse(json);
			var date = new Date(now_date);
			// 赋值当前时间及一年前时间
			if (!(state != 4 && state != undefined)) {
				$("#" + startId).val(getlastmonthForSelect(date, 4));
				$("#" + endId).val(getlastmonthForSelect(date, 5));
			}
			// 赋值当前时间及一月前时间
			if (!(state != 1)) {
				$("#" + startId).val(getlastmonthForSelect(date, 1));
				$("#" + endId).val(getlastmonthForSelect(date, 5));
			}
			// 赋值当前时间及三月前时间
			if (!(state != 2)) {
				$("#" + startId).val(getlastmonthForSelect(date, 2));
				$("#" + endId).val(getlastmonthForSelect(date, 5));
			}
			// 赋值当前时间及半年前时间
			if (!(state != 3)) {
				$("#" + startId).val(getlastmonthForSelect(date, 3));
				$("#" + endId).val(getlastmonthForSelect(date, 5));
			}
		}
	});
}


/**
 * 给日期赋值 startId ：赋值开始日期 endId ：赋值结束日期 state ：根据状态判断赋值何种类型 1、当前时间和一月前 2、当前时间和三月前
 * 3、当前时间和半年前 4、或者空赋值当前时间和一年前
 */
function fnSetMonthDayFour(startId,endId,state,callBack){
	$.ajax({
		type : "get",
		url : basePath+'/index/getServerDate',
		data : '',
		dataType : "json",
		error : function(e) {
			layer.alert('请求错误，请刷新重试', {
				icon : 2
			});
			},
		success : function(json){		
			var now_date = Date.parse(json);
			var date = new Date(now_date);
			 // 赋值当前时间及一年前时间
			if(!(state != 4 && state != undefined)){ 
				 $("#"+startId).val(getlastmonthForSelect(date,4));
				 $("#"+endId).val(getlastmonthForSelect(date,5));
			}
			// 赋值当前时间及一月前时间
			if(!(state != 1)){ 
				 $("#"+startId).val(getlastmonthForSelect(date,1));
				 $("#"+endId).val(getlastmonthForSelect(date,5));
			}
			// 赋值当前时间及三月前时间
			if(!(state != 2)){
				 $("#"+startId).val(getlastmonthForSelect(date,2));
				 $("#"+endId).val(getlastmonthForSelect(date,5));
			}
			// 赋值当前时间及半年前时间
			if(!(state != 3)){
				 $("#"+startId).val(getlastmonthForSelect(date,3));
				 $("#"+endId).val(getlastmonthForSelect(date,5));
			}
			callBack.call(this);
		}
	});
}


/**
 * 给日期赋值 startId ：赋值开始日期 endId ：赋值结束日期 state ：根据状态判断赋值何种类型 1、当前时间和一月前 2、当前时间和三月前
 * 3、当前时间和半年前 4、或者空赋值当前时间和一年前
 */

function getlastmonthForSelect(myDate,state){
	var new_date;
	var currentYear = myDate.getFullYear(); 
	 
	var currentMonth = myDate.getMonth();
	var currentDate = myDate.getDate();   

	if(state==5){ 
		new_date = new Date(currentYear,currentMonth,currentDate); 
	}else if(state==2){ 
		currentMonth =currentMonth-3;
		new_date = new Date(currentYear,currentMonth,currentDate); 
	}else if(state==3){
		currentMonth =currentMonth-6;
		new_date = new Date(currentYear,currentMonth,currentDate); 
	}else if(state==4){
		currentYear=currentYear-1;
		new_date = new Date(currentYear,currentMonth,currentDate); 
	}else if(state==1){
		currentMonth =currentMonth-1;
		new_date = new Date(currentYear,currentMonth,currentDate); 
	}
	 
	  var year = new_date.getFullYear();
      month = new_date.getMonth() + 1; // 月份是从0开始的
      if(month<10){
    	  month='0'+month;
      }
      day = new_date.getDate();
      if(day<10){
    	  day ='0'+day;
      }
      var newTime = year + '-' +
              month + '-' +
              day   ;
	  return newTime;    
}

function fnSetMonthDay03(startId,endId,state){
    // 赋值当前时间及一年前时间
	if(!(state != 4 && state != undefined)){
		 $("#"+startId).val(getlastmonth(4));
		 $("#"+endId).val(getlastmonth(5));
	}
	// 赋值当前时间及一月前时间
	if(!(state != 1)){
		 $("#"+startId).val(getlastmonth(1));
		 $("#"+endId).val(getlastmonth(5));
	}
	// 赋值当前时间及三月前时间
	if(!(state != 2)){
		 $("#"+startId).val(getlastmonth(2));
		 $("#"+endId).val(getlastmonth(5));
	}
	// 赋值当前时间及半年前时间
	if(!(state != 3)){
		 $("#"+startId).val(getlastmonth(3));
		 $("#"+endId).val(getlastmonth(5));
	}
	return true;
}

/**
 * 加密手机号，中间4位*
 */
function fnReplacePhone(phone){
	if(phone != null && phone != "" && phone.length == 11){
		return phone.substring(0,3) + "****" + phone.substring(7,11);
	}else if(phone != null && phone != "" && phone.length > 8 && phone.length < 11){
		return phone.substring(0,3) + "***" + phone.substring(phone.length-4,phone.length);
	}else{
		return phone;
	}
}

/**
 * 获取服务器时间
 */
function getServerDate(){
	var now_date = new Date();
	$.ajax({
		type : "get",
		url : basePath+'/index/getServerDate',
		data : '',
		dataType : "json",
		error : function(e) {
			layer.alert('请求错误，请刷新重试', {
				icon : 2
			});
			},
		success : function(json){
			now_date = Date.parse(json);
		}
	});
	return now_date;
}

/**
 * 根据状态返回相应的时间 1、一个月前 2、三个月前 3、半年前 4、一年前 5、当前时间
 */
function getlastmonth(myDate,state) {
// var myDate = getServerDate();
	var myDate =new Date();
	var currentYear = myDate.getFullYear();
	var currentMonth = myDate.getMonth() + 1;
	var lastMonth = myDate.getMonth();
	var currentDate = myDate.getDate();
	var lastDate;
	
	// 一个月前的时间
	var prevCurrentYear = 0;
	var prevCurrentMonth = 0;
	var preDay = 0;
	
	// 三个月前的时间
	var tmY = 0;
	var tmM = 0;
	var tmD = 0;

	// 半年前的时间
	var halfY = 0;
	var halfM = 0;
	var halD = 0;

	// 一年前的时间
	var oneY = 0;
	var oneM = 0;
	var oneD = 0;
	
	var daysInMonth = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	
	isYears(currentYear);
	if (currentMonth == 0) {
		// 一月前的时间
		prevCurrentYear = currentYear - 1;
		prevCurrentMonth = 12;
		isYears(prevCurrentYear)
		preDay = monthTime(prevCurrentMonth, currentDate)

		// 三个月前的时间
		tmY = currentYear - 1;
		tmM = 10;
		tmD = monthTime(tmM, currentDate);

		// 半年前的时间
		halfY = currentYear - 1;
		halfM = 6;
		halfD = monthTime(halfM, currentDate);

		// 一年前的时间
		oneY = currentYear - 1;
		oneM = 0;
		oneD = monthTime(oneM, currentDate);

	} else {
		// 一个月前的时间
		if(currentMonth == 1){
			prevCurrentYear = currentYear-1;
		}else{
			prevCurrentYear = currentYear;
		}
		prevCurrentMonth = isZero(currentMonth - 1);
		preDay = monthTime(prevCurrentMonth, currentDate);

		// 三个月前的时间
		if (currentMonth - 3 < 0) {
			tmY = currentYear - 1;
			tmM = isZero(12 + (currentMonth - 3));
			isYears(tmY);
			tmD = monthTime(tmM, currentDate)
		} else {
			tmY = currentYear;
			tmM = isZero(currentMonth - 3);
			isZero(tmM);
			isYears(tmY);
			tmD = monthTime(tmM, currentDate)
		}

		// 半年前的时间
		if (currentMonth - 6 < 3) {
			halfY = currentYear - 1;
			halfM = isZero(12 + (currentMonth - 6));
			isZero(halfM);
			isYears(halfM);
			halfD = monthTime(halfM, currentDate)
		} else {
			halfY = currentYear;
			halfM = isZero(currentMonth - 6);
			isZero(halfM);
			isYears(halfM);
			halfD = monthTime(halfM, currentDate)
		}

		// 一年前的时间
		oneY = currentYear - 1;
		oneM = 12 + (currentMonth - 12);
		isYears(halfM);
		oneD = monthTime(oneM, currentDate)
	}
	
	function isYears(years) {
		if (years % 4 == 0 && years % 100 != 0 || years % 400 == 0) {
			daysInMonth[2] = 29;
		}
	}
	
	function monthTime(a, b) {
		if (daysInMonth[a] < b) {
			lastDate = daysInMonth[a]
		} else {
			lastDate = b;
		}
		return lastDate;
	}

	function isZero(s) {
		if (s == 0) {
			return s = 12;
		} else {
			return s;
		}
	}
	var now = currentYear + '-' + p(currentMonth) + "-" + p(currentDate);
	var priceLastMonth = prevCurrentYear + "-" + p(prevCurrentMonth) + "-" + p(lastDate);
	
	// 三个月前的时间
	var threeMonth = tmY + "-" + p(tmM) + '-' + p(tmD);

	// 半年期的时间
	var halfTime = halfY + "-" + p(halfM) + "-" + p(halfD);

	// 一年前的时间
	var oneTime = oneY + "-" + p(oneM) + "-" + p(oneD)
	function p(s) {
		return s < 10 ? '0' + s : s;
	}
	var timeArr = [ now, priceLastMonth, threeMonth, halfTime, oneTime ]
	
	// 返回一月前时间
	if(state == 1){
		return priceLastMonth;
	}
	// 返回三月前时间
	if(state == 2){
		return threeMonth;
	}
	// 返回半年前时间
	if(state == 3){
		return halfTime;
	}
	// 返回一年前时间
	if(state == 4){
		return oneTime;
	}
	// 返回当前时间
	if(state == 5){
		return now;
	}
}

/**
 * 定义比较方法
 * 
 * @param {}
 *            propertyName 按照某种属性记性排序
 * @return {}
 */
function fnCompare(propertyName) { 
	return function (object1, object2) { 
		var value1 = object1[propertyName]; 
		var value2 = object2[propertyName]; 
		if (value2 > value1) { 
			return -1; 
		} else if (value2 < value1) { 
			return 1; 
		} else { 
			return 0; 
		} 
	}
}

/**
 * 个页面权限设置（功能权限和数据权限）调用
 * 
 * @param {}
 *            roleFunction 权限
 * @param {}
 *            roleId 角色ID
 * @param {}
 *            codeId codeID
 */
function fnInitRoleFunction(codeId) {
	var roleFunctionData=$.grep(functionData,function(v,i){
		return v.roleId==ROLE_ID;
	})[0];
	var roleFunction = roleFunctionData.functionData;
	var checked=false;
	$.each(roleFunction, function(i,v){
			if(v.id==codeId) {
				checked = v.checked;
				return false;
			} 
	});
	return checked;
} 
 

function getFunctionData(val,codeId){ 
	var roleFunctionData=$.grep(functionData,function(v,i){
		return v.roleId==ROLE_ID;
	})[0]; 
	var roleFunction = roleFunctionData.functionData;
	
	var checked=false;
	$.each(roleFunction, function(i,v){
			if(v.id==codeId) {
				checked = v.checked;
				return false;
			} 
	});
	if(checked){
		return "--";
	}else{
		return val;
	} 
}


function getFunctionDataShow(codeId){ 
	var roleFunctionData=$.grep(functionData,function(v,i){
		return v.roleId==ROLE_ID;
	})[0]; 
	var roleFunction = roleFunctionData.functionData;
	
	var checked=false;
	$.each(roleFunction, function(i,v){
		if(v.id==codeId) {
			checked = v.checked;
			return false;
		} 
	}); 
	return checked; 
}

/**
 * “转换**”（详情用）
 */
function getFunctionDetailData(val,codeId){ 
	var roleFunctionData=$.grep(functionData,function(v,i){
		return v.roleId==ROLE_ID;
	})[0]; 
	var roleFunction = roleFunctionData.functionData;
	
	var checked=false;
	$.each(roleFunction, function(i,v){
			if(v.id==codeId) {
				checked = v.checked;
				return false;
			} 
	});
	if(checked){
		return "**";
	}else{
		return val;
	} 
}

/**
 * 厂长和录单员的流水线权限控制
 * 
 * @param codeId
 * @returns
 */
function getOrderFlowFunction(codeId){
	var flag=true;
// if(ROLE_ID=="2"){
// flag=true;
// }else
	if(ROLE_ID=="3"){
		var roleFunctionData=$.grep(functionData,function(v,i){
			return v.roleId==ROLE_ID;
		})[0]; 
		var roleFunction = roleFunctionData.functionData;
		var checked=false;
		$.each(roleFunction, function(i,v){
				if(v.id==codeId) {
					checked = v.checked;
					return false;
				} 
		});
		flag=checked;
	}
	return flag;
}

/*
 * 方法:Array.remove(dx) 功能:根据元素位置值删除数组元素. 参数:元素值，数组下标 返回:在原数组上修改数组
 */
Array.prototype.remove = function (dx) {
	if (isNaN(dx) || dx > this.length) {
		return false;
	}
	for (var i = 0, n = 0; i < this.length; i++) {
		if (this[i] != this[dx]) {
			this[n++] = this[i];
		}
	}
	this.length -= 1;
};

/**
 * 获取工厂全局设置的商品的类型下拉框 0精工字1喷绘2标识标牌
 */
function _fnGetProductTypeSelect(){
	var html = '<option value="">请选择行业分类</option>';
	if(IS_MAKE_WORD == 1){// 工厂是否做字0- 否，1-是
		html+= '<option value="0">精工字</option>';
	}
	if(IS_SPURT == 1){// 工厂是否喷绘0- 否，1-是
		html+= '<option value="1">喷绘</option>';
	}
	if(IS_IDENTIFYING == 1){// 工厂是否标识0- 否，1-是
		html+= '<option value="2">标识标牌</option>';
	}
	return html;
}



/**
 * 获取工厂全局设置的商品的类型下拉框 0精工字1喷绘2标识标牌
 */
function _fnGetProductTypeHtml(type){
	var html = '';
	if(type == 0){
		html = '精工字';
	}else if(type == 1){
		html = '喷绘';
	}else if(type == 2){
		html = '标识标牌';
	}
	return html;
}

function _fnGetProductTypeUse(){
	var product_type=[0,0,0];
	if(IS_MAKE_WORD == 1){// 工厂是否做字0- 否，1-是
		product_type[0]=1;
	}
	if(IS_SPURT == 1){// 工厂是否喷绘0- 否，1-是
		product_type[1]=1;
	}
	if(IS_IDENTIFYING == 1){// 工厂是否标识0- 否，1-是
		product_type[2]=1;
	}
	return product_type;
}

/**
 * 收付款方式
 */
function fnGetFinancePayType(payType){
	var str = "未知";
	if(payType=="0"){
		str = "现金";
	}else if(payType=="1"){
		str = "转账";
	}else if(payType=="2"){
		str = "月结";
	}else if(payType=="3"){
		str = "支付宝";
	}else if(payType=="4"){
		str = "微信";
	}
	return str;
}


/**
 * 打开新窗口查看图片
 */
function fnCommonInitSrcBig(_this){
	var src = $(_this).attr("src");
	window.open(src);
}

/**
 * 自定义layer弹框
 * 
 * @param title标题；
 * @param url请求的url；
 * @param w弹出层宽度（缺省调默认值）；
 * @param h弹出层高度（缺省调默认值）
 */
function _layer_show(title, url, w, h) {
	if (title == null || title == '') {
		title = false;
	}
	if (url == null || url == '') {
		url = "404.html";
	}
	if (w == null || w == '') {
		w = 800;
	}
	if (h == null || h == '') {
		h = ($(window).height() - 50);
	}
	layer.open({
		type : 2,
		area : [ w + 'px', h + 'px' ],
		fix : false, // 不固定
		maxmin : true,
		shade : 0.4,
		title : title,
		content : url
	});
	$(".layui-layer-maxmin").hide();
	$(".layui-layer-min").hide();// 最小化
	$(".layui-layer-max").hide();// 最大化
}



/**
 * 打开切图框
 * 
 * @param imageBlockName
 *            是包含图片及上传按钮的div区域块ID
 * @param ratio
 *            图片宽高比 默认是1
 * @param w
 *            弹框宽度
 * @param h
 *            弹框高度
 */
function _openImgCropper(imageBlockName,ratio,w,h) {
	if(imageBlockName==null || imageBlockName==""){
		layer.alert('请指定回显的图片区域ID', {
			icon : 0
		});
		
		return false ;
	}
	
// if (ratio == null || ratio == '' ) {
// ratio = 1;
// }
	if (w == null || w == '') {
		w = 800;
	}
	if (h == null || h == '') {
		h = ($(window).height() - 50);
	}
	// 弹框index传递给弹出页面
	var index = parent.layer.getFrameIndex(window.name);
	// imageBlockName是包含图片及上传按钮的div区域块ID
	console.log("111111")
	_layer_show(
			"裁切图片",
			"util/imgCropper?index="
					+ index + "&imageBlockName="+imageBlockName+"&ratio=" + ratio,
			w, h);
}

/**
 * 打开切图框并实时上传图片
 * 
 * @param imageBlockName
 *            是包含图片及上传按钮的div区域块ID
 * @param ratio
 *            图片宽高比 默认是1
 * @param w
 *            弹框宽度
 * @param h
 *            弹框高度
 * @param filePath
 *            保存图片的物理路径
 */
function _openImgCropper_ss(imageBlockName,ratio,w,h,filePath) {
	if(imageBlockName==null || imageBlockName==""){
		layer.alert('请指定回显的图片区域ID', {
			icon : 0
		});
		
		return false ;
	}
	
// if (ratio == null || ratio == '' ) {
// ratio = 1;
// }
	if (w == null || w == '') {
		w = 800;
	}
	if (h == null || h == '') {
		h = ($(window).height() - 50);
	}
	// 弹框index传递给弹出页面
	var index = parent.layer.getFrameIndex(window.name);
	// imageBlockName是包含图片及上传按钮的div区域块ID
	if(filePath==undefined){
		_layer_show(
				"裁切图片",
				"util/imgCropper_ss.do?index="
						+ index + "&imageBlockName="+imageBlockName+"&ratio=" + ratio,
				w, h);
	}else{
		_layer_show(
				"裁切图片",
				"util/imgCropper_ss.do?index="
						+ index + "&imageBlockName="+imageBlockName+"&ratio=" + ratio+"&filePath=" + filePath,
				w, h);
	}
}



/**
 * 图片裁剪返回公方法
 * 
 * @param {}
 *            index
 * @param {}
 *            imageBlockName
 * @param {}
 *            imageData
 */
function _setUploadImg(index,imageBlockName,imageData){
		if(imageBlockName==''){
			imageBlockName = "upload_image";
		}
		var obj  = null ;
		var $imageBlock = $("#"+imageBlockName);
		var oldHtml = $imageBlock.html();
		var $img = $imageBlock.find("img") ;
		if($img[0]){// 存在img时
			$imageBlock.find("button").hide();
			$img.prop("src",imageData).show();
			$img.attr("image_type","base64");
			// $imageBlock.append('<button id="re-upload-img" type="button"
			// class="btn btn-success">重新选择</button>');
			$imageBlock.find("#re-upload-img").click(function(){
				this.remove();
				$imageBlock.find("button").show();
				$img.prop("src","").hide();
			});
		}else{// 不存在img时，自动加入图片预览
			// var html = '<img image_type="base64" style="width:
			// 100px;height:100px;border:1px solid #bbb;"
			// src="'+imageData+'"><br/><button id="re-upload-img" type="button"
			// class="btn btn-success">重新选择</button>';
			var html = '<img image_type="base64" style="width: 100%;height:100%;border:1px solid #bbb;" src="'+imageData+'">';
			$imageBlock.empty();
			$imageBlock.html(html);
			$imageBlock.find("#re-upload-img").click(function(){
				$imageBlock.empty();
				$imageBlock.html(oldHtml);
			});
		}
}

/**
 * QQ表情转换
 */
function changeToEm(str){
	str = str.replace(/\</g,'&lt;');
	str = str.replace(/\>/g,'&gt;');
	str = str.replace(/\n/g,'<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g,'<img num="$1" src="../commons/qqface/arclist/$1.gif" border="0" />');
	return str;
}

/**
 * 表情转text
 */
function changeToText(str){
	$.each(qqFaceJson,function(i,obj){
		str = str.replaceAll(obj.img,obj.text);
	});
	return str;
}

function strDate(){
	var date=new Date();
	var str="";
	str=date.getFullYear();
	if((date.getMonth()+1).length==0){
		str+="-0"+(date.getMonth()+1);
	}else{
		str+="-"+(date.getMonth()+1);
	}
	if((date.getDate()).length==0){
		str+="-0"+(date.getDate());
	}else{
		str+="-"+(date.getDate());
	}
	
	str=str+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
	return str;
}

/**
 * 功能：输入框只能输入数字 obj：文本框对象 type：类型，1---只能输入大于0整数，2---只能输入大于等于0的数字(包括小数)
 * 3---只能输入大于等于0整数
 */
function c_inputCheck(event,obj, type){
	 event = window.event || event;
	 var keyCode = event.keyCode;
     if (keyCode == 37 || keyCode == 39) {
        return;
     }
     
     var t = obj.value.charAt(0);
 	 obj.value = obj.value.replace(/[^\d.]/g,"");  // 清除“数字”和“.”以外的字符
     obj.value = obj.value.replace(/^\./g,"");  // 验证第一个字符是数字而不是.
     obj.value = obj.value.replace(/\.{2,}/g,"."); // 只保留第一个. 清除多余的
     obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");  
     if(type==8){
	    if (t == '-') {
	        obj.value = '-' + obj.value;
	    }
	    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');// 只能输入两个小数
     }else if(type==1){
    	// 大于0整数
     	if(obj.value.length==1){
			obj.value=obj.value.replace(/[^1-9]/g,'');
		} else {
			obj.value = parseInt(obj.value);
			if(obj.value.length==1){
				obj.value=obj.value.replace(/[^1-9]/g,'');
			}else{
				obj.value=obj.value.replace(/\D/g,'');
			}
		}
     }else if(type==3){
     	// 大于等于0的
     	if(obj.value.length==1){
			obj.value=obj.value.replace(/[^0-9]/g,'');
		} else {
			obj.value=obj.value.replace(/\D/g,'');
		}
     }else if(type==5){
    	// 两位小数
     	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');// 只能输入两个小数
     }else if(type==6){
    	// 1位小数
     	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');// 只能输入1个小数
     }else if(type==7){
    	// 4位小数
     	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');// 只能输入4个小数
     }
     
}


// 验证数组是否有值重复
function isRepeat(arr){
   var hash = {};
   for(var i in arr) {
       if(hash[arr[i]])
          return true;
       hash[arr[i]] = true;
   }
   return false;
}

// 验证数组是否有值重复
function isRepeat2(arr){
 var hash = {};
 for(var i in arr) {
     if(hash[arr[i]])
        return arr[i];
     hash[arr[i]] = true;
 }
 return false;
}

/**
 * 获取商品类型：0优惠券
 */
function _fnGetVirtualType(virtualType){
	if(virtualType == 0){
		return "优惠券";
	}else{
		return "";
	}
}

function checkLink(url){
	var filter = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
	if (filter.test(url))
		return true;
	else {
		return false;
	}
}

function chenckLinkWWW(url){
	var filter = /^[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
	if (filter.test(url))
		return true;
	else {
		return false;
	}
}

/**
 * 获取商品类别：0-普通商品 1-虚拟商品 2-服务商品 3-套装
 */
function _fnGetProdType(prodType){
	if(prodType == 0){
		return "普通商品";
	}else if(prodType == 1){
		return "虚拟商品";
	}else if(prodType == 2){
		return "服务商品";
	}else if(prodType == 3){
		return "套装";
	}else{
		return "未知";
	}
}

/**
 * 清空表格同时向表格中增加数据 id表格的id data要想表格中添加的数据集
 */
function _ADD_DATA_TABLE(id,data){
	 // 先清空表格数据
 	 jQuery("#"+id).jqGrid("clearGridData");
 	 jQuery("#cb_"+id).removeAttr("checked");
	 var length=data.length;
	 for(var i=0;i<length;i++){
	 	  jQuery("#"+id).jqGrid("addRowData",i+1,data[i]);
	 }	
	 return length;
}

/**
 * 获取各个规则的名称
 */
function _fnGetActiveName(actType){
	var actName = "";
	switch (actType) {
		case "0": actName = "积分兑换" ;break;
		case "1": actName = "限时抢购" ;break;
		case "2": actName = "满额赠送" ;break;
		case "3": actName = "会员积分" ;break;
		case "4": actName = "满额立减" ;break;
		case "5": actName = "拼团" ;break;
		case "6": actName = "砍价" ;break;
		case "7": actName = "运费" ;break;
		default:break;
	}
	return actName;
}

/**
 * 获取各个规则的编码
 */
function _fnGetActiveType(actType){
	var actName = "";
	switch (actType) {
		case "0": actName = "point_exchange" ;break;
		case "1": actName = "fast" ;break;
		case "2": actName = "full_gift" ;break;
		case "3": actName = "get_point" ;break;
		case "4": actName = "full_subtract" ;break;
		case "5": actName = "collage" ;break;
		case "6": actName = "bargain" ;break;
		case "7": actName = "post_fee" ;break;
		default:break;
	}
	return actName;
}

/**
 * 获取各个规则的分页查询请求
 */
function _fnGetQueryDataUrl(){
	var url = "";
	switch (ACTIVE_TYPE) {
		case "0": url = "rule_point_exchange/rule_point_exchange_list_pagination" ;break;
		case "1": url = "rule_fast_sale/rule_fast_sale_list_pagination" ;break;
		case "2": url = "rule_full_gift/rule_full_gift_pagination" ;break;
		case "3": url = "rule_getPoint/rule_get_point_info" ;break;
		case "4": url = "rule_fullSubtract/rule_full_subtract_info" ;break;
		case "5": url = "rule_collage/rule_collage_list_pagination" ;break;
		case "6": url = "rule_bargain/rule_bargain_list_pagination" ;break;
		case "7": url = "rule_postFee/rule_post_fee_info" ;break;
		default:break;
	}
	return url;
}

function stripscript(thiss){
	var s = $(thiss).val();
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
	var rs = ""; 
	for (var i = 0; i < s.length; i++) { 
		rs = rs+s.substr(i, 1).replace(pattern, ''); 
	} 
	return rs; 
} 


function reSetAllMoneyInfo(){
	/* 已选择项个数赋值 */
	var len = $("input[type='checkbox'][id^='ck_']:checked").length;
	$("#selectCheckNum").html(len);  
	ALLPRICE=0.00;
	var checkIds=$("input[type='checkbox'][id^='ck_']:checked");
	for(var i=0;i<checkIds.length;i++){  
		var id=$(checkIds[i]).attr("pkeyId");
		var priceInfo = $("#my_tr_"+id).data("singleProd").price; 
		if(priceInfo!=null && priceInfo !=undefined && priceInfo !=''){
			ALLPRICE+=parseFloat(priceInfo);
		} 
	} 
	$("#allMoney").html(parseFloat(ALLPRICE).toFixed(2));
}

function getMostListObj(arrMain,arrStr){ 
	var limitKey = 0;
	var retObj = new Object();
	for(var i=0;i<arrMain.length;i++){
		var innerLimitKey=0;
		var idKey=arrMain[i].idKey;
		for(var j=0;j<arrStr.length;j++){
			if(arrStr[j]!=''&&arrStr[j]!=undefined){
				if(idKey.indexOf(arrStr[j])!=-1){
					innerLimitKey++;
				}
			} 
		}
		if(innerLimitKey>limitKey){
			limitKey=innerLimitKey;
			retObj=arrMain[i];
		}
	}
	return retObj;
}

/**
 * 获取当前时间(string) type=1 yyyy-mm-ddd type=2 yyyy-mm-dd hh:mm:ss type=3 hh:mm:ss
 * 
 * @param type
 * @returns {string}
 * @private
 */
  function _fnGetNowTimeToString(type){
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }

      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }

      var currentdate = "";
      if(type == 1){
        currentdate = year + seperator1 + month + seperator1 + strDate;
      }else if(type == 2){
        currentdate = year + seperator1 + month + seperator1 + strDate
          + " " +  hours + seperator2 + minutes + seperator2 + seconds;
      }else if(type == 3){
        currentdate =  hours + seperator2 + minutes + seperator2 + seconds;
      }
      return currentdate;
  }
  
  /**
	 * 判断字符串长度，字符串过长,...显示
	 */
  function fnGetHtml(str){
  	var html = "";
  	if(str.length > 10){
  		html = str.substring(0, 10) + "...";
   	}else{
   		html = str;
   	}
  	return html;
  }
  
  /**
	 * 没有查询到数据时(jqgrid)
	 */
  function _NO_DATA_TABLE(colNum,id){
  	var html = '<tr><td colspan='+colNum+' style="height: 24px;"><div align="center">没有查询到相关信息</div></td></tr>';
  	/* 清空表格 */
  	$("#"+id).jqGrid("clearGridData");
  	$("#"+id).append(html);
  }
  
  /**
	 * 校验固定电话是否副歌格式
	 * 
	 * @param value
	 * @returns
	 */
  function fnCheckCustPhone(value){
      var reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
      var re = new RegExp(reg);
      if (re.test(value)){
          return true;
      }else {
          return false;
      }
  }
  
	
	/**
	 * 给日期赋值 startId ：赋值开始日期 endId ：赋值结束日期 state ：根据状态判断赋值何种类型 1、当前时间和一月前
	 * 2、当前时间和三月前 3、当前时间和半年前 4、或者空赋值当前时间和一年前
	 */
	function fnSetMonthDayNew(startId, endId, state) {
		$.ajax({
			type : "get",
			url : basePath + '/index/getServerDate',
			data : '',
			dataType : "json",
			error : function(e) {
				layer.alert('请求错误，请刷新重试', {
					icon : 2
				});
			},
			success : function(json) {
				var now_date = Date.parse(json);
				var date = new Date(now_date);
				// 赋值当前时间及一年前时间
				if (!(state != 4 && state != undefined)) {
					$("#" + startId).val(getlastmonthForSelect(date, 4));
					$("#" + endId).val(getlastmonthForSelect(date, 5));
				}
				// 赋值当前时间及一月前时间
				if (!(state != 1)) {
					$("#" + startId).val(getlastmonthForSelect(date, 1));
					$("#" + endId).val(getlastmonthForSelect(date, 5));
				}
				// 赋值当前时间及三月前时间
				if (!(state != 2)) {
					$("#" + startId).val(getlastmonthForSelect(date, 2));
					$("#" + endId).val(getlastmonthForSelect(date, 5));
				}
				// 赋值当前时间及半年前时间
				if (!(state != 3)) {
					$("#" + startId).val(getlastmonthForSelect(date, 3));
					$("#" + endId).val(getlastmonthForSelect(date, 5));
				}
			}
		});
	}

	/*
	 * 验证邮箱格式是否正确
	 */
   function validatorEmail(value){
       // 正则验证格式
       eval("var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;");
       return RegExp(reg).test(value);
   }

	/**
	 * 用途：检查输入字符串是否只由汉字、字母、数字组成 输入： value：字符串 返回： 如果通过验证返回true,否则返回false
	 * 
	 */ 
	function isChinaOrNumbOrLett( s ){// 判断是否是汉字、字母、数字组成
		var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";   
		var re = new RegExp(regu); 
		if (re.test(s)) { 
			return true; 
		}else{ 
			return false; 
		} 
	} 

/**
 * 替换特殊字符
 */
function TextValidate(s){
	s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
	// 去掉特殊字符
	s = s.replace(/[\@\#\$\%\^\&\*\(\)\{\}\:\"\L\<\>\?\[\]]/);
	return s;
}

/**
 * 验证用户名中是否有空格
 */
function isWhiteWpace (s){
	var whitespace = " \t\n\r";
	var i;
	for (i = 0; i < s.length; i++){  
	 var c = s.charAt(i);
	 if (whitespace.indexOf(c) >= 0) {return true;}
	}
	return false;
}

/*
 * 用途：检查输入字符串是否只由英文字母和数字组成 输入： s：字符串 返回： 如果通过验证返回true,否则返回false
 * 
 */ 
function isNumberOrLetter( s ){// 判断是否是数字或字母
	var regu = "^[0-9a-zA-Z]+$"; 
	var re = new RegExp(regu); 
	if (re.test(s)) { 
		return true; 
	}else{ 
		return false; 
	} 
} 


/**
 * 获取当前时间
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
    	hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
    	minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
    	seconds = "0" + seconds;
    }
    
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hours + seperator2 + minutes
            + seperator2 + seconds;
    return currentdate;
}

/**
 * 拼文件路径2
 */
function fnChangeUrl2(url) {
	url = basePath + url;
	return url;
}

/**
 * 保留两位小数 y=1、不四舍五入 y=2、四舍五入 y=3、向上取整
 */
function changeTwoDecimal_f(x, y) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    var f_x = 0;
    switch (y) {
		case 1:
			f_x = Math.floor(x * 100) / 100;
			break;
		case 2:
			f_x = Math.round(x * 100) / 100;
			break;
		case 3:
			f_x = Math.ceil(x * 100) / 100;
			break;
    }
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

/**
 * 选中radio的值 name 复选框的name value 选中的value值
 */
function fnCheckRadio(name,value){
	$("input[name='"+name+"']").each(function(){
		if($(this).val()==value){
			$(this).iCheck("check");
		}
	});
}

function stripscript(thiss){
	var s = $(thiss).val();
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
	var rs = ""; 
	for (var i = 0; i < s.length; i++) { 
		rs = rs+s.substr(i, 1).replace(pattern, ''); 
	} 
	return rs; 
}

/**
 * 将日期 转换为字符串  格式：YYYY-MM-DD HH24:MI
 */
function dateToStringNoSs(date){
	if(date != null){
		date = this.strToDate(date);
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
	  
	    var dateTime = year+"-"+month + "-" + day + " "+ hour+":"+minutes;
	    return dateTime;
	}else{
		return null;
	}
	
}


function strToDate(str) {
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





