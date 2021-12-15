<template>
  <div class="ProductDetail-info">
    <div class="ProductDetailSpecs" data-component="ProductDetailSpecs">
      <div class="code">Kód produku:</div>
      <p data-code-holder class="code">{{ selectedVariant.code }}</p>

      <div class="guarantee" :class="!selectedVariant.guarantee && 'u-hidden'">Záruka:</div>
      <p
        data-guarantee-holder
        class="guarantee"
        :class="!selectedVariant.guarantee && 'u-hidden'"
      >{{ selectedVariant.guarantee }}</p>

      <div>Výrobce:</div>
      <p>
        <a href="/vyrobci/poski-com-1/">Poski.com</a>
      </p>
    </div>
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
              <svg
                width="1em"
                height="1em"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
              >
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
                      alt
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
    <div
      class="ProductDetailActions"
      data-component="ProductDetailActions"
      data-url-cart="/kosik/"
      data-url-inquiry="/eshop/poptavka/"
    >
      <div class="ProductDetailStock" data-component="ProductDetailStock">
        <div
          class="ProductDetailStock-stock is-in"
          data-stock-placeholder
        >{{ selectedVariant.availability }}</div>

        <div class="ProductDetailStock-delivery">
          Při objednání do 14:00 doručíme
          <span>v pátek - 3.12.2021</span>
        </div>
      </div>

      <form
        class="ProductDetailActions-buttons"
        :action="selectedVariant.configuratorUrl"
        :method="selectedVariant.salable ? 'get' : selectedVariant.inquirable ? 'post' : ''"
        rel="nofollow"
      >
        <input type="hidden" name="id" value="10046" data-variant-input />

        <div
          class="ProductDetailPrices ProductDetailActions-pricing"
          data-component="ProductDetailPrices"
        >
          <div
            class="ProductDetailPrices-priceOriginal u-hidden"
            data-price-original
            v-html="selectedVariant.priceVAT"
          ></div>
          <div
            class="ProductDetailPrices-priceVat"
            data-price-vat
            v-html="selectedVariant.priceVAT"
          ></div>
          <div
            class="ProductDetailPrices-priceNoVat"
            data-price-no-vat
            data-sufix="bez DPH"
            v-html="selectedVariant.priceVAT"
          ></div>
        </div>

        <div
          data-amount-input
          :class="!selectedVariant.salable && 'u-hidden'"
          class="InputUpDownBase ProductDetailActions-amount"
          data-component="InputUpDownBase"
          data-min="1"
        >
          <div class="InputUpDownBase-control" data-decrement>-</div>
          <input aria-label="Množství" type="text" value="1" id="count" name="count" />
          <div class="InputUpDownBase-control" data-increment>+</div>
        </div>
        <button
          :class="!selectedVariant.salable && 'u-hidden'"
          class="ButtonBase ButtonBase--primary"
          type="submit"
          data-button-buy
        >
          <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              fill="currentColor"
              d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
            />
          </svg>
          <span>Koupit</span>
        </button>

        <button
          class="ButtonBase ButtonBase--primary"
          :class="!selectedVariant.inquirable && 'u-hidden'"
          type="submit"
          data-button-inquiry
        >
          <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
            />
          </svg>
          <span>Poptat</span>
        </button>

        <button
          class="ButtonBase ButtonBase--primary u-hidden"
          type="button"
          disabled
          data-button-cannot-buy
        >
          <span>Nelze objednat</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { variantTypes, attributeTypes, variantSelectAttribteValuesTypes } from "../types"

export default defineComponent({
  name: 'PodleAtributu',
  data() {
    // eslint-disable-next-line
    const variantData = [{ "id": 10052, "title": "Clevero Easy", "variant": "Šablona elektro, Balíček zbožové srovnávače ano", "price": "76&nbsp;560&nbsp;<span class=\"currency\">Kč<\/span>", "priceVAT": "92&nbsp;638&nbsp;<span class=\"currency\">Kč<\/span>", "plainTextPriceVat": 92637.59999999999, "oldPriceVAT": "", "originalPrice": "", "salable": true, "inquirable": false, "configuratorUrl": null, "code": "CLEEASY-sssEeeE", "unit": "ks", "guarantee": "nespecifikováno", "variantSelectAttributeValues": { "3": [10], "4": [12] }, "availability": "Skladem (5+ ks)", "tags": ["tagRecommended"] }, { "id": 10051, "title": "Clevero Easy", "variant": "Šablona elektro, Balíček zbožové srovnávače ne", "price": "30&nbsp;960&nbsp;<span class=\"currency\">Kč<\/span>", "priceVAT": "37&nbsp;462&nbsp;<span class=\"currency\">Kč<\/span>", "plainTextPriceVat": 37461.6, "oldPriceVAT": "", "originalPrice": "", "salable": true, "inquirable": false, "configuratorUrl": null, "code": "CLEEASY-E", "unit": "ks", "guarantee": "nespecifikováno", "variantSelectAttributeValues": { "3": [10], "4": [11] }, "availability": "Skladem (5+ ks)", "tags": ["tagRecommended"] }, { "id": 10048, "title": "Clevero Easy", "variant": "Šablona hodinky, Balíček zbožové srovnávače ano", "price": "76&nbsp;560&nbsp;<span class=\"currency\">Kč<\/span>", "priceVAT": "92&nbsp;638&nbsp;<span class=\"currency\">Kč<\/span>", "plainTextPriceVat": 92637.59999999999, "oldPriceVAT": "", "originalPrice": "", "salable": true, "inquirable": false, "configuratorUrl": null, "code": "CLEEASY-HE", "unit": "ks", "guarantee": "nespecifikováno", "variantSelectAttributeValues": { "3": [8], "4": [12] }, "availability": "Skladem (5+ ks)", "tags": ["tagRecommended"] }, { "id": 10047, "title": "Clevero Easy", "variant": "Šablona hodinky, Balíček zbožové srovnávače ne", "price": "30&nbsp;960&nbsp;<span class=\"currency\">Kč<\/span>", "priceVAT": "37&nbsp;462&nbsp;<span class=\"currency\">Kč<\/span>", "plainTextPriceVat": 37461.6, "oldPriceVAT": "", "originalPrice": "", "salable": true, "inquirable": false, "configuratorUrl": null, "code": "CLEEASY-H", "unit": "ks", "guarantee": "nespecifikováno", "variantSelectAttributeValues": { "3": [8], "4": [11] }, "availability": "Skladem (5+ ks)", "tags": ["tagRecommended"] }, { "id": 10050, "title": "Clevero Easy", "variant": "Šablona oblečení, Balíček zbožové srovnávače ano", "price": "76&nbsp;560&nbsp;<span class=\"currency\">Kč<\/span>", "priceVAT": "92&nbsp;638&nbsp;<span class=\"currency\">Kč<\/span>", "plainTextPriceVat": 92637.59999999999, "oldPriceVAT": "", "originalPrice": "", "salable": true, "inquirable": false, "configuratorUrl": null, "code": "CLEEASY-OE", "unit": "ks", "guarantee": "nespecifikováno", "variantSelectAttributeValues": { "3": [9], "4": [12] }, "availability": "Skladem (5+ ks)", "tags": ["tagRecommended"] }, { "id": 10049, "title": "Clevero Easy", "variant": "Šablona oblečení, Balíček zbožové srovnávače ne", "price": "30&nbsp;960&nbsp;<span class=\"currency\">Kč<\/span>", "priceVAT": "37&nbsp;462&nbsp;<span class=\"currency\">Kč<\/span>", "plainTextPriceVat": 37461.6, "oldPriceVAT": "", "originalPrice": "", "salable": true, "inquirable": false, "configuratorUrl": null, "code": "CLEEASY-O", "unit": "ks", "guarantee": "nespecifikováno", "variantSelectAttributeValues": { "3": [9], "4": [11] }, "availability": "Skladem (5+ ks)", "tags": ["tagRecommended"] }]

    // eslint-disable-next-line
    const attributeData = { "3": { "label": "Šablona", "values": { "8": { "label": "hodinky", "color": "", "image": "\/data\/storage\/thumbs\/60x40-scaleexpand\/\/images\/test-data\/marketing\/clevero-sablona-hodinky.jpg" }, "9": { "label": "oblečení", "color": "", "image": "\/data\/storage\/thumbs\/60x40-scaleexpand\/\/images\/test-data\/marketing\/clevero-sablona-obleceni.jpg" }, "10": { "label": "elektro", "color": "", "image": "\/data\/storage\/thumbs\/60x40-scaleexpand\/\/images\/test-data\/marketing\/clevero-sablona-elektro.jpg" } } }, "4": { "label": "Balíček zbožové srovnávače", "values": { "11": { "label": "ne", "color": "", "image": "\/data\/storage\/thumbs\/60x40-scaleexpand\/\/images\/test-data\\placeholder-120x80-attribute1.jpg" }, "12": { "label": "ano", "color": "", "image": "\/data\/storage\/thumbs\/60x40-scaleexpand\/\/images\/test-data\\placeholder-120x80-attribute2.jpg" } } } }
    return {
      attributeData: attributeData as attributeTypes,
      selectedVariantAttribute: variantData[0].variantSelectAttributeValues as variantSelectAttribteValuesTypes,
      selectedVariant: {} as variantTypes,
      variantData: variantData as variantTypes[]
    }
  },
  methods: {
    selectVariant() {
      // eslint-disable-next-line
      const selectedVariantValues = Object.values(this.selectedVariantAttribute).flat(1)

      const variantSelectAttributeValues = this.variantData.map((item: variantTypes) => Object.values(item.variantSelectAttributeValues)).map(item => item.flat(1))

      const selectedVariantIndex = variantSelectAttributeValues.findIndex(item => item.every(val => selectedVariantValues.includes(val)))

      if (selectedVariantIndex === undefined) return;

      // console.log(this.variantData[selectedVariantIndex])

      this.selectedVariant = this.variantData[selectedVariantIndex]
    },
    updateVariant(attribute: string | number, value: string | number) {
      this.selectedVariantAttribute[attribute] = [Number(value)]
      this.selectVariant()
    },
  },
  created() {
    this.selectVariant()
  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

