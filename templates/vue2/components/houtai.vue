<template>
    <div class="houtai_container">
        <div class="config_left">
            <el-menu
                default-active="2"
                :collapse="isCollapse"
                class="el-menu-vertical-demo"
            >
                <template v-for="(item,index) of configData">
                    <el-submenu
                        v-if="item.children"
                        :index="index.toString()"
                        :key="index"
                    >
                        <template slot="title">
                            <i class="el-icon-info"></i>
                            <span>{{item.label}}</span>
                        </template>
                        <template v-for="(item1,index1) of item.children.filter(_=>_.showed)">
                            <el-submenu
                                v-if="item1.children"
                                :key="index+'-'+index1"
                                :index="index+'-'+index1"
                            >
                                <template slot="title">{{item1.label}}</template>
                            </el-submenu>

                            <el-menu-item
                                v-else
                                :key="index+'-'+index1"
                                @click="itemDeal(item1)"
                                :index="index+'-'+index1"
                            >
                                <i class="el-icon-info"></i>
                                <span slot="title">{{item1.label}}</span>
                            </el-menu-item>
                        </template>

                    </el-submenu>
                    <el-menu-item
                        v-else
                        :key="index"
                        @click="itemDeal(item)"
                        :index="index.toString()"
                    >
                        <i class="el-icon-info"></i>
                        <span slot="title">{{item.label}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class="config_right">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
export default {
    name: "systemconfig",
    data() {
        return {
            isCollapse: false,
            configData: [
                {
                    label: "报名管理",
                    path: "",
                    icon: "el-icon-c-scale-to-original",
                    code: "0501",
                    showed: false,
                    children: [
                        {
                            label: "报名管理",
                            icon: "el-icon-c-scale-to-original",
                            path: "/houtai/enrollmanager",
                            code: "050101",
                            showed: true,
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        itemDeal: function (item) {
            this.$router.push(item.path);
        },
    },
    mounted: function () {
        console.log(this.configData);
    },
};
</script>

<style lang="less">
.houtai_container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    .config_left {
        height: 100%;
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 220px;
            min-height: 400px;
        }
    }
    .config_right {
        height: 100%;
        flex: 1;
    }
}
</style>
