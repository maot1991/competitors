(function(){var f=!0,i=!1,j;
function l(a){function b(){h||(h=f,d?c.e.ha=f:c.Y(a))}var c=this,d=i,h=i;c.xa=a.useFlashFallback===i?i:!c.ua;c.s=a.statBaseURL;c.H=a.guid||a.GUID;c.B=a.confID;c.j=a.viewableConversion;c.T=a.api&&a.api.bridge!==a.api.fallbackAPI;if(c.j){for(var e=a.viewableImpressionURL,g=[{param:"ft_creative",value:a.creativeID},{param:"ft_configuration",value:a.confID},{param:"ft_parent",value:window["ftTimestamp_"+a.pID]||""},{param:"ft_id",value:a.ftId||""},{param:"ft_custom",value:window["ftCustom_"+a.pID]||""},
{param:"ft_section",value:window["ftSection_"+a.pID]||""}],k=g.length;k--;)e=a.insertParam(e,g[k]);c.N="&"===e[e.length-1]?e.substring(0,e.length-1):e}c.width=parseInt(a.width,10);c.height=parseInt(a.height,10);c.b=242500<=c.width*c.height?0.6*a.viewableImpressionThreshold:a.viewableImpressionThreshold;c.v=0;c.Ca=i;c.M=a.viewableImpressionTime;c.L=i;c.K=i;c.p=a.customDefinition;c.k=0;c.aa=i;c.U=i;c.target=c.c?window.document.getElementById(a.divID):window.parent.document.getElementById(a.divID)||
window.frameElement;c.i=c.I=c.visibility.l;c.C=0;c.Z=(new Date).getTime();c.$=(new Date).getTime();c.n=0;c.o=0;c.t=0;c.a={visible:0,r:0,hidden:0,u:0};c.A=f;c.dispatchEvent=function(b,c){a.dispatchEvent(b,c)};if(a.fver&&a.minflashversion)this.D=!!a.fver();else{g=i;if(this.z)for(e=10;3<=e;e--)g=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+e),g=!!parseFloat(g.GetVariable("$version").match(/\b\d+\b/g).join("."));else"undefined"!=typeof navigator.plugins["Shockwave Flash"]&&(g=!!parseFloat(navigator.plugins["Shockwave Flash"].description.substring(15)));
this.D=g}c.c&&(window.$sf&&window.$sf.ext?c.q=c.va:"undefined"!==typeof window.mozInnerScreenY?(c.W=c.ka,c.G=c.la):c.D&&!c.Q&&c.xa?(c.F={},d=f,c.e={ha:i},c.g=[],window.ftPagefoldFlashListener=function(b){b=b.split("-");c.pa(b[0],parseInt(b[1],10),a)},c.q=c.qa,c.ja()):(c.d(this.event.ga),!c.K&&c.j&&c.na(),c.dispatchEvent("advisibility",i)));a.addEventListener("adonpage",b);a.addEventListener("backup",b)}
function p(a){var b="";this.s=a.statBaseURL;this.H=a.guid;this.B=a.confID;this.Q=/fox/i.test(navigator.appVersion);b=this.c?window.document.referrer:window.parent.document.location;b=escape(String(b).substr(0,200));this.d("314",b)}
function t(){this.B=this.H=this.s="";this.sa=window!=top;this.c=i;if(this.sa)try{window.parent.document.getElementsByTagName("head")[0].appendChild(window.parent.document.createElement("script"))}catch(a){this.c=f}this.Q=/fox/.test(navigator.userAgent);this.z=/MSIE/.test(navigator.userAgent);this.ua=/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)}l.prototype=new t;j=l.prototype;
j.event={fa:"301",ea:"302",P:"303",da:"304",ba:"305",ca:"306",O:"307",ga:"308",Ba:"310",Aa:"311",za:"312"};j.visibility={f:2,m:1,l:0};j.R=[50,175,300,600,1200,3E3];j.Y=function(a){var b=this,c=this.q(),d=this.event.da;1===c&&!b.p?d=this.event.fa:0<c&&(d=this.event.ea);this.d(d);this.i=this.I=this.X(c);!a.api||"loading"!==a.api.getState()?this.S(a):a.api.addEventListener("ready",function(){b.S(a)})};
j.J=function(){var a=this,b=(new Date).getTime(),c=b-this.Z-this.n,d=b-this.$-this.o,h=this.q(),e=this.X(h);a.A&&a.target.parentNode&&(this.dispatchEvent("advisibility",100*h),this.K?this.a.u+=d:1==h?this.a.visible+=d:0<h?this.a.r+=d:this.a.hidden+=d,this.p&&(e===this.visibility.f?this.k+=d:this.k<this.M&&(this.k=0),!this.aa&&this.k>=this.M&&(this.I===this.visibility.m?this.d(this.event.P):this.d(this.event.O),this.aa=f)),e>this.i&&this.wa(e),this.C<this.R.length&&this.h(c)>=this.R[this.C]&&(this.ma(),
this.Z=b,this.n=0,this.C++),a.j&&(!this.L&&this.N)&&(this.v=h>=this.b?this.v+d:0,this.v>=this.M&&this.oa()),this.$=b,this.o=0);a.target.parentNode&&((!a.T||a.T&&(a.j&&!a.L||!a.j&&!a.U))&&a.A)&&setTimeout(function(){a.J()},100)};
j.S=function(a){var b=this;b.t="yes"===a.pageVisible||b.c&&"no"!==a.pageVisible?0:(new Date).getTime();("yes"===a.pageVisible||b.c&&"no"!==a.pageVisible)&&b.J();a.addEventListener("visibilitychange",function(c){"yes"===c||b.c&&b.D&&"no"!==a.pageVisible?(b.n+=(new Date).getTime()-b.t,b.o+=(new Date).getTime()-b.t):(b.t=(new Date).getTime(),b.v=0);b.A="yes"===c||b.c&&"no"!==a.pageVisible;b.J()})};
j.ma=function(){var a=[this.h(this.a.visible)];a.push(this.h(this.a.r));a.push(this.h(this.a.hidden));a.push(this.h(this.a.u));this.d("310",a.join("x"));this.a.visible=0;this.a.r=0;this.a.hidden=0;this.a.u=0;this.U=f};j.oa=function(){(new Image).src=this.N;this.L=f};j.na=function(){(new Image).src=this.N.replace(/;202;pixel/,";270;pixel");this.K=f};
j.wa=function(a){var b;this.i===this.visibility.l?a===this.visibility.m?b=this.event.ba:a===this.visibility.f&&(b=this.event.ca):this.i===this.visibility.m&&(a===this.visibility.f&&!this.p)&&(b=this.event.P,this.I===this.visibility.l&&(b=this.event.O));this.i=a;"undefined"!==typeof b&&this.d(b)};j.q=function(){var a=this.W(),b=this.G();return this.ia(a,b)};j.va=function(){return window.$sf.ext.inViewPercentage()/100};
j.W=function(){var a=this.target.getBoundingClientRect(),b=this.G();return{x:a.left+b.scrollLeft,y:a.top+b.scrollTop}};
j.G=function(){var a={scrollLeft:0,scrollTop:0,height:0,width:0},b=window.parent;this.c||(b.innerWidth?(a.width=b.innerWidth,a.height=b.innerHeight,a.scrollLeft=b.pageXOffset,a.scrollTop=b.pageYOffset):b.document.documentElement&&b.document.documentElement.clientHeight?(a.width=b.document.documentElement.clientWidth,a.height=b.document.documentElement.clientHeight,a.scrollLeft=b.document.documentElement.scrollLeft,a.scrollTop=b.document.documentElement.scrollTop):b.document.body&&(a.width=b.document.body.clientWidth,
a.height=b.document.body.clientHeight,a.scrollLeft=b.document.body.scrollLeft,a.scrollTop=b.document.body.scrollTop));return a};
j.ia=function(a,b){var c=b.scrollLeft,d=b.scrollLeft+b.width,h=b.scrollTop,e=b.scrollTop+b.height,g=a.x,k=a.x+this.width,q=a.y,r=a.y+this.height,s=Math.max(a.y,b.scrollTop),m=Math.min(a.y+this.height,b.scrollTop+b.height),n=Math.max(a.x,b.scrollLeft),u=Math.min(a.x+this.width,b.scrollLeft+b.width);this.V(m-s,this.height);this.V(u-n,this.width);s=(k-g)*(r-q);m=0;a:switch(f){case h>r:case c>k:case d<g:case e<q:n=f;break a;default:n=i}n||(c=Math.max(c,g),d=Math.min(d,k),h=Math.max(h,q),e=Math.min(e,
r),m=(d-c)*(e-h));return Math.floor(100*(m/s))/100};j.X=function(a){var b=this.visibility.l;this.p&&a>=this.b?b=this.visibility.f:1===a?b=this.visibility.f:0<a&&(b=this.visibility.m);return b};j.ka=function(){var a=this.target.getBoundingClientRect();return{x:window.mozInnerScreenX+a.left,y:window.mozInnerScreenY+a.top}};j.la=function(){return{scrollLeft:window.screenX,scrollTop:window.screenY,height:window.outerHeight,width:window.outerWidth}};
j.qa=function(){function a(a,b){var k=0;return k=1>b?0:b<a?0.1:b<c?d:1}var b=0,c=0.5===this.b?9:12,d=this.b,h;for(h in this.F)b+=300>this.F[h]?1:0;return 0.5===d?a(5,b):0.5<d?a(8,b):0.39<d?a(6,b):a(4,b)};j.pa=function(a,b,c){var d=0;this.F[a]=b;this.e[a]=f;for(var h in this.e)this.e[h]||d++;0===d&&(this.Y(c),this.e.Da=i)};
j.ja=function(){function a(a){return""+Math.round(a)}function b(a){var b="position: absolute; top: "+a.top+"px;",c=this.ra(a.id),b=b+(" width: "+this.w.width+"px;"),b=b+(" height: "+this.w.height+"px;"),b=b+(" left : "+a.left+"px; z-index: -1;");this.z?(a=d.replace("@STYLE@",b).replace("@FLASH@",c),this.target.insertAdjacentHTML("beforeend",a)):(a=document.createElement("div"),a.style.cssText=b,a.innerHTML=c,this.target.appendChild(a))}function c(){for(var a=0,c=h.g.length;a<c;a++)h.e[h.g[a].id]=
i,b.call(h,h.g[a])}var d='<div style="@STYLE@">@FLASH@</div>',h=this,e=Math.sqrt(this.b);this.target.getBoundingClientRect();var g=[a(this.width*(1-e)),a(this.width*(1-this.b)),a(this.width*this.b),a(this.width*e)],e=[a(this.height*(1-e)),a(this.height*(1-this.b)),a(this.height*this.b),a(this.height*e)];this.g=[{id:"0",left:"0",top:e[0]},{id:"1",left:"0",top:e[3]},{id:"2",left:g[0],top:"0"},{id:"3",left:g[0],top:""+(this.height-1)},{id:"4",left:g[1],top:e[1]},{id:"5",left:g[1],top:e[2]},{id:"6",left:g[2],
top:e[1]},{id:"7",left:g[2],top:e[2]},{id:"8",left:g[3],top:"0"},{id:"9",left:g[3],top:""+(this.height-1)},{id:"10",left:""+(this.width-1),top:e[0]},{id:"11",left:""+(this.width-1),top:e[3]}];0.5===this.b&&(this.g=[{id:"0",left:"0",top:e[0]},{id:"1",left:"0",top:e[3]},{id:"2",left:g[0],top:"0"},{id:"3",left:g[0],top:+(this.height-1)},{id:"4",left:""+this.width/2,top:""+this.height/2},{id:"5",left:g[3],top:"0"},{id:"6",left:g[3],top:""+(this.height-1)},{id:"7",left:""+(this.width-1),top:e[0]},{id:"8",
left:""+(this.width-1),top:e[3]}]);document.body?c():this.ta(function(){document.body&&c()})};
j.ra=function(a){var b=this.w,c=b.name+a,d;d="<OBJECT "+(this.z?'classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"':'data="'+b.path+'" type="application/x-shockwave-flash"');d=d+(' ID="'+c+'" name="'+c+'"')+(' width="'+b.width+'" height="'+b.height+'" style="float:left;">');d+='<PARAM NAME=movie VALUE="'+b.path+'"/>';d+='<PARAM NAME=FlashVars VALUE="identifier='+a+'"/>';d+='<PARAM NAME=quality VALUE="autohigh"/>';d+='<PARAM NAME=wmode VALUE="'+b.ya+'"/>';d+='<PARAM NAME="allowScriptAccess" value="always"/>';
d+='<PARAM NAME="allowFullScreen" value="true"/>';return d+="</OBJECT>"};j.w={path:("https:"===window.location.protocol?"https://secure":"http://cdn")+".flashtalking.com/pageFold/pagefold.swf",name:"ftPF",width:1,height:2,ya:"transparent"};j.V=function(a,b){Math.max(Math.floor(100*(a/b))/100,0)};j.h=function(a){return Math.ceil(a/100)};p.prototype=new t;
t.prototype.d=function(a,b){var c=[""+this.s+this.B];c.push(a);c.push("0");c.push(this.H);c.push(this.random());b&&c.push(b);this.s&&((new Image).src=c.join("-"))};t.prototype.random=function(a){return Math.floor(Math.random()*(a||1E9))};t.prototype.ta=function(a){var b=document;"function"===typeof b.addEventListener?b.addEventListener("readystatechange",a,i):b.attachEvent("onreadystatechange",a)};
window.ftPageFold_v3=function(a){a.breakingOut!==f&&(new l(a),a.campaignID&&27400>parseInt(a.campaignID,10)&&new p(a))};}());
