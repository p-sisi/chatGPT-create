<template>
    <div class="List">
        <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick" >
            <!-- 问题列表 -->
            <el-tab-pane label="问答列表" name="问答列表">
                <el-scrollbar height="460px">
                    <div class="qa-card-container">
                        <div 
                            class="qa-card"
                            v-for="item in listData"
                            :key="item.type">
                                <div class="card-type" @click="handleOpenDrawer(item)">{{ item.type }}</div>
                        </div>
                    </div>
                </el-scrollbar>
            </el-tab-pane>

            <!-- 我的收藏 -->
            <el-tab-pane label="我的收藏" name="我的收藏">
                <el-scrollbar height="460px">
                <div class="collect">

                    <!-- tab按钮 -->
                    <div class="tabs-change">
                        <div 
                            v-for="item in COLLECT_TYPE" 
                            :key="item.key"  
                            @click="radioChange(item)" 
                            class="tabs-temp" 
                            :class="{ 'selected': item.label === activeCollectRadio }"
                            >
                                <span>{{ item.label }}</span>
                        </div>
                    </div>

                    <!-- 空状态 -->
                    <div class="collect-empty" v-if="commonStore.collectList.length == 0">
                        <el-empty description="暂无相关收藏" />
                    </div>


                    <!--收藏卡片列表 -->
                    <div class="collect-container" v-else>
                        <el-card
                            class="collect-card"
                            v-for="item in commonStore.collectList"
                            :key="item.dialogId"
                            shadow="hover">

                            <!-- 头部 -->
                            <template #header>
                                <div class="collect-card-header">
                                    <img src="/public/ChatGPT.png"/>
                                    <div>{{ item.question }}</div>
                                </div>
                            </template>

                            <!-- 内容 -->
                            <div class="collect-card-body">
                                <el-scrollbar height="270px" :min-size="10">
                                    {{ item.answer }}
                                </el-scrollbar>
                            </div>

                            <!-- 底部 -->
                            <div class="collect-card-footer">
                                <span class="text">共 &nbsp;{{ item.answer.length }}&nbsp;字</span>
                                <span style="margin: 0px 8px; color: #ececec;">|</span>
                                <span >{{ item.collectTime }}</span>

                                <div class="footer_icon" >
                                    <!-- 复制图标 -->
                                    <el-tooltip
                                        class="icon"
                                        effect="dark"
                                        content="复制"
                                        placement="bottom"
                                    >
                                        <el-icon style="float: right; margin-left:3px; top: 4px; cursor: pointer;" @click="handleCopy(item.answer)"><DocumentCopy /></el-icon>
                                    </el-tooltip>

                                    <span style="float: right;margin-right: 6px; margin-left: 6px; color: #ececec;">|</span>

                                    <!-- 删除图标 -->
                                    <el-popconfirm
                                        width="220"
                                        confirm-button-text="删除"
                                        cancel-button-text="取消"
                                        title="确认删除该收藏?"
                                        hide-icon
                                        :teleported = true
                                        @confirm.stop="handleDeleteCollectList(item)"
                                    >
                                        <template #reference>
                                        <div style="float: right;">
                                            <el-tooltip
                                            class="icon"
                                            effect="dark"
                                            content="删除"
                                            placement="bottom"
                                            >  
                                                <el-icon style="margin-top: 4px;" ><Delete /></el-icon>
                                            </el-tooltip>
                                        </div>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
                </el-scrollbar>

            </el-tab-pane>

            <!-- 我的问答 -->
            <el-tab-pane label="我的问答" name="我的问答">
                <el-scrollbar height="460px">
                    <div class="question-self">
                        <el-button type="primary" :icon="Plus" class="new-btn" size="large" color="#4840ba" @click="isNewEdit = true">新建</el-button>
                    </div>

                    <!-- 新建编辑区 -->
                    <div class="question-edit" v-if="isNewEdit">
                        <el-form label-width="120px">
                            <el-form-item label="问题：">
                                <el-input v-model="editQuestion" placeholder="请输入问题" clearable/>
                            </el-form-item>
                            <el-form-item label="答案：">
                                <el-input v-model="editAnswer" placeholder="请输入问题的答案" type="textarea" :autosize="{ minRows: 3, maxRows: 8 }"/>
                            </el-form-item>
                            <el-form-item >
                                <el-button type="primary" @click="GotoChatGPT">提问ChatGPT</el-button>
                                <el-button type="primary" @click="handleAddQuestion">新建</el-button>
                                <el-button @click="isNewEdit = false">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                    <div class="self-question-card">
                        <!-- 空状态 -->
                        <div class="collect-empty" v-if="commonStore.selfQuestionList.length == 0">
                            <el-empty description="暂无相关问答，点击“新建”试试吧！" />
                        </div>
                        <div v-else class="self-container">
                            <el-card
                                class="self-card"
                                v-for="item in commonStore.selfQuestionList"
                                :key="index"
                                shadow="hover">
                                <!-- 头部 -->
                                <template #header>
                                    <div class="self-card-header">
                                        <img src="/public/ChatGPT.png"/>
                                        <div>{{ item.question }}</div>
                                    </div>
                                </template>

                                <!-- 内容 -->
                                <div class="self-card-body">
                                    <el-scrollbar height="270px" :min-size="10">
                                        {{ item.answer }}
                                    </el-scrollbar>
                                </div>

                                <!-- 底部 -->
                                <div class="self-card-footer">
                                    <span class="text">共 &nbsp;{{ item.answer.length }}&nbsp;字</span>

                                    <!-- 编辑图标 -->
                                    <el-tooltip
                                        class="icon"
                                        effect="dark"
                                        content="编辑"
                                        placement="bottom"
                                    >
                                        <el-icon 
                                            style="float: right; margin-left:3px; top: 4px; cursor: pointer;" 
                                            @click="editMyQuestionOpen(item)"
                                            >
                                            <Edit />
                                        </el-icon>
                                    </el-tooltip>


                                    <span style="float: right;margin-right: 6px; margin-left: 6px; color: #ececec;">|</span>

                                    <!-- 删除图标 -->
                                    <el-popconfirm
                                        width="220"
                                        confirm-button-text="删除"
                                        cancel-button-text="取消"
                                        title="确认删除该内容?"
                                        hide-icon
                                        :teleported = true
                                        @confirm.stop="handleDeleteSelfList(item)"
                                    >
                                        <template #reference>
                                        <div style="float: right;">
                                            <el-tooltip
                                            class="icon"
                                            effect="dark"
                                            content="删除"
                                            placement="bottom"
                                            >  
                                                <el-icon style="margin-top: 4px;" ><Delete /></el-icon>
                                            </el-tooltip>
                                        </div>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </el-card>
                        </div>
                    </div>
                </el-scrollbar>

            </el-tab-pane>

            <!-- 详细问题 -->
            <el-drawer v-model="isDrawerOpen" size="80%" show-close="false">
                <template #header>
                    <div>{{ drawerTitle }}</div>
                </template>
                <div v-for="item in getQuestionList(drawerTitle)" :key="item.dialogID">
                    <el-card class="qaList-card"> 
                        <div class="list-title">
                            {{ item.question }}
                        </div>
                        <div class="list-answer">
                            {{ item.answer }}
                        </div>    
                    </el-card>
                    <div class="list-icon">
                        <div v-if="item.collect">
                            <el-tooltip content="取消收藏" placement="bottom" effect="light" >
                                <i class=" iconfont list-icon-collect icon-shoucang-copy" @click="handleCollect(item)"></i>
                            </el-tooltip>
                        </div>
                        <div v-else>
                            <el-tooltip content="收藏" placement="bottom" effect="light" >
                                <i class="iconfont icon-icon-uncollect list-icon-unCollect"  @click="handleCollect(item)"></i>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
            </el-drawer>
        </el-tabs>

        <!-- 编辑弹窗 -->
        <el-dialog title="自定义编辑问题" width="40%" v-model="newEditDialog">
            <el-form >
                <el-form-item label="问题：" label-width="80px">
                    <el-input v-model="newEditQuestion" placeholder="请输入问题" clearable />
                </el-form-item>
                <el-form-item label="答案：" label-width="80px">
                    <el-input 
                        v-model="newEditAnswer" 
                        placeholder="请输入内容" 
                        type="textarea"
                        :rows="5"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="newEditDialog = false">取消</el-button>
                    <el-button type="primary" @click="handleEditMyQuestion()">
                    更新
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Delete, DocumentCopy, Plus, Edit  } from '@element-plus/icons-vue'
import { COLLECT_LOCATION, COLLECT_TYPE } from '@/content/index.ts';
import { ElMessage } from 'element-plus';
import { fetchQuestionList,
     fetchCollect, 
     fetchCancelCollect, 
     fetchCollectList,
     fetchMyQuestionList, 
     deleteMyQuestionList, 
     addMyQuestionList,
     editMyQuestionList,} from '@/apis';
import { useCommonStore } from '@/store';
import router from '@/router/index.ts';

const commonStore = useCommonStore();

//问题列表
const listData = ref([]);
const collectData = ref([]);
onMounted( async () => {
    try {
        const result = await fetchQuestionList();
        listData.value = result.data;
        const collectResult = await fetchCollectList();
        collectData.value = collectResult.data;
        commonStore.setCollectList(collectResult.data);
    } catch (error: any) {
        console.log(error);
    }
})

//收藏类别
const activeCollectRadio = ref('全部') //默认选中
const radioChange = (item: any) => {
    if (activeCollectRadio.value === item.label )  return

    activeCollectRadio.value = item.label;
    commonStore.collectList = collectData.value;
    if(activeCollectRadio.value === '全部') return;

    commonStore.collectList = commonStore.collectList.filter((obj: any) => obj.collectType === item.type);
}

//tab 切换
const activeTab = ref('问答列表');
const handleClick = async (e) => {
    if(e.props.label == '我的收藏') {
        try {
            const collectResult = await fetchCollectList();
            collectData.value = collectResult.data;
            commonStore.setCollectList(collectResult.data);
        } catch (error: any) {
            ElMessage.error(error.message)
        }
    }
    if(e.props.label == '我的问答') {
        try {
            const selfResult = await fetchMyQuestionList();
            commonStore.setSelfQuestionList(selfResult.data);
        } catch (error: any) {
            ElMessage.error(error.message);
        }
    }
}

//复制
const handleCopy = (text:string) => {
    console.log('handleCopy',)
    const content = text.replace(/#\*/g, ''); // 普通文本
    navigator.clipboard.writeText(content).then(() => {
        ElMessage.success('复制成功')
    }).catch(() => {
        ElMessage.error('复制失败，请稍后再试!');
    })
}

//删除
const handleDeleteCollectList = async (item:any) => {
    try {
        const params = {
            dialogId: item.dialogId,
            collectType: item.collectType,
        }
        await fetchCancelCollect(params);
        ElMessage.success('删除成功！');
        commonStore.deleteCollect(item.dialogId);
    } catch (error: any) {
        ElMessage.error('删除失败！请刷新重试');
    }
}

//drawer
const isDrawerOpen = ref(false);
const drawerTitle = ref('');

const handleOpenDrawer = (item: Object) => {
    isDrawerOpen.value = true;
    drawerTitle.value = item.type;
}

//问题列表
const getQuestionList = (type: string) => { 
    return listData.value.filter((item: any) => item.type === type)[0].questionAll;
}

//收藏
const handleCollect = async (item: any) => {
    try {
        if(!item.collect) {
            await fetchCollect(item.dialogId);
            ElMessage.success('收藏成功！');
        } else {
            const params = {
                dialogId: item.dialogId,
                collectType: COLLECT_LOCATION.QUESTION_LIST
            }
            await fetchCancelCollect(params);
            ElMessage.success('取消收藏成功！');
        }
        item.collect = !item.collect;
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}

//自定义收藏
const editQuestion = ref('');
const editAnswer = ref('');
const isNewEdit = ref(false);

const handleDeleteSelfList = async (item: object) => {
    try {
        console.log('item',item)
        await deleteMyQuestionList(item.id);
        ElMessage.success('删除成功！');
        commonStore.deleteSelfQuestionList(item.id);
        console.log('历史数据',commonStore.selfQuestionList)
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}

const handleAddQuestion = async () => {
    try {
        const params = {
            id: 0,
            question: editQuestion.value,
            answer: editAnswer.value,
        }
        const result = await addMyQuestionList(params);
        ElMessage.success('新建成功！');
        params.id = result.data;
        commonStore.addSelfQuestionList(params);
        editQuestion.value = '';
        editAnswer.value = '';
    } catch (error: any) {
        ElMessage.error('新建失败！请稍后重试')
    }
}

const GotoChatGPT = () => {
    router.push('/ai-create');
}

//编辑自定义对话
const newEditQuestion = ref('');
const newEditAnswer = ref('');
const newEditDialog = ref(false);
const itemId = ref(0);

const editMyQuestionOpen = (item: any) => {
    itemId.value = item.id;
    newEditDialog.value = true;
    newEditQuestion.value = item.question;
    newEditAnswer.value = item.answer;
}

const handleEditMyQuestion = async () => {
    try {
        const params = {
            id:  itemId.value,
            question: newEditQuestion.value,
            answer: newEditAnswer.value,
        }
        await editMyQuestionList(params);
        newEditDialog.value = false;
        ElMessage.success('更新成功！');
        commonStore.updateSelfQuestionList(params.id, params)
    } catch (error: any) {
        ElMessage.error('更新失败！请稍后重试')
    }
}
</script>

<style scoped lang="scss">
.List {
    padding:26px;
    :deep(.el-tabs__item ) {
        font-size: 20px;
        font-weight: 600;
        color: #e69138;
    }
    .el-tabs {
        --el-tabs-header-height: 56px;
    }
}
.qa-card-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    overflow: hidden;
    .qa-card {
        min-width: 208px;
        max-width: 288px;
        height: 100px;
        background-color: #fff;
        flex: 1;
        color: #767d85;
        opacity: 0.6;
        padding: 16px;
        margin-bottom: 16px;
        margin-right: 16px;
        box-sizing: border-box;
        border-radius: 24px;
        border: 1px solid #e4e7ed;
        cursor: pointer;
        .card-type {
            font-size: 20px;
            text-align: center;
            padding-top: 16px;
        }
    }
    .qa-card:hover {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        transition: box-shadow 0.4s ease;
    }
}

.collect {
    overflow: hidden;
    .collect-empty {
        flex-wrap: wrap;
        margin: 0 auto;
    }
    .collect-container {
        display: flex;
        flex-wrap: wrap;
        .collect-card {
            --el-card-padding: 16px;
            width: 400px;
            height: 410px;
            margin: 0 16px 16px 0;
            box-sizing: border-box;
            overflow: hidden;
            border-bottom: 1px solid #f0f2f5;
            .collect-card-header {
                display: flex;
                flex-direction: row;
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 8px;
                }
            }
            .collect-card-footer {
                position: relative;
                margin-top: 8px;
                color: #b2b2b2;
                .footer_icon {
                    position: absolute;
                    top: -1px;
                    right: 8px;
                }
            }
        }
    }
}

.qaList-card {
    position: relative;
    .list-title {
        border-bottom: solid 1px #e6e6e6;
        padding-bottom: 16px;
        font-size: 18px;
        font-weight: 600;
    }
    .list-answer {
        padding-top: 10px;
        color: #7a8691;
    }
}
.list-icon {
    margin: 6px 10px;
    padding-bottom: 4px;
    height: 24px;
    cursor: pointer;
    .list-icon-unCollect {
        float: right;
    }
    .list-icon-collect {
        float: right;
        color: #e69138;
    }
}

.question-self {
    .new-btn {
        width: 150px;
        font-size: 16px;
        margin: 0px 0px 16px 0px;
    }
}
.question-edit {
    width: 50%;
    background-color: #fff;
    padding: 40px 100px 20px 10px;
    margin-bottom: 20px;
    border-radius: 8px;
}
.self-container {
    display: flex;
    flex-wrap: wrap;
    .self-card {
        --el-card-padding: 16px;
        width: 400px;
        height: 410px;
        margin: 0 16px 16px 0;
        box-sizing: border-box;
        overflow: hidden;
        border-bottom: 1px solid #f0f2f5;
        .self-card-header {
            display: flex;
            flex-direction: row;
            img {
                width: 40px;
                height: 40px;
                margin-right: 8px;
            }
        }
        .self-card-footer {
            position: relative;
            margin-top: 8px;
            color: #b2b2b2;
        }
    }
}
//样式
.tabs-change {
    display: flex;   //flex布局，横向排列
    flex-direction: row;
    .tabs-temp {    //未选中时按钮样式
        height: 32px;
        padding: 4px 30px;
        margin-right: 8px;
        margin-bottom: 24px;
        border-radius: 4px;
        background: #c4bed3;
        font-size: 18px;
        color: black;
        line-height: 32px;
        cursor: pointer;
    }
    .tabs-temp.selected {     //选中时的样式
        background: #351c75;
        color: #e69138;
    }
}
:deep(.el-tabs__active-bar ) {
    height: 4px;
    background-color:#351c75
}
:deep(.el-tabs__nav-wrap::after) {
    height: 4px;
    background-color: #280d0e26;
}
:deep(.el-empty__description p) {
    font-size: 20px;
    color: #351c75;
}
:deep(.el-drawer__header ) {
    margin-bottom: 0px;
    padding: 10px 0px 8px 16px;
    background-color: #351c75;
    font-size: 24px;
    color: #e69138;
    font-weight: bold;
}
</style>