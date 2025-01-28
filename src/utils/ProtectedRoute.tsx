import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserType } from './AuthContext';

interface ProtectedRouteProps {
  allowedUserTypes: UserType[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedUserTypes,
  children,
}) => {
  const { isMemberLoggedIn, isTrainerLoggedIn } = useAuth();
  const navigate = useNavigate();

  // ユーザータイプごとのログイン状態チェック
  const isAllowed =
    (allowedUserTypes.includes('member') && isMemberLoggedIn) ||
    (allowedUserTypes.includes('trainer') && isTrainerLoggedIn);

  useEffect(() => {
    if (!isAllowed) {
      navigate('/unauthorized');
    }
  }, [isAllowed, navigate]);

  if (isAllowed) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;
