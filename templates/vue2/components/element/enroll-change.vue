<template>
    <el-dialog
        class="hospital_search"
        title='活动添加'
        @close="$parent.changeEnrollChangeShowFlag(false)"
        :visible.sync="showFlag"
        width="600px"
        :append-to-body="true"
    >
        <el-form
            ref="enrollChange"
            :model="enrollItem"
            :rules="enrollRules"
            label-width='120px'
        >
            <el-form-item
                size="small"
                prop="title"
                label='活动标题'
            >
                <el-input v-model="enrollItem.title"></el-input>
            </el-form-item>
            <el-form-item
                size="small"
                prop="descript"
                label='活动描述'
            >
                <el-input
                    type="textarea"
                    v-model="enrollItem.descript"
                ></el-input>
            </el-form-item>
            <el-form-item
                size="small"
                prop="dateTitle"
                label='日期'
            >
                <el-input v-model="enrollItem.dateTitle"></el-input>
            </el-form-item>
            <el-form-item
                size="small"
                prop="dateDesc"
                label='日期描述'
            >
                <el-input v-model="enrollItem.dateDesc"></el-input>
            </el-form-item>
            <el-form-item
                size="small"
                prop="options"
                label='时间段'
            >
                <el-table
                    border
                    width='500'
                    size="mini"
                    :data='enrollItem.options'
                >
                    <el-table-column
                        label="时间"
                        width="100"
                        prop="time"
                    >
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.time"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="限制人数"
                        width="160"
                        prop="num"
                    >
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.num"></el-input-number>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <img
                                style="height:18px;cursor:pointer;"
                                @click="enrollItem.options.length>1 ? enrollItem.options.splice(scope.$index,1) : ''"
                                :src="deletePng"
                            />
                            <img
                                style="height:21px;padding:0 10px;cursor:pointer;"
                                :src="cutJpg"
                            />
                            <img
                                style="height:18px;cursor:pointer;"
                                @click="enrollItem.options.push({time: '', num: 1})"
                                :src="addPng"
                            />
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
        </el-form>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="small"
                @click="$parent.changeEnrollChangeShowFlag(false)"
            >取 消</el-button>
            <el-button
                size="small"
                :loading="uploadLoading"
                type="primary"
                @click="submit"
            >提 交</el-button>
        </span>
    </el-dialog>
</template>

<script>
import deletePng from "static/img/delete.png";
import addPng from "static/img/add.png";
import cutJpg from "static/img/cut.jpg";
export default {
    data() {
        return {
            deletePng: deletePng,
            addPng: addPng,
            cutJpg: cutJpg,
            showFlag: true,
            uploadLoading: false,
            enrollItem: {
                title: "",
                descript: "",
                dateTitle: "",
                dateDesc: "",
                options: [
                    {
                        time: "9:00",
                        num: 1,
                    },
                ],
            },
            enrollRules: {
                title: [
                    {
                        required: true,
                        trigger: "change",
                        message: "活动名称不能为空",
                    },
                ],
                descript: [
                    {
                        required: true,
                        trigger: "change",
                        message: "活动描述不能为空",
                    },
                ],
                dateTitle: [
                    {
                        required: true,
                        trigger: "change",
                        message: "日期不能为空",
                    },
                ],
                dateDesc: [
                    {
                        required: true,
                        trigger: "change",
                        message: "日期描述不能为空",
                    },
                ],
            },
        };
    },
    props: {
        propsEnroll: Object,
    },
    mounted: function () {
        const propsEnroll = this.propsEnroll;
        if (propsEnroll) {
            this.enrollItem = {
                ...propsEnroll,
            };
        }
    },
    methods: {
        submit: function () {
            this.uploadLoading = true;
            this.$refs.enrollChange.validate(async (valid) => {
                if (valid) {
                    console.log(this.enrollItem);

                    this.$rq
                        .changeEnroll({ dto: this.enrollItem })
                        .then((res) => {
                            this.uploadLoading = false;
                            if (res) {
                                this.$message("保存成功");
                                this.$parent.changeEnrollChangeShowFlag(false);
                            }
                            this.$parent.queryList(1);
                        })
                        .catch((error) => {
                            console.error(error);
                            this.uploadLoading = false;
                        });
                } else {
                    this.uploadLoading = false;
                }
            });
        },
    },
    components: {},
};
</script>

<style lang="less">
</style>