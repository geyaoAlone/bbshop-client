
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
            var header =`<li>累计充值(` + result.data.statistic.totalItems_1 + `笔)：<span>` + result.data.statistic.totalAmount_1 +`元</span></li>
                            <li>累计消费(` + result.data.statistic.totalItems_2 + `笔)：<span amt>` + result.data.statistic.totalAmount_2 +`元</span></li>`;
            $('.per_info ul').html(header);
            var array = result.data.trans || [];
            array.forEach(element => {
                recordHtml += `<div class="repay_histList " >
                    <div class="repay_histList_title">
                        <h3><span>${element.mobile}</span>（${element.userId}）</h3>
                        <i><span style="color: red;">${1 == element.transType?'充值':'消费'}</span></i>
                    </div>
                    <div class="reContent repay_histListCont repay_histListCont1">`;

                    if(1 == element.transType){
                        recordHtml += `<ul>
                            <li>
                                <p>充值金额</p><span>￥${element.amountFmt}元</span>
                            </li>
                        </ul>`;
                    } else {
                        recordHtml += `<ul>
                            <li>
                                <p>消费产品</p><span>${element.productName}</span>
                            </li>
                            <li>
                                <p>消费金额</p><span>￥${element.amountFmt}元</span>
                            </li>
                        </ul>`;
                    }
                        
                    recordHtml += `</div>
                        <div class="repay_histListBottom repay_histListBottom1">
                            <p>交易时间</p>
                            <span>${element.timeFmt}</span>
                        </div>
                    </div>`;
            });
            $('.mescroll').prepend(recordHtml);
        });
        
    });
})()