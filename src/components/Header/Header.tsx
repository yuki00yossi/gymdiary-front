import { Separator } from "@/components/ui/separator"
import { AlignLeft, CircleX, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Header()
{
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const handleClickHamburger = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    return (
        <>
        <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between h-[3.75rem] p-4 bg-app-accent text-white/95">
            <div className="flex items-center gap-4">
                <AlignLeft onClick={handleClickHamburger} className="cursor-pointer	 w-6 h-6" />
                <h1 className="text-xl font-bold tracking-wide">Gym diary</h1>
            </div>
            <Settings className="cursor-pointer	 w-6 h-6" />
        </div>

        <div className={`fixed top-0 z-50 p-4 bg-gray-700 min-h-screen w-full transition-all ease-in-out duration-100 ${isOpenMenu ? "left-0" : "left-[-100%]"}`}>
            <CircleX onClick={handleClickHamburger} className="cursor-pointe w-6 h-6 mb-8 text-white" />
            <div className='w-full text-base text-white/90 cursor-pointer p-2'>aaa</div>
            <Separator />
            <div className='w-full text-base text-white/90 cursor-pointer p-2'>aaa</div>
            <Separator />
            <div className='w-full text-base text-white/90 cursor-pointer p-2'>プライバシーポリシー</div>
            <Separator />
            <div className='w-full text-base text-white/90 cursor-pointer p-2'>お問い合わせ</div>
            <Separator />
        </div>
        </>
    );
}