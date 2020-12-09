
( () => {
	require(['common'] ,c => {
        $('[save-btn]').click(  e => {
            let {mobilePhone,verifyCode}  = $('#fm').serializeJson();
			if( !/^\d{11}$/.test(mobilePhone)) return c.msg('请填入正确的手机号');
            if(!/^\d{6}$/.test(verifyCode) ) return c.msg('请输入6位短信验证码');
			c.post(  SERVER_URL  + 'user/login',{mobile:mobilePhone,validateCode:verifyCode} ).then( result => {
                if(result.code != 1) return c.msg(result.msg);
                var data = result.data;
                var token = data.token;
                if(!token || !data.user){
                    return c.msg('授权登陆失败');
                }
                console.info(token)
                localStorage.setItem("token",token);
                localStorage.setItem("user",JSON.stringify(data.user));
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

                    var mobilePhone = $('#mobilePhone').val();
                    if(typeof mobilePhone == "undefined" || mobilePhone == null || mobilePhone == ""){
                        return c.msg('请输入手机号');
                    }
                    
                    if( !/^\d{11}$/.test(mobilePhone)) return c.msg('请填入正确的手机号');
                    c.get(SERVER_URL  + 'user/sendCode/'+mobilePhone).then( result => {
                        if(result.code != 1 || !result.data) {
                             return c.msg("短信验证码获取失败");
                        }else{
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
