var SG_texts = {};
var gameover_image, menu_image, ok_image, menu_back_image;
function initLocalization(lang){
	switch( lang ){
	case 'es' :
		gameover_image = "gui_GameOver_back_es";
		ok_image = 'gui_Tutorial_button_ok';
		menu_image = 'gui_Menu_tap_es';
		menu_back_image = 'MenuBack';
		break;
	case 'tr' :
		gameover_image = "gui_GameOver_back_tr";
		ok_image = 'gui_Tutorial_button_ok_tr';
		menu_image = 'gui_Menu_tap_tr';
		menu_back_image = 'MenuBack_tr';
		break;
 	default :
		gameover_image = "gui_GameOver_back";
 		ok_image = 'gui_Tutorial_button_ok';
		menu_image = 'gui_Menu_tap';
		menu_back_image = 'MenuBack';
		break;
	};
	
	SG_texts = {
		'en' : {
			//'textMenu' : 'Menu',
			//'textRetry' : 'Retry',
			//'landedText' : 'Landed',
			//'tutText' : 'Select an aircraft by touching. Keep touching while drawing a path to the runway.'
			'textMenu' : '菜单',
			'textRetry' : '重来',
			'landedText' : '安全降落',
			'tutText' : '点击飞机然后画条线连接到同样颜色 的跑道让它安全降落'
		},
		'es' : {
			'textMenu' : 'Menú',
			'textRetry' : 'Reintentar',
			'landedText' : 'Aterrizó',
			'tutText' : 'Selecciona un avión tocándolo. Sigue tocándolo mientras dibujas un camino a la pista.'
			
		},
		'tr' : {
			'textMenu' : 'Menü',
			'textRetry' : 'Tekrar',
			'landedText' : 'İniş Yapıldı',
			'tutText' : 'Dokunarak bir uçak seçin. Pist üzerinde ilerlemek için dokunmaya devam edin.'
		}
	};
	
	SG_textSizes = {
		'en' : {
			'textRetry' : 36,
		},
		'es' : {
			'textRetry' : 22
		},
		'tr' : {
			'textRetry' : 36,
		}
	};
};