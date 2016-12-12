function play68_init() {
	updateShare(0);
}
var HOME_PATH="http://wx.nibaguai.com/index.php/Game/gamelist";
function goHome() {
	//window.location.href = HOME_PATH;
	try{parent.moregame();}catch(e){};
}

function play68_submitScore(score) {
	//updateShareScore(score);
	//setTimeout( function() { show_share(); }, 1000 )
}

function updateShare(bestScore) {
	imgUrl = 'http://1251001823.cdn.myqcloud.com/1251001823/wechat/games/aircontrol/aircontrolicon.png';
	lineLink = 'http://1251001823.cdn.myqcloud.com/1251001823/wechat/games/aircontrol/aircontrol.htm';
	descContent = "即点即玩游戏太方便啦！";
	updateShareScore(bestScore);
	appid = '';
}

function updateShareScore(bestScore) {
	if(bestScore > 0) {
		shareTitle = "我在#飞行指挥官#让" + bestScore + "架飞机安全降落，请叫我飞行路线达人！";
	}
	else{
		shareTitle = "热门经典游戏#飞行指挥官#也来到Play68啦！快来争做飞行路线达人！";
	}
}