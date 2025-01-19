import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function SentVerifyEmail() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-t from-app-gradientFrom to-app-gradientTo flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <img className="block w-[100px] mx-auto mt-5" src="/logo_white.png" />
          <h1 className="text-2xl font-medium text-white">Gym Diary</h1>
          <h2 className="mt-4 text-xl text-white">仮登録完了</h2>
        </div>

        <div className="bg-white/10 p-6 rounded-lg shadow-lg">
          <p className="text-white text-base mb-4">
            ご登録いただいたメールアドレスに確認メールを送信しました。
          </p>
          <p className="text-white text-base mb-6">
            メール内のリンクをクリックして、本登録を完了してください。
          </p>
          <div className="text-sm text-white/80">
            <p>メールが届かない場合は、以下をご確認ください：</p>
            <ul className="list-disc list-inside mt-2">
              <li>迷惑メールフォルダ</li>
              <li>メールアドレスの入力ミス</li>
              <li>メールボックスの容量制限</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-primary hover:bg-primary/90">
              トップページへ戻る
            </Button>
          </Link>
          <p className="text-white">
            問題が解決しない場合は、
            <Link to="/contact" className="underline hover:text-primary-200">
              お問い合わせ
            </Link>
            ください。
          </p>
        </div>
      </div>
    </div>
  );
}
