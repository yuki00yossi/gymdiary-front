import { LoadingButton } from '@/components/ui/loadingButton';
import ApiClient from '@/utils/ApiClient';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const logoutUrl = import.meta.env.VITE_API_ROOT + '/api/user/signout';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await ApiClient.post(logoutUrl);
      if (res.status === 200) {
        navigate('/user/login');
      }
    } catch (e: unknown) {
      console.error(e);
      alert('予期せぬエラーが発生しました。');
    }

    setSubmitting(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <LoadingButton loading={submitting}>ログアウト</LoadingButton>
      </form>
    </>
  );
}
