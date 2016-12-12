/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    // Application Constructor
    initialize: function() {
        console.log('init app');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        if (id == 'deviceready') {

        // =================
        // TODO: Load tgl_boot here instead. But do not load until cordova says it is ready.
        // =================
        
        	head.js('js/GameConfig.js', function() {
				var host, path;
			
				var debugText = document.getElementById('debug_text');
				if (debugText != null) {
				    debugText.innerHTML = 'in head.js startup event, TGL version ' + GameConfig.TGL.VERSION;
				}
				if (typeof GameConfig.TGL.VERSION !== 'undefined') {
					host = '';
					path = 'js/lib/tgl/tgl-' + GameConfig.TGL.VERSION + '.min.js';
			
					if (typeof GameConfig.DEBUG !== 'undefined' && GameConfig.DEBUG) {
						path = 'js/lib-debug/tgl/tgl-' + GameConfig.TGL.VERSION + '.js';
					} else if (typeof CordovaConfig === 'undefined' && typeof GameConfig.CDN.ENABLED !== 'undefined' && GameConfig.CDN.ENABLED) {
						path = 'tgl/tgl-' + GameConfig.TGL.VERSION + '.min.js';
						host = '//sdk.tresensa.com/';
					}
					debugText.innerHTML = 'now loading ' + host + path;
					head.js(host + path);
				}
			});
        }
    },
};
