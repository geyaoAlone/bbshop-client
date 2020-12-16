
( () => {
	require(['common'] ,c => {
        $('.step2_topLeft').click(e => c.link('firstPage.html'));
        var s = localStorage.getItem("user");
       
        if(s){
           var user = JSON.parse(s);
           if(!user && user.role != '99'){
                c.msg('抱歉！您无权操做');
                c.link ('firstPage.html');
           }
        }
        let mobile = c.getRequest('mobile');
        if(mobile == null || mobile == 'null'){
            mobile = '';
        }
        var recordHtml = '';
        c.get(  SERVER_URL  + 'deal/userInfo?cMobile=' + mobile).then( result => {
            if(result.code != 1) return c.msg(result.msg);

            var array = result.data || [];
            array.forEach(element => {
                recordHtml += `
                <div class="repay_histList " >
					<div class="repay_histList_title">
						<h3><span>${element.mobile}</span>（${element.userId}）</h3>
						<i><a href="javascript:;" onclick="detail('${element.mobile}')">详情>></a></i>
					</div>
					<div class="reContent repay_histListCont repay_histListCont1">
						<ul>
							<li>
								<p>剩余金额：</p>
								<span class="amt">￥${element.balanceFmt}</span>
                            </li>
                            <li>
								<p>历史充值：</p>
								<span class="amt">￥${element.statistic.totalAmount_1}</span>(${element.statistic.totalItems_1}笔)
                            </li>
                            <li>
								<p>历史消费：</p>
								<span class="amt">￥${element.statistic.totalAmount_2}</span>(${element.statistic.totalItems_2}笔)
							</li>
						</ul>
					</div>
					<div class="repay_histListBottom repay_histListBottom1">
						
						<span><p>最后一次交易时间</p>${element.timeFmt}</span>
					</div>
				</div>
                `
            });
            $('.withBox').prepend(recordHtml);

        });


        detail = function(mobile){
            c.link ('transList.html?mobile='+ mobile);
        }
    });
})()