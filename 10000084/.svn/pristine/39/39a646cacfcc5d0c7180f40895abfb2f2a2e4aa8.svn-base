var racoon = null;
var container = null;
var game = null;
var DEVICE_IPHONE = 0;
var DEVICE_IPOD = 1;
var DEVICE_IPAD = 2;
var DEVICE_ANDROID = 3;
var DEVICE_DESKTOP = 4;
var device = DEVICE_ANDROID;
var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.search("iphone") > -1){
    device = DEVICE_IPHONE;
}else if(userAgent.search("ipod") > -1){
    device = DEVICE_IPOD;
}else if(userAgent.search("ipad") > -1){
    device = DEVICE_IPAD;
}else if(userAgent.search("android") > -1){
    device = DEVICE_ANDROID;
}else{
	device = DEVICE_DESKTOP;
}
var GAME_RATIO = 1;
var GAME_TEXT_RATIO = 1;
var GAME_QUALITY = "HD";
Util.SetImagePrefixURL("assets/images/HD");

if(device == DEVICE_IPHONE || device == DEVICE_IPOD){
	GAME_RATIO = 0.5;
	GAME_TEXT_RATIO = 0.54;
	GAME_QUALITY = "SD";
	Util.SetImagePrefixURL("assets/images/SD");
}else if(device == DEVICE_ANDROID){
	var lowest = screen.width;
	if(lowest>screen.height){
		lowest = screen.height;
	}
	if(lowest<500){
		GAME_RATIO = 0.5;
		GAME_TEXT_RATIO = 0.54;
		GAME_QUALITY = "SD";
		Util.SetImagePrefixURL("assets/images/SD");
	}
}

Assets.loadingAnimation = new RImage();
Assets.loadingAnimation.Load(Util.ImageURL("loading.gif"));
Assets.loadingAnimation.base().style.left = "50%";
Assets.loadingAnimation.base().style.top = "50%";
Assets.loadingAnimation.base().style.marginTop = "-24px";
Assets.loadingAnimation.base().style.marginLeft = "-24px";
Assets.loadingOverlay.node().AppendNode(Assets.loadingAnimation.node());

// var global
var SCREEN_MODE = "portrait"; // or landscape
var GAME_WIDTH = 640 * GAME_RATIO;
var GAME_HEIGHT = 960 * GAME_RATIO;
var GAME_SCALEX = 1;
var GAME_MOUSEX = 0;
var GAME_MOUSEY = 0;
var GAME_LEVEL = 1;
var clickable_1_1 = false;
var clickable_1_2 = false;
var clickable_1_3 = false;
var clickable_1_4 = false;
var clickable_2_1 = false;
var clickable_2_2 = false;
var clickable_2_3 = false;
var clickable_2_4 = false;
var clickable_3_1 = false;
var clickable_3_2 = false;
var clickable_3_3 = false;
var clickable_3_4 = false;
var clickable_4_1 = false;
var clickable_4_2 = false;
var clickable_4_3 = false;
var clickable_4_4 = false;
var TURN_TIMER = 0;
var PLAYER_TURN = false;
var MSG_DELAY = true;
var MSG_DELAY_COUNT = 100;
var SET_EXAMPLE = false;
var array_box = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var array_example = [];
var array_player = [];
var array_wrong = [];
var array_clear = [];

var TOTAL_SCORE = 0;
var STREAK = 0;
var BEST_STREAK = 0;
var streak_delay = 0;
var streak_color = 1;
var multiplier = 1;

var GAME_MODE = "menu";
var gameover_delay = 150;

var LANG;

var currentPage = null;
//////////////
var ARRAYPRIZE = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var ARRAYBOX = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
var ARRAYMATCH = [];
var ANSWERTIME = 0;
var TIMER = 60;
var SEC = 15;
var MILISEC = 60;


//ndak usah diganti. cuman perlu set path utk gambar rotate.png
var potraitOverlay =  new RDOMComponent("div");
potraitOverlay.base().className = "rotateLock";
potraitOverlay.base().style.background = "url(assets/images/"+GAME_QUALITY+"/rotate.png) center center";
potraitOverlay.base().style.top = "0";
potraitOverlay.base().style.left = "0";
potraitOverlay.base().style.width = "100%";
potraitOverlay.base().style.height = "100%";
potraitOverlay.base().style.zIndex = "1001";
potraitOverlay.base().style.backgroundColor = "rgba(255,255,255,0.5)";


var mute = false;


var save = SharedObject.GetLocal("findthedino");

SoundAssets.Load("assets/sound/bgm.mp3", true);
var sndBgm = SoundAssets.Get("assets/sound/bgm.mp3");
window.onblur = function() { 
	SoundController.Pause(sndBgm);
};
window.onfocus = function() { 
	SoundController.Play(sndBgm);
};
window.onpagehide = function() { 
	SoundController.Pause(sndBgm);
};
window.onpageshow = function() { 
	SoundController.Play(sndBgm);
};

//disini cuma perlu ganti path buat gambar btn mute tok
window.onload = function(){
	racoon = new Racoon();
	racoon.Start();
	Util.quality = GAME_QUALITY;
	
	if(Util.GetDeviceType() == Util.DEVICE_DESKTOP){
		SCREEN_MODE = "landscape";
	}
	else{
		SCREEN_MODE = "portrait";
	}
	
	var btnMuteUp = new RImage();
	btnMuteUp.Load("assets/images/"+GAME_QUALITY+"/button/btn_mute_1.png");
	var btnMuteDown = new RImage();
	btnMuteDown.Load("assets/images/"+GAME_QUALITY+"/button/btn_mute_1.png");

	var btnUnmuteUp = new RImage();
	btnUnmuteUp.Load("assets/images/"+GAME_QUALITY+"/button/btn_mute_2.png");
	var btnUnmuteDown = new RImage();
	btnUnmuteDown.Load("assets/images/"+GAME_QUALITY+"/button/btn_mute_2.png");

	var btnMute = new RSimpleButton(btnMuteUp, btnMuteDown);
	btnMute.node().transform().x(10*GAME_RATIO);
	btnMute.node().transform().y(10*GAME_RATIO);
	btnMute.base().style.zIndex = 100;
	btnMute.base().style.display = "";
	var btnUnmute = new RSimpleButton(btnUnmuteUp, btnUnmuteDown);
	btnUnmute.node().transform().x(btnMute.node().transform().x());
	btnUnmute.node().transform().y(btnMute.node().transform().y());
	btnUnmute.base().style.zIndex = 99;
	btnUnmute.base().style.display = "none";
	btnMute.events().AddEventListener(REvent.TOUCH_END, function(e){
		mute = true;
		SoundController.Pause(sndBgm);
		SoundController.Mute();
		btnMute.base().style.display = "none";
		btnUnmute.base().style.display = "";
	});
	
	btnUnmute.events().AddEventListener(REvent.TOUCH_END, function(e){
		mute = false;
		SoundController.Unmute();
		SoundController.Play(sndBgm);
		btnMute.base().style.display = "";
		btnUnmute.base().style.display = "none";
	});

	container = (new RTouchable("div")); //biarin
	container.base().style.width = 640*GAME_RATIO+"px";
	container.base().style.height = 960*GAME_RATIO+"px";
	//container.base().style.overflow = "hidden";
	container.events().AddEventListener(REvent.TOUCH_MOVE, function(e){
		GAME_MOUSEX = e.data().x;
		GAME_MOUSEY = e.data().y;
	});
	racoon.rootNode.AppendNode(container.node());
	container.node().AppendNode(btnMute.node());
	container.node().AppendNode(btnUnmute.node());
	
	LANG = SG.lang; //SG_Hooks.getLanguage(['en','es','fr','ge','it','pt','tk','ru']);
	//LANG = 'ru';
	console.log(LANG);
	
	ResizeScreen();// biarin
	SG_Hooks.setOrientationHandler(ResizeScreen);
	LoadGame();
	
	setInterval(function(){
		
		window.scrollTo(0, 1);
		ResizeScreen();
	}, 1000);

  window.addEventListener('orientationchange', OnOrientationChange);
  window.addEventListener('resize', ResizeScreen);

  // Initial execution if needed
  
  OnOrientationChange();
  SG_Hooks.setResizeHandler(OnOrientationChange); 
  
   
}
function ResizeScreen(){
	var stage = Util.GetStageSize();
	if(SCREEN_MODE == "portrait"){
		if (stage.width <= stage.height) { //landscape
			var gameRatio = GAME_HEIGHT / GAME_WIDTH;	//e.g. 960/640 = 1.5
			var screenRatio = stage.height / stage.width;
			if (gameRatio <= screenRatio) { 
				container.node().transform().scaleX(stage.width / GAME_WIDTH);
				container.node().transform().scaleY(stage.width / GAME_WIDTH);
			}else {
				container.node().transform().scaleX(stage.height / GAME_HEIGHT);
				container.node().transform().scaleY(stage.height / GAME_HEIGHT);
			}
			GAME_SCALEX = container.node().transform().scaleX();
			container.node().transform().x((stage.width - 640 * GAME_RATIO)/2);
			container.node().transform().y((stage.height - 960 * GAME_RATIO)/2);
		}
	}
	if(SCREEN_MODE == "landscape"){
		if (stage.width >= stage.height) { //landscape
			var gameRatio = GAME_HEIGHT / GAME_WIDTH;	//e.g. 960/640 = 1.5
			var screenRatio = stage.height / stage.width;
			if (gameRatio <= screenRatio) { 
				container.node().transform().scaleX(stage.width / GAME_WIDTH);
				container.node().transform().scaleY(stage.width / GAME_WIDTH);
			}else {
				container.node().transform().scaleX(stage.height / GAME_HEIGHT);
				container.node().transform().scaleY(stage.height / GAME_HEIGHT);
			}
			GAME_SCALEX = container.node().transform().scaleX();
			container.node().transform().x((stage.width - 640 * GAME_RATIO)/2);
			container.node().transform().y((stage.height - 960 * GAME_RATIO)/2);
		}
	}
	Assets.loadingAnimation.node().transform().scaleX(GAME_SCALEX);
	Assets.loadingAnimation.node().transform().scaleY(GAME_SCALEX);
}
function OnOrientationChange()
{
	if(Racoon.touchSupported){
		setTimeout(function(){
			var stage = Util.GetStageSize();
			if(SCREEN_MODE == "portrait"){
				if (stage.width <= stage.height) {
					if(potraitOverlay.node().parent()!=null){
						container.node().parent().RemoveNode(potraitOverlay.node());
						RacoonRoot.Render(document.body);
					}
				}else{
					if(potraitOverlay.node().parent()==null){
						container.node().parent().AppendNode(potraitOverlay.node());
							//RacoonRoot.Render(document.body);
					}
				}
			}
			if(SCREEN_MODE == "landscape"){
				if (stage.width >= stage.height) {
					if(potraitOverlay.node().parent()!=null){
						container.node().parent().RemoveNode(potraitOverlay.node());
						RacoonRoot.Render(document.body);
					}
				}else{
					if(potraitOverlay.node().parent()==null){
						container.node().parent().AppendNode(potraitOverlay.node());
							//RacoonRoot.Render(document.body);
					}
				}
			}
		},500);
	}
	//ResizeScreen();
}
function GotoPage(page){
	if(currentPage!=null){
		container.node().RemoveNode(currentPage.node());
		delete currentPage.base();
		delete currentPage;
	}
	currentPage = page;
	RacoonRoot.Render(document.body);
	
}
function LoadGame(){

	//menu
	Assets.Push(Util.ImageURL("mainmenu/background.png"));
	Assets.Push(Util.ImageURL("mainmenu/title.png"));
	Assets.Push(Util.ImageURL("mainmenu/btn_1.png"));
	Assets.Push(Util.ImageURL("mainmenu/btn_2.png"));
	for(var i=0;i<=9;i++){
		Assets.Push(Util.ImageURL("gameplay/plain/plain_"+i+".png"));
		Assets.Push(Util.ImageURL("gameplay/circle/circle_"+i+".png"));
		Assets.Push(Util.ImageURL("gameplay/cross/cross_"+i+".png"));
	}
	for(var i=1;i<=9;i++){
		Assets.Push(Util.ImageURL(LANG+"/goodjob/"+i+".png"));
		Assets.Push(Util.ImageURL(LANG+"/great/"+i+".png"));
		Assets.Push(Util.ImageURL(LANG+"/memorize/"+i+".png"));
		Assets.Push(Util.ImageURL(LANG+"/toobad/"+i+".png"));
		Assets.Push(Util.ImageURL(LANG+"/whoops/"+i+".png"));
		Assets.Push(Util.ImageURL(LANG+"/yourturn/"+i+".png"));
	}
	for(var i=1;i<=7;i++){
		Assets.Push(Util.ImageURL(LANG+"/multiplier/1/"+i+".png"));
		Assets.Push(Util.ImageURL(LANG+"/multiplier/2/"+i+".png"));
		Assets.Push(Util.ImageURL(LANG+"/multiplier/3/"+i+".png"));
		Assets.Push(Util.ImageURL(LANG+"/multiplier/4/"+i+".png"));
		Assets.Push(Util.ImageURL(LANG+"/multiplier/5/"+i+".png"));
	}
	Assets.Push(Util.ImageURL(LANG+"/gui6.png"));
	Assets.Push(Util.ImageURL("gameplay/gui4.png"));
	Assets.Push(Util.ImageURL("result/menu1.png"));
	Assets.Push(Util.ImageURL("result/menu2.png"));
	Assets.Push(Util.ImageURL("result/restart1.png"));
	Assets.Push(Util.ImageURL("result/restart2.png"));
	Assets.Push(Util.ImageURL(LANG+"/gui5.png"));
	Assets.Push(Util.ImageURL("result/gui12.png"));
	Assets.Push(Util.ImageURL(LANG+"/gui11.png"));
	Assets.Push(Util.ImageURL(LANG+"/btn_ok/1.png"));
	Assets.Push(Util.ImageURL(LANG+"/btn_ok/4.png"));
	for(var i=1;i<=7;i++){
		Assets.Push(Util.ImageURL(LANG+"/game over/"+i+".png"));
	}
	Assets.Push(Util.ImageURL(LANG+"/btn_moregames/1.png"));
	Assets.Push(Util.ImageURL(LANG+"/btn_moregames/4.png"));
	
	Assets.onload = function(){
		var gamepage = new GamePage();
		container.node().AppendNode(gamepage.node());
		GotoPage(gamepage);
	}
	Assets.LoadAll(true);
}

