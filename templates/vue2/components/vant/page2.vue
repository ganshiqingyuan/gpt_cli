<template>
    <div class="page2_warp">
        this is page 2
        <van-button
            @click="goPage1"
            type="primary"
        >back to page2</van-button>
    </div>
</template>

<script>
export default {
    name: "page2",
    data() {
        return {};
    },
    methods: {
        goPage1: function () {
            this.$router.push({
                name: "page1",
                path: "/app/page1",
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