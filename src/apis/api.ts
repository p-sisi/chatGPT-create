import request from './request.ts';

/**
 * 用户登录
 */
export function fetchLoginIn(params: any) {
    return request.post('/user/login', params);
}