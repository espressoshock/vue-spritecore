<template>
  <div class='vue-spritecore'>
      <canvas
      :id='id'
      :width='canvasSize.width'
      :height='canvasSize.height'
      ref='vueSpritecoreCanvas'
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'vue-spritecore',
  props: {
    spritesheet: {
      required: true,
      type: String,
      default: ''
    },
    json: {
      required: true,
      type: Object,
      default: {}
    },
    frameSorting: {
        type: String, 
        required: false,
        default: 'asc',
        validator(val){
            return ['asc', 'desc'].includes(val);
        }
    },
    scaleX: {
        type: Number,
        default: 1, 
        required: false
    },
    scaleY: {
        type: Number,
        default: 1, 
        required: false
    },
    autoplay: {
        type: Boolean,
        default: false, 
        required: false
    },
    loop: {
        type: Boolean,
        default: true, 
        required: false
    },
    id: {
        type: String,
        default: 'vue-spritecore-canvas', 
        required: false
    },
    lowerBound: {
        type: Number,
        default: undefined,
        required: false
    },
    upperBound: {
        type: Number,
        default: undefined,
        required: false
    }
   
  },

  data () {
    return {
        sortingMethods: {
            ascending: 'asc',
            descending: 'desc'
        },
       animation: {
           frames: [],
           index: undefined,
           lower: 0,
           upper: undefined,
           running: false,
           framerate: undefined
       },
        sprite: undefined,
        context: undefined,
        timerRequestID: undefined, //long -> uniquely identifies the entry in the callback list
        timer: {
            start: undefined,
            current: 0,
            last: 0,
            tolerance: 0.1
        }
    };
  },
  computed: {
      animationLength: function(){
          if(!this.animation.frames) return 0;
          return this.animation.frames.length;  
      },
      canvasSize: function(){
            if(!this.animation.frames) return undefined;
            let c = {};
            c.width = this.animation.frames[this.animation.lower].width*this.scaleX; 
            c.height = this.animation.frames[this.animation.lower].height*this.scaleY; 
          return c;
      }
  },
  created: function(){
      this.init();
  },
  mounted: function(){
    
  },
  methods: {
      init: function(){
        this.sortFrames();
        this.setBounds();
        this.animation.index = this.animation.lower;
        this.sprite = new Image();
        this.sprite.src = this.spritesheet;
        this.sprite.onload = ({ sprite }) => { this.spriteInit(sprite) }

      },
      play(from, to){
            this.animation.index = Number.isNaN(Number(from)) ? this.animation.index : from;
            this.animation.upper = Number.isNaN(Number(to)) ? this.animation.upper : to;
            this.animation.running = true;
            this.$emit('animationStarted', this.animation.index, this.animation.upper); //emit animationStart
            this.timerRequestID = window.requestAnimationFrame(this.animationLoop);
      },
      playLegacy(frameRate){
            if(!Number.isNaN(Number(frameRate) && frameRate > 0))
                this.animation.framerate = 1000/frameRate;

            this.animation.running = true;
            this.$emit('animationStarted', this.animation.index, this.animation.upper); //emit animationStart
            
            this.timer.last = performance.now();
            this.timerRequestID = requestAnimationFrame(this.legacyLoop);
      },
      legacyLoop: function(now){
          const delta = now - this.timer.last;
          if(delta>=this.animation.framerate - this.timer.tolerance){
              this.timer.last = now - (delta % this.animation.framerate);
              this.render();
              this.animation.index++;
          }
           //framesToConsume
            if(this.animation.index<this.animation.upper) this.timerRequestID = requestAnimationFrame(this.legacyLoop);
            console.log(this.animation.framerate);
      },
      stop: function(){
            window.cancelAnimationFrame(this.timerRequestID);
            this.animation.running = false;
            this.$emit('animationStopped', this.animation.index); //emit animationStopped
      },
      reset: function(to){
            this.animation.index = Number.isNaN(Number(to)) ? this.animation.index : to;
            if(this.animation.running) this.stop();
            this.render();
            this.$emit('animationReset', this.animation.index); //emit animationReset

      },
      spriteInit: function(sprite){
            this.context = this.$refs.vueSpritecoreCanvas.getContext('2d');
            this.$refs.vueSpritecoreCanvas.width = this.canvasSize.width;
            this.$refs.vueSpritecoreCanvas.height = this.canvasSize.height;
            this.$emit('ready'); //emit ready on img loaded
            if(this.autoplay) this.play();
        
      },
      setBounds: function(){
            if(this.lowerBound !== undefined && this.lowerBound>=0) this.animation.lower = this.lowerBound;
            if(this.upperBound !== undefined && this.upperBound<=this.animationLength && this.upperBound>=this.animation.lower) 
                this.animation.upper = this.upperBound;
            else
                this.animation.upper = this.animationLength;

          console.log(this.animation.lower, this.animation.upper);
      },
      animationLoop: function(){      
            this.render();
            this.animation.index++;
           

            if(this.animation.index>=this.animation.upper && this.loop)
                this.animation.index = 0;

            //framesToConsume
            if(this.animation.index<this.animation.upper)
                this.timerRequestID = window.requestAnimationFrame(this.animationLoop);
            else
                this.$emit('animationOver', this.animation.index); //emit animationOver

      },
      render: function(){
        this.context.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
        this.context.drawImage(this.sprite, this.animation.frames[this.animation.index].x, this.animation.frames[this.animation.index].y, this.canvasSize.width, this.canvasSize.height, 0, 0, this.canvasSize.width, this.canvasSize.height);
      },
      sortFrames: function(){
        this.json.frames.forEach((frame) => {
            this.animation.frames.push({
                name: frame.filename,
                x: frame.frame.x,
                y: frame.frame.y,
                width: frame.frame.w,
                height: frame.frame.h
            })
        })
         this.animation.frames.sort( (a,b) => {
            //a != A
            a = a.name.toLowerCase();
            b = b.name.toLowerCase();

            //sorting types
            if(this.frameSorting.localeCompare(this.sortingMethods.ascending)) return a > b ? -1 : b > a ? 1 : 0;
            return a > b ? 1 : b > a ? -1 : 0;
        });
      },
  }
}
</script>

<style>
</style>
