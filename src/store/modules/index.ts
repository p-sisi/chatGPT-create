import { defineStore } from 'pinia';

interface commonData {
    isLoginDialogOpen: boolean;   //登录弹窗是否打开
}

export const useCommonStore = defineStore('commonState', {
    state: (): commonData => ({
        isLoginDialogOpen: false,
    }),
    actions: {
        setLoginDialogOpen(isOpen: boolean) {
            this.isLoginDialogOpen = isOpen;
        },
    },
})