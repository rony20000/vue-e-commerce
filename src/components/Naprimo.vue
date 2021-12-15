<template>
  <div class="ProductDetail-info">
    <div class="ProductDetailSpecs" data-component="ProductDetailSpecs">
      <div class="code">Kód produku:</div>
      <p data-code-holder class="code">{{ selectedVariant.code }}</p>

      <div class="guarantee">Záruka:</div>
      <p data-guarantee-holder class="guarantee">{{ selectedVariant.guarantee }}</p>

      <div>Výrobce:</div>
      <p>
        <a href="/vyrobci/poski-com-1/">Poski.com</a>
      </p>
    </div>

    <div class="ProductDetailVariants-title">Varianty:</div>
    <div v-for="(variant, index) in variants" :key="index" class="ProductDetailVariants-holder">
      <div
        class="ProductDetailVariants-item"
        :class="{ 'is-active': selectedVariant.id === variant.id }"
      >
        <span v-on:click="changeVariant(variant.id)">{{ variant.variant }}</span>
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
      </div>

      <form
        :action="selectedVariant.configuratorUrl"
        :method="selectedVariant.salable ? 'get' : selectedVariant.inquirable ? 'post' : ''"
        class="ProductDetailActions-buttons"
        rel="nofollow"
      >
        <input type="hidden" name="id" value="10012" data-variant-input />

        <div
          class="ProductDetailPrices ProductDetailActions-pricing"
          data-component="ProductDetailPrices"
        >
          <div
            class="ProductDetailPrices-priceVat"
            data-price-vat
            v-html="selectedVariant.priceVAT"
          ></div>
          <div
            class="ProductDetailPrices-priceNoVat"
            data-price-no-vat
            data-sufix="bez DPH"
            v-html="selectedVariant.price"
          ></div>
        </div>

        <div
          data-amount-input
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
          :class="!selectedVariant.inquirable && 'u-hidden'"
          class="ButtonBase ButtonBase--primary u-hidden"
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
          :class="selectedVariant.salable && 'u-hidden'"
          class="ButtonBase ButtonBase--primary"
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
import { variantTypes } from "../types"

export default defineComponent({
  name: 'Naprimo',
  data() {
    // eslint-disable-next-line
    const variants = [{ "id": 10020, "title": "GDPR audit webu", "variant": "Bez právní garance", "price": "2&nbsp;893&nbsp;<span class=\"currency\">Kč<\/span>", "priceVAT": "3&nbsp;500&nbsp;<span class=\"currency\">Kč<\/span>", "plainTextPriceVat": 3499.99999943, "oldPriceVAT": "", "originalPrice": "", "salable": true, "inquirable": false, "configuratorUrl": null, "code": "REA061", "unit": "ks", "guarantee": "1 rok", "variantSelectAttributeValues": [], "availability": "Skladem (5+ ks)", "tags": [] }, { "id": 10021, "title": "GDPR audit webu", "variant": "S právní garancí", "price": "15&nbsp;207&nbsp;<span class=\"currency\">Kč<\/span>", "priceVAT": "18&nbsp;400&nbsp;<span class=\"currency\">Kč<\/span>", "plainTextPriceVat": 18399.999999699998, "oldPriceVAT": "", "originalPrice": "", "salable": true, "inquirable": false, "configuratorUrl": null, "code": "REA062", "unit": "ks", "guarantee": "2 roky", "variantSelectAttributeValues": [], "availability": "Skladem (5+ ks)", "tags": [] }]
    return {
      variants: variants as variantTypes[],
      selectedVariant: variants[0] as variantTypes,
    }
  },
  methods: {
    changeVariant(variantId: number) {
      const selectedVariant = this.variants.find(variant => variant.id === +variantId);
      if (selectedVariant === undefined) return;
      this.selectedVariant = selectedVariant
    }
  }
})

</script>

<style>
</style>
