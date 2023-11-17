import request from './request.ts';

/**
 * 问题列表
 */
export function fetchQuestionList() {
    return request.get('/sysDialog/getAll');
}

/**
 * 收藏问题
 */
export function fetchCollect(id: number) {
    return request.get(`/collect/addSys?dialogId=${id}`);
}

/**取消收藏
 */
export function fetchCancelCollect(params: number) {
    return request.get(`/collect/delete`,params);
}