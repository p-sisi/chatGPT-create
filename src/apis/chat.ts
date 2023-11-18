import request from './request.ts';


/**
 * 获取全部对话
 */
export function fetchChatList() {
    return request.get('/chat/allChat');
}

/**
 * 删除对话
 */
export function fetchDeleteChat(id: number) {
    return request.get(`/chat/deleteChat?chatId=${id}`);
}


/**
 * 编辑对话title
 */
export function fetchEditChatTitle(params: object) {
    return request.get(`/chat/updateChatTitle`, params);
}

/**
 * 新建对话
 */
export function fetchNewChat(params: object) {
    return request.get(`/chat/newChat`, params);
}