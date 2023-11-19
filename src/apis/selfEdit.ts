import request from './request.ts';

/**
 * 获取全部用户自定义问答
 */
export function fetchMyQuestionList() {
    return request.get('/myQuestion/getAll');
}

/**
 * 删除问答
 */
export function deleteMyQuestionList(id: number) {
    return request.get(`/myQuestion/deleteById?id=${id}`);
}

/**
 * 新增问答
 */
export function addMyQuestionList(params: object) {
    return request.post(`/myQuestion/insert`,params);
}

/**
 * 编辑问答
 */
export function editMyQuestionList(params: object) {
    return request.post(`/myQuestion/update`,params);
}