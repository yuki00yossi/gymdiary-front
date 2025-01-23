import axios from 'axios';

// Axiosインスタンスの作成
const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT ?? 'http://localhost', // デフォルトURLを指定
  withCredentials: true, // Cookieを送信するための設定
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// CSRFトークンを管理する変数
let csrfToken: string | undefined = undefined;

// CSRFトークンを取得する関数
const getCsrfToken = async () => {
  try {
    const response = await ApiClient.get('/csrf');
    csrfToken = response.data; // サーバーが返すトークン形式に応じて修正
    return csrfToken;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
    throw error;
  }
};

// リクエストインターセプターでCSRFトークンを設定
ApiClient.interceptors.request.use(
  async (config) => {
    // POST、PUT、DELETEリクエストの場合にCSRFトークンを追加
    if (['post', 'put', 'delete'].includes(config.method ?? '') && !csrfToken) {
      await getCsrfToken();
    }
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// レスポンスインターセプターでCSRFトークンをリフレッシュ
ApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 419エラー（CSRFトークンの有効期限切れ）に対応
    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true; // 再試行を防ぐフラグを設定
      await getCsrfToken(); // トークンをリフレッシュ
      return ApiClient(originalRequest); // 元のリクエストを再送
    }

    return Promise.reject(error);
  }
);

export default ApiClient;
