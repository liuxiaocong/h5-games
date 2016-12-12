/** @class
 *  @description Класс аудио-канала
 */
function AudioPlayer()
{
	this.disabled = false;
	this.basePath = "";
	
	this.mp3Support = true;
	
	this.delayPlay = false;
	
	this.audioWrapper = null;
	
	this.locked = false;
	this.busy = false;
	
	this.startPlayTime = 0;
	
	this.onend = null;
	
	this.controlPlay = Utils.proxy(this.controlPlay, this);
}

/** @ignore */
AudioPlayer.prototype.createNewAudio = function()
{
	if(AudioMixer.isWebAudioSupport())
	{
		var sound = AudioMixer.waContext.createBufferSource();
		sound.connect(AudioMixer.waContext.destination);
		return sound;
	}
	else
	{
		return document.createElement('audio');
	}
};

/** @ignore */
AudioPlayer.prototype.init = function(path)
{
	this.basePath = path ? path : "";
	this.delayPlay = ("ontouchstart" in window);
	this.audioWrapper = this.createNewAudio();
	
	var test = document.createElement('audio');
	
	if(test.canPlayType) this.mp3Support = test.canPlayType('audio/mpeg') != "";
	else this.disabled = true;
	
	return !this.disabled;
};

/** @ignore */
AudioPlayer.prototype.play = function(file, loop)
{
	if(this.disabled) return false;
	
	var url = this.basePath + "/" + file + (this.mp3Support ? ".mp3" : ".ogg");
	
	this.stop();
	
	this.audioWrapper = this.createNewAudio();
	this.audioWrapper.doLoop = (loop ? true : false);
	this.audioWrapper.fileName = file;
	
	if(AudioMixer.isWebAudioSupport())
	{
		var self = this;
		
		this.loadSound(url, function(buffer)
		{
			self.audioWrapper.buffer = buffer; 
			self.audioWrapper.noteOn ? self.audioWrapper.noteOn(0) : self.audioWrapper.start(0);
			self.startPlayTime = new Date().getTime();
			
			self.audioWrapper.loop = loop;
			
			if(typeof self.audioWrapper.playbackState != "undefined")
			{
			    self.waCheckInterval = setInterval(function()
                {
                    if(!self.audioWrapper)
                    {
                        clearInterval(self.waCheckInterval);
                        return;
                    }
                    
                    if(self.audioWrapper.playbackState == self.audioWrapper.FINISHED_STATE)
                    {
                        self.controlPlay();
                    }
                }, 100);
			}
			else self.audioWrapper.onended = self.controlPlay;
		});
	}
	else
	{
		this.audioWrapper.src = url;
		this.audioWrapper.type = (this.mp3Support ? "audio/mpeg" : "audio/ogg");
		this.audioWrapper.loop = false;
		this.audioWrapper.preload = "auto";
		this.audioWrapper.load();
		
		if(this.delayPlay)
		{
			this.audioWrapper.addEventListener("canplay", this.readyToPlay);
			this.audioWrapper.addEventListener("canplaythrough", this.readyToPlay);
		}
		else this.audioWrapper.play();
		
		this.audioWrapper.addEventListener("ended", this.controlPlay, false);
	}
	
	this.busy = true;
	this.startPlayTime = new Date().getTime();
};

/** @ignore */
AudioPlayer.prototype.loadSound = function(url, callback)
{
	if(AudioMixer.buffer[url])
	{
		if(callback) callback(AudioMixer.buffer[url]);
		return;
	}
	
	var request = new XMLHttpRequest(); 
	request.open('GET', url, true); 
	request.responseType = 'arraybuffer';

	request.onload = function()
	{ 
		AudioMixer.waContext.decodeAudioData(this.response, function(buffer)
		{
			AudioMixer.buffer[url] = buffer;
			if(callback) callback(buffer);
		}); 
	} ;
	request.send();
};

/** @ignore */
AudioPlayer.prototype.readyToPlay = function(e)
{
	if(e.currentTarget.alreadyLoaded) return;
	e.currentTarget.alreadyLoaded = true;
	 
	e.currentTarget.play();
};

/**
 * Остановка проигрывания
 */
AudioPlayer.prototype.stop = function()
{
	this.busy = false;
	
	try
	{
		if(AudioMixer.isWebAudioSupport())
		{
			this.audioWrapper.noteOff ? this.audioWrapper.noteOff(0) : this.audioWrapper.stop(0);
			this.audioWrapper = null;
		}
		else
		{
			this.audioWrapper.removeEventListener("canplay", this.readyToPlay);
			this.audioWrapper.removeEventListener("canplaythrough", this.readyToPlay);
			this.audioWrapper.pause();
			this.audioWrapper.currentTime = 0.0;
			this.audioWrapper = null;
		}
	}
	catch(e) {};
};

/**
 * Пауза проигрывания
 */
AudioPlayer.prototype.pause = function()
{
	if(AudioMixer.isWebAudioSupport())
	{
		if(this.audioWrapper) this.audioWrapper.disconnect();
	}
	else
	{
		this.audioWrapper.pause();
	}
};

/**
 * Возобновление проигрывания
 */
AudioPlayer.prototype.resume = function()
{
	if(AudioMixer.isWebAudioSupport())
	{
		if(this.audioWrapper)
		{
			try {this.audioWrapper.connect(AudioMixer.waContext.destination);}
			catch (e) {};
		}
	}
	else
	{
		this.audioWrapper.play();
	}
};

/** @ignore */
AudioPlayer.prototype.controlPlay = function()
{
	if(!this.audioWrapper) return;
	
	if(this.audioWrapper.doLoop)
	{
		if(!AudioMixer.isWebAudioSupport())
		{
			if(Utils.isFirefox())
			{
				this.play(this.audioWrapper.fileName, true);
			}
			else
			{
				this.audioWrapper.currentTime = 0;
				this.audioWrapper.play();
			}
		}
	}
	else
	{
		this.busy = false;
		if(typeof this.onend == "function") this.onend();
		if(this.waCheckInterval)
		{
			clearInterval(this.waCheckInterval);
		}
	}
};

/**
 * Получение текущей позиции проигрывания
 */
AudioPlayer.prototype.getPosition = function()
{
	if(AudioMixer.isWebAudioSupport())
	{
		if(!this.startPlayTime) return 0;
		
		var duration = this.getDuration();
		if(!duration) return 0;
		
		var position = ((new Date().getTime()) - this.startPlayTime)/1000;
			
		if(position <= duration) return position;
		
		if(!this.audioWrapper.doLoop) return duration;
		
		return position - Math.floor(position/duration)*duration;
	}
	else
	{
		return this.audioWrapper.currentTime ? this.audioWrapper.currentTime : 0;
	}
};

/**
 * Получение общей длительности звука
 */
AudioPlayer.prototype.getDuration = function()
{
	if(AudioMixer.isWebAudioSupport())
	{
		return this.audioWrapper.buffer ? this.audioWrapper.buffer.duration : 0;
	}
	else
	{
		return this.audioWrapper.duration ? this.audioWrapper.duration : 0;
	}
};


/**
 * @class
 * @description Класс звукового микшера
 * @param {Object} path базовый путь к звуковым файлам
 * @param {Object} channelsCount количество звуковых каналов
 */
function AudioMixer(path, channelsCount)
{
	this.singleChannelMode = false;
	
	this.channels = [];
	
	this.init(path, channelsCount);
}

/** @ignore */
AudioMixer.prototype.init = function(path, channelsCount)
{
	if(AudioMixer.isWebAudioSupport())
	{
		AudioMixer.waContext = new window.AudioContext();
		var buffer = AudioMixer.waContext.createBuffer(1, 1, 22050);
		var sound = AudioMixer.waContext.createBufferSource();
		sound.buffer = buffer;
		sound.connect(AudioMixer.waContext.destination);
		
		sound.noteOn ? sound.noteOn(0) : sound.start(0);
	}
	
	if(!AudioMixer.isWebAudioSupport() && navigator.userAgent.toLowerCase().indexOf("mac") != -1)
	{
		this.singleChannelMode = true;
		channelsCount = 1;
	}
	
	this.path = path;
	
	this.channels = [];
	for(var i=0; i<channelsCount; i++)
	{
		this.channels[i] = new AudioPlayer();
		this.channels[i].init(path);
	}
	
	Utils.addEventListener("hidewindow", Utils.proxy(this.pauseOnHide, this));
	Utils.addEventListener("showwindow", Utils.proxy(this.resumeOnShow, this));
};

AudioMixer.prototype.pauseOnHide = function()
{
    for(var i=0; i<this.channels.length; i++)
    {
        this.channels[i].pause();
    }
};

AudioMixer.prototype.resumeOnShow = function()
{
    for(var i=0; i<this.channels.length; i++)
    {
        this.channels[i].resume();
    }
};

/**
 * Проигрывание звука
 * @param {String} file название файла без расширения (!)
 * @param {Boolean} loop нужно ни зацикливать звук
 * @param {Boolean} soft "щадящее" проигрывание: false: звук будет проигран в любом случае, даже если при этом займет "чужой" канал. true - звук будет проигран только в случае наличия свободного канала.
 * @param {Number} [channelID] номер канала, на котором нужно проиграть звук
 * @returns {AudioPlayer} канал
 */
AudioMixer.prototype.play = function(file, loop, soft, channelID)
{
	var cID = -1;
	
	if(typeof channelID == "number") cID = channelID;
	else cID = this.getFreeChannel(soft);
	
	if(cID >= 0 && cID < this.channels.length)
	{
		this.channels[cID].stop();
		this.channels[cID].play(file, loop);
	}
	
	return this.channels[cID];
};

/**
 * Остановка проигрывания звука на указанном канале
 * @param {Number} cID номер канала
 */
AudioMixer.prototype.stop = function(cID)
{
	if(cID >= 0 && cID < this.channels.length) this.channels[cID].stop();
};

/** @ignore */
AudioMixer.prototype.getFreeChannel = function(soft)
{
	var cID = -1;
	var freeChannels = [];
	
	var maxID = -1;
	var max = -1;
	var t = 0;
	
	for(var i=0; i<this.channels.length; i++)
	{
		if(!this.channels[i].locked)
		{
			if(!this.channels[i].busy) freeChannels.push(i);
			else
			{
				t = new Date().getTime();
				t -= this.channels[i].startPlayTime;
				
				if(t > max)
				{
					max = t;
					maxID = i;
				}
			}
		}
	}
	
	if(freeChannels.length == 0)
	{
		if(!soft && maxID >= 0) cID = maxID;
	}
	else cID = freeChannels[0];
	
	return cID;
};

/** Проверка на то, поддерживает ли текущий браузер WebAudio */
AudioMixer.isWebAudioSupport = function()
{
	return Boolean(window.AudioContext);
};

window.AudioContext = window.AudioContext || window.webkitAudioContext;

AudioMixer.buffer = {};
AudioMixer.waContext = null;