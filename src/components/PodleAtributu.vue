<template>
  <div class="ProductDetailAttribute" data-component="AttributeVariantSelect">
    <div v-for="(attribute, prop, index) in attributeData" :key="index">
      <div class="ProductDetailAttributeValue">
        <span class="ProductDetailAttributeValue-title">{{ attribute.label }}</span>

        <span
          class="ProductDetailAttributeValue-select"
          data-component="ValueDisplay"
          :data-attribute="prop"
        >
          <img
            class="ProductDetailAttributeValue-img"
            data-picture
            src="/data/storage/thumbs/60x40-scaleexpand/images/test-data/marketing/clevero-sablona-hodinky.jpg"
            alt="hodinky"
          />
          <div
            class="ProductDetailAttributeValue-color u-hidden"
            data-color
            style="width: 60px;height: 40px; background: #;"
          ></div>
          <label data-label>hodinky</label>
          <div class="ProductDetailAttributeValue-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="10">
              <path
                fill="currentColor"
                d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
              />
            </svg>
          </div>
        </span>
      </div>

      <div
        class="ProductDetailAttributeModal"
        data-component="Attribute"
        :id="`attribute-select-${prop}`"
        :data-attribute="prop"
        data-decimal="0"
        data-template="{$price} Kč"
        data-unavailable="nedostupné"
        data-default="8"
      >
        <div class="ProductDetailAttributeModalContent">
          <div class="ProductDetailAttributeModalClose" data-popup-close>
            <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              />
            </svg>
          </div>
          <div class="ProductDetailAttributeModalElements">
            <div
              v-for="(value, valuesProp, index) in attributeData[prop].values"
              :key="index"
              class="ProductDetailAttributeModalElement"
              data-value="8"
            >
              <a
                href="/data/storage/thumbs/1600x1600-scaleshrink-ke/images/test-data/marketing/clevero-sablona-hodinky.jpg"
                data-lightgallery
              >
                <picture>
                  <source
                    srcset="/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/clevero-sablona-hodinky.jpg.webp"
                    type="image/webp"
                  />
                  <img
                    class="lazy"
                    loading="lazy"
                    src="/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/clevero-sablona-hodinky.jpg"
                    width="120"
                    height="80"
                  />
                </picture>
              </a>
              <label class="ProductDetailAttributeModalElement-label">{{ value.label }}</label>
              <span class="ProductDetailAttributeModalElement-price" data-price></span>
              <button
                v-on:click="updateVariant(prop, valuesProp)"
                class="ButtonBase ButtonBase--sm ButtonBase--ghost"
                data-choose
              >zvolit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { variantTypes, attributeTypes, variantSelectAttribteValuesTypes } from "../types"

declare global {
  interface Window {
    variantData: variantTypes[];
    attributeData: attributeTypes;
  }
}

export default defineComponent({
  name: 'PodleAtributu',
  setup() {
    const variantData = ref<variantTypes[]>(window.variantData)
    const attributeData = ref<attributeTypes>(window.attributeData)
    console.log("variantData.value", variantData.value[0].variantSelectAttributeValues)
    let selectedVariantAttribute = ref(variantData.value[0].variantSelectAttributeValues)
    let selectedVariant = ref({})

    const selectVariant = () => {
      // eslint-disable-next-line
      const selectedVariantValues = Object.values(selectedVariantAttribute.value).flat(1)

      const variantSelectAttributeValues = variantData.value.map((item: variantTypes) => Object.values(item.variantSelectAttributeValues)).map(item => item.flat(1))

      const selectedVariantIndex = variantSelectAttributeValues.findIndex(item => item.every(val => selectedVariantValues.includes(val)))

      if (selectedVariantIndex === undefined) return;

      // console.log(this.variantData[selectedVariantIndex])

      selectedVariant.value = variantData.value[selectedVariantIndex]
    }

    const updateVariant = (attribute: string | number, value: string | number) => {
      selectedVariantAttribute[attribute] = [Number(value)]
      selectVariant()
    }

    selectVariant()

    return {
      attributeData,
      updateVariant,
    }

  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

