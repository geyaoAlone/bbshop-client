( () => {
	require(['common','mobileSelector'] ,(c , MobileSelect ) => {
        let mobile = c.getRequest('mobile');
        var s = localStorage.getItem("user");
       
        if(s){
           var user = JSON.parse(s);
           if(!user && user.role != '99'){
                c.msg('抱歉！您无权操做');
                c.link ('firstPage.html');
           }
        }

        $('.step2_topLeft').click(e => c.link('firstPage.html'));

        if(mobile == null || mobile == 'null'){
            mobile = '';
        }

        var recordHtml = '';
        c.get(  SERVER_URL  + 'deal/transList?cMobile=' + mobile).then( result => {
            if(result.code != 1) return c.msg(result.msg);

            var array = result.data || [];
            array.forEach(element => {
                recordHtml += `
                <div class="repay_histList " >
					<div class="repay_histList_title">
                        <h3><span>${element.id} </span></h3>`;
                        if(1 == element.transType){
                            recordHtml += `<i class="label_1">充值</i>`;
                            
                        }
                        if(2 == element.transType){
                            recordHtml += `<i class="label_2">消费</i>`;
                            
                        }

					recordHtml += `</div>
					<div class="reContent repay_histListCont repay_histListCont1">
                        <ul>
                            <li>
								<p>产品信息：</p>
								<span>${element.productName}</span>
                            </li>
							<li>
								<p>交易金额：</p>
								<span class="amt">￥${element.amountFmt}元</span>
                            </li>
						</ul>
					</div>
					<div class="repay_histListBottom repay_histListBottom1">
						<p>交易时间</p>
						<span>${element.timeFmt}</span>
					</div>
				</div>
                `
            });
            $('.withBox').prepend(recordHtml);

        });
    });

})()