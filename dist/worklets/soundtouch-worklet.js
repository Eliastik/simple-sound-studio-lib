function t(t,e,i){return e=o(e),function(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,s()?Reflect.construct(e,i||[],o(t).constructor):e.apply(t,i))}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,f(n.key),n)}}function n(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function r(){return r="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,i){var n=function(t,e){for(;!{}.hasOwnProperty.call(t,e)&&null!==(t=o(t)););return t}(t,e);if(n){var r=Object.getOwnPropertyDescriptor(n,e);return r.get?r.get.call(arguments.length<3?t:i):r.value}},r.apply(null,arguments)}function o(t){return o=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},o(t)}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&a(t,e)}function s(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(s=function(){return!!t})()}function a(t,e){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},a(t,e)}function h(t,e,i,n){var u=r(o(t.prototype),e,i);return"function"==typeof u?function(t){return u.apply(i,t)}:u}function f(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var n=i.call(t,e);if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t,"string");return"symbol"==typeof e?e:e+""}function c(t){var e="function"==typeof Map?new Map:void 0;return c=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(e){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,i)}function i(){return function(t,e,i){if(s())return Reflect.construct.apply(null,arguments);var n=[null];n.push.apply(n,e);var r=new(t.bind.apply(t,n));return i&&a(r,i.prototype),r}(t,arguments,o(this).constructor)}return i.prototype=Object.create(t.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),a(i,t)},c(t)}var p=n((function t(){e(this,t),this._vector=new Float32Array,this._position=0,this._frameCount=0}),[{key:"vector",get:function(){return this._vector}},{key:"position",get:function(){return this._position}},{key:"startIndex",get:function(){return 2*this._position}},{key:"frameCount",get:function(){return this._frameCount}},{key:"endIndex",get:function(){return 2*(this._position+this._frameCount)}},{key:"clear",value:function(){this.receive(this._frameCount),this.rewind()}},{key:"put",value:function(t){this._frameCount+=t}},{key:"putSamples",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=2*(e=e||0);i>=0||(i=(t.length-n)/2);var r=2*i;this.ensureCapacity(i+this._frameCount);var o=this.endIndex;this.vector.set(t.subarray(n,n+r),o),this._frameCount+=i}},{key:"putBuffer",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;e=e||0,i>=0||(i=t.frameCount-e),this.putSamples(t.vector,t.position+e,i)}},{key:"receive",value:function(t){t>=0&&!(t>this._frameCount)||(t=this.frameCount),this._frameCount-=t,this._position+=t}},{key:"receiveSamples",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=2*e,n=this.startIndex;t.set(this._vector.subarray(n,n+i)),this.receive(e)}},{key:"extract",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=this.startIndex+2*e,r=2*i;t.set(this._vector.subarray(n,n+r))}},{key:"ensureCapacity",value:function(){var t=parseInt(2*(arguments.length>0&&void 0!==arguments[0]?arguments[0]:0));if(this._vector.length<t){var e=new Float32Array(t);e.set(this._vector.subarray(this.startIndex,this.endIndex)),this._vector=e,this._position=0}else this.rewind()}},{key:"ensureAdditionalCapacity",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.ensureCapacity(this._frameCount+t)}},{key:"rewind",value:function(){this._position>0&&(this._vector.set(this._vector.subarray(this.startIndex,this.endIndex)),this._position=0)}}]),l=n((function t(i){e(this,t),i?(this._inputBuffer=new p,this._outputBuffer=new p):this._inputBuffer=this._outputBuffer=null}),[{key:"inputBuffer",get:function(){return this._inputBuffer},set:function(t){this._inputBuffer=t}},{key:"outputBuffer",get:function(){return this._outputBuffer},set:function(t){this._outputBuffer=t}},{key:"clear",value:function(){this._inputBuffer.clear(),this._outputBuffer.clear()}}]),v=function(){function i(n){var r;return e(this,i),(r=t(this,i,[n])).reset(),r._rate=1,r}return u(i,l),n(i,[{key:"rate",set:function(t){this._rate=t}},{key:"reset",value:function(){this.slopeCount=0,this.prevSampleL=0,this.prevSampleR=0}},{key:"clone",value:function(){var t=new i;return t.rate=this._rate,t}},{key:"process",value:function(){var t=this._inputBuffer.frameCount;this._outputBuffer.ensureAdditionalCapacity(t/this._rate+1);var e=this.transpose(t);this._inputBuffer.receive(),this._outputBuffer.put(e)}},{key:"transpose",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(0===t)return 0;for(var e=this._inputBuffer.vector,i=this._inputBuffer.startIndex,n=this._outputBuffer.vector,r=this._outputBuffer.endIndex,o=0,u=0;this.slopeCount<1;)n[r+2*u]=(1-this.slopeCount)*this.prevSampleL+this.slopeCount*e[i],n[r+2*u+1]=(1-this.slopeCount)*this.prevSampleR+this.slopeCount*e[i+1],u+=1,this.slopeCount+=this._rate;if(this.slopeCount-=1,1!==t)t:for(;;){for(;this.slopeCount>1;)if(this.slopeCount-=1,(o+=1)>=t-1)break t;var s=i+2*o;n[r+2*u]=(1-this.slopeCount)*e[s]+this.slopeCount*e[s+2],n[r+2*u+1]=(1-this.slopeCount)*e[s+1]+this.slopeCount*e[s+3],u+=1,this.slopeCount+=this._rate}return this.prevSampleL=e[i+2*t-2],this.prevSampleR=e[i+2*t-1],u}}])}(),m=n((function t(i){e(this,t),this._pipe=i}),[{key:"pipe",get:function(){return this._pipe}},{key:"inputBuffer",get:function(){return this._pipe.inputBuffer}},{key:"outputBuffer",get:function(){return this._pipe.outputBuffer}},{key:"fillInputBuffer",value:function(){throw new Error("fillInputBuffer() not overridden")}},{key:"fillOutputBuffer",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.outputBuffer.frameCount<t;){var e=16384-this.inputBuffer.frameCount;if(this.fillInputBuffer(e),this.inputBuffer.frameCount<16384)break;this._pipe.process()}}},{key:"clear",value:function(){this._pipe.clear()}}]),d=function(){},y=function(){function i(n,r){var o,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d;return e(this,i),(o=t(this,i,[r])).callback=u,o.sourceSound=n,o.historyBufferSize=22050,o._sourcePosition=0,o.outputBufferPosition=0,o._position=0,o}return u(i,m),n(i,[{key:"position",get:function(){return this._position},set:function(t){if(t>this._position)throw new RangeError("New position may not be greater than current position");var e=this.outputBufferPosition-(this._position-t);if(e<0)throw new RangeError("New position falls outside of history buffer");this.outputBufferPosition=e,this._position=t}},{key:"sourcePosition",get:function(){return this._sourcePosition},set:function(t){this.clear(),this._sourcePosition=t}},{key:"onEnd",value:function(){this.callback()}},{key:"fillInputBuffer",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=new Float32Array(2*t),i=this.sourceSound.extract(e,t,this._sourcePosition);this._sourcePosition+=i,this.inputBuffer.putSamples(e,0,i)}},{key:"extract",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;this.fillOutputBuffer(this.outputBufferPosition+e);var i=Math.min(e,this.outputBuffer.frameCount-this.outputBufferPosition);this.outputBuffer.extract(t,this.outputBufferPosition,i);var n=this.outputBufferPosition+i;return this.outputBufferPosition=Math.min(this.historyBufferSize,n),this.outputBuffer.receive(Math.max(n-this.historyBufferSize,0)),this._position+=i,i}},{key:"handleSampleData",value:function(t){this.extract(t.data,4096)}},{key:"clear",value:function(){h(i,"clear",this)([]),this.outputBufferPosition=0}}])}(),_=[[124,186,248,310,372,434,496,558,620,682,744,806,868,930,992,1054,1116,1178,1240,1302,1364,1426,1488,0],[-100,-75,-50,-25,25,50,75,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[-20,-15,-10,-5,5,10,15,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[-4,-3,-2,-1,1,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],k=-10/3.75,g=function(){function i(n){var r;return e(this,i),(r=t(this,i,[n]))._quickSeek=!0,r.midBufferDirty=!1,r.midBuffer=null,r.overlapLength=0,r.autoSeqSetting=!0,r.autoSeekSetting=!0,r._tempo=1,r.setParameters(44100,0,0,8),r}return u(i,l),n(i,[{key:"clear",value:function(){h(i,"clear",this)([]),this.clearMidBuffer()}},{key:"clearMidBuffer",value:function(){this.midBufferDirty&&(this.midBufferDirty=!1,this.midBuffer=null)}},{key:"setParameters",value:function(t,e,i,n){t>0&&(this.sampleRate=t),n>0&&(this.overlapMs=n),e>0?(this.sequenceMs=e,this.autoSeqSetting=!1):this.autoSeqSetting=!0,i>0?(this.seekWindowMs=i,this.autoSeekSetting=!1):this.autoSeekSetting=!0,this.calculateSequenceParameters(),this.calculateOverlapLength(this.overlapMs),this.tempo=this._tempo}},{key:"tempo",get:function(){return this._tempo},set:function(t){var e;this._tempo=t,this.calculateSequenceParameters(),this.nominalSkip=this._tempo*(this.seekWindowLength-this.overlapLength),this.skipFract=0,e=Math.floor(this.nominalSkip+.5),this.sampleReq=Math.max(e+this.overlapLength,this.seekWindowLength)+this.seekLength}},{key:"inputChunkSize",get:function(){return this.sampleReq}},{key:"outputChunkSize",get:function(){return this.overlapLength+Math.max(0,this.seekWindowLength-2*this.overlapLength)}},{key:"calculateOverlapLength",value:function(){var t,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;t=(t=this.sampleRate*e/1e3)<16?16:t,t-=t%8,this.overlapLength=t,this.refMidBuffer=new Float32Array(2*this.overlapLength),this.midBuffer=new Float32Array(2*this.overlapLength)}},{key:"checkLimits",value:function(t,e,i){return t<e?e:t>i?i:t}},{key:"calculateSequenceParameters",value:function(){var t,e;this.autoSeqSetting&&(t=130+-20*this._tempo,t=this.checkLimits(t,50,125),this.sequenceMs=Math.floor(t+.5)),this.autoSeekSetting&&(e=25.666666666666668+k*this._tempo,e=this.checkLimits(e,15,25),this.seekWindowMs=Math.floor(e+.5)),this.seekWindowLength=Math.floor(this.sampleRate*this.sequenceMs/1e3),this.seekLength=Math.floor(this.sampleRate*this.seekWindowMs/1e3)}},{key:"quickSeek",set:function(t){this._quickSeek=t}},{key:"clone",value:function(){var t=new i;return t.tempo=this._tempo,t.setParameters(this.sampleRate,this.sequenceMs,this.seekWindowMs,this.overlapMs),t}},{key:"seekBestOverlapPosition",value:function(){return this._quickSeek?this.seekBestOverlapPositionStereoQuick():this.seekBestOverlapPositionStereo()}},{key:"seekBestOverlapPositionStereo",value:function(){var t,e,i,n=0;for(this.preCalculateCorrelationReferenceStereo(),t=0,e=Number.MIN_VALUE;n<this.seekLength;n+=1)(i=this.calculateCrossCorrelationStereo(2*n,this.refMidBuffer))>e&&(e=i,t=n);return t}},{key:"seekBestOverlapPositionStereoQuick",value:function(){var t,e,i,n,r,o=0;for(this.preCalculateCorrelationReferenceStereo(),e=Number.MIN_VALUE,t=0,n=0,r=0;o<4;o+=1){for(var u=0;_[o][u]&&!((r=n+_[o][u])>=this.seekLength);)(i=this.calculateCrossCorrelationStereo(2*r,this.refMidBuffer))>e&&(e=i,t=r),u+=1;n=t}return t}},{key:"preCalculateCorrelationReferenceStereo",value:function(){for(var t,e,i=0;i<this.overlapLength;i+=1)e=i*(this.overlapLength-i),t=2*i,this.refMidBuffer[t]=this.midBuffer[t]*e,this.refMidBuffer[t+1]=this.midBuffer[t+1]*e}},{key:"calculateCrossCorrelationStereo",value:function(t,e){var i=this._inputBuffer.vector;t+=this._inputBuffer.startIndex;for(var n,r=0,o=2,u=2*this.overlapLength;o<u;o+=2)r+=i[n=o+t]*e[o]+i[n+1]*e[o+1];return r}},{key:"overlap",value:function(t){this.overlapStereo(2*t)}},{key:"overlapStereo",value:function(t){var e=this._inputBuffer.vector;t+=this._inputBuffer.startIndex;for(var i,n,r,o,u,s=this._outputBuffer.vector,a=this._outputBuffer.endIndex,h=0,f=1/this.overlapLength;h<this.overlapLength;h+=1)n=(this.overlapLength-h)*f,r=h*f,o=(i=2*h)+t,s[(u=i+a)+0]=e[o+0]*r+this.midBuffer[i+0]*n,s[u+1]=e[o+1]*r+this.midBuffer[i+1]*n}},{key:"process",value:function(){var t,e,i;if(null===this.midBuffer){if(this._inputBuffer.frameCount<this.overlapLength)return;this.midBuffer=new Float32Array(2*this.overlapLength),this._inputBuffer.receiveSamples(this.midBuffer,this.overlapLength)}for(;this._inputBuffer.frameCount>=this.sampleReq;){t=this.seekBestOverlapPosition(),this._outputBuffer.ensureAdditionalCapacity(this.overlapLength),this.overlap(Math.floor(t)),this._outputBuffer.put(this.overlapLength),(e=this.seekWindowLength-2*this.overlapLength)>0&&this._outputBuffer.putBuffer(this._inputBuffer,t+this.overlapLength,e);var n=this._inputBuffer.startIndex+2*(t+this.seekWindowLength-this.overlapLength);this.midBuffer.set(this._inputBuffer.vector.subarray(n,n+2*this.overlapLength)),this.skipFract+=this.nominalSkip,i=Math.floor(this.skipFract),this.skipFract-=i,this._inputBuffer.receive(i)}}}])}(),B=function(t,e){return(t>e?t-e:e-t)>1e-10},S=function(){function t(){e(this,t),this.transposer=new v(!1),this.stretch=new g(!1),this._inputBuffer=new p,this._intermediateBuffer=new p,this._outputBuffer=new p,this._rate=0,this._tempo=0,this.virtualPitch=1,this.virtualRate=1,this.virtualTempo=1,this.calculateEffectiveRateAndTempo()}return n(t,[{key:"clear",value:function(){this.transposer.clear(),this.stretch.clear()}},{key:"clone",value:function(){var e=new t;return e.rate=this.rate,e.tempo=this.tempo,e}},{key:"rate",get:function(){return this._rate},set:function(t){this.virtualRate=t,this.calculateEffectiveRateAndTempo()}},{key:"rateChange",set:function(t){this._rate=1+.01*t}},{key:"tempo",get:function(){return this._tempo},set:function(t){this.virtualTempo=t,this.calculateEffectiveRateAndTempo()}},{key:"tempoChange",set:function(t){this.tempo=1+.01*t}},{key:"pitch",set:function(t){this.virtualPitch=t,this.calculateEffectiveRateAndTempo()}},{key:"pitchOctaves",set:function(t){this.pitch=Math.exp(.69314718056*t),this.calculateEffectiveRateAndTempo()}},{key:"pitchSemitones",set:function(t){this.pitchOctaves=t/12}},{key:"inputBuffer",get:function(){return this._inputBuffer}},{key:"outputBuffer",get:function(){return this._outputBuffer}},{key:"calculateEffectiveRateAndTempo",value:function(){var t=this._tempo,e=this._rate;this._tempo=this.virtualTempo/this.virtualPitch,this._rate=this.virtualRate*this.virtualPitch,B(this._tempo,t)&&(this.stretch.tempo=this._tempo),B(this._rate,e)&&(this.transposer.rate=this._rate),this._rate>1?this._outputBuffer!=this.transposer.outputBuffer&&(this.stretch.inputBuffer=this._inputBuffer,this.stretch.outputBuffer=this._intermediateBuffer,this.transposer.inputBuffer=this._intermediateBuffer,this.transposer.outputBuffer=this._outputBuffer):this._outputBuffer!=this.stretch.outputBuffer&&(this.transposer.inputBuffer=this._inputBuffer,this.transposer.outputBuffer=this._intermediateBuffer,this.stretch.inputBuffer=this._intermediateBuffer,this.stretch.outputBuffer=this._outputBuffer)}},{key:"process",value:function(){this._rate>1?(this.stretch.process(),this.transposer.process()):(this.transposer.process(),this.stretch.process())}}])}(),w=n((function t(i){e(this,t),this.buffer=i,this._position=0}),[{key:"dualChannel",get:function(){return this.buffer.numberOfChannels>1}},{key:"position",get:function(){return this._position},set:function(t){this._position=t}},{key:"extract",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.position=i;for(var n=this.buffer.getChannelData(0),r=this.dualChannel?this.buffer.getChannelData(1):this.buffer.getChannelData(0),o=0;o<e;o++)t[2*o]=n[o+i],t[2*o+1]=r[o+i];return Math.min(e,n.length-i)}}]),P=function(t){var e,i,n,r=Math.floor(t/60),o=t-60*r;return"".concat(r,":").concat((e=parseInt(o),n=n||"0",(e+="").length>=(i=2)?e:new Array(i-e.length+1).join(n)+e))},C=function(t){var e=this.timePlayed,i=this.sampleRate;if(this.sourcePosition=t,this.timePlayed=t/i,e!==this.timePlayed){var n=new CustomEvent("play",{detail:{timePlayed:this.timePlayed,formattedTimePlayed:this.formattedTimePlayed,percentagePlayed:this.percentagePlayed}});this._node.dispatchEvent(n)}};n((function t(i,n,r){var o=this,u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:d;e(this,t),this._soundtouch=new S;var s=new w(n);this.timePlayed=0,this.sourcePosition=0,this._filter=new y(s,this._soundtouch,u),this._node=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:4096,r=t.createScriptProcessor(n,2,2),o=new Float32Array(2*n);return r.onaudioprocess=function(t){var r=t.outputBuffer.getChannelData(0),u=t.outputBuffer.getChannelData(1),s=e.extract(o,n);i(e.sourcePosition),0===s&&e.onEnd();for(var a=0;a<s;a++)r[a]=o[2*a],u[a]=o[2*a+1]},r}(i,this._filter,(function(t){return C.call(o,t)}),r),this.tempo=1,this.rate=1,this.duration=n.duration,this.sampleRate=i.sampleRate,this.listeners=[]}),[{key:"formattedDuration",get:function(){return P(this.duration)}},{key:"formattedTimePlayed",get:function(){return P(this.timePlayed)}},{key:"percentagePlayed",get:function(){return 100*this._filter.sourcePosition/(this.duration*this.sampleRate)},set:function(t){this._filter.sourcePosition=parseInt(t*this.duration*this.sampleRate),this.sourcePosition=this._filter.sourcePosition,this.timePlayed=this.sourcePosition/this.sampleRate}},{key:"node",get:function(){return this._node}},{key:"pitch",set:function(t){this._soundtouch.pitch=t}},{key:"pitchSemitones",set:function(t){this._soundtouch.pitchSemitones=t}},{key:"rate",set:function(t){this._soundtouch.rate=t}},{key:"tempo",set:function(t){this._soundtouch.tempo=t}},{key:"connect",value:function(t){this._node.connect(t)}},{key:"disconnect",value:function(){this._node.disconnect()}},{key:"on",value:function(t,e){this.listeners.push({name:t,cb:e}),this._node.addEventListener(t,(function(t){return e(t.detail)}))}},{key:"off",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,i=this.listeners;e&&(i=i.filter((function(t){return t.name===e}))),i.forEach((function(e){t._node.removeEventListener(e.name,(function(t){return e.cb(t.detail)}))}))}}]);var b=function(){function i(){var n;return e(this,i),(n=t(this,i)).bufferSize=128,n._samples=new Float32Array(2*n.bufferSize),n._pipe=new S,n}return u(i,c(AudioWorkletProcessor)),n(i,[{key:"process",value:function(t,e,i){var n,r,o,u;if(!t[0].length)return!0;var s=t[0][0],a=t[0].length>1?t[0][1]:t[0][0],h=e[0][0],f=e[0].length>1?e[0][1]:e[0][0],c=this._samples;if(!h||!h.length)return!1;var p=null!==(n=i.rate[0])&&void 0!==n?n:i.rate,l=null!==(r=i.tempo[0])&&void 0!==r?r:i.tempo,v=null!==(o=i.pitch[0])&&void 0!==o?o:i.pitch,m=null!==(u=i.pitchSemitones[0])&&void 0!==u?u:i.pitchSemitones;this._pipe.rate=p,this._pipe.tempo=l,this._pipe.pitch=v*Math.pow(2,m/12);for(var d=0;d<s.length;d++)c[2*d]=s[d],c[2*d+1]=a[d];this._pipe.inputBuffer.putSamples(c,0,s.length),this._pipe.process();var y=new Float32Array(2*s.length);this._pipe.outputBuffer.receiveSamples(y,h.length);for(var _=0;_<s.length;_++)h[_]=y[2*_],f[_]=y[2*_+1];return!0}}],[{key:"parameterDescriptors",get:function(){return[{name:"rate",defaultValue:1,minValue:.25,maxValue:4},{name:"tempo",defaultValue:1,minValue:.25,maxValue:4},{name:"pitch",defaultValue:1,minValue:.25,maxValue:4},{name:"pitchSemitones",defaultValue:0,minValue:-24,maxValue:24}]}}])}();registerProcessor("soundtouch-processor",b);
