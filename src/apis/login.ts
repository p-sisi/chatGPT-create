import request from './request.ts';

/**
 * 用户登录
 */
export function fetchLoginIn(params: any) {
    return request.post('/user/login', params);
}

/**
 * 用户注册
 */
export function fetchSignIn(params: any) {
    return request.post('/user/register', params);
}

/**
 * 重置密码
 */
export function fetchResetPassword(params: any) {
    return request.post('/user/resetPwd', params);
}