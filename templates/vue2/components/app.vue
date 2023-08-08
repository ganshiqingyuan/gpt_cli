<template>
    <div class="app_warp">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="less">
.app_warp {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>