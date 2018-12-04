require.config({
    paths: {
        "swiper": "./swiper.min"
    }
})

require(["swiper"], function(swiper) {
    new swiper("#swipers", {})
})