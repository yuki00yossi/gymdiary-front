import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { LoadingButton } from '@/components/ui/loadingButton';

export default function SignupPage() {
  const signupUrl = import.meta.env.VITE_API_ROOT + '/user/signup';

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeTerm: false,
  });

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeTerm: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
      agreeTerm: '',
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = '※メールアドレスは必須です';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '※有効なメールアドレスを入力してください';
      isValid = false;
    }

    if (!formData.username) {
      newErrors.username = '※ユーザー名は必須です';
      isValid = false;
    } else if (formData.username.length > 24) {
      newErrors.username = '※24文字までで設定してください';
      isValid = false;
    } else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
      newErrors.username =
        '※使用できる文字は、半角英数字とアンダーバー、ハイフンのみです';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = '※パスワードは必須です';
      isValid = false;
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[ -~]{8,}$/.test(formData.password)) {
      newErrors.password =
        '※パスワードは8文字以上で、英字と数字を含む必要があります';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '※パスワード（確認用）は必須です';
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = '※※パスワードが一致しません';
      isValid = false;
    }

    // Name validation
    if (!formData.name) {
      newErrors.name = '※お名前は必須です';
      isValid = false;
    }

    if (!formData.agreeTerm) {
      newErrors.agreeTerm = '※利用規約を確認し、同意してください。';
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
      username: formData.username,
      password: formData.password,
      name: formData.name,
    };

    try {
      await axios.get(import.meta.env.VITE_API_ROOT + '/sanctum/csrf-cookie', {
        withCredentials: true,
      });
      const res = await axios.post(signupUrl, data, {
        withCredentials: true,
        withXSRFToken: true,
        headers: {
          Accept: 'application/json',
        },
      });
      if (res.status === 201) {
        navigate('/user/email/sent-verify-mail');
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response && e.status === 422) {
          const data = e.response.data.errors;

          Object.keys(data).forEach((key) => {
            console.log(data[key][0]);
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
          <h2 className="mt-4 text-xl text-white">新規会員登録</h2>
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
              <Label htmlFor="username" className="text-white">
                ユーザー名
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="bg-white/10 border-none text-white placeholder:text-white/75"
                  placeholder="user01"
                  autoComplete="username"
                />
                {formData.email && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, username: '' })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.username && (
                <p className="text-yellow-300 text-sm mt-1">
                  {errors.username}
                </p>
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                パスワード（確認用）
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="bg-white/10 border-none text-white placeholder:text-white/75"
                  placeholder="パスワードを再入力"
                  autoComplete="password"
                />
                {formData.confirmPassword && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, confirmPassword: '' })
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.confirmPassword && (
                <p className="text-yellow-300 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                お名前（アプリ内で表示される名前）
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-white/10 border-none text-white placeholder:text-white/75"
                  placeholder="Yuki"
                  autoComplete="name"
                />
                {formData.name && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, name: '' })}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60"
                  >
                    ✕
                  </button>
                )}
              </div>
              {errors.name && (
                <p className="text-yellow-300 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreeTerm: !!checked })
              }
            />
            <Label
              role="label_confirm_term"
              htmlFor="terms"
              className="text-sm text-white"
            >
              Gym Diaryの
              <Link to="/terms" className="underline">
                利用規約
              </Link>
              を確認し、これに同意します。
            </Label>
            <br />
          </div>
          {errors.agreeTerm && (
            <p className="block text-yellow-300 text-sm mt-1">
              {errors.agreeTerm}
            </p>
          )}

          <LoadingButton
            loading={submitting}
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
          >
            登録
          </LoadingButton>

          <div className="text-center">
            <Link to="/" className="text-sm text-white hover:underline">
              既に会員登録がお済みの方は こちら
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
