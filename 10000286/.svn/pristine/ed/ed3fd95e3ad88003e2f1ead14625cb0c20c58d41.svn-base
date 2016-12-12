/**
Details and examples:
http://thinkpixellab.com/pxloader/
The MIT License
Copyright (c) 2012 Pixel Lab
**/

function PxLoaderImage(a,i,f){var h=this,g=null;this.img=new Image();this.tags=i;this.priority=f;var b=function(){if(h.img.readyState=="complete"){c();g.onLoad(h)}};var e=function(){c();g.onLoad(h)};var d=function(){c();g.onError(h)};var c=function(){h.unbind("load",e);h.unbind("readystatechange",b);h.unbind("error",d)};this.start=function(j){g=j;h.bind("load",e);h.bind("readystatechange",b);h.bind("error",d);h.img.src=a};this.checkStatus=function(){if(h.img.complete){c();g.onLoad(h)}};this.onTimeout=function(){c();if(h.img.complete){g.onLoad(h)}else{g.onTimeout(h)}};this.getName=function(){return a};this.bind=function(j,k){if(h.img.addEventListener){h.img.addEventListener(j,k,false)}else{if(h.img.attachEvent){h.img.attachEvent("on"+j,k)}}};this.unbind=function(j,k){if(h.img.removeEventListener){h.img.removeEventListener(j,k,false)}else{if(h.img.detachEvent){h.img.detachEvent("on"+j,k)}}}}PxLoader.prototype.addImage=function(c,b,d){var a=new PxLoaderImage(c,b,d);this.add(a);return a.img};