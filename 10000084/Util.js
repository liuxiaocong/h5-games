/****************************************************
Racoon.js 1.1.0
CV Racoongames
@2014
****************************************************/

/**
	class Util
**/
function Util(){

}
Util._imagePrefixURL = "";
Util._device = -1;
Util.DEVICE_IPHONE = 0;
Util.DEVICE_IPOD = 1;
Util.DEVICE_IPAD = 2;
Util.DEVICE_ANDROID = 3;
Util.DEVICE_DESKTOP = 4;
Util.GetStageSize = function(){
	var myWidth = 0, myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	}
	myWidth = window.innerWidth;
	myHeight = window.innerHeight;
	return {width:myWidth, height:myHeight};
};
Util.SetImagePrefixURL = function(url){
	Util._imagePrefixURL = url;
};
Util.ImageURL = function(url){
	return Util._imagePrefixURL+"/"+url;//"assets/images/" + Util.quality + "/" + url;
};
Util.GetDeviceType = function(){
	if(Util._device != -1){
		return Util._device;
	}
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.search("iphone") > -1){
		Util._device = Util.DEVICE_IPHONE;
	}else if(userAgent.search("ipod") > -1){
		Util._device = Util.DEVICE_IPOD;
	}else if(userAgent.search("ipad") > -1){
		Util._device = Util.DEVICE_IPAD;
	}else if(userAgent.search("android") > -1){
		Util._device = Util.DEVICE_ANDROID;
	}else{
		Util._device = Util.DEVICE_DESKTOP;
	}
	return Util._device;
};
/*
 * SharedObject class
 */
function SharedObject(key, data){
	this._data = data;
	this._key = key;
}
SharedObject.prototype.data = function(){
	return this._data;
}
SharedObject.prototype.Flush = function(){
	var data = JSON.stringify(this._data);
	try{
		localStorage.setItem(this._key, data);
	}catch(e){
		console.log(e.message);
	}
};
SharedObject.GetLocal = function(key){
	var data = localStorage.getItem(key);
	if(data == null){
		data = {};
	}else{
		data = JSON.parse(data);
	}
	return new SharedObject(key, data);
};


/*SoundController.PlayMusic = function(path, loop){
	if(SoundController.musics[path]!=null) {
		SoundController.musics[path].play(0);
		return;
	}
	if(loop==null) loop = false;
	var bgm = new Audio(path);
	bgm.play(0);  
	SoundController.musics[path] = bgm;
	if(loop){
		bgm.addEventListener('ended', function(){
			this.currentTime = 0;
		}, false);
	}
}
SoundController.PauseMusic = function(path){
	if(SoundController.musics[path] == null){
		throw "Music not found";
	}
	SoundController.musics[path].pause();
}

SoundController.PlaySound = function(path){
	if(SoundController.sounds[path]!=null) {
		if(SoundController.sounds[path].paused){

			SoundController.sounds[path].play(); 
			return;
		}
		
	}
	var sfx = new Audio(path);
	sfx.play();  
	SoundController.sounds[path] = sfx;
	sfx.onload = function(){
		alert(sfx.buffered.length);	
	}
}*/