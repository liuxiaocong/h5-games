/**
 * Created by long on 14-4-8.
 */
    var pppp = 0;
    var firstIn = 0;
var skillGuide = 0;
    var testHelpCount = 0;
var level = 1;
var pr1 = 1.6;
var pr2 = 1.1;
var er1 = 2.1;
var er2 = 1.6;
var bugArray = [];
//测试用
var leveled = 1;
//var leveled = 1;
var maxLevel = 20;

var gamePaused = false;
var gameOver = false;

var defaultTowerTexture = {Tower: "Tower_blue.png", YellowTower: "Tower_red.png", Turret: "Turret_mid.png"};

var bugInLevel = "Bug";
var beeInLevel = "Bee";
var attackInterval = 1.5;
var wj_walkArray = [];
var wj_attackArray = [];
var sbd_walkArray = [];
var sbd_attackArray = [];

var turretArrayBlue = [];
var turretArrayRed = [];
//for(var i=1;i<3;i++)
//{
//    var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame("wj_a_walk000"+i+".png");
//    this.animFrame.push(frame);
//}

//var fireCount = 0;
////测试用
//var maxFireCount = 10;
////var maxFireCount = 80;

var theGame = null;

var levels = [];
levels[0]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug",bee:"Bee",attackInterval:0.25},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:10,x:156,y:276,path:[2,7]},
//        {owner:"Player",id:1,type:"YellowTower",count:25,x:156,y:276,path:[2,7]},
        {owner:"Neutral",id:2,type:"Turret",count:10,x:270,y:364,path:[1,3,8]},
        {owner:"Neutral",id:3,type:"Tower",count:10,x:535,y:324,path:[2,4,5],texture:"neutral.png"},
        {owner:"Enemy",id:4,type:"Tower",count:2,x:643,y:265,path:[3,6]},
//        {owner:"Enemy",id:4,type:"Tower",count:25,x:643,y:265,path:[3,6]},
        {owner:"Neutral",id:5,type:"Tower",count:15,x:468,y:264,path:[3,6],texture:"neutral.png"},
        {owner:"Neutral",id:6,type:"Turret",count:3,x:596,y:183,path:[4,5,7]},
//        {owner:"Neutral",id:6,type:"Turret",count:9,x:596,y:183,path:[4,5,7]},
        {owner:"Player",id:7,type:"YellowTower",count:20,x:241,y:144,path:[1,6,8]},
//        {owner:"Player",id:7,type:"YellowTower",count:8,x:241,y:144,path:[1,6,8]},
        {owner:"Neutral",id:8,type:"Tower",count:10,x:312,y:273,path:[7,2],texture:"neutral.png"},
//        //测试用，需删除
//        {owner:"Player",id:1,type:"YellowTower",count:25,x:156,y:276,path:[2,7]},
//        {owner:"Player",id:2,type:"Turret",count:10,x:270,y:364,path:[1,3,8]},
//        {owner:"Player",id:3,type:"Tower",count:10,x:535,y:324,path:[2,4,5],texture:"neutral.png"},
//        {owner:"Player",id:4,type:"Tower",count:5,x:643,y:265,path:[3,6]},
//        {owner:"Player",id:5,type:"Tower",count:15,x:468,y:264,path:[3,6],texture:"neutral.png"},
//        {owner:"Player",id:6,type:"Turret",count:9,x:596,y:183,path:[4,5,7]},
//        {owner:"Player",id:7,type:"Tower",count:8,x:241,y:144,path:[1,6,8],texture:"neutral.png"},
//        {owner:"Enemy",id:8,type:"Tower",count:1,x:312,y:273,path:[7,2],texture:"neutral.png"},
    ]
};
levels[1]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug",bee:"Bee",attackInterval:0.25},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:10,x:161,y:342,path:[2,7,8]},
        {owner:"Neutral",id:2,type:"Turret",count:2,x:297,y:389,path:[1,3,7]},
        {owner:"Neutral",id:3,type:"Tower",count:3,x:494,y:389,path:[2,4,6],texture:"neutral.png"},
        {owner:"Enemy",id:4,type:"Tower",count:4,x:624,y:343,path:[3,5,6]},
        {owner:"Neutral",id:5,type:"Tower",count:5,x:601,y:126,path:[4,6],texture:"neutral.png"},
        {owner:"Neutral",id:6,type:"Turret",count:6,x:482,y:172,path:[4,3,5,7]},
        {owner:"Neutral",id:7,type:"Tower",count:7,x:308,y:170,path:[1,2,6,8],texture:"neutral.png"},
        {owner:"Neutral",id:8,type:"Tower",count:8,x:187,y:124,path:[1,7],texture:"neutral.png"},
    ]
};
levels[2]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug",bee:"Bee",attackInterval:0.25},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:15,x:196,y:345,path:[2,9]},
        {owner:"Neutral",id:2,type:"Tower",count:10,x:314,y:406,path:[1,3,7],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Turret",count:9,x:493,y:406,path:[2,4,7]},
        {owner:"Neutral",id:4,type:"Tower",count:12,x:606,y:345,path:[3,5],texture:"neutral.png"},
        {owner:"Enemy",id:5,type:"Tower",count:12,x:642,y:135,path:[4,6]},
        {owner:"Neutral",id:6,type:"Tower",count:11,x:498,y:173,path:[5,7],texture:"neutral.png"},
        {owner:"Neutral",id:7,type:"Tower",count:13,x:403,y:281,path:[2,3,6,8],texture:"neutral.png"},
        {owner:"Neutral",id:8,type:"Turret",count:20,x:314,y:173,path:[7,9]},
        {owner:"Neutral",id:9,type:"Tower",count:11,x:158,y:136,path:[8,1],texture:"neutral.png"},
    ]
};
levels[3]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug",bee:"Bee",attackInterval:0.25},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:15,x:151,y:283,path:[2,9]},
        {owner:"Neutral",id:2,type:"Tower",count:10,x:262,y:378,path:[1,3],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Turret",count:9,x:307,y:281,path:[2,5,9]},
        {owner:"Neutral",id:4,type:"Tower",count:12,x:547,y:380,path:[5,6],texture:"neutral.png"},
        {owner:"Neutral",id:5,type:"Turret",count:12,x:506,y:283,path:[3,4,7]},
        {owner:"Enemy",id:6,type:"Tower",count:11,x:660,y:281,path:[4,7]},
        {owner:"Neutral",id:7,type:"Tower",count:13,x:577,y:154,path:[5,6,8],texture:"neutral.png"},
        {owner:"Neutral",id:8,type:"Turret",count:20,x:406,y:130,path:[7,9]},
        {owner:"Neutral",id:9,type:"Tower",count:11,x:236,y:154,path:[8,3,1],texture:"neutral.png"},
    ]
};

levels[4]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug02",bee:"Bee02",attackInterval:0.25},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:20,x:149,y:289,path:[2,9]},
        {owner:"Neutral",id:2,type:"Tower",count:10,x:283,y:273,path:[1,3,8],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Turret",count:9,x:336,y:400,path:[2,4]},
        {owner:"Neutral",id:4,type:"Turret",count:12,x:469,y:402,path:[3,5]},
        {owner:"Neutral",id:5,type:"Tower",count:32,x:523,y:273,path:[4,8,6],texture:"neutral.png"},
        {owner:"Enemy",id:6,type:"Tower",count:11,x:666,y:290,path:[5,7]},
        {owner:"Neutral",id:7,type:"Tower",count:13,x:575,y:158,path:[6,8],texture:"neutral.png"},
        {owner:"Neutral",id:8,type:"Turret",count:25,x:401,y:162,path:[5,7,9,2]},
        {owner:"Neutral",id:9,type:"Tower",count:40,x:229,y:161,path:[1,8],texture:"neutral.png"},
    ]
};

levels[5]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug02",bee:"Bee02",attackInterval:0.25},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:25,x:127,y:284,path:[2,9,8]},
        {owner:"Neutral",id:2,type:"Tower",count:10,x:262,y:404,path:[1,3,9],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Tower",count:9,x:392,y:424,path:[2,4],texture:"neutral.png"},
        {owner:"Neutral",id:4,type:"Turret",count:12,x:521,y:401,path:[3,9,5]},
        {owner:"Enemy",id:5,type:"Tower",count:32,x:659,y:286,path:[4,9,6]},
        {owner:"Neutral",id:6,type:"Tower",count:11,x:561,y:143,path:[5,9,7],texture:"neutral.png"},
        {owner:"Neutral",id:7,type:"Tower",count:13,x:393,y:117,path:[6,8],texture:"neutral.png"},
        {owner:"Neutral",id:8,type:"Turret",count:25,x:226,y:146,path:[7,9,1]},
        {owner:"Neutral",id:9,type:"Tower",count:40,x:395,y:289,path:[1,2,4,5,6,8],texture:"neutral.png"},
    ]
};

levels[6]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug02",bee:"Bee02",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:25,x:140,y:250,path:[2,9]},
        {owner:"Neutral",id:2,type:"Tower",count:10,x:249,y:339,path:[1,3,9],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Turret",count:30,x:410,y:418,path:[2,4]},
        {owner:"Neutral",id:4,type:"Tower",count:12,x:568,y:340,path:[3,5,6],texture:"neutral.png"},
        {owner:"Enemy",id:5,type:"Tower",count:32,x:683,y:248,path:[4,6]},
        {owner:"Neutral",id:6,type:"Turret",count:15,x:479,y:248,path:[4,5,7,9]},
        {owner:"Neutral",id:7,type:"Tower",count:10,x:551,y:157,path:[6,8],texture:"neutral.png"},
        {owner:"Neutral",id:8,type:"Tower",count:15,x:268,y:157,path:[7,9],texture:"neutral.png"},
        {owner:"Neutral",id:9,type:"Turret",count:11,x:340,y:248,path:[1,2,6,8]},
    ]
};
levels[7]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug02",bee:"Bee02",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:20,x:133,y:274,path:[2,3,8]},
        {owner:"Neutral",id:2,type:"Tower",count:15,x:252,y:403,path:[1,3],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Tower",count:20,x:300,y:312,path:[1,2,4,9],texture:"neutral.png"},
        {owner:"Neutral",id:4,type:"Turret",count:20,x:396,y:423,path:[3,5]},
        {owner:"Neutral",id:5,type:"Tower",count:20,x:493,y:311,path:[4,6,7,9],texture:"neutral.png"},
        {owner:"Enemy",id:6,type:"Tower",count:25,x:538,y:406,path:[5,7]},
        {owner:"Enemy",id:7,type:"Tower",count:25,x:662,y:276,path:[5,6,8]},
        {owner:"Neutral",id:8,type:"Turret",count:20,x:395,y:109,path:[7,1]},
        {owner:"Neutral",id:9,type:"Tower",count:20,x:394,y:205,path:[3,5],texture:"neutral.png"},
    ]
};

levels[8]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug03",bee:"Bee03",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:25,x:140,y:260,path:[2,8,10]},
        {owner:"Neutral",id:2,type:"Tower",count:20,x:273,y:360,path:[1,3],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Tower",count:15,x:523,y:364,path:[2,4],texture:"neutral.png"},
        {owner:"Enemy",id:4,type:"Tower",count:20,x:656,y:260,path:[3,5,6]},
        {owner:"Neutral",id:5,type:"Tower",count:15,x:505,y:248,path:[4,7],texture:"neutral.png"},
        {owner:"Enemy",id:6,type:"Tower",count:20,x:593,y:147,path:[4,7]},
        {owner:"Neutral",id:7,type:"Turret",count:18,x:457,y:149,path:[5,6,9]},
        {owner:"Neutral",id:8,type:"Tower",count:20,x:292,y:247,path:[9,1],texture:"neutral.png"},
        {owner:"Neutral",id:9,type:"Turret",count:10,x:341,y:149,path:[7,8,10]},
        {owner:"Neutral",id:10,type:"Tower",count:10,x:208,y:147,path:[9,1],texture:"neutral.png"},
    ]
};
levels[9]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug03",bee:"Bee03",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:25,x:117,y:236,path:[2,9,7,8]},
        {owner:"Neutral",id:2,type:"Tower",count:15,x:211,y:374,path:[1,3],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Tower",count:15,x:390,y:414,path:[2,9,10,4],texture:"neutral.png"},
        {owner:"Enemy",id:4,type:"Tower",count:25,x:570,y:374,path:[3,5]},
        {owner:"Enemy",id:5,type:"Tower",count:25,x:656,y:236,path:[4,10,7,6]},
        {owner:"Enemy",id:6,type:"Tower",count:25,x:537,y:111,path:[5,7]},
        {owner:"Neutral",id:7,type:"Turret",count:28,x:388,y:228,path:[5,6,8,1]},
        {owner:"Neutral",id:8,type:"Tower",count:25,x:245,y:110,path:[7,1],texture:"neutral.png"},
        {owner:"Neutral",id:9,type:"Turret",count:25,x:277,y:323,path:[1,3,10]},
        {owner:"Neutral",id:10,type:"Turret",count:25,x:498,y:322,path:[9,3,5]},
    ]
};
levels[10]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug03",bee:"Bee03",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:25,x:113,y:288,path:[2,8,9]},
        {owner:"Neutral",id:2,type:"Tower",count:15,x:240,y:357,path:[1,3],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Tower",count:30,x:394,y:420,path:[2,4,10],texture:"neutral.png"},
        {owner:"Enemy",id:4,type:"Tower",count:30,x:546,y:358,path:[3,5]},
        {owner:"Enemy",id:5,type:"Tower",count:35,x:673,y:288,path:[4,6,11]},
        {owner:"Neutral",id:6,type:"Tower",count:18,x:550,y:142,path:[5,7],texture:"neutral.png"},
        {owner:"Neutral",id:7,type:"Tower",count:25,x:393,y:153,path:[6,8],texture:"neutral.png"},
        {owner:"Neutral",id:8,type:"Tower",count:23,x:234,y:142,path:[1,7],texture:"neutral.png"},
        {owner:"Neutral",id:9,type:"Turret",count:27,x:291,y:255,path:[1,10,11]},
        {owner:"Neutral",id:10,type:"Turret",count:33,x:393,y:319,path:[3,9,11]},
        {owner:"Neutral",id:11,type:"Turret",count:40,x:491,y:250,path:[10,9,5]},
    ]
};
levels[11]={
    param:{playerRate:pr1,enemyRate:er1,neutralRate:4,bug:"Bug03",bee:"Bee03",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:30,x:99,y:231,path:[2,4]},
        {owner:"Neutral",id:2,type:"Tower",count:20,x:224,y:379,path:[1,3,4],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Tower",count:20,x:329,y:314,path:[2,4],texture:"neutral.png"},
        {owner:"Neutral",id:4,type:"Turret",count:20,x:267,y:230,path:[1,2,3,5,10,11]},
        {owner:"Neutral",id:5,type:"Turret",count:20,x:509,y:232,path:[4,6,7,8,9,10]},
        {owner:"Enemy",id:6,type:"Tower",count:60,x:440,y:314,path:[5,7]},
        {owner:"Neutral",id:7,type:"Tower",count:20,x:544,y:382,path:[5,6,8],texture:"neutral.png"},
        {owner:"Enemy",id:8,type:"Tower",count:60,x:679,y:231,path:[5,7]},
        {owner:"Neutral",id:9,type:"Tower",count:20,x:591,y:111,path:[5,10],texture:"neutral.png"},
        {owner:"Neutral",id:10,type:"Turret",count:20,x:387,y:144,path:[4,5,9,11]},
        {owner:"Neutral",id:11,type:"Tower",count:20,x:185,y:114,path:[10,4],texture:"neutral.png"},
    ]
};
levels[12]={
    param:{playerRate:pr2,enemyRate:er1,neutralRate:4,bug:"Bug04",bee:"Bee04",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:30,x:89,y:232,path:[2,12]},
        {owner:"Neutral",id:2,type:"Tower",count:25,x:187,y:312,path:[1,3],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Turret",count:20,x:309,y:389,path:[2,4,5,11]},
        {owner:"Neutral",id:4,type:"Tower",count:20,x:399,y:308,path:[3,5],texture:"neutral.png"},
        {owner:"Neutral",id:5,type:"Turret",count:20,x:490,y:389,path:[4,6,3,9]},
        {owner:"Enemy",id:6,type:"Tower",count:40,x:609,y:311,path:[5,7]},
        {owner:"Neutral",id:7,type:"Tower",count:20,x:708,y:232,path:[6,8],texture:"neutral.png"},
        {owner:"Enemy",id:8,type:"Tower",count:40,x:578,y:144,path:[7,9]},
        {owner:"Neutral",id:9,type:"Turret",count:20,x:505,y:230,path:[5,8,10]},
        {owner:"Neutral",id:10,type:"Tower",count:20,x:397,y:157,path:[9,11],texture:"neutral.png"},
        {owner:"Neutral",id:11,type:"Turret",count:20,x:292,y:232,path:[10,3,12]},
        {owner:"Neutral",id:12,type:"Tower",count:20,x:217,y:143,path:[11,1],texture:"neutral.png"},
    ]
};
levels[13]={
    param:{playerRate:pr2,enemyRate:er1,neutralRate:4,bug:"Bug04",bee:"Bee04",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:30,x:125,y:265,path:[2,11,12]},
        {owner:"Neutral",id:2,type:"Tower",count:25,x:295,y:410,path:[1,3],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Turret",count:15,x:343,y:325,path:[2,5,12]},
        {owner:"Neutral",id:4,type:"Tower",count:25,x:505,y:406,path:[5,7],texture:"neutral.png"},
        {owner:"Neutral",id:5,type:"Turret",count:25,x:459,y:327,path:[3,4,6]},
        {owner:"Enemy",id:6,type:"Tower",count:40,x:533,y:264,path:[5,7,9]},
        {owner:"Neutral",id:7,type:"Tower",count:25,x:670,y:263,path:[6,8,4],texture:"neutral.png"},
        {owner:"Enemy",id:8,type:"Tower",count:35,x:501,y:129,path:[7,9]},
        {owner:"Neutral",id:9,type:"Turret",count:25,x:460,y:203,path:[6,8,10]},
        {owner:"Neutral",id:10,type:"Turret",count:30,x:342,y:204,path:[9,11,12]},
        {owner:"Neutral",id:11,type:"Tower",count:20,x:294,y:128,path:[10,1],texture:"neutral.png"},
        {owner:"Neutral",id:12,type:"Tower",count:30,x:261,y:266,path:[10,1,3],texture:"neutral.png"},
    ]
};

levels[14]={
    param:{playerRate:pr2,enemyRate:er1,neutralRate:4,bug:"Bug04",bee:"Bee04",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:30,x:181,y:349,path:[2,11,12]},
        {owner:"Neutral",id:2,type:"Turret",count:25,x:320,y:348,path:[1,3]},
        {owner:"Neutral",id:3,type:"Tower",count:20,x:399,y:291,path:[2,4],texture:"neutral.png"},
        {owner:"Neutral",id:4,type:"Turret",count:25,x:477,y:348,path:[3,5]},
        {owner:"Enemy",id:5,type:"Tower",count:40,x:616,y:353,path:[4,6,7]},
        {owner:"Enemy",id:6,type:"Tower",count:30,x:539,y:249,path:[5,7]},
        {owner:"Enemy",id:7,type:"Tower",count:30,x:682,y:120,path:[6,8,5]},
        {owner:"Neutral",id:8,type:"Turret",count:25,x:500,y:118,path:[7,9]},
        {owner:"Neutral",id:9,type:"Tower",count:20,x:397,y:183,path:[8,10],texture:"neutral.png"},
        {owner:"Neutral",id:10,type:"Turret",count:20,x:296,y:120,path:[9,11]},
        {owner:"Neutral",id:11,type:"Tower",count:15,x:116,y:116,path:[1,10,12],texture:"neutral.png"},
        {owner:"Neutral",id:12,type:"Tower",count:30,x:259,y:249,path:[1,11],texture:"neutral.png"},
    ]
};
levels[15]={
    param:{playerRate:pr2,enemyRate:er1,neutralRate:4,bug:"Bug04",bee:"Bee04",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:50,x:149,y:319,path:[2,6]},
        {owner:"Neutral",id:2,type:"Tower",count:35,x:252,y:394,path:[1,3,6],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Tower",count:35,x:541,y:396,path:[2,4,5],texture:"neutral.png"},
        {owner:"Enemy",id:4,type:"Tower",count:35,x:645,y:315,path:[3,5]},
        {owner:"Neutral",id:5,type:"Turret",count:30,x:507,y:310,path:[3,4,6,8]},
        {owner:"Neutral",id:6,type:"Turret",count:20,x:282,y:313,path:[1,5,2,7]},
        {owner:"Neutral",id:7,type:"Turret",count:30,x:279,y:220,path:[6,8,11,12]},
        {owner:"Neutral",id:8,type:"Turret",count:30,x:515,y:218,path:[7,9,5,10]},
        {owner:"Enemy",id:9,type:"Tower",count:55,x:649,y:163,path:[8,10]},
        {owner:"Neutral",id:10,type:"Tower",count:35,x:523,y:112,path:[9,11,8],texture:"neutral.png"},
        {owner:"Neutral",id:11,type:"Tower",count:38,x:274,y:110,path:[7,10,12],texture:"neutral.png"},
        {owner:"Enemy",id:12,type:"Tower",count:40,x:141,y:160,path:[7,11]},
    ]
};
levels[16]={
    param:{playerRate:pr2,enemyRate:er1,neutralRate:4,bug:"Bug05",bee:"Bee05",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:40,x:124,y:227,path:[2,8,9]},
        {owner:"Neutral",id:2,type:"Tower",count:20,x:196,y:315,path:[1,3],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Turret",count:30,x:314,y:382,path:[2,4,8]},
        {owner:"Neutral",id:4,type:"Turret",count:30,x:481,y:383,path:[3,5,7]},
        {owner:"Enemy",id:5,type:"Tower",count:50,x:599,y:314,path:[6,4]},
        {owner:"Player",id:6,type:"YellowTower",count:60,x:670,y:225,path:[5,7,12]},
        {owner:"Enemy",id:7,type:"Tower",count:50,x:468,y:257,path:[6,4,11]},
        {owner:"Neutral",id:8,type:"Tower",count:30,x:325,y:256,path:[1,3,10],texture:"neutral.png"},
        {owner:"Neutral",id:9,type:"Tower",count:33,x:174,y:119,path:[1,10],texture:"neutral.png"},
        {owner:"Neutral",id:10,type:"Turret",count:35,x:303,y:164,path:[8,9,11]},
        {owner:"Neutral",id:11,type:"Turret",count:30,x:495,y:163,path:[7,10,12]},
        {owner:"Enemy",id:12,type:"Tower",count:30,x:618,y:119,path:[6,11]},
    ]
};
levels[17]={
    param:{playerRate:pr2,enemyRate:er1,neutralRate:4,bug:"Bug05",bee:"Bee05",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:45,x:108,y:254,path:[2,11]},
        {owner:"Neutral",id:2,type:"Tower",count:20,x:226,y:298,path:[1,3,7],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Tower",count:35,x:313,y:381,path:[2,4],texture:"neutral.png"},
        {owner:"Neutral",id:4,type:"Turret",count:15,x:498,y:385,path:[3,5]},
        {owner:"Neutral",id:5,type:"Tower",count:40,x:588,y:300,path:[4,6,9],texture:"neutral.png"},
        {owner:"Enemy",id:6,type:"Tower",count:50,x:703,y:253,path:[5,16]},
        {owner:"Neutral",id:7,type:"Turret",count:38,x:318,y:256,path:[2,8,10,12]},
        {owner:"Neutral",id:8,type:"Tower",count:25,x:402,y:315,path:[7,9],texture:"neutral.png"},
        {owner:"Neutral",id:9,type:"Turret",count:24,x:492,y:255,path:[5,8,10,15]},
        {owner:"Neutral",id:10,type:"Turret",count:33,x:406,y:202,path:[9,7]},
        {owner:"Neutral",id:11,type:"Tower",count:34,x:141,y:136,path:[1,12],texture:"neutral.png"},
        {owner:"Enemy",id:12,type:"Tower",count:65,x:242,y:187,path:[7,11,13]},
        {owner:"Neutral",id:13,type:"Turret",count:15,x:327,y:136,path:[12,14]},
        {owner:"Neutral",id:14,type:"Tower",count:28,x:493,y:137,path:[13,15],texture:"neutral.png"},
        {owner:"Enemy",id:15,type:"Tower",count:30,x:569,y:183,path:[9,14,16]},
        {owner:"Neutral",id:16,type:"Tower",count:18,x:674,y:139,path:[6,15],texture:"neutral.png"},
    ]
};
levels[18]={
    param:{playerRate:pr2,enemyRate:er1,neutralRate:4,bug:"Bug05",bee:"Bee05",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:80,x:299,y:408,path:[2,5,3]},
        {owner:"Neutral",id:2,type:"Tower",count:35,x:521,y:410,path:[1,5,7],texture:"neutral.png"},
        {owner:"Neutral",id:3,type:"Tower",count:30,x:146,y:299,path:[1,8,12],texture:"neutral.png"},
        {owner:"Neutral",id:4,type:"Tower",count:38,x:283,y:305,path:[8,9],texture:"neutral.png"},
        {owner:"Neutral",id:5,type:"Tower",count:25,x:409,y:304,path:[1,2,9,10],texture:"neutral.png"},
        {owner:"Neutral",id:6,type:"Tower",count:26,x:540,y:304,path:[10,11],texture:"neutral.png"},
        {owner:"Neutral",id:7,type:"Tower",count:39,x:674,y:299,path:[2,11,16],texture:"neutral.png"},
        {owner:"Neutral",id:8,type:"Turret",count:38,x:223,y:240,path:[3,4,12,13]},
        {owner:"Neutral",id:9,type:"Turret",count:29,x:348,y:238,path:[4,5,13,14]},
        {owner:"Neutral",id:10,type:"Turret",count:40,x:474,y:239,path:[5,6,14,15]},
        {owner:"Neutral",id:11,type:"Turret",count:41,x:599,y:240,path:[6,7,15,16]},
        {owner:"Enemy",id:12,type:"Tower",count:40,x:169,y:166,path:[3,8]},
        {owner:"Enemy",id:13,type:"Tower",count:30,x:283,y:165,path:[8,9]},
        {owner:"Enemy",id:14,type:"Tower",count:45,x:408,y:168,path:[9,10]},
        {owner:"Enemy",id:15,type:"Tower",count:30,x:533,y:168,path:[10,11]},
        {owner:"Enemy",id:16,type:"Tower",count:60,x:650,y:169,path:[7,11]},
    ]
};
levels[19]={
    param:{playerRate:pr2,enemyRate:er1,neutralRate:4,bug:"Bug05",bee:"Bee05",attackInterval:0.4},
    map:[
        {owner:"Player",id:1,type:"YellowTower",count:100,x:268,y:404,path:[4,5]},
        {owner:"Neutral",id:2,type:"Tower",count:75,x:399,y:435,path:[5,6],texture:"neutral.png"},
//        {owner:"Enemy",id:3,type:"Tower",count:250,x:529,y:403,path:[6,7]},
        {owner:"Enemy",id:3,type:"Tower",count:150,x:529,y:403,path:[6,7]},
        {owner:"Neutral",id:4,type:"Tower",count:100,x:175,y:323,path:[1,8,9],texture:"neutral.png"},
        {owner:"Neutral",id:5,type:"Turret",count:86,x:332,y:333,path:[1,2,6,9,10]},
        {owner:"Neutral",id:6,type:"Turret",count:13,x:468,y:332,path:[2,3,5,10,11]},
//        {owner:"Neutral",id:6,type:"Turret",count:93,x:468,y:332,path:[2,3,5,10,11]},
//        {owner:"Enemy",id:7,type:"Tower",count:280,x:619,y:321,path:[3,11,12]},
        {owner:"Enemy",id:7,type:"Tower",count:80,x:619,y:321,path:[3,11,12]},
        {owner:"Neutral",id:8,type:"Tower",count:58,x:109,y:257,path:[4,13],texture:"neutral.png"},
        {owner:"Neutral",id:9,type:"Turret",count:99,x:245,y:266,path:[4,5,10,13]},
        {owner:"Neutral",id:10,type:"Tower",count:60,x:399,y:218,path:[5,6,9,11,14,15],texture:"neutral.png"},
//        {owner:"Neutral",id:11,type:"Turret",count:18,x:555,y:270,path:[6,7,10,16]},
        {owner:"Neutral",id:11,type:"Turret",count:78,x:555,y:270,path:[6,7,10,16]},
//        {owner:"Enemy",id:12,type:"Tower",count:265,x:690,y:264,path:[7,16]},
        {owner:"Enemy",id:12,type:"Tower",count:65,x:690,y:264,path:[7,16]},
        {owner:"Neutral",id:13,type:"Turret",count:93,x:188,y:176,path:[8,9,14]},
        {owner:"Neutral",id:14,type:"Tower",count:58,x:303,y:115,path:[10,13],texture:"neutral.png"},
        {owner:"Neutral",id:15,type:"Tower",count:88,x:494,y:116,path:[10,16],texture:"neutral.png"},
        {owner:"Neutral",id:16,type:"Turret",count:15,x:608,y:175,path:[11,12,15]},
//        {owner:"Neutral",id:16,type:"Turret",count:105,x:608,y:175,path:[11,12,15]},
    ]
    //    //测试敌方出兵移动效率
//    map:[
//        {owner:"Player",id:1,type:"YellowTower",count:10,x:268,y:404,path:[4,5]},
//        {owner:"Enemy",id:2,type:"Tower",count:75,x:399,y:435,path:[5,6],texture:"neutral.png"},
//        {owner:"Enemy",id:3,type:"Tower",count:150,x:529,y:403,path:[6,7]},
//        {owner:"Enemy",id:4,type:"Tower",count:100,x:175,y:323,path:[1,8,9],texture:"neutral.png"},
//        {owner:"Enemy",id:5,type:"Turret",count:86,x:332,y:333,path:[1,2,6,9,10]},
//        {owner:"Enemy",id:6,type:"Turret",count:13,x:468,y:332,path:[2,3,5,10,11]},
////        {owner:"Neutral",id:6,type:"Turret",count:93,x:468,y:332,path:[2,3,5,10,11]},
//        {owner:"Enemy",id:7,type:"Tower",count:80,x:619,y:321,path:[3,11,12]},
//        {owner:"Enemy",id:8,type:"Tower",count:58,x:109,y:257,path:[4,13],texture:"neutral.png"},
//        {owner:"Enemy",id:9,type:"Turret",count:99,x:245,y:266,path:[4,5,10,13]},
//        {owner:"Enemy",id:10,type:"Tower",count:60,x:399,y:218,path:[5,6,9,11,14,15],texture:"neutral.png"},
//        {owner:"Enemy",id:11,type:"Turret",count:18,x:555,y:270,path:[6,7,10,16]},
////        {owner:"Neutral",id:11,type:"Turret",count:78,x:555,y:270,path:[6,7,10,16]},
//        {owner:"Enemy",id:12,type:"Tower",count:65,x:690,y:264,path:[7,16]},
//        {owner:"Enemy",id:13,type:"Turret",count:93,x:188,y:176,path:[8,9,14]},
//        {owner:"Enemy",id:14,type:"Tower",count:58,x:303,y:115,path:[10,13],texture:"neutral.png"},
//        {owner:"Enemy",id:15,type:"Tower",count:88,x:494,y:116,path:[10,16],texture:"neutral.png"},
//        {owner:"Enemy",id:16,type:"Turret",count:15,x:608,y:175,path:[11,12,15]},
////        {owner:"Neutral",id:16,type:"Turret",count:105,x:608,y:175,path:[11,12,15]},
//    ]
//    //测试我方出兵移动效率
//    map:[
//        {owner:"Player",id:1,type:"YellowTower",count:1000,x:268,y:404,path:[4,5]},
//        {owner:"Player",id:2,type:"Tower",count:75,x:399,y:435,path:[5,6],texture:"neutral.png"},
//        {owner:"Neutral",id:3,type:"Tower",count:150,x:529,y:403,path:[6,7]},
//        {owner:"Player",id:4,type:"Tower",count:100,x:175,y:323,path:[1,8,9],texture:"neutral.png"},
//        {owner:"Player",id:5,type:"Turret",count:86,x:332,y:333,path:[1,2,6,9,10]},
//        {owner:"Player",id:6,type:"Turret",count:13,x:468,y:332,path:[2,3,5,10,11]},
////        {owner:"Neutral",id:6,type:"Turret",count:93,x:468,y:332,path:[2,3,5,10,11]},
//        {owner:"Player",id:7,type:"Tower",count:80,x:619,y:321,path:[3,11,12]},
//        {owner:"Player",id:8,type:"Tower",count:58,x:109,y:257,path:[4,13],texture:"neutral.png"},
//        {owner:"Player",id:9,type:"Turret",count:99,x:245,y:266,path:[4,5,10,13]},
//        {owner:"Player",id:10,type:"Tower",count:60,x:399,y:218,path:[5,6,9,11,14,15],texture:"neutral.png"},
//        {owner:"Player",id:11,type:"Turret",count:18,x:555,y:270,path:[6,7,10,16]},
////        {owner:"Neutral",id:11,type:"Turret",count:78,x:555,y:270,path:[6,7,10,16]},
//        {owner:"Player",id:12,type:"Tower",count:65,x:690,y:264,path:[7,16]},
//        {owner:"Player",id:13,type:"Turret",count:93,x:188,y:176,path:[8,9,14]},
//        {owner:"Player",id:14,type:"Tower",count:58,x:303,y:115,path:[10,13],texture:"neutral.png"},
//        {owner:"Player",id:15,type:"Tower",count:88,x:494,y:116,path:[10,16],texture:"neutral.png"},
//        {owner:"Player",id:16,type:"Turret",count:15,x:608,y:175,path:[11,12,15]},
////        {owner:"Neutral",id:16,type:"Turret",count:105,x:608,y:175,path:[11,12,15]},
//    ]
};


//敌塔留人数目
leftEnemy = 2;

// 出兵比例。
var enemyRunProportion = 5/6;
var playerRunProportion = 2/3;

//技能标注价格
var skill_zz_price = 20;
var skill_hf_price = 35;
var skill_wy_price = 35;
var skill_sd_price = 10;
var skill_hd_price = 10;
var skill_lx_price = 10;

//初始技能等级
zzLevel = 0;
hfLevel = 0;
wyLevel = 0;
sdLevel = 0;
hdLevel = 0;
lxLevel = 0;

//技能升级价格级差
sd_price_up = 10;
hd_price_up = 10;
lx_price_up = 10;

//胜利等级判定及金钱获取
//过关时间标注为分钟，分为三等，小于bestTime,小于normalTime,其他
bestTime = 1;
normalTime = 2;
//根据不同过关时间等级，给予不同金钱，最好的给予bestCoin,其次 normalCoin,其他 badCoin
bestCoin = 10;    //3颗星
normalCoin = 5;  //2颗星
badCoin = 2;     //1颗星
myRunSpeedNormal = 120;
//技能辅助控制参数
//1 减速  沼泽技能，正常速度为
enemyRunSpeedNormal = 120;
enemyRunSpeedSlowly = 15;

//天使技能使用后我方塔生产速度 个/秒
hfRate = 0.25;
//瘟疫技能使用后敌方塔生产速度 个/秒
wyRate = 8;

//未用
normalRate = 1.5;

//闪电技能每级伤害增加比例
sdHurtPercent = 0.2;

//流星技能每级伤害增加比例
lxHurtPercent = 0.2;

// 护盾防护时间为当前护盾等级加以下数字的结果 时长。单位秒。
hdTime = 3;

//技能冷却时间
zzReloadTime = 30;
hfReloadTime = 30;
wyReloadTime = 30;
sdReloadTime = 30;
hdReloadTime = 30;
lxReloadTime = 30;

//全局辅助方法。
var skillMinKillNum = 1;

var scaleUp = cc.ScaleTo.create(0.1, 1.2);
var scaleDown = cc.ScaleTo.create(0.1, 0.8);
var scaleMid = cc.ScaleTo.create(0.1, 1);
//var scaleUp = cc.Blink.create(0.1, 2);
//var scaleDown = cc.Blink.create(0.1, 0.8);
//var scaleMid = cc.Blink.create(0.1, 1);
var scaleAction = cc.Sequence.create(cc.ScaleTo.create(0.1, 1.2),cc.ScaleTo.create(0.1, 0.8), cc.ScaleTo.create(0.1, 1));
//var scaleAction = cc.Blink.create(1,2);
var scaleAction1 = cc.Sequence.create(cc.ScaleTo.create(0.1, 1.2),cc.ScaleTo.create(0.1, 0.8), cc.ScaleTo.create(0.1, 1));
//var scaleAction1 = cc.Blink.create(1,2);;

//平常情况下，敌塔兵数量差值大于以下值，则大数像小数支援。
enemyHelpBeginNum = 15;
