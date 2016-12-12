(function() {
	
	function trace(x) {
		console.log("[tortilla/browser] " + x);
	}
	trace("0.3 starting up");
	
	var eventListeners = {};
	
	function eventListenerList(event) {
		if (eventListeners.hasOwnProperty(event)) {
			return eventListeners[event];
		} else {
			return eventListeners[event] = {};
		}
	}
	
	var tortilla = {
			
		EV_VISIBILITY_CHANGED: "visibilityChanged",
		EV_FULLSCREEN_CHANGED: "fullscreenChanged",
		EV_RESIZED: "resized",
			
		platform: "browser",
			
		BUILD_TIME: 1398696902879,
		MANIFEST: {"index.html":{"hash":"dad978a21d84a58e944a195f1cca421fe0afdf264881b680e0d6f59e8dee546d"},"a10logo.png":{"hash":"b6d100d6cf39fce19738c963df61f6d4fda6ffb4efbc6aa4d81cce9e37b84111"},"sounds/coin.mp3":{"hash":"f21b21fa1aeded082c449db928dab3a7552f4740e8c34ea1e5de0f898a5298a6"},"sounds/coin.ogg":{"hash":"196e71751c46939b8277191920b021264141588963cf25b17dd02b2321220e3b"},"sounds/crash.mp3":{"hash":"0a7e6a74b6d8031c7914500e1e89f121d7a4e1cd93298024622fa6e0be4a1715"},"sounds/crash.ogg":{"hash":"cd2d0c8ddd787868f154cc8bb597d4a34c56596d04509f5d3a305eff6457aaf6"},"sounds/empty.mp3":{"hash":"13625abecbe6b18e6d59be15ba66b6da1e2492d793806f3145d550745f22a6c7"},"sounds/empty.ogg":{"hash":"d83f02a09c2bb90574335f7bffd064ecc1b8fec629c1a5509e9cf6ba153ebe5a"},"sounds/fail.mp3":{"hash":"75fb589ca503b897db040f0ad5211ede08f45389d754469a80651e18a2bb4433"},"sounds/fail.ogg":{"hash":"5f467899585752eee5adcf7a8abc45c653da4b14681d4ec63e6daa5f85df151b"},"sounds/footstep.mp3":{"hash":"ec6670b944be60e3cc3d56a1da508bcc28b5a9b4c1ca989ed0a4f5d7d367bd46"},"sounds/footstep.ogg":{"hash":"0f60d5a5cb23d77311153504a0fadbd07e26c43739c6d0e478d147f027e0c5ef"},"sounds/hitcar.mp3":{"hash":"aeea9075ae7d80ebd7bc24bad5af993eb066f0fb5372c498c1de3006af4e5195"},"sounds/hitcar.ogg":{"hash":"96add538036dedde146aa623d44e86e1cd94073feffe79f0e9e6e5601ef51b2e"},"sounds/jump.mp3":{"hash":"63b4e482ed3a0f18c20e9acc6c1fd92610f60efbf98bdfed1d274e515fcae00c"},"sounds/jump.ogg":{"hash":"11c29665fe98d7ca59fefcef3bd261f9bab48c583220dae72862143cfe98cf33"},"sounds/knock.mp3":{"hash":"8b3daf30a177af55c6e1f20d50cb0ee2c7836451e2371045aa459b3d8ddd9071"},"sounds/knock.ogg":{"hash":"767ec41b3745a8c67bf0609edddc9bfef933c018259ff6bfef1f7c994a115d7e"},"sounds/runkaijurun.mp3":{"hash":"1e91168dcdca5992d3a5f49afa3a06f3c7677424c8777dfbfced68b2e5f2c8a5"},"sounds/runkaijurun.ogg":{"hash":"580d9209a3115678dbd4f80ad2d470b8beab0d6aa8ecd674268fd98c18f468d4"},"sounds/sauce.mp3":{"hash":"d7322ef60d5144d74a92fcc852c46696ba160c3e42e1bc9fc9dbb8eb1c97ec5f"},"sounds/sauce.ogg":{"hash":"0a790dfa095a3089e35c630ca2c1e811850d43120e297a992d5474770440387c"},"sounds/spin.mp3":{"hash":"d74df341f4548f82b9b207a048e76c97c6f7e00a338184194c7d06e2ab632183"},"sounds/spin.ogg":{"hash":"188dfa0f4a072181890b6c3d666f76700b651d3473a8c03144f2ca927a6d585d"},"sounds/throwsauce.mp3":{"hash":"2bd572a678af68b6f915cd32fbf83779bd434ad2dd96577b7297afab4f0766ad"},"sounds/throwsauce.ogg":{"hash":"277ddd75f7a4e1220374443949fd9d4bbcb55509fb3a86d70c66848427fff04d"},"levels/level1.json":{"hash":"2bee9ed2735571103ad5cc7342209760b93ca32119869d45ffab50a80c6d1375"},"levels/level10.json":{"hash":"e8d6860429df86205cce97ac8005747d0e7537971b2c3c8ce7d8c5b8e0003d0d"},"levels/level11.json":{"hash":"f6c074b42bc1a3a1cc56c0177488b474900c0708e5f70a196721ced373501d22"},"levels/level12.json":{"hash":"b171fe14afb4fe574c253961fe61143903a06fd4ccd4a2f5022778a059b70eb4"},"levels/level13.json":{"hash":"e8c09665cf5b32e4ceacce2a33295f82458ce6f01d12dddb58a96f7dfb839927"},"levels/level14.json":{"hash":"621c13a86c746c8f6fdae1d22c44a23a847e8b717a0c573ecfd2bed3c6a79e32"},"levels/level15.json":{"hash":"c11184ec6b585ca7b6d40e0ddba31325cc46b59cb5fa6202b6cfae450d898c8d"},"levels/level16.json":{"hash":"3bd193b3c7fe37eaa5213a26d0f783407de5de13f6a699437c375a02505242a3"},"levels/level17.json":{"hash":"44f90206bd327132ccbdd893070433c4b29cb0cd090f1c034dfbe636076d6719"},"levels/level18.json":{"hash":"2f77253d08fc0dfaa89e1b8d62150bbe9be93866a65c31ff7ed0f81bc797ed51"},"levels/level19.json":{"hash":"e3cfbf578be357bf98597f1c4a886c0d955dc8f28a5f5eda3e0c32dc755db14a"},"levels/level2.json":{"hash":"28aca7456a2ddfbc1c16cea2e5902fd504aebd81b813bf09dc07a2d7359962aa"},"levels/level20.json":{"hash":"2e99e48abf7c71e6bc93a7331ba87cea15b275b32f2382abd1a99e8544b25df0"},"levels/level21.json":{"hash":"2e2213aa95601e529a96592255af1d6ed10e2acf345e7a888084a7afea897a08"},"levels/level22.json":{"hash":"e015f2b7ddef94ad85429084fd7cc25fa420b399e84bd295313704a34cf4cf93"},"levels/level23.json":{"hash":"73c4b595ba7b11c0ade518622750c3ca33d9c13c4acc32d6597f3377a34a7836"},"levels/level24.json":{"hash":"78ca7e883b19559e90b67c85c212514afbaf9022c1b9ebe033f1762e66c99e56"},"levels/level25.json":{"hash":"496b5201cde9d2c39f265cb3c4d01fb6696d6e55af9bf9374059c47b6fff0a67"},"levels/level26.json":{"hash":"44efbec9abfd2a1a89b46db3a1798f2508223b498337fe9b24ae3c78da9f83a5"},"levels/level27.json":{"hash":"4c25c54fac76b90d2fe659cc92c3f756ab3f03e8ba12355639f206aae9481da9"},"levels/level28.json":{"hash":"108988a40bed39d5db09d8ae94e7a4089615c3069fc04b5693a67e700495800d"},"levels/level29.json":{"hash":"52096dd6b5627615079806003472487c7822bcf760a5a6b80fab441ff60615f9"},"levels/level3.json":{"hash":"b53927cf26861ddfdbb69b5e63f86e54ff8e99fbe4e7579048a98070940c2586"},"levels/level30.json":{"hash":"a087284dd19928f7bfe990e214a1717648d805f819e43ae5d107b63a87b1f533"},"levels/level31.json":{"hash":"ef43d4077fdb23460bc6a894bf8bbee4f6279fd83f7c9fdddb337512a8696cf7"},"levels/level32.json":{"hash":"f89742862508a8cfa311f92ad6cfe9115f0195fd6f30cd1567af9f721426e4a9"},"levels/level33.json":{"hash":"089349e63aa21fcbe5f10cde01e779b212c6228e9dad7d8ed7d8340aedd31930"},"levels/level34.json":{"hash":"daa008914c92dc2913d263b5ea22793cf9f36de76f4453cac44fb09e48306518"},"levels/level35.json":{"hash":"6cb06f18c8d31c6eee849b00be0ac659073349b83139c78d50b34ed17a5c54f7"},"levels/level36.json":{"hash":"e6b32194e059d4903fb051252466bf782aeaff615f6f2afd6857cb190762341d"},"levels/level37.json":{"hash":"e54ca738d099580af99c2a4841e046f6291645be1ef10e69ef602b972bdddf0c"},"levels/level38.json":{"hash":"2896651ebb9e2aa9b9fbc940047d68251a3d67716d562b28a17404f2215ed446"},"levels/level39.json":{"hash":"e84bf5aae4c1e3b0ae031b6a4a3a42e3dc3427f22f8dd852da4e14e5789b2688"},"levels/level4.json":{"hash":"3fd7a25b3cad077ecda5fb7113c47f3d22c9803bad12a51c56cc67084fff3235"},"levels/level40.json":{"hash":"8f5929830278a130ab2db2f3ac90be94966986f9c97f3b9b1ce6309adfb3f104"},"levels/level41.json":{"hash":"f9e633d64935e60fd5ab4249e6522f52bb5a2cb4d6b78497825d447fad250ae9"},"levels/level42.json":{"hash":"c436ccd54266fb1f195d69338c917826c61726d48b196170526000d219c00ab9"},"levels/level43.json":{"hash":"8b7f50e90d1f5d1acc8d16d5d24766a8c79a60321c747283e8ecb6cd044b5f6f"},"levels/level44.json":{"hash":"36df0b8687b0d8ac8e81e91e69fe0e49ed0dd82c303cbb13618b314295a4336b"},"levels/level45.json":{"hash":"5722505acabd0b4180161ecca34012f9a2b48e773869c349a31d1fd1b3472c41"},"levels/level46.json":{"hash":"b306fb42d2c125a9da44cce4513b9d74bc94fb935cea6a3221ea628091212f3c"},"levels/level47.json":{"hash":"cbc8edb8848c8c316f727a1e6c04b5019a915e126b79bc201cdabcba6a608887"},"levels/level48.json":{"hash":"a04636424f4e77306a7e97542cffd740ff894bf36c6ccc9dd4c185d2af145b35"},"levels/level49.json":{"hash":"084dd2f3568c8002a1bf6158ff934bfcb80d0a0fc64cdfe1e14b0f16a83dd633"},"levels/level5.json":{"hash":"eee4c794ca58df193592768c7163d21c11eb4bdc35708c4b77c0ed9f1074cd45"},"levels/level50.json":{"hash":"8e8df7931088151ae6b9942acd23521fa3a6fbf176d7baad5da2d05e5e7517de"},"levels/level51.json":{"hash":"21b3105eb8b3acbc5e88b008773a4ece3780f0601e6d043bc42bc45cf36cd32a"},"levels/level52.json":{"hash":"85ba673d533ef8f371551ace6d4b5c9e7213c2bad531e49f6e439754c9980956"},"levels/level53.json":{"hash":"dad1e69b0d1e9a3d5ab7158e882b1c0de6b230495248b64b5bb7913c691bef4f"},"levels/level54.json":{"hash":"94fb4968eaafce7b02a1f87cadc2c19cb94d26494451a80760f6592152aaa8fe"},"levels/level55.json":{"hash":"64ddeed629848075c9eb778287bd81c57eb8f80081e73ec59048fffd3c8f8ae7"},"levels/level56.json":{"hash":"2dac488d37439ecc82e8d526adc75dc4c4d0d587b2e7fb0bc56cfc27ef3f73b4"},"levels/level57.json":{"hash":"d42d74813de99025574c69118f638c568a9bc26af99e620695ea82b8382e38ed"},"levels/level58.json":{"hash":"498dbc3b5dd2dfa5afed0c58486a55182da00b0fac78d14238d1ecf009a9f622"},"levels/level6.json":{"hash":"fd703dafd8b8d0d8fab4d120658148261e2f71894f885fffd5b2bed20cce5344"},"levels/level7.json":{"hash":"189ff7cf19f090a674e7940b8d3f6c28d9d42ccc61c6e7018ca7fe96deee4f14"},"levels/level8.json":{"hash":"e090b6e6069b3b054382a83d870d3ae3b9c89e2524805b8a7b0c053f9cc34561"},"levels/level9.json":{"hash":"b4a3f61ef10c7671ef27fc9e5c0ced40b0f6f3a9fde0b587bcf1c6f08ce79ea5"},"images/audiobutton.png":{"hash":"2ff149106dcdcb545be460579f9b4709a334611331125d7e5405fcfd6026db0b"},"images/bg.jpg":{"hash":"c7b0245ce14e7d1442e6cb00e6fa6392f664f7141b2f28484b25da797527d1c8"},"images/button.png":{"hash":"55a6ebb9d08c0e5d51f358999c04a5c5917a15259df85cb23064111e448f18a4"},"images/finish.png":{"hash":"0711bb34dfa5e82c5dfd3bc89af01132795f9b6a2d7b6a7ae9041ed5e0f5ff61"},"images/hole.png":{"hash":"6108d322b9511bc27911686e56114cface1b59d8b12e465bf572276d0bd80031"},"images/oilspot1.png":{"hash":"d731918a848f7b39bfa05e620a0d84a5c7767853af602797e1c6e24066a6f565"},"images/pixelkaiju-eitje1.png":{"hash":"3cb13ba6a8c2ba41bef64344e4052923746bfe334f7f961fbf5fb3aecf101df9"},"images/pixelkaiju-eitje4.png":{"hash":"ff5eced0136775273e57efd1217711876b7811844a44003887995a80b5d9b6f4"},"images/pixelkaiju-enemy-booko.png":{"hash":"100c4d83e51dddb5e97792622737f68251c0c6209177f184c23e3d33c9d30f70"},"images/pixelkaiju-enemy-grock.png":{"hash":"51a4e1811da2500f950b660459cc6be0f88d42295e5da513fab3f3b4fc0fb602"},"images/pixelkaiju-enemy-koobo.png":{"hash":"47b67a836c5e766db416cceed866453999eccba8b005fdab3d4fa31f06260f01"},"images/pixelkaiju-enemy-megakoobo.png":{"hash":"54937fd17311d9956439f1a3f6b9f589aa454fd1730a846d3c4dcb12244d6349"},"images/pixelkaiju-enemy-troobo-small.png":{"hash":"6d385e11e1ccda03a6626b201642922c12eebee46d4be75c0c974f583e4c9bee"},"images/pixelkaiju-map-blackoverlay.png":{"hash":"84627d97a874e1eba25336c9c83c27867a4b250544c43149ca27623ebab0e316"},"images/pixelkaiju-map-popup-afsluitbutton.png":{"hash":"ade9ca288d797d2cc994e875cea36aa10b7063df864b18c3bdbb4cb96dd44f4f"},"images/pixelkaiju-map-popup.png":{"hash":"e29193b7628224e261b9601bd313976c3ab854c1985cb89bad3d8dffbe81c2f3"},"images/pixelkaiju-map-streepje.png":{"hash":"3f7868f1b760cea6e4021f125261b8b3e41ef7ccc66a8284fb251ffa67bbf479"},"images/pixelkaiju-map-vinkje.png":{"hash":"f076ebff5b6b21d48636d24cab4a243d1394777c909d30c355b65ee4f35b363f"},"images/trigger.png":{"hash":"3b3fe8f8a28768675a5b8ecf72d77616f54372f6a8ec5468a0c91e9ec2d79ab5"},"images/titlescreen/egg.png":{"hash":"16c7ac6d7810b0e1388eaf7c382129fe595cf659e526e4cb9eb1b8d34f754ff8"},"images/titlescreen/kaiju.png":{"hash":"0a043d68ad9588726009128a50672a8644fa589c42e6a23a99521a763137bd16"},"images/titlescreen/title1.png":{"hash":"8444c4d397511f9ff76cb69d5f237bcb2c37e6f9c641b44349605eecd63bd924"},"images/titlescreen/title2.png":{"hash":"12c6f9243ce29dde43029e6c9c458ffa3e2f812b6d6beb026d7644ee490f7fdd"},"images/titlescreen/title3.png":{"hash":"98102307b021e85af882160ff27bb0e8e81e8c3f41c6386e1f94115b7bde926d"},"images/shop/bg.jpg":{"hash":"8d249b4e92d568b97cc0adab4df5f2ced75d92164b85a556019d1aa2fc6f088f"},"images/shop/egg-small.png":{"hash":"22266ccdc4b9e6e44cd68ae90d2aa9689866a93a4738dc7559b1521674495b23"},"images/road/road1.png":{"hash":"d55decee27bff931db1bec2c6aa4edd94ee648153c0b3819ebafb7692788355e"},"images/road/road10.png":{"hash":"a3f5d4c6903cb1086828e9aae8e6e7dbff80293d4ec5dde177ed123aeaf0b5de"},"images/road/road11.png":{"hash":"b03ba39cd0843c6e7063dfac368aed7bb9274d7a2cc2e87cef1e0f1b733b4192"},"images/road/road12.png":{"hash":"42c9b41983b4f3deddc115054d712faacb3acc46fb31835107897b6b1f77854e"},"images/road/road13.png":{"hash":"c765bd8fe0ea10ab1df0103e9a9bb1486591e5968cd923c6d4d5146f1717e2bf"},"images/road/road14.png":{"hash":"73d4607f46215b7fd55bc5f111ffbb4629113b92fb2fcd759223464fd25a55a0"},"images/road/road2.png":{"hash":"a484c14bb87ef329c5966145e6052618565d367bc59f0e7504c972e7921542ee"},"images/road/road3.png":{"hash":"3648db6887a894157d2c6fc72b9d6abb0a32fd77fdac725abcc3f4328a2b8f1a"},"images/road/road4.png":{"hash":"5ee5a00ec6fca42da1fd8cf124b6e7c32d37fef5bf55343a5177cfbb88fa064f"},"images/road/road5.png":{"hash":"89b54824f1d6363eef4a287932d9c6c92f4088eed3211f3cd9d6cdefb9b21f9b"},"images/road/road6.png":{"hash":"4ce3320979ba4e59220ba79575cbf4eae998d44f8204298f7fa29ad902ea18c4"},"images/road/road7.png":{"hash":"bbf2e07d583f61044f493312bc3640ed5b40008a90aa26fc13784de2ff881028"},"images/road/road8.png":{"hash":"67b268a5d7f2a8b44ae3b051146b9ca5798f9a049339a215d326ea2e537ab052"},"images/road/road9.png":{"hash":"a1f012598e8b9b6bc03de562cae6da9711b1fc49245772fc96c5cde2d058f62d"},"images/powerups/extralife.png":{"hash":"14ff87948ac7d1a610389df7a29e44e79392626f7fb9b7489dd22cdbd89c3683"},"images/powerups/headstart.png":{"hash":"1aa42925af95704a40dbf78d0e3d1f16e81486f07ec69f751d2f096540952e12"},"images/powerups/magnet.png":{"hash":"7448e61f0b5bf96fcbbe3c8e247781d97eb883bc0d709797092e71ecf680f544"},"images/player/pixelkaiju-cheer01.png":{"hash":"4dca2c4244c187d7031f929381b1d980e1f13a6e69e25a1d6abbf781d40b9c0f"},"images/player/pixelkaiju-cheer02.png":{"hash":"f19e56879eb7f91f9703d7b12d3bfecb5edda9cd14bdb655dfe1747cc82b5eb6"},"images/player/pixelkaiju-cheer03.png":{"hash":"8e9951c7f5dd87471516a2b539fd657bb27ab7be455923ecb15480cf0e523721"},"images/player/pixelkaiju-cheer04.png":{"hash":"50cb61e17afef67d35a490b174bd646d2acd2b5d4e7fe84dcb17dbc638f6f916"},"images/player/pixelkaiju-cheer05.png":{"hash":"61c77a3d3140a2f493e5c487e60359548d2ed3c381ad75f5312cbf1eba6898ab"},"images/player/pixelkaiju-cheer06.png":{"hash":"233185fd8513b3d5c19183661078f6e32e2dfd3bc2dd58a212d3598c5c7fac89"},"images/player/pixelkaiju-death01-left.png":{"hash":"53226d2adae86f5e14d5ac620013c33ea9289277a7d1ff49329b4f0ce952ee0b"},"images/player/pixelkaiju-death01-right.png":{"hash":"2e13d580b9fad0144abde998e74022d6e9e86ed427122f658c9ef6edc15a425d"},"images/player/pixelkaiju-death01.png":{"hash":"53226d2adae86f5e14d5ac620013c33ea9289277a7d1ff49329b4f0ce952ee0b"},"images/player/pixelkaiju-death02.png":{"hash":"9645b68fcf2bd03158301b91138cb8f2812fe135e1aca6b13a0c4631fe0ab1d2"},"images/player/pixelkaiju-death03.png":{"hash":"68f0b20862dc31b43c12a8674bc1f4d796545705b1b75802fe82e542899a037b"},"images/player/pixelkaiju-death04.png":{"hash":"9a2055b16509c9ad02034c44984b89a0e280e969c0e0484202f633d2eaa69c99"},"images/player/pixelkaiju-ghost.png":{"hash":"c3ee3533d86f5e9b53a9c2b662e908f5514461bff706f65f96fe9363cf1423d0"},"images/player/pixelkaiju-jump-normal01.png":{"hash":"8e982929a069de18736aa50728a37858def11f1d95eaa06e22ec39a4cfdc3da8"},"images/player/pixelkaiju-jump-normal02.png":{"hash":"665ef225d46b86553bd7e8e95b62218254142f877688f6c9b8de6d1f62ffeeb0"},"images/player/pixelkaiju-jump-normal03.png":{"hash":"d6838d1fd49c0f0542756c317241bea03235af891fff9600f6a35f782e4434f7"},"images/player/pixelkaiju-jump-normal04.png":{"hash":"2919dc9f394f4ded2f7a07fc2252a9e4ba96a9af5caa7377307508ff8c5fae31"},"images/player/pixelkaiju-jump-normal05.png":{"hash":"6c6c0335739b812b80c61a1e2cd1914ad886e11944897bdcde4eee9eac7893cd"},"images/player/pixelkaiju-jump-normal06.png":{"hash":"66b4caac327982c501186d633011fb14faf2291b4f1023697a607d0795a6f6b4"},"images/player/pixelkaiju-jump-normal07.png":{"hash":"d4553acb7e6daac52f54854e4ab0103a8322f717247edd84095e6395c9b97ec6"},"images/player/pixelkaiju-jump-normal08.png":{"hash":"a2fe3568a90e2ec57cd404120883d693fb47e2cf32e293ac31cb8574e95f0d1a"},"images/player/pixelkaiju-jump-side01.png":{"hash":"166c7e6374654ab477d85a54f6eecd39108c2a0c1072b40ab1687c7da52fe6f5"},"images/player/pixelkaiju-jump-side02.png":{"hash":"3685baf0f533b9592b8064e4177107a8dd946e9b77b251f2f4245100c0652fe3"},"images/player/pixelkaiju-jump-side03.png":{"hash":"5f04cd17f62c9234a48976b71b961a04567f63652326fbcd5cea0a126478b4e8"},"images/player/pixelkaiju-jump-side04.png":{"hash":"57e84f3e2e119817cbc817197df445742c4ed7aab340517160d739e28d49aeac"},"images/player/pixelkaiju-jump-side05.png":{"hash":"f0257e70ec8a998ac881c1b00f63e2793d2109ac7c9ff61e86555ce3d742fc9a"},"images/player/pixelkaiju-jump-side06.png":{"hash":"f3ba23abc0188cc964f1f622831fcf21a4dc5b8fc99db6041c1cbca1b7de4158"},"images/player/pixelkaiju-jump-side07.png":{"hash":"fffc93569b6b0490803c5a52caa45065d89a96f99b4aa5e2367403200fa580a0"},"images/player/pixelkaiju-jump-side08.png":{"hash":"bc430cc6348ed8e2b79f6aa75e58e7ce2cd083103f06b250e9cce8bffb7c2872"},"images/player/pixelkaiju-running-normal01-v2.png":{"hash":"2ab585d7d75f152c09568ac5ecd6ebe89be152f0a82c9beb8c702e0d5e057398"},"images/player/pixelkaiju-running-normal02-v2.png":{"hash":"c726a4aa15f1fbff34ccf1203352041a6e9b5297394784481a446552d7532e0a"},"images/player/pixelkaiju-running-normal03-v2.png":{"hash":"874fc593faa53f432c88e08e3e32a91100fdf40232ba2c6747ef2b2aeb08421c"},"images/player/pixelkaiju-running-normal04-v2.png":{"hash":"b43e1f2821d9f748501bc6cd88a4535a9f86415157ff79d8045c61a07fba29bd"},"images/player/pixelkaiju-running-normal05-v2.png":{"hash":"b43a140684b09a98e12dc7919300f4213502b496e15830197e513e5b3b4e4aea"},"images/player/pixelkaiju-running-normal06-v2.png":{"hash":"3331cb30bb4a5895c916b851f90afa810b736667ab7ef80c972a05c4c5ba9626"},"images/player/pixelkaiju-running-right01.png":{"hash":"36025448a8b017dbd89b5e8c67cf20f0aa49f1aaaa2ae0df123252a37545da9d"},"images/player/pixelkaiju-running-side01.png":{"hash":"2fb4ce8c55499159d899c51897ee77b11a085218a995e85eed64200f64d82df7"},"images/player/pixelkaiju-running-side02.png":{"hash":"f2cf5b4a1999dc4ca6bfdec925598827b3023716489df2180534d87ec33f4aa4"},"images/player/pixelkaiju-running-side03.png":{"hash":"4b80b77313b4a96aa3fa9f1e068837dd732bb71d70154c6c79e0a7c157b76ce7"},"images/player/pixelkaiju-running-side04.png":{"hash":"521c535732bfb60f1b2906da246a7781cdc6a0cdc17b5911521e228cad64f055"},"images/player/pixelkaiju-running-side05.png":{"hash":"b6692d64682e847b2b5ab3efd76b626d8cba85ae55f4a3576cd5ec22e371ff16"},"images/player/pixelkaiju-running-side06.png":{"hash":"f97acf261754e5da63c6872483db66dced1f6a6d3aab5a06b7ca7f344d94e4c1"},"images/player/pixelkaiju-running-side07.png":{"hash":"732919881523bcbf1c02d550f912b48a8bbce294608d98e01775c20717397be8"},"images/player/pixelkaiju-running-side08.png":{"hash":"70c8b5e34e3181ec38425278d5fce3c988d9b92054d827e831dad77f9f9b0ef7"},"images/player/pixelkaiju-shadow.png":{"hash":"5949afef18bdf3a3f451374868fee23f77e6617913588c31c9b6c3f08ae767eb"},"images/map/map-game-kaiju.png":{"hash":"80c0deec4b7704efce9b1f77c2ab245cff7e89fa37e27a09d7928751167c0af4"},"images/map/map-game-zwartvlakje.png":{"hash":"97026210bcf88ed3bbf9201a76028ad3f9366fa97568dadef58f6bf01cd02b38"},"images/map/map.png":{"hash":"b6d471cf203060c1c45aab2e15087c7a350cd579f1aec20e8cac4098996e8edf"},"images/loadScreen/barBg.png":{"hash":"ce3e092bbcc7472559241fcc9cc50d4c7e296f4df9e7b55856952457ea5ff353"},"images/loadScreen/barFill.png":{"hash":"2489d6932e8e14ba2e5d74ed82d6d63db948caed6b7bfbb5be0e3ad1e5f09fc2"},"images/loadScreen/dance/ass1.png":{"hash":"e562f406446ba51f752c37147b0f26ee780e352407d7a3fe3980a9ac89937f2b"},"images/loadScreen/dance/ass2.png":{"hash":"6607367db2e9262524cc57a1d8c9c6257e499e71e8959abe9f0ac2735c5e3a00"},"images/loadScreen/dance/ass3.png":{"hash":"2af7ffdbec8edfbcc7688c67e6d04f4e5b86dbfc8f2e842e5d63fa8a5d3c1e79"},"images/loadScreen/dance/left1.png":{"hash":"2eb39466368392a79e9dc3ce788925ccde7f0ce6c488305962a32c17da25135f"},"images/loadScreen/dance/right1.png":{"hash":"6fe7597fe75fc752b3010521807a6b6a89512d33185a917f94d7c98a2600ff03"},"images/hud/eggs.png":{"hash":"fa66840d054cf1f46e6bb795df7b8ab17e052cc0b351181d94f8204f95ec1eee"},"images/hud/face-angry.png":{"hash":"9926958dc98733f53fbc7cbb9a19b842885ffe2728bfc5d336d773ca730e2e50"},"images/hud/face-dead.png":{"hash":"4d6e64770bea2b0e4382a5154cd852d4c4e80e6ec48fb28b60cc4c3ac42d6646"},"images/hud/face-happy.png":{"hash":"13fd67a6730daf33f64406ecb1d29fd962f9deeb6323e20658cdf4ed9297d627"},"images/hud/face-hit.png":{"hash":"3e8eaa8aa5c9dd58140d747980bd4f767fd13b2a44f5bc66f96b5068541f0be6"},"images/hud/face-meh.png":{"hash":"31bc5ba3316668edd5bb817e7e42e3a2b9b205f4b5878d5c398d70fe9a372283"},"images/hud/face-normal.png":{"hash":"28840ea50a459fcf381159c50c2c0df8903f104dcf9fe44b9b5509480c80feab"},"images/hud/face-phew.png":{"hash":"c43d3b3cdb58dd36e4f19a7e0e949097157a41f729dbbad3f0f605fcbb88541d"},"images/hud/lives.png":{"hash":"95900df0a59d9223a960367d618bf02ded1ee611e59a23629ca53a707339fb0c"},"images/hud/ring.png":{"hash":"af5c65483f5f29f174fd548f486845702958e4958f5800774ab1d56bfef55a4a"},"images/hud/tutorial/arrowleftright.png":{"hash":"0b95b7bb79866ea989fbeed7664372e31648ca492a6b96f08b19cb6e2a415e4d"},"images/hud/tutorial/arrowup.png":{"hash":"fce840cba2282b4562931387cbf305dec6ef81c32e3a7b0d996d85390af91975"},"images/hud/tutorial/bg.png":{"hash":"8f42bffe7aadf9aa6dd0f4a29c98af6504e7cba410cc33193fd3e9bd36b4dffe"},"images/hud/tutorial/touch.png":{"hash":"45d76af9389932d1d2b1246e7f0cb071d52116881d03bfa0b27ea4028f43a59d"},"images/env/snow/floor.jpg":{"hash":"c17a2caab7656c1d53513a4db765bc29165137eab8a14f8e4272c461afe93a4e"},"images/env/snow/horizon.png":{"hash":"512312a78f96bbccfc7c378fbb0d6bac4284f43edc1330565d511c7efe06cac7"},"images/env/snow/sky.jpg":{"hash":"22061bdb6928896c92e32566666da3e8cb2e3d296acf0a27915bdc1605bbff95"},"images/env/grass/floor.jpg":{"hash":"1d4679f5b81cba14f6076a545a316b1c1b74148b185c60fe583763d0529f821c"},"images/env/grass/horizon.png":{"hash":"8680e5c261d3da0baeb168704c3495c5b0229d0d7f0726364cf1e5504d0004fb"},"images/env/grass/sky.jpg":{"hash":"f5ce3b34904827dde389885df314d0c6dd817d882467c6f4dd2809e2f8380f6a"},"images/env/desert/floor.jpg":{"hash":"b494a2872c6e65740155d8aa4e005092652c6bc75c64b71898104ea751d87443"},"images/env/desert/horizon.png":{"hash":"89cdf2bf2368b040d9bf91307fd4a8c667db6fc6d0e5110ce49bb582c3eef884"},"images/env/desert/sky.jpg":{"hash":"2b172708cc5247d06eb51be79fae936295a980218179d10c2774366c0726cbd5"},"images/bgObjects/doorn1-big.png":{"hash":"8f693549454fe518e6c4ee05306fec58632f321ab251f33268c177f36efbd187"},"images/bgObjects/doorn1.png":{"hash":"84819e1a87ce145efa684af4a59defc52e701ae52a4653599ff4d6eb9d608cf9"},"images/bgObjects/doorn2-big.png":{"hash":"4ac8dde5f28aaa69ecc7889dc8719a574a3feddbfd01cb56872afad33d31daf6"},"images/bgObjects/doorn2.png":{"hash":"a76f38118350974fedf9d1c3f029e6665baf75fe0ee45656fac6287f205aa183"},"images/bgObjects/doorn3.png":{"hash":"5562b9481dcadd9f964c271ac57459f040cf895a1c3865c55aed3e0de6eb59e3"},"images/bgObjects/paddo1.png":{"hash":"5e685fc367c00781f621c38ed36b441092e8d119bd69cc48b29941071d6c10a3"},"images/bgObjects/paddo2.png":{"hash":"943c7abe1d4c8361d02fb5d4ebea205d1a7f6dd3850e079fa16d51d2f68606c1"},"images/bgObjects/paddo3.png":{"hash":"c2dd920ecc73b227035189bb014eabbb2b820d2f270c471b88e0b304f99e8c69"},"images/bgObjects/sidemonster01.png":{"hash":"3e8a5088b24c9e63e1018b7e86620d7479ae61853fc91111202d7b70fded4c25"},"images/bgObjects/sidemonster02.png":{"hash":"e56fecf2b3a93d751e37602f3e91cd60438f2494f6ffe7aef8fb34734c0cb30e"},"images/bgObjects/sidemonster03.png":{"hash":"2d45e350965c8282dbe94cc1d6ab2c838893a069cfd4a9923656d333c412e6cf"},"images/bgObjects/sidemonster04.png":{"hash":"15c96b0c3dd404e9cf190d2d272ce146ff3660ded201ea8dc37ca2f96760ed84"},"images/bgObjects/sidemonster05.png":{"hash":"50d9f21ff7f02280eb198450f10ecfb800d9d78c9941ba232e9ebbab8c0dc782"},"images/bgObjects/snow/boom1.png":{"hash":"4b1c8b214c5222c63f9ef83787aa34caa4acfcdfac2df435e33db1a043910ae7"},"images/bgObjects/snow/boom2.png":{"hash":"71bfe518717f8cb8780f4370723813443b5df5ecd12705880e1ec1f6fa1f8f6a"},"images/bgObjects/snow/boom3.png":{"hash":"4d7c3edcc856d9aaf892eee33fdd2e186bf2daaa0d8e59f6e02ff31d3a1f6cec"},"images/bgObjects/snow/boom4.png":{"hash":"b9c585b4d88df70d1c9659e76c76ebb5b6bf59fcf30d588266ba60d1b093edce"},"images/bgObjects/grass/boom1.png":{"hash":"6b0fa44087a179023f311d7ba59e4fb3b2d93d17b2357814da11468ad30550d6"},"images/bgObjects/grass/boom2.png":{"hash":"695082d190fd01d0c25e746a4413560771dc228f1d5a5171ea83abe2a51b088f"},"images/bgObjects/grass/boom3.png":{"hash":"4395b85ecd30968357be8ccc071c990f1c0df4887ea60ca03bddd02f79adc8b7"},"images/bgObjects/grass/boom4.png":{"hash":"df2f73f5f0ad69fdad380359f0ad84dfa892cdb5aca5e4076b24e3b71c2a6e21"},"images/bgObjects/desert/boom1.png":{"hash":"46fec923166a0199a1c630ac73a81eeb198e654e6056e27379ebeaf58cffdc34"},"images/bgObjects/desert/boom2.png":{"hash":"ecf85d2d7fcc8d8dfca7a01a78afda521901a34f8d591862334688a398baeb99"},"images/bgObjects/desert/boom3.png":{"hash":"4baa3e7e59459b073f647e3cb4e3f89e5d80ecd6c4c136d06a6e880055dceb86"},"images/bgObjects/desert/boom4.png":{"hash":"810e2d856ffa85e5fbe38c2db291cbd59579883c6667ec750867da780aba3b7d"},"images/bgObjects/desert/boom5.png":{"hash":"7caa30c3b1770d1b6664a6711717e087dc1f01c7867010fc7a9d7b018dfce2a1"}},
		FONTS: ["dimboitalic","dimboregular"],
		
		Point: function(x,y) {
			this.x = x;
			this.y = y;
		},
		
		isVisible: function() {
			return Visibility.state() == "visible";
		},
		
		addEventListener: function(event, cb) {
			var l = eventListenerList(event);
			
			var key;
			do {
				key = Math.floor(Math.random() * 10000000).toString();
			} while (l.hasOwnProperty(key));
			l[key] = cb;
			
			return key;
		},
		
		removeEventListener: function(event, listener) {
			var l = eventListenerList(event);
			if (typeof listener === "string") delete l[listener];
			else {
				for (key in l) {
					if (l[key] == listener) {
						delete l[key];
					}
				}
			}
		},
		
		dispatchEvent: function(event, args) {
			var l = eventListenerList(event);
			for (key in l) {
				var cb = l[key];
				try {
					cb.apply(null, args);
				} catch (e) {
					console.error("Error in event listener", e);
				}
			}
		},
		
		loadScript: function (url, done) {
			$.getScript(url)
				.done(function() {
					done(true);
				})
				.fail(function(jqxhr, settings, exception) {
					done(false, exception);
				});
		},
		
		setCursor: function(cursor) {
			$(document.body).css("cursor", cursor);
		},
		
		createBuffer: function(width,height) {
			var buf = document.createElement("canvas");
			buf.width = width;
			buf.height = height;
			return buf;
		},
		
		fullscreenSupported: screenfull.enabled,
		
		isFullscreen: function() {
			return screenfull.isFullscreen;
		},
		
		setFullscreen: function(fs) {
			if (fs == this.isFullscreen) return;
			if (fs) screenfull.request();
			else screenfull.exit();
		},
		
		storagePut: function(key, value) {
			var v;
			var arryu = [];
			switch (typeof value) {
				case "string":
				case "number":
				case "boolean":
					v = value.toString();
					//arryu.push(v);
					//alert(v.pixelkaiju.runner.eggs);
					//console.log(arryu[1][0]);
					break;
				case "object":
					v = JSON.stringify(value);
					
					break;
				default:
					throw new Error("Can't store value of type " + typeof value);
			}
			window.localStorage.setItem(this.namespace + "." + key, v);
			
			if((this.namespace + "." + key) == 'pixelkaiju.runner.eggs'){
				updateShareScore(v);
			}
		},
		
		storageGetString: function(key, fallback) {
			var k = this.namespace + "." + key;
			var v = window.localStorage.getItem(k);
						
			if (v == null) return fallback;
			else return v;
		},
		
		storageGetBoolean: function(key, fallback) {
			var k = this.namespace + "." + key;
			var v = window.localStorage.getItem(k);
			if (v == null) return fallback;
			else return v == "true";
		},
		
		storageGetNumber: function(key, fallback) {
			var k = this.namespace + "." + key;
			var v = window.localStorage.getItem(k);

			if (v == null) return fallback;
			else return parseFloat(v);
		},
		
		storageGetObject: function(key, fallback) {
			var k = this.namespace + "." + key;
			var v = window.localStorage.getItem(k);
			if (v == null) return fallback;
			else return JSON.parse(v);
		}
		
		// TODO focus property and listener
		
	};

	$.extend(tortilla.Point.prototype, {
		x: 0,
		y: 0
	});
	
	window.tortilla = tortilla;
	
	tortilla.parameters = {
		all: parseUrl().params,
		
		has: function(key) {
			return this.all.hasOwnProperty(key);
		},
		
		get: function(key, fallback) {
			if (this.has(key)) return this.all[key];
			else return fallback;
		}
	};
	
	var preInitSteps = 2;
	
	Visibility.onVisible(function() {
		if (Visibility.isSupported()) {
			Visibility.change(function(e) {
				tortilla.dispatchEvent(tortilla.EV_VISIBILITY_CHANGED, [tortilla.isVisible()]);
			});
		}
		initStepDone();
	});
	
	if (screenfull.enabled) {
		$(document).on(screenfull.raw.fullscreenchange, function () {
			tortilla.dispatchEvent(tortilla.EV_FULLSCREEN_CHANGED, [tortilla.isFullscreen()]);
		});
	}
	
	function initStepDone() {
		preInitSteps--;
		if (preInitSteps == 0) start();
	}
	
	$(document).ready(function() {
		if (tortilla.FONTS.length == 0) initStepDone();
		else {
			trace("Loading fonts");
			WebFont.load({
				custom: {
					families: tortilla.FONTS,
					urls: ["fonts.css?v=" + tortilla.BUILD_TIME]
				},
				active: function() {
					trace("Fonts loaded");
					initStepDone();
				},
				inactive: function() {
					trace("Fonts not loaded");
					initStepDone();
				}
			});
		}
	});
	
	function start() {
		
		var game = tortilla.game;

		var gs = typeof(game.settings) === "function" ? game.settings() : {};
		tortilla.namespace = gs.namespace;
	
		var jCanvas = $("<canvas/>");
		$(document.body).append(jCanvas);
		
		var canvas = jCanvas[0];
		tortilla.canvas = canvas;

		var context;
		var ct;
		var ctReal;
		if (gs.tryWebGL && "WebGLRenderingContext" in window) {
			context = canvas.getContext("webgl");
			if (context != null) {
				ct = ctReal = "webgl";
			} else {
				context = canvas.getContext("experimental-webgl");
				if (context != null) {
					ct = "webgl";
					ctReal = "experimental-webgl";
				} else {
					ct = ctReal = "2d";
				}
			}
		} else {
			ct = ctReal = "2d";
		}
		tortilla.context = canvas.getContext(ctReal);
		tortilla.contextType = ct;
		
		var meter = null;
		if (gs.showFps) {
			meter = new FPSMeter();	
		}
		
		var win = $(window);
		
		var dpr;
		if (window.devicePixelRatio) dpr = window.devicePixelRatio;
		else dpr = 1;
		
		tortilla.windowToCanvas = function(x, y) {
			return new tortilla.Point(x*dpr,y*dpr);
		};
		
		function sizeCanvas() {
			
			var ww = window.innerWidth;
			var wh = window.innerHeight;
			
			trace("canvas size " + ww + "x" + wh);
		
			canvas.width = ww * dpr;
			canvas.height = wh * dpr;
			
			if (dpr != 1) {
				jCanvas.css({width: ww + "px", height: wh + "px"});
			}
			
			tortilla.dispatchEvent(tortilla.EV_RESIZED, []);
			
		}
		win.resize(sizeCanvas);
		sizeCanvas();
		
		// prevent input events
		function pd(e) {
			if (!document.hasFocus()) window.focus();
			e.preventDefault();
		}
		document.addEventListener("click", pd);
		document.addEventListener("dblclick", pd);
		document.addEventListener("mousedown", pd);
		document.addEventListener("mouseup", pd);
		
		document.addEventListener("touchcancel", pd);
		document.addEventListener("touchend", pd);
		document.addEventListener("touchenter", pd);
		document.addEventListener("touchleave", pd);
		document.addEventListener("touchmove", pd);
		document.addEventListener("touchstart", pd);
		
//		document.addEventListener("keydown", kpd);
//		document.addEventListener("keyup", kpd);
//		document.addEventListener("keypress", kpd);
		
		if (typeof(game.init) === "function")
			game.init();
		
		if (typeof(game.frame) === "function") {
	
			var preciseTime = "performance" in window && "now" in window.performance;
			trace("Using precision timer: " + preciseTime);
			var time = preciseTime ? performance.now() : Date.now();
			function frame() {
				
				var context = tortilla.context;
//				var context = canvas.getContext(ctReal);
				
				var now = preciseTime ? performance.now() : Date.now();
				var dt = Math.max(0.0001, Math.min(1/15, (now-time)/1000));
				time = now;
				
				try {
					if (meter != null) meter.tick();
					game.frame(context, dt);
				} catch (e) {
					console.log("Error in frame", e);
					if (e instanceof Error && e.stack) console.error(e.stack);
					debugger;
					//if (42 < 1) alert("The end is here"); // you can place a breakpoint on this line
				}
				requestAnimationFrame(frame);
			
			}
			requestAnimationFrame(frame);
		
		}
		
	}
	
	function parseUrl() {

		// url params and self url
		var params = {};
		console.log(location);
		var selfUrl = location.href;
		for (var i = 0; i < 2; i++) {

			// # params come after ? params, so do # first (working from the back of the url string)
			var parChar = i == 0 ? "#" : "?";

			// extract param string
			var qin = selfUrl.indexOf(parChar);
			if (qin != -1) {
		
				var urlPartParams = selfUrl.substr(qin+1);
				selfUrl = selfUrl.substr(0, qin);
		
				// parse param string
				var pairs = urlPartParams.split("&");
				$.each(pairs, function(i,pair) {
					var parts = pair.split("=");
					params[decodeURIComponent(parts[0])] = parts.length > 1 ? decodeURIComponent(parts[1]) : null;	
				});
		
			}	

		}
		trace("Self URL: " + selfUrl);
		trace("Params");
		console.log(params);

		return {
			params: params,
			selfUrl: selfUrl
		};

	}

})();
