var CONFIG = {
	"obstacles":
	[
		{
			"type":1,
			"name":"pylon1",
			"hitboxtype":"default",
			"scoretype":"obstacle",
			"imagedata":
			[
				{
					"src":"images/pixelkaiju-enemy-booko.png",
					"scalefactor":0.6
				}
			]
		},
		{
			"type":2,
			"name":"car",
			"hitboxtype":"unjumpable",
			"scoretype":"obstacle",
			"imagedata":
			[
				{
					"src":"images/pixelkaiju-enemy-megakoobo.png",
					"scalefactor":0.5
				}
			]
		},
		{
			"type":3,
			"name":"oilspot",
			"hitboxtype":"default",
			"scoretype":"obstacle",
			"imagedata":
			[
				{
					"src":"images/oilspot1.png",
					"scalefactor":0
				}
			]
		},
		{
			"type":4,
			"name":"rock",
			"hitboxtype":"default",
			"scoretype":"obstacle",
			"imagedata":
			[
				{
					"src":"images/pixelkaiju-enemy-grock.png",
					"scalefactor":0.7
				}
			]
		},
		{
			"type":5,
			"name":"life",
			"hitboxtype":"narrow",
			"scoretype":"life",
			"imagedata":
			[
				{
					"src":"images/pixelkaiju-eitje4.png",
					"scalefactor":1.2
				}
			]
		},
		{
			"type":6,
			"name":"egg",
			"hitboxtype":"default",
			"scoretype":"egg",
			"imagedata":
			[
				{
					"src":"images/pixelkaiju-eitje1.png",
					"scalefactor":0.85
				}
			]
		},
		{
			"type":8,
			"name":"finish",
			"hitboxtype":"unmissable",
			"scoretype":"finish",
			"imagedata":
			[
				{
					"src":"images/finish.png",
					"scalefactor": 0.60,
					"imgScale": 0.5
				}
			]
		},
		{
			"type":9,
			"name":"pylon2",
			"hitboxtype":"default",
			"scoretype":"obstacle",
			"imagedata":
			[
				{
					"src":"images/pixelkaiju-enemy-koobo.png",
					"scalefactor":0.6
				}
			]
		},
		{
			"type":10,
			"name":"pylon3",
			"hitboxtype":"default",
			"scoretype":"obstacle",
			"imagedata":
			[
				{
					"src":"images/pixelkaiju-enemy-troobo-small.png",
					"scalefactor":0.6
				}
			]
		},
		{
			"type":100,
			"name":"trigger",
			"hitboxtype":"unjumpable",
			"scoretype":"trigger",
			"imagedata":
			[
				{
					"src":"images/trigger.png",
					"scalefactor":0.6
				}
			]
		}
	],
	"levels":
	[
		{
			"id":1,
			"time":300,
			"mapposx":55.50,
			"mapposy":1348.85,
			"speed": 0.6
		},
		{
			"id":2,
			"time":20,
			"mapposx":235,
			"mapposy":1321.6,
			"speed": 0.6
		},
		{
			"id":3,
			"time":25,
			"mapposx":410,
			"mapposy":1349.85,
			"speed": 0.6
		},
		{
			"id":4,
			"time":20,
			"mapposx":581,
			"mapposy":1339.1,
			"speed": 0.6
		},
		{
			"id":5,
			"time":20,
			"mapposx":697,
			"mapposy":1276.35,
			"speed": 0.6
		},
		{
			"id":6,
			"time":20,
			"mapposx":679,
			"mapposy":1157.85,
			"speed": 0.6
		},
		{
			"id":7,
			"time":20,
			"mapposx":519,
			"mapposy":1118.85,
			"speed": 0.75
		},
		{
			"id":8,
			"time":20,
			"mapposx":470,
			"mapposy":1236,
			"speed": 0.75
		},
		{
			"id":9,
			"time":20,
			"mapposx":296.5,
			"mapposy":1222.6,
			"speed": 0.75
		},
		{
			"id":10,
			"time":20,
			"mapposx":116,
			"mapposy":1231.85,
			"speed": 0.75
		},
		{
			"id":11,
			"time":20,
			"mapposx":40,
			"mapposy":1138.85,
			"speed": 0.75
		},
		{
			"id":12,
			"time":20,
			"mapposx":162.5,
			"mapposy":1086.85,
			"speed": 0.75
		},
		{
			"id":13,
			"time":20,
			"mapposx":339,
			"mapposy":1080,
			"speed":0.75
		},
		{
			"id":14,
			"time":20,
			"mapposx":514.5,
			"mapposy":1048,
			"speed":0.75
		},
		{
			"id":15,
			"time":20,
			"mapposx":687.25,
			"mapposy":1079.25,
			"speed": 0.75
		},
		{
			"id":16,
			"time":20,
			"mapposx":586,
			"mapposy":988.75,
			"speed": 0.75
		},
		{
			"id":17,
			"time":20,
			"mapposx":417.25,
			"mapposy":981.25,
			"speed": 0.75
		},
		{
			"id":18,
			"time":20,
			"mapposx":236,
			"mapposy":1005,
			"speed": 0.75
		},
		{
			"id":19,
			"time":20,
			"mapposx":69,
			"mapposy":965,
			"speed": 0.75
		},
		{
		    "id": 20,
		    "mapposx": 105,
		    "mapposy": 859,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 21,
		    "mapposx": 295,
		    "mapposy": 845,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 22,
		    "mapposx": 465,
		    "mapposy": 883,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 23,
		    "mapposx": 648,
		    "mapposy": 895,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 24,
		    "mapposx": 660,
		    "mapposy": 779,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 25,
		    "mapposx": 485,
		    "mapposy": 793,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 26,
		    "mapposx": 352,
		    "mapposy": 739,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 27,
		    "mapposx": 526,
		    "mapposy": 708,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 28,
		    "mapposx": 687,
		    "mapposy": 674,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 29,
		    "mapposx": 523,
		    "mapposy": 642,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 30,
		    "mapposx": 354,
		    "mapposy": 655,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 31,
		    "mapposx": 177,
		    "mapposy": 655,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 32,
		    "mapposx": 97,
		    "mapposy": 746,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 33,
		    "mapposx": 25,
		    "mapposy": 675,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 34,
		    "mapposx": 46,
		    "mapposy": 555,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 35,
		    "mapposx": 214,
		    "mapposy": 576,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 36,
		    "mapposx": 387,
		    "mapposy": 583,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 37,
		    "mapposx": 554,
		    "mapposy": 567,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 38,
		    "mapposx": 709,
		    "mapposy": 538,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 39,
		    "mapposx": 554,
		    "mapposy": 492,
		    "time": 20,
			"speed": 1.00
		},
		{
		    "id": 40,
		    "mapposx": 683,
		    "mapposy": 414,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 41,
		    "mapposx": 503,
		    "mapposy": 387,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 42,
		    "mapposx": 329,
		    "mapposy": 416,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 43,
		    "mapposx": 158,
		    "mapposy": 404,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 44,
		    "mapposx": 41,
		    "mapposy": 342,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 45,
		    "mapposx": 59,
		    "mapposy": 223,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 46,
		    "mapposx": 220,
		    "mapposy": 184,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 47,
		    "mapposx": 269,
		    "mapposy": 301,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 48,
		    "mapposx": 442,
		    "mapposy": 288,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 49,
		    "mapposx": 622,
		    "mapposy": 298,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 50,
		    "mapposx": 697,
		    "mapposy": 204,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 51,
		    "mapposx": 576,
		    "mapposy": 152,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 52,
		    "mapposx": 399,
		    "mapposy": 144,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 53,
		    "mapposx": 224,
		    "mapposy": 113,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 54,
		    "mapposx": 51,
		    "mapposy": 145,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 55,
		    "mapposx": 152,
		    "mapposy": 54,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 56,
		    "mapposx": 321,
		    "mapposy": 46,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 57,
		    "mapposx": 502,
		    "mapposy": 70,
		    "time": 20,
			"speed": 1.20
		},
		{
		    "id": 58,
		    "mapposx": 669,
		    "mapposy": 30,
		    "time": 20,
			"speed": 1.20
		}
	]
};