import { defineStore } from 'pinia';

interface commonData {
    isLoginDialogOpen: boolean;   //登录弹窗是否打开
    collectList: any;    //收藏列表
    userName: string;   //用户昵称
    chatList: any;       //对话列表
    chatHistory: any;   //聊天历史记录
    activeTypeText: string;  //完成打字的文本
    selfQuestionList: any;   //自问自答列表
}

export const useCommonStore = defineStore('commonState', {
    state: (): commonData => ({
        isLoginDialogOpen: false,
        collectList: [],
        userName: '',
        chatList: [],
        chatHistory: [],
        activeTypeText: '',
        selfQuestionList: [],
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
        },
        addChatHistory(chat: object) {
            this.chatHistory.push(chat);
        },
        changeChatHistory(chat: object) {
            this.chatHistory.splice(this.chatHistory.length - 1, 1, chat);
        },
        setChatCollect(id:number, collect: boolean) {
            const List = this.chatHistory;
            const index = List.findIndex((item: any) => item.dialogId === id);
            List[index].collect = collect;
            this.chatHistory = List;
        },
        setActiveTypeText(text: string) {
            this.activeTypeText = text;
        },
        setSelfQuestionList(list: any[]) {
            this.selfQuestionList = list
        },
        addSelfQuestionList(chat: object) {
            this.selfQuestionList.push(chat);
        },
        deleteSelfQuestionList(id: number) { //未完成
            const List = this.selfQuestionList;
            const index = List.findIndex((item: any) => item.id === id);
            List.splice(index, 1);
            this.selfQuestionList = List;
        },
        updateSelfQuestionList(id: number,chat: object) {
            const List = this.selfQuestionList;
            const index = List.findIndex((item: any) => item.id === id);
            List[index] = chat;
            this.selfQuestionList = List;
        },
    },
    persist: [
        {
            key: 'userName' ,
            paths: ['userName'],
            storage: sessionStorage
        }
    ]
})