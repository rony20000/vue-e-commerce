<template>
    <div class="ProductDetailImages ProductDetail-images" data-component="ProductDetailImages">
        <div class="ProductTags ProductTags--lg ProductDetailImages-tags">
            <div class="ProductTags-tag is-tagRecommended">Doporučený</div>
            <div class="ProductTags-tag is-discounted u-hidden">Sleva</div>
            <div class="ProductTags-tag is-tagNew u-hidden">Novinka</div>
            <div class="ProductTags-tag is-tagSale u-hidden">Výprodej</div>
            <div class="ProductTags-tag is-tagUsed u-hidden">Bazar</div>
            <div class="ProductTags-tag is-tagAction">Akce</div>
            <div class="ProductTags-tag is-tagFreeStorePickup u-hidden">Osobní odběr zdarma</div>
            <div class="ProductTags-tag is-tagFreeDelivery u-hidden">Doprava zdarma</div>
            <span class="ProductTags-tag is-gifts u-hidden">
                <span>Dárek zdarma</span>
            </span>
        </div>

        <div class="ProductDetailImages-mainSlider" data-gallery-group>
            <div class="ProductDetailImages-mainWrapper">
                <div class="ProductDetailImages-mainSlide">
                    <a
                        :href="activePicture"
                        data-lightgallery="j07vpyx5yn4m"
                        title="Pátá fotografie: Content Marketing"
                    >
                        <picture>
                            <source :srcset="`${activePicture}.webp`" type="image/webp" />
                            <img
                                class="lazy"
                                loading="lazy"
                                :src="activePicture"
                                width="630"
                                height="420"
                                alt="Pátá fotografie: Content Marketing"
                                title="Pátá fotografie: Content Marketing"
                            />
                        </picture>
                    </a>
                </div>
            </div>
        </div>
        <div class="ProductDetailImages-thumbHolder">
            <div class="ProductDetailImages-prev" v-on:click="decrease()">
                <svg
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                >
                    <path
                        fill="currentColor"
                        d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                    />
                </svg>
            </div>
            <div class="ProductDetailImages-thumbSlider">
                <div class="ProductDetailImages-thumbWrapper">
                    <div
                        v-for="(picture, index) in pictures"
                        :key="index"
                        class="ProductDetailImages-thumbSlide"
                        :class="(picturesFirstIndex > index || picturesLastIndex < index) && 'u-hidden'"
                        v-on:click="changeActivePicture(index)"
                    >
                        <picture>
                            <source :srcset="`${picture}.webp`" type="image/webp" />
                            <img
                                class="lazy"
                                loading="lazy"
                                :src="picture"
                                width="120"
                                height="80"
                                alt="Clevero Easy"
                                title="Clevero Easy"
                            />
                        </picture>
                    </div>
                </div>
            </div>
            <div class="ProductDetailImages-next" v-on:click="increase()">
                <svg
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                >
                    <path
                        fill="currentColor"
                        d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
                    />
                </svg>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Gallery',
    data() {
        const pictures = [
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/pripadovka-dekstone.png",
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/apexsystems-logo.png",
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/blackreality.png",
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/clevero-sablona-hodinky.jpg",
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/digital-marketing-1433427_1920.jpg",
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/content-marketing-4111003_1920.jpg",
        ]
        const picturesBig = [
            "/data/storage/thumbs/630x420-scaleexpand/images/test-data/marketing/pripadovka-dekstone.png",
            "/data/storage/thumbs/630x420-scaleexpand/images/test-data/marketing/apexsystems-logo.png",
            "/data/storage/thumbs/630x420-scaleexpand/images/test-data/marketing/blackreality.png",
            "/data/storage/thumbs/630x420-scaleexpand/images/test-data/marketing/clevero-sablona-hodinky.jpg",
            "/data/storage/thumbs/630x420-scaleexpand/images/test-data/marketing/digital-marketing-1433427_1920.jpg",
            "/data/storage/thumbs/630x420-scaleexpand/images/test-data/marketing/content-marketing-4111003_1920.jpg",
        ]
        let picturesFirstIndex = 0
        let picturesLastIndex = 3
        return {
            picturesBig: picturesBig as string[],
            pictures: pictures as string[],
            activePicture: picturesBig[0] as string,
            picturesFirstIndex: picturesFirstIndex as number,
            picturesLastIndex: picturesLastIndex as number,
        }
    },
    methods: {
        increase() {
            if (this.picturesLastIndex + 1 === this.pictures.length) return
            this.picturesLastIndex = ++this.picturesLastIndex
            this.picturesFirstIndex = ++this.picturesFirstIndex
        },
        decrease() {
            if (this.picturesFirstIndex === 0) return
            this.picturesLastIndex = --this.picturesLastIndex
            this.picturesFirstIndex = --this.picturesFirstIndex
        },
        changeActivePicture(index: number) {
            this.activePicture = this.picturesBig[index]
        }
    },

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ProductDetailImages-thumbSlide {
    width: 25%;
}
</style>
