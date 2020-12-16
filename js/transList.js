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
					
					<div class="reContent repay_histListCont repay_histListCont1">
                        <ul>
                            <li>`;
                            if(1 == element.transType){
                                recordHtml += `<span class="green_p">充值</span>
                                	<span class="amt">+¥${element.amountFmt}</span>`;
                            }
                            if(2 == element.transType){
                                recordHtml += `<span  class="red_p">${element.productName}</span>
                                <span class="amt">-¥${element.amountFmt}</span>`;
                                
                            }
                            
                            recordHtml += ` </li> 
                        </ul>
					</div>
					<div class="botm">
				
                        <span>${element.timeFmt}</span>
                      
						<span class="right">${element.id}</span>
					</div>
				</div>
                `
            });
            $('.withBox').prepend(recordHtml);

        });
    });

})()