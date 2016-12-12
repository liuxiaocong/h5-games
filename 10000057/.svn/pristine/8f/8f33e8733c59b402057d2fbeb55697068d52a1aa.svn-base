window.addEventListener("message", receiveMessage, false);

var customOrientation = window.orientation || undefined;
var mobile = {};

mobile.sendMeta = function(value){
    console.log('send meta');
    parent.postMessage(
        {
            value:value,
            type: 'changeMeta'
        },
        "*"
    );
}


function receiveMessage(event)
{
    console.log('message received');
    console.log(event.data);

    if(typeof event.data.width != 'undefined' && typeof event.data.height != 'undefined'){
        mobile.width = event.data.width;
        mobile.height =  event.data.height;
    }
    if(event.data.orientation != undefined){
        console.log('push orientation: '+event.data.orientation);
        customOrientation = event.data.orientation;

        var evt = document.createEvent('Events');
        evt.initEvent('orientationchange', true, true);
        window.dispatchEvent(evt);

    }
}

parent.postMessage(
    {
        ready:true,
        type:'ready'
    },
    "*"
);