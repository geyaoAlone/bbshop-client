
( () => {
	require(['common'] ,c => {
		var token = sessionStorage.getItem("token");
		if(token){
			c.get(  SERVER_URL  + 'user/checkToken?token=' + token ).then( result => {
				if(result.code != 1) {
					c.msg(result.msg);
					c.link ('login.html');
				}
				sessionStorage.Authorization =  'Bearer ' + token;
				c.link ('firstPage.html');
			});
		}else{
			c.link ('login.html');
		}
	});
})()
