import { defineStore } from 'pinia';

interface commonData {
    isLoginDialogOpen: boolean;   //登录弹窗是否打开
    collectList: any;    //收藏列表
    userName: string;   //用户昵称
    chatList: any;       //对话列表
    chatHistory: any;   //聊天历史记录
}

export const useCommonStore = defineStore('commonState', {
    state: (): commonData => ({
        isLoginDialogOpen: false,
        collectList: [],
        userName: '',
        chatList: [],
        chatHistory: [],
    }),
    actions: {
        setLoginDialogOpen(isOpen: boolean) {
            this.isLoginDialogOpen = isOpen;
        },
        setCollectList(list: object) {
            this.collectList = list;
        },
        deleteCollect(id: string) {
            const List = this.collectList;
            const index = List.findIndex((item: any) => item.dialogId === id);
            List.splice(index, 1);
            this.collectList = List;
        },
        setUserName(name: string) {
            this.userName = name;
        },
        setChatList(list: object) {
            this.chatList = list;
        },
        deleteChat(id: string) {
            const List = this.chatList;
            const index = List.findIndex((item: any) => item.dialogId === id);
            List.splice(index, 1);
            this.chatList = List;
        },
        addChat (id: number,title: string) {
            const chat = {
                chatId: id,
                title: title,
                allDialogs: []
            }
            this.chatList.push(chat);
        },
        editChatTitle(id: string, title: string) {
            const List = this.chatList;
            const index = List.findIndex((item: any) => item.chatId === id);
            List[index].title = title;
            this.chatList = List;
        },
        getChatHistory(id: number) {
            const List = this.chatList;
            const index = List.findIndex((item: any) => item.chatId === id);
            this.chatHistory = List[index].allDialogs
        }
    },
    persist: [
        {
            key: 'userName' ,
            paths: ['userName'],
            storage: sessionStorage
        }
    ]
})