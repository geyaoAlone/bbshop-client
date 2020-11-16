
( () => {
	require(['common','layui'] ,c => {
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
        c.get(  SERVER_URL  + 'deal/product?type=0').then( result => {
            if(result.code != 1) return c.msg(result.msg);

            var array = result.data || [];
            array.forEach(element => {
                recordHtml += `
                <div class="repay_histList " >
					<div class="repay_histList_title">
						<h3><span>${element.productName}</span></h3>
						<i class="del"><a href="javascript:;" onclick="delPor('${element.productName}','${element.id}')">✖</a></i>
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
						<span>${element.timeFmt}</span>
					</div>
				</div>
                `
            });
            $('.withBox').prepend(recordHtml);

        });

        delPor = function(name,id){
            layer.open({
                title: [
                        '特别提醒',
                        'background-color: #FF4351; color:#fff;'
                      ],
                    content: ` 确定要废弃【`+name+`】？ `,
                btn: ['算了','确定'],
                shade: [1, '#FFFFFF'],
                skin: 'footer',
                shadeClose:false,
                yes(index){layer.close(index)},
                no(index){
                    c.get(  SERVER_URL  + 'deal/delProduct?id=' + id).then( result => {
                        if(result.code != 1) return c.msg(result.msg);

                        if(result.data){
                            c.msg('废弃成功！');
                            setTimeout( () =>  c.link('product.html'),1500);
                        }
                    });
                },
             });

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
                     c.msg('录入产品成功');
                     setTimeout( () =>  c.link ('product.html') ,1000);
                     
                }else{
                    return c.msg('录入产品失败！联系管理员');
                }
                 
            });

        });
    });
})()