import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Axiosインスタンスの作成
const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT ?? 'http://localhost', // デフォルトURLを指定
  withCredentials: true, // Cookieを送信するための設定
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
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
      csrfToken = await getCsrfToken();
    }
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// レスポンスインターセプターでCSRFトークンをリフレッシュ
// また、401の場合はログインページにリダイレクト
export const setupResponseInterceptor = (
  navigate: ReturnType<typeof useNavigate>
) => {
  ApiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 419 && !originalRequest._retry) {
        originalRequest._retry = true;
        await getCsrfToken();
        return ApiClient(originalRequest);
      }

      if (error.response?.status === 401) {
        navigate('/user/login');
      }

      return Promise.reject(error);
    }
  );
};

export default ApiClient;
