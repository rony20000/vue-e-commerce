<template>
  <div class="ProductDetailVariants-title">Varianty:</div>
  <div v-for="(variant, index) in variants" :key="index" class="ProductDetailVariants-holder">
    <div
      class="ProductDetailVariants-item"
      :class="{ 'is-active': DefaultSelectedVariant.id === variant.id }"
    >
      <span v-on:click="changeVariant(variant.id)">{{ variant.variant }}</span>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue'
import { variantTypes } from "../types"
import EventBus from "../../public/frontend/dist/global/event-bus.min.js";

export default defineComponent({
  name: 'Naprimo',
  setup() {
    const variants = ref<variantTypes[]>(window.variantData)
    let DefaultSelectedVariant = ref<variantTypes>(variants.value[0])

    const changeVariant = (variantId: number) => {
      const selectedVariant = variants.value.find(variant => variant.id === +variantId);
      if (selectedVariant === undefined) return;
      DefaultSelectedVariant.value = selectedVariant
      const EventBusInstance = new EventBus();
      EventBusInstance.dispatchEvent('productVariantChanged', selectedVariant);
    }

    return {
      variants,
      DefaultSelectedVariant,
      changeVariant
    }
  }
})

</script>

<style>
</style>
