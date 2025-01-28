import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ユーザータイプの型定義
export type UserType = 'member' | 'trainer';

// AuthContextの型定義
interface AuthContextType {
  isMemberLoggedIn: boolean; // 一般会員のログイン状態
  isTrainerLoggedIn: boolean; // トレーナー会員のログイン状態
  setMemberLoggedIn: (status: boolean) => void;
  setTrainerLoggedIn: (status: boolean) => void;
  apiFetch: (
    url: string,
    userType: UserType,
    options?: RequestInit
  ) => Promise<Response>;
}

// Contextの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMemberLoggedIn, setMemberLoggedIn] = useState(false);
  const [isTrainerLoggedIn, setTrainerLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_ROOT + '/api/auth/check',
          {
            credentials: 'include',
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMemberLoggedIn(data.memberLoggedIn);
          setTrainerLoggedIn(data.trainerLoggedIn);
        } else {
          setMemberLoggedIn(false);
          setTrainerLoggedIn(false);
        }
      } catch (error) {
        console.error('ログイン確認エラー:', error);
        setMemberLoggedIn(false);
        setTrainerLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const apiFetch = async (
    url: string,
    userType: UserType,
    options: RequestInit = {}
  ) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          ...(options.headers || {}),
        },
      });

      if (response.status === 401) {
        if (userType === 'member') {
          setMemberLoggedIn(false);
          navigate('/user/login');
        } else if (userType === 'trainer') {
          setTrainerLoggedIn(false);
          navigate('/trainer/login');
        }
        navigate('/user/login');
      }

      return response;
    } catch (error) {
      console.error('APIエラーが発生しました', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isMemberLoggedIn,
        isTrainerLoggedIn,
        setMemberLoggedIn,
        setTrainerLoggedIn,
        apiFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthはAuthProvider内で使用する必要があります');
  }
  return context;
};
