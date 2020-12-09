
( () => {
	require(['common'] ,c => {
        $('.pwd_setting').hide();
        $('#cut-data').hide();
        var s = localStorage.getItem("user");
        var user = {userId:"VIP***",mobile:"13888*****8"};
        if(s){
            user = JSON.parse(s);
        }else{
            console.info(user);
        }

        c.get(  SERVER_URL  + 'deal/firstPageData').then( result => {
            if(result.code != 1) return c.msg(result.msg);
            user = result.data.user;
            var header = ``;
            //普通会员
            if(user.role == '1'){
                header +=  `<li>会员号：<span>` + user.userId + `</span></li>
                    <li>手机号：<span> ` + user.mobile + `</span></li>
                    <li>可用金额：<span>` + user.balance + `元</span></li>`;
                var recordHtml = '<div class="title"><span>▶&ensp;</span>近期充值、消费记录</div>';
                var array = result.data.trans || [];
                if(array.length > 0){
                    
                    array.forEach(element => {
                        recordHtml += `<div class="repay_histList " >
                            <div class="reContent repay_histListCont repay_histListCont1">`;
        
                            if(1 == element.transType){
                                recordHtml += `<ul>
                                    <li class='big'>
                                        <p><span style="color: red;">${1 == element.transType?'充值':'消费'}</span></p><span>￥${element.amountFmt}元</span>
                                    </li>
                                </ul>`;
                            } else {
                                recordHtml += `<ul>
                                    <li>
                                        <p>产品</p><span>${element.productName}</span>
                                    </li>
                                </ul>`;
                            }
                                
                            recordHtml += `</div>
                                <div class="repay_histListBottom repay_histListBottom1">
                                    <p>发生时间</p>
                                    <span>${element.timeFmt}</span>
                                </div>
                            </div>`;
                    });
                    
                }else{
                    recordHtml += `<p class="no_data">~暂无记录~</p>`
                }
                $('.mescroll').prepend(recordHtml);
                $('#cut-data').show();
            }

            //店家
            if(user.role == '99'){
                $('.pwd_setting').show();
                var statistic =  result.data.statistic;
                header += `<li>尊贵的店主：<span>` + user.userId + `</span></li>
                            <li>手机号：<span> ` + user.mobile + `</span></li>
                            <li>累计充值(` + statistic.totalItems_1 + `笔)：<span>` + statistic.totalAmount_1 +`元</span></li>
                            <li>累计消费(` + statistic.totalItems_2 + `笔)：<span amt>` + statistic.totalAmount_2 +`元</span></li>`;
            }
            $('.per_info ul').html(header);
        });

        $('[trans]').click(  e => c.link ('trans.html'));
        $('[today]').click(  e => c.link ('today.html'));
        $('[product]').click(  e => c.link ('product.html'));
        $('[customer]').click(  e => c.link ('customer.html'));
        $('[esc]').click(  e => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            c.link ('login.html')
        });
		
	});
})()
