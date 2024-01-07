class e{constructor(e){this._array=new Float32Array,this.n=0,this.length=0,this.readPointer=0,this.writePointer=0,this.n=Math.floor(e),this.init()}init(){this._array=new Float32Array(2*this.n),this.length=this._array.length,this.readPointer=0,this.writePointer=this.n-1;for(let e=0;e<this.length;e++)this._array[e]=0}read(){const e=this._array[this.readPointer%this.length];return this.readPointer++,e}push(e){this._array[this.writePointer%this.length]=e,this.writePointer++}reset(){this.init()}clear(){this._array=new Float32Array,this.length=0,this.readPointer=0,this.writePointer=0}}class t extends AudioWorkletProcessor{constructor(){super(),this.delayBuffer=[],this.envelopeSample=0,this.stopped=!1,this.disabled=!1,this.port.onmessage=e=>{"reset"==e.data?this.reset():"stop"==e.data?this.stop():"disable"==e.data?this.disabled=!0:"enable"==e.data&&(this.disabled=!1)}}static get parameterDescriptors(){return[{name:"preGain",defaultValue:0},{name:"postGain",defaultValue:0},{name:"attackTime",defaultValue:0},{name:"releaseTime",defaultValue:3},{name:"threshold",defaultValue:-.05},{name:"lookAheadTime",defaultValue:0}]}get defaultParameterDescriptors(){return t.parameterDescriptors}getEnvelope(e,t,s,r){const a=Math.exp(-1/(r*t)),i=Math.exp(-1/(r*s)),l=new Float32Array(e.length);for(let t=0;t<e.length;t++){const s=Math.abs(e[t]);this.envelopeSample<s?this.envelopeSample=s+a*(this.envelopeSample-s):this.envelopeSample=s+i*(this.envelopeSample-s),l[t]=this.envelopeSample}return l}getMaxEnvelope(e,t,s){let r=e[0][s];for(let a=0;a<t;a++)e[a][s]>r&&(r=e[a][s]);return r}ampToDB(e){return 20*Math.log10(e)}dBToAmp(e){return Math.pow(10,e/20)}process(t,s,r){if(this.stopped)return!1;const a=t[0],i=s[0],l=[],h=this.dBToAmp(r.postGain[0]),n=this.dBToAmp(r.preGain[0]);for(let t=0;t<i.length;t++){const s=a[t],h=i[t];if(null==this.delayBuffer[t]&&(this.delayBuffer[t]=new e(r.lookAheadTime[0]*sampleRate)),s)for(let e=0;e<s.length;++e)h[e]=n*s[e];this.disabled||(l[t]=this.getEnvelope(h,r.attackTime[0],r.releaseTime[0],sampleRate))}for(let e=0;e<i.length;e++){const t=a[e],s=i[e];if(r.lookAheadTime[0]>0)for(let t=0;t<s.length;t++)this.delayBuffer[e].push(s[t]),s[t]=this.delayBuffer[e].read();if(this.disabled)continue;const n=1;if(t)for(let e=0;e<t.length;e++){let t=n*(r.threshold[0]-this.ampToDB(this.getMaxEnvelope(l,i.length,e)));t=Math.min(0,t);const a=this.dBToAmp(t);s[e]*=a*h}}return!0}reset(){for(let e=0;e<this.delayBuffer.length;e++)null!=this.delayBuffer[e]&&this.delayBuffer[e].reset();this.envelopeSample=0}stop(){for(let e=0;e<this.delayBuffer.length;e++)null!=this.delayBuffer[e]&&this.delayBuffer[e].clear();this.delayBuffer=[],this.envelopeSample=0,this.stopped=!0}}registerProcessor("limiter-processor",t);
