export default function Footer()
{
    return (
        <div className="fixed bottom-0 left-0 right-0 h-[3.5rem] bg-navbar-main backdrop-blur-md border-t border-white/20">
            <div className="flex justify-around p-4 max-w-6xl mx-auto">
            <div className="text-navbar-iconNotSelect font-medium">ホーム</div>
            <div className="text-navbar-iconNotSelect font-medium">食事</div>
            <div className="text-navbar-iconSelected font-bold">体重</div>
            <div className="text-navbar-iconNotSelect font-medium">運動</div>
            </div>
        </div>
    );
}