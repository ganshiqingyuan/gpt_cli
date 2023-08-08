<template>
    <div class="page1_warp">
        this is page 1
        <van-button
            @click="goPage2"
            type="primary"
        >to page2</van-button>
    </div>
</template>

<script>
export default {
    name: "page1",
    data() {
        return {};
    },
    methods: {
        goPage2: function () {
            this.$router.push({
                name: "page2",
                path: "/app/page2",
            });
        },
    },
};
</script>

<style lang="less">
.page1_warp {
    font-size: 30px;
}
</style>