<template>
    <div class="List">
        <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick" >
            <!-- 问题列表 -->
            <el-tab-pane label="问答列表" name="问答列表">
                <div class="qa-card-container">
                    <div 
                        class="qa-card"
                        v-for="item in QUESTION_ANSWER_DATA"
                        :key="item.type">
                            <div class="card-type" @click="handleOpenDrawer(item)">{{ item.type }}</div>
                    </div>
                </div>
            </el-tab-pane>

            <!-- 我的收藏 -->
            <el-tab-pane label="我的收藏" name="我的收藏">
                <div class="collect">
                    <div class="collect-empty" v-if="COLLECT_DATA.length == 0">
                        <el-empty description="暂无相关收藏，请点击[提问ChatGPT]按钮或者前往”问答列表“中收藏问答" />
                    </div>

                    <div class="collect-container" v-else>
                        <el-card
                            class="collect-card"
                            v-for="item in COLLECT_DATA"
                            :key="item.question"
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
                                <span >{{ item.created_time }}</span>

                                <div v-show="true" class="footer_icon" >

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
                                        @confirm.stop="handleDelete(item)"
                                    >
                                        <template #reference>
                                        <div style="float: right;">
                                            <el-tooltip
                                            class="icon"
                                            effect="dark"
                                            content="删除"
                                            placement="bottom"
                                            >  
                                                <el-icon style="margin-top: 4px;"><Delete /></el-icon>
                                            </el-tooltip>
                                        </div>
                                        </template>
                                    </el-popconfirm>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </el-tab-pane>

            <!-- 详细问题 -->
            <el-drawer v-model="isDrawerOpen" size="40%" show-close="false">
                <template #header>
                    <div>{{ drawerTitle }}</div>
                </template>
                <div v-for="item in getQuestionList(drawerTitle)" :key="item.id">
                    <el-card 
                        class="qaList-card"
                        
                        > 
                        <div class="list-title">
                            {{ item.question }}
                        </div>
                        <div class="list-answer">
                            {{ item.answer }}
                        </div>    
                    </el-card>
                    <div class="list-icon">
                        {{ item.isFavorite }}
            
                            <el-icon class="list-icon-star" ><Star/></el-icon>
                            <i class="iconfont icon-icon-uncollect"></i>
                            <el-icon class="list-icon-star"><StarFilled/></el-icon>
                        <el-divider direction="vertical" class="list-icon-divider"/>
                        <el-icon class="list-icon-edit"><Edit /></el-icon>
                    </div>
                </div>
            </el-drawer>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Delete, DocumentCopy, Star, Edit, StarFilled } from '@element-plus/icons-vue'
import { QUESTION_ANSWER_DATA, COLLECT_DATA  } from '@/content/index.ts';
import { ElMessage } from 'element-plus';

//tab 切换
const activeTab = ref('问答列表');
const handleClick = () => {
    console.log('activeTab',activeTab.value)
}

//复制
const handleCopy = (text:string) => {
    console.log('handleCopy',)
    const content = text.replace(/#\*/g, ''); // 普通文本
    navigator.clipboard.writeText(content).then(() => {
        ElMessage.success('复制成功')
    }).catch(() => {
        ElMessage.error('复制失败，请稍后再试!')
    })
}

//删除
const handleDelete = async (item:any) => {
    console.log('删除',item);
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
    return QUESTION_ANSWER_DATA.filter((item: any) => item.type === type)[0].qa;
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
            padding-top: 10px;
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
        display: flex;
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
    }
    .list-answer {
        padding-top: 10px;
    }
}
.list-icon {
    margin: 6px 10px;
    height: 24px;
    cursor: pointer;
    .list-icon-star {
        float: right;
        right: 10px;
    }
    .list-icon-divider {
        float: right;
        right: 10px;
    }
    .list-icon-edit {
        float: right;
        right: 10px;
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