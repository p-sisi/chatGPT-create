<template>
    <div class="container">
            <!-- 左边 -->
                <div class="container-left" >
                    <div class="container-left-user">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                        <div class="username">{{ commonStore.userName }}</div>
                        <div class="divide"></div>
                    </div>
                    <el-button class="container-left-btn" @click="newChatDialog = true" >
                        <el-icon style="margin-right: 8px;" ><Plus /></el-icon>
                        New Chat
                    </el-button>
                    <div
                        class="container-left-chat"
                        v-for="item in commonStore.chatList"
                        :key="item.id"
                        @click="clickChat(item)"
                        >
                        <div class="chat-title">
                            {{ item.title }}
                            <el-dropdown trigger="click">
                                <el-icon style="margin-top: 16px;"><MoreFilled /></el-icon>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item :icon="EditPen" @click="handleResetTitle(item)">编辑</el-dropdown-item>
                                        <el-dropdown-item :icon="Delete" @click="handleDeleteChat(item)">删除
                                        </el-dropdown-item>  
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                </div>

            <!-- 右边 -->
                <div class="container-right">
                    <el-scrollbar height="600px">
                    <div class="empty-img" v-show="isEmptyChat">
                        <img src="../assets/image/empty-create.jpg" alt="">
                    </div>  

                    <div 
                        class="no-empty"
                        v-for="item in history"
                        :key="item.dialogId"
                        >
                        <div class="chat-right">
                            <div class="chat-right-user">
                                <div class="chat-question">{{ item.question }}</div>
                                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                            </div> 
                        </div>
                        <div class="chat-left">
                            <el-avatar> Chat </el-avatar>
                            <div class="chat-answer">{{ item.answer }}</div>        
                        </div>
                        <div class="chat-collect">
                            <div v-if="!item.collect">
                                <el-tooltip content="收藏" placement="bottom" effect="light" >
                                    <i class="iconfont icon-icon-uncollect "  @click="handleCollect(item)" style="color: #63717e;cursor: pointer;" ></i>
                                </el-tooltip>
                            </div>
                            <div v-else>
                                <el-tooltip content="取消收藏" placement="bottom" effect="light" >
                                    <i class=" iconfont list-icon-collect icon-shoucang-copy" style="color: #f3b78d;cursor: pointer;" @click="handleCancelCollect(item)"></i>
                                </el-tooltip>
                            </div>
                            <el-divider direction="vertical" style="position: absolute;left: 14px;bottom: 4px"/>
                            <el-tooltip content="复制" placement="bottom" effect="light" >
                                <el-icon color="#63717e" style="position: absolute;left: 30px;bottom:4px"  @click="handleCopy(item.answer)"><DocumentCopy /></el-icon>
                            </el-tooltip>
                        </div>
                    </div>
                    </el-scrollbar>



                    <div class="relative">
                        <div class="chat-input">
                            <el-input 
                                v-model="inputQuestion" 
                                placeholder="Please input question" 
                                :autosize="{ minRows: 1, maxRows: 4 }"
                                type="textarea"
                            />
                        </div>
                    </div>
                </div>

        <!-- 编辑名字 -->
        <el-dialog v-model="resetTitleDialog" title="重命名对话标题" width="30%">
            <el-input v-model="newTitle" placeholder="请输入新对话标题" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="resetTitleDialog = false">取消</el-button>
                    <el-button type="primary" @click="handleEditTitle">
                    确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 新建对话 -->
        <el-dialog v-model="newChatDialog" title="新建对话" width="30%">
            <el-input v-model="newChatTitle" placeholder="请输入新对话标题" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="newChatDialog = false">取消</el-button>
                    <el-button type="primary" @click="handleNewChat">
                    新建
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { EditPen, Delete, MoreFilled, Plus, DocumentCopy} from '@element-plus/icons-vue';
import { useCommonStore } from '@/store';
import { ref, onMounted, computed } from 'vue';
import { fetchChatList, fetchDeleteChat, fetchEditChatTitle, fetchNewChat } from '@/apis';
import { ElMessage } from 'element-plus';


const commonStore = useCommonStore();

const chatList = ref<any>();
onMounted( async () => {
    try {
        const result = await fetchChatList();
        commonStore.chatList = result.data;
        chatList.value = result.data
    } catch (error: any) {
        ElMessage.error(error.message);
    }
})

//点击标题
const history = ref([]);
const clickChat = (item: any) => {
    console.log('item',item)
    commonStore.getChatHistory(item.chatId);
    history.value = commonStore.chatHistory;
    console.log('history',history.value)
}

const isEmptyChat = computed(() => {
    return history.value.length == 0 ? true : false;
})

//编辑title
const resetTitleDialog = ref(false);
const newTitle = ref('');
const chatItemData = ref();

const handleResetTitle = (item: any) => {
    chatItemData.value = item;
    resetTitleDialog.value = true;
    newTitle.value = item.title;
};

const handleEditTitle = async() => {
    try {
        const params = {
            chatId: chatItemData.value.chatId,
            chatTitle: newTitle.value
        }
        await fetchEditChatTitle(params);
        commonStore.editChatTitle(chatItemData.value.chatId,newTitle.value);
        resetTitleDialog.value = false;
        ElMessage.success('修改成功');
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}

//删除对话
const handleDeleteChat = async (item: any) => {
    try {
        await fetchDeleteChat(item.chatId);
        commonStore.deleteChat(item.chatId);
        ElMessage.success('删除成功');
    } catch (error:any) {
        ElMessage.error(error.message);
    }
    console.log('item',item)
}

//新建对话
const newChatDialog = ref(false);
const newChatTitle = ref('');

const handleNewChat = async () => {
    try {
        const params = {
            chatTitle: newChatTitle.value
        }
        const result = await fetchNewChat(params);
        newChatDialog.value = false;
        ElMessage.success('新建成功');
        commonStore.addChat(result.data,newChatTitle.value)
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}

//提问
const inputQuestion = ref('');

//复制
const handleCopy = (text:string) => {
    const content = text.replace(/#\*/g, ''); // 普通文本
    navigator.clipboard.writeText(content).then(() => {
        ElMessage.success('复制成功')
    }).catch(() => {
        ElMessage.error('复制失败，请稍后再试!');
    })
}

//收藏、取消收藏
const handleCollect = (item: any) => {

}

const handleCancelCollect = (item: any) =>{

}
</script>

<style scoped lang="scss">
#app{
    height: 100vh!important;
}
.container {
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
    .container-left {
        width: 200px;
        height: 100vh;
        margin: 10px;
        padding: 20px;
        border-radius: 6px;
        border: 1px solid #f6e9e1;
        background-color: #f6e9e1;
        .container-left-user {
            position: relative;
            margin-bottom: 6px;
            .username {
                position: absolute;
                font-size: 18px;
                font-weight: 600;
                left: 50px;
                top: 8px;
            }
            .divide {
                height: 2px;
                width: 100%;
                text-align: center;
                margin-bottom: 20px;
                background-color: #e69138;
                opacity: 0.3;
            }
        }
        .container-left-btn {
            width: 100%;
            height: 40px;
            margin-bottom: 26px;
        }
        .container-left-chat {
            .chat-title {
                height: 46px;
                padding-left: 10px;
                color: black;
                line-height: 46px;
                font-size: 16px;
                cursor: pointer;
                background: #f9f3f0;
                border-radius: 8px;
                margin-bottom: 10px;
            }
            .chat-title:hover {
                background-color: #f9f3f0;
                border-radius: 8px;
                opacity: 0.6;
            }
        }
    }
    .container-right {
        flex: 1;
        margin: 14px 140px;
        .empty-img {
            text-align: center;
            margin-top: 200px;
        }
        .no-empty {
            position: relative;
            background-color: #faf9f8;
            margin-bottom: 40px;
            border-radius: 10px;
            padding: 10px;
            .chat-right {
                margin-bottom: 10px;
                margin-left: 100px;
                .chat-right-user {
                    display: flex;
                    flex-direction: row;
                    justify-content: end;
                    .chat-question {
                        max-width: 80%;
                        padding: 10px;
                        background-color: #fadbc5;
                        border-radius: 10px;
                        margin-right: 10px;
                    }
                }
 
            }
            .chat-left {
                display: flex;
                flex-direction: row;
                margin-bottom: 10px;
                .chat-answer {
                    max-width: 80%;
                    padding: 10px;
                    margin-left: 10px;
                    background-color: #edebeb;
                    border-radius: 10px;
                }
            }
            .chat-collect {
                position: absolute;
                bottom: -24px;
                cursor: pointer;
            }
        }
    }
}

.relative {
    position: relative;
    .chat-input {
        position: fixed;
        bottom: 20px;
        right: 200px;
        width: 50%;
        border-top: 1px solid #ccc; 
    }
}

:deep(.el-dialog__body) {
    padding: 10px;
}
</style>