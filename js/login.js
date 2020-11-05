
( () => {
	require(['common'] ,c => {
        $('[save-btn]').click(  e => {
            let {mobilePhone,verifyCode}  = $('#fm').serializeJson();
			if( !/^\d{11}$/.test(mobilePhone)) return c.msg('请填入正确的手机号');
            if(!/^\d{6}$/.test(verifyCode) ) return c.msg('请输入6位短信验证码');
			c.post(  SERVER_URL  + 'user/login',{mobile:mobilePhone,validateCode:verifyCode} ).then( result => {
                if(result.code != 1) return c.msg(result.msg);
                var token = result.token;
                if(!token){
                    return c.msg('授权登陆失败');
                }
                sessionStorage.setItem("token",token);
                sessionStorage.Authorization =  'Bearer ' + token;
                c.link ('firstPage.html');
			});
		});
        $('[getVerifyCode]').click( ( () => {
            let flag = true,
                sc = c.countDown,
                fn = function(e) {
                    e.preventDefault();
                    if(!flag)  return void 0;
                    var codeType = $('#codeType').val();
                    var mobilePhone = $('#mobilePhone').val();
                    if(typeof mobilePhone == "undefined" || mobilePhone == null || mobilePhone == ""){
                        return c.msg('请输入手机号');
                    }
                    if( !/^\d{11}$/.test(mobilePhone)  ) return c.msg('请填入正确的手机号');
                    c.post(SERVER_URL  + 'daishu/login/sendPreVerifyCode',{merchNo,utmc,mobilePhone,codeType,step:'login'}).then( result => {
                        if( +result.code != 1) {
                            if (result.message == 'sendVcode') {
                                layui.layer.open({
                                    title:['验证码','padding: 0; text-align: center;'],
                                    closeBtn :false,
                                    area:["auto","140px"],
                                    shadeClose: true,
                                    type: 2,
                                    content:SERVER_URL+'static/h5/verify_code.html?mobilePhone='+mobilePhone,
                                    anim: 'up',
                                });
                                setTimeout(function() {
                                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                                }, 100);
                                return false;
                            }
                            return c.msg(result.message);
                        }else{
                            $("#codeType").val("");
                            flag  =   false;
                            $('[getverifycode]').addClass('payfee_yzmColor');
                            let interval = setInterval( () => {
                                if( --sc === 0 ) {
                                    clearInterval( interval);
                                    flag = true;
                                    $('[getverifycode]').removeClass('payfee_yzmColor');
                                }
                                $(this).text( sc !== 0 ? sc+ 's' : '获取验证码' );
                                sc  = sc ||  c.countDown ;
                            }, 2000);
                        }
                    });

                }
            return fn;
        })() );
	});
})()
