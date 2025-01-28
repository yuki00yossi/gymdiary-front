import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  const LoginPage = () => {
    navigate('/user/login');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-app-gradientFrom to-app-gradientTo flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <img className="block w-[100px] mx-auto mt-5" src="/logo_white.png" />
          <h1 className="text-2xl font-medium text-white">Gym Diary</h1>
          <h2 className="mt-4 text-xl text-white">Unauthorized.</h2>
          <p className="text-white mt-3 mb-5">
            アクセスするにはログインが必要です。
          </p>
          <Button
            onClick={LoginPage}
            className="w-full bg-primary hover:bg-primary/90"
          >
            ログイン画面へ
          </Button>
        </div>
      </div>
    </div>
  );
}
