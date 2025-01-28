import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@/components/ui/loadingButton';

import axios from 'axios';
import ApiClient from '@/utils/ApiClient';

export default function LoginPage() {
  const loginUrl = import.meta.env.VITE_API_ROOT + '/api/user/login';

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = '※メールアドレスは必須です';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '※有効なメールアドレスを入力してください';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = '※パスワードは必須です';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return false;
    }

    setSubmitting(true);

    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await ApiClient.post(loginUrl, data);
      if (res.status === 200) {
        navigate('/user/dashboard');
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response && e.status === 422) {
          const data = e.response.data.errors;

          Object.keys(data).forEach((key) => {
            setErrors((prevErrors) => ({ ...prevErrors, [key]: data[key][0] }));
          });
        } else {
          console.error(e);
          alert('Unexpected Error Occured...');
        }
      } else {
        alert('Unexpected Error Occured...');
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-app-gradientFrom to-app-gradientTo flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <img className="block w-[100px] mx-auto mt-5" src="/logo_white.png" />
          <h1 className="text-2xl font-medium text-white">Gym Diary</h1>
          <h2 className="mt-4 text-xl text-white">ログイン</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                メールアドレス
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white/10 border-none text-white placeholder:text-white/75"
                  placeholder="demo@example.com"
                  autoComplete="email"
                />
                {formData.email && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, email: '' })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.email && (
                <p className="text-yellow-300 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                パスワード
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-white/10 border-none text-white placeholder:text-white/75"
                  placeholder="パスワードを入力"
                  autoComplete="password"
                />
                {formData.password && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, password: '' })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.password && (
                <p className="text-yellow-300 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <LoadingButton
            loading={submitting}
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
          >
            ログイン
          </LoadingButton>

          <div className="text-center">
            <Link
              to="/user/signup"
              className="text-sm text-white hover:underline"
            >
              会員登録がまだの方は こちら
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
