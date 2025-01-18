import { Separator } from "@/components/ui/separator"
import { AlignLeft, CircleX, Settings } from 'lucide-react';
import React, { ChangeEvent, ReactEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function Header()
{
    const { t, i18n } = useTranslation();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const handleClickHamburger = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    const handleChangeLangage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.currentTarget.value);
        i18n.changeLanguage(e.currentTarget.value);
        return false;
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
            <div id='listbox-label' className='w-full text-base text-white/90 cursor-pointer p-2 py-4'>
                { t('sidebar.langage') }:
                <select defaultValue={i18n.language} onChange={handleChangeLangage} className="inline-block ml-3 text-black">
                    <option className="px-4" value="en">English</option>
                    <option value="ja">日本語</option>
                </select>
                <label id="listbox-label" className="block"></label>
                <div></div>

            </div>
            <Separator />

            <div className='w-full text-base text-white/90 cursor-pointer p-2 py-4'>{ t('sidebar.privacy') }</div>
            <Separator />
            <div className='w-full text-base text-white/90 cursor-pointer p-2 py-4'>{ t('sidebar.contact') }</div>
            <Separator />
        </div>
        </>
    );
}