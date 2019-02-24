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

  data () {
    return {
    }
  },
}
</script>

<style>
</style>
