import TrainerSignUpForm from "@/components/TrainerSignUpForm";

export default function PreSignUpPage()
{
    return (
        <div className="font-sans text-orange-950">
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
                <main className="container mx-auto px-4 py-16">
                    <div className="flex justify-center mb-6 md:mb-12">
                        <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-4LJHWV1AJHsqbXuvimGFNy7tkEbjEg.png"
                        alt="Gym Diary Logo"
                        className="mb-0 md:mb-8 w-32 h-32 md:w-64 md:h-64"
                        />
                    </div>
                    <h1 className="text-2xl :text-4xl font-bold text-center mb-10 text-orange-950">Gym Diary For Trainer</h1>
                    <p className="text-md text-center mb-12 text-orange-900">
                        革新的なフィットネス追跡プラットフォームで、クライアントをサポートし、ビジネスを効率化しましょう。
                    </p>
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border border-orange-100">
                        <h2 className="text-2xl font-semibold mb-6 text-orange-950">トレーナー先行登録</h2>
                        <TrainerSignUpForm />
                    </div>
                    <div className="mt-16 text-center">
                        <h3 className="text-2xl font-semibold mb-4 text-orange-950">Gym Diaryを選ぶ理由</h3>
                        <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            title="クライアント管理"
                            description="クライアントのプロフィール、進捗、トレーニングプランを一か所で簡単に管理できます。"
                        />
                        <FeatureCard
                            title="ワークアウト追跡"
                            description="数回のクリックで、パーソナライズされたワークアウトプランを作成・割り当てできます。"
                        />
                        <FeatureCard
                            title="進捗分析"
                            description="高度な分析ツールで、クライアントの進捗に関する詳細な洞察を得られます。"
                        />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}


interface FeatureCardProps {
    title: string;
    description: string;
  }

function FeatureCard({ title, description }: FeatureCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow border border-orange-100">
        <h4 className="text-xl font-semibold mb-2 text-orange-950">{title}</h4>
        <p className="text-orange-900">{description}</p>
        </div>
    )
}
