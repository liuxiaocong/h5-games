init(3);
function eventStart() {
	setGameSpeed(60, c.style.position = "absolute", fade = 0, backgroundColor = "black");
	fitCanvas(canvasWidth = 320, canvasHeight = 480);
	levels = 15;
	completed = faultLeft = faultUp = faultDown = faultRight = !1;
	stats = {
		levels : [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	};
	stats.moves = stats.time = stats.completed = stats.aced = 0;
	"undefined" !== typeof localStorage.levels && (stats.levels = JSON.parse(localStorage.levels));
	"undefined" !== typeof localStorage.moves && (stats.moves = parseInt(localStorage.moves));
	"undefined" !== typeof localStorage.time && (stats.time =
			parseFloat(localStorage.time));
	"undefined" !== typeof localStorage.completed && (stats.completed = parseInt(localStorage.completed));
	"undefined" !== typeof localStorage.aced && (stats.aced = parseInt(localStorage.aced));
	keyAdd("left", KEY_LEFT);
	keyAdd("right", KEY_RIGHT);
	keyAdd("up", KEY_UP);
	keyAdd("down", KEY_DOWN);
	keyAdd("restart", 82);
	keyAdd("escape", 27);
	keyAdd("space", 13);
	keyAdd("enter", 32);
	LYR_BLOCK = 0;
	LYR_FIN = 1;
	LYR_WALL = 2;
	LYR_BUTTONS = 3;
	backgroundAdd("lsmsg", "assets/graphics/lsmsg.png");
	backgroundSet("lsmsg",
		canvasHeight, canvasWidth, TILENONE);
	backgroundAdd("bg", "assets/graphics/bg.png");
	backgroundSet("bg", canvasWidth, canvasHeight, TILENONE);
	spriteAdd("block", "assets/graphics/block.png");
	spriteAdd("wall", "assets/graphics/wall.png");
	spriteAdd("fin", "assets/graphics/fin.png");
	spriteAdd("buttons", "assets/graphics/buttons.png");
	spriteAdd("title", "assets/graphics/title.png");
	spriteAdd("statsbutton", "assets/graphics/statsbutton.png");
	spriteAdd("footer", "assets/graphics/footer.png");
	spriteAdd("shiftmsg", "assets/graphics/shiftmsg.png");
	spriteAddStrip("levelbutton", "assets/graphics/levelbutton.png", 4);
	objectAdd("block", "block", 0, 0, LYR_BLOCK);
	objectAdd("wall", "wall", 0, 0, LYR_WALL);
	objectAdd("fin", "fin", 0, 0, LYR_FIN);
	objectAdd("buttons", "buttons", 0, 0, LYR_BUTTONS);
	objectAdd("shiftmsg", "shiftmsg", 0, 0, LYR_BUTTONS);
	objectAdd("levelbutton", "levelbutton", 0, 0, LYR_BLOCK);
	room = "preloader";
	loadPercent = 0;
	load = sprites.length + loops.length + sounds.length + backgrounds.length
}
function eventStep() {
	if (!getLandscape())
		if (stats.time += 0 >= fps ? 0 : 1 / (60 * fps), "stats" == room && (mouseStatus == PRESSED || keyValue("space") == PRESSED || keyValue("enter") == PRESSED))
			fade = 1, room = "menu";
		else if ("menu" == room) {
			if (pointInRect(104, 332, 216, 380, mouseX, mouseY) && mouseStatus == PRESSED && (instancesClear(), localStorage.time = stats.time, fade = 1, room = "stats"), "menu" == room) {
				var b = 0;
				a : for (; 3 > b; b++)
					for (var d = 0; 5 > d; d++) {
						if (15 > instanceCount("levelbutton")) {
							var e = instances[instanceAdd(16 + 64 * d, 144 + 64 * b, "levelbutton")];
							e.imageSpeed = 0;
							e.lev = 5 * b + d + 1;
							e.imageFrame = stats.levels[5 * b + d]
						}
						if (mouseStatus == PRESSED && 0 < stats.levels[5 * b + d] && pointInRect(8 + 64 * d, 136 + 64 * b, 56 + 64 * d, 184 + 64 * b, mouseX, mouseY)) {
							instancesClear();
							room = "game";
							level = 5 * b + d + 1;
							loadLevel();
							break a
						}
					}
			}
			
			if("stats" == room) 
		      dp_Ranking(); //打开排行榜	
			
		} else if ("game" == room) {
			if (faultLeft) {
				d = 0;
				for (e = instances.length; d < e; d++)
					"block" == instances[d].name && instances[d].x == instances[d].tx && (instances[d].tx += 8, faultLeft = !1)
			} else if (faultRight) {
				d = 0;
				for (e = instances.length; d < e; d++)
					"block" == instances[d].name && instances[d].x ==
					instances[d].tx && (instances[d].tx -= 8, faultRight = !1)
			} else if (faultUp) {
				d = 0;
				for (e = instances.length; d < e; d++)
					"block" == instances[d].name && instances[d].y == instances[d].ty && (instances[d].ty += 8, faultUp = !1)
			} else if (faultDown) {
				d = 0;
				for (e = instances.length; d < e; d++)
					"block" == instances[d].name && instances[d].y == instances[d].ty && (instances[d].ty -= 8, faultDown = !1)
			}
			if (keyValue("restart") == PRESSED || pointInRect(182, 344, 246, 394, mouseX, mouseY) && mouseStatus == PRESSED)
				instancesClear(), localStorage.moves = stats.moves, loadLevel();
			if (keyValue("escape") == PRESSED || pointInRect(250, 344, 304, 392, mouseX, mouseY) && mouseStatus == PRESSED)
				instancesClear(), localStorage.moves = stats.moves, localStorage.time = stats.time, fade = 1, room = "menu";
			b = !1;
			d = 0;
			for (e = instances.length; d < e && !("block" == instances[d].name && (b = !(instances[d].tx == instances[d].x && instances[d].ty == instances[d].y))); d++);
			if (!b && !completed)
				if (d = !1, keyValue("left") == PRESSED || pointInRect(16, 344, 60, 392, mouseX, mouseY) && mouseStatus == PRESSED) {
					b = 0;
					for (e = instances.length; b < e; b++)
						if ("block" ==
							instances[b].name && (0 >= instances[b].x && (d = !0), !d))
							for (var f = 0; f < e; f++)
								"wall" == instances[f].name && (instances[f].x == instances[b].x - 32 && instances[f].y == instances[b].y) && (d = !0);
					if (d) {
						b = 0;
						for (e = instances.length; b < e; b++)
							"block" == instances[b].name && (instances[b].tx -= 8);
						faultLeft = !0
					} else {
						b = 0;
						for (e = instances.length; b < e; b++)
							"block" == instances[b].name && (instances[b].tx -= 32);
						moves++;
						stats.moves++
					}
				} else if (keyValue("right") == PRESSED || pointInRect(116, 344, 160, 392, mouseX, mouseY) && mouseStatus == PRESSED) {
					b = 0;
					for (e =
							instances.length; b < e; b++)
						if ("block" == instances[b].name && (288 <= instances[b].x && (d = !0), !d))
							for (f = 0; f < e; f++)
								"wall" == instances[f].name && (instances[f].x == instances[b].x + 32 && instances[f].y == instances[b].y) && (d = !0);
					if (d) {
						b = 0;
						for (e = instances.length; b < e; b++)
							"block" == instances[b].name && (instances[b].tx += 8);
						faultRight = !0
					} else {
						b = 0;
						for (e = instances.length; b < e; b++)
							"block" == instances[b].name && (instances[b].tx += 32);
						moves++;
						stats.moves++
					}
				} else if (keyValue("up") == PRESSED || pointInRect(64, 320, 112, 364, mouseX, mouseY) &&
					mouseStatus == PRESSED) {
					b = 0;
					for (e = instances.length; b < e; b++)
						if ("block" == instances[b].name && (0 >= instances[b].y && (d = !0), !d))
							for (f = 0; f < e; f++)
								"wall" == instances[f].name && (instances[f].y == instances[b].y - 32 && instances[f].x == instances[b].x) && (d = !0);
					if (d) {
						b = 0;
						for (e = instances.length; b < e; b++)
							"block" == instances[b].name && (instances[b].ty -= 8);
						faultUp = !0
					} else {
						b = 0;
						for (e = instances.length; b < e; b++)
							"block" == instances[b].name && (instances[b].ty -= 32);
						moves++;
						stats.moves++
					}
				} else if (keyValue("down") == PRESSED || pointInRect(64,
						372, 112, 416, mouseX, mouseY) && mouseStatus == PRESSED) {
					b = 0;
					for (e = instances.length; b < e; b++)
						if ("block" == instances[b].name && (288 <= instances[b].y && (d = !0), !d))
							for (f = 0; f < e; f++)
								"wall" == instances[f].name && (instances[f].y == instances[b].y + 32 && instances[f].x == instances[b].x) && (d = !0);
					if (d) {
						b = 0;
						for (e = instances.length; b < e; b++)
							"block" == instances[b].name && (instances[b].ty += 8);
						faultDown = !0
					} else {
						b = 0;
						for (e = instances.length; b < e; b++)
							"block" == instances[b].name && (instances[b].ty += 32);
						moves++;
						stats.moves++
					}
				}
			b = !0;
			d = 0;
			for (e = instances.length; d <
				e; d++)
				if ("block" == instances[d].name && (instances[d].x != instances[d].tx || instances[d].y != instances[d].ty)) {
					b = !1;
					break
				}
			if (b && 0 < instanceCount("block") && !completed) {
				f = !0;
				d = 0;
				for (e = instances.length; d < e; d++)
					if (f && "block" == instances[d].name) {
						f = !1;
						b = 0;
						for (e = instances.length; b < e; b++)
							if ("fin" == instances[b].name && instances[b].x == instances[d].x && instances[b].y == instances[d].y) {
								f = !0;
								break
							}
					}
				f && (completed = !0, gameComplete = 1 > (stats.completed + stats.aced) / (2 * levels), e = stats.levels[level - 1], moves > aceMoves ? 2 > e && (stats.levels[level -
							1] = 2, stats.completed++) : (2 > e && stats.completed++, 3 > e && (stats.levels[level - 1] = 3, stats.aced++)), level < levels && 0 == stats.levels[level] && (stats.levels[level] = 1), localStorage.levels = JSON.stringify(stats.levels), localStorage.moves = stats.moves, localStorage.time = stats.time, localStorage.completed = stats.completed, localStorage.aced = stats.aced)
							
				if(completed){ 
                  var score1 = 100-(moves-aceMoves);
				  if(score1<0) score1 = 0;
				  updateShareScore(level);
				  //dp_submitScore(level,score1);//上传提交分数
				}				
			}
		}
}
function eventDraw() {
	"preloader" == room && preload("white", "menu", 0.02);
	if (getLandscape())
		backgroundImage = "lsmsg", fadeOut(0.02);
	else if ("preloader" != room && window.innerWidth > window.innerHeight && 0 < device)
		backgroundImage = "lsmsg", fadeOut(0.02);
	else {
		if ("game" == room || "menu" == room || "stats" == room)
			backgroundImage = "bg", "menu" == room ? (spriteDrawExt("title", 0, 0, 0, 0, 0, 1, 1, 0, 0.8), spriteDraw("statsbutton", 112, 336), cxt.fillStyle = "black", cxt.textAlign = "center", cxt.textBaseline = "middle", cxt.font = "bold 12px sans-serif",
				cxt.fillText("", 0, 0)) : spriteDrawExt("footer", 0, 416, 0, 0, 0, 1, 1, 0, 0.8);
		if ("game" == room){
			if (completed) { 
				var b = moves <= aceMoves;
				cxt.fillStyle = "rgba(0, 0, 0, 0.8)";
				cxt.textAlign = "center";
				cxt.textBaseline = "top";
				cxt.font = "bold 24px sans-serif";
				cxt.fillText("任务 " + (b ? "最佳" : "完成") + "!", 160, 160);
				cxt.fillText(moves + " 步" + (b ? "" : " (" + aceMoves + " 最佳)"), 160, 184);
				1 == (stats.completed + stats.aced) / (2 * levels) && gameComplete && cxt.fillText("游戏完成!", 160, 232);
				if (mouseStatus == PRESSED || keyValue("space") ==
					PRESSED || keyValue("enter") == PRESSED)
					level < levels ? (instancesClear(), level++, loadLevel()) : (instancesClear(), fade = 1, room = "menu")
			} else
				3 >= level && (cxt.fillStyle = "rgba(0, 0, 0, 0.8)", cxt.textAlign = "right", cxt.textBaseline = "top", cxt.font = "bold 14px sans-serif", 1 == level ? (cxt.fillText("移动蓝色方块", 288, 32), cxt.fillText("到目标位置", 288, 50)) : 2 == level ? (cxt.textAlign = "center", cxt.fillText("同步移动蓝色方块", 160, 32)) : (cxt.fillText("棕色方块", 288, 32), cxt.fillText("阻碍你的路",
							288, 50)));
		}				
		/*
		"stats" == room && (cxt.fillStyle = "rgba(0, 0, 0, 0.8)", cxt.textAlign = "center", cxt.textBaseline = "top", cxt.font = "bold 18px sans-serif", cxt.fillText("总步数: " + stats.moves, 160, 96), cxt.fillText("任务完成: " + stats.completed + "/" + levels, 160, 144), cxt.fillText("任务最佳: " + stats.aced + "/" + levels, 160, 192), cxt.fillText("游戏完成: " + Math.round(100 * (stats.completed + stats.aced) / (2 * levels)) + "%", 160, 240), cxt.fillText("游戏总时间: " + Math.floor(stats.time) + (1 == Math.floor(stats.time) ?
					" min." : " mins."), 160, 288));*/ 
					
		("game" == room || "menu" == room || "stats" == room) && fadeOut(0.02)
		

	}
}
function objectEventCreate(b) {
	b = instances[b];
	"shiftmsg" == b.name ? alphadown = !0 : "block" == b.name && (b.tx = b.x, b.ty = b.y)
}
function objectEventStep(b) {
	if (!getLandscape()) {
		var d = instances[b];
		"shiftmsg" == d.name ? (d.alpha += alphadown ? -0.05 : 0.05, 0 >= d.alpha ? (d.alpha = 0, alphadown = !1) : 1 <= d.alpha && (alphadown = !0, d.alpha = 1)) : "block" == d.name && (d.tx > d.x ? d.x += 4 : d.tx < d.x ? d.x -= 4 : d.ty > d.y ? d.y += 4 : d.ty < d.y && (d.y -= 4));
		if (completed && ("block" == d.name || "wall" == d.name || "fin" == d.name || "shiftmsg" == d.name))
			d.alpha -= 0.05, 0 > d.alpha && (d.alpha = 0, instanceDestroy(b))
	}
}
function objectEventDraw(b) {
	getLandscape() || (b = instances[b], "preloader" == b.name ? preload("white", "menu", 0.02) : "levelbutton" == b.name && (cxt.textAlign = "center", cxt.textBaseline = "middle", cxt.font = "bold 12px sans-serif", cxt.fillStyle = 0 < stats.levels[b.lev - 1] ? 1 < stats.levels[b.lev - 1] ? "black" : "white" : "grey", cxt.fillText(b.lev, b.x + 16, b.y + 16)))
}
function particleEventDraw() {
	getLandscape()
}
function loadLevel() {
	if (1 == level) {
		aceMoves = 6;
		var b = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
		instanceAdd(0, 320, "shiftmsg")
	} else
		2 == level ? (aceMoves = 6, b = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 3, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 3, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0,
					0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]) : 3 == level ? (aceMoves = 14, b = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 2, 2, 0, 0, 0, 0, 0, 0, 0], [0, 3, 2, 2, 2, 0, 0, 0, 0, 0], [0, 0, 3, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 3, 0, 0, 0, 0, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0]]) : 4 == level ? (aceMoves = 16, b = [[0, 0, 2, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 2, 1, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 2, 2, 0, 1, 0], [0, 0, 2, 0, 0, 0, 2, 0, 0, 0], [0, 0, 3, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 3, 0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 3, 0, 2, 0, 0, 0, 0]]) : 5 == level ? (aceMoves = 23, b = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 3, 0, 0, 3, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 2, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 2, 0, 0], [0, 0, 2, 0, 2, 2, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 2, 0, 0, 0, 2, 2, 2], [0, 0, 0, 1, 0, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]) : 6 == level ? (aceMoves = 27, b = [[3, 0, 3, 0, 0, 0, 0, 0, 0, 0], [2, 2, 0, 0, 2, 0, 0, 0, 0, 0], [3, 0, 3, 0, 0, 0, 0, 0, 0, 2], [0, 0, 1, 0, 1, 2, 0, 2, 0, 0], [0, 0, 2, 0, 0, 2, 0, 0, 0, 0], [0, 0, 1, 0, 1, 2, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 2, 0,
					0, 2, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]) : 7 == level ? (aceMoves = 30, b = [[0, 2, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 0], [0, 0, 0, 2, 0, 2, 1, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [2, 2, 2, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 2, 0, 0, 2, 0, 0, 0], [2, 0, 0, 0, 0, 2, 2, 2, 0, 0], [0, 3, 3, 0, 0, 0, 0, 0, 0, 0], [0, 3, 2, 0, 0, 0, 0, 0, 0, 2]]) : 8 == level ? (aceMoves = 21, b = [[0, 1, 0, 0, 0, 2, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 2, 0, 0, 0], [0, 0, 2, 0, 0, 0, 2, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 2, 2, 2, 0, 0, 0], [0, 0, 0, 2, 0, 3, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 2, 0, 0, 2, 0], [0, 0, 2, 0, 2, 2, 2,
					0, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0]]) : 9 == level ? (aceMoves = 24, b = [[0, 0, 0, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 2, 0, 0], [0, 0, 3, 0, 0, 0, 0, 0, 1, 0], [0, 0, 2, 0, 0, 3, 2, 0, 2, 0], [0, 0, 0, 0, 2, 0, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 0, 0, 2, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0]]) : 10 == level ? (aceMoves = 13, b = [[0, 0, 0, 0, 3, 2, 0, 0, 0, 0], [0, 2, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0, 0], [3, 0, 2, 0, 2, 0, 2, 0, 0, 0], [0, 0, 0, 0, 0, 2, 0, 0, 0, 2], [0, 0, 2, 0, 2, 0, 1, 2, 0, 0], [0, 2, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 2, 0, 0, 2, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 2, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 2]]) : 11 == level ? (aceMoves = 28, b = [[0, 0, 0, 0, 0, 0, 0, 3, 0, 0], [0, 2, 0, 0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 2, 0, 2, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 2, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0, 3, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 2, 0, 0, 0, 2, 2, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 2, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 2, 0, 0, 0, 0]]) : 12 == level ? (aceMoves = 17, b = [[0, 0, 0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 2, 0, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 0, 1, 0, 0], [0, 0, 0, 0, 3, 0, 0, 0, 0, 2], [0, 0, 2, 0, 0, 3, 0, 0, 0, 1], [0, 0, 0, 0, 2, 2, 0, 0, 2, 0], [0, 0, 2, 0, 3, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0,
					0, 0, 0, 0, 3, 2, 0, 0]]) : 13 == level ? (aceMoves = 15, b = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0, 0], [2, 0, 2, 0, 0, 0, 0, 2, 1, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 2], [0, 2, 2, 0, 0, 0, 2, 0, 2, 0], [0, 0, 3, 0, 2, 0, 0, 0, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 2, 0, 2, 3, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]) : 14 == level ? (aceMoves = 18, b = [[0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 3, 3, 0, 0, 0, 0], [0, 0, 2, 0, 0, 2, 2, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 0, 0, 3, 1, 1, 3, 0, 2, 0], [0, 2, 0, 0, 0, 2, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 2, 0, 0, 0, 2, 0, 0, 0], [0, 0, 0, 1, 0,
					0, 1, 2, 0, 0]]) : 15 == level && (aceMoves = 13, b = [[0, 0, 0, 1, 0, 0, 0, 0, 0, 0], [0, 1, 2, 0, 0, 0, 0, 2, 0, 0], [2, 0, 0, 2, 1, 2, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0, 0, 0, 3, 0], [2, 0, 0, 1, 0, 0, 3, 0, 0, 0], [0, 0, 2, 0, 0, 0, 0, 0, 0, 3], [0, 0, 0, 0, 0, 3, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0, 2, 3, 0]]);
	fade = 1;
	localStorage.time = stats.time;
	completed = !1;
	moves = 0;
	instances[instanceAdd(0, 320, "buttons")].alpha = 0.8;
	for (var d = 0, e = b.length; d < e; d++)
		for (var f = 0, g = b[d].length; f < g; f++)
			1 == b[d][f] ? instanceAdd(32 * f, 32 * d, "block") : 2 == b[d][f] ? instanceAdd(32 *
				f, 32 * d, "wall") : 3 == b[d][f] && instanceAdd(32 * f, 32 * d, "fin")
}
function init(b) {
	canvasId = "gameCanvas";
	soundId = "soundSpan";
	var d = navigator.userAgent.toLowerCase();
	device = /ip(hone|od)/i.test(d) ? 1 : /android/i.test(d) ? 2 : /blackberry/i.test(d) ? 3 : /ipad/i.test(d) ? 4 : !/mob/i.test(d) ? 0 : 5;
	window.onload = function () {
		0 < device && hideAddressBar(!0, b)
	};
	window.onresize = function () {
		fitCanvas(canvasWidth, canvasHeight);
		0 < device && hideAddressBar(!1)
	};
	window.onorientationchange = function () {
		fitCanvas(canvasWidth, canvasHeight);
		hideAddressBar(!1, fade = 1)
	};
	window.ontouchmove = function (b) {
		b.preventDefault()
	}
}
function setScale(b, d) {
	xscale = parseInt(c.style.width) / b;
	yscale = parseInt(c.style.height) / d;
	c.width = b;
	c.height = d
}
function getResizeRatio(b, d, e, f) {
	b = e / b;
	d = f / d;
	return b <= d ? b : d
}
function getResizeDimensions(b, d, e, f) {
	e = getResizeRatio(b, d, e, f);
	return {
		width : Math.round(b * e),
		height : Math.round(d * e)
	}
}
function fitCanvas(b, d) {
	var e = window.innerWidth,
	f = window.innerHeight,
	g = getResizeDimensions(0 < device && e > f ? d : b, 0 < device && e > f ? b : d, e, 1 == device && e < f ? e * (d / b) : f);
	c.style.width = g.width + "px";
	c.style.height = g.height + "px";
	setScale(0 < device && e > f ? d : b, 0 < device && e > f ? b : d);
	c.style.top = 1 == device && e < f ? "0" : (f - g.height) / 2 + "px";
	c.style.left = (e - g.width) / 2 + "px"
}
function getLandscape() {
	return "preloader" != room && window.innerWidth > window.innerHeight && 0 < device
}
function fadeOut(b) {
	0 < fade && (cxt.fillStyle = "rgba(0, 0, 0, " + fade + ")", cxt.fillRect(0, 0, c.width, c.height, fade -= b))
}
function mobileDebug(b) {
	cxt.fillStyle = b;
	cxt.textAlign = "left";
	cxt.textBaseline = "alphabetic";
	cxt.font = "bold 12px sans-serif";
	cxt.fillText("FPS: " + fps + " / " + Math.round(1E3 / gamespeed), 12, 20);
	cxt.fillText("Mouse: (" + Math.round(mouseX) + ", " + Math.round(mouseY) + ")  Status: " + mouseStatus, 12, 36);
	cxt.fillText("Device: " + (0 == device ? "Desktop" : 1 == device || 4 == device ? "iOS" : 2 == device ? "Android" : 3 == device ? "Blackberry" : "Mobile"), 12, 52)
}
function preload(b, d, e) {
	for (var f = 0, g = 0; g < sprites.length; g++)
		spriteLoaded(sprites[g].name) && f++;
	for (g = 0; g < backgrounds.length; g++)
		backgroundLoaded(backgrounds[g].name) && f++;
	for (g = 0; g < sounds.length; g++)
		soundLoaded(sounds[g].name) && f++;
	for (g = 0; g < loops.length; g++)
		loopLoaded(loops[g].name) && f++;
	loadPercent < f / load && (loadPercent += e);
	cxt.fillStyle = b;
	fillRect(0, c.height / 2 - 16, c.width * loadPercent, c.height / 2 + 16);
	cxt.textAlign = "center";
	cxt.font = "bold 30px sans-serif";
	cxt.textBaseline = "alphabetic";
	cxt.fillText("加载中...",
		c.width / 2, c.height / 2 - 16);
	1 <= loadPercent && instancesClear(fade = 1, room = d)
}
function hideAddressBar(b, d) {
	document.documentElement.scrollHeight < window.outerHeight / window.devicePixelRatio && (document.documentElement.style.height = window.outerHeight / window.devicePixelRatio + "px");
	setTimeout(window.scrollTo(0, 2 == device ? 1 : 0), 0);
	b && setTimeout("hideAddressBar(true, " + d + ")", 1E3 * d)
};
window.addEventListener("load", engineStart);
document.addEventListener("mousemove", getMouseCoordinates, !1);
document.addEventListener("keydown", keyPress);
document.addEventListener("keypress", keyPress);
document.addEventListener("keyup", keyRelease);
CLVERSION = 1.02;
RELEASED = -1;
DORMANT = 0;
HELD = 1;
PRESSED = 2;
KEY_LEFT = 37;
KEY_UP = 38;
KEY_RIGHT = 39;
KEY_DOWN = 40;
KEY_SPACE = 32;
NOONE = -1;
NONE = "none";
TILENONE = 0;
TILEX = 1;
TILEY = 2;
TILEBOTH = 3;
function irandom(b) {
	return Math.round(b * Math.random())
}
function irandomRange(b, d) {
	return b + Math.round((d - b) * Math.random())
}
function sign(b) {
	return 0 == b ? 0 : 0 > b ? -1 : 1
}
function pointDistance(b, d, e, f) {
	return Math.round(Math.sqrt(Math.pow(e - b, 2) + Math.pow(f - d, 2)))
}
function pointDirection(b, d, e, f, g) {
	void 0 == g && (g = 0);
	var h = Math.round(360 - 180 * (Math.atan((f - d) / (e - b)) / Math.PI));
	e < b && (h -= 180);
	for (0 > h && (h += 359); 360 <= h; )
		h -= 360;
	return b == e && d == f ? g : h
}
function angleDifference(b, d) {
	return ((b - d) % 360 + 540) % 360 - 180
}
function lengthDirX(b, d) {
	return b * Math.cos(d * Math.PI / 180)
}
function lengthDirY(b, d) {
	return -b * Math.sin(d * Math.PI / 180)
}
function choose() {
	return arguments[irandom(arguments.length - 1)]
}
function colorRandom(b, d) {
	return "rgb(" + irandomRange(b, d) + "," + irandomRange(b, d) + "," + irandomRange(b, d) + ")"
}
function colorMakeRGB(b, d, e) {
	return "rgb(" + b + "," + d + "," + e + ")"
}
function colorMakeHSL(b, d, e) {
	return "hsl(" + b + "," + Math.round(d) + "%," + Math.round(e) + "%)"
}
function colorMakeHSV(b, d, e) {
	var f = d / 255,
	d = e / 255;
	if (0 == f)
		f = d = e;
	else {
		var g = 6 * (b / 255);
		6 == g && (g = 0);
		var e = Math.floor(g),
		b = d * (1 - f),
		h = d * (1 - f * (g - e)),
		f = d * (1 - f * (1 - (g - e)));
		0 == e ? (var_r = d, var_g = f, var_b = b) : 1 == e ? (var_r = h, var_g = d, var_b = b) : 2 == e ? (var_r = b, var_g = d, var_b = f) : 3 == e ? (var_r = b, var_g = h, var_b = d) : 4 == e ? (var_r = f, var_g = b, var_b = d) : (var_r = d, var_g = b, var_b = h);
		d = Math.round(255 * var_r);
		f = Math.round(255 * var_g);
		e = Math.round(255 * var_b)
	}
	return "rgb(" + d + "," + f + "," + e + ")"
}
function randomColor(b, d) {
	return "#" + (b + irandom(d - b)) + (b + irandom(d - b)) + (b + irandom(d - b))
}
function clearCanvas() {
	cxt.clearRect(0, 0, c.width, c.height)
}
function alarmSet(b, d) {
	setTimeout(b, d * gamespeed)
}
function setFPS() {
	!0 == debugPlaying && (fps = sts);
	sts = 0
}
function setGamespeed(b) {
	gamespeed = b;
	clearInterval(stepInterval);
	stepInterval = setInterval("engineStep()", gamespeed)
}
function setGameSpeed(b) {
	gamespeed = 1E3 / b;
	clearInterval(stepInterval);
	stepInterval = setInterval("engineStep()", gamespeed)
}
function sortDepth(b, d) {
	return d.depth - b.depth
}
function getMouseCoordinates(b) {
	void 0 != b.pageX && void 0 != b.pageY ? (trueMouseX = b.pageX, trueMouseY = b.pageY) : (trueMouseX = b.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, trueMouseY = b.clientY + document.body.scrollTop + document.documentElement.scrollTop);
	trueMouseX -= c.offsetLeft;
	trueMouseY -= c.offsetTop;
	if (0 > trueMouseX || trueMouseX > parseInt(c.style.width) || 0 > trueMouseY || trueMouseY > parseInt(c.style.height))
		mouseStatus = -1
}
function mouseClick() {
	mouseStatus = 2
}
function mouseRelease() {
	mouseStatus = -1
}
function mouseUpdate() {
	mouseX = (trueMouseX + cameraX) / xscale;
	mouseY = (trueMouseY + cameraY) / yscale;
	2 == mouseStatus && (mouseStatus = 1);
	-1 == mouseStatus && (mouseStatus = 0)
}
function keyAdd(b, d) {
	var e = keys.length;
	keys[e] = {};
	keys[e].keycode = d;
	keys[e].status = 0;
	keys[e].name = b
}
function keyPress(b) {
	for (var b = window.event ? event : b, b = b.charCode ? b.charCode : b.keyCode, d = 0; d < keys.length; )
		b == keys[d].keycode && 0 >= keys[d].status && (keys[d].status = 2), d++;
	keyLastPressed = b;
	!0 == debug && 192 == b && debugToggle()
}
function keyRelease(b) {
	for (var b = window.event ? event : b, b = b.charCode ? b.charCode : b.keyCode, d = 0; d < keys.length; )
		b == keys[d].keycode && 1 <= keys[d].status && (keys[d].status = -1), d++;
	keyLastReleased = b
}
function keyUpdate() {
	for (var b = 0; b < keys.length; )
		 - 1 == keys[b].status ? keys[b].status = 0 : 2 == keys[b].status && (keys[b].status = 1), b++
}
function keyStatus(b) {
	for (var d = 0; d < keys.length; ) {
		if (keys[d].name == b)
			return keys[d].status;
		d++
	}
}
function keyValue(b) {
	for (var d = 0; d < keys.length; ) {
		if (keys[d].name == b)
			return keys[d].status;
		d++
	}
}
function keyCheck(b) {
	for (var d = 0; d < keys.length; ) {
		if (keys[d].name == b)
			return 0 >= keys[d].status ? 0 : 1;
		d++
	}
}
function keyChange(b, d) {
	for (var e = 0; e < keys.length; )
		keys[e].name == b && (keys[e].status = 0, keys[e].keycode = d), e++
}
function touchStart(b) {
	touches = b.touches;
	touchUpdate(2)
}
function touchMove(b) {
	touches = b.touches;
	touchUpdate(1)
}
function touchEnd(b) {
	touches = b.touches;
	touchUpdate(-1)
}
function touchUpdate(b) {
	-1 != b && (trueMouseX = touches[0].pageX + document.body.scrollLeft + document.documentElement.scrollLeft - c.offsetLeft, trueMouseY = touches[0].pageY + document.body.scrollTop + document.documentElement.scrollTop - c.offsetTop);
	mouseStatus = b
}
function spriteAdd(b, d) {
	var e = sprites.length;
	sprites[e] = new Image;
	sprites[e].name = b;
	sprites[e].src = d;
	sprites[e].frames = 1
}
function spriteAddStrip(b, d, e) {
	var f = sprites.length;
	sprites[f] = new Image;
	sprites[f].name = b;
	sprites[f].src = d;
	sprites[f].frames = e
}
function spriteLoaded(b) {
	return spriteGet(b).complete
}
function spriteGet(b) {
	for (var d = 0; d < sprites.length; ) {
		if (sprites[d].name == b)
			return sprites[d];
		d++
	}
}
function spriteSetColorRGB(b, d, e, f) {
	for (w = 0; w < sprites.length; w++)
		if (sprites[w].name == b) {
			alert(w);
			var g = sprites[w].data
		}
	for (var h = 0, j = g.length; h < j; h += 4)
		g[h] = d, g[h + 1] = e, g[h + 2] = f;
	alert(g);
	for (w = 0; w < sprites.length; w++)
		sprites[w].name == b && (sprites[w].data = g)
}
function spriteSetColorHSV(b, d, e, f) {
	d /= 255;
	e /= 255;
	f /= 255;
	if (0 == e)
		e = Math.round(255 * f), d = Math.round(255 * f), f = Math.round(255 * f);
	else {
		var g = 6 * d;
		6 == g && (g = 0);
		var d = Math.floor(g),
		h = f * (1 - e),
		j = f * (1 - e * (g - d)),
		e = f * (1 - e * (1 - (g - d)));
		0 == d ? (var_r = f, var_g = e, var_b = h) : 1 == d ? (var_r = j, var_g = f, var_b = h) : 2 == d ? (var_r = h, var_g = f, var_b = e) : 3 == d ? (var_r = h, var_g = j, var_b = f) : 4 == d ? (var_r = e, var_g = h, var_b = f) : (var_r = f, var_g = h, var_b = j);
		e = Math.round(255 * var_r);
		d = Math.round(255 * var_g);
		f = Math.round(255 * var_b)
	}
	for (w = 0; w < sprites.length; w++)
		if (sprites[w].name ==
			b)
			var i = sprites[w].data;
	h = 0;
	for (j = i.length; h < j; h += 4)
		i[h] = e, i[h + 1] = d, i[h + 2] = f;
	for (w = 0; w < sprites.length; w++)
		sprites[w].name == b && (sprites[w] = i)
}
function spriteDraw(b, d, e) {
	b = spriteGet(b);
	cxt.drawImage(b, 0, 0, b.width / b.frames, b.height, d - cameraX, e - cameraY, b.width, b.height)
}
function spriteDrawExt(b, d, e, f, g, h, j, i, l, m) {
	var b = spriteGet(b),
	n = cxt.globalAlpha;
	cxt.globalAlpha = m;
	cxt.save();
	cxt.translate(d - cameraX + b.width / b.frames * j / 2, e - cameraY + b.height * i / 2);
	cxt.rotate( - (l / (180 / Math.PI)));
	cxt.translate( - (d - cameraX + b.width / b.frames * j / 2),  - (e - cameraY + b.height * i / 2));
	cxt.drawImage(b, f * (b.width / b.frames), 0, b.width / b.frames, b.height, d - g - cameraX, e - h - cameraY, b.width / b.frames * j, b.height * i);
	cxt.restore();
	cxt.globalAlpha = n
}
function spriteDrawAngle(b, d, e, f) {
	cxt.save();
	b = spriteGet(b);
	cxt.translate(d - cameraX + b.width / b.frames / 2, e - cameraY + b.height / 2);
	cxt.rotate( - (f / (180 / Math.PI)));
	cxt.translate( - (d - cameraX + b.width / b.frames / 2),  - (e - cameraY + b.height / 2));
	cxt.drawImage(b, 0, 0, b.width / b.frames, b.height, d - cameraX, e - cameraY, b.width / b.frames, b.height);
	cxt.restore()
}
function spriteDrawAngleScaled(b, d, e, f, g, h) {
	cxt.save();
	b = spriteGet(b);
	cxt.translate(d - cameraX + b.width / b.frames * f / 2, e - cameraY + b.height * g / 2);
	cxt.rotate( - (h / (180 / Math.PI)));
	cxt.translate( - (d - cameraX + b.width / b.frames * f / 2),  - (e - cameraY + b.height * g / 2));
	cxt.drawImage(b, 0, 0, b.width / b.frames, b.height, d - cameraX, e - cameraY, b.width / b.frames * f, b.height * g);
	cxt.restore()
}
function spriteDrawAngleAtPoint(b, d, e, f, g, h) {
	cxt.save();
	b = spriteGet(b);
	cxt.translate(d - f, e - g);
	cxt.rotate( - ((h - 90) / (180 / Math.PI)));
	cxt.translate( - (d - (b.width - f)),  - (e - (b.height - g)));
	cxt.drawImage(b, d - f, e - g);
	cxt.restore()
}
function objectAdd(b, d, e, f, g) {
	var h = objects.length;
	objects[h] = {};
	objects[h].name = b;
	objects[h].sprite = d;
	objects[h].alpha = 1;
	objects[h].xoffset = e;
	objects[h].yoffset = f;
	objects[h].xscale = 1;
	objects[h].yscale = 1;
	objects[h].friction = 0;
	objects[h].width = 0;
	objects[h].height = 0;
	objects[h].depth = g;
	objects[h].mask = 0;
	objects[h].maskX = 0;
	objects[h].maskY = 0;
	objects[h].imageSpeed = 1
}
function objectAddExt(b, d, e, f, g, h, j, i, l, m, n, o) {
	var k = objects.length;
	objects[k] = {};
	objects[k].name = b;
	objects[k].sprite = d;
	objects[k].alpha = g;
	objects[k].xoffset = h;
	objects[k].yoffset = j;
	objects[k].xscale = i;
	objects[k].yscale = l;
	objects[k].friction = m;
	objects[k].width = e;
	objects[k].height = f;
	objects[k].mask = n;
	objects[k].maskX = 0;
	objects[k].maskY = 0;
	objects[k].depth = o;
	objects[k].imageSpeed = 1
}
function objectGet(b) {
	for (var d = 0; d < objects.length; ) {
		if (objects[d].name == b)
			return d;
		d++
	}
}
function instanceAdd(b, d, e) {
	var f = instances.length,
	g = objectGet(e);
	instances[f] = {};
	instances[f].id = f;
	instances[f].active = !0;
	instances[f].name = e;
	instances[f].x = b;
	instances[f].y = d;
	instances[f].maskX = 0;
	instances[f].maskY = 0;
	instances[f].hspeed = 0;
	instances[f].vspeed = 0;
	instances[f].xoffset = objects[g].xoffset;
	instances[f].yoffset = objects[g].yoffset;
	instances[f].xscale = objects[g].xscale;
	instances[f].yscale = objects[g].yscale;
	instances[f].friction = objects[g].friction;
	instances[f].alpha = objects[g].alpha;
	instances[f].sprite =
		objects[g].sprite;
	instances[f].width = objects[g].width;
	instances[f].height = objects[g].height;
	instances[f].depth = objects[g].depth;
	instances[f].imageFrame = 0;
	instances[f].imageSpeed = objects[g].imageSpeed;
	instances[f].imageAngle = 0;
	objectEventCreate(f);
	return f
}
function instanceExists(b) {
	for (var d = 0; d < instances.length; ) {
		if (instances[d].name == b)
			return !0;
		d++
	}
	return !1
}
function instanceCount(b) {
	for (var d = 0, e = 0; d < instances.length; )
		instances[d].name == b && e++, d++;
	return e
}
function instanceFind(b, d) {
	for (var e = 0, f = 0; e < instances.length; ) {
		if (instances[e].name == b && (f++, f == d))
			return e;
		e++
	}
	return -1
}
function instanceDestroy(b) {
	instances.splice(b, 1);
	for (x = 0; x < instances.length; x++)
		instances[x].id = x
}
function instancesClear() {
	instances.splice(0, instances.length)
}
function backgroundAdd(b, d) {
	var e = backgrounds.length;
	backgrounds[e] = new Image;
	backgrounds[e].name = b;
	backgrounds[e].src = d;
	backgrounds[e].tile = 0
}
function backgroundGet(b) {
	for (var d = 0; d < backgrounds.length; ) {
		if (backgrounds[d].name == b)
			return d;
		d++
	}
}
function backgroundSet(b, d, e, f) {
	b = backgroundGet(b);
	-1 != d && (backgrounds[b].width = d);
	-1 != e && (backgrounds[b].height = e);
	backgrounds[b].tile = f
}
function backgroundLoaded(b) {
	b = backgroundGet(b);
	return backgrounds[b].complete
}
function particleTypeAdd(b, d, e, f, g, h, j) {
	var i = particleTypes.length;
	particleTypes[i] = {};
	particleTypes[i].name = b;
	particleTypes[i].xvariance = d;
	particleTypes[i].yvariance = e;
	particleTypes[i].minsize = f;
	particleTypes[i].maxsize = g;
	particleTypes[i].minlife = h;
	particleTypes[i].maxlife = j
}
function particleTypeGet(b) {
	for (var d = 0; d < particleTypes.length; ) {
		if (particleTypes[d].name == b)
			return d;
		d++
	}
}
function particleAdd(b, d, e, f, g, h) {
	var j = particles.length,
	i = particleTypeGet(b);
	particles[j] = {};
	particles[j].type = b;
	particles[j].x = d + irandom(-particleTypes[i].xvariance) + irandom(particleTypes[i].xvariance);
	particles[j].y = e + irandom(-particleTypes[i].yvariance) + irandom(particleTypes[i].yvariance);
	particles[j].hspeed = f;
	particles[j].vspeed = g;
	particles[j].color = h;
	particles[j].size = irandom(particleTypes[i].maxsize - particleTypes[i].minsize) + particleTypes[i].minsize;
	particles[j].life = irandom(particleTypes[i].maxlife -
			particleTypes[i].minlife) + particleTypes[i].minlife
}
function particleDestroy(b) {
	particles.splice(b, 1)
}
function particlesClear() {
	particles.splice(0, particles.length)
}
function motionSet(b, d, e) {
	instances[b].hspeed = lengthDirX(d, e);
	instances[b].vspeed = lengthDirY(d, e)
}
function motionAdd(b, d, e) {
	var f = lengthDirX(d, e) + instances[b].hspeed,
	e = lengthDirY(d, e) + instances[b].vspeed,
	d = pointDistance(0, 0, f, e),
	f = pointDirection(0, 0, f, e);
	instances[b].hspeed = lengthDirX(d, f);
	instances[b].vspeed = lengthDirY(d, f)
}
function motionAddXY(b, d, e) {
	instances[b].hspeed += d;
	instances[b].vspeed += e
}
function motionGetDir(b) {
	return pointDirection(0, 0, instances[b].hspeed, instances[b].vspeed)
}
function motionGetDis(b) {
	return pointDistance(0, 0, instances[b].hspeed, instances[b].vspeed)
}
function hitboxSetMask(b, d) {
	instances[b].mask = d
}
function hitboxSet(b, d, e, f, g, h) {
	instances[b].width = d;
	instances[b].height = e;
	instances[b].maskX = f;
	instances[b].maskY = g;
	instances[b].mask = h
}
function hitboxCollide(b, d) {
	for (var e = 0; e < instances.length; ) {
		if (!0 == instances[e].active && instances[e].mask == d && e != b && instances[b].width / 2 + instances[e].width / 2 > Math.abs(instances[b].x - instances[b].xoffset + instances[b].maskX - (instances[e].x - instances[e].xoffset + instances[e].maskX)) && instances[b].height / 2 + instances[e].height / 2 > Math.abs(instances[b].y - instances[b].yoffset + instances[b].maskY - (instances[e].y - instances[e].yoffset + instances[e].maskY)))
			return e;
		e++
	}
	return -1
}
function hitboxCollidePosition(b, d, e, f) {
	for (var g = 0; g < instances.length; ) {
		if (!0 == instances[g].active && instances[g].mask == d && g != b && instances[b].width / 2 + instances[g].width / 2 > Math.abs(e - instances[b].xoffset + instances[b].maskX - (instances[g].x - instances[g].xoffset + instances[g].maskX)) && instances[b].height / 2 + instances[g].height / 2 > Math.abs(f - instances[b].yoffset + instances[b].maskY - (instances[g].y - instances[g].yoffset + instances[g].maskY)))
			return g;
		g++
	}
	return -1
}
function collidePosition(b, d, e, f) {
	for (var g = 0; g < instances.length; ) {
		if (!0 == instances[g].active && instances[g].mask == d && g != b && instances[g].width > Math.abs(e - (instances[g].x - instances[g].xoffset + instances[g].maskX)) && instances[g].height > Math.abs(f - (instances[g].y - instances[g].yoffset + instances[g].maskY)))
			return g;
		g++
	}
	return -1
}
function pointInRect(b, d, e, f, g, h) {
	return g >= Math.min(b, e) && g <= Math.max(b, e) && h >= Math.min(d, f) && h <= Math.max(d, f) ? !0 : !1
}
function colorSet(b) {
	cxt.fillStyle = b;
	cxt.strokeStyle = b
}
function fontReset() {
	cxt.textAlign = "start";
	cxt.textBaseline = "alphabetic";
	cxt.font = "10px sans-serif"
}
function textDraw(b, d, e) {
	cxt.fillText(e, b - cameraX, d - cameraY)
}
function textDrawAngle(b, d, e, f) {
	cxt.save();
	var g = cxt.measureText(e);
	"center" == cxt.textAlign ? g.width = 0 : "right" == cxt.textAlign && (g.width *= -1);
	cxt.translate(b - cameraX + g.width / 2, d - cameraY);
	cxt.rotate( - (f / (180 / Math.PI)));
	cxt.translate( - (b - cameraX + g.width / 2),  - (d - cameraY));
	cxt.fillText(e, b - cameraX, d - cameraY);
	cxt.restore()
}
function strokeLine(b, d, e, f) {
	cxt.beginPath();
	cxt.moveTo(b - cameraX, d - cameraY);
	cxt.lineTo(e - cameraX, f - cameraY);
	cxt.closePath();
	cxt.stroke()
}
function fillRect(b, d, e, f) {
	cxt.fillRect(Math.min(b, e) - cameraX, Math.min(d, f) - cameraY, Math.abs(e - b), Math.abs(f - d))
}
function strokeRect(b, d, e, f) {
	cxt.strokeRect(Math.min(b, e) - cameraX, Math.min(d, f) - cameraY, Math.abs(e - b), Math.abs(f - d))
}
function fillCircle(b, d, e) {
	cxt.beginPath();
	cxt.arc(b - cameraX, d - cameraY, e, 0, 2 * Math.PI, !0);
	cxt.closePath();
	cxt.fill()
}
function strokeCircle(b, d, e) {
	cxt.beginPath();
	cxt.arc(b - cameraX, d - cameraY, e, 0, 2 * Math.PI, !0);
	cxt.closePath();
	cxt.stroke()
}
function drawPolygon(b, d, e, f, g, h) {
	cxt.beginPath();
	cxt.moveTo(b + lengthDirX(f, e) - cameraX, d + lengthDirY(f, e) - cameraY);
	for (s = 1; s < g; s++)
		cxt.lineTo(b + lengthDirX(f, e + s * (360 / g)) - cameraX, d + lengthDirY(f, e + s * (360 / g)) - cameraY);
	cxt.closePath();
	!0 == h && cxt.fill();
	!1 == h && cxt.stroke()
}
function soundAdd(b, d, e) {
	var f = sounds.length;
	void 0 == e && (e = 8);
	sounds[f] = {};
	sounds[f].channels = e;
	sounds[f].channel = 1;
	sounds[f].name = b;
	sounds[f].ae = [];
	for (a = 1; a <= e; a++)
		sounds[f].ae[a] = new Audio(d), sounds[f].ae[a].preload = !0
}
function soundGet(b) {
	for (var d = 0; d < sounds.length; ) {
		if (sounds[d].name == b)
			return d;
		d++
	}
}
function soundPlay(b) {
	b = soundGet(b);
	sounds[b].ae[sounds[b].channel].play();
	sounds[b].channel++;
	sounds[b].channel > sounds[b].channels && (sounds[b].channel = 1)
}
function soundLoaded(b) {
	return 4 == sounds[soundGet(b)].ae[1].readyState ? !0 : !1
}
function loopAdd(b, d) {
	var e = loops.length;
	loops[e] = new Audio(d);
	loops[e].name = b;
	loops[e].addEventListener("ended", function () {
		this.currentTime = 0
	})
}
function loopGet(b) {
	for (var d = 0; d < loops.length; ) {
		if (loops[d].name == b)
			return d;
		d++
	}
}
function loopPlay(b) {
	loops[loopGet(b)].play()
}
function loopPause(b) {
	loops[loopGet(b)].pause()
}
function loopIsPlaying(b) {
	return !0 == loops[loopGet(b)].paused ? !1 : !0
}
function loopLoaded(b) {
	return 4 == loops[loopGet(b)].readyState ? !0 : !1
}
function debugToggle() {
	debugShow = !1 == debugShow ? !0 : !1
}
function debugPrint(b) {
	debugLines[debugLines.length] = b
}
function debugClear() {
	debugLines.splice(0, debugLines.length)
}
function engineStart() {
	document.getElementById(canvasId).addEventListener("mousedown", mouseClick, !1);
	document.body.addEventListener("mouseup", mouseRelease, !1);
	document.body.addEventListener("touchcancel", function (b) {
		b.preventDefault();
		touchEnd(b)
	}, !1);
	document.body.addEventListener("touchmove", function (b) {
		b.preventDefault()
	}, !1);
	document.getElementById(canvasId).addEventListener("touchstart", function (b) {
		b.preventDefault();
		touchStart(b)
	}, !1);
	document.getElementById(canvasId).addEventListener("touchmove",
		function (b) {
		b.preventDefault();
		touchMove(b)
	}, !0);
	document.getElementById(canvasId).addEventListener("touchend", function (b) {
		b.preventDefault();
		touchEnd(b)
	}, !1);
	sprites = [];
	objects = [];
	instances = [];
	keys = [];
	backgrounds = [];
	sounds = [];
	loops = [];
	particleTypes = [];
	particles = [];
	debugLines = [];
	c = document.getElementById(canvasId);
	cxt = c.getContext("2d");
	backgroundImage = backgroundColor = "none";
	gamespeed = 1E3 / 60;
	sts = 0;
	fps = Math.round(1E3 / gamespeed);
	debugShow = debug = !1;
	debugPlaying = debugText = !0;
	cameraY = cameraX = 0;
	cameraAngle =
		previousCameraAngle = 90;
	mouseStatus = mouseY = mouseX = trueMouseY = trueMouseX = 0;
	keyLastReleased = keyLastPressed = -1;
	touches = [];
	stepInterval = setInterval("engineStep()", gamespeed);
	fpsInterval = setInterval("setFPS()", 1E3);
	eventStart()
}
function engineStep() {
	sts++;
	for (var b = 0; b < instances.length; ) {
		if (!0 == instances[b].active && (objectEventStep(b), 0 <= b && b < instances.length && (0 != instances[b].hspeed || 0 != instances[b].vspeed)))
			if (instances[b].x += instances[b].hspeed, instances[b].y += instances[b].vspeed, 0 < instances[b].friction) {
				var d = pointDistance(0, 0, instances[b].hspeed, instances[b].vspeed),
				e = pointDirection(0, 0, instances[b].hspeed, instances[b].vspeed),
				d = d - instances[b].friction;
				0 > d && (d = 0);
				instances[b].hspeed = lengthDirX(d, e);
				instances[b].vspeed =
					lengthDirY(d, e)
			}
		instances.length && b++
	}
	for (b = 0; b < particles.length; ) {
		particleEventDraw(b);
		if (0 != particles[b].hspeed || 0 != particles[b].vspeed)
			particles[b].x += particles[b].hspeed, particles[b].y += particles[b].vspeed;
		0 >= particles[b].life ? particleDestroy(b) : particles[b].life--;
		b++
	}
	2 == mouseStatus && 0 < touches.length && (trueMouseX = touches[0].pageX + document.body.scrollLeft + document.documentElement.scrollLeft - c.offsetLeft, trueMouseY = touches[0].pageY + document.body.scrollTop + document.documentElement.scrollTop - c.offsetTop,
		mouseX = (trueMouseX + cameraX) / xscale, mouseY = (trueMouseY + cameraY) / yscale);
	eventStep();
	engineDraw();
	mouseUpdate();
	keyUpdate()
}
function engineDraw() {
	cxt.translate(c.width / 2, c.height / 2);
	cxt.rotate( - ((previousCameraAngle - 90) / (180 / Math.PI)));
	cxt.translate(-c.width / 2, -c.height / 2);
	cxt.globalAlpha = 1;
	"none" == backgroundColor ? cxt.clearRect(0, 0, c.width, c.height) : (cxt.fillStyle = backgroundColor, cxt.fillRect(0, 0, c.width, c.height));
	if ("none" != backgroundImage) {
		var b = backgroundGet(backgroundImage);
		0 == backgrounds[b].tile && cxt.drawImage(backgrounds[b], cameraX, cameraY, backgrounds[b].width, backgrounds[b].height);
		if (1 == backgrounds[b].tile) {
			for (var d =
					Math.min(-cameraX, cameraX); d < -backgrounds[b].width; )
				d += backgrounds[b].width;
			for (; d < c.width; )
				cxt.drawImage(backgrounds[b], d, cameraY, backgrounds[b].width, backgrounds[b].height), d += backgrounds[b].width
		}
		if (2 == backgrounds[b].tile) {
			for (var e = Math.min(-cameraY, cameraY); e < -backgrounds[b].height; )
				e += backgrounds[b].height;
			for (; e < c.height; )
				cxt.drawImage(backgrounds[b], cameraY, e, backgrounds[b].width, backgrounds[b].height), e += backgrounds[b].height
		}
		if (3 == backgrounds[b].tile) {
			for (d = Math.min(-cameraX, cameraX); d <
				-backgrounds[b].width; )
				d += backgrounds[b].width;
			for (e = Math.min(-cameraY, cameraY); e < -backgrounds[b].height; )
				e += backgrounds[b].height;
			for (; e < c.height; )
				cxt.drawImage(backgrounds[b], d, e, backgrounds[b].width, backgrounds[b].height), d += backgrounds[b].width, d > c.width && (d = Math.min(-cameraX, cameraX), e += backgrounds[b].height)
		}
	}
	cxt.translate(c.width / 2, c.height / 2);
	cxt.rotate((cameraAngle - 90) / (180 / Math.PI));
	cxt.translate(-c.width / 2, -c.height / 2);
	previousCameraAngle = cameraAngle;
	for (b = 0; b < instances.length; b++)
		instances[b].id =
			b;
	d = instances.sort(sortDepth);
	for (e = 0; e < d.length; ) {
		b = d[e].id;
		if (b < instances.length && (!0 == instances[b].active && !getLandscape()) && ("undefined" !== typeof instances[b] && (0 != instances[b].alpha && "none" != instances[b].sprite) && (spriteDrawExt(instances[b].sprite, Math.round(instances[b].x), Math.round(instances[b].y), Math.floor(instances[b].imageFrame), instances[b].xoffset, instances[b].yoffset, instances[b].xscale, instances[b].yscale, instances[b].imageAngle, instances[b].alpha), instances[b].imageFrame += instances[b].imageSpeed,
					instances[b].imageFrame >= spriteGet(instances[b].sprite).frames && (instances[b].imageFrame = 0)), objectEventDraw(b), !0 == debugShow)) {
			var f = cxt.globalAlpha,
			g = cxt.strokeStyle,
			h = cxt.lineWidth;
			cxt.globalAlpha = 1;
			cxt.lineWidth = 1;
			cxt.strokeStyle = "lime";
			var j = Math.round(instances[b].x) + 0.5,
			i = Math.round(instances[b].y) + 0.5;
			cxt.strokeRect(j - 3 - cameraX, i - 3 - cameraY, 6, 6);
			cxt.strokeStyle = "red";
			var l = Math.round(instances[b].width),
			m = Math.round(instances[b].height);
			cxt.strokeRect(j + Math.round(instances[b].maskX - instances[b].xoffset) -
				cameraX, i + Math.round(instances[b].maskY - instances[b].yoffset) - cameraY, l, m);
			cxt.globalAlpha = f;
			cxt.strokeStyle = g;
			cxt.lineWidth = h
		}
		e++
	}
	for (b = 0; b < particles.length; b++)
		particleEventDraw(b);
	eventDraw();
	debugDraw()
}
function debugDraw() {
	if (!0 == debugShow) {
		cxt.save();
		cxt.translate(c.width / 2, c.height / 2);
		cxt.rotate( - ((cameraAngle - 90) / (180 / Math.PI)));
		cxt.translate(-c.width / 2, -c.height / 2);
		var b = cxt.globalAlpha,
		d = cxt.fillStyle,
		e = cxt.strokeStyle,
		f = cxt.lineWidth;
		cxt.globalAlpha = 0.5;
		cxt.fillStyle = "black";
		cxt.fillRect(0, 0, c.width, c.height);
		cxt.fillStyle = "white";
		cxt.font = "bold 14px Lucida Console";
		cxt.textBaseline = "top";
		cxt.textAlign = "left";
		cxt.fillText("CanvasLord v" + CLVERSION, 8, 8);
		cxt.lineWidth = 1;
		cxt.globalAlpha = !0 == pointInRect(8,
				22, 24, 38, trueMouseX, trueMouseY) ? 1 : 0.5;
		cxt.strokeStyle = "white";
		cxt.strokeRect(8.5, 22.5, 16, 16);
		cxt.beginPath();
		for (g = 26.5; 36.5 > g; g += 2)
			cxt.moveTo(12.5, g), cxt.lineTo(20.5, g);
		cxt.stroke();
		cxt.closePath();
		!0 == debugText ? (cxt.beginPath(), cxt.moveTo(10.5, 24.5), cxt.lineTo(22.5, 36.5), cxt.moveTo(22.5, 24.5), cxt.lineTo(10.5, 36.5), cxt.stroke(), cxt.closePath(), 2 == mouseStatus && 1 == cxt.globalAlpha && (debugText = !1, mouseStatus = 1)) : 2 == mouseStatus && 1 == cxt.globalAlpha && (debugText = !0, mouseStatus = 1);
		cxt.globalAlpha = !0 == pointInRect(28,
				22, 44, 38, trueMouseX, trueMouseY) ? 1 : 0.5;
		cxt.strokeRect(28.5, 22.5, 16, 16);
		!1 == debugPlaying ? (cxt.beginPath(), cxt.moveTo(32.5, 24.5), cxt.lineTo(40.5, 30.5), cxt.lineTo(32.5, 36.5), cxt.closePath(), cxt.fill(), 2 == mouseStatus && 1 == cxt.globalAlpha && (clearInterval(stepInterval), stepInterval = setInterval("engineStep()", gamespeed), debugPlaying = !0, mouseStatus = 1)) : (cxt.fillRect(32.5, 26.5, 3, 8), cxt.fillRect(37.5, 26.5, 3, 8), 2 == mouseStatus && 1 == cxt.globalAlpha && (clearInterval(stepInterval), stepInterval = setInterval("engineDraw()",
						gamespeed), debugPlaying = !1, mouseStatus = 1));
		cxt.globalAlpha = !0 == pointInRect(48, 22, 64, 38, trueMouseX, trueMouseY) ? 1 : 0.5;
		cxt.strokeRect(48.5, 22.5, 16, 16);
		cxt.beginPath();
		cxt.moveTo(52.5, 24.5);
		cxt.lineTo(60.5, 30.5);
		cxt.lineTo(52.5, 36.5);
		cxt.lineTo(54.5, 30.5);
		cxt.closePath();
		cxt.fill();
		2 == mouseStatus && 1 == cxt.globalAlpha && (setTimeout("engineStep()", 1), mouseStatus = 1);
		cxt.globalAlpha = 0.5;
		cxt.textAlign = "right";
		cxt.fillText("FPS: " + fps + " / " + Math.round(1E3 / gamespeed), c.width - 8, 8);
		cxt.fillText("Instances: " + instances.length,
			c.width - 8, 20);
		cxt.textAlign = "left";
		if (!0 == debugText)
			for (var g = c.height - 20, h = debugLines.length - 1; 0 <= h && 36 <= g; )
				cxt.fillText(debugLines[h], 8, g), g -= 12, h--;
		else
			cxt.fillText("mouse(" + mouseX + "," + mouseY + ")", 8, c.height - 44), cxt.fillText("trueMouse(" + trueMouseX + "," + trueMouseY + ")", 8, c.height - 32), cxt.fillText("camera(" + cameraX + "," + cameraY + "," + cameraAngle + ")", 8, c.height - 20);
		cxt.globalAlpha = b;
		cxt.fillStyle = d;
		cxt.strokeStyle = e;
		cxt.lineWidth = f;
		cxt.restore()
	}
};
