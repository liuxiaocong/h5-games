/**
 * dependency : PkApi.js
 */

var gameClient = (function () {

    var init = function(appApi){
        pkAppAgent.init(appApi);
    };
	
    /*
     communicate with server: game server, log server
    */
    var gameAgent = (function(){
        var endPoint = 'http://front.pkh5.moranger.com:8989/game-end-point'; 	//need to remove
        var stompClient;
        var socket;
        var completeCallback;
        var pkid;
        var gameid;
        var pi;
        var init = function(pk_id, game_id, pi_id){
            pkid = pk_id;
            gameid = game_id;
            pi = pi_id;
            socket = new SockJS(endPoint);
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function(frame) {
                stompClient.subscribe('/topic/game/task/'+pkid, function(message){
                    task = JSON.parse(message.body);
	
					gameInfos(message.body);
					
                    setInterval(function(){
                        heartbeat();
                    }, parseInt(task.healthCheckPeriod)*1000);
                });
				
                stompClient.subscribe('/topic/game/complete/'+pkid, function(message){
                    if(completeCallback){
                       completeCallback(JSON.parse(message.body));
						//alert(message.body);
                    }
                });
				
                stompClient.send("/app/game/connect",{}, JSON.stringify({'pkid': pkid,'gameid': gameid,'pi':pi }));

            });
        };

        /**
         * @param date - as '2014-12-20'
         * @param score - score or stage number
         * @param successful_callback - a function to handle return, return object is as {'isSuccessful':'true', 'reason':null}
         */
        var complete  =function (date, score, successful_callback){
            stompClient.send("/app/game/complete", {}, JSON.stringify({ 'pkid': pkid, 'gameid': gameid, 'pi':pi, 'date':date, 'score':score }));
            completeCallback = successful_callback;
            //completeCallback({'isSuccessful':'true', 'reason':null});
        };

        /*
         logClient : 统计数据
         type:
         '0' - gameOverLatency [time(sec) of game start to game over] value is required seconds
         '1' - gamePassLatency [time(sec) of game start to game passaward] value is required seconds
         '2' - gameToEvent [redirect to activity page] value is optional
         '3' - gameContinue [press Continue button] value is optional
         */
        var logClient = function(type, value){
			
           if (task.allowToLogUser === 'false'){  //todo: check network
               return;
           }
		   
           stompClient.send("/app/game/log", {}, JSON.stringify({ 'pkid': pkid, 'gameid': gameid, 'pi':pi, 'type':type, 'value':value }));
		   
	   };

        /**
         * heartbeat: let server know I'm still connected
         */
       var heartbeat = function(){
           stompClient.send("/app/game/heartbeat", {}, JSON.stringify({ 'pkid': pkid }));
       };
		
	var	gameInfos = function(mess){
		//alert(mess);
		 //var b = new Base64();
		localStorage.setItem('mess',base_encode().encode(mess));
	}
	
    return {
       init: init,
       complete : complete,
       logClient : logClient
	};
	
	})();

    /*
     communicate with app
     */
    var pkAppAgent = (function(){
        var app;

        var init = function(appApi){
            app = appApi;
            //appInfo = {
            //    gameid: '10001573',
            //    pi: 'p93981',
            //    pkid : '100001',
            //    version : '1.0.141103'
            //};
            appInfo = {
                gameid: app.getSessionData('game_id'),
                pi: app.getSessionData('pi'),
                pkid : app.getSessionData('user_id'),
                version : app.getSessionData('app_version_name')
            };

            app.sendGameApiReq({}, function(object){
                if(!object.game_api_err_msg){
                    gameAgent.init(object.endPoint, appInfo.pkid, appInfo.gameid, appInfo.pi);
                }
            });
        }

        /**
         * @callback ({type: number})
         * type -
         *      0：没有网络
         *      1：WIFI
         *      2：2G
         *      3：3G
         */
        var checkNetwork = function(callback) {
            app.getNetworkType(function(result){
                callback({type : result.networkType});
            });
        }

        /**
         * 眺转
         * @param url
         */
        var redirectToActivity = function(url){
            app.openUrl(url, 1);
        }

        return {
            init : init,
            checkNetwork : checkNetwork,
            redirectToActivity : redirectToActivity
        };
    })();

    /**
    * appInfo =
    * {
    *    gameid: '10001573',
    *    pi: 'p93981',
    *    pkid : '100001',
    *    version : '1.0.141103'
    *};
    */
    var appInfo;

    /**
     * task = {
     *    isEnable : 'true',
     *    isCompleted : 'false',
     *    requireScore : '10',
     *    amount : '4',
     *    userTotalAmount : '14',
     *    minVersion : 'v30',
     *    allowToLogUser : 'false',
     *    healthCheckPeriod : '5'
     * }
     */
    var task;
	var thisUrl = 'http://pkleyou.cn/'; 
		
	var timer = function () {
		var now = new Date();
		var year = now.getFullYear(); //年
		var month = now.getMonth() + 1; //月
		var day = now.getDate(); //日
		
		var hh = now.getHours(); //时
		var mm = now.getMinutes(); //分
		
		var clock = year + "-";
		
		if (month < 10)
			clock += "0";
		
		clock += month + "-";
		
		if (day < 10)
			clock += "0";
		
		clock += day + " ";
		
		if (hh < 10)
			clock += "0";
		
		clock += hh + ":";
		if (mm < 10)
			clock += '0';
		clock += mm;
		return clock;
	}
		
	var timerChuo = function(){
		var nowTime = new Date().getTime();
		return nowTime;
	} 
	
	var jianTime = function(){
		var startTime = localStorage.getItem('startTime',timerChuo());
		var newTime = (timerChuo()-startTime)/1000;
		return(newTime);
	}
	
	var base_encode = function(){
		var b = new Base64(); 
		return b;
	}
	
    //game logic
    /*
     updateScore : 分数变化时调用  
     */
    var updateScore = function (score){
			var game_id = demoApi.getSessionData().game_id;
			var pi = demoApi.getSessionData().pi;
			var pkid = demoApi.getSessionData().pkid;
			var netWorkStyle = parseInt(demoApi.getNetworkType().networkType);
		
			if(netWorkStyle == 1 || netWorkStyle == 2 || netWorkStyle == 3){
				var locals = localStorage.getItem('mess');
				//var b = new Base64();  
				var localss = base_encode().decode(locals);
				//alert(localss);
				var taskVal = eval('('+localss+')');
					
				if (taskVal.isEnable == 'true') {
				//var b = new Base64(); 
				var vals = localStorage.getItem('bestScore');
				//var vals = b.decode(vals);
				
				if(vals >= parseInt(taskVal.requireScore) || score >= parseInt(taskVal.requireScore)){
					if (vals == undefined || vals == ''){
						gameAgent.complete(timer(), score, function(object){
							console.log(JSON.stringify(object));
							var obj =  eval('('+JSON.stringify(object)+')');
							if(obj.isSuccessful == 'true'){
								createObj(obj.isSuccessful,taskVal.amount);
								//alert('111');
								
								gameAgent.logClient('1', jianTime());
								
								localStorage.setItem('updateTime',jianTime());

							}else{
								console.log('error');
							}
						});
						
					}else{
						gameAgent.complete(timer(), vals, function(object){
							console.log(JSON.stringify(object));
							var obj =  eval('('+JSON.stringify(object)+')');
							if(obj.isSuccessful == 'false'){
								createObj(obj.isSuccessful,taskVal.amount);
								gameAgent.logClient('0', jianTime());
							}else{
								console.log('error');
							}
						});
						localStorage.removeItem('bestScore');
					}
				}else{
					console.log('分数没有达到要求！');
					return false;
				}
				
				} else {
					alert('没有开启！');
					return false;
				}
				
			} else {
				localStorage.setItem('bestScore',score);
			}
    }

    /*
     gameStart : 游戏开始是调用
     */
    var gameStart = function (){
		var game_id = demoApi.getSessionData().game_id;
		var pi = demoApi.getSessionData().pi;
		var pkid = demoApi.getSessionData().pkid;
		var netWorkStyle = parseInt(demoApi.getNetworkType().networkType);
		//var localVal = localStorage.getItem('mess');
		//var taskVal = eval('('+localVal+')');
			
		var pkids = [];
		var ips = [];
		var bollenVal = [];
		pkids.push(pkid);
		ips.push(pi);
		
		//if (taskVal.isEnable == 'true') {
			if(netWorkStyle == 1 || netWorkStyle == 2 ||  netWorkStyle == 3){
				if (pkid != '' && game_id != '') {
					var nary = pkids.sort();
					var ipss = ips.sort();
					for (var i = 0; i < pkids.length; i++) {
						if (nary[i] == nary[i + 1]) {
							//alert('已经有重复的pkid');
							bollenVal.push('false');
							return false;
						} else {
							bollenVal.push('true');
						}
					}
					for (var i = 0; i < ips.length; i++) {
						if (ipss[i] == ipss[i + 1]) {
							//alert('已经有重复的IP');
							bollenVal.push('false');
							return false;
						} else {
							bollenVal.push('true');
						}
					}
					
					var ind = bollenVal.indexOf('false');
					if (ind > -1) {
						alert('重复用户！');
						return false;
					} else {
						console.log(demoApi.getSessionData());
						//执行init();
						gameAgent.init(pkid,game_id,pi);
						localStorage.setItem('startTime',timerChuo());
					}
					
				}else{
					alert('不存在ID号');
					return false;
				}
				
			} else {
				console.log('离线状态');
				var localScore = '0';
				netStatus(localScore);
				setTimeout(function(){
					var netStatu = document.getElementById('netStatu');
					document.body.removeChild(netStatu);
				},5000);
			}
		//} else {
		//	alert('没有开启！');
		//	return false;
		//}
    }
	
	var netStatus = function(localScore){
		var oj = document.body; 
		var docHei = document.documentElement.clientHeight;
		var docWid = document.documentElement.clientWidth;
									
		var div = document.createElement("div");
		div.setAttribute('id','netStatu');
		div.style.cssText = "width:200px;height:100px;position:absolute;top:"+(docHei-100)/2+"px;left:"+(docWid-200)/2+"px;background:#999;text-align:center;font-size:13px;border-radius:10px;line-height:100px;z-index:1000"; 
		if(localScore == '0'){
			div.innerHTML = '只有联网比赛成绩才会上传哦!';
		}else{
			div.innerHTML = '得分数为'+localScore+'!';
		}
		oj.appendChild(div);
	}
	
	//成功与失败
	var createObj = function(isSuccessful,amount){
		//alert(isSuccessful+"::"+amount);
		var o = document.body; 
		var docHei = document.documentElement.clientHeight;
		var docWid = document.documentElement.clientWidth;
									
		var div = document.createElement("div");
		div.setAttribute('id','huafei');
		div.style.cssText = "width:200px;height:200px;position:absolute;top:"+(docHei-200)/2+"px;left:"+(docWid-200)/2+"px;background:#999;text-align:center;font-size:13px;border-radius:10px;line-height:30px;z-index:1000"; 
									
		var tuichu = document.createElement("a");
		tuichu.style.cssText = "position:absolute;top:110px;left:30px;color:blue;font-size:14px;"; 
		tuichu.setAttribute('onclick','javascript:window.location.reload()');
				
		var tiaozhuan = document.createElement("a");
		tiaozhuan.style.cssText = "position:absolute;top:110px;left:110px;text-decoration:none;color:blue;font-size:14px;"; 
		tiaozhuan.setAttribute('href',thisUrl);
		if(isSuccessful == 'true'){
			div.innerHTML = '<br>恭喜你获得'+amount+'元话费，去玩其他的游戏获得更多的话费吧!';
			tuichu.innerHTML = '在玩一把';
			tiaozhuan.innerHTML = '获得更多';
		}else{
			div.innerHTML = '<br><br>还差一点就能赢话费了!';
			tuichu.innerHTML = '再试一次';
			tiaozhuan.innerHTML = '看看活动';
		}
		
		o.appendChild(div);
		div.appendChild(tuichu);
		div.appendChild(tiaozhuan);
		localStorage.removeItem('mess');
	}
	
    /*
     gameStart : 游戏结束是调用
     */
    //调用 gameAgent.logClient() 埋点统计数据
    var gameOver = function (score){
        //################################################
        //pkAppAgent.redirectToActivity('http://pkleyou.cn/');
        //################################################
			var game_id = demoApi.getSessionData().game_id;
			var pi = demoApi.getSessionData().pi;
			var pkid = demoApi.getSessionData().pkid;
			var netWorkStyle = parseInt(demoApi.getNetworkType().networkType);
	
			if(netWorkStyle == 1 || netWorkStyle == 2 || netWorkStyle == 3){
				var locals = localStorage.getItem('mess');
				//var b = new Base64();  
				var localss = base_encode().decode(locals);
				//alert(localss);
				var taskVal = eval('('+localss+')');
				if (taskVal.isEnable == 'true') {
				//if (taskVal.isCompleted == 'true') {
					var amounts = taskVal.amount;
					//var b = new Base64(); 
					var vals = localStorage.getItem('totalScore');
					//var vals = b.decode(vals);
					
					if (vals == undefined || vals == '') {
						if (score >= Number(taskVal.requireScore)) {
							gameAgent.complete(timer(), score, function(object){
								//alert(JSON.stringify(object));
								var obj =  eval('('+JSON.stringify(object)+')');
								if(obj.isSuccessful == 'true'){
									createObj(obj.isSuccessful,taskVal.amount);
									localStorage.setItem('totalTime',jianTime());
									gameAgent.logClient('1', jianTime());
									
								}else{
									console.log('error!');
								}
							});
							
						} else {
							gameAgent.complete(timer(), score, function(object){
								var obj =  eval('('+JSON.stringify(object)+')');
								if(obj.isSuccessful == 'false'){
									createObj(obj.isSuccessful,taskVal.amount);
									gameAgent.logClient('0', jianTime());
								}else{
									console.log('error!');
								}
							});
							//alert('分数小于最低分数');
						}
					} else {
						if (vals >= Number(taskVal.requireScore)){
							gameAgent.complete(timer(), vals, function(object){
								var obj =  eval('('+JSON.stringify(object)+')');
								if(obj.isSuccessful == 'true'){
									createObj(obj.isSuccessful,taskVal.amount);
									gameAgent.logClient('1', jianTime());
								}else{
									console.log('error!');
								}
								
								localStorage.removeItem('totalScore');
							});
							
							//alert('分数小于最低分数');
							
						} else {
							gameAgent.complete(timer(), vals, function(object){
								var obj =  eval('('+JSON.stringify(object)+')');
								if(obj.isSuccessful == 'false'){
									createObj(obj.isSuccessful,taskVal.amount);
									gameAgent.logClient('0', jianTime());
								}else{
									console.log('error!');
								}
								
								localStorage.removeItem('totalScore');
							});
							//console.log('分数小于最低分数');
						}
					}
				//} else {
				 	createObj('false','');
					//alert('没有完成游戏！');
					//demoApi.openUrl(thisUrl);
				//}、
				
				} else {
					alert('没有开启！');
					return false;
				}
			} else {
				netStatus(score);
				setTimeout(function(){
					var netStatu = document.getElementById('netStatu');
					document.body.removeChild(netStatu);
				},2000);
				                                               
				localStorage.setItem('totalScore', score);
			}
    }
	
	////demo
	var demoApi = {
		getSessionData : function(){
			var ret = {
				'game_id' : '10002033',
				'pi' : 'xxgjrjrjjtjsjsjf',	     
				'pkid' : '100001',
				'version' : '1.0.141103'
			}
			return ret;
		},
		sendGameApiReq : function(o, callback){
			callback({'endPoint': 'http://front.pkh5.moranger.com:8989/game-end-point'});	
		},
		getNetworkType : function(){
			var callNet = 1;
			var network = {
				'networkType': callNet
			};	
			return network;
		},
		openUrl : function(url){
			//alert('call openUrl: ' + url);
			
			window.location.href = url; 
		}
	}
	
	init(demoApi);
	//////

    return{
        init : init,
        updateScore : updateScore, //分数变化时调用
        gameStart : gameStart,
        gameOver : gameOver
    };
})();
