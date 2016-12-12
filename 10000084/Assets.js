/**
	Class Assets
**/
function Assets(){

}
Assets.loadingOverlay =  new RDOMComponent("div");
Assets.loadingOverlay.base().style.top = "0";
Assets.loadingOverlay.base().style.left = "0";
Assets.loadingOverlay.base().style.width = "100%";
Assets.loadingOverlay.base().style.height = "100%";
Assets.loadingOverlay.base().style.zIndex = "1000";
Assets.loadingOverlay.base().style.textAlign="center";
Assets.loadingOverlay.base().style.backgroundColor = "rgba(0,0,0,0.5)";

/*Assets.loadingAnimation = new RImage();
Assets.loadingAnimation.Load(Util.ImageURL("loading.gif"));
Assets.loadingAnimation.base().style.left = "50%";
Assets.loadingAnimation.base().style.top = "50%";
Assets.loadingAnimation.base().style.marginTop = "-24px";
Assets.loadingAnimation.base().style.marginLeft = "-24px";
Assets.loadingOverlay.node().AppendNode(Assets.loadingAnimation.node());
*/

Assets.loadingText = new RDOMComponent("div");
Assets.loadingText.base().style.color = "#ffffff";
Assets.loadingText.base().style.left = "50%";
Assets.loadingText.base().style.top = "50%";
Assets.loadingText.base().style.marginTop = "24px";
Assets.loadingText.base().style.marginLeft = "-8px";
Assets.loadingOverlay.node().AppendNode(Assets.loadingText.node());
Assets.loadedImages = new Object();
Assets.imageQueue = [];
/* Override this */
Assets.onload = function(){};
Assets.loadedImageCount = 0;
Assets.totalImages = 0;

Assets.Push = function(url){
	Assets.imageQueue.push(url);
};
Assets.GetImage = function(url){
	//var image = new RImage(Assets.loadedImages[url].base().cloneNode(true));
	//var image = new RImage(Assets.loadedImages[url]);
	var cache = Assets.loadedImages[url];
	if(cache==null || cache==undefined) throw "Image not found: "+url;
	var image = new RDOMComponent("canvas");
	image.base().width = cache.width;
	image.base().height = cache.height;
	var imageContext2d = image.base().getContext('2d');
	imageContext2d.drawImage(cache, 0, 0);
	return image;
}
Assets.Load = function(url, batch){

	var image = new RImage();
	image.events().AddEventListener(REvent.COMPLETE,function(event){
		//test
		Assets.loadedImageCount++; 
		var canvas = document.createElement('canvas');
		canvas.width = image.base().width;
		canvas.height = image.base().height;
		var context2d = canvas.getContext('2d');
		context2d.drawImage(image.base(), 0, 0);
		//alert(canvas.toDataURL());
		Assets.loadedImages[url] = canvas;
		//Assets.loadedImages[url] = image;
		Assets.LoadAll(batch, false);
	});
	image.events().AddEventListener(REvent.FAILED,function(event){
		Assets.Load(event.data(), batch);
	});
	image.Load(url);
}
Assets.ClearAll = function(){
	Assets.loadedImages = new Object();
}
Assets.LoadAll = function(batch, first){ // jgn utek2 first
	if(first!=false){
		container.node().parent().AppendNode(Assets.loadingOverlay.node());
		Assets.loadedImageCount = 0; 
		Assets.totalImages = Assets.imageQueue.length; 
	}
	if(Assets.imageQueue.length > 0){
		if(!batch){
			Assets.Load(Assets.imageQueue.shift(), batch);
		}else{
			while(Assets.imageQueue.length>0){
				Assets.Load(Assets.imageQueue.shift(), batch);
			}
		}
	}else{
		if(Assets.loadedImageCount == Assets.totalImages){
			container.node().parent().RemoveNode(Assets.loadingOverlay.node());
			Assets.onload();
		}
	}
	Assets.loadingText.base().innerHTML = Math.floor(Assets.loadedImageCount / Assets.totalImages * 100) + "%";
}
/**
	Class SoundAssets
**/
function SoundAssets(){
	
}
SoundAssets.sounds = {};
SoundAssets.Load = function(url, loop){
	SoundAssets.sounds[url] = new Audio();
	SoundAssets.sounds[url].type = "audio/mpeg";
	SoundAssets.sounds[url].src = url;
	SoundAssets.sounds[url].onstalled = function(){
		SoundAssets.sounds[url].load();
	}
	SoundAssets.sounds[url].load();
	if(loop){
		SoundAssets.sounds[url].addEventListener('ended', function(){ this.currentTime = 0;}, false);
	}
};
SoundAssets.Get = function(url){
	return SoundAssets.sounds[url];
}
/**
	Class SoundController
**/
function SoundController(){
	
}
SoundController._mute = false;
SoundController.Mute = function(){
	SoundController._mute = true;
}
SoundController.Unmute = function(){
	SoundController._mute = false;
}
SoundController.Play = function(audio){
	if(!SoundController.IsPlaying(audio) && !SoundController._mute){
		audio.play();  
	}
}
SoundController.Pause = function(audio){
	audio.pause();  
}
SoundController.IsPlaying = function(audio){
	return !audio.paused;  
}
