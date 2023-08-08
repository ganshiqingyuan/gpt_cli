<template>
    <div class="activity_list_warp page_warp">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>管理</el-breadcrumb-item>
            <el-breadcrumb-item>报名管理</el-breadcrumb-item>
        </el-breadcrumb>
        <enroll-change
            :propsEnroll='propsEnroll'
            v-if="enrollChangeShowFlag"
        ></enroll-change>
        <el-form label-width='120px'>
            <el-row>
                <el-col :span="8">
                    <el-form-item
                        label='报名名称'
                        size="small"
                    >
                        <el-input v-model="queryItem.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item size="small">
                        <el-button
                            type="text"
                            @click="queryList(1)"
                        >查询</el-button>
                        <el-button @click="changeEnrollChangeShowFlag(true)">添加活动</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-table
            v-loading='tableLoading'
            :data='enrollList'
        >
            <el-table-column
                type="index"
                width="50"
            >
            </el-table-column>

            <el-table-column
                label='活动名称'
                prop='title'
            >
            </el-table-column>

            <el-table-column
                label='活动日期'
                prop='dateTitle'
            >
            </el-table-column>

            <el-table-column label="报名情况">
                <template slot-scope="scope">
                    <el-popover
                        placement="top-start"
                        width="60px"
                        trigger="hover"
                    >
                        <ul
                            class="deal_list"
                            style="list-style: none;"
                        >
                            <li
                                v-for="(item,index) of scope.row.persons"
                                :key="index"
                            >
                                {{`${item.name}/ 电话：${item.phone} / 学校：${item.school} / 日期：${item.time}`}}
                            </li>
                        </ul>
                        <div
                            style="cursor: pointer"
                            slot="reference"
                        >
                            查看
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column
                label='状态'
                prop='isUsed'
            >
                <template slot-scope="scope">
                    <p
                        v-if="scope.row.isUsed"
                        style="color: red;"
                    >已生效</p>
                    <p
                        v-else
                        style="color: #ddd;"
                    >未生效</p>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <img
                        style="height:18px;cursor:pointer;"
                        :src="deletePng"
                        @click="changeEnrollStatus(scope.row)"
                    />
                    <img
                        style="height:21px;padding:0 10px;cursor:pointer;"
                        :src="cutJpg"
                    />
                    <img
                        style="height:18px;cursor:pointer;"
                        @click="changeEnrollChangeShowFlag(true,scope.row)"
                        :src="dealJpg"
                    />
                    <img
                        style="height:21px;padding:0 10px;cursor:pointer;"
                        :src="cutJpg"
                    />
                    <img
                        style="height:18px;cursor:pointer;"
                        @click="exportPersons(scope.row)"
                        :src="exitPng"
                    />
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="float:right;"
            layout="prev, pager, next, total"
            :total="total"
            @prev-click="(pagenum)=>queryList(pagenum)"
            @next-click="(pagenum)=>queryList(pagenum)"
            @current-change="(pagenum)=>queryList(pagenum)"
            key="boardContent"
        >
        </el-pagination>
    </div>
</template>

<script>
import deletePng from "static/img/delete.png";
import dealJpg from "static/img/deal.jpg";
import cutJpg from "static/img/cut.jpg";
import seeJpg from "static/img/see.jpg";
import exitPng from "static/img/exit.png";
import enrollChange from "./enroll-change.vue";
export default {
    name: "enrollList",
    data() {
        return {
            deletePng: deletePng,
            cutJpg: cutJpg,
            seeJpg: seeJpg,
            dealJpg: dealJpg,
            exitPng: exitPng,
            enrollChangeShowFlag: false,
            total: 0,
            tableLoading: false,
            queryItem: {
                name: "",
                type: "",
                page: 1,
                perpage: 10,
            },
            enrollList: [],
            propsEnroll: null,
            scopeDict: ["ALL", "PET_TYPE", "SINGLE"],
            ActivityItemDict: ["PRODUCT", "FUN", "BOTH"],
        };
    },
    methods: {
        changeEnrollChangeShowFlag: function (flag, props) {
            this.enrollChangeShowFlag = flag;
            if (flag && props) {
                this.propsEnroll = props;
            } else {
                this.propsEnroll = null;
            }
        },
        changeEnrollStatus: function (item) {
            this.$rq
                .changeEnrollStatus({ isUsed: item.isUsed ? 0 : 1 })
                .then((res) => {
                    item.isUsed = res.isUsed;
                });
        },
        queryList: function (pageNum) {
            const requestData = {
                pageNum,
                perpage: 10,
                name: this.queryItem.name,
            };

            this.$rq.getEnrollList(requestData).then((res) => {
                this.enrollList = res[0];
                this.total = res[1];
            });
        },
        exportPersons: function (item) {
            const persons = item.persons;
            const uri =
                "data:text/csv;charset=utf-8,\ufeff" +
                encodeURIComponent(
                    "姓名,电话,学校,时间\r\n" +
                        persons.reduce(
                            (pre, cur) =>
                                pre +
                                `${cur.name || "无"},${cur.phone || "无"},${
                                    cur.school || "无"
                                },${cur.time || "无"}\r\n`,
                            ""
                        )
                );
            // 通过创建a标签实现
            const link = document.createElement("a");
            link.href = uri;
            // 对下载的文件命名
            link.download = `${item.dateTitle}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    },
    mounted: function () {
        this.queryList(1);
    },
    components: {
        enrollChange,
    },
};
</script>

<style lang="less">
.activity_list_warp {
    background: #ffffff;
    width: 96%;
    margin: 15px auto;
    input {
        width: 90% !important;
        height: 30px;
        line-height: 30px;
    }
}
</style>