import axios from 'axios';
import type { AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ElMessage } from 'element-plus';
import { useCommonStore } from '@/store';
import router from '@/router/index.ts';

const commonStore = useCommonStore();

const COMMON_REQUEST_METHOD = 'POST'; //缺省请求方法
const DEFAULT_TIMEOUT = 120000; //缺省请求超时时间 2min

//请求配置对象
const config: AxiosRequestConfig = {
    // 设置超时时间
    timeout: DEFAULT_TIMEOUT,
    // 缺省请求方法
    method: COMMON_REQUEST_METHOD,
    // 跨域时候允许携带凭证
    withCredentials: true
};

export class CustomAxiosInstance {
    //axios实例变量
    instance: AxiosInstance;

    constructor(axiosConfig: AxiosRequestConfig) {
        this.instance = axios.create(axiosConfig);
        this.setupInterceptor();
    }

    //设置请求拦截器和响应拦截器
    setupInterceptor () {
        //请求拦截器，在请求发送之前，对请求头进行处理，比如添加特定的请求头或者对请求的数据格式进行转化
        //在请求发送前对请求进行处理，use 方法接受两个函数作为参数，第一个函数用于处理请求成功，第二个函数用于处理请求失败
        this.instance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
                // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
                const token = sessionStorage.getItem('AI-token');
                //检查是否成功获取到 token，如果存在，则将它添加到请求的 headers 中的 Authorization 字段。这是一种在每个请求中添加 token 的方式，用于身份验证。
                token && (config.headers.Authorization = token)
                if( token !== null ) {
                    config.headers.Authorization = token;
                }
                if(config.method.toUpperCase() === 'POST') {
                    config.headers['Content-Type'] = 'application/json;charset=utf-8'
                }
                return config
            }
        );

        //响应拦截器
        this.instance.interceptors.response.use(
            //use同样接受两个函数，第一个处理成功，第二个处理失败
            //AxiosResponse中包含了响应信息，包括状态码，数据等
            async (response: AxiosResponse) => {
                //从响应信息中解构出状态码status、响应数据data
                const { status, data } = response;
                //从响应数据中解构出业务状态码code
                const { isSuccess } = data;

                if ((status === 200 || status < 300 || status === 304) && isSuccess === true) {
                    // 真正的请求成功，只有业务状态码code和请求状态码status都符合预期,isSuccess是人为设置的
                    return Promise.resolve(data);
                } else {
                    //请求成功，但是不是预期的状态，所以设定请求为失败
                    return Promise.reject(data);
                }
            },
            //AxiosError中包含了响应错误的详细信息，如错误码、错误信息等
            (error: AxiosError) => {
                //请求失败，返回错误信息
                if (error.code === 'ERR_CANCELED') {
                    return Promise.reject('ERR_CANCELED');
                }

                if (error.code === 'ERR_NETWORK') {
                    ElMessage.error('网络异常, 请检查网络');
                }

                if(error.response?.status === 401) {
                    ElMessage.error('登录已过期或未登录，请登录后重试！');
                    router.push('/homepage');
                    commonStore.setLoginDialogOpen(true);
                }
                console.log('response interceptor error', error);
                //请求发送失败，请求没法送到数据库中
                return Promise.reject(error);
            }
        );
    }

    /** 常用请求方法封装 */
    get(url: string, params: any = null, config: AxiosRequestConfig = {}) {
        return this.instance.get(url, { params, ...config });
    }
    
    post(url: string, data: any, config: AxiosRequestConfig = {}) {
        return this.instance.post(url, data, { ...config });
    }
}

export default new CustomAxiosInstance(config);