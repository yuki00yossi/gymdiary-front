import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';



// テスト用データ
const data = [
    {date: '2024/6/1', weight: 100},
    {date: '2024/6/2', weight: 100.8},
    {date: '2024/6/3', weight: 90.2},
    {date: '2024/6/4', weight: 91.2},
    {date: '2024/6/5', weight: 100},
];

export default function WeightPage()
{
    const { t } = useTranslation();
    const [weightRecords, setWeightRecords] = useState<any>([]);

    const handleWeightSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    useEffect(() => {
        const tmpData = calculateMovingAverage(data);
        const finalData = calculateMovingAverage(tmpData);
        setWeightRecords(finalData);
    }, []);


    return (
        <div className="min-h-screen pt-[3.75rem] pb-[3.5rem] w-full bg-gradient-to-t from-app-gradientFrom to-app-gradientTo font-sans antialiased tracking-tight">
            <Header />

            <div className="w-full p-4 md:flex md:gap-4 md:max-w-6xl md:mx-auto">
                <div className="w-full md:w-1/3 space-y-4">
                    {/* Current Weight */}
                    <div className="p-4">
                        <div className="space-y-3 text-white/90">
                            <p className="text-2xl font-bold tracking-wide text-white">{ t('weightPage.currentWeight') }: <span className="text-white">68.3 kg</span></p>
                            <p className="text-lg">{ t('weightPage.sinceLastTime') }: <span className="text-white/90 font-medium">- 0.2 kg</span></p>
                            <p className="text-lg">{ t('weightPage.untilGoal') }: <span className="font-medium">1.7 kg</span></p>
                            {/* <p className="text-lg italic mt-2 text-app-success font-medium">順調に進んでいます！</p> */}
                        </div>
                    </div>

                    {/* Weight input */}
                    <form onSubmit={handleWeightSubmit} className="p-4 space-y-4">
                        <div className="flex items-center gap-4">
                            <Input
                            type="number"
                            placeholder={ t('weightPage.enterWeight') }
                            value={weightRecords}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setWeightRecords(e.target.value)}
                            className="text-lg bg-app-bgInput border-none placeholder:text-app-textSub font-medium tracking-wide"
                            />
                            <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-white rounded-md px-12">
                            { t('common.save') }
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Graph */}
                <div className="w-full mt-4 md:mt-0 md:w-2/3">
                    <div className="w-full">
                        <div className="">
                            <ResponsiveContainer width="100%">
                                <LineChart data={weightRecords}>
                                    <CartesianGrid strokeDasharray="2 2" stroke="#EEE" />
                                    <XAxis
                                    dataKey="date"
                                    stroke='#ffffff'
                                    />
                                    <YAxis
                                    stroke='#ffffff'
                                    unit='kg'
                                    />
                                    <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#FFFFFF',
                                        border: 'solid 1px gray',
                                        borderRadius: '8px',
                                        color: '#333333'
                                    }}
                                    />

                                    <Legend verticalAlign="top"  height={36}/>
                                    <Line
                                    type="monotone"
                                    dataKey="weight"
                                    name={ t('common.bodyWeight') }
                                    stroke='white'
                                    strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="average7"
                                        name={ t('weightPage.movingAverage7') }
                                        stroke='blue'
                                        // strokeDasharray="5 5"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

const calculateMovingAverage = (data: string[] | any[]) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const start30 = Math.max(0, i - 30 + 1);
        const windowData30 = data.slice(start30, i + 1);
        const average30 =
            windowData30.reduce((sum, item) => sum + item.weight, 0) / windowData30.length;

        const start7 = Math.max(0, i - 7 + 1);
        const windowData7 = data.slice(start7, i + 1);
        const average7 =
            windowData7.reduce((sum, item) => sum + item.weight, 0) / windowData7.length;
        result.push({ ...data[i], average30: Math.floor(average30 * 100) / 100,  average7: Math.floor(average7 * 100) / 100});
    }

    return result;
};