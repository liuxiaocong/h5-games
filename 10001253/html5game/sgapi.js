loadingtextobj = document.getElementById("sg-loading-text");
loadtextnum = 1; 
function sg_change_loadtext() {
	if (loadingtextobj) {
		if (loadtextnum == 4) {
			loadtextnum = 1;
		} else {
			loadtextnum += 1;
		}
		loadingtextobj.src = "html5game/spil_text_"+loadtextnum+".png";
	}
}
loadintervalid = setInterval(sg_change_loadtext, 4000);
			
loadbarobj = document.getElementById("sg_loadingbar");
bar_img_w = 416;
bar_img_h = 40;
bar_img_x = 112;
bar_img_y = 423;
var loadimgobj = document.getElementById("GM4HTML5_loadingscreen");
var room_width  = 640;
var room_height = 480;
var ratio = (room_height/room_width);
if (typeof(window.innerWidth)=='number') {
	browser_width = window.innerWidth;
	browser_height = window.innerHeight;
} else if (document.documentElement&&document.documentElement.clientWidth) {
	browser_width = document.documentElement.clientWidth;
	browser_height = document.documentElement.clientHeight;
} else if (document.body&&document.body.clientWidth) {
	browser_width = document.body.clientWidth;
	browser_height = document.body.clientHeight;
}
var multi = (browser_height / room_height);
var new_width = (room_width * multi);
var new_height = browser_height;
if (new_width > browser_width) {
	multi = (browser_width / room_width);
	new_width = (room_width * multi);
	new_height = (room_height * multi);
}
loadimgobj.style.width = new_width+'px';
loadimgobj.style.height = new_height+'px';
loadimgobj.style.left = browser_width/2-new_width/2+"px";
loadimgobj.style.top = browser_height/2-new_height/2+"px";

//SpilGames Init API

var spilapi = false;
var splashshow = false;
var sponlogo = "";
var sponlink = "";
var morelink = "";
var crosslink = "";
var sponlogoobj = null;
var splashobj = null;
var moreobj = null;
var crossobj = null;
var spilapiobj = null;

var SpilData = {
	id: '576742227280292169'
};

try {
	GameAPI.loadAPI(function(apiInstance) {
		console.log('GameAPI version ' + apiInstance.version + ' loaded!');
		spilapi = true;
		spilapiobj = apiInstance;
		//Spil Splash
		/*
		var splashData = apiInstance.Branding.getSplashScreen();
		if (splashData.show && splashData.action) {
			splashshow = true;
			splashobj = document.getElementById('spilgames-splash-screen');
			splashobj.addEventListener('click', splashData.action);
			splashobj.addEventListener('touchend', splashData.action);
		}
		*/
		//Spil Logo
		var logoData = apiInstance.Branding.getLogo();
		if (logoData.image) {
			sponlogo = logoData.image;
			sponlink = logoData.action;
			sponlogoobj = document.createElement('img');
			sponlogoobj.src = logoData.image;
			sponlogoobj.addEventListener('click', logoData.action);
			sponlogoobj.addEventListener('touchend', logoData.action);
			sponlogoobj.setAttribute('style','display: block; position: absolute; left: 0px; top: 0px; z-index: 10; border: 0');
			sponlogoobj.style.left = loadimgobj.style.left;
			sponlogoobj.style.top = loadimgobj.style.top;
			sponlogoobj.style.width = 202*multi+'px';
			document.body.appendChild(sponlogoobj);
		}
		//Spil Moregames
		var moreData = apiInstance.Branding.getLink('more_games');
		morelink = moreData.action;
			moreobj = document.createElement('img');
			moreobj.src = "html5game/but_more.png";
			moreobj.addEventListener('click', moreData.action);
			moreobj.addEventListener('touchend', moreData.action);
			moreobj.setAttribute('style','display: none; position: absolute; left: 0px; top: 0px; z-index: 10; border: 0');
			document.body.appendChild(moreobj);
		var crossData = apiInstance.Branding.getLink('related_label');
	}, SpilData);
} catch(e) {};