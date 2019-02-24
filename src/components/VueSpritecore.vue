<template>
  <div class="vue-spritecore">
      <canvas
      :id='id'
      :width="canvasSize.width"
      :height="canvasSize.height"
      ref="vueSpritecoreCanvas"
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
      default: ""
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
        default: "vue-spritecore-canvas", 
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
}
</script>

<style>
</style>
