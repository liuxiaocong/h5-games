/**
Class MainMenuPage
**/
Racoon.Extends(GamePage, RDOMComponent);
function GamePage() {
	SG_Hooks.start();
	console.log("start!");
	RDOMComponent.call(this, "div");
	
	var _this = game = this;
	
	this._background = new RImage();
	this._background.base().src = Assets.GetImage(Util.ImageURL("mainmenu/background.png")).base().toDataURL();
	this._background.node().transform().x(-160*GAME_RATIO);
	this.node().AppendNode(this._background.node());
	this._background.events().AddEventListener(REvent.TOUCH_END, function(e){
		SoundController.Play(sndBgm);		
	});
	
	this.title = Assets.GetImage(Util.ImageURL("mainmenu/title.png"));
	this.title.node().transform().x(80*GAME_RATIO);
	this.title.node().transform().y(70*GAME_RATIO);
	this.node().AppendNode(this.title.node());
	
	this.btn_play = new RSimpleButton(Assets.GetImage(Util.ImageURL("mainmenu/btn_2.png")), Assets.GetImage(Util.ImageURL("mainmenu/btn_1.png")));
	this.btn_play.node().transform().x(80*GAME_RATIO);
	this.btn_play.node().transform().y(500*GAME_RATIO);
	this.btn_play.events().AddEventListener(REvent.TOUCH_END, playClick);
	this.node().AppendNode(this.btn_play.node());
	
	this.tutorial = Assets.GetImage(Util.ImageURL(LANG+"/gui11.png"));
	this.tutorial.node().transform().x(-1000*GAME_RATIO);
	this.tutorial.node().transform().y(-1000*GAME_RATIO);
	this.tutorial.base().style.display = "none";
	this.node().AppendNode(this.tutorial.node());
	
	this.tutorial_ok = new RSimpleButton(Assets.GetImage(Util.ImageURL(LANG+"/btn_ok/1.png")), Assets.GetImage(Util.ImageURL(LANG+"/btn_ok/4.png")));
	this.tutorial_ok.node().transform().x(-1000*GAME_RATIO);
	this.tutorial_ok.node().transform().y(-1000*GAME_RATIO);
	this.tutorial_ok.base().style.display = "none";
	this.node().AppendNode(this.tutorial_ok.node());
	
	this.board = Assets.GetImage(Util.ImageURL(LANG+"/gui6.png"));
	this.board.node().transform().x(-1000*GAME_RATIO);
	this.board.node().transform().y(-1000*GAME_RATIO);
	this.board.base().style.display = "none";
	this.node().AppendNode(this.board.node());
	
	this.msg_board = Assets.GetImage(Util.ImageURL("gameplay/gui4.png"));
	this.msg_board.node().transform().x(-1000*GAME_RATIO);
	this.msg_board.node().transform().y(-1000*GAME_RATIO);
	this.msg_board.base().style.display = "none";
	this.node().AppendNode(this.msg_board.node());
	
	
	
	var msg_array = [];
	for(var i=1;i<=9;i++){
		msg_array.push(Assets.GetImage(Util.ImageURL(LANG+"/goodjob/"+i+".png")));
	}
	for(var i=1;i<=9;i++){
		msg_array.push(Assets.GetImage(Util.ImageURL(LANG+"/great/"+i+".png")));
	}
	for(var i=1;i<=9;i++){
		msg_array.push(Assets.GetImage(Util.ImageURL(LANG+"/memorize/"+i+".png")));
	}
	for(var i=1;i<=9;i++){
		msg_array.push(Assets.GetImage(Util.ImageURL(LANG+"/toobad/"+i+".png")));
	}
	for(var i=1;i<=9;i++){
		msg_array.push(Assets.GetImage(Util.ImageURL(LANG+"/whoops/"+i+".png")));
	}
	for(var i=1;i<=9;i++){
		msg_array.push(Assets.GetImage(Util.ImageURL(LANG+"/yourturn/"+i+".png")));
	}
	
	this.msg = new RBitmapSequence(msg_array);
	this.msg.animation().AddAnimation("none",[1],200);
	this.msg.animation().AddAnimation("goodjob",[1,2,3,4,5,6,7,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],200);
	this.msg.animation().AddAnimation("great",[10,11,12,13,14,15,16,17,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18],200);
	this.msg.animation().AddAnimation("memorize",[19,20,21,22,23,24,25,26,27],200);
	this.msg.animation().AddAnimation("toobad",[28,29,30,31,32,33,34,35,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36],200);
	this.msg.animation().AddAnimation("whoops",[37,38,39,40,41,42,43,44,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45],200);
	this.msg.animation().AddAnimation("yourturn",[46,47,48,49,50,51,52,53,54],200);
	this.msg.animation().Play("none",false);
	this.msg.node().transform().x(-1000*GAME_RATIO);
	this.msg.node().transform().y(-1000*GAME_RATIO);
	this.msg.base().style.display = "none";
	this.node().AppendNode(this.msg.node());
	
	this.txtscore = new RDOMComponent("div");
	this.txtscore.SetDescription = function(d){
		this.base().innerHTML = "<table style=\"width:"+Math.floor(600*GAME_RATIO)+"px;height:"+Math.floor(-12*GAME_RATIO)+"px\"><tr><td>"+d+"</td></tr></table>";
	};
	this.txtscore.SetDescription(TOTAL_SCORE);
	this.txtscore.node().transform().x(-1000*GAME_RATIO);
	this.txtscore.node().transform().y(-1000*GAME_RATIO);
	this.txtscore.base().style.display = "none";
	this.txtscore.base().style.marginTop = "0px";
	this.txtscore.base().style.marginRight = "0px";
	this.txtscore.base().style.textAlign="right";
	this.txtscore.base().style.fontFamily="Arial";
	this.txtscore.base().style.fontWeight = "Bold";
	this.txtscore.base().style.fontSize=Math.floor(75*GAME_TEXT_RATIO)+"px";
	this.txtscore.base().style.color="#FFFFFF";
	this.txtscore.base().style.lineHeight=Math.floor(26*GAME_RATIO)+"px";
	this.txtscore.base().style.zIndex = 3;
	this.node().AppendNode(this.txtscore.node());
	
	this.txttime = new RDOMComponent("div");
	this.txttime.SetDescription = function(d){
		this.base().innerHTML = "<table style=\"width:"+Math.floor(600*GAME_RATIO)+"px;height:"+Math.floor(-12*GAME_RATIO)+"px\"><tr><td>"+d+"</td></tr></table>";
	};
	this.txttime.SetDescription("00:00");
	this.txttime.node().transform().x(-1000*GAME_RATIO);
	this.txttime.node().transform().y(-1000*GAME_RATIO);
	this.txttime.base().style.display = "none";
	this.txttime.base().style.marginTop = "0px";
	this.txttime.base().style.marginRight = "0px";
	this.txttime.base().style.textAlign="right";
	this.txttime.base().style.fontFamily="Arial";
	this.txttime.base().style.fontWeight = "Bold";
	this.txttime.base().style.fontSize=Math.floor(40*GAME_TEXT_RATIO)+"px";
	this.txttime.base().style.color="#FFFFFF";
	this.txttime.base().style.lineHeight=Math.floor(26*GAME_RATIO)+"px";
	this.txttime.base().style.zIndex = 3;
	this.node().AppendNode(this.txttime.node());
	
	this.txtstreak = new RDOMComponent("div");
	this.txtstreak.SetDescription = function(d){
		this.base().innerHTML = "<table style=\"width:"+Math.floor(600*GAME_RATIO)+"px;height:"+Math.floor(-12*GAME_RATIO)+"px\"><tr><td>"+d+"</td></tr></table>";
	};
	this.txtstreak.SetDescription("");
	this.txtstreak.node().transform().x(-1000*GAME_RATIO);
	this.txtstreak.node().transform().y(-1000*GAME_RATIO);
	this.txtstreak.base().style.display = "none";
	this.txtstreak.base().style.marginTop = "0px";
	this.txtstreak.base().style.marginRight = "0px";
	this.txtstreak.base().style.textAlign="right";
	this.txtstreak.base().style.fontFamily="Arial";
	this.txtstreak.base().style.fontWeight = "Bold";
	this.txtstreak.base().style.fontSize=Math.floor(40*GAME_TEXT_RATIO)+"px";
	this.txtstreak.base().style.color="#F7FE2E";
	this.txtstreak.base().style.lineHeight=Math.floor(26*GAME_RATIO)+"px";
	this.txtstreak.base().style.zIndex = 3;
	this.node().AppendNode(this.txtstreak.node());
	
	this.txtbeststreak = new RDOMComponent("div");
	this.txtbeststreak.SetDescription = function(d){
		this.base().innerHTML = "<table style=\"width:"+Math.floor(600*GAME_RATIO)+"px;height:"+Math.floor(-12*GAME_RATIO)+"px\"><tr><td>"+d+"</td></tr></table>";
	};
	this.txtbeststreak.SetDescription("");
	this.txtbeststreak.node().transform().x(-1000*GAME_RATIO);
	this.txtbeststreak.node().transform().y(-1000*GAME_RATIO);
	this.txtbeststreak.base().style.display = "none";
	this.txtbeststreak.base().style.marginTop = "0px";
	this.txtbeststreak.base().style.marginRight = "0px";
	this.txtbeststreak.base().style.textAlign="right";
	this.txtbeststreak.base().style.fontFamily="Arial";
	this.txtbeststreak.base().style.fontWeight = "Bold";
	this.txtbeststreak.base().style.fontSize=Math.floor(30*GAME_TEXT_RATIO)+"px";
	this.txtbeststreak.base().style.color="#848484";
	this.txtbeststreak.base().style.lineHeight=Math.floor(26*GAME_RATIO)+"px";
	this.txtbeststreak.base().style.zIndex = 3;
	this.node().AppendNode(this.txtbeststreak.node());
	
	var array_multiplier = [];
	for(var i=1;i<=7;i++){
		array_multiplier.push(Assets.GetImage(Util.ImageURL(LANG+"/multiplier/1/"+i+".png")));
	}
	for(var i=1;i<=7;i++){
		array_multiplier.push(Assets.GetImage(Util.ImageURL(LANG+"/multiplier/2/"+i+".png")));
	}
	for(var i=1;i<=7;i++){
		array_multiplier.push(Assets.GetImage(Util.ImageURL(LANG+"/multiplier/3/"+i+".png")));
	}
	for(var i=1;i<=7;i++){
		array_multiplier.push(Assets.GetImage(Util.ImageURL(LANG+"/multiplier/4/"+i+".png")));
	}
	for(var i=1;i<=7;i++){
		array_multiplier.push(Assets.GetImage(Util.ImageURL(LANG+"/multiplier/5/"+i+".png")));
	}
	
	this.multiplier = new RBitmapSequence(array_multiplier);
	this.multiplier.animation().AddAnimation("1",[1,2,3,4,5,6,7],200);
	this.multiplier.animation().AddAnimation("2",[8,9,10,11,12,13,14],200);
	this.multiplier.animation().AddAnimation("3",[15,16,17,18,19,20,21],200);
	this.multiplier.animation().AddAnimation("4",[22,23,24,25,26,27,28],200);
	this.multiplier.animation().AddAnimation("5",[29,30,31,32,33,34,35],200);
	this.multiplier.base().style.display = "none";
	this.multiplier.node().transform().x(-1000*GAME_RATIO);
	this.multiplier.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.multiplier.node());
	
	var box_array = [];
	for(var i=0;i<=9;i++){
		box_array.push(Assets.GetImage(Util.ImageURL("gameplay/plain/plain_"+i+".png")));
	}
	for(var i=0;i<=9;i++){
		box_array.push(Assets.GetImage(Util.ImageURL("gameplay/circle/circle_"+i+".png")));
	}
	for(var i=0;i<=9;i++){
		box_array.push(Assets.GetImage(Util.ImageURL("gameplay/cross/cross_"+i+".png")));
	}
	
	this.box_1_1 = new RBitmapSequence(box_array);
	this.box_1_1.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_1_1.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_1_1.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_1_1.animation().Play("1",false);
	this.box_1_1.base().style.display = "none";
	this.box_1_1.node().transform().x(-1000*GAME_RATIO);
	this.box_1_1.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_1_1.node());
	
	this.box_1_2 = new RBitmapSequence(box_array);
	this.box_1_2.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_1_2.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_1_2.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_1_2.animation().Play("1",false);
	this.box_1_2.base().style.display = "none";
	this.box_1_2.node().transform().x(-1000*GAME_RATIO);
	this.box_1_2.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_1_2.node());
	
	this.box_1_3 = new RBitmapSequence(box_array);
	this.box_1_3.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_1_3.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_1_3.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_1_3.animation().Play("1",false);
	this.box_1_3.base().style.display = "none";
	this.box_1_3.node().transform().x(-1000*GAME_RATIO);
	this.box_1_3.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_1_3.node());
	
	this.box_1_4 = new RBitmapSequence(box_array);
	this.box_1_4.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_1_4.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_1_4.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_1_4.animation().Play("1",false);
	this.box_1_4.base().style.display = "none";
	this.box_1_4.node().transform().x(-1000*GAME_RATIO);
	this.box_1_4.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_1_4.node());
	
	this.box_2_1 = new RBitmapSequence(box_array);
	this.box_2_1.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_2_1.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_2_1.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_2_1.animation().Play("1",false);
	this.box_2_1.base().style.display = "none";
	this.box_2_1.node().transform().x(-1000*GAME_RATIO);
	this.box_2_1.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_2_1.node());
	
	this.box_2_2 = new RBitmapSequence(box_array);
	this.box_2_2.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_2_2.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_2_2.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_2_2.animation().Play("1",false);
	this.box_2_2.base().style.display = "none";
	this.box_2_2.node().transform().x(-1000*GAME_RATIO);
	this.box_2_2.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_2_2.node());
	
	this.box_2_3 = new RBitmapSequence(box_array);
	this.box_2_3.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_2_3.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_2_3.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_2_3.animation().Play("1",false);
	this.box_2_3.base().style.display = "none";
	this.box_2_3.node().transform().x(-1000*GAME_RATIO);
	this.box_2_3.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_2_3.node());
	
	this.box_2_4 = new RBitmapSequence(box_array);
	this.box_2_4.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_2_4.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_2_4.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_2_4.animation().Play("1",false);
	this.box_2_4.base().style.display = "none";
	this.box_2_4.node().transform().x(-1000*GAME_RATIO);
	this.box_2_4.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_2_4.node());
	
	this.box_3_1 = new RBitmapSequence(box_array);
	this.box_3_1.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_3_1.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_3_1.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_3_1.animation().Play("1",false);
	this.box_3_1.base().style.display = "none";
	this.box_3_1.node().transform().x(-1000*GAME_RATIO);
	this.box_3_1.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_3_1.node());
	
	this.box_3_2 = new RBitmapSequence(box_array);
	this.box_3_2.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_3_2.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_3_2.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_3_2.animation().Play("1",false);
	this.box_3_2.base().style.display = "none";
	this.box_3_2.node().transform().x(-1000*GAME_RATIO);
	this.box_3_2.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_3_2.node());
	
	this.box_3_3 = new RBitmapSequence(box_array);
	this.box_3_3.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_3_3.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_3_3.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_3_3.animation().Play("1",false);
	this.box_3_3.base().style.display = "none";
	this.box_3_3.node().transform().x(-1000*GAME_RATIO);
	this.box_3_3.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_3_3.node());
	
	this.box_3_4 = new RBitmapSequence(box_array);
	this.box_3_4.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_3_4.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_3_4.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_3_4.animation().Play("1",false);
	this.box_3_4.base().style.display = "none";
	this.box_3_4.node().transform().x(-1000*GAME_RATIO);
	this.box_3_4.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_3_4.node());
	
	this.box_4_1 = new RBitmapSequence(box_array);
	this.box_4_1.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_4_1.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_4_1.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_4_1.animation().Play("1",false);
	this.box_4_1.base().style.display = "none";
	this.box_4_1.node().transform().x(-1000*GAME_RATIO);
	this.box_4_1.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_4_1.node());
	
	this.box_4_2 = new RBitmapSequence(box_array);
	this.box_4_2.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_4_2.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_4_2.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_4_2.animation().Play("1",false);
	this.box_4_2.base().style.display = "none";
	this.box_4_2.node().transform().x(-1000*GAME_RATIO);
	this.box_4_2.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_4_2.node());
	
	this.box_4_3 = new RBitmapSequence(box_array);
	this.box_4_3.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_4_3.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_4_3.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_4_3.animation().Play("1",false);
	this.box_4_3.base().style.display = "none";
	this.box_4_3.node().transform().x(-1000*GAME_RATIO);
	this.box_4_3.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_4_3.node());
	
	this.box_4_4 = new RBitmapSequence(box_array);
	this.box_4_4.animation().AddAnimation("1",[1,2,3,4,5,6,7,8,9,10],200); 
	this.box_4_4.animation().AddAnimation("2",[11,12,13,14,15,16,17,19,20],200); 
	this.box_4_4.animation().AddAnimation("3",[21,22,23,24,25,26,27,28,29,30],200);
	this.box_4_4.animation().Play("1",false);
	this.box_4_4.base().style.display = "none";
	this.box_4_4.node().transform().x(-1000*GAME_RATIO);
	this.box_4_4.node().transform().y(-1000*GAME_RATIO);
	this.node().AppendNode(this.box_4_4.node());
	
	this.result_title = Assets.GetImage(Util.ImageURL("result/gui12.png"));
	this.result_title.base().style.display = "none";
	this.result_title.node().transform().x(124*GAME_RATIO);
	this.result_title.node().transform().y(-396*GAME_RATIO);
	this.node().AppendNode(this.result_title.node());
	
	this.result_board = Assets.GetImage(Util.ImageURL(LANG+"/gui5.png"));
	this.result_board.base().style.display = "none";
	this.result_board.node().transform().x(636*GAME_RATIO);
	this.result_board.node().transform().y(240*GAME_RATIO);
	this.node().AppendNode(this.result_board.node());
	
	this.btn_menu = new RSimpleButton(Assets.GetImage(Util.ImageURL("result/menu1.png")),Assets.GetImage(Util.ImageURL("result/menu2.png")));
	this.btn_menu.base().style.display = "none";
	this.btn_menu.node().transform().x(-313*GAME_RATIO);
	this.btn_menu.node().transform().y(649*GAME_RATIO);
	//this.btn_menu.events().AddEventListener(REvent.TOUCH_END, menuClick);
	this.node().AppendNode(this.btn_menu.node());
	
	this.btn_restart = new RSimpleButton(Assets.GetImage(Util.ImageURL("result/restart1.png")),Assets.GetImage(Util.ImageURL("result/restart2.png")));
	this.btn_restart.base().style.display = "none";
	this.btn_restart.node().transform().x(655*GAME_RATIO);
	this.btn_restart.node().transform().y(649*GAME_RATIO);
	//this.btn_restart.events().AddEventListener(REvent.TOUCH_END, restartClick);
	this.node().AppendNode(this.btn_restart.node());
	
	this.btn_moregames = new RSimpleButton(Assets.GetImage(Util.ImageURL(LANG+"/btn_moregames/1.png")),Assets.GetImage(Util.ImageURL(LANG+"/btn_moregames/4.png")));
	this.btn_moregames.base().style.display = "";
	this.btn_moregames.node().transform().x(136*GAME_RATIO);
	this.btn_moregames.node().transform().y(871*GAME_RATIO);
	this.btn_moregames.events().AddEventListener(REvent.TOUCH_END, moregamesClick);
	this.node().AppendNode(this.btn_moregames.node());
	
	this.txtresultscore = new RDOMComponent("div");
	this.txtresultscore.SetDescription = function(d){
		this.base().innerHTML = "<table style=\"width:"+Math.floor(600*GAME_RATIO)+"px;height:"+Math.floor(-12*GAME_RATIO)+"px\"><tr><td>"+d+"</td></tr></table>";
	};
	this.txtresultscore.SetDescription("");
	this.txtresultscore.node().transform().x(-1000*GAME_RATIO);
	this.txtresultscore.node().transform().y(-1000*GAME_RATIO);
	this.txtresultscore.base().style.display = "none";
	this.txtresultscore.base().style.marginTop = "0px";
	this.txtresultscore.base().style.marginRight = "0px";
	this.txtresultscore.base().style.textAlign="center";
	this.txtresultscore.base().style.fontFamily="Arial";
	this.txtresultscore.base().style.fontWeight = "Bold";
	this.txtresultscore.base().style.fontSize=Math.floor(40*GAME_TEXT_RATIO)+"px";
	this.txtresultscore.base().style.color="#FFFFFF";
	this.txtresultscore.base().style.lineHeight=Math.floor(26*GAME_RATIO)+"px";
	this.txtresultscore.base().style.zIndex = 3;
	this.node().AppendNode(this.txtresultscore.node());
	
	this.txtresultstreak = new RDOMComponent("div");
	this.txtresultstreak.SetDescription = function(d){
		this.base().innerHTML = "<table style=\"width:"+Math.floor(600*GAME_RATIO)+"px;height:"+Math.floor(-12*GAME_RATIO)+"px\"><tr><td>"+d+"</td></tr></table>";
	};
	this.txtresultstreak.SetDescription("0");
	this.txtresultstreak.node().transform().x(-1000*GAME_RATIO);
	this.txtresultstreak.node().transform().y(-1000*GAME_RATIO);
	this.txtresultstreak.base().style.display = "none";
	this.txtresultstreak.base().style.marginTop = "0px";
	this.txtresultstreak.base().style.marginRight = "0px";
	this.txtresultstreak.base().style.textAlign="center";
	this.txtresultstreak.base().style.fontFamily="Arial";
	this.txtresultstreak.base().style.fontWeight = "Bold";
	this.txtresultstreak.base().style.fontSize=Math.floor(40*GAME_TEXT_RATIO)+"px";
	this.txtresultstreak.base().style.color="#FFFFFF";
	this.txtresultstreak.base().style.lineHeight=Math.floor(26*GAME_RATIO)+"px";
	this.txtresultstreak.base().style.zIndex = 3;
	this.node().AppendNode(this.txtresultstreak.node());
	
	this.txtresultbestscore = new RDOMComponent("div");
	this.txtresultbestscore.SetDescription = function(d){
		this.base().innerHTML = "<table style=\"width:"+Math.floor(600*GAME_RATIO)+"px;height:"+Math.floor(-12*GAME_RATIO)+"px\"><tr><td>"+d+"</td></tr></table>";
	};
	this.txtresultbestscore.SetDescription("0");
	this.txtresultbestscore.node().transform().x(-1000*GAME_RATIO);
	this.txtresultbestscore.node().transform().y(-1000*GAME_RATIO);
	this.txtresultbestscore.base().style.display = "none";
	this.txtresultbestscore.base().style.marginTop = "0px";
	this.txtresultbestscore.base().style.marginRight = "0px";
	this.txtresultbestscore.base().style.textAlign="right";
	this.txtresultbestscore.base().style.fontFamily="Arial";
	this.txtresultbestscore.base().style.fontWeight = "Bold";
	this.txtresultbestscore.base().style.fontSize=Math.floor(25*GAME_TEXT_RATIO)+"px";
	this.txtresultbestscore.base().style.color="#848484";
	this.txtresultbestscore.base().style.lineHeight=Math.floor(26*GAME_RATIO)+"px";
	this.txtresultbestscore.base().style.zIndex = 3;
	this.node().AppendNode(this.txtresultbestscore.node());
	
	this.txtresultbeststreak = new RDOMComponent("div");
	this.txtresultbeststreak.SetDescription = function(d){
		this.base().innerHTML = "<table style=\"width:"+Math.floor(600*GAME_RATIO)+"px;height:"+Math.floor(-12*GAME_RATIO)+"px\"><tr><td>"+d+"</td></tr></table>";
	};
	this.txtresultbeststreak.SetDescription("0");
	this.txtresultbeststreak.node().transform().x(-1000*GAME_RATIO);
	this.txtresultbeststreak.node().transform().y(-1000*GAME_RATIO);
	this.txtresultbeststreak.base().style.display = "none";
	this.txtresultbeststreak.base().style.marginTop = "0px";
	this.txtresultbeststreak.base().style.marginRight = "0px";
	this.txtresultbeststreak.base().style.textAlign="right";
	this.txtresultbeststreak.base().style.fontFamily="Arial";
	this.txtresultbeststreak.base().style.fontWeight = "Bold";
	this.txtresultbeststreak.base().style.fontSize=Math.floor(25*GAME_TEXT_RATIO)+"px";
	this.txtresultbeststreak.base().style.color="#848484";
	this.txtresultbeststreak.base().style.lineHeight=Math.floor(26*GAME_RATIO)+"px";
	this.txtresultbeststreak.base().style.zIndex = 3;
	this.node().AppendNode(this.txtresultbeststreak.node());
	
	var gameover_array = [];
	for(var i=1;i<=7;i++){
		gameover_array.push(Assets.GetImage(Util.ImageURL(LANG+"/game over/"+i+".png")));
	}
	this.gameover = new RBitmapSequence(gameover_array);
	this.gameover.animation().AddAnimation("play",[1,2,3,4,5,6,7],100);
	this.gameover.animation().Play("play",false);
	this.gameover.base().style.display = "none";
	this.gameover.node().transform().x(63*GAME_RATIO);
	this.gameover.node().transform().y(485*GAME_RATIO);
	this.node().AppendNode(this.gameover.node());
}

function menuClick(e){
	SoundController.Play(sndBgm);
	game.btn_menu.events().RemoveEventListener(REvent.TOUCH_END, menuClick);
	game.btn_restart.events().RemoveEventListener(REvent.TOUCH_END, restartClick);
	
	RTween.SimpleTween(game.result_title,{x:game.result_title.node().transform().x(),y:game.result_title.node().transform().y()},{x:game.result_title.node().transform().x(),y:game.result_title.node().transform().y()-(400*GAME_RATIO)},300,1,["linear"]);
	RTween.SimpleTween(game.result_board,{x:game.result_board.node().transform().x(),y:game.result_board.node().transform().y()},{x:game.result_board.node().transform().x()+(640*GAME_RATIO),y:game.result_board.node().transform().y()},300,1,["linear"]);
	RTween.SimpleTween(game.btn_menu,{x:game.btn_menu.node().transform().x(),y:game.btn_menu.node().transform().y()},{x:game.btn_menu.node().transform().x()-(320*GAME_RATIO),y:game.btn_menu.node().transform().y()},300,1,["linear"]);
	RTween.SimpleTween(game.btn_restart,{x:game.btn_restart.node().transform().x(),y:game.btn_restart.node().transform().y()},{x:game.btn_restart.node().transform().x()+(320*GAME_RATIO),y:game.btn_restart.node().transform().y()},300,1,["linear"]);
	
	game.result_title.node().transform().x(124*GAME_RATIO);
	game.result_title.node().transform().y(-396*GAME_RATIO);
	
	game.result_board.node().transform().x(636*GAME_RATIO);
	game.result_board.node().transform().y(240*GAME_RATIO);
	
	game.btn_menu.node().transform().x(-313*GAME_RATIO);
	game.btn_menu.node().transform().y(649*GAME_RATIO);
	
	game.btn_restart.node().transform().x(-313*GAME_RATIO);
	game.btn_restart.node().transform().y(649*GAME_RATIO);
	
	game.btn_menu.base().style.display = "none";
	game.btn_restart.base().style.display = "none";
	game.btn_moregames.base().style.display = "none";
	
	game.txtscore.SetDescription("0");
	game.txtbeststreak.SetDescription("0");
	game.txtresultscore.base().style.display = "none";
	game.txtresultscore.SetDescription("0");
	game.txtresultstreak.base().style.display = "none";
	game.txtresultstreak.SetDescription("0");
	game.txtresultbestscore.base().style.display = "none";
	game.txtresultbestscore.SetDescription("0");
	game.txtresultbeststreak.base().style.display = "none";
	game.txtresultbeststreak.SetDescription("0");
	
	SEC = 15;
	MILISEC = 60;
	TOTAL_SCORE = 0;
	STREAK = 0;
	BEST_STREAK = 0;
	multiplier = 1;
	TURN_TIMER = 0;
	PLAYER_TURN = false;
	MSG_DELAY = true;
	MSG_DELAY_COUNT = 100;
	SET_EXAMPLE = false;
		
	setTimeout(function(){
		game.result_title.base().style.display = "none";
		game.result_board.base().style.display = "none";
		game.btn_moregames.base().style.display = "";
		game.gotoMenu();
	},300);
}

function restartClick(e){
	SoundController.Play(sndBgm);
	game.btn_menu.events().RemoveEventListener(REvent.TOUCH_END, menuClick);
	game.btn_restart.events().RemoveEventListener(REvent.TOUCH_END, restartClick);
	
	RTween.SimpleTween(game.result_title,{x:game.result_title.node().transform().x(),y:game.result_title.node().transform().y()},{x:game.result_title.node().transform().x(),y:game.result_title.node().transform().y()-(400*GAME_RATIO)},300,1,["linear"]);
	RTween.SimpleTween(game.result_board,{x:game.result_board.node().transform().x(),y:game.result_board.node().transform().y()},{x:game.result_board.node().transform().x()+(640*GAME_RATIO),y:game.result_board.node().transform().y()},300,1,["linear"]);
	RTween.SimpleTween(game.btn_menu,{x:game.btn_menu.node().transform().x(),y:game.btn_menu.node().transform().y()},{x:game.btn_menu.node().transform().x()-(320*GAME_RATIO),y:game.btn_menu.node().transform().y()},300,1,["linear"]);
	RTween.SimpleTween(game.btn_restart,{x:game.btn_restart.node().transform().x(),y:game.btn_restart.node().transform().y()},{x:game.btn_restart.node().transform().x()+(320*GAME_RATIO),y:game.btn_restart.node().transform().y()},300,1,["linear"]);
	
	game.result_title.node().transform().x(124*GAME_RATIO);
	game.result_title.node().transform().y(-396*GAME_RATIO);
	
	game.result_board.node().transform().x(636*GAME_RATIO);
	game.result_board.node().transform().y(240*GAME_RATIO);
	
	game.btn_menu.node().transform().x(-313*GAME_RATIO);
	game.btn_menu.node().transform().y(649*GAME_RATIO);
	
	game.btn_restart.node().transform().x(-313*GAME_RATIO);
	game.btn_restart.node().transform().y(649*GAME_RATIO);
	
	game.btn_menu.base().style.display = "none";
	game.btn_restart.base().style.display = "none";
	game.btn_moregames.base().style.display = "none";
	
	game.txtscore.SetDescription("0");
	game.txtbeststreak.SetDescription("0");
	game.txtresultscore.base().style.display = "none";
	game.txtresultscore.SetDescription("0");
	game.txtresultstreak.base().style.display = "none";
	game.txtresultstreak.SetDescription("0");
	game.txtresultbestscore.base().style.display = "none";
	game.txtresultbestscore.SetDescription("0");
	game.txtresultbeststreak.base().style.display = "none";
	game.txtresultbeststreak.SetDescription("0");
	
	SEC = 15;
	MILISEC = 60;
	TOTAL_SCORE = 0;
	STREAK = 0;
	BEST_STREAK = 0;
	multiplier = 1;
	TURN_TIMER = 0;
	PLAYER_TURN = false;
	MSG_DELAY = true;
	MSG_DELAY_COUNT = 100;
	SET_EXAMPLE = false;
	
	setTimeout(function(){
		game.result_title.base().style.display = "none";
		game.result_board.base().style.display = "none";
		
		game.gotoGame();
		
	},300);
}

function moregamesClick(e){
	//window.open("http://m.softgames.de","_blank");
	SG.redirectToPortal();
}

function tutorialClick(e){
	e.target().events().RemoveEventListener(REvent.TOUCH_END, tutorialClick);
	
	game.tutorial.base().style.display = "none";
	game.tutorial.node().transform().x(-1000*GAME_RATIO);
	game.tutorial.node().transform().y(-1000*GAME_RATIO);
	
	game.tutorial_ok.base().style.display = "none";
	game.tutorial_ok.node().transform().x(-1000*GAME_RATIO);
	game.tutorial_ok.node().transform().y(-1000*GAME_RATIO);
	game.gotoGame();
}

function playClick(e){
	
	SoundController.Play(sndBgm);
	e.target().events().RemoveEventListener(REvent.TOUCH_END, playClick);
	var title = e.target().node().parent().GetComponent().title;
	
	RTween.SimpleTween(title,{x:title.node().transform().x(),y:title.node().transform().y()},{x:title.node().transform().x()+(640*GAME_RATIO),y:title.node().transform().y()},300,1,["linear"]);
	RTween.SimpleTween(e.target(),{x:e.target().node().transform().x(),y:e.target().node().transform().y()},{x:e.target().node().transform().x()-(640*GAME_RATIO),y:e.target().node().transform().y()},300,1,["linear"]);
	
	game.btn_moregames.base().style.display = "none";
	
	game.title.node().transform().x(-1000*GAME_RATIO);
	game.title.node().transform().y(-1000*GAME_RATIO);
	
	game.btn_play.node().transform().x(-1000*GAME_RATIO);
	game.btn_play.node().transform().y(-1000*GAME_RATIO);
	
	setTimeout(function(){
		//game.node().RemoveNode(game.title.node());
		//game.node().RemoveNode(game.btn_play.node());
		game.title.base().style.display = "none";
		game.btn_play.base().style.display = "none";
		
		game.tutorial.base().style.display = "";
		game.tutorial.node().transform().x(1*GAME_RATIO);
		game.tutorial.node().transform().y(194*GAME_RATIO);
		
		game.tutorial_ok.base().style.display = "";
		game.tutorial_ok.node().transform().x(170*GAME_RATIO);
		game.tutorial_ok.node().transform().y(529*GAME_RATIO);
		game.tutorial_ok.events().AddEventListener(REvent.TOUCH_END,tutorialClick);
		//game.gotoGame();
	},300);
	
}

GamePage.prototype.Update = function(delta){
    RDOMComponent.prototype.Update.call(this,delta);
	SoundController.Play(sndBgm);
	
	if(GAME_MODE == "tutorial"){
		
	}
	if(GAME_MODE == "result"){
		game.txtstreak.base().style.display = "none";
		clickable_1_1 = false;clickable_1_2 = false;clickable_1_3 = false;clickable_1_4 = false;
		clickable_2_1 = false;clickable_2_2 = false;clickable_2_3 = false;clickable_2_4 = false;
		clickable_3_1 = false;clickable_3_2 = false;clickable_3_3 = false;clickable_3_4 = false;
		clickable_4_1 = false;clickable_4_2 = false;clickable_4_3 = false;clickable_4_4 = false;
		game.box_1_1.animation().Play("1",false);
		game.box_1_2.animation().Play("1",false);
		game.box_1_3.animation().Play("1",false);
		game.box_1_4.animation().Play("1",false);
		game.box_2_1.animation().Play("1",false);
		game.box_2_2.animation().Play("1",false);
		game.box_2_3.animation().Play("1",false);
		game.box_2_4.animation().Play("1",false);
		game.box_3_1.animation().Play("1",false);
		game.box_3_2.animation().Play("1",false);
		game.box_3_3.animation().Play("1",false);
		game.box_3_4.animation().Play("1",false);
		game.box_4_1.animation().Play("1",false);
		game.box_4_2.animation().Play("1",false);
		game.box_4_3.animation().Play("1",false);
		game.box_4_4.animation().Play("1",false);
		
		game.msg.animation().Play("none",false);
	}
	if(GAME_MODE == "gameover"){
		gameover_delay = gameover_delay - (60*delta/1000);
		if(gameover_delay <=0){
			GAME_MODE = "result";
			gameover_delay = 150;
			game.gotoResult();
			game.gameover.base().style.display = "none";
		}
	}
	if(GAME_MODE == "game"){
		if(PLAYER_TURN){
			if(MILISEC <= 0){				
				SEC = SEC - 1;
				if(SEC < 0) { 
					SEC=0; GAME_MODE = "gameover";
					//show gameover here
					game.gameover.animation().Play("play",false);
					game.gameover.base().style.display = "";
					SG_Hooks.gameOver(GAME_LEVEL, TOTAL_SCORE);
					clickable_1_1 = false;clickable_1_2 = false;clickable_1_3 = false;clickable_1_4 = false;
					clickable_2_1 = false;clickable_2_2 = false;clickable_2_3 = false;clickable_2_4 = false;
					clickable_3_1 = false;clickable_3_2 = false;clickable_3_3 = false;clickable_3_4 = false;
					clickable_4_1 = false;clickable_4_2 = false;clickable_4_3 = false;clickable_4_4 = false;
				}
				MILISEC = 60;
			}
			else{
				MILISEC = MILISEC - (60*delta/1000);
			}
		}		
		else{
			if(!MSG_DELAY){
				if(!SET_EXAMPLE){
					SET_EXAMPLE = true;
					if(GAME_LEVEL == 1){
						array_box =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
						array_example = [];
						array_player = [];
						array_clear = [];
						for(var i=0;i<=1;i++){
							array_example.push(array_box.splice(Math.floor(array_box.length*Math.random()),1)[0]);
						}
						console.log(array_example);
					}
					if(GAME_LEVEL == 2){
						array_box =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
						array_example = [];
						array_player = [];
						array_clear = [];
						for(var i=0;i<=2;i++){
							array_example.push(array_box.splice(Math.floor(array_box.length*Math.random()),1)[0]);
						}
						console.log(array_example);
					}
					if(GAME_LEVEL == 3){
						array_box =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
						array_example = [];
						array_player = [];
						array_clear = [];
						for(var i=0;i<=3;i++){
							array_example.push(array_box.splice(Math.floor(array_box.length*Math.random()),1)[0]);
						}
						console.log(array_example);
					}
					if(GAME_LEVEL == 4){
						array_box =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
						array_example = [];
						array_player = [];
						array_clear = [];
						for(var i=0;i<=4;i++){
							array_example.push(array_box.splice(Math.floor(array_box.length*Math.random()),1)[0]);
						}
						console.log(array_example);
					}
					if(GAME_LEVEL == 5){
						array_box =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
						array_example = [];
						array_player = [];
						array_clear = [];
						for(var i=0;i<=5;i++){
							array_example.push(array_box.splice(Math.floor(array_box.length*Math.random()),1)[0]);
						}
						console.log(array_example);
					}
					if(GAME_LEVEL == 6){
						array_box =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
						var array_temp = [];
						array_example = [];
						array_player = [];
						array_wrong = [];
						array_clear = [];
						for(var i=0;i<=5;i++){
							array_temp.push([array_box.splice(Math.floor(array_box.length*Math.random()),1)[0],1]);
						}		
						array_temp.push([array_box.splice(Math.floor(array_box.length*Math.random()),1)[0],2]);
						for(var i=0;i<=6;i++){
							array_example.push(array_temp.splice(Math.floor(array_temp.length*Math.random()),1)[0]);
						}
						for(var i=0;i<=6;i++){
							console.log(array_example[i][0]+","+array_example[i][1]);
						}
					}
					if(GAME_LEVEL == 7){
						array_box =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
						var array_temp = [];
						array_example = [];
						array_player = [];
						array_wrong = [];
						array_clear = [];
						for(var i=0;i<=6;i++){
							array_temp.push([array_box.splice(Math.floor(array_box.length*Math.random()),1)[0],1]);
						}		
						array_temp.push([array_box.splice(Math.floor(array_box.length*Math.random()),1)[0],2]);
						array_temp.push([array_box.splice(Math.floor(array_box.length*Math.random()),1)[0],2]);
						for(var i=0;i<=8;i++){
							array_example.push(array_temp.splice(Math.floor(array_temp.length*Math.random()),1)[0]);
						}
						for(var i=0;i<=8;i++){
							console.log(array_example[i][0]+","+array_example[i][1]);
						}
					}
					if(GAME_LEVEL == 8){
						array_box =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
						var array_temp = [];
						array_example = [];
						array_player = [];
						array_wrong = [];
						array_clear = [];
						for(var i=0;i<=7;i++){
							array_temp.push([array_box.splice(Math.floor(array_box.length*Math.random()),1)[0],1]);
						}		
						array_temp.push([array_box.splice(Math.floor(array_box.length*Math.random()),1)[0],2]);
						array_temp.push([array_box.splice(Math.floor(array_box.length*Math.random()),1)[0],2]);
						for(var i=0;i<=9;i++){
							array_example.push(array_temp.splice(Math.floor(array_temp.length*Math.random()),1)[0]);
						}
						for(var i=0;i<=9;i++){
							console.log(array_example[i][0]+","+array_example[i][1]);
						}
					}
				}
				if(GAME_LEVEL == 1){
					if(TURN_TIMER<=150){
						if(array_example.length==2){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=75){
						if(array_example.length==1){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
				}
				if(GAME_LEVEL == 2){
					if(TURN_TIMER<=225){
						if(array_example.length==3){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=150){
						if(array_example.length==2){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=75){
						if(array_example.length==1){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
				}
				if(GAME_LEVEL == 3){
					if(TURN_TIMER<=300){
						if(array_example.length==4){
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=225){
						if(array_example.length==3){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=150){
						if(array_example.length==2){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=75){
						if(array_example.length==1){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
				}
				if(GAME_LEVEL == 4){
					if(TURN_TIMER<=350){
						if(array_example.length==5){
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=280){
						if(array_example.length==4){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=210){
						if(array_example.length==3){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=140){
						if(array_example.length==2){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=70){
						if(array_example.length==1){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
				}
				if(GAME_LEVEL == 5){
					if(TURN_TIMER<=360){
						if(array_example.length==6){
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=300){
						if(array_example.length==5){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=240){
						if(array_example.length==4){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=180){
						if(array_example.length==3){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=120){
						if(array_example.length==2){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
					if(TURN_TIMER<=60){
						if(array_example.length==1){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0]==1) { game.box_1_1.animation().Play("2",false); array_clear.push(1);}
							if(array_example[0]==2) { game.box_1_2.animation().Play("2",false); array_clear.push(2);}
							if(array_example[0]==3) { game.box_1_3.animation().Play("2",false); array_clear.push(3);}
							if(array_example[0]==4) { game.box_1_4.animation().Play("2",false); array_clear.push(4);}
							if(array_example[0]==5) { game.box_2_1.animation().Play("2",false); array_clear.push(5);}
							if(array_example[0]==6) { game.box_2_2.animation().Play("2",false); array_clear.push(6);}
							if(array_example[0]==7) { game.box_2_3.animation().Play("2",false); array_clear.push(7);}
							if(array_example[0]==8) { game.box_2_4.animation().Play("2",false); array_clear.push(8);}
							if(array_example[0]==9) { game.box_3_1.animation().Play("2",false); array_clear.push(9);}
							if(array_example[0]==10) { game.box_3_2.animation().Play("2",false); array_clear.push(10);}
							if(array_example[0]==11) { game.box_3_3.animation().Play("2",false); array_clear.push(11);}
							if(array_example[0]==12) { game.box_3_4.animation().Play("2",false); array_clear.push(12);}
							if(array_example[0]==13) { game.box_4_1.animation().Play("2",false); array_clear.push(13);}
							if(array_example[0]==14) { game.box_4_2.animation().Play("2",false); array_clear.push(14);}
							if(array_example[0]==15) { game.box_4_3.animation().Play("2",false); array_clear.push(15);}
							if(array_example[0]==16) { game.box_4_4.animation().Play("2",false); array_clear.push(16);}
							array_player.push(array_example.splice(0,1)[0]);
						}
					}
				}
				if(GAME_LEVEL == 6){
					if(TURN_TIMER<=350){
						if(array_example.length==7){
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=300){
						if(array_example.length==6){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=250){
						if(array_example.length==5){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=200){
						if(array_example.length==4){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=150){
						if(array_example.length==3){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=100){
						if(array_example.length==2){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=50){
						if(array_example.length==1){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
				}
				if(GAME_LEVEL == 7){
					if(TURN_TIMER<=360){
						if(array_example.length==9){
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=320){
						if(array_example.length==8){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=280){
						if(array_example.length==7){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=240){
						if(array_example.length==6){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=200){
						if(array_example.length==5){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=160){
						if(array_example.length==4){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=120){
						if(array_example.length==3){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=80){
						if(array_example.length==2){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=40){
						if(array_example.length==1){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
				}
				if(GAME_LEVEL == 8){
					if(TURN_TIMER<=400){
						if(array_example.length==10){
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=360){
						if(array_example.length==9){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=320){
						if(array_example.length==8){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=280){
						if(array_example.length==7){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=240){
						if(array_example.length==6){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=200){
						if(array_example.length==5){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=160){
						if(array_example.length==4){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=120){
						if(array_example.length==3){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=80){
						if(array_example.length==2){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
					if(TURN_TIMER<=40){
						if(array_example.length==1){
							if(array_clear[0]==1) game.box_1_1.animation().Play("1",false);
							if(array_clear[0]==2) game.box_1_2.animation().Play("1",false);
							if(array_clear[0]==3) game.box_1_3.animation().Play("1",false);
							if(array_clear[0]==4) game.box_1_4.animation().Play("1",false);
							if(array_clear[0]==5) game.box_2_1.animation().Play("1",false);
							if(array_clear[0]==6) game.box_2_2.animation().Play("1",false);
							if(array_clear[0]==7) game.box_2_3.animation().Play("1",false);
							if(array_clear[0]==8) game.box_2_4.animation().Play("1",false);
							if(array_clear[0]==9) game.box_3_1.animation().Play("1",false);
							if(array_clear[0]==10) game.box_3_2.animation().Play("1",false);
							if(array_clear[0]==11) game.box_3_3.animation().Play("1",false);
							if(array_clear[0]==12) game.box_3_4.animation().Play("1",false);
							if(array_clear[0]==13) game.box_4_1.animation().Play("1",false);
							if(array_clear[0]==14) game.box_4_2.animation().Play("1",false);
							if(array_clear[0]==15) game.box_4_3.animation().Play("1",false);
							if(array_clear[0]==16) game.box_4_4.animation().Play("1",false);
							array_clear.splice(0,1);
							if(array_example[0][0]==1) {if(array_example[0][1] == 1) game.box_1_1.animation().Play("2",false);	else game.box_1_1.animation().Play("3",false);array_clear.push(1);}
							if(array_example[0][0]==2) {if(array_example[0][1] == 1) game.box_1_2.animation().Play("2",false);	else game.box_1_2.animation().Play("3",false);array_clear.push(2);}
							if(array_example[0][0]==3) {if(array_example[0][1] == 1) game.box_1_3.animation().Play("2",false);	else game.box_1_3.animation().Play("3",false);array_clear.push(3);}
							if(array_example[0][0]==4) {if(array_example[0][1] == 1) game.box_1_4.animation().Play("2",false);	else game.box_1_4.animation().Play("3",false);array_clear.push(4);}
							if(array_example[0][0]==5) {if(array_example[0][1] == 1) game.box_2_1.animation().Play("2",false);	else game.box_2_1.animation().Play("3",false);array_clear.push(5);}
							if(array_example[0][0]==6) {if(array_example[0][1] == 1) game.box_2_2.animation().Play("2",false);	else game.box_2_2.animation().Play("3",false);array_clear.push(6);}
							if(array_example[0][0]==7) {if(array_example[0][1] == 1) game.box_2_3.animation().Play("2",false);	else game.box_2_3.animation().Play("3",false);array_clear.push(7);}
							if(array_example[0][0]==8) {if(array_example[0][1] == 1) game.box_2_4.animation().Play("2",false);	else game.box_2_4.animation().Play("3",false);array_clear.push(8);}
							if(array_example[0][0]==9) {if(array_example[0][1] == 1) game.box_3_1.animation().Play("2",false);	else game.box_3_1.animation().Play("3",false);array_clear.push(9);}
							if(array_example[0][0]==10) {if(array_example[0][1] == 1) game.box_3_2.animation().Play("2",false);	else game.box_3_2.animation().Play("3",false);array_clear.push(10);}
							if(array_example[0][0]==11) {if(array_example[0][1] == 1) game.box_3_3.animation().Play("2",false);	else game.box_3_3.animation().Play("3",false);array_clear.push(11);}
							if(array_example[0][0]==12) {if(array_example[0][1] == 1) game.box_3_4.animation().Play("2",false);	else game.box_3_4.animation().Play("3",false);array_clear.push(12);}
							if(array_example[0][0]==13) {if(array_example[0][1] == 1) game.box_4_1.animation().Play("2",false);	else game.box_4_1.animation().Play("3",false);array_clear.push(13);}
							if(array_example[0][0]==14) {if(array_example[0][1] == 1) game.box_4_2.animation().Play("2",false);	else game.box_4_2.animation().Play("3",false);array_clear.push(14);}
							if(array_example[0][0]==15) {if(array_example[0][1] == 1) game.box_4_3.animation().Play("2",false);	else game.box_4_3.animation().Play("3",false);array_clear.push(15);}
							if(array_example[0][0]==16) {if(array_example[0][1] == 1) game.box_4_4.animation().Play("2",false);	else game.box_4_4.animation().Play("3",false);array_clear.push(16);}						
							if(array_example[0][1] == 1){array_player.push(array_example[0][0]);}
							array_example.splice(0,1);
						}
					}
				}
				TURN_TIMER = Math.floor(TURN_TIMER - (60*delta/1000));
				if(TURN_TIMER <= 0){
					PLAYER_TURN = true;
					game.msg.animation().Play("yourturn",false);
					game.box_1_1.animation().Play("1",false);
					game.box_1_2.animation().Play("1",false);
					game.box_1_3.animation().Play("1",false);
					game.box_1_4.animation().Play("1",false);
					game.box_2_1.animation().Play("1",false);
					game.box_2_2.animation().Play("1",false);
					game.box_2_3.animation().Play("1",false);
					game.box_2_4.animation().Play("1",false);
					game.box_3_1.animation().Play("1",false);
					game.box_3_2.animation().Play("1",false);
					game.box_3_3.animation().Play("1",false);
					game.box_3_4.animation().Play("1",false);
					game.box_4_1.animation().Play("1",false);
					game.box_4_2.animation().Play("1",false);
					game.box_4_3.animation().Play("1",false);
					game.box_4_4.animation().Play("1",false);
					clickable_1_1 = true;clickable_1_2 = true;clickable_1_3 = true;clickable_1_4 = true;
					clickable_2_1 = true;clickable_2_2 = true;clickable_2_3 = true;clickable_2_4 = true;
					clickable_3_1 = true;clickable_3_2 = true;clickable_3_3 = true;clickable_3_4 = true;
					clickable_4_1 = true;clickable_4_2 = true;clickable_4_3 = true;clickable_4_4 = true;
				}
			}
			else{
				MSG_DELAY_COUNT = MSG_DELAY_COUNT - (60*delta/1000);
				clickable_1_1 = false;clickable_1_2 = false;clickable_1_3 = false;clickable_1_4 = false;
				clickable_2_1 = false;clickable_2_2 = false;clickable_2_3 = false;clickable_2_4 = false;
				clickable_3_1 = false;clickable_3_2 = false;clickable_3_3 = false;clickable_3_4 = false;
				clickable_4_1 = false;clickable_4_2 = false;clickable_4_3 = false;clickable_4_4 = false;
				if(MSG_DELAY_COUNT <=50){
					if(game.msg.animation().currentLabel() != "memorize"){
						game.box_1_1.animation().Play("1",false);
						game.box_1_2.animation().Play("1",false);
						game.box_1_3.animation().Play("1",false);
						game.box_1_4.animation().Play("1",false);
						game.box_2_1.animation().Play("1",false);
						game.box_2_2.animation().Play("1",false);
						game.box_2_3.animation().Play("1",false);
						game.box_2_4.animation().Play("1",false);
						game.box_3_1.animation().Play("1",false);
						game.box_3_2.animation().Play("1",false);
						game.box_3_3.animation().Play("1",false);
						game.box_3_4.animation().Play("1",false);
						game.box_4_1.animation().Play("1",false);
						game.box_4_2.animation().Play("1",false);
						game.box_4_3.animation().Play("1",false);
						game.box_4_4.animation().Play("1",false);
						
						game.msg.animation().Play("memorize",false);
					}
				}
				if(MSG_DELAY_COUNT <=0){
					if(GAME_LEVEL==1) TURN_TIMER = 150;//75
					if(GAME_LEVEL==2) TURN_TIMER = 225;//75
					if(GAME_LEVEL==3) TURN_TIMER = 300;//75
					if(GAME_LEVEL==4) TURN_TIMER = 350;//70
					if(GAME_LEVEL==5) TURN_TIMER = 360;//60
					if(GAME_LEVEL==6) TURN_TIMER = 350;//50
					if(GAME_LEVEL==7) TURN_TIMER = 360;//40
					if(GAME_LEVEL==8) TURN_TIMER = 400;//40
					MSG_DELAY_COUNT = 100;
					MSG_DELAY=false;
					
					SET_EXAMPLE=false;
				}
			}
		}
		
		//text time
		if(SEC < 10){
			game.txttime.SetDescription("00:0"+SEC);
		}
		else{
			game.txttime.SetDescription("00:"+SEC);
		}
		//text streak
		if(STREAK > 1){
			game.txtstreak.SetDescription(STREAK);
			if(GAME_MODE == "game")	game.txtstreak.base().style.display = "";
			else game.txtstreak.base().style.display = "none";
		}
		else{
			game.txtstreak.base().style.display = "none";
		}
		game.txtbeststreak.SetDescription(BEST_STREAK);
		streak_delay = Math.floor(streak_delay + (60*delta/1000));
		if(streak_delay >= 8){
			if(streak_color==1){
				streak_color = 2;
				this.txtstreak.base().style.color="#FFFFFF";
				this.txtstreak.base().style.fontSize=Math.floor(40*GAME_TEXT_RATIO)+"px";
				game.txtstreak.node().transform().x(20*GAME_RATIO);
				game.txtstreak.node().transform().y(155*GAME_RATIO);
			}
			else{
				this.txtstreak.base().style.color="#FFFFFF";
				this.txtstreak.base().style.fontSize=Math.floor(45*GAME_TEXT_RATIO)+"px";
				game.txtstreak.node().transform().x(23*GAME_RATIO);
				game.txtstreak.node().transform().y(155*GAME_RATIO);
				streak_color = 1;
			}
			streak_delay=0;
		}
		
		//text score
		game.txtscore.SetDescription(TOTAL_SCORE);
	}
}

GamePage.prototype.gotoMenu = function(){
	game.title.base().style.display = "";
	game.title.node().transform().x(80+640*GAME_RATIO);
	game.title.node().transform().y(70*GAME_RATIO);
	game.btn_play.base().style.display = "";
	game.btn_play.node().transform().x(80-640*GAME_RATIO);
	game.btn_play.node().transform().y(500*GAME_RATIO);
	
	RTween.SimpleTween(game.title,{x:game.title.node().transform().x(),y:game.title.node().transform().y()},{x:game.title.node().transform().x()-(640*GAME_RATIO),y:game.title.node().transform().y()},300,1,["linear"]);
	RTween.SimpleTween(game.btn_play,{x:game.btn_play.node().transform().x(),y:game.btn_play.node().transform().y()},{x:game.btn_play.node().transform().x()+(640*GAME_RATIO),y:game.btn_play.node().transform().y()},300,1,["linear"]);
	
	setTimeout(function(){
		game.title.node().transform().x(80*GAME_RATIO);
		game.title.node().transform().y(70*GAME_RATIO);
		game.btn_play.node().transform().x(80*GAME_RATIO);
		game.btn_play.node().transform().y(500*GAME_RATIO);
		game.btn_play.events().AddEventListener(REvent.TOUCH_END, playClick);
	},300);
}

GamePage.prototype.gotoResult = function(){
	game.box_1_1.base().style.display = "none";
	game.box_1_2.base().style.display = "none";
	game.box_1_3.base().style.display = "none";
	game.box_1_4.base().style.display = "none";
	game.box_2_1.base().style.display = "none";
	game.box_2_2.base().style.display = "none";
	game.box_2_3.base().style.display = "none";
	game.box_2_4.base().style.display = "none";
	game.box_3_1.base().style.display = "none";
	game.box_3_2.base().style.display = "none";
	game.box_3_3.base().style.display = "none";
	game.box_3_4.base().style.display = "none";
	game.box_4_1.base().style.display = "none";
	game.box_4_2.base().style.display = "none";
	game.box_4_4.base().style.display = "none";
	game.box_4_3.base().style.display = "none";
	game.board.base().style.display = "none";
	game.msg_board.base().style.display = "none";
	game.msg.base().style.display = "none";
	game.txttime.base().style.display = "none";
	game.txtscore.base().style.display = "none";
	game.txtstreak.base().style.display = "none";
	game.txtbeststreak.base().style.display = "none";
	game.multiplier.base().style.display = "none";
	
	game.result_title.base().style.display = "";
	game.result_board.base().style.display = "";
	game.btn_menu.base().style.display = "";
	game.btn_restart.base().style.display = "";
	game.btn_moregames.base().style.display = "";
	
	RTween.SimpleTween(game.result_title,{x:game.result_title.node().transform().x(),y:game.result_title.node().transform().y()},{x:game.result_title.node().transform().x(),y:game.result_title.node().transform().y()+(400*GAME_RATIO)},300,1,["linear"]);
	RTween.SimpleTween(game.result_board,{x:game.result_board.node().transform().x(),y:game.result_board.node().transform().y()},{x:game.result_board.node().transform().x()-(640*GAME_RATIO),y:game.result_board.node().transform().y()},300,1,["linear"]);
	RTween.SimpleTween(game.btn_menu,{x:game.btn_menu.node().transform().x(),y:game.btn_menu.node().transform().y()},{x:game.btn_menu.node().transform().x()+(320*GAME_RATIO),y:game.btn_menu.node().transform().y()},300,1,["linear"]);
	RTween.SimpleTween(game.btn_restart,{x:game.btn_restart.node().transform().x(),y:game.btn_restart.node().transform().y()},{x:game.btn_restart.node().transform().x()-(320*GAME_RATIO),y:game.btn_restart.node().transform().y()},300,1,["linear"]);
	
	game.result_title.node().transform().y(4*GAME_RATIO);
	game.result_board.node().transform().x(-4*GAME_RATIO);
	game.btn_menu.node().transform().x(7*GAME_RATIO);
	game.btn_restart.node().transform().x(335*GAME_RATIO);
	
	setTimeout(function(){
		if( save.data()["score"] == undefined ){
			save.data()["score"] = TOTAL_SCORE;
		}
		else{
			if(TOTAL_SCORE > save.data()["score"]){
				save.data()["score"] = TOTAL_SCORE;
			}
		}
		if( save.data()["streak"] == undefined ){
			save.data()["streak"] = BEST_STREAK;
		}
		else{
			if(BEST_STREAK > save.data()["streak"]){
				save.data()["streak"] = BEST_STREAK;
			}
		}
		save.Flush();
		
		game.txtresultscore.base().style.display = "";
		game.txtresultscore.SetDescription(TOTAL_SCORE);
		game.txtresultscore.node().transform().x(25*GAME_RATIO);
		game.txtresultscore.node().transform().y(395*GAME_RATIO);
		
		game.txtresultbestscore.base().style.display = "";
		game.txtresultbestscore.SetDescription(save.data()["score"]);
		game.txtresultbestscore.node().transform().x(-125*GAME_RATIO);
		game.txtresultbestscore.node().transform().y(445*GAME_RATIO);
		
		game.txtresultstreak.base().style.display = "";
		game.txtresultstreak.SetDescription(BEST_STREAK);
		game.txtresultstreak.node().transform().x(25*GAME_RATIO);
		game.txtresultstreak.node().transform().y(534*GAME_RATIO);
		
		game.txtresultbeststreak.base().style.display = "";
		game.txtresultbeststreak.SetDescription(save.data()["streak"]);
		game.txtresultbeststreak.node().transform().x(-125*GAME_RATIO);
		game.txtresultbeststreak.node().transform().y(585*GAME_RATIO);
		
		game.btn_menu.events().AddEventListener(REvent.TOUCH_END, menuClick);
		game.btn_restart.events().AddEventListener(REvent.TOUCH_END, restartClick);
		game.btn_moregames.events().AddEventListener(REvent.TOUCH_END, moregamesClick);
	},300);
}

GamePage.prototype.gotoGame = function(){
	setTimeout(function(){
		game.box_1_1.base().style.display = "";
		game.box_1_1.node().transform().x(41*GAME_RATIO);
		game.box_1_1.node().transform().y(394*GAME_RATIO);
		
		game.board.base().style.display = "";
		game.board.node().transform().x(161*GAME_RATIO);
		game.board.node().transform().y(0*GAME_RATIO);
		
		game.msg_board.base().style.display = "";
		game.msg_board.node().transform().x(0*GAME_RATIO);
		game.msg_board.node().transform().y(250*GAME_RATIO);
		
		game.msg.base().style.display = "";
		game.msg.node().transform().x(284*GAME_RATIO);
		game.msg.node().transform().y(236*GAME_RATIO);
		
		game.txtscore.base().style.display = "";
		game.txtscore.node().transform().x(20*GAME_RATIO);
		game.txtscore.node().transform().y(30*GAME_RATIO);
		
		game.txttime.base().style.display = "";
		game.txttime.node().transform().x(20*GAME_RATIO);
		game.txttime.node().transform().y(100*GAME_RATIO);
		
		game.txtstreak.base().style.display = "";
		game.txtstreak.node().transform().x(20*GAME_RATIO);
		game.txtstreak.node().transform().y(155*GAME_RATIO);
		
		game.txtbeststreak.base().style.display = "";
		game.txtbeststreak.node().transform().x(20*GAME_RATIO);
		game.txtbeststreak.node().transform().y(210*GAME_RATIO);
		
		game.multiplier.base().style.display = "";
		game.multiplier.node().transform().x(13*GAME_RATIO);
		game.multiplier.node().transform().y(166*GAME_RATIO);
		game.multiplier.animation().Play("1",false);
	},10);
	setTimeout(function(){
		game.box_1_2.base().style.display = "";
		game.box_1_2.node().transform().x(183*GAME_RATIO);
		game.box_1_2.node().transform().y(394*GAME_RATIO);
	},60);
	setTimeout(function(){
		game.box_1_3.base().style.display = "";
		game.box_1_3.node().transform().x(327*GAME_RATIO);
		game.box_1_3.node().transform().y(394*GAME_RATIO);
	},110);
	setTimeout(function(){
		game.box_1_4.base().style.display = "";
		game.box_1_4.node().transform().x(469*GAME_RATIO);
		game.box_1_4.node().transform().y(394*GAME_RATIO);
	},160);
	
	setTimeout(function(){
		game.box_2_1.base().style.display = "";
		game.box_2_1.node().transform().x(41*GAME_RATIO);
		game.box_2_1.node().transform().y(533*GAME_RATIO);
	},210);
	setTimeout(function(){
		game.box_2_2.base().style.display = "";
		game.box_2_2.node().transform().x(183*GAME_RATIO);
		game.box_2_2.node().transform().y(533*GAME_RATIO);
	},260);
	setTimeout(function(){
		game.box_2_3.base().style.display = "";
		game.box_2_3.node().transform().x(327*GAME_RATIO);
		game.box_2_3.node().transform().y(533*GAME_RATIO);
	},310);
	setTimeout(function(){
		game.box_2_4.base().style.display = "";
		game.box_2_4.node().transform().x(469*GAME_RATIO);
		game.box_2_4.node().transform().y(533*GAME_RATIO);
	},360);
	
	setTimeout(function(){
		game.box_3_1.base().style.display = "";
		game.box_3_1.node().transform().x(41*GAME_RATIO);
		game.box_3_1.node().transform().y(672*GAME_RATIO);
	},410);
	setTimeout(function(){
		game.box_3_2.base().style.display = "";
		game.box_3_2.node().transform().x(183*GAME_RATIO);
		game.box_3_2.node().transform().y(672*GAME_RATIO);
	},460);
	setTimeout(function(){
		game.box_3_3.base().style.display = "";
		game.box_3_3.node().transform().x(327*GAME_RATIO);
		game.box_3_3.node().transform().y(672*GAME_RATIO);
	},510);
	setTimeout(function(){
		game.box_3_4.base().style.display = "";
		game.box_3_4.node().transform().x(469*GAME_RATIO);
		game.box_3_4.node().transform().y(672*GAME_RATIO);
	},560);
	
	setTimeout(function(){
		game.box_4_1.base().style.display = "";
		game.box_4_1.node().transform().x(41*GAME_RATIO);
		game.box_4_1.node().transform().y(811*GAME_RATIO);
	},610);
	setTimeout(function(){
		game.box_4_2.base().style.display = "";
		game.box_4_2.node().transform().x(183*GAME_RATIO);
		game.box_4_2.node().transform().y(811*GAME_RATIO);
	},660);
	setTimeout(function(){
		game.box_4_3.base().style.display = "";
		game.box_4_3.node().transform().x(327*GAME_RATIO);
		game.box_4_3.node().transform().y(811*GAME_RATIO);
	},710);
	setTimeout(function(){
		game.box_4_4.base().style.display = "";
		game.box_4_4.node().transform().x(469*GAME_RATIO);
		game.box_4_4.node().transform().y(811*GAME_RATIO);
	},760);
	
	setTimeout(function(){
		game.box_1_1.events().AddEventListener(REvent.TOUCH_END, box_1_1_click);
		game.box_1_2.events().AddEventListener(REvent.TOUCH_END, box_1_2_click);
		game.box_1_3.events().AddEventListener(REvent.TOUCH_END, box_1_3_click);
		game.box_1_4.events().AddEventListener(REvent.TOUCH_END, box_1_4_click);
		game.box_2_1.events().AddEventListener(REvent.TOUCH_END, box_2_1_click);
		game.box_2_2.events().AddEventListener(REvent.TOUCH_END, box_2_2_click);
		game.box_2_3.events().AddEventListener(REvent.TOUCH_END, box_2_3_click);
		game.box_2_4.events().AddEventListener(REvent.TOUCH_END, box_2_4_click);
		game.box_3_1.events().AddEventListener(REvent.TOUCH_END, box_3_1_click);
		game.box_3_2.events().AddEventListener(REvent.TOUCH_END, box_3_2_click);
		game.box_3_3.events().AddEventListener(REvent.TOUCH_END, box_3_3_click);
		game.box_3_4.events().AddEventListener(REvent.TOUCH_END, box_3_4_click);
		game.box_4_1.events().AddEventListener(REvent.TOUCH_END, box_4_1_click);
		game.box_4_2.events().AddEventListener(REvent.TOUCH_END, box_4_2_click);
		game.box_4_3.events().AddEventListener(REvent.TOUCH_END, box_4_3_click);
		game.box_4_4.events().AddEventListener(REvent.TOUCH_END, box_4_4_click);
		GAME_MODE = "game";
		GAME_LEVEL = 1;
		TURN_TIMER = 300;
		//game.msg.animation().Play("memorize",false);
	},800);
	
	
}

function box_1_1_click(e){
	if(clickable_1_1){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 1){
				game.box_1_1.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				SG_Hooks.levelUp(GAME_LEVEL, TOTAL_SCORE);
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_1_1.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			game.multiplier.animation().Play(multiplier,false);
			GAME_LEVEL = 1;
		}
		clickable_1_1 = false;
	}
}
function box_1_2_click(e){
	if(clickable_1_2){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 2){
				game.box_1_2.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_1_2.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_1_2 = false;
	}
}
function box_1_3_click(e){
	if(clickable_1_3){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 3){
				game.box_1_3.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_1_3.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_1_3 = false;
	}
}
function box_1_4_click(e){
	if(clickable_1_4){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 4){
				game.box_1_4.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_1_4.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_1_4 = false;
	}
}
function box_2_1_click(e){
	if(clickable_2_1){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 5){
				game.box_2_1.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_2_1.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_2_1 = false;
	}
}
function box_2_2_click(e){
	if(clickable_2_2){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 6){
				game.box_2_2.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_2_2.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_2_2 = false;
	}
}
function box_2_3_click(e){
	if(clickable_2_3){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 7){
				game.box_2_3.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_2_3.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_2_3 = false;
	}
}
function box_2_4_click(e){
	if(clickable_2_4){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 8){
				game.box_2_4.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_2_4.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_2_4 = false;
	}
}
function box_3_1_click(e){
	if(clickable_3_1){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 9){
				game.box_3_1.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_3_1.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_3_1 = false;
	}
}
function box_3_2_click(e){
	if(clickable_3_2){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 10){
				game.box_3_2.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_3_2.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_3_2 = false;
	}
}
function box_3_3_click(e){
	if(clickable_3_3){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 11){
				game.box_3_3.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_3_3.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_3_3 = false;
	}
}
function box_3_4_click(e){
	if(clickable_3_4){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 12){
				game.box_3_4.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_3_4.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_3_4 = false;
	}
}
function box_4_1_click(e){
	if(clickable_4_1){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 13){
				game.box_4_1.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_4_1.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_4_1 = false;
	}
}
function box_4_2_click(e){
	if(clickable_4_2){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 14){
				game.box_4_2.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_4_2.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_4_2 = false;
	}
}
function box_4_3_click(e){
	if(clickable_4_3){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 15){
				game.box_4_3.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_4_3.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_4_3 = false;
	}
}
function box_4_4_click(e){
	if(clickable_4_4){
		var correct = false;
		var index = -1;
		for(var i=0;i<=array_player.length-1;i++){
			if(array_player[i] == 16){
				game.box_4_4.animation().Play("2",false);
				correct = true;
				index = i;
			}
		}
		if(correct){
			STREAK++;
			if( BEST_STREAK < STREAK ) BEST_STREAK = STREAK;
			TOTAL_SCORE = TOTAL_SCORE + (100*multiplier);
			array_player.splice(index,1);
			if(array_player.length==0){
				MSG_DELAY = true;
				PLAYER_TURN = false;
				if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("goodjob",false);
				else game.msg.animation().Play("great",false);
				if(multiplier<5) multiplier++;
				if(GAME_LEVEL<8) GAME_LEVEL++;
				game.multiplier.animation().Play(multiplier,false);
			}
		}
		else{
			STREAK=0;
			game.box_4_4.animation().Play("3",false);
			MSG_DELAY = true;
			PLAYER_TURN = false;
			if(1+Math.floor(Math.random()*2)==1) game.msg.animation().Play("toobad",false);
			else game.msg.animation().Play("whoops",false);
			multiplier = 1;
			GAME_LEVEL = 1;
			game.multiplier.animation().Play(multiplier,false);
		}
		clickable_4_4 = false;
	}
}



/**
Class GamePlayPage
**/
Racoon.Extends(GamePlayPage, RDOMComponent);
function GamePlayPage() {
	RDOMComponent.call(this, "div");
	
	
}

GamePlayPage.prototype.Update = function(delta){
    RDOMComponent.prototype.Update.call(this,delta);
	SoundController.Play(sndBgm);
	
}


/**
Class ScoreScreenPage
**/
Racoon.Extends(ScoreScreenPage, RDOMComponent);
function ScoreScreenPage() {
	RDOMComponent.call(this, "div");
	
	
}



/**
Class TapPrize
**/
Racoon.Extends(TapPrize, RTouchable);
function TapPrize(){
	RTouchable.call(this, "div");
	
	
}

TapPrize.prototype.Update = function(delta){
	RDOMComponent.prototype.Update.call(this,delta);
	
	
	
}
	
TapPrize.prototype.changePrize = function(type){
	this._typePrize = type;
	this._imgPrize.animation().GotoAndStop("prizes",type);
	
	//this.node().transform().pivotX(95 * GAME_RATIO);
	//this.node().transform().pivotY(95 * GAME_RATIO);
	
}

/**
Class Box
**/
Racoon.Extends(Box, RTouchable);
function Box(){
	RTouchable.call(this, "div");
	
	
}

Box.prototype.Update = function(delta){
	RDOMComponent.prototype.Update.call(this,delta);	
}

