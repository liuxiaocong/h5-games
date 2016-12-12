var ExternalAPI =
{
	type: "default",
	
	init: function()
	{
	},
	
	exec: function()
	{
	    var method = arguments[0];
	    if(method == "exec" || (typeof ExternalAPI[method] != "function")) return;
	    return ExternalAPI[method].apply(ExternalAPI, Utils.getFunctionArguments(arguments, 1));
	},
	
	check: function()
	{
		return false;
	},
	
	openWidget: function()
	{
	},
	
	closeWidget: function()
	{
	},
	
	getMoreGamesURL: function(a, b)
	{
		return "http://playtomax.com/";
	},
	
	getPreloaderURL: function()
	{
	    return "http://playtomax.com/";
	},
	
	showCopyright: function() 
	{
	},
	
	showCompanyLogo: function(callback) 
	{
		if (callback) callback();
	},
	
	showAds: function()
	{
	    var href = window.location.href;
	    if(href.indexOf("http://playtomax.com") == 0 || href.indexOf("https://playtomax.com") == 0)
	    {
	        if(window.GoogleIMA) GoogleIMA.show();
	    }
	}
};