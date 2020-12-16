
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
        var recordHtml = '';
        c.get(  SERVER_URL  + 'deal/getTodayRecord').then( result => {
            if(result.code != 1) return c.msg(result.msg);
            var statistic = result.data.statistic;
            var totalItems_1 = statistic.totalItems_1 ? statistic.totalItems_1 :'0';
            var totalAmount_1 = statistic.totalAmount_1 ? statistic.totalAmount_1 :'0.00';
            var totalItems_2 = statistic.totalItems_2 ? statistic.totalItems_2 :'0';
            var totalAmount_2 = statistic.totalAmount_2 ? statistic.totalAmount_2 :'0.00';
            var header =`<li>今日累计充值<span class="amt">￥` + totalAmount_1 +`</span>(` + totalItems_1 + `笔)</li>
                            <li>今日累计消费<span amt class="amt">￥` + totalAmount_2 +`</span>(` + totalItems_2 + `笔)</li>`;
            $('.per_info ul').html(header);
            var array = result.data.trans || [];
            array.forEach(element => {
                recordHtml += `
                <div class="repay_histList " >
                    <div class="repay_histList_title">
                        <h3><span>${element.mobile}</span>（${element.userId}）</h3>
                    </div>
					<div class="reContent repay_histListCont repay_histListCont1">
                        <ul>
                            <li>`;
                            if(1 == element.transType){
                                recordHtml += `<span class="green_p">充值</span>
                                	<span class="amt amt1">+¥${element.amountFmt}</span>`;
                            }
                            if(2 == element.transType){
                                recordHtml += `<span  class="red_p">${element.productName}</span>
                                <span class="amt amt1">-¥${element.amountFmt}</span>`;
                                
                            }
                            
                            recordHtml += ` </li> 
                        </ul>
					</div>
					<div class="botm">
				
                        <span>${element.timeFmt}</span>
                      
						<span class="right">&emsp;</span>
					</div>
				</div>
                `
            });
            $('.mescroll').prepend(recordHtml);
        });
        
    });
})()