var adobeid = {
uses_redirect_mode: true,
client_id: adobeGnavProps.ImsClientId,
target_env: (typeof adobeGnavLandscape != 'undefined') ? adobeGnavLandscape : '',
scope: (typeof adobeGnavScope != 'undefined') ? adobeGnavScope : 'creative_cloud,AdobeID,openid,gnav,read_organizations',
is_mandatory_sign_in: (typeof adobeGnavSignIn != 'undefined') ? adobeGnavSignIn : false,
api_parameters: (typeof adobeGnavApiParams != 'undefined') ? adobeGnavApiParams : null,
onProfile: function(profile)
{
try
{
window.profile = profile;
if(profile)
{
adobe.dom.signIn();
adobe.dom.profile(profile);
}
else
{
adobe.dom.signOut();
}
}
catch(e){}
},
onError: function(error)
{
return false;
}
};
if(typeof adobeGnavRedirectUrl != 'undefined')
{
adobeid.redirect_uri = adobeGnavRedirectUrl;
}
var adobeGlobalNav = new window.AdobeGlobalNav({
adobeid: adobeid,
progressiveEnhancement: (typeof adobeGnavPE != 'undefined') ? adobeGnavPE : true,
defaultSitemapSection: (typeof adobeGnavSitemap != 'undefined') ? adobeGnavSitemap : 'explore-products',
locale: adobeGnavProps.Locale,
parentSelector: '.site-header-global-menu',
sections: ['sitemap', 'search', 'profile', 'logo'],
signIn: function(done)
{
adobe.dom.signIn();
done();
},
signOut: function(done)
{
adobe.dom.signOut();
done();
}
});
var gnavImsPrefix = 'https://adobeid-na1'+adobeGnavProps.ImsJS+'.services.adobe.com',
gnavImsFile = gnavImsPrefix+'/ims/imslib.js?client_id='+adobeGnavProps.ImsClientId+'&locale='+adobeGnavProps.Locale;
document.writeln('\x3Cscript src="'+gnavImsFile+'">\x3C/script>');
