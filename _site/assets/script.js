(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Pjax=require("pjax"),Nprogress=require("nprogress"),onmount=require("onmount"),toggleClass=require("dom101/toggle-class"),ready=require("dom101/ready"),Scrolltrack=require("./scrolltrack"),Scrollclass=require("./scrollclass");!function(){function e(){var e=document.querySelector("title");window.ga&&window.ga("send","pageview",{page:window.location.href,title:e&&e.text})}ready(function(){new Pjax({selectors:[".body",".toc-menu","title"],analytics:e})}),ready(e),document.addEventListener("pjax:send",function(){Nprogress.start()}),document.addEventListener("pjax:error",function(){Nprogress.done()}),document.addEventListener("pjax:complete",function(){Nprogress.done()})}(),onmount(".js-menu-toggle",function(){this.addEventListener("click",function(){toggleClass(document.body,"-menu-visible")})}),function(){ready(function(){onmount()}),document.addEventListener("pjax:complete",function(){onmount()})}(),function(){var e=new Scrolltrack({menu:".toc-menu",selector:"h2, h3",onupdate:function(e,n){var t=document.querySelector(".toc-menu"),o=t.querySelector(".link.-active, .link.-notactive");toggleClass(o,"-active",!e),toggleClass(o,"-notactive",e)}});document.addEventListener("pjax:complete",function(){e.update()}),ready(function(){e.update()})}(),function(){onmount(".footer-nav",function(e){e.sc=Scrollclass(this,{className:"-expanded",onscroll:function(e){return this.maxScroll-e<88}})},function(e){e.sc.destroy()})}(),function(){onmount(".header-nav",function(e){e.sc=Scrollclass(this,{className:"-expanded",onscroll:function(e){return e<40}})},function(e){e.sc.destroy()})}();
},{"./scrollclass":2,"./scrolltrack":3,"dom101/ready":10,"dom101/toggle-class":13,"nprogress":14,"onmount":15,"pjax":16}],2:[function(require,module,exports){
function Scrollclass(e,t){if(!(this instanceof Scrollclass))return new Scrollclass(e,t);t||(t={}),this.el=q(e),this.parent=q(t.parent||document),this.className=t.className||"active",this.onresize=(t.onresize||noop).bind(this),this.onscroll=(t.onscroll||noop).bind(this),this._onscroll=debounce(this.poll.bind(this),5),this._onresize=debounce(this.update.bind(this),5),this.listen()}function noop(){}function q(e){return"string"==typeof e?document.querySelector(e):"object"==typeof e&&e[0]?e[0]:e}var debounce=require("debounce"),documentHeight=require("dom101/document-height"),toggleClass=require("dom101/toggle-class"),scrollTop=require("dom101/scroll-top");Scrollclass.prototype.listen=function(){window.addEventListener("resize",this._onresize),window.addEventListener("resize",this._onscroll),document.addEventListener("load",this._onresize,!0),document.addEventListener("load",this._onscroll,!0),this.parent.addEventListener("scroll",this._onscroll),this._onresize(),this._onscroll()},Scrollclass.prototype.destroy=function(){window.removeEventListener("resize",this._onresize),window.removeEventListener("resize",this._onscroll),document.removeEventListener("load",this._onresize,!0),document.removeEventListener("load",this._onscroll,!0),this.parent.removeEventListener("scroll",this._onscroll)},Scrollclass.prototype.update=function(){this.documentHeight=documentHeight(),this.winHeight=window.innerHeight,this.maxScroll=this.documentHeight-this.winHeight,this.onresize()},Scrollclass.prototype.poll=function(){var e=this.onscroll(scrollTop());toggleClass(this.el,this.className,e)},module.exports=Scrollclass;
},{"debounce":4,"dom101/document-height":7,"dom101/scroll-top":12,"dom101/toggle-class":13}],3:[function(require,module,exports){
function Scrolltrack(t){if(!(this instanceof Scrolltrack))return new Scrolltrack(t);t||(t={}),this.selector=t.selector||"h1, h2, h3, h4, h5, h6",this.parent=t.parent||document,this.onupdate=t.onupdate||function(){},this.menu=t.menu||document,this.scrollParent=t.scrollParent||document,this.offsetPercent=t.offsetPercent||.1,this.listener=debounce(this.onScroll,5).bind(this),this.update=debounce(this._update,20).bind(this),this.active=void 0,this.index=[],this.listen(),this.update()}function q(t){return"string"==typeof t?document.querySelector(t):"object"==typeof t&&t[0]?t[0]:t}var toggleClass=require("dom101/toggle-class"),scrollTop=require("dom101/scroll-top"),documentHeight=require("dom101/document-height"),debounce=require("debounce"),each=require("dom101/each");Scrolltrack.prototype.listen=function(){q(this.scrollParent).addEventListener("scroll",this.listener),document.addEventListener("load",this.update,!0),document.addEventListener("load",this.listener,!0),window.addEventListener("resize",this.update),window.addEventListener("resize",this.listener)},Scrolltrack.prototype.destroy=function(){q(this.scrollParent).removeEventListener("scroll",this.listener),document.removeEventListener("load",this.update,!0),document.removeEventListener("load",this.listener,!0),window.removeEventListener("resize",this.update),window.removeEventListener("resize",this.listener)},Scrolltrack.prototype.reindex=function(){var t=this.parent.querySelectorAll(this.selector),e=this.index=[],i={},o=q(this.menu);each(t,function(t){var r=t.getBoundingClientRect(),n=t.getAttribute("id");i[n]?i[n]++:i[n]=0;var s=o.querySelectorAll("[href="+JSON.stringify("#"+n)+"]");e.push({el:t,id:n,link:s[i[n]],top:r.top+scrollTop()})}),this.metrics={windowHeight:window.innerHeight,documentHeight:documentHeight()}},Scrolltrack.prototype._update=function(){this.reindex(),this.onScroll()},Scrolltrack.prototype.onScroll=function(){var t,e=this.scrollTop();if(each(this.index,function(i){i.top<e&&(t=i)}),t!==this.active){var i=this.active;this.active=t,this.follow(t,i),this.onupdate(t,i)}},Scrolltrack.prototype.scrollTop=function(){var t=scrollTop(),e=0,i=this.offsetPercent;if(this.metrics){var o=this.metrics.windowHeight,r=this.metrics.documentHeight-o,n=r-1.2*o;if(t>n){e=o*(i+(1-i)*((t-n)/o))}else e=o*i}return t+e},Scrolltrack.prototype.follow=function(t,e){this.lastlink&&(toggleClass(this.lastlink,"-active",!1),this.lastlink=null),t&&t.link&&(toggleClass(t.link,"-active",!0),this.lastlink=t.link)},module.exports=Scrolltrack;
},{"debounce":4,"dom101/document-height":7,"dom101/each":8,"dom101/scroll-top":12,"dom101/toggle-class":13}],4:[function(require,module,exports){
var now=require("date-now");module.exports=function(n,u,t){function e(){var p=now()-a;p<u&&p>0?l=setTimeout(e,u-p):(l=null,t||(i=n.apply(r,o),l||(r=o=null)))}var l,o,r,a,i;return null==u&&(u=100),function(){r=this,o=arguments,a=now();var p=t&&!l;return l||(l=setTimeout(e,u)),p&&(i=n.apply(r,o),r=o=null),i}};
},{"date-now":5}],5:[function(require,module,exports){
function now(){return(new Date).getTime()}module.exports=Date.now||now;
},{}],6:[function(require,module,exports){
function addClass(s,a){s.classList?s.classList.add(a):s.className+=" "+a}module.exports=addClass;
},{}],7:[function(require,module,exports){
function documentHeight(){return Math.max(document.documentElement.clientHeight||0,document.body.scrollHeight||0,document.documentElement.scrollHeight||0,document.body.offsetHeight||0,document.documentElement.offsetHeight||0)}module.exports=documentHeight;
},{}],8:[function(require,module,exports){
function each(e,r){var n,o,t=e.length;if("number"==typeof t)for(n=0;n<t;n++)r(e[n],n);else{o=0;for(n in e)e.hasOwnProperty(n)&&r(e[n],n,o++)}return e}module.exports=each;
},{}],9:[function(require,module,exports){
function hasClass(s,a){return s.classList?s.classList.contains(a):new RegExp("(^| )"+a+"( |$)","gi").test(s.className)}module.exports=hasClass;
},{}],10:[function(require,module,exports){
function ready(e){if("complete"===document.readyState)return e();document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent("onreadystatechange",function(){"interactive"===document.readyState&&e()})}module.exports=ready;
},{}],11:[function(require,module,exports){
function removeClass(s,e){if(s.classList)s.classList.remove(e);else{var a=new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi");s.className=s.className.replace(a," ")}}module.exports=removeClass;
},{}],12:[function(require,module,exports){
function scrollTop(){return window.pageYOffset?window.pageYOffset:document.documentElement.clientHeight?document.documentElement.scrollTop:document.body.scrollTop}module.exports=scrollTop;
},{}],13:[function(require,module,exports){
function toggleClass(s,a,e){return void 0===e&&(e=!hasClass(s,a)),e?addClass(s,a):removeClass(s,a)}var addClass=require("./add-class"),removeClass=require("./remove-class"),hasClass=require("./has-class");module.exports=toggleClass;
},{"./add-class":6,"./has-class":9,"./remove-class":11}],14:[function(require,module,exports){
!function(n,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():n.NProgress=e()}(this,function(){function n(n,e,t){return n<e?e:n>t?t:n}function e(n){return 100*(-1+n)}function t(n,t,r){var i;return i="translate3d"===c.positionUsing?{transform:"translate3d("+e(n)+"%,0,0)"}:"translate"===c.positionUsing?{transform:"translate("+e(n)+"%,0)"}:{"margin-left":e(n)+"%"},i.transition="all "+t+"ms "+r,i}function r(n,e){return("string"==typeof n?n:s(n)).indexOf(" "+e+" ")>=0}function i(n,e){var t=s(n),i=t+e;r(t,e)||(n.className=i.substring(1))}function o(n,e){var t,i=s(n);r(n,e)&&(t=i.replace(" "+e+" "," "),n.className=t.substring(1,t.length-1))}function s(n){return(" "+(n.className||"")+" ").replace(/\s+/gi," ")}function a(n){n&&n.parentNode&&n.parentNode.removeChild(n)}var u={};u.version="0.2.0";var c=u.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};u.configure=function(n){var e,t;for(e in n)void 0!==(t=n[e])&&n.hasOwnProperty(e)&&(c[e]=t);return this},u.status=null,u.set=function(e){var r=u.isStarted();e=n(e,c.minimum,1),u.status=1===e?null:e;var i=u.render(!r),o=i.querySelector(c.barSelector),s=c.speed,a=c.easing;return i.offsetWidth,l(function(n){""===c.positionUsing&&(c.positionUsing=u.getPositioningCSS()),f(o,t(e,s,a)),1===e?(f(i,{transition:"none",opacity:1}),i.offsetWidth,setTimeout(function(){f(i,{transition:"all "+s+"ms linear",opacity:0}),setTimeout(function(){u.remove(),n()},s)},s)):setTimeout(n,s)}),this},u.isStarted=function(){return"number"==typeof u.status},u.start=function(){u.status||u.set(0);var n=function(){setTimeout(function(){u.status&&(u.trickle(),n())},c.trickleSpeed)};return c.trickle&&n(),this},u.done=function(n){return n||u.status?u.inc(.3+.5*Math.random()).set(1):this},u.inc=function(e){var t=u.status;return t?("number"!=typeof e&&(e=(1-t)*n(Math.random()*t,.1,.95)),t=n(t+e,0,.994),u.set(t)):u.start()},u.trickle=function(){return u.inc(Math.random()*c.trickleRate)},function(){var n=0,e=0;u.promise=function(t){return t&&"resolved"!==t.state()?(0===e&&u.start(),n++,e++,t.always(function(){e--,0===e?(n=0,u.done()):u.set((n-e)/n)}),this):this}}(),u.render=function(n){if(u.isRendered())return document.getElementById("nprogress");i(document.documentElement,"nprogress-busy");var t=document.createElement("div");t.id="nprogress",t.innerHTML=c.template;var r,o=t.querySelector(c.barSelector),s=n?"-100":e(u.status||0),l=document.querySelector(c.parent);return f(o,{transition:"all 0 linear",transform:"translate3d("+s+"%,0,0)"}),c.showSpinner||(r=t.querySelector(c.spinnerSelector))&&a(r),l!=document.body&&i(l,"nprogress-custom-parent"),l.appendChild(t),t},u.remove=function(){o(document.documentElement,"nprogress-busy"),o(document.querySelector(c.parent),"nprogress-custom-parent");var n=document.getElementById("nprogress");n&&a(n)},u.isRendered=function(){return!!document.getElementById("nprogress")},u.getPositioningCSS=function(){var n=document.body.style,e="WebkitTransform"in n?"Webkit":"MozTransform"in n?"Moz":"msTransform"in n?"ms":"OTransform"in n?"O":"";return e+"Perspective"in n?"translate3d":e+"Transform"in n?"translate":"margin"};var l=function(){function n(){var t=e.shift();t&&t(n)}var e=[];return function(t){e.push(t),1==e.length&&n()}}(),f=function(){function n(n){return n.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(n,e){return e.toUpperCase()})}function e(n){var e=document.body.style;if(n in e)return n;for(var t,r=i.length,o=n.charAt(0).toUpperCase()+n.slice(1);r--;)if((t=i[r]+o)in e)return t;return n}function t(t){return t=n(t),o[t]||(o[t]=e(t))}function r(n,e,r){e=t(e),n.style[e]=r}var i=["Webkit","O","Moz","ms"],o={};return function(n,e){var t,i,o=arguments;if(2==o.length)for(t in e)void 0!==(i=e[t])&&e.hasOwnProperty(t)&&r(n,t,i);else r(n,o[1],o[2])}}();return u});
},{}],15:[function(require,module,exports){
!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():window.jQuery?window.jQuery.onmount=t():e.onmount=t()}(this,function(e){function t(e,n,i,r){if("object"==typeof i&&(r=i,i=void 0),0===arguments.length||d(e)||l(e))t.poll();else if(1===arguments.length)t.poll(e);else{var s=new o(e,n,i,r);a.push(s),s.register()}return this}function o(e,o,n,i){this.id="b"+p++,this.init=o,this.exit=n,this.selector=t.selectify(e),this.loaded=[],this.key="__onmount:"+p,this.detectMutate=i&&i.detectMutate}function n(e){for(;e;){if(e===document.documentElement)return!0;e=e.parentElement}}function i(e,o){return t.$?t.$(e):document.querySelectorAll(e)}function r(e,o){return t.$?e.each(function(e){o(this,e)}):f(e,o)}function s(e,o){return t.$?e.index(o)>-1:e.indexOf(o)>-1}function c(e,t){v[e]||(v[e]=[]),v[e].push(t),h.push(t)}function u(e,o){var n=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector;if(t.$)return t.$(e).is(o);if(n)return n.call(e,o);if(e.parentNode){for(var i=e.parentNode.querySelectorAll(o),r=i.length;r--;0)if(i[r]===e)return!0;return!1}}function f(e,t){var o,n=e.length;if(n===+n)for(o=0;o<n;o++)t(e[o],o);else for(o in e)e.hasOwnProperty(o)&&t(e[o],o);return e}function d(e){return"function"==typeof e&&e.fn&&e.noConflict}function l(e){return"object"==typeof e&&e.target}var h,a,v,b,p=0,w=0;t.$=window.jQuery||window.Zepto||window.Ender,t.MutationObserver=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,t.debug=!1,t.poll=function(e){e&&(e=t.selectify(e)),f((e?v[e]:h)||[],function(e){e()})},t.observe=function(){var e=t.MutationObserver;if(void 0!==e){var o=new e(function(e){f(a,function(t){f(e,function(e){f(e.addedNodes,function(e){u(e,t.selector)&&t.visitEnter(e)}),f(e.removedNodes,function(e){u(e,t.selector)&&t.doExit(e)})})})});return o.observe(document,{subtree:!0,childList:!0}),t.observer=o,t(),!0}},t.unobserve=function(){this.observer&&(this.observer.disconnect(),delete this.observer)},t.teardown=function(){f(a,function(e){f(e.loaded,function(t,o){t&&e.doExit(t,o)})})},t.reset=function(){h=t.handlers=[],v=t.selectors={},a=t.behaviors=[]},t.selectify=function(e){return"@"===e[0]?'[role~="'+e.substr(1).replace(/"/g,'\\"')+'"]':e},o.prototype.register=function(){var e=this,t=this.loaded,o=this.selector;c(o,function(){var n=i(o);f(t,function(t,o){e.visitExit(t,o,n)}),r(n,function(t){e.visitEnter(t)})})},o.prototype.visitEnter=function(e){if(!e[this.key]){var o={id:"c"+w,selector:this.selector};!1!==this.init.call(e,o)&&(t.debug&&b("enter",this.selector,e),e[this.key]=o,this.loaded.push(e),w++)}},o.prototype.visitExit=function(e,t,o){if(e)if(this.detectMutate){if(!s(o,e))return this.doExit(e,t)}else if(!n(e))return this.doExit(e,t)},o.prototype.doExit=function(e,o){void 0===o&&(o=this.loaded.indexOf(e)),this.loaded[o]=void 0,this.exit&&!1!==this.exit.call(e,e[this.key])&&(t.debug&&b("exit",this.selector,e),delete e[this.key])};var y={enter:"background-color:#dfd;font-weight:bold;color:#141",exit:"background-color:#fdd;font-weight:bold;color:#411"};return b=~navigator.userAgent.indexOf("Mozilla")?function(e,t,o){console.log("%c %s ",y[e],t,o)}:function(e,t,o){console.log("(onmount)",e,t)},t.reset(),t});
},{}],16:[function(require,module,exports){
var clone=require("./lib/clone.js"),executeScripts=require("./lib/execute-scripts.js"),forEachEls=require("./lib/foreach-els.js"),newUid=require("./lib/uniqueid.js"),on=require("./lib/events/on.js"),trigger=require("./lib/events/trigger.js"),Pjax=function(t){this.firstrun=!0,require("./lib/proto/parse-options.js").apply(this,[t]),this.log("Pjax options",this.options),this.maxUid=this.lastUid=newUid(),this.parseDOM(document),on(window,"popstate",function(t){if(t.state){var e=clone(this.options);e.url=t.state.url,e.title=t.state.title,e.history=!1,t.state.uid<this.lastUid?e.backward=!0:e.forward=!0,this.lastUid=t.state.uid,this.loadUrl(t.state.url,e)}}.bind(this))};if(Pjax.prototype={log:require("./lib/proto/log.js"),getElements:require("./lib/proto/get-elements.js"),parseDOM:require("./lib/proto/parse-dom.js"),refresh:require("./lib/proto/refresh.js"),reload:require("./lib/reload.js"),attachLink:require("./lib/proto/attach-link.js"),forEachSelectors:function(t,e,i){return require("./lib/foreach-selectors.js").bind(this)(this.options.selectors,t,e,i)},switchSelectors:function(t,e,i,o){return require("./lib/switches-selectors.js").bind(this)(this.options.switches,this.options.switchesOptions,t,e,i,o)},latestChance:function(t){window.location=t},onSwitch:function(){trigger(window,"resize scroll")},loadContent:function(t,e){var i=document.implementation.createHTMLDocument(),o=/<html[^>]+>/gi,r=/\s?[a-z:]+(?:\=(?:\'|\")[^\'\">]+(?:\'|\"))*/gi,s=t.match(o);if(s&&s.length&&(s=s[0].match(r),s.length&&(s.shift(),s.forEach(function(t){var e=t.trim().split("=");1===e.length?i.documentElement.setAttribute(e[0],!0):i.documentElement.setAttribute(e[0],e[1].slice(1,-1))}))),i.documentElement.innerHTML=t,this.log("load content",i.documentElement.attributes,i.documentElement.innerHTML.length),document.activeElement&&!document.activeElement.value)try{document.activeElement.blur()}catch(t){}this.switchSelectors(this.options.selectors,i,document,e);var n=Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop();n&&document.activeElement!==n&&n.focus(),this.options.selectors.forEach(function(t){forEachEls(document.querySelectorAll(t),function(t){executeScripts(t)})})},doRequest:require("./lib/request.js"),loadUrl:function(t,e){this.log("load href",t,e),trigger(document,"pjax:send",e),this.doRequest(t,function(i){if(!1===i)return void trigger(document,"pjax:complete pjax:error",e);document.activeElement.blur();try{this.loadContent(i,e)}catch(e){if(this.options.debug)throw e;return console&&console.error&&console.error("Pjax switch fail: ",e),void this.latestChance(t)}e.history&&(this.firstrun&&(this.lastUid=this.maxUid=newUid(),this.firstrun=!1,window.history.replaceState({url:window.location.href,title:document.title,uid:this.maxUid},document.title)),this.lastUid=this.maxUid=newUid(),window.history.pushState({url:t,title:e.title,uid:this.maxUid},e.title,t)),this.forEachSelectors(function(t){this.parseDOM(t)},this),trigger(document,"pjax:complete pjax:success",e),e.analytics(),!1!==e.scrollTo&&(e.scrollTo.length>1?window.scrollTo(e.scrollTo[0],e.scrollTo[1]):window.scrollTo(0,e.scrollTo))}.bind(this))}},Pjax.isSupported=require("./lib/is-supported.js"),Pjax.isSupported())module.exports=Pjax;else{var stupidPjax=function(){};for(var key in Pjax.prototype)Pjax.prototype.hasOwnProperty(key)&&"function"==typeof Pjax.prototype[key]&&(stupidPjax[key]=stupidPjax);module.exports=stupidPjax}
},{"./lib/clone.js":17,"./lib/events/on.js":19,"./lib/events/trigger.js":20,"./lib/execute-scripts.js":21,"./lib/foreach-els.js":22,"./lib/foreach-selectors.js":23,"./lib/is-supported.js":24,"./lib/proto/attach-link.js":26,"./lib/proto/get-elements.js":27,"./lib/proto/log.js":28,"./lib/proto/parse-dom.js":29,"./lib/proto/parse-options.js":31,"./lib/proto/refresh.js":32,"./lib/reload.js":33,"./lib/request.js":34,"./lib/switches-selectors.js":35,"./lib/uniqueid.js":37}],17:[function(require,module,exports){
module.exports=function(r){if(null===r||"object"!=typeof r)return r;var o=r.constructor();for(var t in r)r.hasOwnProperty(t)&&(o[t]=r[t]);return o};
},{}],18:[function(require,module,exports){
module.exports=function(e){var t=e.text||e.textContent||e.innerHTML||"",o=document.querySelector("head")||document.documentElement,n=document.createElement("script");if(t.match("document.write"))return console&&console.log&&console.log("Script contains document.write. Can’t be executed correctly. Code skipped ",e),!1;n.type="text/javascript";try{n.appendChild(document.createTextNode(t))}catch(e){n.text=t}return o.insertBefore(n,o.firstChild),o.removeChild(n),!0};
},{}],19:[function(require,module,exports){
var forEachEls=require("../foreach-els");module.exports=function(e,o,r,n){o="string"==typeof o?o.split(" "):o,o.forEach(function(o){forEachEls(e,function(e){e.addEventListener(o,r,n)})})};
},{"../foreach-els":22}],20:[function(require,module,exports){
var forEachEls=require("../foreach-els");module.exports=function(e,n,t){n="string"==typeof n?n.split(" "):n,n.forEach(function(n){var o;o=document.createEvent("HTMLEvents"),o.initEvent(n,!0,!0),o.eventName=n,t&&Object.keys(t).forEach(function(e){o[e]=t[e]}),forEachEls(e,function(e){var n=!1;e.parentNode||e===document||e===window||(n=!0,document.body.appendChild(e)),e.dispatchEvent(o),n&&e.parentNode.removeChild(e)})})};
},{"../foreach-els":22}],21:[function(require,module,exports){
var forEachEls=require("./foreach-els"),evalScript=require("./eval-script");module.exports=function(e){forEachEls(e.querySelectorAll("script"),function(e){e.type&&"text/javascript"!==e.type.toLowerCase()||(e.parentNode&&e.parentNode.removeChild(e),evalScript(e))})};
},{"./eval-script":18,"./foreach-els":22}],22:[function(require,module,exports){
module.exports=function(o,n,t){return o instanceof HTMLCollection||o instanceof NodeList||o instanceof Array?Array.prototype.forEach.call(o,n,t):n.call(t,o)};
},{}],23:[function(require,module,exports){
var forEachEls=require("./foreach-els");module.exports=function(e,o,r,c){c=c||document,e.forEach(function(e){forEachEls(c.querySelectorAll(e),o,r)})};
},{"./foreach-els":22}],24:[function(require,module,exports){
module.exports=function(){return window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)};
},{}],25:[function(require,module,exports){
Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var o=Array.prototype.slice.call(arguments,1),n=this,i=function(){},r=function(){return n.apply(this instanceof i&&t?this:t,o.concat(Array.prototype.slice.call(arguments)))};return i.prototype=this.prototype,r.prototype=new i,r});
},{}],26:[function(require,module,exports){
require("../polyfills/Function.prototype.bind");var on=require("../events/on"),clone=require("../clone"),attrClick="data-pjax-click-state",attrKey="data-pjax-keyup-state",linkAction=function(t,e){return e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey?void t.setAttribute(attrClick,"modifier"):t.protocol!==window.location.protocol||t.host!==window.location.host?void t.setAttribute(attrClick,"external"):t.pathname===window.location.pathname&&t.hash.length>0?void t.setAttribute(attrClick,"anchor-present"):t.hash&&t.href.replace(t.hash,"")===window.location.href.replace(location.hash,"")?void t.setAttribute(attrClick,"anchor"):t.href===window.location.href.split("#")[0]+"#"?void t.setAttribute(attrClick,"anchor-empty"):(e.preventDefault(),this.options.currentUrlFullReload&&t.href===window.location.href.split("#")[0]?(t.setAttribute(attrClick,"reload"),void this.reload()):(t.setAttribute(attrClick,"load"),void this.loadUrl(t.href,clone(this.options))))},isDefaultPrevented=function(t){return t.defaultPrevented||!1===t.returnValue};module.exports=function(t){var e=this;on(t,"click",function(i){isDefaultPrevented(i)||linkAction.call(e,t,i)}),on(t,"keyup",function(i){if(!isDefaultPrevented(i))return i.which>1||i.metaKey||i.ctrlKey||i.shiftKey||i.altKey?void t.setAttribute(attrKey,"modifier"):void(13==i.keyCode&&linkAction.call(e,t,i))}.bind(this))};
},{"../clone":17,"../events/on":19,"../polyfills/Function.prototype.bind":25}],27:[function(require,module,exports){
module.exports=function(e){return e.querySelectorAll(this.options.elements)};
},{}],28:[function(require,module,exports){
module.exports=function(){this.options.debug&&console&&("function"==typeof console.log?console.log.apply(console,arguments):console.log&&console.log(arguments))};
},{}],29:[function(require,module,exports){
var forEachEls=require("../foreach-els"),parseElement=require("./parse-element");module.exports=function(e){forEachEls(this.getElements(e),parseElement,this)};
},{"../foreach-els":22,"./parse-element":30}],30:[function(require,module,exports){
module.exports=function(t){switch(t.tagName.toLowerCase()){case"a":t.hasAttribute("data-pjax-click-state")||this.attachLink(t);break;case"form":throw"Pjax doesnt support <form> yet.";default:throw"Pjax can only be applied on <a> or <form> submit"}};
},{}],31:[function(require,module,exports){
module.exports=function(t){this.options=t,this.options.elements=this.options.elements||"a[href], form[action]",this.options.selectors=this.options.selectors||["title",".js-Pjax"],this.options.switches=this.options.switches||{},this.options.switchesOptions=this.options.switchesOptions||{},this.options.history=this.options.history||!0,this.options.analytics=this.options.analytics||function(){window._gaq&&_gaq.push(["_trackPageview"]),window.ga&&ga("send","pageview",{page:location.pathname,title:document.title})},this.options.scrollTo=void 0===this.options.scrollTo?0:this.options.scrollTo,this.options.cacheBust=void 0===this.options.cacheBust||this.options.cacheBust,this.options.debug=this.options.debug||!1,this.options.switches.head||(this.options.switches.head=this.switchElementsAlt),this.options.switches.body||(this.options.switches.body=this.switchElementsAlt),"function"!=typeof t.analytics&&(t.analytics=function(){})};
},{}],32:[function(require,module,exports){
module.exports=function(e){this.parseDOM(e||document)};
},{}],33:[function(require,module,exports){
module.exports=function(){window.location.reload()};
},{}],34:[function(require,module,exports){
module.exports=function(e,t){var s=new XMLHttpRequest;return s.onreadystatechange=function(){4===s.readyState&&(200===s.status?t(s.responseText,s):t(null,s))},this.options.cacheBust&&(e+=(/[?&]/.test(e)?"&":"?")+(new Date).getTime()),s.open("GET",e,!0),s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.send(null),s};
},{}],35:[function(require,module,exports){
var forEachEls=require("./foreach-els"),defaultSwitches=require("./switches");module.exports=function(e,t,l,o,h,i){l.forEach(function(l){var s=o.querySelectorAll(l),r=h.querySelectorAll(l);if(this.log&&this.log("Pjax switch",l,s,r),s.length!==r.length)throw"DOM doesn’t look the same on new loaded page: ’"+l+"’ - new "+s.length+", old "+r.length;forEachEls(s,function(o,h){var s=r[h];this.log&&this.log("newEl",o,"oldEl",s),e[l]?e[l].bind(this)(s,o,i,t[l]):defaultSwitches.outerHTML.bind(this)(s,o,i)},this)},this)};
},{"./foreach-els":22,"./switches":36}],36:[function(require,module,exports){
var on=require("./events/on.js");module.exports={outerHTML:function(a,s){a.outerHTML=s.outerHTML,this.onSwitch()},innerHTML:function(a,s){a.innerHTML=s.innerHTML,a.className=s.className,this.onSwitch()},sideBySide:function(a,s,e,t){var c=Array.prototype.forEach,l=[],n=[],r=document.createDocumentFragment(),i="animationend webkitAnimationEnd MSAnimationEnd oanimationend",o=0,d=function(a){a.target==a.currentTarget&&--o<=0&&l&&(l.forEach(function(a){a.parentNode&&a.parentNode.removeChild(a)}),n.forEach(function(a){a.className=a.className.replace(a.getAttribute("data-pjax-classes"),""),a.removeAttribute("data-pjax-classes")}),n=null,l=null,this.onSwitch())}.bind(this);t=t||{},c.call(a.childNodes,function(a){l.push(a),a.classList&&!a.classList.contains("js-Pjax-remove")&&(a.hasAttribute("data-pjax-classes")&&(a.className=a.className.replace(a.getAttribute("data-pjax-classes"),""),a.removeAttribute("data-pjax-classes")),a.classList.add("js-Pjax-remove"),t.callbacks&&t.callbacks.removeElement&&t.callbacks.removeElement(a),t.classNames&&(a.className+=" "+t.classNames.remove+" "+(e.backward?t.classNames.backward:t.classNames.forward)),o++,on(a,i,d,!0))}),c.call(s.childNodes,function(a){if(a.classList){var s="";t.classNames&&(s=" js-Pjax-add "+t.classNames.add+" "+(e.backward?t.classNames.forward:t.classNames.backward)),t.callbacks&&t.callbacks.addElement&&t.callbacks.addElement(a),a.className+=s,a.setAttribute("data-pjax-classes",s),n.push(a),r.appendChild(a),o++,on(a,i,d,!0)}}),a.className=s.className,a.appendChild(r)}};
},{"./events/on.js":19}],37:[function(require,module,exports){
module.exports=function(){var e=0;return function(){var n="pjax"+(new Date).getTime()+"_"+e;return e++,n}}();
},{}]},{},[1]);