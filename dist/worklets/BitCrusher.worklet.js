class t extends AudioWorkletProcessor{constructor(){super(),this.stopped=!1,this.phaser=null,this.last=null,this.port.onmessage=t=>{"stop"==t.data&&this.stop()}}static get parameterDescriptors(){return[{name:"bits",defaultValue:16},{name:"normFreq",defaultValue:.9}]}get defaultParameterDescriptors(){return t.parameterDescriptors}process(t,s,e){if(this.stopped)return!1;const r=t[0],a=s[0],l=2*Math.pow(.5,e.bits[0]),h=(1-e.normFreq[0])/(sampleRate/48e3);if(null==this.last&&(this.last=new Array(r.length).fill(0)),null==this.phaser&&(this.phaser=new Array(r.length).fill(0)),r&&r[0]){const t=r[0].length;for(let s=0;s<r.length;s++){const e=r[s],i=a[s];if(e)for(let r=0;r<t;r++)this.phaser[s]+=h,this.phaser[s]>=1&&(this.phaser[s]-=1,this.last[s]=l*Math.floor(e[r]*(1/l)+.5)),i[r]=this.last[s]}}return!0}stop(){this.stopped=!0,this.phaser=null,this.last=null}}registerProcessor("bitcrusher-processor",t);
