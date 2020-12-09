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
            console.info(array)
            array.forEach(element => {
                recordHtml += `
                <div class="repay_histList " >
					<div class="repay_histList_title">
                        <h3>`;
                        if(1 == element.transType){
                            recordHtml += `<p class="green_p">充值</p>`;
                            
                        }
                        if(2 == element.transType){
                            recordHtml += `<p  class="red_p">购买（${element.productName}）</p>`;
                            
                        }

					recordHtml += `</h3></div>
					<div class="reContent repay_histListCont repay_histListCont1">
                        <ul>
                            <li>
								<span class="amt">￥${element.amountFmt}元</span>
                            </li> 
                        </ul>
					</div>
					<div class="repay_histListBottom repay_histListBottom1">
						<p></p>
                        <span>${element.timeFmt}</span>
                        <p></p>
						<span>${element.id}</span>
					</div>
				</div>
                `
            });
            $('.withBox').prepend(recordHtml);

        });
    });

})()