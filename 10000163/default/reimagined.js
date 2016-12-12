var adobeGnavProps = adobe.dom.GNav();
if(!!adobeGnavProps.InjectCSS)
{
	adobe.dom.injectFile(adobeGnavProps.CDN+'/assets/globalnav/'+adobeGnavProps.Version+'/css/globalnav.css','css');
}
document.writeln('\x3Cscript src="'+adobeGnavProps.CDN+adobeGnavProps.JSFile+'">\x3C/script>');
