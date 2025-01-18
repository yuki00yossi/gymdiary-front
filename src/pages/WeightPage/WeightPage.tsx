import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus } from 'lucide-react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';



// テスト用データ
const data = [
    {date: '2024/6/1', weight: 100},
    {date: '2024/6/2', weight: 100.8},
    {date: '2024/6/3', weight: 90.2},
    {date: '2024/6/4', weight: 91.2},
    {date: '2024/6/5', weight: 100},
    {date: '2024/6/6', weight: 100},
    {date: '2024/6/7', weight: 100},
    {date: '2024/6/8', weight: 100},
    {date: '2024/6/9', weight: 100},
    {date: '2024/6/10', weight: 100},
    {date: '2024/6/11', weight: 100},
    {date: '2024/6/12', weight: 100},
    {date: '2024/6/13', weight: 100},
    {date: '2024/6/14', weight: 100},
    {date: '2024/6/15', weight: 100},
    {date: '2024/6/16', weight: 50},
    {date: '2024/6/17', weight: 100},
    {date: '2024/6/18', weight: 100},
    {date: '2024/6/19', weight: 100},
    {date: '2024/6/20', weight: 100},
    {date: '2024/6/21', weight: 100},
    {date: '2024/6/22', weight: 100},
];

export default function WeightPage()
{
    const [weightRecords, setWeightRecords] = useState<any>([]);

    const handleWeightSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    };

    useEffect(() => {
        const tmpData = calculateMovingAverage(data);
        const finalData = calculateMovingAverage(tmpData);
        setWeightRecords(finalData);
    }, []);

    // const dataWithMovingAverage = calculateMovingAverage(data, 30, 'movingAverage');

    return (
        <div className="min-h-screen pt-[3.75rem] pb-[3.5rem] w-full bg-app-bgMain font-sans antialiased tracking-tight">
            <Header />
            {/* Date selector */}
            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center gap-2">
                <span className="text-lg font-medium">今日</span>
                </div>
                <Button variant="ghost" className="hover:text-white hover:text-app-selected font-medium">
                履歴
                </Button>
            </div>

            <div className="w-full p-4 md:flex md:gap-4 md:max-w-6xl md:mx-auto">
                <div className="w-full md:w-1/3 space-y-4">
                    {/* Current Weight Card */}
                    <Card>
                        <div className="p-4">
                        <div className="space-y-3">
                            <p className="text-2xl font-bold tracking-wide">現在の体重: <span className="text-main">68.3 kg</span></p>
                            <p className="text-lg">前回から: <span className="text-app-success font-medium">- 0.2 kg</span></p>
                            <p className="text-lg">目標まで: <span className="font-medium">残り1.7 kg</span></p>
                            <p className="text-lg italic mt-2 text-app-success font-medium">順調に進んでいます！</p>
                        </div>
                        </div>
                    </Card>

                    {/* Weight input card */}
                    <Card>
                        <form onSubmit={handleWeightSubmit} className="p-4 space-y-4">
                        <div className="flex items-center gap-4">
                            <Input
                            type="number"
                            placeholder="体重を入力"
                            value={weightRecords}
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setWeightRecords(e.target.value)}
                            className="text-lg bg-app-bgInput border-none placeholder:text-app-textSub font-medium tracking-wide"
                            />
                            <Button type="submit" size="icon" className="bg-app-bgMain hover:bg-white/90 text-app-accent rounded-full w-10 h-10">
                            <Plus className="w-6 h-6" />
                            </Button>
                        </div>
                        </form>
                    </Card>
                </div>

                {/* Graph card */}
                <div className="w-full mt-4 md:mt-0 md:w-2/3">
                    <Card>
                        <div className="w-full p-4">
                            <div className="h-[300px] md:h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={weightRecords}>
                                        <CartesianGrid strokeDasharray="2 2" stroke="#666666" />
                                        <XAxis
                                        dataKey="date"
                                        stroke='#333333'
                                        />
                                        <YAxis
                                        stroke='#333333'
                                        />
                                        <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#FFFFFF',
                                            border: 'solid 1px gray',
                                            borderRadius: '8px',
                                            color: '#333333'
                                        }}
                                        />

                                        <Legend verticalAlign="top" height={36}/>
                                        <Line
                                        type="monotone"
                                        dataKey="weight"
                                        name='体重'
                                        stroke='#333333'
                                        strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="average7"
                                            name='移動平均(7日)'
                                            stroke='#28A745'
                                            strokeDasharray="5 5"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </Card>
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

    console.log(result);
    return result;
};