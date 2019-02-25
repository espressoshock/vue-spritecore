module.exports=function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.i=function(value){return value},__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=2)}([function(module,exports,__webpack_require__){__webpack_require__(8);var Component=__webpack_require__(6)(__webpack_require__(3),__webpack_require__(7),null,null);module.exports=Component.exports},function(module,exports){module.exports=function(){var list=[];return list.toString=function(){for(var result=[],i=0;i<this.length;i++){var item=this[i];item[2]?result.push("@media "+item[2]+"{"+item[1]+"}"):result.push(item[1])}return result.join("")},list.i=function(modules,mediaQuery){"string"==typeof modules&&(modules=[[null,modules,""]]);for(var alreadyImportedModules={},i=0;i<this.length;i++){var id=this[i][0];"number"==typeof id&&(alreadyImportedModules[id]=!0)}for(i=0;i<modules.length;i++){var item=modules[i];"number"==typeof item[0]&&alreadyImportedModules[item[0]]||(mediaQuery&&!item[2]?item[2]=mediaQuery:mediaQuery&&(item[2]="("+item[2]+") and ("+mediaQuery+")"),list.push(item))}},list}},function(module,__webpack_exports__,__webpack_require__){"use strict";function install(Vue){Vue.component("vue-spritecore",__WEBPACK_IMPORTED_MODULE_0__components_VueSpritecore_vue___default.a)}Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.install=install;var __WEBPACK_IMPORTED_MODULE_0__components_VueSpritecore_vue__=__webpack_require__(0),__WEBPACK_IMPORTED_MODULE_0__components_VueSpritecore_vue___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_VueSpritecore_vue__);__webpack_require__.d(__webpack_exports__,"VueSpritecore",function(){return __WEBPACK_IMPORTED_MODULE_0__components_VueSpritecore_vue___default.a});var plugin={version:"1.0.0",install:install};__webpack_exports__.default=plugin;var GlobalVue=null;"undefined"!=typeof window?GlobalVue=window.Vue:"undefined"!=typeof global&&(GlobalVue=global.Vue),GlobalVue&&GlobalVue.use(plugin)},function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={name:"vue-spritecore",props:{spritesheet:{required:!0,type:String,default:""},json:{required:!0,type:Object,default:{}},frameSorting:{type:String,required:!1,default:"asc",validator:function(val){return["asc","desc"].includes(val)}},scaleX:{type:Number,default:1,required:!1},scaleY:{type:Number,default:1,required:!1},autoplay:{type:Boolean,default:!1,required:!1},loop:{type:Boolean,default:!0,required:!1},id:{type:String,default:"vue-spritecore-canvas",required:!1},lowerBound:{type:Number,default:void 0,required:!1},upperBound:{type:Number,default:void 0,required:!1}},data:function(){return{sortingMethods:{ascending:"asc",descending:"desc"},animation:{frames:[],index:void 0,lower:0,upper:void 0,running:!1,framerate:void 0},sprite:void 0,context:void 0,timerRequestID:void 0,timer:{start:void 0,current:0,last:0,tolerance:.1}}},computed:{animationLength:function(){return this.animation.frames?this.animation.frames.length:0},canvasSize:function(){if(this.animation.frames){var c={};return c.width=this.animation.frames[this.animation.lower].width*this.scaleX,c.height=this.animation.frames[this.animation.lower].height*this.scaleY,c}}},created:function(){this.init()},mounted:function(){},methods:{init:function(){var _this=this;this.sortFrames(),this.setBounds(),this.animation.index=this.animation.lower,this.sprite=new Image,this.sprite.src=this.spritesheet,this.sprite.onload=function(_ref){var sprite=_ref.sprite;_this.spriteInit(sprite)}},play:function(from,to){this.animation.index=Number.isNaN(Number(from))?this.animation.index:from,this.animation.upper=Number.isNaN(Number(to))?this.animation.upper:to,this.animation.running=!0,this.$emit("animationStarted",this.animation.index,this.animation.upper),this.timerRequestID=window.requestAnimationFrame(this.animationLoop)},playLegacy:function(frameRate){Number.isNaN(Number(frameRate)&&frameRate>0)||(this.animation.framerate=1e3/frameRate),this.animation.running=!0,this.$emit("animationStarted",this.animation.index,this.animation.upper),this.timer.last=performance.now(),this.timerRequestID=requestAnimationFrame(this.legacyLoop)},legacyLoop:function(now){var delta=now-this.timer.last;delta>=this.animation.framerate-this.timer.tolerance&&(this.timer.last=now-delta%this.animation.framerate,this.render(),this.animation.index++),this.animation.index<this.animation.upper&&(this.timerRequestID=requestAnimationFrame(this.legacyLoop)),console.log(this.animation.framerate)},stop:function(){window.cancelAnimationFrame(this.timerRequestID),this.animation.running=!1,this.$emit("animationStopped",this.animation.index)},reset:function(to){this.animation.running&&this.stop(),this.animation.index=Number.isNaN(Number(to))?this.animation.lower:to,this.render(),this.$emit("animationReset",this.animation.index)},spriteInit:function(sprite){this.context=this.$refs.vueSpritecoreCanvas.getContext("2d"),this.$refs.vueSpritecoreCanvas.width=this.canvasSize.width,this.$refs.vueSpritecoreCanvas.height=this.canvasSize.height,this.$emit("ready"),this.autoplay&&this.play()},setBounds:function(){void 0!==this.lowerBound&&this.lowerBound>=0&&(this.animation.lower=this.lowerBound),void 0!==this.upperBound&&this.upperBound<=this.animationLength&&this.upperBound>=this.animation.lower?this.animation.upper=this.upperBound:this.animation.upper=this.animationLength},animationLoop:function(){this.render(),this.animation.index++,this.animation.index<this.animation.upper?this.timerRequestID=window.requestAnimationFrame(this.animationLoop):(this.$emit("animationOver",this.animation.index),this.loop&&(this.animation.index=this.animation.lower,this.timerRequestID=window.requestAnimationFrame(this.animationLoop)))},render:function(){this.context.clearRect(0,0,this.canvasSize.width,this.canvasSize.height),this.context.drawImage(this.sprite,this.animation.frames[this.animation.index].x,this.animation.frames[this.animation.index].y,this.animation.frames[this.animation.index].width,this.animation.frames[this.animation.index].height,0,0,this.canvasSize.width,this.canvasSize.height)},sortFrames:function(){var _this2=this;this.json.frames.forEach(function(frame){_this2.animation.frames.push({name:frame.filename,x:frame.frame.x,y:frame.frame.y,width:frame.frame.w,height:frame.frame.h})}),this.animation.frames.sort(function(a,b){return a=a.name.toLowerCase(),b=b.name.toLowerCase(),_this2.frameSorting.localeCompare(_this2.sortingMethods.ascending)?a>b?-1:b>a?1:0:a>b?1:b>a?-1:0})}}}},function(module,exports){module.exports=function(parentId,list){for(var styles=[],newStyles={},i=0;i<list.length;i++){var item=list[i],id=item[0],css=item[1],media=item[2],sourceMap=item[3],part={id:parentId+":"+i,css:css,media:media,sourceMap:sourceMap};newStyles[id]?newStyles[id].parts.push(part):styles.push(newStyles[id]={id:id,parts:[part]})}return styles}},function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(1)(),exports.push([module.i,"",""])},function(module,exports){module.exports=function(rawScriptExports,compiledTemplate,scopeId,cssModules){var esModule,scriptExports=rawScriptExports=rawScriptExports||{},type=typeof rawScriptExports.default;"object"!==type&&"function"!==type||(esModule=rawScriptExports,scriptExports=rawScriptExports.default);var options="function"==typeof scriptExports?scriptExports.options:scriptExports;if(compiledTemplate&&(options.render=compiledTemplate.render,options.staticRenderFns=compiledTemplate.staticRenderFns),scopeId&&(options._scopeId=scopeId),cssModules){var computed=options.computed||(options.computed={});Object.keys(cssModules).forEach(function(key){var module=cssModules[key];computed[key]=function(){return module}})}return{esModule:esModule,exports:scriptExports,options:options}}},function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{staticClass:"vue-spritecore"},[_c("canvas",{ref:"vueSpritecoreCanvas",attrs:{id:_vm.id,width:_vm.canvasSize.width,height:_vm.canvasSize.height}})])},staticRenderFns:[]}},function(module,exports,__webpack_require__){var content=__webpack_require__(5);"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals),__webpack_require__(9)("0e54cea0",content,!0)},function(module,exports,__webpack_require__){function addStyleProd(styles,list){for(var i=0;i<list.length;i++)for(var parts=list[i].parts,j=0;j<parts.length;j++){var part=parts[j],id=part.media||"default",style=styles[id];style?(style.ids.push(part.id),style.css+="\n"+part.css):styles[id]={ids:[part.id],css:part.css,media:part.media}}}function addStyleDev(styles,list){for(var i=0;i<list.length;i++)for(var parts=list[i].parts,j=0;j<parts.length;j++){var part=parts[j];styles[part.id]={ids:[part.id],css:part.css,media:part.media}}}function renderStyles(styles){var css="";for(var key in styles){var style=styles[key];css+='<style data-vue-ssr-id="'+style.ids.join(" ")+'"'+(style.media?' media="'+style.media+'"':"")+">"+style.css+"</style>"}return css}var listToStyles=__webpack_require__(4);module.exports=function(parentId,list,isProduction){if("undefined"!=typeof __VUE_SSR_CONTEXT__){var context=__VUE_SSR_CONTEXT__,styles=context._styles;styles||(styles=context._styles={},Object.defineProperty(context,"styles",{enumberable:!0,get:function(){return context._renderedStyles||(context._renderedStyles=renderStyles(styles))}})),list=listToStyles(parentId,list),isProduction?addStyleProd(styles,list):addStyleDev(styles,list)}}}]);