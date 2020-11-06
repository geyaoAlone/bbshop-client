
( () => {
	require(['common'] ,c => {
		var token = localStorage.getItem("token");
		if(token){
			console.info(token)
			c.get(  SERVER_URL  + 'user/checkToken?token=' + token ).then( result => {
				if(result.code != 1) {
					console.info('token is past!')
					c.msg(result.msg);
					c.link ('login.html');
				}
				sessionStorage.Authorization =  'Bearer ' + token;
				console.info('token is ok!')
				c.link ('firstPage.html');
			});
		}else{
			console.info('no token!')
			c.link ('login.html');
		}
	});
})()
