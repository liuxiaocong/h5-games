function initSplash() {
    gameState = "splash",
        resizeCanvas(),
        splash = new Elements.Splash(assetLib.getData("splash"), canvas.width, canvas.height),
        userInput.addHitArea("moreGames", butEventHandler, null, "rect", {
                aRect: [0, 0, canvas.width, canvas.height]
            },
            !0),
        previousTime = (new Date).getTime(),
        updateSplashScreenEvent()
}
function initStartScreen() {
    gameState = "start",
        userInput.removeHitArea("moreGames"),
        1 == audioType && (musicTween && musicTween.kill(), musicTween = TweenLite.to(music, 1, {
            volume: .5,
            ease: "Linear.easeNone"
        })),
        background = new Elements.Background(assetLib.getData("background"), canvas.width, canvas.height),
        userInput.addHitArea("mute", butEventHandler, null, "rect", {
                aRect: [740, 0, canvas.width, 55]
            },
            !0);
    var a = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [660, 320],
            id: "play"
        },
        b = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [325, 350],
            id: "moreGames"
        },
        c = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [120, 350],
            id: "credits"
        };
    userInput.addHitArea("showTutorial", butEventHandler, null, "image", a),
        userInput.addHitArea("moreGames", butEventHandler, null, "image", b),
        userInput.addHitArea("credits", butEventHandler, null, "image", c);
    var d = new Array(a, b, c);
    panel = new Elements.Panel(assetLib.getData("panels"), assetLib.getData("scoreNumbers"), gameState, d, canvas.width, canvas.height),
        panel.startTween1(),
        previousTime = (new Date).getTime(),
        updateStartScreenEvent()
}
function initCreditsScreen() {
    gameState = "credits";
    var a = {
        oImgData: assetLib.getData("uiButs"),
        aPos: [90, 350],
        id: "back"
    };
    userInput.addHitArea("backFromCredits", butEventHandler, null, "image", a);
    var b = new Array(a);
    panel = new Elements.Panel(assetLib.getData("panels"), assetLib.getData("scoreNumbers"), gameState, b, canvas.width, canvas.height),
        panel.startTween2(),
        previousTime = (new Date).getTime(),
        updateCreditsScreenEvent()
}
function initTutorial() {
    gameState = "tutorial";
    var a = {
        oImgData: assetLib.getData("uiButs"),
        aPos: [660, 320],
        id: "play"
    };
    userInput.addHitArea("startGame", butEventHandler, null, "image", a);
    var b = new Array(a);
    panel = new Elements.Panel(assetLib.getData("panels"), assetLib.getData("scoreNumbers"), gameState, b, canvas.width, canvas.height),
        panel.startTween1(),
        previousTime = (new Date).getTime(),
        updateTutorialEvent()
}
function initGame() {
    window.submitLock = false,
    gameState = "game",
        gameTouchState = 0,
        shotsSinceLastPot = 1,
        gameTimer = startTime,
        streak = 0,
        levelNum = 0,
        1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, .2, {
            volume: 0,
            ease: "Linear.easeNone"
        })),
        userInput.addHitArea("pause", butEventHandler, null, "rect", {
                aRect: [0, 0, 55, 55]
            },
            !0),
        userInput.addHitArea("gameTouch", butEventHandler, {
                isDraggable: !0,
                multiTouch: !0
            },
            "rect", {
                aRect: [0, 0, canvas.width, canvas.height]
            },
            !0),
        hud = new Elements.Hud(assetLib.getData("hud"), assetLib.getData("timeNumbers"), assetLib.getData("tableNumbers"), {
            racks: 1,
            score: 0,
            multiplier: 10,
            balls: 0,
            streak: streak
        }),
        hud.setTime(startTime);
    var a = new Array;
    aBalls = new Array,
        aHoles = new Array;
    for (var b = 0; b < aLevelData[levelNum].aData.length; b++) if ("cueBall" == aLevelData[levelNum].aData[b].type) cueBall = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), {
            id: "cueBall",
            type: "cueBall",
            x: aLevelData[levelNum].aData[b].p0.x,
            y: aLevelData[levelNum].aData[b].p0.y
        },
        ballCallback, canvas.width, canvas.height),
        aBalls.push(cueBall);
    else if ("hole" == aLevelData[levelNum].aData[b].type) aHoles.push({
        x: aLevelData[levelNum].aData[b].p0.x,
        y: aLevelData[levelNum].aData[b].p0.y
    });
    else if ("ball" == aLevelData[levelNum].aData[b].type) {
        var c = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), {
                id: "ball" + b,
                type: "ball",
                x: aLevelData[levelNum].aData[b].p0.x,
                y: aLevelData[levelNum].aData[b].p0.y
            },
            ballCallback, canvas.width, canvas.height);
        aBalls.push(c)
    } else "wall" == aLevelData[levelNum].aData[b].type && a.push({
        p0: aLevelData[levelNum].aData[b].p0,
        p1: aLevelData[levelNum].aData[b].p1,
        b: 1,
        f: 1
    });
    oPosData = {
        prevBallX: cueBall.oData.x,
        prevBallY: cueBall.oData.y,
        stageX: -(levelWidth - canvas.width) / 2,
        stageY: -(levelHeight - canvas.height) / 2,
        targStageX: -(levelWidth - canvas.width) / 2,
        targStageY: -(levelHeight - canvas.height) / 2,
        startDragX: 0,
        startDragY: 0,
        startStageX: 0,
        startStageY: 0
    },
        linePredictor = new Utils.LinePredictor(a, aBalls, cueBall),
        table = new Elements.Table(assetLib.getData("table"), canvas.width, canvas.height),
        arrow = new Elements.Arrow(assetLib.getData("arrow"), assetLib.getData("cue"), canvas.width, canvas.height),
        aimX = targAimX = cueBall.startX,
        aimY = targAimY = cueBall.startY + oPosData.stageY,
        physics2D = new Utils.Physics2D(a, aBalls),
        hideNewRackIntro(this),
        playSound("rack"),
        previousTime = (new Date).getTime(),
        updateGameEvent()
}
function initNewRack() {
    levelNum = (levelNum + 1) % aLevelData.length,
        hud.oData.racks++,
        gameTimer += 15,
        aBalls = new Array;
    for (var a = 0; a < aLevelData[levelNum].aData.length; a++) if ("cueBall" == aLevelData[levelNum].aData[a].type) cueBall = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), {
            id: "cueBall",
            type: "cueBall",
            x: aLevelData[levelNum].aData[a].p0.x,
            y: aLevelData[levelNum].aData[a].p0.y
        },
        ballCallback, canvas.width, canvas.height),
        aBalls.push(cueBall);
    else if ("ball" == aLevelData[levelNum].aData[a].type) {
        var b = new Elements.Ball(assetLib.getData("ball"), assetLib.getData("scoreNumbers"), {
                id: "ball" + a,
                type: "ball",
                x: aLevelData[levelNum].aData[a].p0.x,
                y: aLevelData[levelNum].aData[a].p0.y
            },
            ballCallback, canvas.width, canvas.height);
        aBalls.push(b)
    }
    gameTouchState = 0,
        oPosData = {
            prevBallX: cueBall.oData.x,
            prevBallY: cueBall.oData.y,
            stageX: -(levelWidth - canvas.width) / 2,
            stageY: -(levelHeight - canvas.height) / 2,
            targStageX: -(levelWidth - canvas.width) / 2,
            targStageY: -(levelHeight - canvas.height) / 2,
            startDragX: 0,
            startDragY: 0,
            startStageX: 0,
            startStageY: 0
        },
        aimX = targAimX = cueBall.startX,
        aimY = targAimY = cueBall.startY + oPosData.stageY,
        arrow.renderFunc = arrow.renderAim,
        linePredictor.aBalls = aBalls,
        linePredictor.cueBall = cueBall,
        physics2D.aBalls = aBalls,
        showNewRackIntro(),
        playSound("rack")
}
function showNewRackIntro() {
    newRackStart = !0,
        newRackY = -400,
        TweenLite.to(this, .5, {
            newRackY: 0,
            ease: "Back.easeOut",
            onComplete: hideNewRackIntro,
            onCompleteParams: [this]
        })
}
function hideNewRackIntro(a) {
    newRackStart = !0,
        newRackY = 0,
        TweenLite.to(a, .5, {
            delay: .5,
            newRackY: 800,
            ease: "Back.easeIn",
            onComplete: function() {
                newRackStart = !1
            }
        })
}
function butEventHandler(a, b) {
    switch (a) {
        case "langSelect":
            curLang = b.lang,
                ctx.clearRect(0, 0, canvas.width, canvas.height),
                userInput.removeHitArea("langSelect"),
                initLoadAssets();
            break;
        case "showTutorial":
            playSound("hit1"),
                userInput.removeHitArea("showTutorial"),
                userInput.removeHitArea("moreGames"),
                userInput.removeHitArea("credits"),
                initTutorial();
            break;
        case "credits":
            playSound("hit1"),
                userInput.removeHitArea("showTutorial"),
                userInput.removeHitArea("moreGames"),
                userInput.removeHitArea("credits"),
                initCreditsScreen();
            break;
        case "startGame":
            playSound("hit1"),
                userInput.removeHitArea("startGame"),
                initGame();
            break;
        case "backFromCredits":
            playSound("hit1"),
                userInput.removeHitArea("backFromCredits"),
                initStartScreen();
            break;
        case "moreGames":
        case "moreGamesFromPause":
        case "gameTouch":
            if (gameTouchState >= 3) return;
            if (b.isBeingDragged && !b.hasLeft) 2 == gameTouchState && (targAimX = b.x, targAimY = b.y),
                arrow.alpha = 1;
            else if (b.isDown) TweenLite.killTweensOf(oPosData),
                toggleHudButs(!1),
                b.x < cueBall.x + 40 && b.x > cueBall.x - 40 && b.y < cueBall.y + 40 && b.y > cueBall.y - 40 && (gameTouchState = 2, aimX = targAimX = b.x, aimY = targAimY = b.y, cueBall.changeState("aiming")),
                arrow.alpha = b.hasLeft ? .5 : 1;
            else {
                if (toggleHudButs(!0), 2 == gameTouchState && arrow.scaleX > .05) return gameTouchState = 3,
                    arrow.takeShot(cueBall),
                    arrow.scaleX < .5 ? playSound("hit1") : arrow.scaleX < .8 ? playSound("hit2") : playSound("hit3"),
                    void 0;
                gameTouchState = 0,
                    "waiting" != cueBall.state && cueBall.changeState("waiting")
            }
            break;
        case "quitFromEndLevel":
            playSound("hit1"),
                userInput.removeHitArea("quitFromEndLevel"),
                userInput.removeHitArea("nextGame"),
                userInput.removeHitArea("moreGames"),
                initStartScreen();
            break;
        case "nextGame":
            playSound("hit1"),
                userInput.removeHitArea("quitFromEndLevel"),
                userInput.removeHitArea("nextGame"),
                userInput.removeHitArea("moreGames"),
                initGame();
            break;
        case "mute":
            playSound("hit1"),
                toggleMute();
            break;
        case "pause":
        case "resumeFromPause":
            playSound("hit1"),
                toggleManualPause();
            break;
        case "quitFromPause":
            playSound("hit1"),
                toggleManualPause(),
                userInput.removeHitArea("pause"),
                userInput.removeHitArea("gameTouch"),
                userInput.removeHitArea("quitFromPause"),
                userInput.removeHitArea("resumeFromPause"),
                userInput.removeHitArea("moreGamesFromPause"),
                initStartScreen()
    }
}
function updateScore(a) {
    hud.oData.score += a
}
function initGameEnd() {
    gameState = "gameEnd",
        1 == audioType && (musicTween.kill(), musicTween = TweenLite.to(music, 2, {
            volume: .5,
            ease: "Linear.easeNone"
        })),
        playSound("gameEnd"),
        userInput.removeHitArea("pause"),
        userInput.removeHitArea("gameTouch");
    var a = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [660, 320],
            id: "play"
        },
        b = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [325, 350],
            id: "moreGames"
        },
        c = {
            oImgData: assetLib.getData("uiButs"),
            aPos: [120, 350],
            id: "quit"
        };
    userInput.addHitArea("quitFromEndLevel", butEventHandler, null, "image", c),
        userInput.addHitArea("nextGame", butEventHandler, null, "image", a);
        userInput.addHitArea("moreGames", butEventHandler, null, "image", b);
    var d = new Array(a, c, b);
    panel = new Elements.Panel(assetLib.getData("panels"), assetLib.getData("scoreNumbers"), gameState, d, canvas.width, canvas.height),
        panel.oScoreData = hud.oData,
        panel.startTweenEndLevel(),
        previousTime = (new Date).getTime(),
        updateGameEndEvent()
}
function isNearHole(a, b) {
    var c = a.trackX - b.x,
        d = a.trackY - b.y,
        e = c * c + d * d;
    return 750 > e ? ("cueBall" != a.oData.type ? (curPotScore = 10 * hud.oData.multiplier, hud.oData.score += curPotScore, ++streak > hud.oData.streak && (hud.oData.streak = streak), hud.oData.multiplier += 1, gameTimer += 5, shotsSinceLastPot = 0, hud.oData.balls++) : (hud.oData.multiplier = 10, gameTimer -= 10), !0) : !1
}
function toggleHudButs(a) {
    a ? (userInput.addHitArea("mute", butEventHandler, null, "rect", {
            aRect: [740, 0, canvas.width, 55]
        },
        !0), userInput.addHitArea("pause", butEventHandler, null, "rect", {
            aRect: [0, 0, 55, 55]
        },
        !0), userInput.addHitArea("gameTouch", butEventHandler, {
            isDraggable: !0,
            multiTouch: !0
        },
        "rect", {
            aRect: [0, 0, canvas.width, canvas.height]
        },
        !0)) : (userInput.removeHitArea("mute"), userInput.removeHitArea("pause"))
}
function ballCallback(a, b) {
    switch ("undefined" == typeof b && (b = null), a) {
        case "moveEnded":
            for (var c = !0,
                     d = 0; d < aBalls.length; d++) if ("moving" == aBalls[d].state) {
                c = !1;
                break
            }
            if (c) {
                for (var e = !0,
                         d = 0; d < aBalls.length; d++) if ("waiting" == aBalls[d].state && "cueBall" != aBalls[d].oData.type || 1 == aBalls.length) {
                    e = !1;
                    break
                }
                if (e) return;
                for (var d = 0; d < aBalls.length; d++)"waiting" == aBalls[d].state && "cueBall" == aBalls[d].oData.type && aBalls[d].changeState("indicating");
                aimX = targAimX = cueBall.x,
                    aimY = targAimY = cueBall.y,
                    arrow.renderFunc = arrow.renderAim,
                    gameTouchState = 0,
                    playSound("highlight"),
                    oPosData.prevBallX = cueBall.trackX,
                    oPosData.prevBallY = cueBall.trackY,
                    shotsSinceLastPot > 0 && (hud.oData.multiplier = 10, streak = 0),
                    shotsSinceLastPot++
            }
            break;
        case "holeEnded":
            for (var d = 0; d < aBalls.length; d++) if (aBalls[d].removeMe) {
                if (! ("cueBall" == aBalls[d].oData.type && aBalls.length > 1)) {
                    aBalls.splice(d, 1);
                    break
                }
                for (var f = !1,
                         g = 0,
                         h = aBalls[d].startX, i = aBalls[d].startY; ! f;) {
                    for (var j = 0; j < aBalls.length; j++) {
                        if (h > aBalls[j].trackX - aBalls[j].radius && h < aBalls[j].trackX + aBalls[j].radius && i > aBalls[j].trackY - aBalls[j].radius && i < aBalls[j].trackY + aBalls[j].radius) {
                            h = aBalls[d].startX + 160 * Math.random() - 80,
                                i = aBalls[d].startY + 160 * Math.random() - 80,
                                f = !1;
                            break
                        }
                        f = !0
                    }++g >= 200 && (f = !0)
                }
                aBalls[d].changeState("reset", {
                    x: h,
                    y: i
                }),
                    aBalls[d].changeState("indicating"),
                    aimX = targAimX = cueBall.x,
                    aimY = targAimY = cueBall.y
            }
            1 == aBalls.length && initNewRack()
    }
}
function updateGameEvent() {
    if (!manualPause && !rotatePause && "game" == gameState) {
        var a = getDelta();
        2 == gameTouchState ? (aimX += (targAimX - aimX) / .1 * a, aimY += (targAimY - aimY) / .1 * a, oPosData.targStageY = buffer > targAimY && cueBall.trackY < 140 ? -targAimY: targAimY > canvas.height - buffer && cueBall.trackY > 340 ? -buffer - (buffer - (canvas.height - targAimY)) : -buffer, oPosData.targStageY > 0 ? oPosData.targStageY = 0 : oPosData.targStageY < -80 && (oPosData.targStageY = -80)) : oPosData.targStageY = -buffer,
            oPosData.stageY += (oPosData.targStageY - oPosData.stageY) / .3 * a,
            table.update(oPosData.stageX, oPosData.stageY, a),
            table.render(ctx),
            3 == gameTouchState && physics2D.update(a),
            gameTimer -= a,
            hud.setTime(gameTimer),
            0 > gameTimer && initGameEnd();
        for (var b = 0; b < aBalls.length; b++) {
            for (var c = 0; c < aHoles.length; c++) if ("moving" == aBalls[b].state && isNearHole(aBalls[b], aHoles[c])) {
                playSound("pot" + Math.ceil(3 * Math.random())),
                    aBalls[b].changeState("holed", {
                        x: aHoles[c].x,
                        y: aHoles[c].y,
                        score: curPotScore
                    });
                break
            }
            aBalls[b].update(oPosData.stageX, oPosData.stageY, a),
                renderSprite(aBalls[b])
        }
        if (3 != gameTouchState && arrow.update(cueBall.x, cueBall.y, aimX, aimY, linePredictor.checkLine(cueBall.x, cueBall.y, aimX, aimY, oPosData.stageY), a), arrow.render(ctx), newRackStart) {
            var d = assetLib.getData("panels"),
                e = 4,
                f = e * d.oData.spriteWidth % d.img.width,
                g = Math.floor(e / (d.img.width / d.oData.spriteWidth)) * d.oData.spriteHeight;
            ctx.drawImage(d.img, f, g, d.oData.spriteWidth, d.oData.spriteHeight, 0, 0 + newRackY, d.oData.spriteWidth, d.oData.spriteHeight)
        }
        hud.update(oPosData.stageX, oPosData.stageY, a),
            hud.render(ctx),
            renderMuteBut(),
            requestAnimFrame(updateGameEvent)
    }
}
function updateCreditsScreenEvent() {
    if (!rotatePause && "credits" == gameState) {
        var a = getDelta();
        panel.update(a),
            panel.render(ctx),
            renderMuteBut(),
            requestAnimFrame(updateCreditsScreenEvent)
    }
}
window.submitLock = false;
function updateGameEndEvent() {
    if (!rotatePause && "gameEnd" == gameState) {
        var a = getDelta();
        background.updateScroll(a),
            background.renderScroll(ctx),
            panel.update(a),
            panel.render(ctx),
            renderMuteBut();
            if(!window.submitLock)
            {
                updateShareScore(hud.oData.score);
                window.submitLock = true;
            }
            requestAnimFrame(updateGameEndEvent);
    }
}
function updateSplashScreenEvent() {
    if (!rotatePause && "splash" == gameState) {
        var a = getDelta();
        if (splashTimer += a, splashTimer > 2.5) return 1 != audioType || muted || music.play(),
            initStartScreen(),
            void 0;
        splash.render(ctx, a),
            requestAnimFrame(updateSplashScreenEvent)
    }
}
function updateStartScreenEvent() {
    if (!rotatePause && "start" == gameState) {

        var a = getDelta();
        background.updateScroll(a),
            background.renderScroll(ctx),
            panel.update(a),
            panel.render(ctx),
            renderMuteBut(),
            requestAnimFrame(updateStartScreenEvent)
    }
}
function updateTutorialEvent() {
    if (!rotatePause && "tutorial" == gameState) {
        var a = getDelta();
        background.updateScroll(a),
            background.renderScroll(ctx),
            panel.update(a),
            panel.render(ctx),
            renderMuteBut(),
            requestAnimFrame(updateTutorialEvent)
    }
}
function getDelta() {
    var a = (new Date).getTime(),
        b = (a - previousTime) / 1e3;
    return previousTime = a,
        b > .5 && (b = 0),
        b
}
function renderSprite(a) {
    ctx.save(),
        ctx.translate(a.x, a.y),
        ctx.rotate(a.rotation),
        ctx.globalAlpha = a.alpha,
        ctx.scale(a.scaleX, a.scaleY),
        a.render(ctx),
        ctx.restore()
}
function checkSpriteCollision(a, b) {
    var c = a.x,
        d = a.y,
        e = b.x,
        f = b.y,
        g = (c - e) * (c - e) + (d - f) * (d - f),
        h = a.radius * b.radius;
    return h > g ? !0 : !1
}
function getScaleImageToMax(a, b) {
    var c;
    return c = a.isSpriteSheet ? b[0] / a.oData.spriteWidth < b[1] / a.oData.spriteHeight ? Math.min(b[0] / a.oData.spriteWidth, 1) : Math.min(b[1] / a.oData.spriteHeight, 1) : b[0] / a.img.width < b[1] / a.img.height ? Math.min(b[0] / a.img.width, 1) : Math.min(b[1] / a.img.height, 1)
}
function getCentreFromTopLeft(a, b, c) {
    var d = new Array;
    return d.push(a[0] + b.oData.spriteWidth / 2 * c),
        d.push(a[1] + b.oData.spriteHeight / 2 * c),
        d
}
function loadPreAssets() {
    aLangs.length > 1 ? (preAssetLib = new Utils.AssetLoader(curLang, [{
        id: "langSelect",
        file: "images/langSelect.jpg"
    },
        {
            id: "preloadImage",
            file: "images/preloadImage.jpg"
        }], ctx, canvas.width, canvas.height, !1), preAssetLib.onReady(initLangSelect)) : (curLang = aLangs[0], preAssetLib = new Utils.AssetLoader(curLang, [{
        id: "preloadImage",
        file: "images/preloadImage.jpg"
    }], ctx, canvas.width, canvas.height, !1), preAssetLib.onReady(initLoadAssets))
}
function initLangSelect() {
    var a = preAssetLib.getData("langSelect");
    ctx.drawImage(a.img, canvas.width / 2 - a.img.width / 2, canvas.height / 2 - a.img.height / 2);
    for (var b = 140,
             c = 0; c < aLangs.length; c++) {
        var d = canvas.width / 2 - b * aLangs.length / 2 + c * b,
            e = canvas.height / 2 - b / 2;
        userInput.addHitArea("langSelect", butEventHandler, {
                lang: aLangs[c]
            },
            "rect", {
                aRect: [d, e, d + b, e + 140]
            })
    }
}
function initLoadAssets() {
    var a = preAssetLib.getData("preloadImage");
    ctx.drawImage(a.img, 0, 0),
        loadAssets()
}
function loadAssets() {
    assetLib = new Utils.AssetLoader(curLang, [{
        id: "rotateDeviceMessage",
        file: "images/rotateDeviceMessage.jpg"
    },
        {
            id: "splash",
            file: "images/splashScreen.jpg"
        },
        {
            id: "background",
            file: "images/background.jpg"
        },
        {
            id: "hud",
            file: "images/hud.png"
        },
        {
            id: "uiButs",
            file: "images/" + curLang + "/uiButs.png",
            oAtlasData: {
                play: {
                    x: 0,
                    y: 0,
                    width: 269,
                    height: 161
                },
                credits: {
                    x: 225,
                    y: 163,
                    width: 0,
                    height: 0
                },
                quit: {
                    x: 0,
                    y: 273,
                    width: 223,
                    height: 108
                },
                moreGames: {
                    x: 0,
                    y: 163,
                    width: 0,
                    height: 0
                },
                back: {
                    x: 225,
                    y: 273,
                    width: 172,
                    height: 102
                }
            }
        },
        {
            id: "panels",
            file: "images/" + curLang + "/panels_800x400.png"
        },
        {
            id: "tableNumbers",
            file: "images/tableNumbers_14x22.png"
        },
        {
            id: "timeNumbers",
            file: "images/timeNumbers_15x22.png"
        },
        {
            id: "scoreNumbers",
            file: "images/scoreNumbers_40x51.png"
        },
        {
            id: "muteBut",
            file: "images/mute_59x61.png"
        },
        {
            id: "ball",
            file: "images/balls_118x118.png",
            oAnims: {
                cueBallWaiting: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19],
                cueBallMoving: [19],
                ball0Waiting: [20],
                ball1Waiting: [21],
                ball2Waiting: [22],
                ball3Waiting: [23],
                ball4Waiting: [24],
                ball5Waiting: [25],
                ball6Waiting: [26],
                ball7Waiting: [27],
                ball8Waiting: [28],
                ball0Moving: [20],
                ball1Moving: [21],
                ball2Moving: [22],
                ball3Moving: [23],
                ball4Moving: [24],
                ball5Moving: [25],
                ball6Moving: [26],
                ball7Moving: [27],
                ball8Moving: [28],
                explode: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39]
            }
        },
        {
            id: "table",
            file: "images/" + curLang + "/table.jpg"
        },
        {
            id: "cue",
            file: "images/cue.png"
        },
        {
            id: "arrow",
            file: "images/arrow_200x27.png"
        }], ctx, canvas.width, canvas.height),
        assetLib.onReady(initSplash)
}
function resizeCanvas() {
    var a = window.innerWidth,
        b = window.innerHeight;
    a > 480 && (a -= 1, b -= 1),
        window.innerWidth < window.innerHeight && isMobile ? ("loading" != gameState && rotatePauseOn(), canvas.style.width = a + "px", canvas.style.height = a / canvas.width * canvas.height + "px", canvasX = 0, canvasY = (b - a / canvas.width * canvas.height) / 2, canvasScaleX = canvasScaleY = canvas.width / a, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px") : isMobile ? (rotatePause && rotatePauseOff(), a / canvas.width < b / canvas.height ? (canvas.style.width = a + "px", canvas.style.height = a / canvas.width * canvas.height + "px", canvasX = 0, canvasY = (b - a / canvas.width * canvas.height) / 2, canvasScaleX = canvasScaleY = canvas.width / a, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px") : (canvas.style.width = b / canvas.height * canvas.width + "px", canvas.style.height = b + "px", canvasX = (a - b / canvas.height * canvas.width) / 2, canvasY = 0, canvasScaleX = canvasScaleY = canvas.height / b, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px")) : (rotatePause && rotatePauseOff(), a / canvas.width < b / canvas.height ? (canvas.style.width = a + "px", canvas.style.height = a / canvas.width * canvas.height + "px", canvasX = 0, canvasY = (b - a / canvas.width * canvas.height) / 2, canvasScaleX = canvasScaleY = canvas.width / a, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px") : (canvas.style.width = b / canvas.height * canvas.width + "px", canvas.style.height = b + "px", canvasX = (a - b / canvas.height * canvas.width) / 2, canvasY = 0, canvasScaleX = canvasScaleY = canvas.height / b, div.style.marginTop = canvasY + "px", div.style.marginLeft = canvasX + "px")),
        userInput.setCanvas(canvasX, canvasY, canvasScaleX, canvasScaleY)
}
function playSound(a, b) {
    "undefined" == typeof b && (b = 1),
        1 == audioType && (sound.volume(b), sound.play(a))
}
function toggleMute() {
    muted = !muted,
        1 == audioType ? muted ? Howler.mute() : Howler.unmute() : 2 == audioType && (muted ? music.pause() : music.play()),
        renderMuteBut()
}
function renderMuteBut() {
    if (0 != audioType) {
        var a = assetLib.getData("muteBut"),
            b = 0;
        muted && (b = 1);
        var c = b * a.oData.spriteWidth % a.img.width,
            d = Math.floor(b / (a.img.width / a.oData.spriteWidth)) * a.oData.spriteHeight;
        ctx.drawImage(a.img, c, d, a.oData.spriteWidth, a.oData.spriteHeight, 742, 3, a.oData.spriteWidth, a.oData.spriteHeight)
    }
}
function toggleManualPause() {
    if (manualPause) manualPause = !1,
        userInput.removeHitArea("quitFromPause"),
        userInput.removeHitArea("resumeFromPause"),
        userInput.removeHitArea("moreGamesFromPause"),
        pauseCoreOff();
    else {
        manualPause = !0,
            pauseCoreOn();
        var a = {
                oImgData: assetLib.getData("uiButs"),
                aPos: [canvas.width / 2, canvas.height / 2],
                id: "play"
            },
            b = {
                oImgData: assetLib.getData("uiButs"),
                aPos: [canvas.width / 2 + 103, 350],
                id: "moreGames"
            },
            c = {
                oImgData: assetLib.getData("uiButs"),
                aPos: [canvas.width / 2 - 103, 350],
                id: "quit"
            },
            d = new Array(c, a, b);
        userInput.addHitArea("quitFromPause", butEventHandler, null, "image", c),
            userInput.addHitArea("moreGamesFromPause", butEventHandler, null, "image", b),
            userInput.addHitArea("resumeFromPause", butEventHandler, null, "image", a),
            panel = new Elements.Panel(assetLib.getData("panels"), assetLib.getData("scoreNumbers"), "pause", d, canvas.width, canvas.height),
            panel.render(ctx),
            renderMuteBut(),
            userInput.addHitArea("pause", butEventHandler, null, "rect", {
                    aRect: [0, 0, 55, 55]
                },
                !0)
    }
}
function rotatePauseOn() {
    rotatePause = !0,
        ctx.drawImage(assetLib.getImg("rotateDeviceMessage"), 0, 0),
        userInput.pauseIsOn = !0,
        pauseCoreOn()
}
function rotatePauseOff() {
    rotatePause = !1,
        userInput.removeHitArea("quitFromPause"),
        userInput.removeHitArea("resumeFromPause"),
        userInput.removeHitArea("moreGamesFromPause"),
        pauseCoreOff()
}
function pauseCoreOn() {
    switch (1 == audioType ? Howler.mute() : 2 == audioType && music.pause(), gameState) {
        case "start":
            break;
        case "help":
            break;
        case "game":
            userInput.removeHitArea("gameTouch");
            break;
        case "end":
    }
}
function pauseCoreOff() {
    switch (1 == audioType ? muted || Howler.unmute() : 2 == audioType && (muted || music.play()), previousTime = (new Date).getTime(), userInput.pauseIsOn = !1, gameState) {
        case "splash":
            updateSplashScreenEvent();
            break;
        case "start":
            initStartScreen();
            break;
        case "tutorial":
            initTutorial();
            break;
        case "credits":
            initCreditsScreen();
            break;
        case "game":
            manualPause = !1,
                userInput.addHitArea("gameTouch", butEventHandler, {
                        isDraggable: !0,
                        multiTouch: !0
                    },
                    "rect", {
                        aRect: [0, 0, canvas.width, canvas.height]
                    },
                    !0),
                updateGameEvent();
            break;
        case "gameEnd":
            initGameEnd()
    }
}
var Utils; !
    function(a) {
        var b = function() {
            function a(a, b, c, d, e, f) {
                "undefined" == typeof f && (f = !0),
                    this.oAssetData = {},
                    this.assetsLoaded = 0,
                    this.totalAssets = b.length,
                    this.ctx = c,
                    this.canvasWidth = d,
                    this.canvasHeight = e,
                    this.showBar = f,
                    this.topLeftX = this.canvasWidth / 2 - d / 8,
                    this.topLeftY = 230,
                    this.showBar && (ctx.strokeStyle = "#333646", ctx.lineWidth = 2, ctx.fillStyle = "#F5A343", ctx.moveTo(this.topLeftX, this.topLeftY), ctx.lineTo(this.topLeftX + d / 4, this.topLeftY + 0), ctx.lineTo(this.topLeftX + d / 4, this.topLeftY + 20), ctx.lineTo(this.topLeftX + 0, this.topLeftY + 20), ctx.lineTo(this.topLeftX + 0, this.topLeftY + 0), ctx.stroke());
                for (var g = 0; g < b.length; g++) this.loadImage(b[g])
            }
            return a.prototype.loadImage = function(a) {
                var b = this,
                    c = new Image;
                c.onload = function() {
                    b.oAssetData[a.id] = {},
                        b.oAssetData[a.id].img = c,
                        b.oAssetData[a.id].oData = {};
                    var d = b.getSpriteSize(a.file);
                    0 != d[0] ? (b.oAssetData[a.id].oData.spriteWidth = d[0], b.oAssetData[a.id].oData.spriteHeight = d[1]) : (b.oAssetData[a.id].oData.spriteWidth = b.oAssetData[a.id].img.width, b.oAssetData[a.id].oData.spriteHeight = b.oAssetData[a.id].img.height),
                        a.oAnims && (b.oAssetData[a.id].oData.oAnims = a.oAnims),
                        a.oAtlasData && (b.oAssetData[a.id].oData.oAtlasData = a.oAtlasData),
                        ++b.assetsLoaded,
                        b.showBar && ctx.fillRect(b.topLeftX + 2, b.topLeftY + 2, (b.canvasWidth / 4 - 4) / b.totalAssets * b.assetsLoaded, 16),
                        b.checkLoadComplete()
                },
                    c.src = a.file
            },
                a.prototype.getSpriteSize = function(a) {
                    for (var b = new Array,
                             c = "",
                             d = "",
                             e = 0,
                             f = a.lastIndexOf("."), g = !0; g;) f--,
                        0 == e && this.isNumber(a.charAt(f)) ? c = a.charAt(f) + c: 0 == e && c.length > 0 && "x" == a.charAt(f) ? (f--, e = 1, d = a.charAt(f) + d) : 1 == e && this.isNumber(a.charAt(f)) ? d = a.charAt(f) + d: 1 == e && d.length > 0 && "_" == a.charAt(f) ? (g = !1, b = [parseInt(d), parseInt(c)]) : (g = !1, b = [0, 0]);
                    return b
                },
                a.prototype.isNumber = function(a) {
                    return ! isNaN(parseFloat(a)) && isFinite(a)
                },
                a.prototype.checkLoadComplete = function() {
                    this.assetsLoaded == this.totalAssets && this.loadedCallback()
                },
                a.prototype.onReady = function(a) {
                    this.loadedCallback = a
                },
                a.prototype.getImg = function(a) {
                    return this.oAssetData[a].img
                },
                a.prototype.getData = function(a) {
                    return this.oAssetData[a]
                },
                a
        } ();
        a.AssetLoader = b
    } (Utils || (Utils = {}));
var Utils; !
    function(a) {
        var b = function() {
            function a(a, b, c, d) {
                this.x = 0,
                    this.y = 0,
                    this.rotation = 0,
                    this.radius = 10,
                    this.removeMe = !1,
                    this.frameInc = 0,
                    this.animType = "loop",
                    this.offsetX = 0,
                    this.offsetY = 0,
                    this.scaleX = 1,
                    this.scaleY = 1,
                    this.oImgData = a,
                    this.oAnims = this.oImgData.oData.oAnims,
                    this.fps = b,
                    this.radius = c,
                    this.animId = d
            }
            return a.prototype.updateAnimation = function(a) {
                this.frameInc += this.fps * a
            },
                a.prototype.resetAnim = function() {
                    this.frameInc = 0
                },
                a.prototype.setFrame = function(a) {
                    this.fixedFrame = a
                },
                a.prototype.setAnimType = function(a, b, c) {
                    switch ("undefined" == typeof c && (c = !0), this.animId = b, this.animType = a, c && this.resetAnim(), a) {
                        case "loop":
                            break;
                        case "once":
                            this.maxIdx = this.oAnims[this.animId].length - 1
                    }
                },
                a.prototype.render = function(a) {
                    if (null != this.animId) {
                        var b = this.oAnims[this.animId].length,
                            c = Math.floor(this.frameInc),
                            d = this.oAnims[this.animId][c % b],
                            e = d * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                            f = Math.floor(d / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
                        if ("once" == this.animType && c > this.maxIdx) {
                            this.fixedFrame = this.oAnims[this.animId][b - 1],
                                this.animId = null,
                                this.animEndedFunc();
                            var e = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                                f = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight
                        }
                    } else var e = this.fixedFrame * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                        f = Math.floor(this.fixedFrame / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
                    a.drawImage(this.oImgData.img, e, f, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.oImgData.oData.spriteWidth / 2 + this.offsetX, -this.oImgData.oData.spriteHeight / 2 + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight)
                },
                a
        } ();
        a.AnimSprite = b
    } (Utils || (Utils = {}));
var Utils; !
    function(a) {
        var b = function() {
            function a(a, b, c) {
                "undefined" == typeof c && (c = 0),
                    this.x = 0,
                    this.y = 0,
                    this.rotation = 0,
                    this.radius = 10,
                    this.removeMe = !1,
                    this.offsetX = 0,
                    this.offsetY = 0,
                    this.scaleX = 1,
                    this.scaleY = 1,
                    this.oImgData = a,
                    this.radius = b,
                    this.setFrame(c)
            }
            return a.prototype.setFrame = function(a) {
                this.frameNum = a
            },
                a.prototype.render = function(a) {
                    var b = this.frameNum * this.oImgData.oData.spriteWidth % this.oImgData.img.width,
                        c = Math.floor(this.frameNum / (this.oImgData.img.width / this.oImgData.oData.spriteWidth)) * this.oImgData.oData.spriteHeight;
                    a.drawImage(this.oImgData.img, b, c, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight, -this.oImgData.oData.spriteWidth / 2 + this.offsetX, -this.oImgData.oData.spriteHeight / 2 + this.offsetY, this.oImgData.oData.spriteWidth, this.oImgData.oData.spriteHeight)
                },
                a
        } ();
        a.BasicSprite = b
    } (Utils || (Utils = {}));
var Utils; !
    function(a) {
        var b = function() {
            function a(a, b) {
                var c = this;
                this.canvasX = 0,
                    this.canvasY = 0,
                    this.canvasScaleX = 1,
                    this.canvasScaleY = 1,
                    this.prevHitTime = 0,
                    this.pauseIsOn = !1,
                    this.isDown = !1,
                    this.isDetectingKeys = !1,
                    this.isBugBrowser = b,
                    a.addEventListener("touchstart",
                        function(a) {
                            for (var b = 0; b < a.changedTouches.length; b++) c.hitDown(a, a.changedTouches[b].pageX, a.changedTouches[b].pageY, a.changedTouches[b].identifier)
                        },
                        !1),
                    a.addEventListener("touchend",
                        function(a) {
                            for (var b = 0; b < a.changedTouches.length; b++) c.hitUp(a, a.changedTouches[b].pageX, a.changedTouches[b].pageY, a.changedTouches[b].identifier)
                        },
                        !1),
                    a.addEventListener("touchmove",
                        function(a) {
                            for (var b = 0; b < c.aHitAreas.length; b++) c.move(a, a.changedTouches[b].pageX, a.changedTouches[b].pageY, a.changedTouches[b].identifier, !0)
                        },
                        !1),
                    a.addEventListener("mousedown",
                        function(a) {
                            c.isDown = !0,
                                c.hitDown(a, a.pageX, a.pageY, 1)
                        },
                        !1),
                    a.addEventListener("mouseup",
                        function(a) {
                            c.isDown = !1,
                                c.hitUp(a, a.pageX, a.pageY, 1)
                        },
                        !1),
                    a.addEventListener("mousemove",
                        function(a) {
                            c.move(a, a.pageX, a.pageY, 1, c.isDown)
                        },
                        !1),
                    this.aHitAreas = new Array,
                    this.aKeys = new Array
            }
            return a.prototype.setCanvas = function(a, b, c, d) {
                this.canvasX = a,
                    this.canvasY = b,
                    this.canvasScaleX = c,
                    this.canvasScaleY = d
            },
                a.prototype.hitDown = function(a, b, c, d) {
                    if (!this.pauseIsOn) {
                        var e = (new Date).getTime();
                        if (! (e - this.prevHitTime < 500 && isBugBrowser)) {
                            this.prevHitTime = e,
                                a.preventDefault(),
                                a.stopPropagation(),
                                b = (b - this.canvasX) * this.canvasScaleX,
                                c = (c - this.canvasY) * this.canvasScaleY;
                            for (var f = 0; f < this.aHitAreas.length; f++) if (this.aHitAreas[f].rect && b > this.aHitAreas[f].area[0] && c > this.aHitAreas[f].area[1] && b < this.aHitAreas[f].area[2] && c < this.aHitAreas[f].area[3]) {
                                this.aHitAreas[f].aTouchIdentifiers.push(d),
                                    this.aHitAreas[f].oData.hasLeft = !1,
                                    this.aHitAreas[f].oData.isDown || (this.aHitAreas[f].oData.isDown = !0, this.aHitAreas[f].oData.x = b, this.aHitAreas[f].oData.y = c, this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData));
                                break
                            }
                        }
                    }
                },
                a.prototype.hitUp = function(a, b, c, d) {
                    if (!this.pauseIsOn) {
                        a.preventDefault(),
                            a.stopPropagation(),
                            b = (b - this.canvasX) * this.canvasScaleX,
                            c = (c - this.canvasY) * this.canvasScaleY;
                        for (var e = 0; e < this.aHitAreas.length; e++) if (this.aHitAreas[e].rect && b > this.aHitAreas[e].area[0] && c > this.aHitAreas[e].area[1] && b < this.aHitAreas[e].area[2] && c < this.aHitAreas[e].area[3]) {
                            for (var f = 0; f < this.aHitAreas[e].aTouchIdentifiers.length; f++) this.aHitAreas[e].aTouchIdentifiers[f] == d && (this.aHitAreas[e].aTouchIdentifiers.splice(f, 1), f -= 1);
                            0 == this.aHitAreas[e].aTouchIdentifiers.length && (this.aHitAreas[e].oData.isDown = !1, this.aHitAreas[e].oData.multiTouch && this.aHitAreas[e].callback(this.aHitAreas[e].id, this.aHitAreas[e].oData));
                            break
                        }
                    }
                },
                a.prototype.move = function(a, b, c, d, e) {
                    if (!this.pauseIsOn && e) {
                        b = (b - this.canvasX) * this.canvasScaleX,
                            c = (c - this.canvasY) * this.canvasScaleY;
                        for (var f = 0; f < this.aHitAreas.length; f++) if (this.aHitAreas[f].rect) if (b > this.aHitAreas[f].area[0] && c > this.aHitAreas[f].area[1] && b < this.aHitAreas[f].area[2] && c < this.aHitAreas[f].area[3]) this.aHitAreas[f].oData.hasLeft = !1,
                            this.aHitAreas[f].oData.isDown || (this.aHitAreas[f].oData.isDown = !0, this.aHitAreas[f].oData.x = b, this.aHitAreas[f].oData.y = c, this.aHitAreas[f].aTouchIdentifiers.push(d), this.aHitAreas[f].oData.multiTouch && this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData)),
                            this.aHitAreas[f].oData.isDraggable && (this.aHitAreas[f].oData.isBeingDragged = !0, this.aHitAreas[f].oData.x = b, this.aHitAreas[f].oData.y = c, this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData), this.aHitAreas[f].oData.isBeingDragged = !1);
                        else if (this.aHitAreas[f].oData.isDown && !this.aHitAreas[f].oData.hasLeft) {
                            for (var g = 0; g < this.aHitAreas[f].aTouchIdentifiers.length; g++) this.aHitAreas[f].aTouchIdentifiers[g] == d && (this.aHitAreas[f].aTouchIdentifiers.splice(g, 1), g -= 1);
                            0 == this.aHitAreas[f].aTouchIdentifiers.length && (this.aHitAreas[f].oData.hasLeft = !0, this.aHitAreas[f].oData.multiTouch && this.aHitAreas[f].callback(this.aHitAreas[f].id, this.aHitAreas[f].oData))
                        }
                    }
                },
                a.prototype.keyDown = function(a) {
                    for (var b = 0; b < this.aKeys.length; b++) a.keyCode == this.aKeys[b].keyCode && (this.aKeys[b].oData.isDown = !0, this.aKeys[b].callback(this.aKeys[b].id, this.aKeys[b].oData))
                },
                a.prototype.keyUp = function(a) {
                    for (var b = 0; b < this.aKeys.length; b++) a.keyCode == this.aKeys[b].keyCode && (this.aKeys[b].oData.isDown = !1, this.aKeys[b].callback(this.aKeys[b].id, this.aKeys[b].oData))
                },
                a.prototype.addKey = function(a, b, c, d) {
                    var e = this;
                    this.isDetectingKeys || (window.addEventListener("keydown",
                        function(a) {
                            e.keyDown(a)
                        },
                        !1), window.addEventListener("keyup",
                        function(a) {
                            e.keyUp(a)
                        },
                        !1), this.isDetectingKeys = !0),
                        null == c && (c = new Object),
                        this.aKeys.push({
                            id: a,
                            callback: b,
                            oData: c,
                            keyCode: d
                        })
                },
                a.prototype.removeKey = function(a) {
                    for (var b = 0; b < this.aKeys.length; b++) this.aKeys[b].id == a && (this.aKeys.splice(b, 1), b -= 1)
                },
                a.prototype.addHitArea = function(a, b, c, d, e, f) {
                    "undefined" == typeof f && (f = !1),
                        null == c && (c = new Object),
                        f && this.removeHitArea(a);
                    var g = new Array;
                    switch (d) {
                        case "image":
                            var h;
                            h = new Array(e.aPos[0] - e.oImgData.oData.oAtlasData[e.id].width / 2, e.aPos[1] - e.oImgData.oData.oAtlasData[e.id].height / 2, e.aPos[0] + e.oImgData.oData.oAtlasData[e.id].width / 2, e.aPos[1] + e.oImgData.oData.oAtlasData[e.id].height / 2),
                                this.aHitAreas.push({
                                    id: a,
                                    aTouchIdentifiers: g,
                                    callback: b,
                                    oData: c,
                                    rect: !0,
                                    area: h
                                });
                            break;
                        case "rect":
                            this.aHitAreas.push({
                                id:
                                    a,
                                aTouchIdentifiers: g,
                                callback: b,
                                oData: c,
                                rect: !0,
                                area: e.aRect
                            })
                    }
                },
                a.prototype.removeHitArea = function(a) {
                    for (var b = 0; b < this.aHitAreas.length; b++) this.aHitAreas[b].id == a && (this.aHitAreas.splice(b, 1), b -= 1)
                },
                a
        } ();
        a.UserInput = b
    } (Utils || (Utils = {}));
var Utils; !
    function(a) {
        var b = function() {
            function a(a) {
                this.updateFreq = 10,
                    this.updateInc = 0,
                    this.frameAverage = 0,
                    this.display = 1,
                    this.log = "",
                    this.render = function(a) {
                        this.frameAverage += this.delta / this.updateFreq,
                            ++this.updateInc >= this.updateFreq && (this.updateInc = 0, this.display = this.frameAverage, this.frameAverage = 0),
                            a.textAlign = "left",
                            ctx.font = "10px Helvetica",
                            a.fillStyle = "#333333",
                            a.beginPath(),
                            a.rect(0, this.canvasHeight - 15, 40, 15),
                            a.closePath(),
                            a.fill(),
                            a.fillStyle = "#ffffff",
                            a.fillText(Math.round(1e3 / (1e3 * this.display)) + " fps " + this.log, 5, this.canvasHeight - 5)
                    },
                    this.canvasHeight = a
            }
            return a.prototype.update = function(a) {
                this.delta = a
            },
                a
        } ();
        a.FpsMeter = b
    } (Utils || (Utils = {}));
var Elements; !
    function(a) {
        var b = function() {
            function a(a, b, c) {
                this.x = 0,
                    this.y = 0,
                    this.targY = 0,
                    this.incY = 0,
                    this.posY = 0,
                    this.oImgData = a,
                    this.canvasWidth = b,
                    this.canvasHeight = c
            }
            return a.prototype.updateScroll = function(a) {
                this.incY += 5 * a,
                    this.posY -= 8 * this.posY * a
            },
                a.prototype.renderScroll = function(a) {
                    var b = 40;
                    a.drawImage(this.oImgData.img, 0, 0);
                    for (var c = 0; b > c; c++) a.drawImage(this.oImgData.img, c * (this.canvasWidth / b), 0, this.canvasWidth / b, this.canvasHeight, c * (this.canvasWidth / b), 2 * Math.sin(this.incY + c / 5) - this.posY, this.canvasWidth / b, this.canvasHeight)
                },
                a.prototype.render = function(a) {
                    a.drawImage(this.oImgData.img, 0, 0)
                },
                a
        } ();
        a.Background = b
    } (Elements || (Elements = {}));
var Elements; !
    function(a) {
        var b = function() {
            function a(a, b, c) {
                this.inc = 0,
                    this.oSplashScreenImgData = a,
                    this.canvasWidth = b,
                    this.canvasHeight = c,
                    this.posY = -this.canvasHeight,
                    TweenLite.to(this, .5, {
                        posY: 0
                    })
            }
            return a.prototype.render = function(a, b) {
                this.inc += 5 * b,
                    a.drawImage(this.oSplashScreenImgData.img, 0, 0 - this.posY)
            },
                a
        } ();
        a.Splash = b
    } (Elements || (Elements = {}));
var Elements; !
    function(a) {
        var b = function() {
            function a(a, b, c, d, e, f) {
                this.timer = .3,
                    this.endTime = 0,
                    this.posY = 0,
                    this.numberSpace = 28,
                    this.incY = 0,
                    this.oPanelsImgData = a,
                    this.oNumbersImgData = b,
                    this.panelType = c,
                    this.aButs = d,
                    this.canvasWidth = e,
                    this.canvasHeight = f
            }
            return a.prototype.update = function(a) {
                this.incY += 5 * a
            },
                a.prototype.startTween1 = function() {
                    this.posY = 800,
                        TweenLite.to(this, .8, {
                            posY: 0,
                            ease: "Back.easeOut"
                        })
                },
                a.prototype.startTween2 = function() {
                    this.posY = 800,
                        TweenLite.to(this, .5, {
                            posY: 0,
                            ease: "Quad.easeOut"
                        })
                },
                a.prototype.startTweenEndLevel = function() {
                    this.aStarPos = new Array;
                    for (var a = 0; a < this.oScoreData.stars; a++) this.aStarPos.push({
                        posY: -400,
                        scaleY: 2
                    }),
                        TweenLite.to(this.aStarPos[a], 1.5, {
                            posY: 0,
                            scaleY: 1,
                            ease: "Bounce.easeOut",
                            delay: .3 * a
                        });
                    this.posY = 800,
                        TweenLite.to(this, .8, {
                            posY: 0,
                            ease: "Back.easeOut"
                        })
                },
                a.prototype.render = function(a, b) {
                    switch ("undefined" == typeof b && (b = !0), b || this.addButs(a), this.panelType) {
                        case "start":
                            var c = 0,
                                d = c * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width,
                                e = Math.floor(c / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
                            a.drawImage(this.oPanelsImgData.img, d, e, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
                            break;
                        case "credits":
                            var c = 3,
                                d = c * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width,
                                e = Math.floor(c / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
                            a.drawImage(this.oPanelsImgData.img, d, e, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
                            break;
                        case "gameEnd":
                            var c = 2,
                                d = c * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width,
                                e = Math.floor(c / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
                            a.drawImage(this.oPanelsImgData.img, d, e, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
                            for (var f = this.oScoreData.score,
                                     g = 0; g < f.toString().length; g++) {
                                c = parseFloat(f.toString().charAt(g));
                                var d = c * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    e = Math.floor(c / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
                                a.drawImage(this.oNumbersImgData.img, d, e, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 302 + g * this.numberSpace, 214 + this.posY, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight)
                            }
                            for (var f = this.oScoreData.racks,
                                     g = 0; g < f.toString().length; g++) {
                                c = parseFloat(f.toString().charAt(g));
                                var d = c * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    e = Math.floor(c / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
                                a.drawImage(this.oNumbersImgData.img, d, e, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 712 + g * this.numberSpace / 2, 65 + this.posY, this.oNumbersImgData.oData.spriteWidth / 2, this.oNumbersImgData.oData.spriteHeight / 2)
                            }
                            for (var f = this.oScoreData.balls,
                                     g = 0; g < f.toString().length; g++) {
                                c = parseFloat(f.toString().charAt(g));
                                var d = c * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    e = Math.floor(c / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
                                a.drawImage(this.oNumbersImgData.img, d, e, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 712 + g * this.numberSpace / 2, 113 + this.posY, this.oNumbersImgData.oData.spriteWidth / 2, this.oNumbersImgData.oData.spriteHeight / 2)
                            }
                            for (var f = this.oScoreData.streak,
                                     g = 0; g < f.toString().length; g++) {
                                c = parseFloat(f.toString().charAt(g));
                                var d = c * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                                    e = Math.floor(c / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
                                a.drawImage(this.oNumbersImgData.img, d, e, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 712 + g * this.numberSpace / 2, 163 + this.posY, this.oNumbersImgData.oData.spriteWidth / 2, this.oNumbersImgData.oData.spriteHeight / 2)
                            }
                            break;
                        case "tutorial":
                            var c = 1,
                                d = c * this.oPanelsImgData.oData.spriteWidth % this.oPanelsImgData.img.width,
                                e = Math.floor(c / (this.oPanelsImgData.img.width / this.oPanelsImgData.oData.spriteWidth)) * this.oPanelsImgData.oData.spriteHeight;
                            a.drawImage(this.oPanelsImgData.img, d, e, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight, 0, 0 + this.posY, this.oPanelsImgData.oData.spriteWidth, this.oPanelsImgData.oData.spriteHeight);
                            break;
                        case "pause":
                            a.fillStyle = "rgba(0, 0, 0, 0.75)",
                                a.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
                    }
                    b && this.addButs(a)
                },
                a.prototype.addButs = function(a) {
                    for (var b = 0; b < this.aButs.length; b++) {
                        var c = this.posY,
                            d = 0;
                        0 != this.incY && (d = 3 * Math.sin(this.incY + 45 * b));
                        var e = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].x,
                            f = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].y,
                            g = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].width,
                            h = this.aButs[b].oImgData.oData.oAtlasData[this.aButs[b].id].height;
                        a.drawImage(this.aButs[b].oImgData.img, e, f, g, h, this.aButs[b].aPos[0] - g / 2 + c, this.aButs[b].aPos[1] - h / 2 - d, g, h)
                    }
                },
                a
        } ();
        a.Panel = b
    } (Elements || (Elements = {}));
var Elements; !
    function(a) {
        var b = function() {
            function a(a, b, c, d) {
                this.x = 0,
                    this.y = 0,
                    this.letterSpace = 13,
                    this.prevSecs = 0,
                    this.oHudImgData = a,
                    this.oTimeNumbersImgData = b,
                    this.oTableNumbersImgData = c,
                    this.oData = d,
                    this.oData.aTime = new Array
            }
            return a.prototype.update = function(a, b) {
                this.x = a,
                    this.y = b
            },
                a.prototype.render = function(a) {
                    a.drawImage(this.oHudImgData.img, 0, 0);
                    for (var b = 0; b < this.oData.aTime.length; b++) {
                        var c = this.oData.aTime[b],
                            d = c * this.oTimeNumbersImgData.oData.spriteWidth % this.oTimeNumbersImgData.img.width,
                            e = Math.floor(c / (this.oTimeNumbersImgData.img.width / this.oTimeNumbersImgData.oData.spriteWidth)) * this.oTimeNumbersImgData.oData.spriteHeight;
                        a.drawImage(this.oTimeNumbersImgData.img, d, e, this.oTimeNumbersImgData.oData.spriteWidth, this.oTimeNumbersImgData.oData.spriteHeight, 255 + b * this.letterSpace, 54 + this.y, this.oTimeNumbersImgData.oData.spriteWidth, this.oTimeNumbersImgData.oData.spriteHeight)
                    }
                    for (var b = 0; b < this.oData.racks.toString().length; b++) {
                        var c = parseFloat(this.oData.racks.toString().charAt(b)),
                            d = c * this.oTableNumbersImgData.oData.spriteWidth % this.oTableNumbersImgData.img.width,
                            e = Math.floor(c / (this.oTableNumbersImgData.img.width / this.oTableNumbersImgData.oData.spriteWidth)) * this.oTableNumbersImgData.oData.spriteHeight;
                        a.drawImage(this.oTableNumbersImgData.img, d, e, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight, 562 + b * this.letterSpace, 54 + this.y, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight)
                    }
                    for (var f = Math.floor(this.oData.multiplier), b = 0; b <= f.toString().length; b++) {
                        c = parseFloat(f.toString().charAt(b));
                        var d = c * this.oTableNumbersImgData.oData.spriteWidth % this.oTableNumbersImgData.img.width,
                            e = Math.floor(c / (this.oTableNumbersImgData.img.width / this.oTableNumbersImgData.oData.spriteWidth)) * this.oTableNumbersImgData.oData.spriteHeight;
                        a.drawImage(this.oTableNumbersImgData.img, d, e, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight, 297 + b * (this.letterSpace + 6), 404 + this.y, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight)
                    }
                    for (var b = 0; b < this.oData.score.toString().length; b++) {
                        var c = parseFloat(this.oData.score.toString().charAt(b)),
                            d = c * this.oTableNumbersImgData.oData.spriteWidth % this.oTableNumbersImgData.img.width,
                            e = Math.floor(c / (this.oTableNumbersImgData.img.width / this.oTableNumbersImgData.oData.spriteWidth)) * this.oTableNumbersImgData.oData.spriteHeight;
                        a.drawImage(this.oTableNumbersImgData.img, d, e, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight, 558 + b * this.letterSpace, 404 + this.y, this.oTableNumbersImgData.oData.spriteWidth, this.oTableNumbersImgData.oData.spriteHeight)
                    }
                },
                a.prototype.setTime = function(a) {
                    var b = Math.floor(a / 60),
                        c = Math.floor((a - 60 * b) / 10),
                        d = Math.floor(a - 60 * b - 10 * c);
                    this.oData.aTime = [b, 10, c, d],
                        10 > a && d < this.prevSecs && playSound("bell"),
                        this.prevSecs = d
                },
                a
        } ();
        a.Hud = b
    } (Elements || (Elements = {}));
var Elements; !
    function(a) {
        var b = function() {
            function a(a, b, c) {
                this.radian = Math.PI / 180,
                    this.oLevelImgData = a,
                    this.canvasWidth = b,
                    this.canvasHeight = c
            }
            return a.prototype.update = function(a, b) {
                this.x = a,
                    this.y = b
            },
                a.prototype.render = function(a) {
                    a.drawImage(this.oLevelImgData.img, -this.x, -this.y, this.canvasWidth, this.canvasHeight, 0, 0, this.canvasWidth, this.canvasHeight)
                },
                a
        } ();
        a.Table = b
    } (Elements || (Elements = {}));
var __extends = this.__extends ||
        function(a, b) {
            function c() {
                this.constructor = a
            }
            c.prototype = b.prototype,
                a.prototype = new c
        },
    Elements; !
    function(a) {
        var b = function(a) {
            function b(b, c, d, e, f, g) {
                a.call(this, b, 24, 26, d.id + "Waiting"),
                    this.radian = Math.PI / 180,
                    this.angle = 0,
                    this.inc = 0,
                    this.ballRadius = 14,
                    this.vx = 0,
                    this.vy = 0,
                    this.m = 1,
                    this.f = 1,
                    this.b = 1,
                    this.oNumbersImgData = c,
                    this.oData = d,
                    this.ballCallback = e,
                    this.trackX = this.startX = this.oData.x,
                    this.trackY = this.startY = this.oData.y,
                    this.p0 = {
                        x: this.trackX,
                        y: this.trackY
                    },
                    this.p1 = {
                        x: this.trackX,
                        y: this.trackY
                    },
                    this.canvasWidth = f,
                    this.canvasHeight = g,
                    this.renderFunc = this.renderBall,
                    this.changeState("waiting")
            }
            return __extends(b, a),
                b.prototype.changeState = function(a, b) {
                    switch ("undefined" == typeof b && (b = null), a) {
                        case "reset":
                            this.fps = 24,
                                this.state = "reset",
                                this.updateFunc = this.updateWaiting,
                                this.renderFunc = this.renderBall,
                                this.removeMe = !1,
                                this.trackX = b.x,
                                this.trackY = b.y,
                                this.x = this.trackX,
                                this.y = this.trackY - 40,
                                this.p0 = {
                                    x: this.trackX,
                                    y: this.trackY
                                },
                                this.p1 = {
                                    x: this.trackX,
                                    y: this.trackY
                                },
                                this.scaleX = this.scaleY = 1;
                            break;
                        case "waiting":
                            this.state = "waiting",
                                this.updateFunc = this.updateWaiting;
                            break;
                        case "indicating":
                            this.state = "indicating",
                                this.setAnimType("loop", this.oData.id + "Waiting");
                            break;
                        case "aiming":
                            this.state = "aiming",
                                this.updateFunc = this.updateWaiting,
                                this.setAnimType("loop", this.oData.id + "Moving");
                            break;
                        case "moving":
                            this.state = "moving",
                                this.vx = b.power / 10 * Math.cos(b.angle),
                                this.vy = b.power / 10 * Math.sin(b.angle),
                                this.vz = 1,
                                this.dec = 1,
                                this.setAnimType("loop", this.oData.id + "Moving"),
                                this.p0 = {
                                    x: this.trackX,
                                    y: this.trackY
                                },
                                this.p1 = {
                                    x: this.trackX,
                                    y: this.trackY
                                },
                                this.updateFunc = this.updateMoving;
                            break;
                        case "rebound":
                            this.state = "moving",
                                this.vz = 1,
                                this.dec = 1,
                                this.setAnimType("loop", this.oData.id + "Moving"),
                                this.p0 = {
                                    x: this.trackX,
                                    y: this.trackY
                                },
                                this.p1 = {
                                    x: this.trackX,
                                    y: this.trackY
                                },
                                this.updateFunc = this.updateMoving;
                            break;
                        case "holed":
                            this.state = "holed",
                                this.oData.score = b.score,
                                this.trackX = b.x,
                                this.trackY = b.y,
                                this.scaleX = this.scaleY = 2,
                                this.fps = 18,
                                this.setAnimType("once", "explode"),
                                this.animEndedFunc = function() {
                                    this.ballHoled()
                                },
                                this.updateFunc = this.updateWaiting,
                                this.renderFunc = this.renderHoling;
                            break;
                        case "scoring1":
                            this.state = "holed",
                                this.scaleX = this.scaleY = 1,
                                this.scoreX = this.x,
                                this.scoreY = this.y - this.oNumbersImgData.oData.spriteHeight / 2,
                                this.x = this.y = 0,
                                this.scoreScale = .5,
                                this.tween = TweenLite.to(this, 1, {
                                    scoreY: this.scoreY - 5,
                                    scoreScale: 1,
                                    ease: "Back.easeOut",
                                    onComplete: this.scoreEnded1,
                                    onCompleteParams: [this]
                                }),
                                this.updateFunc = this.updateScoring,
                                this.renderFunc = this.renderScoring,
                                playSound("score", .5);
                            break;
                        case "scoring2":
                            this.state = "holed",
                                this.scoreScale = 1,
                                this.tween = TweenLite.to(this, .5, {
                                    scoreX: this.canvasWidth + 100,
                                    scoreScale: 2,
                                    ease: "Back.easeIn",
                                    onComplete: this.scoreEnded2,
                                    onCompleteParams: [this]
                                })
                    }
                },
                b.prototype.moveEnded = function(a) {
                    a.changeState("waiting"),
                        a.ballCallback("moveEnded")
                },
                b.prototype.ballHoled = function(a) {
                    "undefined" == typeof a && (a = this),
                        "cueBall" != a.oData.type ? a.changeState("scoring1") : a.scoreEnded2(a),
                        a.ballCallback("moveEnded")
                },
                b.prototype.scoreEnded1 = function(a) {
                    a.changeState("scoring2")
                },
                b.prototype.scoreEnded2 = function(a) {
                    a.removeMe = !0,
                        a.ballCallback("holeEnded")
                },
                b.prototype.update = function(a, b, c) {
                    this.updateFunc(a, b, c)
                },
                b.prototype.updateMoving = function(b, c, d) {
                    a.prototype.updateAnimation.call(this, d),
                        this.vx *= .98,
                        this.vy *= .98,
                        Math.abs(this.vx) < .05 && Math.abs(this.vy) < .05 && this.moveEnded(this),
                        this.x = this.trackX + b,
                        this.y = this.trackY + c
                },
                b.prototype.updateScoring = function() {},
                b.prototype.updateWaiting = function(b, c, d) {
                    a.prototype.updateAnimation.call(this, d),
                        this.x = this.trackX + b,
                        this.y = this.trackY + c
                },
                b.prototype.render = function(a) {
                    this.renderFunc(a)
                },
                b.prototype.renderBall = function(b) {
                    a.prototype.render.call(this, b)
                },
                b.prototype.renderHoling = function(b) {
                    a.prototype.render.call(this, b)
                },
                b.prototype.renderScoring = function(a) {
                    for (var b = this.oData.score,
                             c = 0; c < b.toString().length; c++) {
                        var d = parseFloat(b.toString().charAt(c));
                        isNaN(d) && (d = 10);
                        var e = d * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                            f = Math.floor(d / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
                        a.drawImage(this.oNumbersImgData.img, e, f, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, this.scoreX + 28 * c - 28 * b.toString().length / 2 - 10, this.scoreY, this.oNumbersImgData.oData.spriteWidth * this.scoreScale, this.oNumbersImgData.oData.spriteHeight / this.scoreScale)
                    }
                },
                b
        } (Utils.AnimSprite);
        a.Ball = b
    } (Elements || (Elements = {}));
var Elements; !
    function(a) {
        var b = function() {
            function a(a, b, c, d) {
                this.x = 0,
                    this.y = 0,
                    this.scaleX = 0,
                    this.scaleY = 1,
                    this.alpha = 1,
                    this.maxLength = 100,
                    this.oArrowImgData = a,
                    this.oCueImgData = b,
                    this.canvasWidth = c,
                    this.canvasHeight = d,
                    this.renderFunc = this.renderAim
            }
            return a.prototype.takeShot = function(a) {
                this.renderFunc = this.renderShot,
                    this.shotHyp = this.hyp,
                    this.shotRot = this.rotation,
                    this.tween = TweenLite.to(this, .15, {
                        shotHyp: 0,
                        ease: "Quad.easeIn",
                        onComplete: this.shotEnded,
                        onCompleteParams: [this, a]
                    })
            },
                a.prototype.shotEnded = function(a, b) {
                    b.changeState("moving", {
                        power: a.hyp,
                        angle: a.shotRot
                    })
                },
                a.prototype.update = function(a, b, c, d, e) {
                    this.oLineData = e,
                        this.x = a,
                        this.y = b,
                        this.lengthX = this.x - c,
                        this.lengthY = this.y - d,
                        this.hyp = Math.min(e.hyp, this.maxLength),
                        this.scaleX = Math.min(this.hyp / this.maxLength, 1),
                        this.rotation = e.aimRot
                },
                a.prototype.render = function(a) {
                    this.renderFunc(a)
                },
                a.prototype.renderAim = function(a) {
                    if (! (this.scaleX < .1)) {
                        if (this.oLineData.targBall) {
                            a.save(),
                                a.globalAlpha = this.alpha - (1 - this.scaleX),
                                a.translate(this.oLineData.targBall.x, this.oLineData.targBall.y),
                                a.rotate(this.oLineData.targBallRot);
                            var b = 2 * this.oArrowImgData.oData.spriteWidth % this.oArrowImgData.img.width,
                                c = Math.floor(2 / (this.oArrowImgData.img.width / this.oArrowImgData.oData.spriteWidth)) * this.oArrowImgData.oData.spriteHeight;
                            a.drawImage(this.oArrowImgData.img, b, c, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight, -this.oArrowImgData.oData.spriteWidth / 2, -this.oArrowImgData.oData.spriteHeight / 2, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight),
                                a.restore(),
                                a.save(),
                                a.globalAlpha = this.alpha - (1 - this.scaleX),
                                a.translate(this.oLineData.bounceX, this.oLineData.bounceY),
                                a.rotate(this.oLineData.bounceRot);
                            var b = 0 * this.oArrowImgData.oData.spriteWidth % this.oArrowImgData.img.width,
                                c = Math.floor(0 / (this.oArrowImgData.img.width / this.oArrowImgData.oData.spriteWidth)) * this.oArrowImgData.oData.spriteHeight;
                            a.drawImage(this.oArrowImgData.img, b, c, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight, -this.oArrowImgData.oData.spriteWidth / 2, -this.oArrowImgData.oData.spriteHeight / 2, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight),
                                a.restore()
                        } else {
                            a.save(),
                                a.globalAlpha = this.alpha - (1 - this.scaleX),
                                a.translate(this.oLineData.bounceX, this.oLineData.bounceY),
                                a.rotate(this.oLineData.bounceRot);
                            var b = 3 * this.oArrowImgData.oData.spriteWidth % this.oArrowImgData.img.width,
                                c = Math.floor(3 / (this.oArrowImgData.img.width / this.oArrowImgData.oData.spriteWidth)) * this.oArrowImgData.oData.spriteHeight;
                            a.drawImage(this.oArrowImgData.img, b, c, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight, -this.oArrowImgData.oData.spriteWidth / 2, -this.oArrowImgData.oData.spriteHeight / 2, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight),
                                a.restore()
                        }
                        var d = this.x - this.oLineData.bounceX,
                            e = this.y - this.oLineData.bounceY,
                            f = Math.sqrt(d * d + e * e);
                        a.save(),
                            a.globalAlpha = this.alpha - (1 - this.scaleX),
                            a.translate(this.x, this.y),
                            a.rotate(this.rotation);
                        var b = 1 * this.oArrowImgData.oData.spriteWidth % this.oArrowImgData.img.width,
                            c = Math.floor(1 / (this.oArrowImgData.img.width / this.oArrowImgData.oData.spriteWidth)) * this.oArrowImgData.oData.spriteHeight;
                        a.drawImage(this.oArrowImgData.img, b, c, this.oArrowImgData.oData.spriteWidth, this.oArrowImgData.oData.spriteHeight, 0, -this.oArrowImgData.oData.spriteHeight / 2, Math.max(f - 13, 1), this.oArrowImgData.oData.spriteHeight),
                            a.restore(),
                            a.save(),
                            a.globalAlpha = this.alpha,
                            a.translate(this.x, this.y),
                            a.rotate(this.rotation),
                            a.drawImage(this.oCueImgData.img, 0, 0, this.oCueImgData.oData.spriteWidth, this.oCueImgData.oData.spriteHeight, -this.hyp - this.oCueImgData.oData.spriteWidth - 5, -this.oCueImgData.oData.spriteHeight / 2, this.oCueImgData.oData.spriteWidth, this.oCueImgData.oData.spriteHeight),
                            a.restore()
                    }
                },
                a.prototype.renderShot = function(a) {
                    0 != this.shotHyp && (a.save(), a.translate(this.x, this.y), a.rotate(this.rotation), a.drawImage(this.oCueImgData.img, 0, 0, this.oCueImgData.oData.spriteWidth, this.oCueImgData.oData.spriteHeight, -this.shotHyp - this.oCueImgData.oData.spriteWidth - 5, -this.oCueImgData.oData.spriteHeight / 2, this.oCueImgData.oData.spriteWidth, this.oCueImgData.oData.spriteHeight), a.restore())
                },
                a
        } ();
        a.Arrow = b
    } (Elements || (Elements = {}));
var Elements; !
    function(a) {
        var b = function(a) {
            function b(b, c, d, e, f) {
                a.call(this, b, 22, 20, "running"),
                    this.canHit = !0,
                    this.oNumbersImgData = c,
                    this.ballCallback = d,
                    this.canvasWidth = e,
                    this.canvasHeight = f,
                    this.reset(),
                    this.frameInc = Math.ceil(100 * Math.random()),
                    this.animEndedFunc = this.showScore
            }
            return __extends(b, a),
                b.prototype.reset = function() {
                    this.trackX = 550 * Math.random() + 130,
                        this.trackY = 247 * Math.random() + 120,
                        this.scaleX = this.scaleY = 0,
                        this.setAnimType("loop", "running"),
                        TweenLite.to(this, .5, {
                            scaleX: 1,
                            scaleY: 1,
                            ease: "Quad.easeOut"
                        }),
                        this.removeMe = !1,
                        this.canHit = !0,
                        this.setPos()
                },
                b.prototype.setPos = function(a) {
                    "undefined" == typeof a && (a = this);
                    var b = 550 * Math.random() + 130,
                        c = 247 * Math.random() + 120;
                    a.tween = TweenLite.to(a, 2 * Math.random() + 2, {
                        trackX: b,
                        trackY: c,
                        ease: "Quad.easeInOut",
                        onComplete: a.setPos,
                        onCompleteParams: [a]
                    }),
                        a.rotation = Math.atan2(c - a.trackY, b - a.trackX),
                        this.updateFunc = this.updateMoving,
                        this.renderFunc = this.renderMoving
                },
                b.prototype.hit = function() {
                    this.tween.kill(),
                        this.canHit = !1,
                        this.setAnimType("once", "explode"),
                        this.ballCallback("hitRoach", {
                            roach: this
                        })
                },
                b.prototype.showScore = function() {
                    this.scoreScale = .5,
                        this.y -= 75,
                        this.tween = TweenLite.to(this, 1, {
                            y: this.y - 5,
                            scoreScale: 1,
                            ease: "Back.easeOut",
                            onComplete: this.scoreEnded1,
                            onCompleteParams: [this]
                        }),
                        this.rotation = 0,
                        this.updateFunc = this.updateScoring,
                        this.renderFunc = this.renderScoring
                },
                b.prototype.scoreEnded1 = function(a) {
                    "undefined" == typeof a && (a = this),
                        a.scoreScale = 1,
                        a.tween = TweenLite.to(a, .5, {
                            x: a.canvasWidth + 100,
                            scoreScale: 2,
                            ease: "Back.easeIn",
                            onComplete: a.scoreEnded2,
                            onCompleteParams: [a]
                        })
                },
                b.prototype.scoreEnded2 = function(a) {
                    a.removeMe = !0
                },
                b.prototype.update = function(a, b, c) {
                    this.updateFunc(a, b, c)
                },
                b.prototype.updateMoving = function(b, c, d) {
                    a.prototype.updateAnimation.call(this, d),
                        this.x = this.trackX + b,
                        this.y = this.trackY + c
                },
                b.prototype.updateScoring = function() {},
                b.prototype.render = function(a) {
                    this.renderFunc(a)
                },
                b.prototype.renderMoving = function(b) {
                    a.prototype.render.call(this, b)
                },
                b.prototype.renderScoring = function(a) {
                    for (var b = this.roachScore,
                             c = 0; c < b.toString().length; c++) {
                        var d = parseFloat(b.toString().charAt(c)),
                            e = d * this.oNumbersImgData.oData.spriteWidth % this.oNumbersImgData.img.width,
                            f = Math.floor(d / (this.oNumbersImgData.img.width / this.oNumbersImgData.oData.spriteWidth)) * this.oNumbersImgData.oData.spriteHeight;
                        a.drawImage(this.oNumbersImgData.img, e, f, this.oNumbersImgData.oData.spriteWidth, this.oNumbersImgData.oData.spriteHeight, 0 + 30 * c - 30 * b.toString().length / 2 - 10, 0, this.oNumbersImgData.oData.spriteWidth * this.scoreScale, this.oNumbersImgData.oData.spriteHeight / this.scoreScale)
                    }
                },
                b
        } (Utils.AnimSprite);
        a.Roach = b
    } (Elements || (Elements = {}));
var Utils; !
    function(a) {
        var b = function() {
            function a(a, b) {
                this.aLines = new Array,
                    this.aBalls = new Array,
                    this.aLines = a,
                    this.aBalls = b;
                for (var c = 0; c < this.aLines.length; c++) this.updateVector(this.aLines[c], null, !0)
            }
            return a.prototype.drawAll = function(a) {
                for (var b = 0; b < this.aBalls.length; b++) if ("moving" == this.aBalls[b].state) {
                    var c = this.aBalls[b];
                    c.trackX = c.p1.x,
                        c.trackY = c.p1.y,
                        c.p0 = c.p1,
                        this.updateVector(c, a)
                }
            },
                a.prototype.update = function(a) {
                    var b;
                    for (b = 0; b < this.aBalls.length; b++) {
                        var c = this.aBalls[b];
                        if ("moving" == c.state) {
                            this.updateVector(c, a);
                            for (var d = 0; d < this.aLines.length; d++) {
                                this.fi = this.findIntersection(c, this.aLines[d]),
                                    this.updateVector(this.fi, a, !1);
                                var e = c.radius - this.fi.len;
                                if (e >= 0) {
                                    playSound("bumper" + Math.ceil(2 * Math.random())),
                                        c.p1.x += this.fi.dx * e,
                                        c.p1.y += this.fi.dy * e;
                                    var f = {
                                            dx: this.fi.lx,
                                            dy: this.fi.ly,
                                            lx: this.fi.dx,
                                            ly: this.fi.dy,
                                            b: 1,
                                            f: 1
                                        },
                                        g = this.bounce(c, f);
                                    c.vx = g.vx,
                                        c.vy = g.vy
                                }
                            }
                            for (var h = 0; h < this.aBalls.length; h++) if (b != h && "holed" != this.aBalls[h].state) {
                                var i = this.aBalls[h];
                                this.vc = {},
                                    this.vc.p0 = c.p0,
                                    this.vc.p1 = i.p0,
                                    this.updateVector(this.vc, a, !0);
                                var j = c.ballRadius + i.ballRadius,
                                    k = j - this.vc.len;
                                if (k >= 0) {
                                    c.p1.x -= this.vc.dx * k,
                                        c.p1.y -= this.vc.dy * k;
                                    var l = this.bounceBalls(c, i, this.vc);
                                    c.vx = l.vx1,
                                        c.vy = l.vy1,
                                        i.vx = l.vx2,
                                        i.vy = l.vy2,
                                        c.changeState("rebound"),
                                        i.changeState("rebound"),
                                        playSound("ballHit" + Math.ceil(3 * Math.random()))
                                } else if (k >= -50) {
                                    this.v3 = new Object,
                                        this.v3.p0 = c.p0,
                                        this.v3.p1 = {
                                            x: 0,
                                            y: 0
                                        },
                                        this.v3.vx = c.vx - i.vx,
                                        this.v3.vy = c.vy - i.vy,
                                        this.updateVector(this.v3, a);
                                    var m = this.projectVector(this.vc, this.v3.dx, this.v3.dy);
                                    this.vn = {};
                                    var n = {
                                        x: c.p0.x + m.vx,
                                        y: c.p0.y + m.vy
                                    };
                                    this.vn.p0 = n,
                                        this.vn.p1 = i.p0,
                                        this.updateVector(this.vn, a, !0);
                                    var o = j - this.vn.len;
                                    if (o > 0) {
                                        var p = Math.sqrt(j * j - this.vn.len * this.vn.len);
                                        if (this.p3 = {
                                            x: this.vn.p0.x - p * this.v3.dx,
                                            y: this.vn.p0.y - p * this.v3.dy
                                        },
                                            this.v4 = {
                                                p0: c.p0,
                                                p1: this.p3
                                            },
                                            this.updateVector(this.v4, a, !0), this.v4.len <= this.v3.len && this.dotP(this.v4, c) > 0) {
                                            var q = this.v4.len / this.v3.len;
                                            c.p1 = {
                                                x: c.p0.x + q * c.vx,
                                                y: c.p0.y + q * c.vy
                                            },
                                                i.p1 = {
                                                    x: i.p0.x + q * i.vx,
                                                    y: i.p0.y + q * i.vy
                                                },
                                                this.vc = {
                                                    p0: c.p1,
                                                    p1: i.p1
                                                },
                                                this.updateVector(this.vc, a, !0),
                                                l = this.bounceBalls(c, i, this.vc),
                                                c.vx = l.vx1,
                                                c.vy = l.vy1,
                                                i.vx = l.vx2,
                                                i.vy = l.vy2,
                                                this.makeVector(i),
                                                this.makeVector(c),
                                                c.changeState("rebound"),
                                                i.changeState("rebound"),
                                                playSound("ballHit" + Math.ceil(3 * Math.random()))
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.drawAll(a)
                },
                a.prototype.updateVector = function(a, b, c) {
                    "undefined" == typeof c && (c = !1),
                        b = .0167,
                        1 == c ? (a.vx = a.p1.x - a.p0.x, a.vy = a.p1.y - a.p0.y) : (a.p1.x = a.p0.x + 60 * a.vx * b, a.p1.y = a.p0.y + 60 * a.vy * b),
                        this.makeVector(a)
                },
                a.prototype.makeVector = function(a) {
                    a.len = Math.sqrt(a.vx * a.vx + a.vy * a.vy),
                        a.len > 0 ? (a.dx = a.vx / a.len, a.dy = a.vy / a.len) : (a.dx = 0, a.dy = 0),
                        a.rx = -a.dy,
                        a.ry = a.dx,
                        a.lx = a.dy,
                        a.ly = -a.dx
                },
                a.prototype.dotP = function(a, b) {
                    var c = a.vx * b.vx + a.vy * b.vy;
                    return c
                },
                a.prototype.projectVector = function(a, b, c) {
                    var d = a.vx * b + a.vy * c,
                        e = {};
                    return e.vx = d * b,
                        e.vy = d * c,
                        e
                },
                a.prototype.bounceBalls = function(a, b, c) {
                    var d = this.projectVector(a, c.dx, c.dy),
                        e = this.projectVector(a, c.lx, c.ly),
                        f = this.projectVector(b, c.dx, c.dy),
                        g = this.projectVector(b, c.lx, c.ly),
                        h = a.m * d.vx + b.m * f.vx,
                        i = d.vx - f.vx,
                        j = (h + i * a.m) / (a.m + b.m),
                        k = j - i;
                    h = a.m * d.vy + b.m * f.vy,
                        i = d.vy - f.vy;
                    var l = (h + i * a.m) / (a.m + b.m),
                        m = l - i,
                        n = {};
                    return n.vx1 = e.vx + k,
                        n.vy1 = e.vy + m,
                        n.vx2 = g.vx + j,
                        n.vy2 = g.vy + l,
                        n
                },
                a.prototype.bounce = function(a, b) {
                    var c = this.projectVector(a, b.dx, b.dy),
                        d = this.projectVector(a, b.lx, b.ly),
                        e = {};
                    return d.len = Math.sqrt(d.vx * d.vx + d.vy * d.vy),
                        d.vx = b.lx * d.len,
                        d.vy = b.ly * d.len,
                        e.vx = a.f * b.f * c.vx + a.b * b.b * d.vx,
                        e.vy = a.f * b.f * c.vy + a.b * b.b * d.vy,
                        e
                },
                a.prototype.findIntersection = function(a, b) {
                    var c = {},
                        d = {};
                    d.vx = a.p1.x - b.p0.x,
                        d.vy = a.p1.y - b.p0.y;
                    var e = d.vx * b.dx + d.vy * b.dy;
                    if (0 > e) c = d;
                    else {
                        var f = {};
                        f.vx = a.p1.x - b.p1.x,
                            f.vy = a.p1.y - b.p1.y,
                            e = f.vx * b.dx + f.vy * b.dy,
                            c = e > 0 ? f: this.projectVector(d, b.lx, b.ly)
                    }
                    return c.p0 = {
                        x: 0,
                        y: 0
                    },
                        c.p1 = {
                            x: 0,
                            y: 0
                        },
                        c
                },
                a
        } ();
        a.Physics2D = b
    } (Utils || (Utils = {}));
var Utils; !
    function(a) {
        var b = function() {
            function a(a, b, c) {
                this.aLines = new Array,
                    this.aBalls = new Array,
                    this.oLineData = {
                        targBall: null,
                        targBallRot: 0,
                        bounceX: 0,
                        bounceY: 0,
                        bounceRot: 0,
                        hyp: 0,
                        aimRot: 0
                    },
                    this.aLines = a,
                    this.aBalls = b,
                    this.cueBall = c
            }
            return a.prototype.checkLine = function(a, b, c, d, e) {
                var f = this.cueBall.x - c,
                    g = this.cueBall.y - d,
                    h = Math.abs(f / g);
                this.oLineData.hyp = Math.sqrt(f * f + g * g),
                    this.oLineData.aimRot = Math.atan2(g, f),
                    Math.abs(f) > Math.abs(g) ? (f = f > 0 ? 1 : -1, g = g > 0 ? 1 / h: -1 / h) : (g = g > 0 ? 1 : -1, f = f > 0 ? 1 * h: -1 * h),
                    this.checkPosX = this.cueBall.x,
                    this.checkPosY = this.cueBall.y,
                    this.oLineData.targBall = null;
                for (var i = 0; 700 > i; i++) {
                    this.oLineData.targBall = null;
                    for (var j = 0; j < this.aBalls.length; j++) if (this.aBalls[j] != this.cueBall) {
                        var k = this.checkPosX - this.aBalls[j].x,
                            l = this.checkPosY - this.aBalls[j].y,
                            m = k * k + l * l;
                        784 > m && (this.oLineData.targBall = this.aBalls[j], this.oLineData.bounceX = this.checkPosX, this.oLineData.bounceY = this.checkPosY, this.oLineData.targBallRot = Math.atan2( - l, -k), this.oLineData.targBallRot - this.oLineData.aimRot > Math.PI ? this.oLineData.targBallRot -= 2 * Math.PI: this.oLineData.targBallRot - this.oLineData.aimRot < -Math.PI && (this.oLineData.targBallRot += 2 * Math.PI), this.oLineData.bounceRot = this.oLineData.targBallRot > this.oLineData.aimRot ? this.oLineData.targBallRot - Math.PI / 2 : this.oLineData.targBallRot + Math.PI / 2)
                    }
                    if (null != this.oLineData.targBall) break;
                    if (this.checkPosX > 687 || this.checkPosX < 113 || this.checkPosY < 103 + e || this.checkPosY > 377 + e) {
                        this.oLineData.bounceX = this.checkPosX,
                            this.oLineData.bounceY = this.checkPosY;
                        break
                    }
                    this.checkPosX += f,
                        this.checkPosY += g
                }
                return this.oLineData
            },
                a
        } ();
        a.LinePredictor = b
    } (Utils || (Utils = {}));
var Utils; !
    function(a) {
        var b = function() {
            function a(a, b) {
                this.saveDataId = a,
                    this.totalLevels = b,
                    this.clearData(),
                    this.setInitialData()
            }
            return a.prototype.clearData = function() {
                this.aLevelStore = new Array,
                    this.aLevelStore.push(0),
                    this.aLevelStore.push(0);
                for (var a = 0; a < this.totalLevels - 1; a++) 0 == (a + 2) % 4 ? this.aLevelStore.push(5) : this.aLevelStore.push(1),
                    this.aLevelStore.push(0)
            },
                a.prototype.setInitialData = function() {
                    if ("undefined" != typeof Storage) if (null != localStorage.getItem(this.saveDataId)) {
                        this.aLevelStore = localStorage.getItem(this.saveDataId).split(",");
                        for (var a in this.aLevelStore) this.aLevelStore[a] = parseInt(this.aLevelStore[a])
                    } else this.saveData()
                },
                a.prototype.saveData = function() {
                    if ("undefined" != typeof Storage) {
                        for (var a = "",
                                 b = 0; b < this.aLevelStore.length; b++) a += this.aLevelStore[b],
                            b < this.aLevelStore.length - 1 && (a += ",");
                        localStorage.setItem(this.saveDataId, a)
                    }
                },
                a
        } ();
        a.SaveDataHandler = b
    } (Utils || (Utils = {}));
var requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function(a) {
                window.setTimeout(a, 1e3 / 60, (new Date).getTime())
            }
    } (),
    previousTime,
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = 800,
    canvas.height = 400;
var canvasX, canvasY, canvasScaleX, canvasScaleY, div = document.getElementById("viewporter"),
    sound,
    music,
    audioType = 0,
    muted = !1,
    splash,
    splashTimer = 0,
    assetLib,
    preAssetLib,
    rotatePause = !1,
    manualPause = !1,
    isMobile = !1,
    gameState = "loading",
    aLangs = new Array("EN"),
    curLang = "",
    isBugBrowser = !1,
    isIE10 = !1;
navigator.userAgent.match(/MSIE\s([\d]+)/) && (isIE10 = !0);
var deviceAgent = navigator.userAgent.toLowerCase(); (deviceAgent.match(/(iphone|ipod|ipad)/) || deviceAgent.match(/(android)/) || deviceAgent.match(/(iemobile)/) || deviceAgent.match(/iphone/i) || deviceAgent.match(/ipad/i) || deviceAgent.match(/ipod/i) || deviceAgent.match(/blackberry/i) || deviceAgent.match(/bada/i)) && (isMobile = !0, deviceAgent.match(/(android)/) && !/Chrome/.test(navigator.userAgent) && (isBugBrowser = !0));
var userInput = new Utils.UserInput(canvas, isBugBrowser);
resizeCanvas(),
    window.onresize = function() {
        setTimeout(function() {
                resizeCanvas()
            },
            1)
    },
    document.addEventListener("visibilitychange",
        function() {
            document.hidden ? Howler.mute() : muted || Howler.unmute()
        },
        !1),
    window.addEventListener("load",
        function() {
            setTimeout(function() {
                    resizeCanvas()
                },
                0),
                window.addEventListener("orientationchange",
                    function() {
                        resizeCanvas()
                    },
                    !1)
        }),
    isIE10 || "undefined" == typeof window.AudioContext && "undefined" == typeof window.webkitAudioContext && -1 != navigator.userAgent.indexOf("Android") ? (audioType = 0, music = new Audio("audio/music.ogg"), music.addEventListener("ended",
        function() {
            this.currentTime = 0,
                this.play()
        },
        !1), music.play()) : (audioType = 1, sound = new Howl({
        urls: ["audio/sound.ogg", "audio/sound.m4a"],
        sprite: {
            ballHit1: [0, 300],
            ballHit2: [500, 300],
            ballHit3: [1e3, 300],
            bumper1: [1500, 400],
            bumper2: [2e3, 400],
            hit3: [2500, 600],
            hit1: [3500, 600],
            pot1: [4500, 1e3],
            pot2: [6e3, 1e3],
            pot3: [7500, 1e3],
            score: [9e3, 1e3],
            gameEnd: [10500, 1500],
            hit2: [12500, 500],
            bell: [13500, 600],
            rack: [14500, 1e3],
            highlight: [16e3, 400]
        }
    }), music = new Howl({
        urls: ["audio/music.ogg", "audio/music.m4a"],
        volume: .5,
        loop: !0
    }));
var panel, hud, background, table, cueBall, arrow, physics2D, gameTouchState, oPosData = {
        prevBallX: 0,
        prevBallY: 0,
        stageX: 0,
        stageY: 0,
        targStageX: 0,
        targStageY: 0,
        startDragX: 0,
        startDragY: 0,
        startStageX: 0,
        startStageY: 0
    },
    shotsSinceLastPot,
    startTime = 120,
    levelWidth = 800,
    levelHeight = 480,
    levelNum,
    aimX,
    aimY,
    targAimX,
    targAimY,
    aHolePos = new Array,
    buffer = 40,
    aBalls,
    aHoles,
    musicTween,
    gameTimer,
    curPotScore,
    streak,
    newRackStart,
    newRackY,
    linePredictor,
    aLevelData = new Array({
            aData: [{
                type: "ball",
                p0: {
                    x: 594,
                    y: 261
                },
                p1: {
                    x: 594,
                    y: 261
                }
            },
                {
                    type: "ball",
                    p0: {
                        x: 615,
                        y: 240
                    },
                    p1: {
                        x: 615,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 551,
                        y: 261
                    },
                    p1: {
                        x: 551,
                        y: 261
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 530,
                        y: 240
                    },
                    p1: {
                        x: 530,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 551,
                        y: 218
                    },
                    p1: {
                        x: 551,
                        y: 218
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 594,
                        y: 218
                    },
                    p1: {
                        x: 594,
                        y: 218
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 573,
                        y: 197
                    },
                    p1: {
                        x: 573,
                        y: 197
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 573,
                        y: 240
                    },
                    p1: {
                        x: 573,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 573,
                        y: 282
                    },
                    p1: {
                        x: 573,
                        y: 282
                    }
                },
                {
                    type: "cueBall",
                    p0: {
                        x: 209,
                        y: 240
                    },
                    p1: {
                        x: 209,
                        y: 240
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 384
                    },
                    p1: {
                        x: 694,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 400
                    },
                    p1: {
                        x: 400,
                        y: 400
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 384
                    },
                    p1: {
                        x: 107,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 97
                    },
                    p1: {
                        x: 694,
                        y: 97
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 80
                    },
                    p1: {
                        x: 400,
                        y: 80
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 97
                    },
                    p1: {
                        x: 107,
                        y: 97
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 710,
                        y: 127
                    },
                    p1: {
                        x: 710,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 90,
                        y: 127
                    },
                    p1: {
                        x: 90,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 401
                    },
                    p1: {
                        x: 663,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 401
                    },
                    p1: {
                        x: 365,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 81
                    },
                    p1: {
                        x: 663,
                        y: 80
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 81
                    },
                    p1: {
                        x: 365,
                        y: 80
                    }
                }]
        },
        {
            aData: [{
                type: "ball",
                p0: {
                    x: 531,
                    y: 219
                },
                p1: {
                    x: 531,
                    y: 219
                }
            },
                {
                    type: "ball",
                    p0: {
                        x: 574,
                        y: 261
                    },
                    p1: {
                        x: 574,
                        y: 261
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 595,
                        y: 282
                    },
                    p1: {
                        x: 595,
                        y: 282
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 510,
                        y: 198
                    },
                    p1: {
                        x: 510,
                        y: 198
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 531,
                        y: 261
                    },
                    p1: {
                        x: 531,
                        y: 261
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 553,
                        y: 240
                    },
                    p1: {
                        x: 553,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 574,
                        y: 219
                    },
                    p1: {
                        x: 574,
                        y: 219
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 595,
                        y: 198
                    },
                    p1: {
                        x: 595,
                        y: 198
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 510,
                        y: 282
                    },
                    p1: {
                        x: 510,
                        y: 282
                    }
                },
                {
                    type: "cueBall",
                    p0: {
                        x: 209,
                        y: 240
                    },
                    p1: {
                        x: 209,
                        y: 240
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 384
                    },
                    p1: {
                        x: 694,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 400
                    },
                    p1: {
                        x: 400,
                        y: 400
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 384
                    },
                    p1: {
                        x: 107,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 97
                    },
                    p1: {
                        x: 694,
                        y: 97
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 80
                    },
                    p1: {
                        x: 400,
                        y: 80
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 97
                    },
                    p1: {
                        x: 107,
                        y: 97
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 710,
                        y: 127
                    },
                    p1: {
                        x: 710,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 90,
                        y: 127
                    },
                    p1: {
                        x: 90,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 401
                    },
                    p1: {
                        x: 663,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 401
                    },
                    p1: {
                        x: 365,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 81
                    },
                    p1: {
                        x: 663,
                        y: 80
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 81
                    },
                    p1: {
                        x: 365,
                        y: 80
                    }
                }]
        },
        {
            aData: [{
                type: "ball",
                p0: {
                    x: 572,
                    y: 291
                },
                p1: {
                    x: 572,
                    y: 291
                }
            },
                {
                    type: "ball",
                    p0: {
                        x: 602,
                        y: 315
                    },
                    p1: {
                        x: 602,
                        y: 315
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 542,
                        y: 240
                    },
                    p1: {
                        x: 542,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 542,
                        y: 210
                    },
                    p1: {
                        x: 542,
                        y: 210
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 572,
                        y: 188
                    },
                    p1: {
                        x: 572,
                        y: 188
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 627,
                        y: 240
                    },
                    p1: {
                        x: 627,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 602,
                        y: 165
                    },
                    p1: {
                        x: 602,
                        y: 165
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 582,
                        y: 240
                    },
                    p1: {
                        x: 582,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 542,
                        y: 270
                    },
                    p1: {
                        x: 542,
                        y: 270
                    }
                },
                {
                    type: "cueBall",
                    p0: {
                        x: 209,
                        y: 240
                    },
                    p1: {
                        x: 209,
                        y: 240
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 384
                    },
                    p1: {
                        x: 694,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 400
                    },
                    p1: {
                        x: 400,
                        y: 400
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 384
                    },
                    p1: {
                        x: 107,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 97
                    },
                    p1: {
                        x: 694,
                        y: 97
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 80
                    },
                    p1: {
                        x: 400,
                        y: 80
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 97
                    },
                    p1: {
                        x: 107,
                        y: 97
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 710,
                        y: 127
                    },
                    p1: {
                        x: 710,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 90,
                        y: 127
                    },
                    p1: {
                        x: 90,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 401
                    },
                    p1: {
                        x: 663,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 401
                    },
                    p1: {
                        x: 365,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 81
                    },
                    p1: {
                        x: 663,
                        y: 80
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 81
                    },
                    p1: {
                        x: 365,
                        y: 80
                    }
                }]
        },
        {
            aData: [{
                type: "ball",
                p0: {
                    x: 572,
                    y: 285
                },
                p1: {
                    x: 572,
                    y: 285
                }
            },
                {
                    type: "ball",
                    p0: {
                        x: 602,
                        y: 270
                    },
                    p1: {
                        x: 602,
                        y: 270
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 527,
                        y: 240
                    },
                    p1: {
                        x: 527,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 542,
                        y: 210
                    },
                    p1: {
                        x: 542,
                        y: 210
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 572,
                        y: 195
                    },
                    p1: {
                        x: 572,
                        y: 195
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 617,
                        y: 240
                    },
                    p1: {
                        x: 617,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 602,
                        y: 210
                    },
                    p1: {
                        x: 602,
                        y: 210
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 572,
                        y: 240
                    },
                    p1: {
                        x: 572,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 542,
                        y: 270
                    },
                    p1: {
                        x: 542,
                        y: 270
                    }
                },
                {
                    type: "cueBall",
                    p0: {
                        x: 209,
                        y: 240
                    },
                    p1: {
                        x: 209,
                        y: 240
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 384
                    },
                    p1: {
                        x: 694,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 400
                    },
                    p1: {
                        x: 400,
                        y: 400
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 384
                    },
                    p1: {
                        x: 107,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 97
                    },
                    p1: {
                        x: 694,
                        y: 97
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 80
                    },
                    p1: {
                        x: 400,
                        y: 80
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 97
                    },
                    p1: {
                        x: 107,
                        y: 97
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 710,
                        y: 127
                    },
                    p1: {
                        x: 710,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 90,
                        y: 127
                    },
                    p1: {
                        x: 90,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 401
                    },
                    p1: {
                        x: 663,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 401
                    },
                    p1: {
                        x: 365,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 81
                    },
                    p1: {
                        x: 663,
                        y: 80
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 81
                    },
                    p1: {
                        x: 365,
                        y: 80
                    }
                }]
        },
        {
            aData: [{
                type: "ball",
                p0: {
                    x: 555,
                    y: 225
                },
                p1: {
                    x: 555,
                    y: 225
                }
            },
                {
                    type: "ball",
                    p0: {
                        x: 555,
                        y: 256
                    },
                    p1: {
                        x: 555,
                        y: 256
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 582,
                        y: 240
                    },
                    p1: {
                        x: 582,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 582,
                        y: 210
                    },
                    p1: {
                        x: 582,
                        y: 210
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 582,
                        y: 271
                    },
                    p1: {
                        x: 582,
                        y: 271
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 400,
                        y: 240
                    },
                    p1: {
                        x: 400,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 467,
                        y: 240
                    },
                    p1: {
                        x: 467,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 640,
                        y: 240
                    },
                    p1: {
                        x: 640,
                        y: 240
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 529,
                        y: 240
                    },
                    p1: {
                        x: 529,
                        y: 240
                    }
                },
                {
                    type: "cueBall",
                    p0: {
                        x: 209,
                        y: 240
                    },
                    p1: {
                        x: 209,
                        y: 240
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 384
                    },
                    p1: {
                        x: 694,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 400
                    },
                    p1: {
                        x: 400,
                        y: 400
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 384
                    },
                    p1: {
                        x: 107,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 97
                    },
                    p1: {
                        x: 694,
                        y: 97
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 80
                    },
                    p1: {
                        x: 400,
                        y: 80
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 97
                    },
                    p1: {
                        x: 107,
                        y: 97
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 710,
                        y: 127
                    },
                    p1: {
                        x: 710,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 90,
                        y: 127
                    },
                    p1: {
                        x: 90,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 401
                    },
                    p1: {
                        x: 663,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 401
                    },
                    p1: {
                        x: 365,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 81
                    },
                    p1: {
                        x: 663,
                        y: 80
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 81
                    },
                    p1: {
                        x: 365,
                        y: 80
                    }
                }]
        },
        {
            aData: [{
                type: "ball",
                p0: {
                    x: 600,
                    y: 210
                },
                p1: {
                    x: 600,
                    y: 210
                }
            },
                {
                    type: "ball",
                    p0: {
                        x: 600,
                        y: 270
                    },
                    p1: {
                        x: 600,
                        y: 270
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 590,
                        y: 300
                    },
                    p1: {
                        x: 590,
                        y: 300
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 590,
                        y: 180
                    },
                    p1: {
                        x: 590,
                        y: 180
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 580,
                        y: 150
                    },
                    p1: {
                        x: 580,
                        y: 150
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 580,
                        y: 330
                    },
                    p1: {
                        x: 580,
                        y: 330
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 570,
                        y: 120
                    },
                    p1: {
                        x: 570,
                        y: 120
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 570,
                        y: 360
                    },
                    p1: {
                        x: 570,
                        y: 360
                    }
                },
                {
                    type: "ball",
                    p0: {
                        x: 610,
                        y: 240
                    },
                    p1: {
                        x: 610,
                        y: 240
                    }
                },
                {
                    type: "cueBall",
                    p0: {
                        x: 209,
                        y: 240
                    },
                    p1: {
                        x: 209,
                        y: 240
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 384
                    },
                    p1: {
                        x: 694,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 400
                    },
                    p1: {
                        x: 400,
                        y: 400
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 384
                    },
                    p1: {
                        x: 107,
                        y: 384
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 694,
                        y: 97
                    },
                    p1: {
                        x: 694,
                        y: 97
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 400,
                        y: 80
                    },
                    p1: {
                        x: 400,
                        y: 80
                    }
                },
                {
                    type: "hole",
                    p0: {
                        x: 107,
                        y: 97
                    },
                    p1: {
                        x: 107,
                        y: 97
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 710,
                        y: 127
                    },
                    p1: {
                        x: 710,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 90,
                        y: 127
                    },
                    p1: {
                        x: 90,
                        y: 354
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 401
                    },
                    p1: {
                        x: 663,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 401
                    },
                    p1: {
                        x: 365,
                        y: 400
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 436,
                        y: 81
                    },
                    p1: {
                        x: 663,
                        y: 80
                    }
                },
                {
                    type: "wall",
                    p0: {
                        x: 138,
                        y: 81
                    },
                    p1: {
                        x: 365,
                        y: 80
                    }
                }]
        });
loadPreAssets();