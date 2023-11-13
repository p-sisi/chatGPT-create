// 是否存在某个key值
export function isKeyInSessionStorage(key: string) {
    try {
      return sessionStorage.getItem(key) !== null;
    } catch (error) {
      console.error('检查 key 时出错', error);
      return false;
    }
}

// 防抖函数
export function debounce (func: any, delay: any) {
    let timeoutId: any;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };