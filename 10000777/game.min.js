function getCookie(a) {
    return (a = document.cookie.match(RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))) ? decodeURIComponent(a[1]) : void 0
}

function setCookie(a, b, c) {
    c = c || {};
    var d = c.expires;
    if ("number" == typeof d && d) {
        var e = new Date;
        e.setTime(e.getTime() + 1E3 * d);
        d = c.expires = e
    }
    d && d.toUTCString && (c.expires = d.toUTCString());
    b = encodeURIComponent(b);
    a = a + "=" + b;
    for (var f in c) a += "; " + f, b = c[f], !0 !== b && (a += "=" + b);
    document.cookie = a
}

function deleteCookie(a) {
    setCookie(a, "", {
        expires: -1
    })
}
CreditsScreen = function(a) {
    this.game = a
};
CreditsScreen.prototype = {
    create: function() {
        var a = this.game.width,
            b = this.game.height,
            c = this.game.add.sprite(0, 0, "LevelScreenAssets");
        c.frameName = "Background0000";
        c.width = a;
        c.height = b;
        c = this.game.add.sprite(a / 2, b / 2 + 50, "LevelScreenAssets");
        c.frameName = "Pinboard0000";
        c.anchor.setTo(0.5, 0.5);
        c = this.game.add.sprite(a / 2, 70, "LevelScreenAssets");
        c.frameName = "CreditsTitle0000";
        c.anchor.setTo(0.5, 0.5);
        c = this.game.add.sprite(a / 2, 320, "LevelScreenAssets");
        c.frameName = "Credits0000";
        c.anchor.setTo(0.5, 0.5);
        this.game.add.button(a /
            2, b - 50, "LevelScreenAssets", this.back, this, "BackButton0001", "BackButton0000", "BackButton0001", "BackButton0000").anchor.setTo(0.5, 0.5);
        new Logo(this.game, 10, this.game.height - 60, "logo_small");
        a = new SoundButton(this.game, this.game.width - 100, 30);
        this.game.add.existing(a)
    },
    back: function() {
        this.game.state.start("startScreen", !0)
    }
};
BonusItemsContainer = function(a) {
    this.gameScreen = a;
    this.game = a.game;
    Phaser.Group.call(this, game);
    this.bonuses = []
};
BonusItemsContainer.prototype = Object.create(Phaser.Group.prototype);
BonusItemsContainer.prototype.constructor = BonusItemsContainer;
BonusItemsContainer.prototype.addBonus = function(a, b, c) {
    a = GameObjectFactory.getBonusByType(this.game, a);
    var d = this.gameScreen.cellToScreenCoordinates(b, c);
    a.x = d.x + CELL_WIDTH / 2;
    a.y = d.y + CELL_HEIGHT / 2;
    a.cx = b;
    a.cy = c;
    this.addChild(a);
    this.bonuses.push(a);
    return a
};
BonusItemsContainer.prototype.removeBonus = function(a) {
    this.bonuses.splice(this.bonuses.indexOf(a), 1);
    a.destroy(!0)
};
BonusItemsContainer.prototype.getBonusAt = function(a, b, c) {
    for (var d in this.bonuses) {
        var e = this.bonuses[d];
        if (e != c && e.cx == a && e.cy == b) return e
    }
    return null
};
CellsContainer = function(a) {
    this.gameScreen = a;
    this.game = a.game;
    Phaser.Group.call(this, game);
    a = this.game.add.tileSprite(0, 0, CELL_WIDTH * COLUMNS, CELL_HEIGHT * ROWS, "CellsTile");
    a.tileScale.x = a.tileScale.y = SCALE;
    this.addChild(a);
    this.highlight = this.create(0, 0, "GameScreenAssets1");
    this.highlight.frameName = "SelectedCellBackground";
    this.highlight.visible = !1;
    this.highlight.width = CELL_WIDTH;
    this.highlight.height = CELL_HEIGHT;
    this.addChild(this.highlight);
    this.highLightY = this.highLightX = -1
};
CellsContainer.prototype = Object.create(Phaser.Group.prototype);
CellsContainer.prototype.constructor = CellsContainer;
CellsContainer.prototype.highlightCell = function(a, b) {
    if (0 > a || 0 > b) this.clearHighlight();
    else {
        var c = this.gameScreen.cellToScreenCoordinates(a, b);
        this.highlight.visible = !0;
        this.highlight.x = c.x;
        this.highlight.y = c.y;
        this.highLightX = a;
        this.highLightY = b
    }
};
CellsContainer.prototype.clearHighlight = function() {
    this.highlight.visible = !1;
    this.highLightY = this.highLightX = -1
};
AbilityButtonsController = function(a) {
    this.gameScreen = a;
    this.highlights = []
};
AbilityButtonsController.prototype = {
    start: function() {
        this.gameScreen.gui.randomizeAbilityButton.onInputDown.add(this.onRandomize, this);
        this.gameScreen.gui.removeAbilityButton.onInputDown.add(this.onRemove, this);
        this.clearHighlights()
    },
    stop: function() {
        this.gameScreen.gui.randomizeAbilityButton.onInputDown.remove(this.onRandomize, this);
        this.gameScreen.gui.removeAbilityButton.onInputDown.remove(this.onRemove, this)
    },
    onRandomize: function() {
        var a = this.gameScreen.gui.randomizeAbilityButton.getCount();
        0 <
            a && this.gameScreen.gui.pipeSelector.enabled && (this.gameScreen.gui.randomizeAbilityButton.setCount(a - 1), this.gameScreen.gui.pipeSelector.randomize())
    },
    onRemove: function() {
        0 < this.gameScreen.gui.removeAbilityButton.getCount() && (this.clearHighlights(), 0 < this.showHighlights() && this.gameScreen.game.input.onUp.add(this.onUp, this))
    },
    onUp: function() {
        var a = this.gameScreen.game.input.activePointer.x,
            b = this.gameScreen.game.input.activePointer.y;
        b > this.gameScreen.cellsContainer.y + CELL_HEIGHT * ROWS || (a = this.gameScreen.screenToCellCoordinates(a,
            b, !0), a = this.gameScreen.pipesContainer.getPipeAt(a.x, a.y, !1), null != a && (this.gameScreen.gui.pipeSelector.addNewPipe(a.type, !0), this.gameScreen.game.add.tween(a).to({
            x: 200,
            y: 0,
            alpha: 0
        }, 400, Phaser.Easing.Cubic.Out).start().onComplete.add(this.removePipe, {
            pipesContainer: this.gameScreen.pipesContainer,
            pipe: a
        }), a = this.gameScreen.gui.removeAbilityButton.getCount(), this.gameScreen.gui.removeAbilityButton.setCount(a - 1), this.gameScreen.updatePipesText()), this.clearHighlights(), this.gameScreen.game.input.onUp.remove(this.onUp,
            this))
    },
    removePipe: function() {
        this.pipesContainer.removePipe(this.pipe)
    },
    showHighlights: function() {
        var a = 0,
            b = this.gameScreen.pipesContainer.pipes,
            c;
        for (c in b) {
            var d = b[c];
            d.type != BasePipe.TYPE_START && d.type != BasePipe.TYPE_END && (d = this.gameScreen.game.add.sprite(CELL_WIDTH * d.cx, CELL_HEIGHT * d.cy, "GameScreenAssets1"), d.frameName = "SelectedCellBackground", this.gameScreen.cellsContainer.addChild(d), this.highlights.push(d), a++)
        }
        return a
    },
    clearHighlights: function() {
        for (var a = 0; a < this.highlights.length; a++) this.highlights[a].destroy()
    }
};
FlowController = function(a) {
    this.gameScreen = a;
    this.flowSpeed = 0.1;
    this.activePipes = [];
    this.puddle = this.gameScreen.game.add.sprite(0, 0, "GameScreenAssets1");
    this.puddle.frameName = "Puddle";
    this.puddle.anchor.setTo(0.5, 0.5);
    this.puddle.kill();
    this.gameScreen.cellsContainer.addChild(this.puddle);
    this.puddleTween = this.gameScreen.game.add.tween(this.puddle.scale).to({
        x: 1,
        y: 1
    }, 1E3);
    this.flowProgressEvent = new Phaser.Signal;
    this.bonusCollectedEvent = new Phaser.Signal;
    this.nextPipeEvent = new Phaser.Signal;
    this.bubbleSound =
        this.gameScreen.game.add.sound("bubble", 1, !0)
};
FlowController.prototype = {
    start: function() {
        this.bubbleSound.stop();
        this.started = !1;
        this.gameScreen.gui.startFlowButton.onInputDown.add(this.onDown, this)
    },
    stop: function() {
        this.bubbleSound.stop();
        this.started = !1;
        this.gameScreen.gui.startFlowButton.onInputDown.remove(this.onDown, this)
    },
    reset: function() {
        this.bubbleSound.stop();
        var a = this.gameScreen.pipesContainer.pipes,
            b;
        for (b in a) {
            var c = a[b];
            if (c.type !== BasePipe.TYPE_START)
                for (var d = 0; 4 > d; d++) c.setCurrentVolume(0, d);
            else
                for (d = 0; 4 > d; d++) c.setCurrentVolume(1,
                    d)
        }
        this.activePipes = [];
        a = this.gameScreen.pipesContainer.startPipes;
        for (b in a) c = a[b], d = new ActivePipe, d.pipe = c, d.outputs = d.pipe.getOutput(0), d.input |= BasePipe.getOppositeDirection(d.outputs[0]), this.activePipes.push(d)
    },
    update: function() {
        if (this.started) {
            this.bubbleSound.isPlaying || this.bubbleSound.play();
            var a = !1,
                b;
            for (b in this.activePipes) {
                var c = this.activePipes[b],
                    d = c.pipe;
                d.setCurrentVolume(d.getCurrentVolume(c.input) + this.flowSpeed, c.input);
                if (1 <= d.getCurrentVolume(c.input) / d.getTotalVolume(c.input)) {
                    a = !1;
                    this.activePipes.splice(this.activePipes.indexOf(c), 1);
                    for (var e in c.outputs) {
                        var f = c.outputs[e],
                            g = this.gameScreen.pipesContainer.getNextPipe(d, f);
                        if (null != g) {
                            var h = new ActivePipe;
                            h.pipe = g[0];
                            h.outputs = g[1];
                            h.input = BasePipe.getOppositeDirection(f);
                            f = this.gameScreen.screenToCellCoordinates(h.pipe.x, h.pipe.y, !1);
                            if (h.pipe.type === BasePipe.TYPE_END) {
                                this.started = !1;
                                this.gameScreen.winGame();
                                return
                            }
                            var f = !1,
                                k;
                            for (k in this.activePipes)
                                if (this.activePipes[k].pipe === h.pipe) {
                                    f = !0;
                                    break
                                }
                            f || (a = !0, this.activePipes.push(h),
                                this.nextPipeEvent.dispatch(h.pipe))
                        } else if (d.type !== BasePipe.TYPE_START) {
                            f = BasePipe.getDirectionOffsets(c.outputs[0]);
                            this.puddle.x = d.x + (0.5 * f.x + 0.5) * CELL_WIDTH;
                            this.puddle.y = d.y + (0.5 * f.y + 0.5) * CELL_HEIGHT;
                            this.puddle.scale.setTo(0, 0);
                            this.puddleTween.start().onComplete.add(this.gameScreen.failGame, this.gameScreen);
                            this.puddle.revive();
                            this.started = !1;
                            return
                        }
                    }
                    a || (this.started = !1)
                }
            }
        }
    },
    onDown: function() {
        this.reset();
        this.started = !this.started
    }
};
ActivePipe = function() {
    this.pipe = null;
    this.outputs = [];
    this.input = 2
};
HotspotsController = function(a) {
    this.gameScreen = a
};
HotspotsController.prototype = {
    start: function() {
        this.gameScreen.flowController.nextPipeEvent.add(this.onNextPipe, this)
    },
    stop: function() {
        this.gameScreen.flowController.nextPipeEvent.remove(this.onNextPipe, this)
    },
    reset: function() {
        var a = this.gameScreen.hotspotsContainer.hotspots,
            b;
        for (b in a) a[b].activate()
    },
    onNextPipe: function(a) {
        a = this.gameScreen.flowController.activePipes;
        for (var b in a) {
            var c = a[b],
                d = this.gameScreen.hotspotsContainer.getHotspotAt(c.pipe.cx, c.pipe.cy);
            null != d && d.activated && (d = new BaseEffect(this.gameScreen.game,
                Phaser.Animation.generateFrameNames("SteamEffect", 1, 6, "", 4), 15, Number.MAX_VALUE, !0), d.x = c.pipe.cx * CELL_WIDTH + CELL_WIDTH / 2, d.y = c.pipe.cy * CELL_HEIGHT + CELL_HEIGHT / 2, this.gameScreen.effectsContainer.addChild(d), this.gameScreen.flowController.stop(), d = this.gameScreen.game.time.create(!0), d.add(1500, this.gameScreen.failGame, this.gameScreen), d.start());
            c = this.gameScreen.hotspotsContainer.getHotspotButtonAt(c.pipe.cx, c.pipe.cy);
            if (null != c) {
                d = new BaseEffect(this.gameScreen.game, Phaser.Animation.generateFrameNames("TurnOnEffect",
                    1, 6, "", 4), 25);
                d.x = c.cx * CELL_WIDTH + CELL_WIDTH / 2;
                d.y = c.cy * CELL_HEIGHT + CELL_HEIGHT / 2;
                this.gameScreen.effectsContainer.addChild(d);
                var e = this.gameScreen.hotspotsContainer.hotspots,
                    f;
                for (f in e) {
                    var g = e[f];
                    g.type === c.type && (d = new BaseEffect(this.gameScreen.game, Phaser.Animation.generateFrameNames("TurnOnEffect", 1, 6, "", 4), 25), d.x = g.cx * CELL_WIDTH + CELL_WIDTH / 2, d.y = g.cy * CELL_HEIGHT + CELL_HEIGHT / 2, this.gameScreen.effectsContainer.addChild(d), g.deactivate())
                }
            }
        }
    }
};
MissionController = function(a) {
    this.gameScreen = a
};
MissionController.prototype = {
    start: function() {
        this.gameScreen.pipeDragController.pipePlacedEvent.add(this.onPipeAdded, this);
        this.gameScreen.pipeDragController.pipeRemovedEvent.add(this.onPipeRemoved, this);
        this.gameScreen.pipeDragController.pipePickedEvent.add(this.onPipeRemoved, this);
        this.bonuses = [];
        this.bonusesToCollect = [];
        this.bonusesToCollectUnchanged = []
    },
    stop: function() {
        this.gameScreen.pipeDragController.pipePlacedEvent.remove(this.onPipeAdded, this);
        this.gameScreen.pipeDragController.pipeRemovedEvent.remove(this.onPipeRemoved,
            this);
        this.gameScreen.pipeDragController.pipePickedEvent.remove(this.onPipeRemoved, this)
    },
    setGoalBonuses: function(a) {
        for (var b in this.bonusesToCollect) this.gameScreen.missionContainer.unselectBonus(bonusesToCollect[b]);
        this.bonusesToCollect = a.slice(0);
        this.bonusesToCollectUnchanged = a.slice(0)
    },
    checkCompleteness: function() {
        return 0 == this.bonusesToCollect.length
    },
    isGoal: function(a) {
        return -1 < this.bonusesToCollectUnchanged.indexOf(a.type)
    },
    onPipeAdded: function(a, b, c) {
        a = this.gameScreen.screenToCellCoordinates(b,
            c);
        a = this.gameScreen.bonusesContainer.getBonusAt(a.x, a.y);
        null != a && (-1 < this.bonusesToCollect.indexOf(a.type) && (this.bonusesToCollect.splice(this.bonusesToCollect.indexOf(a.type), 1), this.gameScreen.gui.missionContainer.selectBonus(a.type)), a.activate(), this.bonuses.push(a))
    },
    onPipeRemoved: function(a, b, c) {
        c = this.gameScreen.screenToCellCoordinates(b, c);
        b = this.gameScreen.bonusesContainer.getBonusAt(c.x, c.y);
        c = this.gameScreen.pipesContainer.getPipeAt(c.x, c.y);
        null == b || null != a && a !== c || (-1 < this.bonuses.indexOf(b) &&
            (this.bonusesToCollect.push(b.type), this.gameScreen.gui.missionContainer.unselectBonus(b.type)), b.deactivate(), this.bonuses.splice(this.bonuses.indexOf(b), 1))
    }
};
ActivePipe = function() {
    this.pipe = null;
    this.outputs = [];
    this.input = 2
};
PipeDragController = function(a) {
    this.gameScreen = a;
    this.pipePickedEvent = new Phaser.Signal;
    this.pipeRemovedEvent = new Phaser.Signal;
    this.pipePlacedEvent = new Phaser.Signal;
    this.pipePickedSound = this.gameScreen.game.add.sound("pipe_picked");
    this.pipePlacedSound = this.gameScreen.game.add.sound("pipe_placed")
};
PipeDragController.prototype = {
    start: function() {
        this.stopped ? this.stopped = !1 : (this.gameScreen.gui.pipeSelector.pipePickedEvent.add(this.onPipeSelect, this), this.selectedPipe = null, this.lastMouseY = this.lastMouseX = -1E3, this.gameScreen.game.input.onDown.add(this.onDown, this), this.gameScreen.game.input.onUp.add(this.onUp, this), this.gameScreen.updatePipesText())
    },
    stop: function() {
        this.stopped = !0
    },
    isFreeCell: function(a, b, c) {
        c = this.gameScreen.pipesContainer.getPipeAt(a, b, c);
        a = this.gameScreen.obstaclesContainer.getObstacleAt(a,
            b);
        return null == c && null == a
    },
    removePipe: function(a) {
        this.gameScreen.pipesContainer.removePipe(a);
        this.pipeRemovedEvent.dispatch(a, a.x, a.y);
        this.updateStartPipes()
    },
    updateStartPipes: function() {
        var a, b, c, d = this.gameScreen.pipesContainer.startPipes,
            e;
        for (e in d) {
            var f = d[e];
            b = this.gameScreen.screenToCellCoordinates(f.x, f.y);
            c = f.directions;
            0 < c.length && (a = BasePipe.getDirectionOffsets(c[0]), a = this.gameScreen.pipesContainer.getPipeAt(b.x + a.x, b.y + a.y), null == a && (f.directions = [], c = []));
            if (0 == c.length) {
                c = !1;
                for (var g =
                    0; 4 > g; g++)
                    if (a = BasePipe.getDirectionOffsets(g), a = this.gameScreen.pipesContainer.getPipeAt(b.x + a.x, b.y + a.y), null != a && 0 < a.getOutput(BasePipe.getOppositeDirection(g)).length) {
                        f.setGraphicDirection(g);
                        f.directions = [g];
                        c = !0;
                        break
                    }
                c || f.setGraphicDirection(-1);
                f.isDraggable = !1
            }
        }
    },
    onPipeSelect: function(a) {
        if (this.selectedPipe) this.onUp();
        else {
            var b = this.gameScreen.gui.pipeSelector;
            this.selectedPipe = this.gameScreen.pipesContainer.addPipe(a, 0, 0);
            this.selectedPipe.index = b.selectedPipeIndex;
            b.removePipeAt(this.selectedPipe.index);
            this.pipePickedSound.play()
        }
    },
    onDown: function() {
        if (this.selectedPipe || this.stopped) this.onUp();
        else {
            var a = this.gameScreen.screenToCellCoordinates(this.gameScreen.game.input.activePointer.x, this.gameScreen.game.input.activePointer.y, !0),
                a = this.gameScreen.pipesContainer.getPipeAt(a.x, a.y);
            null != a && a.isDraggable && (this.selectedPipe = a, this.gameScreen.pipesContainer.bringToTop(a), this.lastX = this.selectedPipe.x, this.lastY = this.selectedPipe.y, this.lastCX = this.selectedPipe.cx, this.lastCY = this.selectedPipe.cy,
                this.gameScreen.gui.pipeSelector.selectedPipeIndex = -1, this.pipePickedEvent.dispatch(this.selectedPipe, this.selectedPipe.x, this.selectedPipe.y), this.pipePickedSound.play())
        }
    },
    onUp: function() {
        var a = this.gameScreen.gui.pipeSelector;
        if (this.selectedPipe)
            if (this.gameScreen.pipesContainer.alignPipe(this.selectedPipe, this.gameScreen.cellsContainer.highLightX, this.gameScreen.cellsContainer.highLightY), this.gameScreen.cellsContainer.clearHighlight(), 0 > this.selectedPipe.x || 0 > this.selectedPipe.y || !this.isFreeCell(this.selectedPipe.x,
                this.selectedPipe.y, this.selectedPipe)) - 1 != this.selectedPipe.index ? (this.gameScreen.pipesContainer.removePipe(this.selectedPipe), a.addPipeByTypeAt(this.selectedPipe.index, this.selectedPipe.type)) : (this.selectedPipe.x = this.lastX, this.selectedPipe.y = this.lastY, this.selectedPipe.cx = this.lastCX, this.selectedPipe.cy = this.lastCY, this.pipePlacedEvent.dispatch(this.selectedPipe, this.selectedPipe.x, this.selectedPipe.y)), this.selectedPipe.index = -1, this.selectedPipe = null;
            else {
                this.pipePlacedEvent.dispatch(this.selectedPipe,
                    this.selectedPipe.x, this.selectedPipe.y);
                var b = new BaseEffect(this.gameScreen.game, Phaser.Animation.generateFrameNames("PipePlacedEffect", 1, 16, "", 4), 30);
                b.x = this.selectedPipe.cx * CELL_WIDTH + CELL_WIDTH / 2;
                b.y = this.selectedPipe.cy * CELL_HEIGHT + CELL_HEIGHT / 2;
                this.gameScreen.effectsContainer.addChild(b);
                this.selectedPipe.index = -1;
                this.selectedPipe = null;
                a.addRandomPipeFromRestAt(a.selectedPipeIndex);
                this.gameScreen.updatePipesText();
                this.pipePlacedSound.play();
                this.updateStartPipes()
            }
    },
    update: function() {
        if (null !=
            this.selectedPipe) {
            var a = this.gameScreen.game.input.activePointer.x,
                b = this.gameScreen.game.input.activePointer.y - (this.gameScreen.game.device.desktop ? 0 : 80);
            this.selectedPipe.x = a - this.gameScreen.pipesContainer.x - CELL_WIDTH / 2;
            this.selectedPipe.y = b - this.gameScreen.pipesContainer.y - CELL_HEIGHT / 2;
            if (Math.abs(this.lastMouseX - a) > CELL_WIDTH / 3 || Math.abs(this.lastMouseY - b) > CELL_HEIGHT / 3) {
                var c = this.gameScreen.screenToCellCoordinates(a, b, !0);
                this.isFreeCell(c.x, c.y, this.selectedPipe) ? this.gameScreen.cellsContainer.highlightCell(c.x,
                    c.y) : this.gameScreen.cellsContainer.clearHighlight();
                this.lastMouseX = a;
                this.lastMouseY = b
            }
        }
    }
};
ScoreController = function(a) {
    this.gameScreen = a;
    this.activatedPipes = [];
    this.bonusText = this.gameScreen.game.add.bitmapText(0, 0, "score_font_green", "Pipes left", 60);
    this.bonusText.visible = !1;
    this.bonusScoreText = this.gameScreen.game.add.bitmapText(0, 0, "score_font_green", "Bonus score", 60);
    this.bonusScoreText.visible = !1;
    this.completeEvent = new Phaser.Signal;
    this.popupSound = this.gameScreen.game.add.sound("score_popup")
};
ScoreController.prototype = {
    start: function() {
        this.gameScreen.flowController.nextPipeEvent.add(this.onNextPipe, this);
        this.score = 0
    },
    stop: function() {
        this.gameScreen.flowController.nextPipeEvent.remove(this.onNextPipe, this)
    },
    reset: function() {
        this.activatedPipes = [];
        this.score = 0
    },
    calculateScore: function() {
        var a = this.gameScreen.gui.pipeSelector.getRestPipesCount();
        this.score += 2E3 * a;
        this.addRestPipesBonusText()
    },
    addRestPipesBonusText: function() {
        this.bonusText.setText(this.gameScreen.gui.pipeSelector.getRestPipesCount() +
            " Straws left");
        this.bonusText.visible = !0;
        this.bonusText.x = 250;
        this.bonusText.y = 500;
        var a = this.gameScreen.game.add.tween(this.bonusText).to({
                y: 300
            }, 300, Phaser.Easing.Back.Out, !0),
            b = this.gameScreen.game.add.tween(this.bonusText).to({
                y: 0
            }, 300, Phaser.Easing.Back.In, !1, 1200);
        a.chain(b);
        b.onComplete.add(this.onRestPipesBonusTextComplete, this);
        this.popupSound.play()
    },
    onRestPipesBonusTextComplete: function() {
        this.bonusText.visible = !1;
        this.bonusScoreText.setText("Bonus score\n" + this.gameScreen.gui.pipeSelector.getRestPipesCount() +
            " X 2000");
        this.bonusScoreText.align = "center";
        this.bonusScoreText.visible = !0;
        this.bonusScoreText.x = 250;
        this.bonusScoreText.y = 500;
        var a = this.gameScreen.game.add.tween(this.bonusScoreText).to({
                y: 270
            }, 300, Phaser.Easing.Back.Out, !0),
            b = this.gameScreen.game.add.tween(this.bonusScoreText).to({
                y: 0
            }, 300, Phaser.Easing.Back.In, !1, 1200);
        a.chain(b);
        b.onComplete.add(this.complete, this);
        this.popupSound.play()
    },
    complete: function() {
        this.bonusScoreText.visible = !1;
        this.completeEvent.dispatch(this.score)
    },
    onNextPipe: function(a) {
        var b =
            this.gameScreen.bonusesContainer.getBonusAt(a.cx, a.cy),
            c = null;
        null == b || this.gameScreen.missionController.isGoal(b) ? (c = new BonusText(this.gameScreen.game, "BonusText"), this.gameScreen.effectsContainer.addChild(c), this.score += 100) : (c = new BonusText(this.gameScreen.game, "BadPipeBonusText"), this.gameScreen.effectsContainer.addChild(c), this.score -= 200);
        c.x = a.x + 0.5 * CELL_WIDTH;
        c.y = a.y - c.height + 0.5 * CELL_HEIGHT;
        this.activatedPipes.push(a)
    }
};
GameObjectFactory = {
    getPipeByType: function(a, b) {
        switch (b) {
            case BasePipe.TYPE_START:
                return new StartPipe(a);
            case BasePipe.TYPE_END:
                return new EndPipe(a);
            case BasePipe.TYPE_HORIZONTAL:
                return new HorizontalPipe(a);
            case BasePipe.TYPE_VERTICAL:
                return new VerticalPipe(a);
            case BasePipe.TYPE_NE:
                return new NEPipe(a);
            case BasePipe.TYPE_NW:
                return new NWPipe(a);
            case BasePipe.TYPE_SE:
                return new SEPipe(a);
            case BasePipe.TYPE_SW:
                return new SWPipe(a);
            default:
                return null
        }
    },
    getBonusByType: function(a, b) {
        return new BaseBonusItem(a,
            b)
    },
    getObstacleByType: function(a, b) {
        return new BaseObstacle(a, b)
    },
    getHotspotByType: function(a, b) {
        return new BaseHotspot(a, b)
    },
    getHotspotButtonByType: function(a, b) {
        return new BaseHotspotButton(a, b)
    }
};
LevelDataParser = {
    getMissionTypes: function(a) {
        var b = [];
        a = a.mission ? a.mission.replace(/\s+/g, "").split(",") : [];
        for (var c in a) b.push(this.parseBonusType(a[c]));
        return b
    },
    parsePipes: function(a, b, c) {
        c = c || null;
        for (var d in a) {
            var e = a[d];
            "[object Array]" === Object.prototype.toString.call(e) ? this.parseBonuses(e, b, d) : b.addPipe(this.parsePipeType(c || d), parseInt(e.x), parseInt(e.y))
        }
    },
    parseBonuses: function(a, b, c) {
        c = c || null;
        for (var d in a) {
            var e = a[d];
            "[object Array]" === Object.prototype.toString.call(e) ? this.parseBonuses(e,
                b, d) : b.addBonus(this.parseBonusType(c || d), parseInt(e.x), parseInt(e.y))
        }
    },
    parseObstacles: function(a, b, c) {
        c = c || null;
        for (var d in a) {
            var e = a[d];
            "[object Array]" === Object.prototype.toString.call(e) ? this.parseObstacles(e, b, d) : b.addObstacle(this.parseObstacleType(c || d), parseInt(e.x), parseInt(e.y))
        }
    },
    parseHotspots: function(a, b, c) {
        c = c || null;
        for (var d in a) {
            var e = a[d];
            "[object Array]" === Object.prototype.toString.call(e) ? this.parseHotspots(e, b, d) : b.addHotspot(this.parseHotspotType(c || d), parseInt(e.x), parseInt(e.y),
                parseInt(e.buttonX), parseInt(e.buttonY))
        }
    },
    parseRotation: function(a) {
        switch (a.toLowerCase()) {
            case "north":
                return BasePipe.NORTH;
            case "south":
                return BasePipe.SOUTH;
            case "east":
                return BasePipe.EAST;
            case "west":
                return BasePipe.WEST;
            default:
                return 0
        }
    },
    parsePipeType: function(a) {
        switch (a.toLowerCase()) {
            case "horizontalpipe":
                return BasePipe.TYPE_HORIZONTAL;
            case "verticalpipe":
                return BasePipe.TYPE_VERTICAL;
            case "nwpipe":
                return BasePipe.TYPE_NW;
            case "swpipe":
                return BasePipe.TYPE_SW;
            case "sepipe":
                return BasePipe.TYPE_SE;
            case "nepipe":
                return BasePipe.TYPE_NE;
            case "crosspipe":
                return BasePipe.TYPE_CROSS;
            case "startpipe":
                return BasePipe.TYPE_START;
            case "endpipe":
                return BasePipe.TYPE_END;
            default:
                return 0
        }
    },
    parseBonusType: function(a) {
        switch (a.toLowerCase()) {
            case "ice":
                return BaseBonusItem.TYPE_ICE;
            case "orange":
                return BaseBonusItem.TYPE_ORANGE;
            case "strawberry":
                return BaseBonusItem.TYPE_STRAWBERRY;
            case "cherry":
                return BaseBonusItem.TYPE_CHERRY;
            case "banana":
                return BaseBonusItem.TYPE_BANANA;
            case "kiwi":
                return BaseBonusItem.TYPE_KIWI;
            default:
                return 0
        }
    },
    parseObstacleType: function(a) {
        switch (a.toLowerCase()) {
            case "lifebuoy":
                return BaseObstacle.TYPE_LIFEBUOY;
            case "sponge":
                return BaseObstacle.TYPE_SPONGE;
            case "fence_horizontal":
                return BaseObstacle.TYPE_FENCE_HORIZONTAL;
            case "fence_vertical":
                return BaseObstacle.TYPE_FENCE_VERTICAL;
            case "pail":
                return BaseObstacle.TYPE_PAIL;
            default:
                return 0
        }
    },
    parseHotspotType: function(a) {
        switch (a.toLowerCase()) {
            case "red":
                return BaseHotspot.TYPE_RED;
            case "green":
                return BaseHotspot.TYPE_GREEN;
            case "blue":
                return BaseHotspot.TYPE_BLUE;
            default:
                return 0
        }
    }
};
var soundEnabled = getSoundEnabled(),
    soundDatas = {
        button_click: {
            urls: ["assets/sounds/button_click.mp3", "assets/sounds/button_click.ogg"]
        },
        pipe_picked: {
            urls: ["assets/sounds/straw_picked.mp3", "assets/sounds/straw_picked.ogg"]
        },
        pipe_placed: {
            urls: ["assets/sounds/straw_placed.mp3", "assets/sounds/straw_placed.ogg"]
        },
        level_win: {
            urls: ["assets/sounds/level_win.mp3", "assets/sounds/level_win.ogg"]
        },
        level_fail: {
            urls: ["assets/sounds/level_fail.mp3", "assets/sounds/level_fail.ogg"]
        },
        score_popup: {
            urls: ["assets/sounds/score_popup.mp3", "assets/sounds/score_popup.ogg"]
        },
        bell: {
            urls: ["assets/sounds/bell.mp3", "assets/sounds/bell.ogg"]
        },
        bubble: {
            urls: ["assets/sounds/bubble.mp3", "assets/sounds/bubble.ogg"]
        },
        music: {
            urls: ["assets/sounds/music.mp3", "assets/sounds/music.ogg"]
        }
    },
    music = null,
    buttonSound = null;

function playSound(a, b) {
    if (soundEnabled && (a.device.desktop || a.device.iOS)) {
        var c = a.add.audio(b);
        c.play("", 0, 1, soundDatas[b].loop);
        return c
    }
}
TutorialManager = function(a) {
    this.game = a;
    this.tutorial = new Tutorial(a)
};
TutorialManager.prototype.init = function(a) {
    switch (a) {
        case 0:
            this.initTutorial0();
            break;
        case 1:
            this.initTutorial1();
            break;
        case 2:
            this.initTutorial2();
            break;
        case 4:
            this.initTutorial4();
            break;
        case 6:
            this.initTutorial6();
            break;
        case 11:
            this.initTutorial11()
    }
};
TutorialManager.prototype.initTutorial0 = function() {
    this.tutorial.reset();
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onDown", new RectArea(15, 15, 420, 70)), new Hint("Pick a horizontal straw", 220, 60));
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp", new RectArea(0, 90, this.game.width, 490)), new Hint("Drag it on the stage", 370, 280));
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onDown", new RectArea(15, 15, 420, 70)), new Hint("Repeat again to build\na complete path to Norris",
        220, 60));
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp", new RectArea(0, 90, this.game.width, 490)));
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp"), new Hint("When you are ready, touch this button\nto start the juice flow", this.game.width - 65, this.game.height - 70));
    this.tutorial.start()
};
TutorialManager.prototype.initTutorial1 = function() {
    this.tutorial.reset();
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp"), new Hint("It's an obstacle!\nYou can not place a straw here.", 515, 375));
    this.tutorial.start()
};
TutorialManager.prototype.initTutorial2 = function() {
    this.tutorial.reset();
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp"), new Hint("Norris wants to add some fruits\nto his cocktail!\nCollect them to complete the level.", 640, 65));
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp"), new Hint("To collect a fruit simply\ndrag a straw on it!\nDo not forget to make\nthe juice flow through it.", 370, 380));
    this.tutorial.start()
};
TutorialManager.prototype.initTutorial4 = function() {
    this.tutorial.reset();
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp"), new Hint("You can shuffle straws with this button.\nUse wisely!", 740, 580));
    this.tutorial.start()
};
TutorialManager.prototype.initTutorial6 = function() {
    this.tutorial.reset();
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp"), new Hint("This button allows you\nto return a straw back to the stack.", 660, 580));
    this.tutorial.start()
};
TutorialManager.prototype.initTutorial11 = function() {
    this.tutorial.reset();
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp"), new Hint("You can put a straw here,\nbut this thing is very hot.", 515, 440));
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp"), new Hint("Let the juice flow\nover this button,", 447, 320));
    this.tutorial.addTutorialStep(new InputEventCommand(this.game, "onUp"), new Hint("To turn it off.", 515, 440));
    this.tutorial.start()
};
GameGUI = function(a) {
    this.game = a;
    Phaser.Group.call(this, a);
    this.drawFlowersRects();
    a = new HippoAvatar(this.game);
    a.x = 786;
    this.addChild(a);
    var b = this.game.add.sprite(5, 10, "GameScreenGuiAssets1");
    b.frameName = "PipeSelectorBackground";
    this.addChild(b);
    this.missionBackground = this.game.add.sprite(a.x - 220, 10, "GameScreenGuiAssets1");
    this.missionBackground.frameName = "MissionBackground";
    this.addChild(this.missionBackground);
    this.pipesCountText = this.game.add.bitmapText(450, 35, "font", "12/12", 32);
    this.pipesCountText.align =
        "center";
    this.addChild(this.pipesCountText);
    this.pipeSelector = new PipeSelector(this.game);
    this.pipeSelector.x = 25;
    this.pipeSelector.y = 15;
    this.addChild(this.pipeSelector);
    this.missionContainer = new MissionContainer(this.game);
    this.missionContainer.x = a.x - 120;
    this.missionContainer.y = 25;
    this.addChild(this.missionContainer);
    this.pauseButton = this.game.add.button(15, this.game.height - 65, "GameScreenGuiAssets1", null, null, "PauseButton0002", "PauseButton0001", "PauseButton0002", "PauseButton0001");
    this.addChild(this.pauseButton);
    this.startFlowButton = this.game.add.button(this.game.width - 95, this.game.height - 80, "GameScreenGuiAssets1", null, null, "SpeedUpButton0002", "SpeedUpButton0001", "SpeedUpButton0002", "SpeedUpButton0001");
    this.addChild(this.startFlowButton);
    this.randomizeAbilityButton = new AbilityButton(this.game, this.startFlowButton.x - 80, this.game.height - 65, "GameScreenGuiAssets1", null, null, "AbilityButtonShuffle0002", "AbilityButtonShuffle0001", "AbilityButtonShuffle0002", "AbilityButtonShuffle0001");
    this.addChild(this.randomizeAbilityButton);
    this.removeAbilityButton = new AbilityButton(this.game, this.randomizeAbilityButton.x - 80, this.game.height - 65, "GameScreenGuiAssets1", null, null, "AbilityButtonRemove0002", "AbilityButtonRemove0001", "AbilityButtonRemove0002", "AbilityButtonRemove0001");
    this.addChild(this.removeAbilityButton)
};
GameGUI.prototype = Object.create(Phaser.Group.prototype);
GameGUI.prototype.constructor = GameGUI;
GameGUI.prototype.drawFlowersRects = function() {
    var a = this.game.add.graphics(0, 0);
    a.beginFill(10185011);
    a.drawRect(0, 0, this.game.width, 105);
    a.drawRect(0, this.game.height - 60, this.game.width, 2);
    a.endFill();
    a.beginFill(15785390);
    a.drawRect(0, 0, this.game.width, 100);
    a.drawRect(0, this.game.height - 58, this.game.width, 58);
    a.endFill();
    this.addChild(a);
    a = this.game.add.tileSprite(0, 0, this.game.width, 95, "FlowersTile");
    this.addChild(a);
    a = this.game.add.tileSprite(0, this.game.height - 55, this.game.width, 55, "FlowersTile");
    this.addChild(a)
};
HotspotsContainer = function(a) {
    this.gameScreen = a;
    this.game = a.game;
    Phaser.Group.call(this, game);
    this.hotspots = [];
    this.hotspotButtonss = []
};
HotspotsContainer.prototype = Object.create(Phaser.Group.prototype);
HotspotsContainer.prototype.constructor = HotspotsContainer;
HotspotsContainer.prototype.addHotspot = function(a, b, c, d, e) {
    if (null == this.getHotspotAt(b, c, null)) {
        var f = GameObjectFactory.getHotspotByType(this.game, a),
            g = this.gameScreen.cellToScreenCoordinates(b, c);
        f.x = g.x + CELL_WIDTH / 2;
        f.y = g.y + CELL_HEIGHT / 2;
        f.cx = b;
        f.cy = c;
        this.addChild(f);
        this.hotspots.push(f)
    }
    null == this.getHotspotButtonAt(b, c, null) && (a = GameObjectFactory.getHotspotButtonByType(this.game, a), g = this.gameScreen.cellToScreenCoordinates(d, e), a.x = g.x + CELL_WIDTH / 2, a.y = g.y + CELL_HEIGHT / 2, a.cx = d, a.cy = e, this.addChild(a),
        this.hotspotButtonss.push(a));
    return f
};
HotspotsContainer.prototype.getHotspotAt = function(a, b, c) {
    c = c || null;
    for (var d in this.hotspots) {
        var e = this.hotspots[d];
        if (e != c && e.cx == a && e.cy == b) return e
    }
    return null
};
HotspotsContainer.prototype.getHotspotButtonAt = function(a, b, c) {
    c = c || null;
    for (var d in this.hotspotButtonss) {
        var e = this.hotspotButtonss[d];
        if (e != c && e.cx == a && e.cy == b) return e
    }
    return null
};
ObstaclesContainer = function(a) {
    this.gameScreen = a;
    this.game = a.game;
    Phaser.Group.call(this, game);
    this.obstacles = []
};
ObstaclesContainer.prototype = Object.create(Phaser.Group.prototype);
ObstaclesContainer.prototype.constructor = ObstaclesContainer;
ObstaclesContainer.prototype.addObstacle = function(a, b, c) {
    a = GameObjectFactory.getObstacleByType(this.game, a);
    var d = this.gameScreen.cellToScreenCoordinates(b, c);
    a.x = d.x + CELL_WIDTH / 2;
    a.y = d.y + CELL_HEIGHT / 2;
    a.cx = b;
    a.cy = c;
    this.addChild(a);
    this.obstacles.push(a);
    return a
};
ObstaclesContainer.prototype.removeObstacle = function(a) {
    this.obstacles.splice(this.obstacles.indexOf(a), 1);
    a.destroy(!0)
};
ObstaclesContainer.prototype.getObstacleAt = function(a, b, c) {
    c = c || null;
    for (var d in this.obstacles) {
        var e = this.obstacles[d];
        if (e != c && e.cx == a && e.cy == b) return e
    }
    return null
};
PipesContainer = function(a) {
    this.gameScreen = a;
    this.game = a.game;
    Phaser.Group.call(this, game);
    this.pipes = [];
    this.startPipes = [];
    this.endPipes = [];
    this.pipeAddedEvent = new Phaser.Signal;
    this.pipeRemovedEvent = new Phaser.Signal
};
PipesContainer.prototype = Object.create(Phaser.Group.prototype);
PipesContainer.prototype.constructor = PipesContainer;
PipesContainer.prototype.addPipe = function(a, b, c) {
    a = GameObjectFactory.getPipeByType(this.game, a);
    var d = this.gameScreen.cellToScreenCoordinates(b, c);
    a.x = d.x;
    a.y = d.y;
    a.cx = b;
    a.cy = c;
    this.addChild(a);
    this.pipes.push(a);
    a.type === BasePipe.TYPE_START && this.startPipes.push(a);
    a.type === BasePipe.TYPE_END && this.endPipes.push(a);
    this.sortPipes();
    this.pipeAddedEvent.dispatch(a, b, c);
    return a
};
PipesContainer.prototype.removePipe = function(a) {
    var b = this.gameScreen.screenToCellCoordinates(a.x, a.y);
    this.pipes.splice(this.pipes.indexOf(a), 1);
    a.type === BasePipe.TYPE_START && this.startPipes.splice(this.startPipes.indexOf(a), 1);
    a.type === BasePipe.TYPE_END && this.endPipes.splice(this.endPipes.indexOf(a), 1);
    this.removeChild(a);
    a.destroy(!0);
    this.pipeRemovedEvent.dispatch(b.x, b.y)
};
PipesContainer.prototype.removePipeAt = function(a, b) {};
PipesContainer.prototype.alignPipe = function(a, b, c) {
    a.cx = b;
    a.cy = c;
    p = this.gameScreen.cellToScreenCoordinates(b, c);
    a.x = Math.floor(p.x);
    a.y = Math.floor(p.y);
    this.sortPipes()
};
PipesContainer.prototype.getPipeAt = function(a, b, c) {
    for (var d in this.pipes) {
        var e = this.pipes[d];
        if (e != c && e.cx == a && e.cy == b) return e
    }
    return null
};
PipesContainer.prototype.getNextPipe = function(a, b) {
    var c = BasePipe.getDirectionOffsets(b),
        d = this.gameScreen.screenToCellCoordinates(a.x, a.y),
        c = this.getPipeAt(d.x + c.x, d.y + c.y);
    return null != c && -1 < c.directions.indexOf(BasePipe.getOppositeDirection(b)) ? [c, c.getOutput(BasePipe.getOppositeDirection(b))] : null
};
PipesContainer.prototype.sortPipes = function() {
    this.pipes.sort(function(a, c) {
        return a.x < c.x || a.x == c.x && a.y > c.y ? 1 : -1
    });
    for (var a = 0; a < this.pipes.length; a++) this.bringToTop(this.pipes[a])
};
BaseCommand = function(a) {
    this.game = a;
    this.completeEvent = new Phaser.Signal
};
BaseCommand.prototype = {
    complete: function() {
        this.completeEvent.dispatch()
    },
    activate: function() {},
    deactivate: function() {}
};
InputEventCommand = function(a, b, c) {
    this.event = b;
    this.area = c || null;
    BaseCommand.call(this, a)
};
InputEventCommand.prototype = Object.create(BaseCommand.prototype);
InputEventCommand.prototype.constructor = InputEventCommand;
InputEventCommand.prototype.activate = function() {
    this.game.input[this.event].add(this.onEvent, this)
};
InputEventCommand.prototype.deactivate = function() {
    this.game.input[this.event].remove(this.onEvent, this)
};
InputEventCommand.prototype.onEvent = function() {
    var a = this.game.input.activePointer;
    this.area && !this.area.contains(a.x, a.y) || this.complete()
};
Area = function() {};
Area.prototype = {
    contains: function(a, b) {
        return !1
    }
};
RectArea = function(a, b, c, d) {
    this.rect = new Phaser.Rectangle(a, b, c, d);
    Area.call(this)
};
RectArea.prototype = Object.create(Area.prototype);
RectArea.prototype.constructor = RectArea;
RectArea.prototype.contains = function(a, b) {
    return this.rect.contains(a, b)
};
Tutorial = function(a) {
    this.game = a;
    this.commands = [];
    this.hints = [];
    this.tooltip = new ToolTip(a);
    this.tooltip.exists = !1;
    this.tooltip.visible = !1
};
Tutorial.prototype = {
    addTutorialStep: function(a, b) {
        b = b || null;
        this.commands.push(a);
        this.hints.push(b)
    },
    start: function() {
        this.commandNum = -1;
        this.tooltip.exists = !0;
        this.tooltip.visible = !0;
        this.showNextCommand()
    },
    reset: function() {
        for (var a in this.commands) this.commands[a].deactivate();
        this.commands = [];
        this.tooltip.exists = !1;
        this.tooltip.visible = !1
    },
    showNextCommand: function() {
        -1 < this.commandNum && this.commands[this.commandNum].deactivate();
        if (this.commandNum < this.hints.length - 1) {
            this.commandNum++;
            this.commands[this.commandNum].activate();
            this.commands[this.commandNum].completeEvent.add(this.onComplete, this);
            var a = this.hints[this.commandNum];
            if (null != a) {
                this.tooltip.setText(a.text);
                var b = a.y < 0.5 * this.game.height ? "t" : "b",
                    b = b + (a.x < 0.5 * this.game.width ? "l" : "r");
                this.tooltip.setArrowPosition(b);
                this.tooltip.x = a.x;
                this.tooltip.y = a.y;
                this.tooltip.exists = !0;
                this.tooltip.visible = !0
            } else this.tooltip.exists = !1, this.tooltip.visible = !1
        } else this.reset()
    },
    onComplete: function() {
        this.commands[this.commandNum].completeEvent.remove(this.onComplete,
            this);
        this.showNextCommand()
    }
};
Hint = function(a, b, c) {
    this.text = a;
    this.x = b;
    this.y = c
};
ToolTip = function(a) {
    this.game = a;
    Phaser.Group.call(this, a);
    this.backShape = a.add.graphics(0, 0);
    this.addChild(this.backShape);
    this.arrowShape = a.add.graphics(0, 0);
    this.arrowShape.beginFill(16573116);
    this.drawArrow(this.arrowShape);
    this.arrowShape.lineStyle(6, 16777215, 1);
    this.drawArrow(this.arrowShape, 0, 3);
    this.arrowShape.x = 100;
    this.addChild(this.arrowShape);
    this.tf = a.add.bitmapText(0, 0, "tutorial_font", "", 30);
    this.tf.align = "center";
    this.addChild(this.tf);
    this.arrowPosition = "br"
};
ToolTip.prototype = Object.create(Phaser.Group.prototype);
ToolTip.prototype.constructor = ToolTip;
ToolTip.prototype.setText = function(a) {
    this.tf.text = a;
    this.tf.updateText();
    this.redraw()
};
ToolTip.prototype.setArrowPosition = function(a) {
    this.arrowPosition = a;
    this.updateArrowPosition()
};
ToolTip.prototype.redraw = function() {
    this.backShape.clear();
    this.backShape.lineStyle(6, 5586432, 0.5);
    this.backShape.drawRect(-3, 3, this.tf.textWidth + 23, this.tf.textHeight + 15);
    this.backShape.beginFill(16573116, 1);
    this.backShape.lineStyle(6, 16777215, 1);
    this.backShape.drawRect(0, 0, this.tf.textWidth + 23, this.tf.textHeight + 15);
    this.backShape.endFill();
    this.updateArrowPosition()
};
ToolTip.prototype.updateArrowPosition = function() {
    var a = this.tf.textWidth,
        b = this.tf.textHeight;
    switch (this.arrowPosition) {
        case "tl":
            this.backShape.x = -20;
            this.backShape.y = 60;
            this.arrowShape.rotation = Math.PI;
            this.arrowShape.x = this.backShape.x + 30;
            this.arrowShape.y = this.backShape.y + 6;
            break;
        case "tr":
            this.backShape.x = 24 - a + 10;
            this.backShape.y = 60;
            this.arrowShape.rotation = Math.PI;
            this.arrowShape.x = this.backShape.x + a;
            this.arrowShape.y = this.backShape.y + 6;
            break;
        case "bl":
            this.backShape.x = -20;
            this.backShape.y = -b - 60;
            this.arrowShape.rotation = 0;
            this.arrowShape.x = this.backShape.x + 10;
            this.arrowShape.y = this.backShape.y + b + 9;
            break;
        case "br":
            this.backShape.x = 24 - a, this.backShape.y = -b - 60, this.arrowShape.rotation = 0, this.arrowShape.x = this.backShape.x + a - 20, this.arrowShape.y = this.backShape.y + b + 9
    }
    this.tf.x = this.backShape.x + 12;
    this.tf.y = this.backShape.y + 8
};
ToolTip.prototype.drawArrow = function(a, b, c) {
    a.moveTo(b, c);
    a.lineTo(b, c + 14);
    a.lineTo(b - 10, c + 14);
    a.lineTo(b + 10, c + 34);
    a.lineTo(b + 30, c + 14);
    a.lineTo(b + 20, c + 14);
    a.lineTo(b + 20, c)
};
BaseBonusItem = function(a, b) {
    this.game = a;
    Phaser.Group.call(this, a, 0, 0);
    this.cy = this.cx = -1;
    this.type = b;
    this.image = this.game.add.sprite(0, 0, "GameScreenAssets1");
    switch (b) {
        case BaseBonusItem.TYPE_ICE:
            this.image.animations.add("animationNormal", Phaser.Animation.generateFrameNames("IceBonusItem", 1, 15, "", 4));
            break;
        case BaseBonusItem.TYPE_ORANGE:
            this.image.animations.add("animationNormal", Phaser.Animation.generateFrameNames("OrangeBonusItem", 1, 30, "", 4));
            break;
        case BaseBonusItem.TYPE_STRAWBERRY:
            this.image.animations.add("animationNormal",
                Phaser.Animation.generateFrameNames("StrawberryBonusItem", 1, 30, "", 4));
            break;
        case BaseBonusItem.TYPE_BANANA:
            this.image.animations.add("animationNormal", Phaser.Animation.generateFrameNames("BananaBonusItem", 1, 30, "", 4));
            break;
        case BaseBonusItem.TYPE_CHERRY:
            this.image.animations.add("animationNormal", Phaser.Animation.generateFrameNames("CherryBonusItem", 1, 30, "", 4));
            break;
        case BaseBonusItem.TYPE_KIWI:
            this.image.animations.add("animationNormal", Phaser.Animation.generateFrameNames("KiwiBonusItem", 1, 30, "",
                4))
    }
    this.image.anchor.setTo(0.5, 0.5);
    this.image.animations.play("animationNormal", 15, !0);
    this.addChild(this.image);
    this.starEffect = this.game.add.sprite(0, 0, "GameScreenAssets2");
    this.starEffect.animations.add("animationSelected", Phaser.Animation.generateFrameNames("StarEffect", 1, 43, "", 4));
    this.starEffect.animations.play("animationSelected", 25, !0);
    this.starEffect.kill();
    this.starEffect.anchor.setTo(0.5, 0.7);
    this.addChild(this.starEffect);
    this.width = this.image.width;
    this.height = this.image.height
};
BaseBonusItem.TYPE_ICE = 0;
BaseBonusItem.TYPE_ORANGE = 1;
BaseBonusItem.TYPE_STRAWBERRY = 2;
BaseBonusItem.TYPE_BANANA = 3;
BaseBonusItem.TYPE_CHERRY = 4;
BaseBonusItem.TYPE_KIWI = 5;
BaseBonusItem.prototype = Object.create(Phaser.Group.prototype);
BaseBonusItem.prototype.constructor = BaseBonusItem;
BaseBonusItem.prototype.activate = function() {
    this.image.kill();
    this.starEffect.revive()
};
BaseBonusItem.prototype.deactivate = function() {
    this.image.revive();
    this.starEffect.kill()
};
BonusText = function(a, b) {
    this.game = a;
    Phaser.Sprite.call(this, a, 100, 100, "GameScreenGuiAssets1");
    this.frameName = b;
    this.anchor.setTo(0.5, 0.5);
    this.c = 130
};
BonusText.prototype = Object.create(Phaser.Sprite.prototype);
BonusText.prototype.constructor = BonusText;
BonusText.prototype.update = function() {
    this.c--;
    this.y -= 0.5;
    100 > this.c && (this.alpha -= 0.05);
    0 >= this.alpha && this.destroy()
};
AbilityButton = function(a, b, c, d, e, f, g, h, k, l) {
    this.game = a;
    Phaser.Button.call(this, a, b, c, d, e, f, g, h, k, l);
    this.text = this.game.add.bitmapText(45, 37, "font", "", 20);
    this.addChild(this.text);
    this.setCount(7)
};
AbilityButton.prototype = Object.create(Phaser.Button.prototype);
AbilityButton.prototype.constructor = AbilityButton;
AbilityButton.prototype.setCount = function(a) {
    this.count = a;
    this.text.setText(a + "");
    1 > this.count ? this.kill() : this.revive()
};
AbilityButton.prototype.getCount = function() {
    return this.count
};
SoundButton = function(a, b, c) {
    this.game = a;
    soundEnabled ? Phaser.Button.call(this, a, b, c, "GameScreenGuiAssets1", this.toggleSound, this, "SoundOnButton0002", "SoundOnButton0001", "SoundOnButton0002", "SoundOnButton0001") : Phaser.Button.call(this, a, b, c, "GameScreenGuiAssets1", this.toggleSound, this, "SoundOffButton0002", "SoundOffButton0001", "SoundOffButton0002", "SoundOffButton0001")
};
SoundButton.prototype = Object.create(Phaser.Button.prototype);
SoundButton.prototype.constructor = SoundButton;
SoundButton.prototype.toggleSound = function() {
    soundEnabled = !soundEnabled;
    setSoundEnabled(soundEnabled);
    soundEnabled ? this.setFrames("SoundOnButton0002", "SoundOnButton0001", "SoundOnButton0002", "SoundOnButton0001") : this.setFrames("SoundOffButton0002", "SoundOffButton0001", "SoundOffButton0002", "SoundOffButton0001");
    this.game.sound.mute = !soundEnabled
};
Logo = function(a, b, c, d) {
    Phaser.Sprite.call(this, a, b, c, d);
    a.add.existing(this);
    this.inputEnabled = !0;
    this.events.onInputDown.add(this.onClick, this);
    this.input.useHandCursor = !0
};
Logo.prototype = Object.create(Phaser.Sprite.prototype);
Logo.prototype.constructor = Logo;
Logo.prototype.onClick = function() {
    var a = this.game.input.mouse.event || this.game.input.touch.event;
    "logo_large" === this.key ? GameAPI.Branding.getSplashScreen().action(a) : GameAPI.Branding.getLogo().action(a)
};
MoreGamesButton = function(a, b, c) {
    Phaser.Button.call(this, a, b, c, "StartScreenAssets", this.onClick, this, "MoreGamesButton0001", "MoreGamesButton0000", "MoreGamesButton0001");
    a.add.existing(this)
};
MoreGamesButton.prototype = Object.create(Phaser.Button.prototype);
MoreGamesButton.prototype.constructor = MoreGamesButton;
MoreGamesButton.prototype.onClick = function() {
    var a = this.game.input.mouse.event || this.game.input.touch.event;
    GameAPI.Branding.getLink("more_games").action(a)
};
BaseEffect = function(a, b, c, d, e) {
    this.game = a;
    Phaser.Sprite.call(this, a, 100, 100, "GameScreenAssets2");
    this.fps = c || 30;
    this.duration = d || -1;
    this.loop = e || -1 < this.duration;
    this.animations.add("animation", b);
    this.animation = this.animations.play("animation", this.fps, this.loop);
    this.startTime = this.game.time.time;
    this.anchor.setTo(0.5, 0.5)
};
BaseEffect.prototype = Object.create(Phaser.Sprite.prototype);
BaseEffect.prototype.constructor = BaseEffect;
BaseEffect.prototype.update = function() {
    -1 != this.duration || this.loop ? -1 != this.duration && this.duration < this.game.time.time - this.startTime && this.destroy() : this.animation._frameIndex == this.animation.frameTotal && this.destroy()
};
HippoAvatar = function(a) {
    this.game = a;
    Phaser.Group.call(this, a);
    this.background = this.create(0, 0, "GameScreenGuiAssets1");
    this.background.frameName = "HippoAvatarBackground";
    this.background.x = 0.5 * this.background.width + 3;
    this.background.y = 0.5 * this.background.height;
    this.background.anchor.setTo(0.5, 0.5);
    a = this.create(0, 0, "GameScreenGuiAssets1");
    a.animations.add("animation", Phaser.Animation.generateFrameNames("HippoAvatar", 1, 24, "", 4));
    a.animations.play("animation", 12, !0);
    a = this.create(30, 15, "GameScreenGuiAssets1");
    a.animations.add("animation", Phaser.Animation.generateFrameNames("HippoAvatarSweat", 1, 24, "", 4));
    a.animations.play("animation", 12, !0)
};
HippoAvatar.prototype = Object.create(Phaser.Group.prototype);
HippoAvatar.prototype.constructor = HippoAvatar;
HippoAvatar.prototype.update = function() {
    this.background.rotation += 0.01
};
BaseHotspot = function(a, b) {
    this.game = a;
    Phaser.Sprite.call(this, a, 0, 0, "GameScreenAssets1");
    this.cy = this.cx = -1;
    this.type = b;
    switch (b) {
        case BaseHotspot.TYPE_GREEN:
            this.frameName = "HotSpotGreen0001";
            break;
        case BaseHotspot.TYPE_RED:
            this.frameName = "HotSpotRed0001";
            break;
        case BaseHotspot.TYPE_BLUE:
            this.frameName = "HotSpotBlue0001"
    }
    this.anchor.setTo(0.5, 0.5);
    this.activate()
};
BaseHotspot.TYPE_GREEN = 0;
BaseHotspot.TYPE_RED = 1;
BaseHotspot.TYPE_BLUE = 2;
BaseHotspot.prototype = Object.create(Phaser.Sprite.prototype);
BaseHotspot.prototype.constructor = BaseHotspot;
BaseHotspot.prototype.activate = function() {
    this.frameName = this.frameName.substr(0, this.frameName.length - 1) + 2;
    this.activated = !0
};
BaseHotspot.prototype.deactivate = function() {
    this.frameName = this.frameName.substr(0, this.frameName.length - 1) + 1;
    this.activated = !1
};
BaseHotspotButton = function(a, b) {
    this.game = a;
    Phaser.Sprite.call(this, a, 0, 0, "GameScreenAssets1");
    this.cy = this.cx = -1;
    this.type = b;
    switch (b) {
        case BaseHotspot.TYPE_GREEN:
            this.frameName = "HotSpotButtonGreen";
            break;
        case BaseHotspot.TYPE_RED:
            this.frameName = "HotSpotButtonRed";
            break;
        case BaseHotspot.TYPE_BLUE:
            this.frameName = "HotSpotButtonBlue"
    }
    this.anchor.setTo(0.5, 0.5)
};
BaseHotspotButton.prototype = Object.create(Phaser.Sprite.prototype);
BaseHotspotButton.prototype.constructor = BaseHotspotButton;
BaseMissionItem = function(a, b) {
    this.game = a;
    Phaser.Group.call(this, a, 0, 0);
    this.cy = this.cx = -1;
    this.type = b;
    this.icon = new BaseBonusItem(this.game, b);
    this.icon.image.anchor.setTo(0, 0);
    this.addChild(this.icon);
    this.checkbox = this.game.add.sprite(this.icon.image.width - 20, 38, "GameScreenGuiAssets1");
    this.addChild(this.checkbox);
    this.unselect()
};
BaseMissionItem.prototype = Object.create(Phaser.Group.prototype);
BaseMissionItem.prototype.constructor = BaseMissionItem;
BaseMissionItem.prototype.select = function() {
    this.checkbox.frameName = "Checkbox0002";
    this.selected = !0
};
BaseMissionItem.prototype.unselect = function() {
    this.checkbox.frameName = "Checkbox0001";
    this.selected = !1
};
MissionContainer = function(a) {
    this.game = a;
    Phaser.Group.call(this, a);
    this.container = this.game.add.group(0, 0);
    this.addChild(this.container)
};
MissionContainer.prototype = Object.create(Phaser.Group.prototype);
MissionContainer.prototype.constructor = MissionContainer;
MissionContainer.prototype.showBonuses = function(a) {
    var b = 0;
    for (key in a) {
        var c = new BaseMissionItem(this.game, a[key]);
        c.x = b;
        b += c.icon.width + 10;
        this.container.add(c)
    }
    this.container.x = -b / 2 + 10
};
MissionContainer.prototype.selectBonus = function(a) {
    for (var b = 0; b < this.container.total; b++) {
        var c = this.container.getAt(b);
        if (c.type === a && !c.selected) {
            c.select();
            break
        }
    }
};
MissionContainer.prototype.unselectBonus = function(a) {
    for (var b = this.container.total; - 1 < --b;) {
        var c = this.container.getAt(b);
        if (c.type === a && c.selected) {
            c.unselect();
            break
        }
    }
};
BaseObstacle = function(a, b) {
    this.game = a;
    Phaser.Sprite.call(this, a, 0, 0, "GameScreenAssets1");
    this.cy = this.cx = -1;
    this.type = b;
    switch (b) {
        case BaseObstacle.TYPE_LIFEBUOY:
            this.frameName = "LifebuoyObstacle";
            break;
        case BaseObstacle.TYPE_SPONGE:
            this.frameName = "SpongeObstacle";
            break;
        case BaseObstacle.TYPE_PAIL:
            this.frameName = "PailObstacle";
            break;
        case BaseObstacle.TYPE_FENCE_VERTICAL:
            this.frameName = "FenceVerticalObstacle";
            break;
        case BaseObstacle.TYPE_FENCE_HORIZONTAL:
            this.frameName = "FenceHorizontalObstacle"
    }
    this.anchor.setTo(0.5,
        0.5)
};
BaseObstacle.TYPE_LIFEBUOY = 0;
BaseObstacle.TYPE_SPONGE = 1;
BaseObstacle.TYPE_PAIL = 2;
BaseObstacle.TYPE_FENCE_VERTICAL = 3;
BaseObstacle.TYPE_FENCE_HORIZONTAL = 4;
BaseObstacle.prototype = Object.create(Phaser.Sprite.prototype);
BaseObstacle.prototype.constructor = BaseObstacle;
BasePipe = function(a, b) {
    this.game = a;
    this.directions = b;
    Phaser.Group.call(this, a);
    this.currentVolumes = [0, 0, 0, 0];
    this.totalVolumes = [1, 1, 1, 1];
    this.isDraggable = !0;
    this.cy = this.cx = -1
};
BasePipe.NORTH = 0;
BasePipe.EAST = 1;
BasePipe.SOUTH = 2;
BasePipe.WEST = 3;
BasePipe.TYPE_START = -2;
BasePipe.TYPE_END = -1;
BasePipe.TYPE_SW = 0;
BasePipe.TYPE_SE = 1;
BasePipe.TYPE_NE = 2;
BasePipe.TYPE_NW = 3;
BasePipe.TYPE_CROSS = 4;
BasePipe.TYPE_HORIZONTAL = 5;
BasePipe.TYPE_VERTICAL = 6;
BasePipe.offsets = [{
    x: 0,
    y: -1
}, {
    x: 1,
    y: 0
}, {
    x: 0,
    y: 1
}, {
    x: -1,
    y: 0
}];
BasePipe.prototype = Object.create(Phaser.Group.prototype);
BasePipe.prototype.constructor = BasePipe;
BasePipe.prototype.init = function() {};
BasePipe.prototype.getCurrentVolume = function(a) {
    return 0 > a || 3 < a ? 0 : this.currentVolumes[a]
};
BasePipe.prototype.setCurrentVolume = function(a, b) {
    if (!(0 > b || 3 < b)) {
        var c = this.totalVolumes[b];
        a > c ? a = c : 0 > a && (a = 0);
        this.currentVolumes[b] = a;
        null != this.flow && this.flow.setProgress(a / c, b)
    }
};
BasePipe.prototype.getTotalVolume = function(a) {
    return 0 > a || 3 < a ? 0 : this.totalVolumes[a]
};
BasePipe.getDirectionOffsets = function(a) {
    return -1 < a && 4 > a ? BasePipe.offsets[a] : {
        x: 0,
        y: 0
    }
};
BasePipe.getOffsetDirection = function(a) {
    return 0 == a.x ? 0 < a.y ? BasePipe.SOUTH : BasePipe.NORTH : 0 < a.x ? BasePipe.EAST : BasePipe.WEST
};
BasePipe.getOppositeDirection = function(a) {
    return 1 < a ? a - 2 : a + 2
};
EndPipe = function(a) {
    this.game = a;
    BasePipe.call(this, a, [BasePipe.NORTH, BasePipe.SOUTH, BasePipe.WEST, BasePipe.EAST]);
    this.type = BasePipe.TYPE_END;
    this.graphic = this.create(0, 0, "GameScreenAssets2");
    this.graphic.animations.add("normal", Phaser.Animation.generateFrameNames("Hippo", 1, 30, "", 4));
    this.graphic.animations.play("normal", 30, !0);
    this.graphic.x = -10;
    this.graphic.y = -20;
    this.init();
    this.isDraggable = !1
};
EndPipe.prototype = Object.create(BasePipe.prototype);
EndPipe.prototype.constructor = EndPipe;
EndPipe.prototype.getOutput = function(a) {
    return this.directions
};
BaseFlow = function(a) {
    this.game = a;
    Phaser.Group.call(this, a)
};
BaseFlow.prototype = Object.create(Phaser.Group.prototype);
BaseFlow.prototype.constructor = BaseFlow;
BaseFlow.prototype.setProgress = function(a, b) {};
HorizontalFlow = function(a) {
    this.game = a;
    BaseFlow.call(this, a);
    this.flow = this.create(0, 0, "GameScreenAssets1");
    this.flow.frameName = "HorizontalFlow";
    this.flow.mask = a.add.graphics(0, 0);
    this.flow.mask.beginFill(0);
    this.flow.mask.drawRect(0, 0, 91, 22);
    this.flow.mask.endFill();
    this.flow.mask.x = -91;
    this.addChild(this.flow.mask)
};
HorizontalFlow.prototype = Object.create(BaseFlow.prototype);
HorizontalFlow.prototype.constructor = HorizontalFlow;
HorizontalFlow.prototype.setProgress = function(a, b) {
    0 > a ? a = 0 : 1 < a && (a = 1);
    b === BasePipe.EAST ? this.flow.mask.x = 91 - 91 * a : b === BasePipe.WEST && (this.flow.mask.x = -91 + 91 * a)
};
NEFlow = function(a) {
    this.game = a;
    BaseFlow.call(this, a);
    this.flow = this.create(0, 0, "GameScreenAssets1");
    this.flow.frameName = "NEFlow";
    this.flow.mask = a.add.graphics(0, 0);
    this.flow.mask.beginFill(0);
    this.flow.mask.drawRect(-65, -65, 65, 75);
    this.flow.mask.endFill();
    this.flow.mask.x = 40;
    this.flow.mask.y = -14;
    this.addChild(this.flow.mask)
};
NEFlow.prototype = Object.create(BaseFlow.prototype);
NEFlow.prototype.constructor = NEFlow;
NEFlow.prototype.setProgress = function(a, b) {
    0 > a ? a = 0 : 1 < a && (a = 1);
    b === BasePipe.EAST ? this.flow.mask.rotation = (160 + 105 * a) / 180 * Math.PI : b === BasePipe.NORTH && (this.flow.mask.rotation = (264 + 92 * (1 - a)) / 180 * Math.PI)
};
NWFlow = function(a) {
    this.game = a;
    BaseFlow.call(this, a);
    this.flow = this.create(0, 0, "GameScreenAssets1");
    this.flow.frameName = "NWFlow";
    this.flow.mask = a.add.graphics(0, 0);
    this.flow.mask.beginFill(0);
    this.flow.mask.drawRect(-60, -70, 80, 80);
    this.flow.mask.endFill();
    this.flow.mask.x = 12;
    this.addChild(this.flow.mask)
};
NWFlow.prototype = Object.create(BaseFlow.prototype);
NWFlow.prototype.constructor = NWFlow;
NWFlow.prototype.setProgress = function(a, b) {
    0 > a ? a = 0 : 1 < a && (a = 1);
    b === BasePipe.WEST ? (this.flow.mask.x = 12, this.flow.mask.y = 0, this.flow.mask.rotation = (312 - 117 * a) / 180 * Math.PI) : b === BasePipe.NORTH && (this.flow.mask.x = 27, this.flow.mask.y = -18, this.flow.mask.rotation = (81 + 111 * a) / 180 * Math.PI)
};
SEFlow = function(a) {
    this.game = a;
    BaseFlow.call(this, a);
    this.flow = this.create(0, 0, "GameScreenAssets1");
    this.flow.frameName = "SEFlow";
    this.flow.mask = a.add.graphics(0, 0);
    this.flow.mask.beginFill(0);
    this.flow.mask.drawRect(-60, -60, 120, 60);
    this.flow.mask.endFill();
    this.flow.mask.rotation = 158 / 180 * Math.PI;
    this.flow.mask.x = 44;
    this.flow.mask.y = 48;
    this.addChild(this.flow.mask)
};
SEFlow.prototype = Object.create(BaseFlow.prototype);
SEFlow.prototype.constructor = SEFlow;
SEFlow.prototype.setProgress = function(a, b) {
    0 > a ? a = 0 : 1 < a && (a = 1);
    b === BasePipe.SOUTH ? this.flow.mask.rotation = (158 + 130 * a) / 180 * Math.PI : b === BasePipe.EAST && (this.flow.mask.rotation = (105 - 130 * a) / 180 * Math.PI)
};
SWFlow = function(a) {
    this.game = a;
    BaseFlow.call(this, a);
    this.flow = this.create(0, 0, "GameScreenAssets1");
    this.flow.frameName = "SWFlow";
    this.flow.mask = a.add.graphics(0, 0);
    this.flow.mask.beginFill(0);
    this.flow.mask.drawRect(-60, -60, 120, 60);
    this.flow.mask.endFill();
    this.flow.mask.rotation = -118 / 180 * Math.PI;
    this.flow.mask.x = 16;
    this.flow.mask.y = 48;
    this.addChild(this.flow.mask)
};
SWFlow.prototype = Object.create(BaseFlow.prototype);
SWFlow.prototype.constructor = SWFlow;
SWFlow.prototype.setProgress = function(a, b) {
    0 > a ? a = 0 : 1 < a && (a = 1);
    b === BasePipe.WEST ? this.flow.mask.rotation = (-118 + 144 * a) / 180 * Math.PI : b === BasePipe.SOUTH && (this.flow.mask.rotation = (204 - 144 * a) / 180 * Math.PI)
};
VerticalFlow = function(a) {
    this.game = a;
    BaseFlow.call(this, a);
    this.flow = this.create(0, 0, "GameScreenAssets1");
    this.flow.frameName = "VerticalFlow";
    this.flow.mask = a.add.graphics(0, 0);
    this.flow.mask.beginFill(0);
    this.flow.mask.drawRect(0, 0, 24, 80);
    this.flow.mask.endFill();
    this.flow.mask.y = -80;
    this.addChild(this.flow.mask)
};
VerticalFlow.prototype = Object.create(BaseFlow.prototype);
VerticalFlow.prototype.constructor = VerticalFlow;
VerticalFlow.prototype.setProgress = function(a, b) {
    0 > a ? a = 0 : 1 < a && (a = 1);
    b === BasePipe.NORTH ? this.flow.mask.y = -80 + 80 * a : b === BasePipe.SOUTH && (this.flow.mask.y = 80 - 80 * a)
};
HorizontalPipe = function(a) {
    this.game = a;
    BasePipe.call(this, a, [BasePipe.WEST, BasePipe.EAST]);
    this.type = BasePipe.TYPE_HORIZONTAL;
    this.flow = new HorizontalFlow(this.game);
    this.flow.y = 13;
    this.addChild(this.flow);
    this.graphic = this.create(0, 0, "GameScreenAssets1");
    this.graphic.frameName = "Pipe_WE";
    this.graphic.x = -4;
    this.graphic.y = 12;
    this.init()
};
HorizontalPipe.prototype = Object.create(BasePipe.prototype);
HorizontalPipe.prototype.constructor = HorizontalPipe;
HorizontalPipe.prototype.getOutput = function(a) {
    return a === BasePipe.EAST ? [BasePipe.WEST] : a === BasePipe.WEST ? [BasePipe.EAST] : []
};
NEPipe = function(a) {
    this.game = a;
    BasePipe.call(this, a, [BasePipe.NORTH, BasePipe.EAST]);
    this.type = BasePipe.TYPE_NE;
    this.flow = new NEFlow(this.game);
    this.flow.x = 30;
    this.flow.y = 1;
    this.addChild(this.flow);
    this.graphic = this.create(0, 0, "GameScreenAssets1");
    this.graphic.frameName = "Pipe_NE";
    this.graphic.x = 25;
    this.graphic.y = -1;
    this.init()
};
NEPipe.prototype = Object.create(BasePipe.prototype);
NEPipe.prototype.constructor = NEPipe;
NEPipe.prototype.getOutput = function(a) {
    return a === BasePipe.NORTH ? [BasePipe.EAST] : a === BasePipe.EAST ? [BasePipe.NORTH] : []
};
NWPipe = function(a) {
    this.game = a;
    BasePipe.call(this, a, [BasePipe.NORTH, BasePipe.WEST]);
    this.type = BasePipe.TYPE_NW;
    this.flow = new NWFlow(this.game);
    this.flow.x = -5;
    this.flow.y = 1;
    this.addChild(this.flow);
    this.graphic = this.create(0, 0, "GameScreenAssets1");
    this.graphic.frameName = "Pipe_NW";
    this.graphic.x = -8;
    this.graphic.y = 0;
    this.init()
};
NWPipe.prototype = Object.create(BasePipe.prototype);
NWPipe.prototype.constructor = NWPipe;
NWPipe.prototype.getOutput = function(a) {
    return a === BasePipe.NORTH ? [BasePipe.WEST] : a === BasePipe.WEST ? [BasePipe.NORTH] : []
};
SEPipe = function(a) {
    this.game = a;
    BasePipe.call(this, a, [BasePipe.SOUTH, BasePipe.EAST]);
    this.type = BasePipe.TYPE_SE;
    this.flow = new SEFlow(this.game);
    this.flow.x = 31;
    this.flow.y = 14;
    this.addChild(this.flow);
    this.graphic = this.create(0, 0, "GameScreenAssets1");
    this.graphic.frameName = "Pipe_SE";
    this.graphic.x = 28;
    this.graphic.y = 12;
    this.init()
};
SEPipe.prototype = Object.create(BasePipe.prototype);
SEPipe.prototype.constructor = SEPipe;
SEPipe.prototype.getOutput = function(a) {
    return a === BasePipe.SOUTH ? [BasePipe.EAST] : a === BasePipe.EAST ? [BasePipe.SOUTH] : []
};
StartPipe = function(a) {
    this.game = a;
    BasePipe.call(this, a, []);
    this.type = BasePipe.TYPE_START;
    this.graphic = this.create(0, 0, "GameScreenAssets1");
    this.graphic.animations.add("normal", Phaser.Animation.generateFrameNames("SourceNormal", 1, 4, "", 4));
    this.graphic.animations.add("north", Phaser.Animation.generateFrameNames("SourceNorth", 1, 4, "", 4));
    this.graphic.animations.add("east", Phaser.Animation.generateFrameNames("SourceEast", 1, 4, "", 4));
    this.graphic.animations.add("south", Phaser.Animation.generateFrameNames("SourceSouth",
        1, 4, "", 4));
    this.graphic.animations.add("west", Phaser.Animation.generateFrameNames("SourceWest", 1, 4, "", 4));
    this.graphic.animations.play("normal", 1, !0);
    this.graphic.y = -30;
    this.init();
    this.isDraggable = !1
};
StartPipe.prototype = Object.create(BasePipe.prototype);
StartPipe.prototype.constructor = StartPipe;
StartPipe.prototype.getOutput = function(a) {
    return this.directions
};
StartPipe.prototype.setGraphicDirection = function(a) {
    switch (a) {
        case BasePipe.NORTH:
            this.graphic.animations.play("north", 1, !0);
            this.graphic.x = 0;
            break;
        case BasePipe.EAST:
            this.graphic.animations.play("east", 1, !0);
            this.graphic.x = 0;
            break;
        case BasePipe.SOUTH:
            this.graphic.animations.play("south", 1, !0);
            this.graphic.x = 0;
            break;
        case BasePipe.WEST:
            this.graphic.animations.play("west", 1, !0);
            this.graphic.x = -5;
            break;
        default:
            this.graphic.animations.play("normal", 1, !0), this.graphic.x = 0
    }
};
SWPipe = function(a) {
    this.game = a;
    BasePipe.call(this, a, [BasePipe.SOUTH, BasePipe.WEST]);
    this.type = BasePipe.TYPE_SW;
    this.flow = new SWFlow(this.game);
    this.flow.x = -3;
    this.flow.y = 12;
    this.addChild(this.flow);
    this.graphic = this.create(0, 0, "GameScreenAssets1");
    this.graphic.frameName = "Pipe_SW";
    this.graphic.x = -7;
    this.graphic.y = 10;
    this.init()
};
SWPipe.prototype = Object.create(BasePipe.prototype);
SWPipe.prototype.constructor = SWPipe;
SWPipe.prototype.getOutput = function(a) {
    return a === BasePipe.SOUTH ? [BasePipe.WEST] : a === BasePipe.WEST ? [BasePipe.SOUTH] : []
};
VerticalPipe = function(a) {
    this.game = a;
    BasePipe.call(this, a, [BasePipe.NORTH, BasePipe.SOUTH]);
    this.type = BasePipe.TYPE_VERTICAL;
    this.flow = new VerticalFlow(this.game);
    this.flow.x = 30;
    this.flow.y = -9;
    this.addChild(this.flow);
    this.graphic = this.create(0, 0, "GameScreenAssets1");
    this.graphic.frameName = "Pipe_NS";
    this.graphic.x = 26;
    this.graphic.y = -10;
    this.init()
};
VerticalPipe.prototype = Object.create(BasePipe.prototype);
VerticalPipe.prototype.constructor = VerticalPipe;
VerticalPipe.prototype.getOutput = function(a) {
    return a === BasePipe.NORTH ? [BasePipe.SOUTH] : a === BasePipe.SOUTH ? [BasePipe.NORTH] : []
};
PipeSelector = function(a) {
    this.game = a;
    Phaser.Group.call(this, a);
    this.pipePickedEvent = new Phaser.Signal
};
PipeSelector.prototype = Object.create(Phaser.Group.prototype);
PipeSelector.prototype.constructor = PipeSelector;
PipeSelector.prototype.setPipes = function(a, b) {
    this.maxPipesPerTurn = b || 4;
    this.dispose();
    this.pipeTypes = a.slice(0);
    this.totalPipesCount = a.length;
    this.padding = 25;
    this.currentPipes = [];
    this.currentPipesTypes = [];
    for (var c = 0; c < this.maxPipesPerTurn; c++) this.addRandomPipeFromRestAt(c)
};
PipeSelector.prototype.start = function() {
    this.enabled = !0;
    this.game.input.onDown.add(this.onDown, this)
};
PipeSelector.prototype.stop = function() {
    this.enabled = !1;
    this.game.input.onDown.remove(this.onDown, this)
};
PipeSelector.prototype.addRandomPipeFromRestAt = function(a, b) {
    b = b || !1;
    if (!(0 > a)) {
        if (0 < this.pipeTypes.length) {
            var c = this.pipeTypes.splice(Math.floor(Math.random() * this.pipeTypes.length), 1)[0];
            this.addPipeImageAt(a, c, b)
        }
        this.alignPipes()
    }
};
PipeSelector.prototype.addPipeByTypeAt = function(a, b) {
    0 > a || (this.addPipeImageAt(a, b), this.alignPipes())
};
PipeSelector.prototype.addNewPipe = function(a) {
    this.total < this.maxPipesPerTurn ? this.addPipeByTypeAt(this.pipeTypes.length, a) : this.pipeTypes.push(a)
};
PipeSelector.prototype.removePipeAt = function(a) {
    0 > a || this.removePipeImageAt(a)
};
PipeSelector.prototype.getTotalPipesCount = function() {
    return this.totalPipesCount
};
PipeSelector.prototype.getRestPipesCount = function() {
    return this.pipeTypes.length + this.total
};
PipeSelector.prototype.randomize = function() {
    for (var a = 0; 0 < this.currentPipes.length;) {
        var b = this.currentPipes.pop(),
            c = this.currentPipesTypes.pop();
        this.pipeTypes.push(c);
        this.removePipeTween(b, 0.1 * a++)
    }
    for (a = 0; a < this.maxPipesPerTurn; a++) this.addRandomPipeFromRestAt(a, !0)
};
PipeSelector.prototype.dispose = function() {
    this.removeAll(!0)
};
PipeSelector.prototype.alignPipes = function() {
    for (var a = 0; a < this.currentPipes.length; a++) this.currentPipes[a].x = Math.floor(a * (CELL_WIDTH + this.padding) + CELL_WIDTH / 2)
};
PipeSelector.prototype.addPipeImageAt = function(a, b, c) {
    c = c || !1;
    var d = this.create(0, Math.round(CELL_HEIGHT / 2), "GameScreenAssets1");
    d.anchor.setTo(0.5, 0.5);
    this.addChild(d);
    d.frameName = this.getPipeFrameNameByType(b);
    c && this.showPipeTween(d, 60 * a);
    this.currentPipes.splice(a, 0, d);
    this.currentPipesTypes.splice(a, 0, b)
};
PipeSelector.prototype.showPipeTween = function(a, b) {
    a.y = 0;
    a.alpha = 0;
    this.game.add.tween(a).to({
        y: CELL_HEIGHT / 2,
        alpha: 1
    }, 500, Phaser.Easing.Cubic.Out, !0, b)
};
PipeSelector.prototype.removePipeTween = function(a, b) {
    this.game.add.tween(a).to({
        y: CELL_HEIGHT,
        alpha: 0
    }, 500, Phaser.Easing.Cubic.Out, !0, b).onComplete.add(this.removePipeTweenComplete, this)
};
PipeSelector.prototype.removePipeTweenComplete = function(a) {
    a.destroy()
};
PipeSelector.prototype.removePipeImageAt = function(a) {
    var b = this.currentPipes[a];
    this.currentPipes.splice(a, 1);
    this.currentPipesTypes.splice(a, 1);
    this.removeChild(b)
};
PipeSelector.prototype.getPipeFrameNameByType = function(a) {
    switch (a) {
        case BasePipe.TYPE_CROSS:
            return "Pipe_NSWE";
        case BasePipe.TYPE_HORIZONTAL:
            return "Pipe_WE";
        case BasePipe.TYPE_VERTICAL:
            return "Pipe_NS";
        case BasePipe.TYPE_NE:
            return "Pipe_NE";
        case BasePipe.TYPE_NW:
            return "Pipe_NW";
        case BasePipe.TYPE_SE:
            return "Pipe_SE";
        case BasePipe.TYPE_SW:
            return "Pipe_SW"
    }
    return ""
};
PipeSelector.prototype.onDown = function(a) {
    a = this.game.input.activePointer.position.x - this.x;
    this.game.input.activePointer.position.y - this.y > CELL_HEIGHT || (a = Math.floor((a + this.padding / 2) / (CELL_WIDTH + this.padding)), 0 <= a && a < this.currentPipes.length && (this.selectedPipeIndex = a, this.pipePickedEvent.dispatch(this.currentPipesTypes[a])))
};
BasePopup = function(a) {
    this.game = a;
    Phaser.Group.call(this, a);
    this.backSprite = this.game.add.sprite(0, 0, "GameScreenGuiAssets1");
    this.backSprite.frameName = "PopupBackground";
    this.backSprite.width = this.game.width;
    this.backSprite.height = this.game.height;
    this.addChild(this.backSprite);
    this.container = this.game.add.group();
    this.addChild(this.container);
    this.background = this.create(0, 0, "GameScreenGuiAssets2");
    this.container.addChild(this.background);
    this.buttonsContainer = this.game.add.group();
    this.levelsButton =
        this.game.add.button(0, 0, "LevelScreenAssets", this.back, this, "BackButton0001", "BackButton0000", "BackButton0001", "BackButton0000");
    this.buttonsContainer.addChild(this.levelsButton);
    this.restartButton = this.game.add.button(this.levelsButton.x + this.levelsButton.width + 30, -15, "GameScreenGuiAssets1", this.restart, this, "RestartButton0002", "RestartButton0001", "RestartButton0002", "RestartButton0001");
    this.buttonsContainer.addChild(this.restartButton);
    this.nextButton = this.game.add.button(this.restartButton.x +
        this.restartButton.width + 30, 0, "GameScreenGuiAssets1", this.next, this, "NextButton0002", "NextButton0001", "NextButton0002", "NextButton0001");
    this.buttonsContainer.addChild(this.nextButton);
    this.buttonsContainer.y = 280;
    this.container.addChild(this.buttonsContainer);
    this.backClickedEvent = new Phaser.Signal;
    this.restartClickedEvent = new Phaser.Signal;
    this.nextClickedEvent = new Phaser.Signal
};
BasePopup.prototype = Object.create(Phaser.Group.prototype);
BasePopup.prototype.constructor = BasePopup;
BasePopup.prototype.init = function() {
    this.backSprite.inputEnabled = !0;
    this.backSprite.events.onInputDown.add(this.onDown, this);
    this.backSprite.alpha = 0;
    this.game.add.tween(this.backSprite).to({
        alpha: 1
    }, 300).start()
};
BasePopup.prototype.kill = function() {
    this.setAll("inputEnabled", !1);
    this.buttonsContainer.setAll("inputEnabled", !1);
    this.exists = !1
};
BasePopup.prototype.revive = function() {
    this.setAll("inputEnabled", !0);
    this.buttonsContainer.setAll("inputEnabled", !0);
    this.exists = !0
};
BasePopup.prototype.onDown = function(a, b) {
    this.game.input.mouse.event.stopImmediatePropagation()
};
BasePopup.prototype.back = function() {
    this.backClickedEvent.dispatch()
};
BasePopup.prototype.restart = function() {
    this.restartClickedEvent.dispatch()
};
BasePopup.prototype.next = function() {
    this.nextClickedEvent.dispatch()
};
FailPopup = function(a) {
    this.game = a;
    BasePopup.call(this, a);
    this.background.frameName = "FailPopup";
    this.nextButton.kill();
    this.buttonsContainer.x = (this.background.width - this.nextButton.x - this.nextButton.width) / 2
};
FailPopup.prototype = Object.create(BasePopup.prototype);
FailPopup.prototype.constructor = FailPopup;
FailPopup.prototype.init = function() {
    BasePopup.prototype.init.call(this);
    this.container.x = (this.game.width - this.background.width) / 2;
    this.container.y = this.game.height;
    this.game.add.tween(this.container).to({
        y: (this.game.height - this.background.height) / 2
    }, 400, Phaser.Easing.Back.Out, !0)
};
PausePopup = function(a) {
    this.game = a;
    BasePopup.call(this, a);
    this.background.frameName = "PausePopup";
    this.buttonsContainer.removeAll(!0);
    a = new SoundButton(this.game, 0, 0);
    this.game.add.existing(a);
    this.buttonsContainer.addChild(a);
    this.backButton = this.game.add.button(a.width + 30, 0, "GameScreenGuiAssets1", this.back, this, "LevelButton0002", "LevelButton0001", "LevelButton0002", "LevelButton0001");
    this.buttonsContainer.addChild(this.backButton);
    this.restartButton = this.game.add.button(this.backButton.x + this.backButton.width +
        30, 0, "GameScreenGuiAssets1", this.restart, this, "RestartButtonSmall0002", "RestartButtonSmall0001", "RestartButtonSmall0002", "RestartButtonSmall0001");
    this.buttonsContainer.addChild(this.restartButton);
    this.continueButton = this.game.add.button(this.restartButton.x + this.restartButton.width + 30, 0, "GameScreenGuiAssets1", this.continueGame, this, "PlayButton0002", "PlayButton0001", "PlayButton0002", "PlayButton0001");
    this.buttonsContainer.addChild(this.continueButton);
    this.buttonsContainer.x = (this.background.width -
        this.continueButton.x - this.continueButton.width) / 2;
    this.buttonsContainer.y = (this.background.height - this.continueButton.height) / 2 + 10;
    this.continueClickedEvent = new Phaser.Signal
};
PausePopup.prototype = Object.create(BasePopup.prototype);
PausePopup.prototype.constructor = PausePopup;
PausePopup.prototype.init = function() {
    BasePopup.prototype.init.call(this);
    this.container.x = (this.game.width - this.background.width) / 2;
    this.container.y = this.game.height;
    this.game.add.tween(this.container).to({
        y: (this.game.height - this.background.height) / 2
    }, 400, Phaser.Easing.Back.Out, !0)
};
PausePopup.prototype.continueGame = function() {
    this.continueClickedEvent.dispatch()
};
WinPopup = function(a) {
    this.game = a;
    BasePopup.call(this, a);
    this.background.frameName = "WinPopup";
    this.scoreText = this.game.add.bitmapText(0, 0, "score_font_white", "Score: ", 40);
    this.scoreText.x = 200;
    this.scoreText.y = 130;
    this.container.addChild(this.scoreText);
    this.buttonsContainer.x = (this.background.width - this.nextButton.x - this.nextButton.width) / 2
};
WinPopup.prototype = Object.create(BasePopup.prototype);
WinPopup.prototype.constructor = WinPopup;
WinPopup.prototype.init = function(a, b) {
    BasePopup.prototype.init.call(this);
    this.score = a;
    this.tempScore = 0;
    this.stars = b;
    this.container.x = (this.game.width - this.background.width) / 2;
    this.container.y = this.game.height;
    this.game.add.tween(this.container).to({
        y: (this.game.height - this.background.height) / 2
    }, 400, Phaser.Easing.Back.Out, !0).onComplete.add(this.showScore, this)
};
WinPopup.prototype.showScore = function() {
    this.game.add.tween(this).to({
        tempScore: this.score
    }, 2E3, Phaser.Easing.Exponential.InOut, !0).onUpdateCallback(this.updateText, this).onComplete.add(this.onTweenScoreComplete, this)
};
WinPopup.prototype.updateText = function() {
    this.scoreText.setText("Score: " + Math.round(this.tempScore))
};
WinPopup.prototype.onTweenScoreComplete = function() {
    for (var a = this.game.add.group(0, 0), b = 0; b < this.stars; b++) {
        var c = this.create(0, 0, "GameScreenAssets1");
        c.animations.add("animation", Phaser.Animation.generateFrameNames("IceBonusItem", 1, 15, "", 4));
        c.animations.play("animation", 18, !0);
        c.x = 90 * b;
        c.y = 60;
        c.alpha = 0;
        a.addChild(c);
        this.game.add.tween(c).to({
            alpha: 1,
            y: 0
        }, 500, Phaser.Easing.Exponential.InOut, !0, 200 * b).onStart.add(this.playBellSound, this)
    }
    a.x = (this.background.width - 90 * this.stars) / 2 + 10;
    a.y = 185;
    this.container.addChild(a)
};
WinPopup.prototype.playBellSound = function() {
    this.game.add.sound("bell").play()
};
GameScreen = function(a) {
    this.game = a
};
GameScreen.prototype = {
    create: function() {
        this.cellsContainer = new CellsContainer(this);
        this.cellsContainer.y = 115;
        this.cellsContainer.x = (this.game.width - COLUMNS * CELL_WIDTH) / 2;
        var a = this.game.add.sprite(0, 105, "GameScreenGuiAssets1");
        a.frameName = "BackgroundShadow";
        a.width = this.game.width;
        a.height = this.game.height - 60 - a.y;
        this.gui = new GameGUI(this.game);
        this.gui.pipeSelector.setPipes([BasePipe.TYPE_HORIZONTAL, BasePipe.TYPE_HORIZONTAL, BasePipe.TYPE_HORIZONTAL, BasePipe.TYPE_HORIZONTAL]);
        this.gui.pauseButton.onInputDown.add(this.pause,
            this);
        this.obstaclesContainer = new ObstaclesContainer(this);
        this.obstaclesContainer.x = this.cellsContainer.x;
        this.obstaclesContainer.y = this.cellsContainer.y;
        this.hotspotsContainer = new HotspotsContainer(this);
        this.hotspotsContainer.x = this.cellsContainer.x;
        this.hotspotsContainer.y = this.cellsContainer.y;
        this.bonusesContainer = new BonusItemsContainer(this);
        this.bonusesContainer.x = this.cellsContainer.x;
        this.bonusesContainer.y = this.cellsContainer.y;
        this.pipesContainer = new PipesContainer(this);
        this.pipesContainer.x =
            this.cellsContainer.x;
        this.pipesContainer.y = this.cellsContainer.y;
        this.effectsContainer = this.game.add.group();
        this.effectsContainer.x = this.cellsContainer.x;
        this.effectsContainer.y = this.cellsContainer.y;
        this.pipeDragController = new PipeDragController(this);
        this.flowController = new FlowController(this);
        this.missionController = new MissionController(this);
        this.scoreController = new ScoreController(this);
        this.abilityButtonsController = new AbilityButtonsController(this);
        this.hotspotsController = new HotspotsController(this);
        this.scoreController.completeEvent.add(this.onScoreComplete, this);
        this.tutorial = new TutorialManager(this.game);
        this.game.stage.backgroundColor = 16764696;
        this.failPopup = new FailPopup(this.game);
        this.failPopup.kill();
        this.game.world.remove(this.failPopup);
        this.winPopup = new WinPopup(this.game);
        this.winPopup.kill();
        this.game.world.remove(this.winPopup);
        this.pausePopup = new PausePopup(this.game);
        this.pausePopup.kill();
        this.game.world.remove(this.pausePopup);
        new Logo(this.game, 80, this.game.height - 60, "logo_small");
        this.startControllers();
        if (2 < LEVEL_NUM && 0 !== LEVEL_NUM % 2) {
            var b = this;
            GameAPI.GameBreak.request(function() {
                b.game.sound.mute = !0
            }, function() {
                b.game.sound.mute = !soundEnabled
            })
        }
        this.startGame(LEVEL_NUM)
    },
    startControllers: function() {
        this.pipeDragController.start();
        this.flowController.start();
        this.missionController.start();
        this.scoreController.start();
        this.abilityButtonsController.start();
        this.hotspotsController.start()
    },
    stopControllers: function() {
        this.pipeDragController.stop();
        this.flowController.stop();
        this.missionController.stop();
        this.scoreController.stop();
        this.abilityButtonsController.stop();
        this.hotspotsController.stop()
    },
    startGame: function(a) {
        this.levelData = null;
        for (var b in LEVEL_DATA.data.levels)
            if (this.levelData = LEVEL_DATA.data.levels[b], this.levelData.id == a) break;
        if (null !== this.levelData) {
            this.gui.randomizeAbilityButton.setCount(parseInt(this.levelData.randomize));
            this.gui.removeAbilityButton.setCount(parseInt(this.levelData.remove));
            var c = LevelDataParser.getMissionTypes(this.levelData);
            this.missionController.setGoalBonuses(c);
            this.gui.missionContainer.showBonuses(c);
            0 == c.length && this.gui.missionBackground.kill();
            LevelDataParser.parsePipes(this.levelData.pipes, this.pipesContainer);
            LevelDataParser.parseBonuses(this.levelData.bonuses, this.bonusesContainer);
            LevelDataParser.parseObstacles(this.levelData.obstacles, this.obstaclesContainer);
            LevelDataParser.parseHotspots(this.levelData.hotspots, this.hotspotsContainer);
            c = [];
            for (b in this.levelData.userPipes)
                for (var d = parseInt(this.levelData.userPipes[b].count),
                    e = 0; e < d; e++) c.push(LevelDataParser.parsePipeType(b));
            this.gui.pipeSelector.setPipes(c);
            this.enableInput();
            this.tutorial.init(a)
        }
    },
    failGame: function() {
        this.stopControllers();
        this.disableInput();
        this.game.world.add(this.failPopup);
        this.failPopup.revive();
        this.failPopup.init();
        this.failPopup.backClickedEvent.add(this.back, this);
        this.failPopup.restartClickedEvent.add(this.restart, this);
        this.game.add.sound("level_fail").play()
    },
    winGame: function() {
        this.missionController.checkCompleteness() ? (this.stopControllers(),
            this.disableInput(), this.scoreController.calculateScore()) : this.failGame()
    },
    onScoreComplete: function() {
        var a = this.getStarsCount();
        setLevelScore(LEVEL_NUM, a);
        console.log(LEVEL_NUM);
        updateShareScore(LEVEL_NUM+1);
        this.game.world.add(this.winPopup);
        this.winPopup.init(this.scoreController.score, a);
        this.winPopup.revive();
        this.winPopup.backClickedEvent.add(this.back, this);
        this.winPopup.restartClickedEvent.add(this.restart, this);
        this.winPopup.nextClickedEvent.add(this.next, this);
        this.game.add.sound("level_win").play()
    },
    getStarsCount: function() {
        for (var a = this.levelData.scores.replace(/\s+/g,
            "").split(","), b = this.scoreController.score, c = 0, d = 0; d < a.length; d++) b >= a[d] && c++;
        return c
    },
    disableInput: function() {
        this.gui.pipeSelector.stop();
        this.pipeDragController.stop()
    },
    enableInput: function() {
        this.gui.pipeSelector.start();
        this.pipeDragController.start()
    },
    updatePipesText: function() {
        this.gui.pipesCountText.setText(this.gui.pipeSelector.getRestPipesCount() + "/" + this.gui.pipeSelector.getTotalPipesCount())
    },
    cellToScreenCoordinates: function(a, b, c) {
        return c ? {
            x: this.cellsContainer.x + a * CELL_WIDTH,
            y: this.cellsContainer.y +
                b * CELL_HEIGHT
        } : {
            x: a * CELL_WIDTH,
            y: b * CELL_HEIGHT
        }
    },
    screenToCellCoordinates: function(a, b, c) {
        a = Math.floor((a - (c ? this.cellsContainer.x : 0)) / CELL_WIDTH);
        if (0 > a || a >= COLUMNS) a = -1;
        b = Math.floor((b - (c ? this.cellsContainer.y : 0)) / CELL_HEIGHT);
        if (0 > b || b >= ROWS) b = -1;
        return {
            x: Math.round(a),
            y: Math.round(b)
        }
    },
    update: function() {
        this.pipeDragController.update();
        this.flowController.update()
    },
    pause: function() {
        this.disableInput();
        this.game.world.add(this.pausePopup);
        this.pausePopup.init();
        this.pausePopup.revive();
        this.pausePopup.continueClickedEvent.add(this.unpause,
            this);
        this.pausePopup.backClickedEvent.add(this.back, this);
        this.pausePopup.restartClickedEvent.add(this.restart, this)
    },
    unpause: function() {
        this.enableInput();
        this.pausePopup.kill();
        this.game.world.remove(this.pausePopup);
        this.pausePopup.kill();
        this.pausePopup.continueClickedEvent.remove(this.unpause, this);
        this.pausePopup.backClickedEvent.remove(this.back, this);
        this.pausePopup.restartClickedEvent.remove(this.restart, this)
    },
    back: function() {
        this.game.state.start("levelsScreen", !0)
    },
    restart: function() {
        this.game.state.start("gameScreen", !0)
    },
    next: function() {
        LEVEL_NUM++;
        this.game.state.start("gameScreen", !0)
    }
};
LevelsScreen = function(a) {
    this.game = a
};
LevelsScreen.prototype = {
    create: function() {
        var a = this.game.width,
            b = this.game.height,
            c = this.game.add.sprite(0, 0, "LevelScreenAssets");
        c.frameName = "Background0000";
        c.width = a;
        c.height = b;
        c = this.game.add.sprite(a / 2, b / 2 + 50, "LevelScreenAssets");
        c.frameName = "Pinboard0000";
        c.anchor.setTo(0.5, 0.5);
        c = this.game.add.sprite(a / 2, 70, "LevelScreenAssets");
        c.frameName = "Title0000";
        c.anchor.setTo(0.5, 0.5);
        this.game.add.button(a / 2, b - 50, "LevelScreenAssets", this.back, this, "BackButton0001", "BackButton0000", "BackButton0001").anchor.setTo(0.5,
            0.5);
        a = new SoundButton(this.game, this.game.width - 100, 30);
        this.game.add.existing(a);
        new Logo(this.game, 10, this.game.height - 60, "logo_small");
        this.createLevelButtons()
    },
    createLevelButtons: function() {
        for (var a = (this.game.width - 700) / 2, b = 190, c = 0; 20 > c; c++)
            if (7 == c ? b += 120 : 14 == c && (a += 50, b += 120), 0 == c || void 0 != getLevelScore(c - 1)) {
                var d = new LevelButton(this.game, c, getLevelScore(c));
                d.x = a + c % 7 * 100;
                d.y = b + -20 * Math.random();
                d.rotation = 0.3 * Math.random() - 0.15
            }
    },
    back: function() {
        this.game.state.start("startScreen", !0)
    },
    startGame: function() {
        this.game.state.start("gameScreen", !0)
    }
};
LevelButton = function(a, b, c) {
    this.game = a;
    this.number = b;
    Phaser.Group.call(this, a);
    this.back = this.create(0, 0, "LevelScreenAssets");
    this.back.frameName = "LevelButton00" + (9 < this.number ? this.number : "0" + this.number);
    this.back.inputEnabled = !0;
    this.back.input.useHandCursor = !0;
    this.back.events.onInputDown.add(this.onClick, this);
    this.back.scale.setTo(0.8, 0.8);
    this.starsContainer = this.game.add.group();
    for (a = 0; a < c; a++) b = this.create(20 * a, this.back.height - 25, "LevelScreenAssets"), b.frameName = "LevelStar", this.starsContainer.addChild(b),
        this.starsContainer.x = (this.back.width - b.x - b.width) / 2 + 2;
    this.addChild(this.starsContainer)
};
LevelButton.prototype = Object.create(Phaser.Group.prototype);
LevelButton.prototype.constructor = LevelButton;
LevelButton.prototype.onClick = function() {
    canPlaySound && buttonSound.play();
    LEVEL_NUM = this.number;
    this.game.state.start("gameScreen", !0)
};
var CELL_WIDTH = 80,
    CELL_HEIGHT = 65,
    ROWS = 7,
    COLUMNS = 11,
    LEVEL_NUM = 0,
    LEVEL_DATA = {},
    SCALE = CELL_WIDTH / 123,
    soundEnabled = getSoundEnabled();

function getSoundEnabled() {
    return "0" !== getCookie("sound")
}

function setSoundEnabled(a) {
    var b = new Date;
    b.setFullYear(b.getFullYear() + 1);
    setCookie("sound", a ? "1" : "0", {
        expires: b
    })
}

function getLevelScore(a) {
    return getCookie("level" + a)
}

function setLevelScore(a, b) {
    var c = new Date;
    c.setFullYear(c.getFullYear() + 1);
    var d = getLevelScore(a);
    (!d || d < b) && setCookie("level" + a, b, {
        expires: c
    })
}
Preloader = function(a) {
    this.game = a
};
Preloader.prototype = {
    preload: function() {
        var a = this.game.width,
            b = this.game.height;
        this.game.add.tileSprite(0, 0, 896, 640, "PreloaderBackTile");
        var c = this.game.add.sprite(a / 2, 150, "PreloaderScreenAssets");
        c.frameName = "PreloaderHeader";
        c.anchor.setTo(0.5, 0.5);
        new Logo(this.game, 50, 50, "logo_small");
        c = this.game.add.graphics(a / 2, 420);
        c.beginFill(6514261);
        c.drawRect(-80, -80, 160, 160);
        this.animationGraphics = this.game.add.graphics(a / 2, 420);
        this.preloaderAnimationSprite = this.game.add.sprite(a / 2, 400, "PreloaderScreenAssets");
        this.preloaderAnimationSprite.frameName = "PreloaderAnimation";
        this.preloaderAnimationSprite.anchor.setTo(0.5, 0.5);
        this.text = this.game.add.bitmapText(a / 2 - 30, b / 2 + 250, "font", "", 40);
        if (game.device.desktop || game.device.iOS)
            for (var d in soundDatas) 0 < soundDatas[d].urls.length && this.game.load.audio(d, soundDatas[d].urls, !0);
        else this.game.load.audio("music", soundDatas.music.urls, !0);
        this.game.load.text("levelData", "data/levels.json");
        this.game.load.atlas("StartScreenAssets", "assets/static/StartScreenAssets.png",
            "assets/static/StartScreenAssets.json");
        this.game.load.atlas("LevelScreenAssets", "assets/static/LevelScreenAssets.png", "assets/static/LevelScreenAssets.json");
        this.game.load.atlas("GameScreenAssets1", "assets/static/game_screen_assets1.png", "assets/static/game_screen_assets1.json");
        this.game.load.atlas("GameScreenAssets2", "assets/static/game_screen_assets2.png", "assets/static/game_screen_assets2.json");
        this.game.load.atlas("GameScreenGuiAssets1", "assets/static/game_screen_gui_assets1.png", "assets/static/game_screen_gui_assets1.json");
        this.game.load.atlas("GameScreenGuiAssets2", "assets/static/game_screen_gui_assets2.png", "assets/static/game_screen_gui_assets2.json");
        this.game.load.image("CellsTile", "assets/tiles/CellsTile.png");
        this.game.load.image("FlowersTile", "assets/tiles/FlowersTile.png");
        this.game.load.bitmapFont("score_font_green", "assets/fonts/score_font_green.png", "assets/fonts/score_font_green.fnt");
        this.game.load.bitmapFont("score_font_white", "assets/fonts/score_font_white.png", "assets/fonts/score_font_white.fnt");
        this.game.load.bitmapFont("tutorial_font",
            "assets/fonts/tutorial_font.png", "assets/fonts/tutorial_font.fnt");
        this.game.load.onFileComplete.add(this.progress, this);
        this.progress(0);
        this.gameLoaded = !1
    },
    progress: function(a) {
        this.animationGraphics.clear();
        this.animationGraphics.beginFill(16763904);
        this.animationGraphics.drawRect(-80, 85, 160, -140 * a / 100);
        this.text.setText(a + "%");
        this.text.x = (this.game.width - this.text.textWidth) / 2
    },
    update: function() {
        this.cache.isSoundDecoded("music") && !this.soundDecoded && (this.soundDecoded = !0, this.gameLoaded && this.createButton())
    },
    create: function() {
        LEVEL_DATA = JSON.parse(this.game.cache.getText("levelData"));
        this.gameLoaded = !0;
        this.soundDecoded && this.createButton()
    },
    createButton: function() {
        var a = this.game.add.sprite(this.game.width / 2, this.game.height - 60, "GameScreenGuiAssets1");
        a.frameName = "TapToContinue";
        a.anchor.setTo(0.5, 0.5);
        this.game.input.onDown.add(this.start, this)
    },
    start: function() {
        buttonSound = this.game.add.sound("button_click");
        music = this.game.add.audio("music");
        music.play("", 0, 1, !0, !0);
        music.stop();
        getSoundEnabled() ||
            (this.game.sound.mute = !0);
        GameAPI.Branding.getSplashScreen().show ? GameAPI.Branding.displaySplashScreen(this.continueGame) : this.game.state.start("startScreen", !0)
    },
    continueGame: function() {
        this.game.state.start("startScreen", !0)
    }
};
SplashScreen = function(a) {
    this.game = a
};
SplashScreen.prototype = {
    create: function() {
        var a = this.game.width,
            b = this.game.height,
            c = this.game.add.graphics(0, 0);
        c.beginFill(16777215);
        c.drawRect(0, 0, a, b);
        c = new Logo(this.game, 0, 0, "logo_large");
        c.x = 0.5 * (a - c.width);
        c.y = 0.5 * (b - c.height);
        var d = this;
        setTimeout(function() {
            d.start(d.game)
        }, 3E3)
    },
    start: function(a) {
        a.state.start("startScreen", !0)
    }
};
StartScreen = function(a) {
    this.game = a
};
StartScreen.prototype = {
    create: function() {
        var a = this.game.width,
            b = this.game.height,
            c = this.game.add.sprite(0, 0, "StartScreenAssets");
        c.frameName = "Background";
        c.width = a;
        c.height = b;
        this.game.add.sprite(40, 70, "StartScreenAssets").frameName = "Logo";
        c = new SoundButton(this.game, this.game.width - 100, 30);
        this.game.add.existing(c);
        this.game.add.button(100, b - 260, "StartScreenAssets", this.startGame, this, "PlayButton0001", "PlayButton0000", "PlayButton0001");
        this.game.add.button(c.x - 130, 30, "StartScreenAssets", this.credits,
            this, "CreditsButton0001", "CreditsButton0000", "CreditsButton0001");
        new Logo(this.game, 10, this.game.height - 60, "logo_small");
        new MoreGamesButton(this.game, a - 180, b - 70);
        music.isPlaying || (this.game.sound.mute = !1, music.play("", 0, 1, !0, !0), this.game.sound.mute = !soundEnabled)
    },
    credits: function() {
        this.game.state.start("creditsScreen", !0)
    },
    startGame: function() {
        this.game.state.start("levelsScreen", !0)
    }
};
var fullscreen = !1,
    lastHeight = 0;
window.onload = function() {
    window.onscroll = function(a) {
        setTimeout(function() {
            window.scrollTo(0, 0)
        }, 0)
    };
    window.addEventListener("resize", resizeGame, !1);
    window.addEventListener("orientationchange", orientationChanged, !1);
    window.ontouchmove = function(a) {
        fullscreen ? (document.body.style.height = lastHeight + "px", setTimeout(function() {
            window.scrollTo(0, 0)
        }, 0), preventDefault(a)) : lastHeight <= window.outerHeight && (lastHeight = window.outerHeight, fullscreen = !0)
    };
    this.game = new Phaser.Game(896, 640, Phaser.CANVAS, null, null);
    language = "en";
    Boot = function(a) {
        this.game = a
    };
    Boot.prototype = {
        preload: function() {
            this.game.load.atlas("PreloaderScreenAssets", "assets/static/PreloaderScreenAssets.png", "assets/static/PreloaderScreenAssets.json");
            this.game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
            this.game.load.image("logo_large", "assets/branding/logo_large.png");
            this.game.load.image("logo_small", GameAPI.Branding.getLogo().image);
            this.game.load.image("PreloaderBackTile", "assets/tiles/PreloaderBackTile.png");
            this.game.input.maxPointers = 1;
            this.game.device.desktop && (this.game.scale.maxWidth = 896, this.game.scale.maxHeight = 640);
            canPlaySound = game.device.desktop || game.device.iOS;
            orientationChanged()
        },
        create: function() {
            this.game.state.start("preloader")
        }
    };
    GameAPI.loadAPI(function(a) {
        this.game.state.add("preloader", Preloader);
        this.game.state.add("splashScreen", SplashScreen);
        this.game.state.add("startScreen", StartScreen);
        this.game.state.add("levelsScreen", LevelsScreen);
        this.game.state.add("gameScreen", GameScreen);
        this.game.state.add("creditsScreen", CreditsScreen);
        this.game.state.add("boot", Boot, !0)
    }, {
        id: "576742227280292408"
    })
};

function preventDefault(a) {
    a = a || window.event;
    a.preventDefault && a.preventDefault();
    a.returnValue = !1
}

function resizeGame() {
    this.game.stage && (fullscreen = !1, lastHeight = window.outerHeight, setTimeout(fitToScreen, 100))
}

function orientationChanged() {
    resizeGame()
}

function fitToScreen() {
    setTimeout(function() {
        window.scrollTo(0, 0)
    }, 0);
    this.game.scale.setShowAll();
    this.game.scale.disableVisibilityChange = !0;
    this.game.scale.pageAlignHorizontally = !0;
    this.game.scale.pageAlignVertically = !0;
    this.game.scale.refresh()
};