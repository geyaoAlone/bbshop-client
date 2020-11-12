
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
        c.get(  SERVER_URL  + 'deal/userInfo').then( result => {
            if(result.code != 1) return c.msg(result.msg);

            var array = result.data || [];
            array.forEach(element => {
                recordHtml += `
                <div class="repay_histList " >
					<div class="repay_histList_title">
						<h3><span>${element.productName}</span></h3>
						<i><a href="">废弃</a></i>
					</div>
					<div class="reContent repay_histListCont repay_histListCont1">
						<ul>
							<li>
								<p>金额</p>
								<span>￥${element.productAmt}元</span>
							</li>
						</ul>
					</div>
					<div class="repay_histListBottom repay_histListBottom1">
						<p>创建时间</p>
						<span>${element.createTime}</span>
					</div>
				</div>
                `
            });
            $('.withBox').prepend(recordHtml);

        });
    });
})()