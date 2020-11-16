
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
        
        var trans = {};

        var mobileSelect0 = new MobileSelect({
            trigger: '#trigger0',
            title: '交易类型选择',
            wheels: [
                        {data:['充值','消费']}
                    ],
            position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
            transitionEnd:function(indexArr, data){
                console.log(data);
            },
            callback:function(indexArr, data){
                if('充值' == data[0]){
                    trans.transType = 1;
                }
                if('消费' == data[0]){
                    trans.transType = 2;
                    
                }
                
            }
        });
        
        c.get(  SERVER_URL  + 'deal/transPageData?type=2').then( result => {
            if(result.code != 1) return c.msg(result.msg);
            var mobileSelect1 = new MobileSelect({
                trigger: '#trigger1',
                title: 'VIP会员选择',
                wheels: [
                            {data: result.data.strList}
                        ],
                position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                transitionEnd:function(indexArr, data){
                    console.log(data);
                },
                callback:function(indexArr, data){
                    var cust = result.data.userInfo[data[0]];
                    console.log(cust)
                    $('[balance]').text(cust.balance);
                    trans.userId = cust.userId;
                    trans.mobile = cust.mobile;
                    
                }
            });
            
            var mobileSelect2 = new MobileSelect({
                trigger: '#trigger2',
                title: '消费产品选择',
                wheels: [
                            {data: result.data.productList}
                        ],
                position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                transitionEnd:function(indexArr, data){
                    console.log(data);
                },
                callback:function(indexArr, data){
                    var product = result.data.productInfo[data[0]];
                    
                    $('[amount]').val(product.productAmt);

                    trans.productId = product.id;
                    trans.productName = product.productName;//产品名
                   

  
                }
            });
            
            
        });


        $('[save-btn]').click(e => {
            trans.amount = $('[amount]').val();
            if(!trans.transType){
                return c.msg('先选择交易类型');
            }
            if(!trans.mobile || !trans.userId){
                return c.msg('先选择客户');
            }
            if(!trans.productId || !trans.productName){
                return c.msg('先选择产品');
            }
            if(!trans.amount){
                return c.msg('交易金额不能空');
            }

            c.post(  SERVER_URL  + 'deal/addTrans',trans).then( result => {
                if(result.code != 1) return c.msg(result.msg);
                if(result.data){
                     c.msg('录入交易成功');
                     setTimeout( () =>  c.link ('customer.html?mobile=' + trans.mobile) ,1000);
                }else{
                    return c.msg('录入交易失败！联系管理员');
                }
            });
        });
		

    });
})()
