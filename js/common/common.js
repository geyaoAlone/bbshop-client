(function(root,model) {
	if(typeof root.define === 'function' && root.define.amd ) {
		define( ['jquery'] , model)
	} else {
		typeof model == 'function' && model();
	}
})(this, function() {
   
    
    var getParams = function(name) {
		 // 获取url中"?"符后的字串 
		 var url = window.location.search,   
		 	 reqMap = { };    
		 
		 if (url.indexOf("?") != -1) {     
		      var str = url.substr(1);     
		      strs = str.split("&");     
		      for(var i = 0; i < strs.length; i ++) {     
		    	  reqMap[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);   
		      }     
	     }   
		 
		 return name in reqMap ?  reqMap[name]: typeof name === 'undefined' ? reqMap : null ;     
	}
    
	$(function() {
		// 设置 ajax 请求不缓存  
		$.ajaxSetup({ cache: false }) ;
	    
	});
	if(!String.prototype.starWidth) {
		String.prototype.startWith=function(str){     
			  var reg=new RegExp("^"+str);   
			  return reg.test(this);        
		}  
	}

	if (!String.prototype.endsWith) {
		String.prototype.endsWith = function(search, this_len) {
			if (this_len === undefined || this_len > this.length) {
				this_len = this.length;
			}
			return this.substring(this_len - search.length, this_len) === search;
		};
	}
	
	
     
	$.fn.serializeJson=function(){ 
        var serializeObj = {}; 
        var array=this.serializeArray(); 
        // var str=this.serialize(); 
        $(array).each(function(){ // 遍历数组的每个元素 
                if(serializeObj[this.name]){ // 判断对象中是否已经存在 name，如果存在name 
                      if($.isArray(serializeObj[this.name])){ 
                             serializeObj[this.name].push(this.value);  
                      }else{ 
                              //
                              serializeObj[this.name]=[serializeObj[this.name],this.value]; 
                      } 
                }else{ 
                        serializeObj[this.name]=this.value; // 如果元素name不存在，添加一个属性 name:value 
                } 
        }); 
        return serializeObj; 
	}
	
	
	//sessionStorage.Authorization = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1NTU2NTMyOTksInN1YiI6IntcImFnZW50SWRcIjpcIkdleWFvXCIsXCJvZW1JZFwiOlwib2VtMDAxXCJ9IiwiY3JlYXRlZCI6MTU1NTM5NDA5OTk5MX0.Xc1j7I9G_OVNytpI5MXVhqANEWU0dcrptgjIWDpfcy7qLbGeeVIcNOeRNa097LjTwhNrSyz0k3fdOrG7uf8atA'

	 // 服务端请求地址
	window.SERVER_URL =  PROJECT_PATH; 
	 
	 // 请求超时时间
	const REQ_TIMEOUT_SECONDS = 30000;

    var url_merch;
	var common =  {

		  // 获取浏览器标识 
		browser:function() {
			   var userAgent = navigator.userAgent.toLowerCase();
			   
			   if( userAgent.match(/Alipay/i) == "alipay" ) {
				   return  'ALIPAY';
			    }
			   
			   if( userAgent.match(/MicroMessenger/i) == "micromessenger" ) {
			        return 'WECHAT';
			    }
			   
			   return 'OTHER';

		},
		
		countDown: 90
		,
		// 获取地址栏参数,方法参数可选
		getRequest:function(name) {
			return getParams(name);
		},
		link( page ) {
			this.wait(0.2).then( () => location.href =  CONTEXT_PATH + 'static/rsh5/' + page );
		},
		replace( page) {
			this.wait(0.2).then( () => location.replace(   CONTEXT_PATH + 'static/rsh5/' + page ));
		},
         // 延迟执行带遮罩层 ，
         wait:function(second , msg) {
        	var waitFn = function(second ) {
        		 var dfd = $.Deferred();
        		 
        		 require( ['layermobile'] , layer =>{
           			// 遮罩
       			    var layr =  layer.open({ type: 2,time:second});
            		setTimeout( () =>  dfd.resolve() , second * 1000);
        			 
        		 });
        		 return dfd.promise();
        	}
        		
        	return $.when(waitFn(second));
        	
         },
         
         // 带遮罩层的POST异步请求方法 complete 回调之后会关闭遮罩
         post: function(url , param, callback ) {
        	 var dfd = $.Deferred();

        	 require( ['layermobile'] , layer =>{
          			// 遮罩
      			    var layr =  layer.open({ type: 2,time:9999, content: '加载中' ,shadeClose: false});
         			
         			 $.ajax({

           		        type: 'POST',
           		        dataType: 'json', 
           		        timeout : REQ_TIMEOUT_SECONDS,
           		        url: url,
           		        data: param ,
           		        //contentType: 'application/json',
           		        headers: {'Authorization': sessionStorage.Authorization },
           		        success: function(res) {
           		        	typeof callback === 'function' && callback(res);
           		        	try {dfd.resolve(res) }catch(e){ console.error(e) }
           		        },
           		        error:function(res){
           		        	dfd.reject(res);
           		        },
           		        complete:(xhr,status) => {
           		        	try{
           		        		let result  = JSON.parse(xhr.responseText);
               		        	
             		        	if( +result.code === -1)
             		        		return  this.replace( 'error.html?code='+ result.message);
                                if( +result.code === 3)
                                    return  this.replace( 'login.html?merchNo='+ sessionStorage.getItem("merchNo"));
               		        	 if(xhr.getResponseHeader("authorization")) 
               		        		 sessionStorage.Authorization = xhr.getResponseHeader("authorization");
               		        	
               		        	 if( status == 'timeout')
               		        	    this.msg('请求超时');
           		        	}finally{
           		        		layer.close(layr);
           		        	}
           		        	
           		        }

           		    });
         			
        		 })

    		 return dfd.promise();
         },
         msg : function( msg = '' ) {
        	 require(['layermobile' ], layer => {
        		 layer.open({
        			    content: msg
        			    ,zIndex:100
        			    ,skin: 'msg'
        			    ,time: 5 //2秒后自动关闭
        		});
        	 })
         },
         get: function( url  ) {
        	 var dfd = $.Deferred();

        	 require( ['layermobile'] , layer =>{
             		// 遮罩
         			var layr =  layer.open({ type: 2,time:9999,content: '加载中' ,shadeClose: false});
         			
         			$.ajax({

         		        type: 'GET',
         		        dataType: 'json',
         		        url: url,
         		        timeout : REQ_TIMEOUT_SECONDS,
         		        headers: {'Authorization': sessionStorage.Authorization},
         		        success: function(res) {
         		        	typeof callback === 'function' && callback(res);
             				try {dfd.resolve(res) }catch(e){ console.error(e) }
         		        },
         		        error:function(res){
         		        	dfd.reject(res);
         		        },
         		        complete:(xhr ,status) => {
         		        	try{
           		        		let result  = JSON.parse(xhr.responseText);
               		        	
             		        	if( +result.code === -1)
             		        		return  this.replace( 'error.html?code='+ result.message);
                                if( +result.code === 3)
                                    return  this.replace( 'login.html?merchNo='+ sessionStorage.getItem("merchNo"));

                                if(xhr.getResponseHeader("authorization"))
               		        		 sessionStorage.Authorization = xhr.getResponseHeader("authorization");
               		        	
               		        	 if( status == 'timeout')
               		        	    this.msg('请求超时');
           		        	}finally{
           		        		layer.close(layr);
           		        	}
         		        }

         		    });
         			
    		 });
    		 return dfd.promise();
         },
          
         // canvas 生成验证码； 
         createCode:function(el) {
			 //1.新建一个函数产生随机数
            function rn(min, max){
                return  parseInt(Math.random() * (max - min) + min);
            } 
            
            //2.新建一个函数产生随机颜色
            function rc(min,max){
                var r = rn(min, max);
                
                var g = rn(min, max);
                
                var b = rn(min, max);
                
                return 'rgb(' + [r,g,b].join(',') + ')';
            }
            
            //3.填充背景颜色,颜色要浅一点
            var w = 120,
                h = 40,
                pool = "ABCDEFGHIJKLIMNOPQRSTUVWSYZ1234567890",
            	c1 = $(el)[0],
                ctx = c1.getContext("2d"),
                obj = { code: ''};
            
            ctx.fillStyle=rc(180,230);
            ctx.fillRect(0,0,w,h);
            
            //4.随机产生字符串
            function create() {
            	var code = '';
            	 ctx.clearRect(0, 0, w, h);  
            	 ctx.fillStyle = rc(180, 230);
                 ctx.fillRect(0,0,w,h);
            	for(var i= 0;i < 4;i++){
            		//随机的字
                    var c = pool[rn(0, pool.length)];
                    
                    //字体的大小
                    var fs=rn(18,40);
                    
                    //字体的旋转角度
                    var deg=rn(-30,30);
                    ctx.font  =  fs+'px Simhei';
                    ctx.textBaseline = "top";
                    ctx.fillStyle = rc(80, 150);
                    ctx.save();
                    ctx.translate(30 * i + 15, 15);
                    ctx.rotate(deg * Math.PI / 180);
                    ctx.fillText(c,-15 + 5, -15);
                    ctx.restore();
                    code  =  code + c;
                }
            	
                //5.随机产生5条干扰线,干扰线的颜色要浅一点
                for(var i = 0;i < 5; i++){
                    ctx.beginPath();
                    ctx.moveTo(rn(0,w),rn(0,h));
                    ctx.lineTo(rn(0,w),rn(0,h));
                    ctx.strokeStyle = rc(180,230);
                    ctx.closePath();
                    ctx.stroke();
                }
                
                //6.随机产生40个干扰的小点
                for(var i = 0; i < 40; i++){
                    ctx.beginPath();
                    ctx.arc(rn(0,w),rn(0,h),1,0,2*Math.PI);
                    ctx.closePath();
                    ctx.fillStyle = rc(150,200);
                    ctx.fill();
                }
                
                return code;
            }
            
            // 点击更换验证码 
            $(c1).click(function() {
            	obj.code = create();
            });
            obj.code = create();
            return obj;
         },
         amountFormat:function(amount) {
        	if(amount.indexOf(",") != -1){
        		return amount;
        	}
 		    amount = parseFloat((amount + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";  
 		    var l = amount.split(".")[0].split("").reverse(), r = amount.split(".")[1];  
 		    t = "";  
 		    for (i = 0; i < l.length; i++) {  
 		        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
 		    }  
 		    return t.split("").reverse().join("") + "." + r;  
 		},
 		
 		//验证身份证号码
 	    checkIdcard:function (val) {
 	      	if(val.length == 15){//验证15位身份证号，简单验证
 	        	if(/^\d{15}$/.test(val)){
 	            	return true;
 	            } else {
 	            	return false;
 	            }
 	        }
 	      
 	        function checkCode(val) {//验证18位身份证号的数据格式 前6位为地区码，其中第1位是1-9的数字；2到6位是0-9的数字；年份前2位为18、19或20，后2位为数字即可；月份为(0[1-9])|(1[0-2])；日为(([0-2][1-9])|10|20|30|31)；最后4位为\d{3}[0-9Xx]
	 	        var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	 	        var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
	 	        var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
	 	        var code = val.substring(17);
	 	        if(p.test(val)) {
	 	            var sum = 0;
	 	            for(var i=0;i<17;i++) {
	 	                sum += val[i]*factor[i];
	 	            }
	 	            if(parity[sum % 11] == code.toUpperCase()) {
	 	                return true;
	 	            }
	 	        }
	 	        return false;
	 	    }
		    function checkDate(val) {//验证日期是否合法，比如xxxx年2月31日
		        var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
		        if(pattern.test(val)) {
		            var year = val.substring(0, 4);
		            var month = val.substring(4, 6);
		            var date = val.substring(6, 8);
		            var date2 = new Date(year+"-"+month+"-"+date);
		            if(date2 && date2.getMonth() == (parseInt(month) - 1)) {
		                return true;
		            }
		        }
		        return false;
		    }
	 	    function checkProv(val) {//验证前2位省级地址码是否有效
	 	        var pattern = /^[1-9][0-9]/;
	 	        var provs = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门"};
	 	        if(pattern.test(val)) {
	 	            if(provs[val]) {
	 	                return true;
	 	            }
	 	        }
	 	        return false;
	 	    }
 	    
 	        if(checkCode(val)) {
 	            var date = val.substring(6,14);
 	            if(checkDate(date)) {
 	                if(checkProv(val.substring(0,2))) {
 	                    return true;
 	                }
 	            }
 	        }
 	        return false;
 	    },
 		
 		// 分转圆
 		f2y : function( amount) {
 			amount = +amount + '';
 			
 			if( isNaN(amount))
 				throw new Error('金额格式错误');
 			
 			if( +amount === 0 )
 				return '0.00';
 			
 			if( /^(\d)(\.)(\d+)$/.test(amount) )  // example: x.xx..
 				return amount.replace(/(\d)(\.)(\d+)/,'0.0$1$3');
 			
 			if( /^(\d2)(\.)(\d+)$/.test(amount) )   // example: xx.xx..
 				return amount.replace(/(\d{2})(\.)(\d+)/,'0.$1$3');
 		
 			if( /^(\d{3,})(\.)(\d+)$/.test(amount) )// example: xxx.xx..
 				return amount.replace(/(\d{2})(\.)/,'$2$1')
 		    
 		    if( /^\d$/.test(amount))				// example x	
 		    	return amount.replace(/(\d)/,'0.0$1');
 			
 			if( /^\d{2}$/.test(amount))				// example xx	
  		    	return amount.replace(/(\d{2})/,'0.$1');
 			 
 			if( /^\d{3,}$/.test(amount))				// example xxx..	
  		    	return amount.replace(/(\d{2})$/,'.$1');
 			
 		},
		yuan2Fen(arg1){
			return this.accMul(arg1,100);
		},
 	    // 加法
 	    accAdd (arg1,arg2){
 	        var r1,r2,m;
 	        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
 	        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
 	        m=Math.pow(10,Math.max(r1,r2))
 	        return (arg1*m+arg2*m)/m
 	    },

 	    // 减法
 	    accSub (arg1,arg2){
 	        var r1,r2,m,n;
 	        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
 	        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
 	        m=Math.pow(10,Math.max(r1,r2));
 	        n=(r1>=r2)?r1:r2;
 	        return ((arg1*m-arg2*m)/m).toFixed(n);
 	    },

 	    // 乘法
 	    accMul(arg1,arg2) {
 	        var m=0,s1=arg1.toString(),s2=arg2.toString();
 	        try{m+=s1.split(".")[1].length}catch(e){}
 	        try{m+=s2.split(".")[1].length}catch(e){}
 	        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
 	    },
 	    
 	    
 	    //短信验证码倒计时存储获取
 	    checkTimeRemaining(key){
 	    	console.info('get key:' + key)
 	    	let startTimestamp = sessionStorage.getItem(key + '_countdown');
 	    	console.info('get stamp:' + startTimestamp)
 	    	if(startTimestamp){
 	 	    	const now = Date.now(),//现在时间;
 	    		usedTime = Math.floor((now - startTimestamp)/1000);
 	    		console.info('pass:' + usedTime + 's');
 	    		
 	    		var timeRemaining = 0;
				if(usedTime < common.countDown){
					timeRemaining = common.countDown - usedTime;
				}else{
					sessionStorage.removeItem(key + '_countdown');
			    	sessionStorage.removeItem(key + "_data");
					console.info('timeout...');
				}
				return timeRemaining;
 	    	}else{
 	    		return 0;
 	    	}
 	    },
 	    saveTimeRemaining(key,data){
 	    	const now = Date.now();//现在时间;
	    	sessionStorage.setItem(key + "_countdown",now);
	    	if(data) sessionStorage.setItem(key + "_data",JSON.stringify(data));
	    	console.info('save stamp：' + now);
 	    },
 	    removeTimeRemaining(key){
 	    	sessionStorage.removeItem(key + "_countdown");
 	    	sessionStorage.removeItem(key + "_data");
 	    	console.info('delete...');
 	    },
 	    getTimeRemainingData(key){
 	    	var data = sessionStorage.getItem(key + "_data");
 	    	if(data){
 	    		return JSON.parse(data);
 	    	}
 	    	return {};
 	    },
 	   dateFormat(fmt, str) {
 	    	var dateStr = "";
 	    	if(str.length == 14){
 	    		dateStr = str.substring(0,4) +"/" + str.substring(4,6)+"/"
 	    		+ str.substring(6,8)+ " " +  str.substring(8,10)+":"+ str.substring(10,12)+":"+str.substring(12,14)
 	    	}else{
 	    		alert('日期格式不对')
 	    		return;
 	    	}
 	    	var date = new Date(dateStr);
 	       let ret;
 	       const opt = {
 	           "Y+": date.getFullYear().toString(),        // 年
 	           "m+": (date.getMonth() + 1).toString(),     // 月
 	           "d+": date.getDate().toString(),            // 日
 	           "H+": date.getHours().toString(),           // 时
 	           "M+": date.getMinutes().toString(),         // 分
 	           "S+": date.getSeconds().toString()          // 秒
 	           // 有其他格式化字符需求可以继续添加，必须转化成字符串
 	       };
 	       for (let k in opt) {
 	           ret = new RegExp("(" + k + ")").exec(fmt);
 	           if (ret) {
 	               fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
 	           };
 	       };
 	       return fmt;
 	   },
        //获取当前时间 yyyyMMdd
        getNowFormatDateDay(){
            let date = new Date();

            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            let currentdate = date.getFullYear()  + month + strDate;
            return currentdate;
        },
        //获取两个日期相差几天
        dateDifference(sDate1, sDate2) {    //sDate1和sDate2是20061218格式
            let dateSpan,
                iDays;
            sDate1 = sDate1.substr(0,4)+"/"+sDate1.substr(4,2)+"/"+sDate1.substr(6,2);
            sDate2 = sDate2.substr(0,4)+"/"+sDate2.substr(4,2)+"/"+sDate2.substr(6,2);
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
        },
        nextMonth(){
            let now = new Date();
            let month = now.getMonth()+1;
            let year  = now.getFullYear();
            if ( month === 12 ) {
                year += 1;
                month = '01';
            } else {
                month += 1;
                month = (month < 10) ? '0'+month : month;
            }

            return `${year}${month}`

        }
 	   
	}
	return common;
});
