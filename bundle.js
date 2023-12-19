(()=>{"use strict";var t,e,n,o,i=function(t){return 1/(1+Math.exp(-t))},r=function(t){return(1-t)*t},a=function(t,e,n){if(n||2===arguments.length)for(var o,i=0,r=e.length;i<r;i++)!o&&i in e||(o||(o=Array.prototype.slice.call(e,0,i)),o[i]=e[i]);return t.concat(o||Array.prototype.slice.call(e))},s=function(){function t(t){this.neurons=[],this.weights=[],this.biases=[],this.trainingEpoch=0,this.momentum=.7,this.learningRate=.3,this.deltaWeights=[],this.deltaBiases=[],this.epochsErrorRate=[],this._onEpochUpdate=[],this._activationFunction=i,this._activationFunctionDerivative=r,t&&(this.setLayout(t),this.initNeuralNetwork(t))}return t.prototype.setLayout=function(t){if(t.length<3)throw new Error("Minimum required length of layout is 3. There should be at least: 1 input, 1 hidden and 1 output layers");this.layout=a([],t,!0)},t.prototype.initNeuralNetwork=function(t){for(var e=[],n=[],o=[],i=[],r=[],a=0;a<this.layout.length;a++)if(e[a]=new Float32Array(t[a]),a){var s=a-1;n[s]=new Float32Array(t[a]),i[s]=new Float32Array(t[a]),o[s]=[],r[s]=[];for(var u=0;u<t[a];u++){n[s][u]=this.random(-.5,.5),o[s][u]=new Float32Array(t[s]),r[s][u]=new Float32Array(t[s]);for(var h=0;h<t[s];h++)o[s][u][h]=this.random(-.5,.5)}}this.neurons=e,this.biases=n,this.weights=o,this.deltaBiases=i,this.deltaWeights=r},t.prototype.random=function(t,e,n){return void 0===n&&(n=4),+(Math.random()*(e-t)+t).toFixed(n)},t.prototype.deepCopy=function(t){return JSON.parse(JSON.stringify(t))},t.prototype.multiplyMatrix=function(t,e){return t.reduce((function(t,n,o){return t+n*e[o]}),0)},t.prototype.countMSEError=function(t,e){return 1===e.length?Math.pow(e[0]-t[0],2):e.reduce((function(n,o,i){return n+Math.pow(o-t[i],2)/e.length}),0)},t.prototype.trainIteration=function(t){for(var e=t.input,n=t.output,o=this.run(e),i=[],r=this.neurons.length-1;r>0;r--){i[r]=new Float32Array(this.neurons[r].length);for(var a=function(t){var e=s.neurons[r][t],a=void 0;if(r===s.neurons.length-1)a=(n[t]-o[t])*s._activationFunctionDerivative(e);else{var u=s.multiplyMatrix(i[r+1],s.weights[r].map((function(e){return e[t]})));a=s._activationFunctionDerivative(e)*u}i[r][t]=a;for(var h=0;h<s.neurons[r-1].length;h++){var l=s.neurons[r-1][h]*a,c=s.learningRate*l+s.momentum*s.deltaWeights[r-1][t][h];s.deltaWeights[r-1][t][h]=c,s.weights[r-1][t][h]+=c}var f=s.neurons[r][t]*a,p=s.learningRate*f+s.momentum*s.deltaBiases[r-1][t];s.deltaBiases[r-1][t]=p,s.biases[r-1][t]+=p},s=this,u=0;u<this.neurons[r].length;u++)a(u)}return this.countMSEError(o,n)},t.prototype.emitOnEpochUpdate=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._onEpochUpdate.forEach((function(e){e.apply(void 0,t)}))},t.prototype.layoutCheck=function(){if(!this.layout)throw new Error("Layout was not initialized. Do it with: new Neural(layout: number[]), setLayout(layout: number[]) of fromJSON(neuralJson)")},t.prototype.setActivationFunctions=function(t,e){this._activationFunction=t,this._activationFunctionDerivative=e},t.prototype.fromJSON=function(t){this.setLayout(t.layout);for(var e=[],n=[],o=[],i=[],r=[],a=0;a<this.layout.length;a++)if(e[a]=new Float32Array(this.layout[a]),0!==a){var s=a-1;n[s]=new Float32Array(this.layout[a]),i[s]=new Float32Array(this.layout[a]),o[s]=[],r[s]=[];for(var u=0;u<this.layout[a];u++){e[a][u]=t.neurons[a][u],n[s][u]=t.biases[s][u],o[s][u]=new Float32Array(this.layout[s]),r[s][u]=new Float32Array(this.layout[s]);for(var h=0;h<this.layout[s];h++)o[s][u][h]=t.weights[s][u][h],r[s][u][h]=t.deltaWeights[s][u][h]}}this.neurons=e,this.biases=n,this.weights=o,this.deltaBiases=i,this.deltaWeights=r},t.prototype.toJSON=function(){return this.layoutCheck(),{layout:a([],this.layout,!0),neurons:this.deepCopy(this.neurons),weights:this.deepCopy(this.weights),biases:this.deepCopy(this.biases),deltaWeights:this.deepCopy(this.deltaWeights),deltaBiases:this.deepCopy(this.deltaBiases)}},t.prototype.run=function(t){this.layoutCheck();for(var e=0;e<this.neurons[0].length;e++)this.neurons[0][e]=t[e];for(e=1;e<this.neurons.length;e++)for(var n=0;n<this.neurons[e].length;n++){var o=this.multiplyMatrix(this.neurons[e-1],this.weights[e-1][n]),i=this._activationFunction(o+this.biases[e-1][n]);this.neurons[e][n]=i}return[].slice.call(this.neurons[this.neurons.length-1])},t.prototype.train=function(t,e){this.layoutCheck();for(var n=0;n<e;n++){for(var o=0,i=0;i<t.length;i++)o+=this.trainIteration(t[i])/t.length;this.epochsErrorRate.push(o),this.emitOnEpochUpdate(this.trainingEpoch),this.trainingEpoch++}},t.prototype.displayRun=function(t,e){var n=this.run(t).map((function(t){return+t.toFixed(3)}));console.log("".concat(n,", expected ").concat(e))},t.prototype.onEpochUpdate=function(t){this._onEpochUpdate.push(t)},t}(),u=document.getElementById("clear"),h=document.getElementById("draw"),l=document.getElementById("result-table"),c=h.getContext("2d"),f=1,p={x:0,y:0},y=new s([784,16,16,10]);function d(){c.fillStyle="#000",c.fillRect(0,0,c.canvas.width,c.canvas.height),c.fillStyle="#fff",E(new Array(10).fill(0))}function v(t){if(t instanceof MouseEvent){if(0!==t.button)return;h.addEventListener("mousemove",w)}else h.addEventListener("touchmove",w);g(t)}function g(t){if(console.log(t),t.preventDefault(),t instanceof MouseEvent)p.x=t.offsetX/10-f/2,p.y=t.offsetY/10-f/2;else{var e=t.touches[0],n=h.offsetParent;p.x=(e.pageX-n.offsetLeft)/10-4*f,p.y=(e.pageY-n.offsetTop)/10-f/2}}function m(){h.removeEventListener("mousemove",w)}function w(t){c.beginPath(),c.lineWidth=2,c.lineCap="round",c.strokeStyle="#fff",c.moveTo(p.x,p.y),g(t),c.lineTo(p.x,p.y),c.stroke();var e,n=(e=c.getImageData(0,0,c.canvas.width,c.canvas.height),Array.from(e.data.filter((function(t,e){return e%4==0}))).map((function(t){return t/255})));E(y.run(n))}function E(t){var e=l.children[0].children[1].children;Array.from(e).forEach((function(e,n){e.innerText=(+t[n].toFixed(2)).toString()}))}t=void 0,e=void 0,o=function(){var t;return function(t,e){var n,o,i,r,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function s(s){return function(u){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;r&&(r=0,s[0]&&(a=0)),a;)try{if(n=1,o&&(i=2&s[0]?o.return:s[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,s[1])).done)return i;switch(o=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,o=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(t){s=[6,t],o=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,u])}}}(this,(function(e){switch(e.label){case 0:return[4,fetch("./3.json")];case 1:return[4,e.sent().json()];case 2:return t=e.sent(),y.fromJSON(t),[2]}}))},new((n=void 0)||(n=Promise))((function(i,r){function a(t){try{u(o.next(t))}catch(t){r(t)}}function s(t){try{u(o.throw(t))}catch(t){r(t)}}function u(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,s)}u((o=o.apply(t,e||[])).next())})),h.addEventListener("mousedown",v),h.addEventListener("mouseup",m),u.addEventListener("click",d),h.addEventListener("touchstart",v),h.addEventListener("touchend",m),c.canvas.width=28,c.canvas.height=28,d()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQVdMLEdBQ1hoQixFQUFJd0MsT0FBT3JDLEVBQU03RixFQUFHNkYsRUFBTUMsR0FDMUJKLEVBQUl5QyxTQUNKLElBTU1DLEVBTkFDLEdBTUFELEVBQVkxQyxFQUFJNEMsYUFBYSxFQUFHLEVBQUc1QyxFQUFJRixPQUFPWSxNQUFPVixFQUFJRixPQUFPYSxRQUV6REUsTUFBTWdDLEtBQUtILEVBQVVJLEtBQUtDLFFBQU8sU0FBQ0MsRUFBR3BILEdBQU0sT0FBQUEsRUFBSSxHQUFNLENBQVYsS0FBYytCLEtBQ3BFLFNBQUNDLEdBQU0sT0FBQUEsRUFBSSxHQUFKLEtBUFRnRCxFQURlUCxFQUFFL0MsSUFBSXFGLEdBRXZCLENBV0EsU0FBUy9CLEVBQWEzRCxHQUNwQixJQUFNZ0csRUFBTWxELEVBQVltRCxTQUFTLEdBQUdBLFNBQVMsR0FBR0EsU0FDaERyQyxNQUFNZ0MsS0FBS0ksR0FBS2pGLFNBQVEsU0FBQ21GLEVBQUl2SCxHQUMxQnVILEVBQW1CQyxZQUFjbkcsRUFBT3JCLEdBQUdTLFFBQVEsSUFBSWdILFVBQzFELEdBQ0YsQyxPQXZGQyxFLE9BQUEsRSxFQUFBLFcsZ25DQUNhLFNBQU1DLE1BQU0sYSxPQUNKLFNBRFIsU0FDa0I5RSxRLGNBQXhCK0UsRUFBYyxTQUNwQmxELEVBQUU5QixTQUFTZ0YsRyxxQkFIWixLLGtRQU1EekQsRUFBT3FCLGlCQUFpQixZQUFhSixHQUNyQ2pCLEVBQU9xQixpQkFBaUIsVUFBV2MsR0FDbkN0QyxFQUFTd0IsaUJBQWlCLFFBQVNaLEdBRW5DVCxFQUFPcUIsaUJBQWlCLGFBQWNKLEdBQ3RDakIsRUFBT3FCLGlCQUFpQixXQUFZYyxHQUtsQ2pDLEVBQUlGLE9BQU9ZLE1BQVEsR0FDbkJWLEVBQUlGLE9BQU9hLE9BQVMsR0FDcEJKLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uZXVyYWwtd2ViLy4vc3JjL0FjdGl2YXRpb25GdW5jdGlvbnMudHMiLCJ3ZWJwYWNrOi8vbmV1cmFsLXdlYi8uL3NyYy9OZXVyYWwudHMiLCJ3ZWJwYWNrOi8vbmV1cmFsLXdlYi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBY3RpdmF0aW9uRnVuY3Rpb25zID0ge1xuICBzaWdtb2lkOiAoeDogbnVtYmVyKSA9PiAxIC8gKDEgKyBNYXRoLmV4cCgteCkpLFxuICBzaWdtb2lkRDogKHNpZ21vaWQ6IG51bWJlcikgPT4gKDEgLSBzaWdtb2lkKSAqIHNpZ21vaWQsXG5cbiAgdGFuaDogKHg6IG51bWJlcikgPT4gTWF0aC50YW5oKHgpLFxuICB0YW5oRDogKHRhbmg6IG51bWJlcikgPT4gMSAtIHRhbmggKiogMixcblxuICByZWx1OiAoeDogbnVtYmVyKSA9PiBNYXRoLm1heCgwLCB4KSxcbiAgcmVsdUQ6IChfOiBudW1iZXIpID0+IDEsXG5cbiAgbGluZWFyOiAoeDogbnVtYmVyKSA9PiB4LFxuICBsaW5lYXJEOiAoXzogbnVtYmVyKSA9PiAxLFxufTtcblxuZXhwb3J0IHsgQWN0aXZhdGlvbkZ1bmN0aW9ucyB9O1xuIiwiaW1wb3J0IHsgQWN0aXZhdGlvbkZ1bmN0aW9ucyB9IGZyb20gJy4vQWN0aXZhdGlvbkZ1bmN0aW9ucyc7XG5cbmNvbnN0IElOSVRJQUxfV0VJR0hUX01JTiA9IC0wLjU7XG5jb25zdCBJTklUSUFMX1dFSUdIVF9NQVggPSAwLjU7XG5cbnR5cGUgTmV1cmFsSlNPTiA9IHtcbiAgbGF5b3V0OiBudW1iZXJbXTtcbiAgbmV1cm9uczogbnVtYmVyW11bXTtcbiAgd2VpZ2h0czogbnVtYmVyW11bXVtdO1xuICBiaWFzZXM6IG51bWJlcltdW107XG5cbiAgZGVsdGFXZWlnaHRzOiBudW1iZXJbXVtdW107XG4gIGRlbHRhQmlhc2VzOiBudW1iZXJbXVtdO1xufTtcblxudHlwZSBUcmFpbmluZ0RhdGEgPSB7XG4gIHJlYWRvbmx5IGlucHV0OiBudW1iZXJbXTtcbiAgcmVhZG9ubHkgb3V0cHV0OiBudW1iZXJbXTtcbn07XG5cbmV4cG9ydCBjbGFzcyBOZXVyYWwge1xuICBwcm90ZWN0ZWQgbGF5b3V0OiBudW1iZXJbXTtcbiAgbmV1cm9uczogRmxvYXQzMkFycmF5W10gPSBbXTtcbiAgd2VpZ2h0czogRmxvYXQzMkFycmF5W11bXSA9IFtdO1xuICBiaWFzZXM6IEZsb2F0MzJBcnJheVtdID0gW107XG5cbiAgdHJhaW5pbmdFcG9jaCA9IDA7XG5cbiAgLy8gdG8ganVtcCBvdmVyIGxvY2FsIG1pbmltdW1zXG4gIG1vbWVudHVtID0gMC43O1xuICAvLyBob3cgZmFyIHdlIHdpbGwgYmUganVtcGluZyAoZnJvbSAwLjAwMSB0byAwLjMgaXMgb3B0aW1hbCwgbW9yZSBuZXVyb25zID0+IGxlc3MgbGVhcm5pbmdSYXRlKVxuICBsZWFybmluZ1JhdGUgPSAwLjM7XG5cbiAgLy8gd2UgdXNlIGl0IGZvciBtZW1lbnR1bVxuICBwcm90ZWN0ZWQgZGVsdGFXZWlnaHRzOiBGbG9hdDMyQXJyYXlbXVtdID0gW107XG4gIHByb3RlY3RlZCBkZWx0YUJpYXNlczogRmxvYXQzMkFycmF5W10gPSBbXTtcblxuICBwdWJsaWMgZXBvY2hzRXJyb3JSYXRlOiBudW1iZXJbXSA9IFtdO1xuXG4gIHByb3RlY3RlZCBfb25FcG9jaFVwZGF0ZTogQ2FsbGFibGVGdW5jdGlvbltdID0gW107XG5cbiAgcHJvdGVjdGVkIF9hY3RpdmF0aW9uRnVuY3Rpb246IENhbGxhYmxlRnVuY3Rpb24gPSBBY3RpdmF0aW9uRnVuY3Rpb25zLnNpZ21vaWQ7XG4gIHByb3RlY3RlZCBfYWN0aXZhdGlvbkZ1bmN0aW9uRGVyaXZhdGl2ZTogQ2FsbGFibGVGdW5jdGlvbiA9XG4gICAgQWN0aXZhdGlvbkZ1bmN0aW9ucy5zaWdtb2lkRDtcblxuICBjb25zdHJ1Y3RvcihsYXlvdXQ/OiBudW1iZXJbXSkge1xuICAgIGlmICghbGF5b3V0KSByZXR1cm47XG4gICAgdGhpcy5zZXRMYXlvdXQobGF5b3V0KTtcbiAgICB0aGlzLmluaXROZXVyYWxOZXR3b3JrKGxheW91dCk7XG4gIH1cblxuICBzZXRMYXlvdXQobGF5b3V0OiBudW1iZXJbXSkge1xuICAgIGlmIChsYXlvdXQubGVuZ3RoIDwgMykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnTWluaW11bSByZXF1aXJlZCBsZW5ndGggb2YgbGF5b3V0IGlzIDMuIFRoZXJlIHNob3VsZCBiZSBhdCBsZWFzdDogMSBpbnB1dCwgMSBoaWRkZW4gYW5kIDEgb3V0cHV0IGxheWVycydcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMubGF5b3V0ID0gWy4uLmxheW91dF07XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdE5ldXJhbE5ldHdvcmsobGF5b3V0OiBudW1iZXJbXSkge1xuICAgIGNvbnN0IG5ldXJvbnM6IEZsb2F0MzJBcnJheVtdID0gW107XG4gICAgY29uc3QgYmlhc2VzOiBGbG9hdDMyQXJyYXlbXSA9IFtdO1xuICAgIGNvbnN0IHdlaWdodHM6IEZsb2F0MzJBcnJheVtdW10gPSBbXTtcbiAgICBjb25zdCBkZWx0YUJpYXNlczogRmxvYXQzMkFycmF5W10gPSBbXTtcbiAgICBjb25zdCBkZWx0YVdlaWdodHM6IEZsb2F0MzJBcnJheVtdW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXlvdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ldXJvbnNbaV0gPSBuZXcgRmxvYXQzMkFycmF5KGxheW91dFtpXSk7XG4gICAgICBpZiAoIWkpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgcHJldkxheWVySW5kZXggPSBpIC0gMTtcbiAgICAgIGJpYXNlc1twcmV2TGF5ZXJJbmRleF0gPSBuZXcgRmxvYXQzMkFycmF5KGxheW91dFtpXSk7XG4gICAgICBkZWx0YUJpYXNlc1twcmV2TGF5ZXJJbmRleF0gPSBuZXcgRmxvYXQzMkFycmF5KGxheW91dFtpXSk7XG4gICAgICB3ZWlnaHRzW3ByZXZMYXllckluZGV4XSA9IFtdO1xuICAgICAgZGVsdGFXZWlnaHRzW3ByZXZMYXllckluZGV4XSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsYXlvdXRbaV07IGorKykge1xuICAgICAgICBiaWFzZXNbcHJldkxheWVySW5kZXhdW2pdID0gdGhpcy5yYW5kb20oXG4gICAgICAgICAgSU5JVElBTF9XRUlHSFRfTUlOLFxuICAgICAgICAgIElOSVRJQUxfV0VJR0hUX01BWFxuICAgICAgICApO1xuICAgICAgICB3ZWlnaHRzW3ByZXZMYXllckluZGV4XVtqXSA9IG5ldyBGbG9hdDMyQXJyYXkobGF5b3V0W3ByZXZMYXllckluZGV4XSk7XG4gICAgICAgIGRlbHRhV2VpZ2h0c1twcmV2TGF5ZXJJbmRleF1bal0gPSBuZXcgRmxvYXQzMkFycmF5KFxuICAgICAgICAgIGxheW91dFtwcmV2TGF5ZXJJbmRleF1cbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBsYXlvdXRbcHJldkxheWVySW5kZXhdOyBrKyspIHtcbiAgICAgICAgICB3ZWlnaHRzW3ByZXZMYXllckluZGV4XVtqXVtrXSA9IHRoaXMucmFuZG9tKFxuICAgICAgICAgICAgSU5JVElBTF9XRUlHSFRfTUlOLFxuICAgICAgICAgICAgSU5JVElBTF9XRUlHSFRfTUFYXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubmV1cm9ucyA9IG5ldXJvbnM7XG4gICAgdGhpcy5iaWFzZXMgPSBiaWFzZXM7XG4gICAgdGhpcy53ZWlnaHRzID0gd2VpZ2h0cztcbiAgICB0aGlzLmRlbHRhQmlhc2VzID0gZGVsdGFCaWFzZXM7XG4gICAgdGhpcy5kZWx0YVdlaWdodHMgPSBkZWx0YVdlaWdodHM7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmFuZG9tKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIgPSA0KTogbnVtYmVyIHtcbiAgICByZXR1cm4gKyhNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW4pLnRvRml4ZWQocHJlY2lzaW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWVwQ29weSh4OiBhbnkpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh4KSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbXVsdGlwbHlNYXRyaXgoXG4gICAgYTogRmxvYXQzMkFycmF5LFxuICAgIGI6IEZsb2F0MzJBcnJheSB8IG51bWJlcltdXG4gICk6IG51bWJlciB7XG4gICAgcmV0dXJuIGEucmVkdWNlKChzdW0sIGN1ciwgaSkgPT4gc3VtICsgY3VyICogYltpXSwgMCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY291bnRNU0VFcnJvcihyZXN1bHQ6IG51bWJlcltdLCBvdXRwdXQ6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICBpZiAob3V0cHV0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuIChvdXRwdXRbMF0gLSByZXN1bHRbMF0pICoqIDI7XG4gICAgcmV0dXJuIG91dHB1dC5yZWR1Y2UoXG4gICAgICAoc3VtLCBvdXQsIGkpID0+IHN1bSArIChvdXQgLSByZXN1bHRbaV0pICoqIDIgLyBvdXRwdXQubGVuZ3RoLFxuICAgICAgMFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdHJhaW5JdGVyYXRpb24oeyBpbnB1dCwgb3V0cHV0IH06IFRyYWluaW5nRGF0YSk6IG51bWJlciB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5ydW4oaW5wdXQpO1xuICAgIGNvbnN0IGRlbHRhTmV1cm9uczogRmxvYXQzMkFycmF5W10gPSBbXTtcbiAgICAvLyB1cGRhdGUgd2VpZ2h0cyB3aXRoIGJhY2sgcHJvcGFnYXRpb25cbiAgICAvLyBodHRwczovL2hhYnIuY29tL3J1L2FydGljbGVzLzMxMzIxNi9cbiAgICBmb3IgKGxldCBpID0gdGhpcy5uZXVyb25zLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgIC8vIGxheWVyXG4gICAgICBkZWx0YU5ldXJvbnNbaV0gPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMubmV1cm9uc1tpXS5sZW5ndGgpO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubmV1cm9uc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAvLyBvdXRwdXQgbmV1cm9uXG4gICAgICAgIGNvbnN0IG91dHB1dE5ldXJvbiA9IHRoaXMubmV1cm9uc1tpXVtqXTtcbiAgICAgICAgbGV0IGRlbHRhTmV1cm9uOiBudW1iZXI7XG4gICAgICAgIGlmIChpID09PSB0aGlzLm5ldXJvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIC8vIG91dHB1dCBuZXVyb24gZGVsdGEgaXM6IEVycm9yICogRicob3V0KVxuICAgICAgICAgIGNvbnN0IGVycm9yID0gb3V0cHV0W2pdIC0gcmVzdWx0W2pdO1xuICAgICAgICAgIGRlbHRhTmV1cm9uID1cbiAgICAgICAgICAgIGVycm9yICogdGhpcy5fYWN0aXZhdGlvbkZ1bmN0aW9uRGVyaXZhdGl2ZShvdXRwdXROZXVyb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGhpZGRlbiBuZXVyb24gZGVsdGEgaXM6IEYnKG91dCkgKiDOoyh3aSAqIGRpKVxuICAgICAgICAgIC8vIGRlcml2YXRpdmUgKiBzdW0gb2YgYWxsIG91dHB1dCB3ZWlnaHRzICogZGVsdGEgb2YgY29ubmVjdGVkIG5ldXJvblxuICAgICAgICAgIC8vIG1hdHJpeCBvcGVyYXRpb25cblxuICAgICAgICAgIGNvbnN0IHdlaWdodHNTdW06IG51bWJlciA9IHRoaXMubXVsdGlwbHlNYXRyaXgoXG4gICAgICAgICAgICBkZWx0YU5ldXJvbnNbaSArIDFdLFxuICAgICAgICAgICAgdGhpcy53ZWlnaHRzW2ldLm1hcCgodikgPT4gdltqXSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGRlbHRhTmV1cm9uID1cbiAgICAgICAgICAgIHRoaXMuX2FjdGl2YXRpb25GdW5jdGlvbkRlcml2YXRpdmUob3V0cHV0TmV1cm9uKSAqIHdlaWdodHNTdW07XG4gICAgICAgIH1cbiAgICAgICAgZGVsdGFOZXVyb25zW2ldW2pdID0gZGVsdGFOZXVyb247XG4gICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5uZXVyb25zW2kgLSAxXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIC8vIGlucHV0IG5ldXJvblxuICAgICAgICAgIC8vIHVwZGF0ZSBhbGwgd2VpZ2h0cyB0aGF0IGdvIGZyb20gdGhlIG91dHB1dCBuZXVyb25cbiAgICAgICAgICAvLyBtYXRyaXggb3BlcmF0aW9uXG4gICAgICAgICAgY29uc3QgZ3JhZCA9IHRoaXMubmV1cm9uc1tpIC0gMV1ba10gKiBkZWx0YU5ldXJvbjtcbiAgICAgICAgICBjb25zdCBkdyA9XG4gICAgICAgICAgICB0aGlzLmxlYXJuaW5nUmF0ZSAqIGdyYWQgK1xuICAgICAgICAgICAgdGhpcy5tb21lbnR1bSAqIHRoaXMuZGVsdGFXZWlnaHRzW2kgLSAxXVtqXVtrXTtcbiAgICAgICAgICB0aGlzLmRlbHRhV2VpZ2h0c1tpIC0gMV1bal1ba10gPSBkdztcbiAgICAgICAgICB0aGlzLndlaWdodHNbaSAtIDFdW2pdW2tdICs9IGR3O1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSBiaWFzZXNcbiAgICAgICAgLy8gbWF0cml4IG9wZXJhdGlvblxuICAgICAgICBjb25zdCBncmFkID0gdGhpcy5uZXVyb25zW2ldW2pdICogZGVsdGFOZXVyb247XG4gICAgICAgIGNvbnN0IGR3ID1cbiAgICAgICAgICB0aGlzLmxlYXJuaW5nUmF0ZSAqIGdyYWQgKyB0aGlzLm1vbWVudHVtICogdGhpcy5kZWx0YUJpYXNlc1tpIC0gMV1bal07XG4gICAgICAgIHRoaXMuZGVsdGFCaWFzZXNbaSAtIDFdW2pdID0gZHc7XG4gICAgICAgIHRoaXMuYmlhc2VzW2kgLSAxXVtqXSArPSBkdztcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZXJyb3IgPSB0aGlzLmNvdW50TVNFRXJyb3IocmVzdWx0LCBvdXRwdXQpO1xuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuXG4gIHByb3RlY3RlZCBlbWl0T25FcG9jaFVwZGF0ZSguLi5wYXJhbXM6IGFueSkge1xuICAgIHRoaXMuX29uRXBvY2hVcGRhdGUuZm9yRWFjaCgoZnVuYykgPT4ge1xuICAgICAgZnVuYyguLi5wYXJhbXMpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxheW91dENoZWNrKCkge1xuICAgIGlmICghdGhpcy5sYXlvdXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0xheW91dCB3YXMgbm90IGluaXRpYWxpemVkLiBEbyBpdCB3aXRoOiBuZXcgTmV1cmFsKGxheW91dDogbnVtYmVyW10pLCBzZXRMYXlvdXQobGF5b3V0OiBudW1iZXJbXSkgb2YgZnJvbUpTT04obmV1cmFsSnNvbiknXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldEFjdGl2YXRpb25GdW5jdGlvbnMoZm46IENhbGxhYmxlRnVuY3Rpb24sIGZuZDogQ2FsbGFibGVGdW5jdGlvbikge1xuICAgIHRoaXMuX2FjdGl2YXRpb25GdW5jdGlvbiA9IGZuO1xuICAgIHRoaXMuX2FjdGl2YXRpb25GdW5jdGlvbkRlcml2YXRpdmUgPSBmbmQ7XG4gIH1cblxuICBmcm9tSlNPTihqc29uOiBOZXVyYWxKU09OKSB7XG4gICAgdGhpcy5zZXRMYXlvdXQoanNvbi5sYXlvdXQpO1xuICAgIGNvbnN0IG5ldXJvbnM6IEZsb2F0MzJBcnJheVtdID0gW107XG4gICAgY29uc3QgYmlhc2VzOiBGbG9hdDMyQXJyYXlbXSA9IFtdO1xuICAgIGNvbnN0IHdlaWdodHM6IEZsb2F0MzJBcnJheVtdW10gPSBbXTtcbiAgICBjb25zdCBkZWx0YUJpYXNlczogRmxvYXQzMkFycmF5W10gPSBbXTtcbiAgICBjb25zdCBkZWx0YVdlaWdodHM6IEZsb2F0MzJBcnJheVtdW10gPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYXlvdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ldXJvbnNbaV0gPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMubGF5b3V0W2ldKTtcbiAgICAgIGlmIChpID09PSAwKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IHByZXZMYXllckluZGV4ID0gaSAtIDE7XG4gICAgICBiaWFzZXNbcHJldkxheWVySW5kZXhdID0gbmV3IEZsb2F0MzJBcnJheSh0aGlzLmxheW91dFtpXSk7XG4gICAgICBkZWx0YUJpYXNlc1twcmV2TGF5ZXJJbmRleF0gPSBuZXcgRmxvYXQzMkFycmF5KHRoaXMubGF5b3V0W2ldKTtcbiAgICAgIHdlaWdodHNbcHJldkxheWVySW5kZXhdID0gW107XG4gICAgICBkZWx0YVdlaWdodHNbcHJldkxheWVySW5kZXhdID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGF5b3V0W2ldOyBqKyspIHtcbiAgICAgICAgbmV1cm9uc1tpXVtqXSA9IGpzb24ubmV1cm9uc1tpXVtqXTtcbiAgICAgICAgYmlhc2VzW3ByZXZMYXllckluZGV4XVtqXSA9IGpzb24uYmlhc2VzW3ByZXZMYXllckluZGV4XVtqXTtcbiAgICAgICAgd2VpZ2h0c1twcmV2TGF5ZXJJbmRleF1bal0gPSBuZXcgRmxvYXQzMkFycmF5KFxuICAgICAgICAgIHRoaXMubGF5b3V0W3ByZXZMYXllckluZGV4XVxuICAgICAgICApO1xuICAgICAgICBkZWx0YVdlaWdodHNbcHJldkxheWVySW5kZXhdW2pdID0gbmV3IEZsb2F0MzJBcnJheShcbiAgICAgICAgICB0aGlzLmxheW91dFtwcmV2TGF5ZXJJbmRleF1cbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCB0aGlzLmxheW91dFtwcmV2TGF5ZXJJbmRleF07IGsrKykge1xuICAgICAgICAgIHdlaWdodHNbcHJldkxheWVySW5kZXhdW2pdW2tdID0ganNvbi53ZWlnaHRzW3ByZXZMYXllckluZGV4XVtqXVtrXTtcbiAgICAgICAgICBkZWx0YVdlaWdodHNbcHJldkxheWVySW5kZXhdW2pdW2tdID1cbiAgICAgICAgICAgIGpzb24uZGVsdGFXZWlnaHRzW3ByZXZMYXllckluZGV4XVtqXVtrXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubmV1cm9ucyA9IG5ldXJvbnM7XG4gICAgdGhpcy5iaWFzZXMgPSBiaWFzZXM7XG4gICAgdGhpcy53ZWlnaHRzID0gd2VpZ2h0cztcbiAgICB0aGlzLmRlbHRhQmlhc2VzID0gZGVsdGFCaWFzZXM7XG4gICAgdGhpcy5kZWx0YVdlaWdodHMgPSBkZWx0YVdlaWdodHM7XG4gIH1cblxuICB0b0pTT04oKTogTmV1cmFsSlNPTiB7XG4gICAgdGhpcy5sYXlvdXRDaGVjaygpO1xuICAgIGNvbnN0IGpzb246IE5ldXJhbEpTT04gPSB7XG4gICAgICBsYXlvdXQ6IFsuLi50aGlzLmxheW91dF0sXG4gICAgICBuZXVyb25zOiB0aGlzLmRlZXBDb3B5KHRoaXMubmV1cm9ucyksXG4gICAgICB3ZWlnaHRzOiB0aGlzLmRlZXBDb3B5KHRoaXMud2VpZ2h0cyksXG4gICAgICBiaWFzZXM6IHRoaXMuZGVlcENvcHkodGhpcy5iaWFzZXMpLFxuXG4gICAgICBkZWx0YVdlaWdodHM6IHRoaXMuZGVlcENvcHkodGhpcy5kZWx0YVdlaWdodHMpLFxuICAgICAgZGVsdGFCaWFzZXM6IHRoaXMuZGVlcENvcHkodGhpcy5kZWx0YUJpYXNlcyksXG4gICAgfTtcbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHJ1bihpbnB1dERhdGE6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIHRoaXMubGF5b3V0Q2hlY2soKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmV1cm9uc1swXS5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5uZXVyb25zWzBdW2ldID0gaW5wdXREYXRhW2ldO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy5uZXVyb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubmV1cm9uc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBuZXVyb25JbnB1dCA9IHRoaXMubXVsdGlwbHlNYXRyaXgoXG4gICAgICAgICAgdGhpcy5uZXVyb25zW2kgLSAxXSxcbiAgICAgICAgICB0aGlzLndlaWdodHNbaSAtIDFdW2pdXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG5ldXJvbk91dHB1dCA9IHRoaXMuX2FjdGl2YXRpb25GdW5jdGlvbihcbiAgICAgICAgICBuZXVyb25JbnB1dCArIHRoaXMuYmlhc2VzW2kgLSAxXVtqXVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMubmV1cm9uc1tpXVtqXSA9IG5ldXJvbk91dHB1dDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwodGhpcy5uZXVyb25zW3RoaXMubmV1cm9ucy5sZW5ndGggLSAxXSk7XG4gIH1cblxuICB0cmFpbih0cmFpbmluZ0RhdGE6IFRyYWluaW5nRGF0YVtdLCBlcG9jaEFtb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5sYXlvdXRDaGVjaygpO1xuICAgIC8vIHdlIHdpbGwgdXBkYXRlIGFsbCBkdyByaWdodCBpbiBldmVyeSBpdGVyYXRpb25cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVwb2NoQW1vdW50OyBpKyspIHtcbiAgICAgIGxldCBlcG9jaEVycm9yUmF0ZSA9IDA7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRyYWluaW5nRGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBpdGVyYXRpb25FcnJvciA9IHRoaXMudHJhaW5JdGVyYXRpb24odHJhaW5pbmdEYXRhW2pdKTtcbiAgICAgICAgZXBvY2hFcnJvclJhdGUgKz0gaXRlcmF0aW9uRXJyb3IgLyB0cmFpbmluZ0RhdGEubGVuZ3RoO1xuICAgICAgfVxuICAgICAgdGhpcy5lcG9jaHNFcnJvclJhdGUucHVzaChlcG9jaEVycm9yUmF0ZSk7XG4gICAgICB0aGlzLmVtaXRPbkVwb2NoVXBkYXRlKHRoaXMudHJhaW5pbmdFcG9jaCk7XG4gICAgICB0aGlzLnRyYWluaW5nRXBvY2grKztcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5UnVuKGlucHV0OiBudW1iZXJbXSwgZXhwZWN0ZWQ6IG51bWJlcltdKSB7XG4gICAgY29uc3QgZm9ybWF0ZWRSZXN1bHQgPSB0aGlzLnJ1bihpbnB1dCkubWFwKCh2KSA9PiArdi50b0ZpeGVkKDMpKTtcbiAgICBjb25zb2xlLmxvZyhgJHtmb3JtYXRlZFJlc3VsdH0sIGV4cGVjdGVkICR7ZXhwZWN0ZWR9YCk7XG4gIH1cblxuICBvbkVwb2NoVXBkYXRlKGNhbGxiYWNrOiBDYWxsYWJsZUZ1bmN0aW9uKSB7XG4gICAgdGhpcy5fb25FcG9jaFVwZGF0ZS5wdXNoKGNhbGxiYWNrKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmV1cmFsIH0gZnJvbSBcIi4vTmV1cmFsXCI7XG5cbmNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyJyk7XG5jb25zdCBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RyYXcnKTtcbmNvbnN0IHJlc3VsdFRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdC10YWJsZScpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jb25zdCBwZW5XaWR0aCA9IDE7XG5jb25zdCBjb29yZCA9IHsgeDogMCwgeTogMCB9O1xuXG5jb25zdCBuID0gbmV3IE5ldXJhbChbNzg0LCAxNiwgMTYsIDEwXSk7XG4oYXN5bmMgKCkgPT4ge1xuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnLi8zLmpzb24nKTtcbiAgY29uc3Qgd2VpZ2h0c0RhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICBuLmZyb21KU09OKHdlaWdodHNEYXRhKTtcbn0pKCk7XG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzdGFydCk7XG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN0b3ApO1xuY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGVhcik7XG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0Jywgc3RhcnQpO1xuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgc3RvcCk7XG5cbmluaXQoKTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgY3R4LmNhbnZhcy53aWR0aCA9IDI4O1xuICBjdHguY2FudmFzLmhlaWdodCA9IDI4O1xuICBjbGVhcigpO1xufVxuXG5mdW5jdGlvbiBjbGVhcigpIHtcbiAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwJztcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcbiAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcbiAgdXBkYXRlUmVzdWx0KG5ldyBBcnJheSgxMCkuZmlsbCgwKSk7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KGV2ZW50OiBNb3VzZUV2ZW50fFRvdWNoRXZlbnQpIHtcbiAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgIGlmICgoZXZlbnQgYXMgTW91c2VFdmVudCkuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGRyYXcpO1xuICB9IGVsc2Uge1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBkcmF3KTtcbiAgfVxuICByZXBvc2l0aW9uKGV2ZW50KTtcbiAgLy8gbW91c2UgZXZlbnRcbiAgXG59XG5cbmZ1bmN0aW9uIHJlcG9zaXRpb24oZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XG4gIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTW91c2VFdmVudCkge1xuICAgIGNvb3JkLnggPSBldmVudC5vZmZzZXRYIC8gMTAgLSBwZW5XaWR0aCAvIDI7XG4gICAgY29vcmQueSA9IGV2ZW50Lm9mZnNldFkgLyAxMCAtIHBlbldpZHRoIC8gMjtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgY29uc3Qgb2Zmc2V0RWxlbWVudCA9IGNhbnZhcy5vZmZzZXRQYXJlbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29vcmQueCA9ICh0b3VjaC5wYWdlWCAtIG9mZnNldEVsZW1lbnQub2Zmc2V0TGVmdCkgLyAxMCAtIHBlbldpZHRoICogNDtcbiAgICBjb29yZC55ID0gKHRvdWNoLnBhZ2VZIC0gb2Zmc2V0RWxlbWVudC5vZmZzZXRUb3ApIC8gMTAgLSBwZW5XaWR0aCAvIDI7XG4gIH1cbiAgXG59XG5cbmZ1bmN0aW9uIHN0b3AoKSB7XG4gIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBkcmF3KTtcbn1cblxuZnVuY3Rpb24gZHJhdyhldmVudDogTW91c2VFdmVudCkge1xuICBjdHguYmVnaW5QYXRoKCk7XG4gIGN0eC5saW5lV2lkdGggPSAyO1xuICBjdHgubGluZUNhcCA9ICdyb3VuZCc7XG4gIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmJztcbiAgY3R4Lm1vdmVUbyhjb29yZC54LCBjb29yZC55KTtcbiAgcmVwb3NpdGlvbihldmVudCk7XG4gIGN0eC5saW5lVG8oY29vcmQueCwgY29vcmQueSk7XG4gIGN0eC5zdHJva2UoKTtcbiAgY29uc3QgY2FudmFzRGF0YSA9IGdldENhbnZhc0RhdGEoKTtcbiAgY29uc3QgcmVzdWx0ID0gbi5ydW4oY2FudmFzRGF0YSk7XG4gIHVwZGF0ZVJlc3VsdChyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiBnZXRDYW52YXNEYXRhKCkge1xuICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcbiAgLy8ga2VleSBldmVyeSA0dGggZWxlbWVudHMocikgd2l0aG91dCAoZ2JhKVxuICBjb25zdCBkYXRhID0gQXJyYXkuZnJvbShpbWFnZURhdGEuZGF0YS5maWx0ZXIoKF8sIGkpID0+IGkgJSA0ID09PSAwKSkubWFwKFxuICAgICh2KSA9PiB2IC8gMjU1XG4gICk7XG4gIHJldHVybiBkYXRhO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVSZXN1bHQocmVzdWx0OiBudW1iZXJbXSkge1xuICBjb25zdCB0ZHMgPSByZXN1bHRUYWJsZS5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jaGlsZHJlbjtcbiAgQXJyYXkuZnJvbSh0ZHMpLmZvckVhY2goKHRkLCBpKSA9PiB7XG4gICAgKHRkIGFzIEhUTUxFbGVtZW50KS5pbm5lclRleHQgPSAoK3Jlc3VsdFtpXS50b0ZpeGVkKDIpKS50b1N0cmluZygpO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJBY3RpdmF0aW9uRnVuY3Rpb25zIiwieCIsIk1hdGgiLCJleHAiLCJzaWdtb2lkIiwibGF5b3V0IiwibmV1cm9ucyIsIndlaWdodHMiLCJiaWFzZXMiLCJ0cmFpbmluZ0Vwb2NoIiwibW9tZW50dW0iLCJsZWFybmluZ1JhdGUiLCJkZWx0YVdlaWdodHMiLCJkZWx0YUJpYXNlcyIsImVwb2Noc0Vycm9yUmF0ZSIsIl9vbkVwb2NoVXBkYXRlIiwiX2FjdGl2YXRpb25GdW5jdGlvbiIsIl9hY3RpdmF0aW9uRnVuY3Rpb25EZXJpdmF0aXZlIiwidGhpcyIsInNldExheW91dCIsImluaXROZXVyYWxOZXR3b3JrIiwibGVuZ3RoIiwiRXJyb3IiLCJpIiwiRmxvYXQzMkFycmF5IiwicHJldkxheWVySW5kZXgiLCJqIiwicmFuZG9tIiwiayIsIm1pbiIsIm1heCIsInByZWNpc2lvbiIsInRvRml4ZWQiLCJkZWVwQ29weSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIm11bHRpcGx5TWF0cml4IiwiYSIsImIiLCJyZWR1Y2UiLCJzdW0iLCJjdXIiLCJjb3VudE1TRUVycm9yIiwicmVzdWx0Iiwib3V0cHV0Iiwib3V0IiwidHJhaW5JdGVyYXRpb24iLCJpbnB1dCIsInJ1biIsImRlbHRhTmV1cm9ucyIsIm91dHB1dE5ldXJvbiIsImRlbHRhTmV1cm9uIiwid2VpZ2h0c1N1bSIsIm1hcCIsInYiLCJncmFkIiwiZHciLCJlbWl0T25FcG9jaFVwZGF0ZSIsImZvckVhY2giLCJmdW5jIiwicGFyYW1zIiwibGF5b3V0Q2hlY2siLCJzZXRBY3RpdmF0aW9uRnVuY3Rpb25zIiwiZm4iLCJmbmQiLCJmcm9tSlNPTiIsImpzb24iLCJ0b0pTT04iLCJpbnB1dERhdGEiLCJuZXVyb25JbnB1dCIsIm5ldXJvbk91dHB1dCIsInNsaWNlIiwiY2FsbCIsInRyYWluIiwidHJhaW5pbmdEYXRhIiwiZXBvY2hBbW91bnQiLCJlcG9jaEVycm9yUmF0ZSIsInB1c2giLCJkaXNwbGF5UnVuIiwiZXhwZWN0ZWQiLCJmb3JtYXRlZFJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJvbkVwb2NoVXBkYXRlIiwiY2FsbGJhY2siLCJjbGVhckJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjYW52YXMiLCJyZXN1bHRUYWJsZSIsImN0eCIsImdldENvbnRleHQiLCJwZW5XaWR0aCIsImNvb3JkIiwieSIsIm4iLCJOZXVyYWwiLCJjbGVhciIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJ1cGRhdGVSZXN1bHQiLCJBcnJheSIsImZpbGwiLCJzdGFydCIsImV2ZW50IiwiTW91c2VFdmVudCIsImJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkcmF3IiwicmVwb3NpdGlvbiIsInByZXZlbnREZWZhdWx0Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ0b3VjaCIsInRvdWNoZXMiLCJvZmZzZXRFbGVtZW50Iiwib2Zmc2V0UGFyZW50IiwicGFnZVgiLCJvZmZzZXRMZWZ0IiwicGFnZVkiLCJvZmZzZXRUb3AiLCJzdG9wIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImJlZ2luUGF0aCIsImxpbmVXaWR0aCIsImxpbmVDYXAiLCJzdHJva2VTdHlsZSIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsImltYWdlRGF0YSIsImNhbnZhc0RhdGEiLCJnZXRJbWFnZURhdGEiLCJmcm9tIiwiZGF0YSIsImZpbHRlciIsIl8iLCJ0ZHMiLCJjaGlsZHJlbiIsInRkIiwiaW5uZXJUZXh0IiwidG9TdHJpbmciLCJmZXRjaCIsIndlaWdodHNEYXRhIl0sInNvdXJjZVJvb3QiOiIifQ==