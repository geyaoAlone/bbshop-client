
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
                    var balance = c.amountFormat((user.balance).toString());
                    header += `<li >欢迎会员&nbsp;<span>` + user.mobile + `</span>~</li>`;
                    $('.max_info ul').html(`<li>您的会员号：<span>` + user.userId +`</span></li>
                    <li>您的充值余额：<span class="amt" amt>￥` + balance +`</span></li>
                  `);
                    $('.welcome').html(header);
                var recordHtml = '<div class="title"><span>▶&ensp;</span>近期充值、消费记录</div>';
                var array = result.data.trans || [];
                if(array.length > 0){
                    
                    array.forEach(element => {
                        recordHtml += `<div class="repay_histList " >
                            <div class="reContent repay_histListCont repay_histListCont1">`;
        
                        
                                recordHtml += `<ul>
                                    <li class='big'>
                                        <p><span class=${1 == element.transType?'green_p':'red_p'}>${1 == element.transType?'充值':element.productName}</span></p><span class="amt">${1 == element.transType?'+':'-'}￥${element.amountFmt}元</span>
                                    </li>
                                </ul>
                                </div>
                                <div class="repay_histListBottom repay_histListBottom1">
                                    <p></p>
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
                $('.title_namme').text('店主管理中心')
                $('.pwd_setting').show();
                var statistic =  result.data.statistic;
                header += `<li>欢迎店主&nbsp;<span>` + user.userId + `</span>~</li>`;
                $('.max_info ul').html(`<li>会员累计充值&nbsp;<span class="amt">￥` + statistic.totalAmount_1 +`</span>(` + statistic.totalItems_1 + `笔)</li>
                <li>会员累计消费&nbsp;<span class="amt" amt>￥` + statistic.totalAmount_2 +`</span>(` + statistic.totalItems_2 + `笔)</li>
              `);
              $('.welcome').html(header);
            }
            
      
  
            
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
