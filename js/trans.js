
( () => {
	require(['common','mobileSelector'] ,(c , MobileSelect ) => {
        var s = localStorage.getItem("user");
       
        if(s){
           var user = JSON.parse(s);
           if(!user && user.role != '99'){
                c.msg('抱歉！您无权操做');
                c.link ('firstPage.html');
           }
        }

        $('.step2_topLeft').click(e => c.link('firstPage.html'));
        

        c.get(  SERVER_URL  + 'deal/transPageData?type=2').then( result => {
            if(result.code != 1) return c.msg(result.msg);
            var mobileSelect1 = new MobileSelect({
                trigger: '#trigger1',
                title: 'VIP会员选择',
                wheels: [
                            {data: result.strList}
                        ],
                position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                transitionEnd:function(indexArr, data){
                    console.log(data);
                },
                callback:function(indexArr, data){
                    console.log(result.userInfo[data[0]])
                    $('[balance]').text(result.userInfo[data[0]]);
                    
                    
                }
            });

            var mobileSelect2 = new MobileSelect({
                trigger: '#trigger2',
                title: '消费产品选择',
                wheels: [
                            {data: result.ptrList}
                        ],
                position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                transitionEnd:function(indexArr, data){
                    console.log(data);
                },
                callback:function(indexArr, data){
                    console.log(result.userInfo[data[0]])
  
                }
            });
            
        });
		

    });
})()
