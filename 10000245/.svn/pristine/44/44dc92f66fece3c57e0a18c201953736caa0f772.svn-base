window.addEventListener('DOMContentLoaded',function(){
	'use strict';
	var css = '.qike-mobile-slide ul li,.qike-mobile-slide ul{padding:0;margin:0;list-style:none}.qike-mobile-slide a, .qike-mobile-slide span{text-decoration:none;color:#5D5D5D;font-size:16px;font-family:"Microsoft Yahei"}.qike-mobile-slide .qike-mobile-slide-dj{width:25px;height:55px;position:absolute;top:130px;right:100%}.qike-mobile-slide{z-index: 9999;-webkit-transition: all .25s ease-in-out; -moz-transition: all .25s ease-in-out; -o-transition: all .25s ease-in-out; -ms-transition: all .25s ease-in-out;transition: all .25s ease-in-out;width:185px;position:absolute;right:-185px;top:0px}.qike-mobile-slide-show{right: 0px;}.qike-mobile-slide .qike-mobile-slide-header{width:185px;height:25px}.qike-mobile-slide .qike-mobile-slide-lists{height:auto;background:#ECECEC;width:185px;margin-top:0}.qike-mobile-slide .qike-mobile-slide-bh{width:185px;height:40px;border-bottom:1px #C0BFBF solid}.qike-mobile-slide .qike-mobile-slide-backs{background:url("http://i.7k7kimg.cn/7ksite/component/qike-mobile-slide/back.png") left  no-repeat;float:left;line-height: 40px;margin-left:25px}.qike-mobile-slide .qike-mobile-slide-backs span{margin-left:10px}.qike-mobile-slide .qike-mobile-slide-homes{float:right;background:url("http://i.7k7kimg.cn/7ksite/component/qike-mobile-slide/home.png") left  no-repeat;line-height: 40px;margin-right:25px}.qike-mobile-slide .qike-mobile-slide-homes a{margin-left:15px}.qike-mobile-slide .qike-mobile-slide-lists ul{line-height:40px}.qike-mobile-slide .qike-mobile-slide-lists ul li{border-bottom:1px #C0BFBF solid;padding-left: 20px; height: 43px; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 185px;}.qike-mobile-slide .qike-mobile-slide-lists ul li a{}';
	var html = '<div class="qike-mobile-slide"><div class="qike-mobile-slide-header"><img src="http://i4.7k7kimg.cn/7ksite/component/qike-mobile-slide/header.jpg" width="185" height="25" /></div><div class="qike-mobile-slide-lists"><div class="qike-mobile-slide-bh"><div class="qike-mobile-slide-backs qike-mobile-slide-clicks"><span>返回</span></div><div class="qike-mobile-slide-homes"><a href="http://m.7k7k.com/">首页</a></div></div><ul><li><a href="http://flash.7k7k.com/h5/20140708/3dbear/game.html">微信游戏-3D熊出没</a></li><li><a href="http://flash.7k7k.com/h5/20140708/eye/game.html">微信游戏-最强眼力</a></li><li><a href="http://flash.7k7k.com/h5/20140708/guan2048/index.html">微信游戏-官场2048</a></li><li><a href="http://flash.7k7k.com/h5/20140711/sister/game.htm">测测闺蜜另一面</a></li><li><a href="http://flash.7k7k.com/h5/20140708/noone/index.html">一个都不能死</a></li></ul></div><div class="qike-mobile-slide-dj qike-mobile-slide-clicks"><img src="http://i4.7k7kimg.cn/7ksite/component/qike-mobile-slide/dj.png" width="25" height="55"></div></div>';
	var h, b;


	/**
	 * 返回指定标签的第一个内容
	 * @param  {String} tagName 标签名
	 * @return {DOM}         对应的dom节点
	 */
	function getTag(tagName){
		return document.getElementsByTagName(tagName)[0];
	}

	/**
	 * 往指定dom插入节点（以string的方式）
	 * @param  {String} htmlStr html string
	 * @param  {DOM} target  目标节点
	 * @return {undefined}         undefined
	 */
	function append(htmlStr,target){
		var frag = document.createElement('div'),dom, i, len;

		frag.innerHTML = htmlStr;

		// 转换为数组
		dom = [].slice.call(frag.childNodes);

		for(i=0,len=dom.length;i<len;i++){
			target.appendChild(dom[i]);
		}
	}

	/**
	 * 事件注册
	 * @param  {string}   selector  query selector 的语法规则书写
	 * @param  {string}   eventType w3c的事件类型
	 * @param  {Function} callback  事件回调
	 * @return {undefined}             undefined
	 */
	function event(selector,eventType,callback){
		var doms = [].slice.call( document.querySelectorAll(selector) );
		doms.forEach(function(dom,index){
			dom.addEventListener(eventType,callback,false);
		});
	}

	// 一系列对class的操作
	var classAction = {
		// 判断是否支持classList属性
		isSupportClassList:!!getTag('body').classList,

		/**
		 * 判断指定节点的class中是否包含某一个clasName
		 * @param  {DOM} dom       指定节点
		 * @param  {String} className 样式名
		 * @return {Boolean}           是否包含，true==>包含，false==>不包含
		 */
		contains:function(dom,className){
			var classNames,isContains=false;
			if(this.isSupportClassList){
				return dom.classList.contains(className);
			}else{
				classNames = dom.className.split(' ');
				classNames.forEach(function(cn){
					if(cn === className){
						isContains = true;
					}
				});
				return isContains;
			}
		},

		/**
		 * 给指定dom节点添加class
		 * @param {DOM} dom       指定节点
		 * @param {String} className 样式名
		 */
		add:function(dom,className){
			if(this.isSupportClassList){
				dom.classList.add(className);
			}else{
				if(!this.contains(className)){
					dom.className = dom.className+' '+className;
				}
			}
		},

		/**
		 * 从指定dom节点移除某一个class，如果没有则跳过，不报错
		 * @param  {DOM} dom       指定节点
		 * @param  {String} className 样式名
		 * @return {undefined}           undefined
		 */
		remove:function(dom,className){
			var reg;
			if(this.isSupportClassList){
				dom.classList.remove(className);
			}else{
				reg = new RegExp('\\s?'+className,'g');
				dom.className = dom.className.replace(reg,'');
			}
		}
	}

    /*  暂时关闭
	h = getTag('head'), b = getTag('body');

	append('<style type="text/css">'+css+'</style>',h);

	append(html,b);

	event('.qike-mobile-slide-clicks','touchstart',function(e){

		// 不阻止默认行为的话，可能会造成touchstart事件的延续，
		// 使得右边内容滑动出来的时候，链接被持续的点击触发到
		e.preventDefault();

		var slide = document.querySelector('.qike-mobile-slide');
		var cn = 'qike-mobile-slide-show';

		if( classAction.contains(slide,cn) ){
			classAction.remove(slide,cn);
		}else{
			classAction.add(slide,cn);
		}

	});
    */

});
