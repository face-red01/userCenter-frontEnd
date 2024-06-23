/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { history } from 'umi';
import { extend } from 'umi-request';

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  //   errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  prefix:
    process.env.NODE_ENV === 'production' ? 'http://user.center.top' : 'http://localhost:8080',
  // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  return {
    url,
    options: {
      ...options,
      headers: {},
    },
  };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const { url, status } = response;

  const res = await response.clone().json();
  // console.log(res)
  if (status === 200 && res.code === 0) {
    return res.data;
  }
  if (status === 200 && res.code === 40100) {
    console.log('40100');
    history.replace('/user/login');
    return res.message;
  }
  //   if ((status === 200 && res.code !== 1) || (status !== 200 && res.data !== undefined)) {
  //     // 处理参数问题
  //     let noParamUrl = url;
  //     if (url.indexOf('?') !== -1) {
  //       noParamUrl = url.substring(0, url.indexOf('?'));
  //     }
  //     const msg = (res.data === null || stringUtil.isEmpty(res?.data?.exceptionMsg)) ? res.msg : res.data.exceptionMsg;
  //     notification.error({
  //       message: `请求出错 [${res.code}]: ${noParamUrl}`,
  //       description: msg,
  //     });
  //   }
  return response;
});

export default request;
