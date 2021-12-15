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

        <div class="ProductDetailImages-mainSlider" data-swiper-main data-gallery-group>
            <div class="ProductDetailImages-mainWrapper">
                <div
                    v-for="(picture, index) in pictures"
                    :key="index"
                    class="ProductDetailImages-mainSlide swiper-slide"
                >
                    <a
                        href="/data/storage/thumbs/1600x1600-scaleshrink-ke/images/test-data/marketing\content-marketing-4111003_1920.jpg"
                        data-lightgallery="j07vpyx5yn4m"
                        title="Pátá fotografie: Content Marketing"
                    >
                        <picture>
                            <source
                                srcset="/data/storage/thumbs/630x420-scaleexpand/images/test-data/marketing\content-marketing-4111003_1920.jpg.webp"
                                type="image/webp"
                            />
                            <img
                                class="lazy"
                                loading="lazy"
                                src="/data/storage/thumbs/630x420-scaleexpand/images/test-data/marketing\content-marketing-4111003_1920.jpg"
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
            <div class="ProductDetailImages-prev">
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
            <div class="ProductDetailImages-thumbSlider swiper-container" data-swiper-thumb>
                <div class="ProductDetailImages-thumbWrapper swiper-wrapper">
                    <div
                        v-for="(picture, index) in pictures"
                        :key="index"
                        class="ProductDetailImages-thumbSlide swiper-slide"
                    >
                        <picture>
                            <source
                                srcset="/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/pripadovka-dekstone.png.webp"
                                type="image/webp"
                            />
                            <img
                                class="lazy"
                                loading="lazy"
                                src="/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/pripadovka-dekstone.png"
                                width="120"
                                height="80"
                                alt="Clevero Easy"
                                title="Clevero Easy"
                            />
                        </picture>
                    </div>
                </div>
            </div>
            <div class="ProductDetailImages-next">
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

<script>
export default {
    name: 'Gallery',
    data() {
        // eslint-disable-next-line
        const pictures = [
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/pripadovka-dekstone.png.webp",
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/pripadovka-dekstone.png.webp",
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/pripadovka-dekstone.png.webp",
            "/data/storage/thumbs/120x80-scaleexpand/images/test-data/marketing/pripadovka-dekstone.png.webp"
        ]
        return {
            pictures,
        }
    },
    methods: {
        print(item) {
            console.log(item)
        },
        print2(item, item2) {
            console.log(item, item2)
        },
        print3(item, item2, item3) {
            console.log(item, item2, item3)
        },
        print4(item, item2, item3, item4) {
            console.log(item, item2, item3, item4)
        },
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
