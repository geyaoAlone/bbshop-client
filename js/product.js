
( () => {
	require(['common'] ,c => {
        var s = localStorage.getItem("user");
       
        if(s){
           var user = JSON.parse(s);
           if(!user && user.role != '99'){
                c.msg('抱歉！您无权操做');
                c.link ('firstPage.html');
           }
        }


        $('[save-btn]').click(e => {
            var productName = $('#productName').val();
            var productAmount = $('#js_input').val();
            if(!productName){
                return c.msg('产品名不能为空');
            }

            if(!productAmount){
                return c.msg('产品金额不能为空');
            }

            c.post(  SERVER_URL  + 'deal/addProduct',{productName:productName,productAmt:productAmount,productType:'2'}).then( result => {
                if(result.code != 1) return c.msg(result.msg);
                if(result.data){
                    return c.msg('录入产品成功');
                }else{
                    return c.msg('录入产品失败！联系管理员');
                }
                 

            });

        });
    });
})()