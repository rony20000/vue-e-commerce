<template>
  <component v-bind:is="variantComponent" />
</template>

<script lang="ts">
import PodleAtributu from './components/PodleAtributu.vue';
import Gallery from './components/Gallery.vue';
import Naprimo from './components/Naprimo.vue';
import NoVariant from './components/NoVariant.vue';
import { defineComponent } from 'vue'
import { attributeTypes, variantTypes } from "./types"

declare global {
  interface Window {
    variantData: variantTypes[];
    attributeData: attributeTypes;
  }
}

export default defineComponent({
  name: 'App',
  components: { Gallery, PodleAtributu, Naprimo, NoVariant },
  data() {
    return {
      variantComponent: window.variantData ? window.attributeData ? "PodleAtributu" : "Naprimo" : "NoVariant"
    }
  },
})
</script>

<style>
</style>
