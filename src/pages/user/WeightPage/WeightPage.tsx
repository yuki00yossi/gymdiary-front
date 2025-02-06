import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApiClient, { setupResponseInterceptor } from '@/utils/ApiClient';
import { LoadingButton } from '@/components/ui/loadingButton';
import { TypeWeightRecord } from '@/types/WeightType';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function WeightPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [weightRecords, setWeightRecords] = useState<TypeWeightRecord[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const weightUrl = import.meta.env.VITE_API_ROOT + '/api/user/weight';

  useEffect(() => {
    fetchWeightData('day');
  }, []);

  useEffect(() => {
    setupResponseInterceptor(navigate);
  }, [navigate]);

  const tabChangeHandler = async (value: string) => {
    fetchWeightData(value);
  };

  const fetchWeightData = async (span: string) => {
    const urls: { [key: string]: string } = {
      day: import.meta.env.VITE_API_ROOT + '/api/user/weight',
      week: import.meta.env.VITE_API_ROOT + '/api/user/weight/weekly',
    };
    try {
      const res = await ApiClient.get(urls[span]);
      const weights: TypeWeightRecord[] = [];
      for (let i = 0; i < res.data.length; i++) {
        weights.push({
          date: new Date(res.data[i].date).toLocaleDateString().slice(5),
          weight: res.data[i].weight,
        });
      }

      setWeightRecords(weights);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response && e.status === 401) {
          console.error('need authentication.');
        } else {
          alert('Unexpected Error Occured...');
        }
      } else {
        alert('Unexpected Error Occured...');
      }
    }
  };

  const handleWeightSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const weightValue = (form[0] as HTMLInputElement).value;

    try {
      await ApiClient.post(weightUrl, { weight: weightValue });
      const res = await ApiClient.get(weightUrl);
      const weights: TypeWeightRecord[] = [];
      for (let i = 0; i < res.data.length; i++) {
        weights.push({
          date: new Date(res.data[i].date).toLocaleDateString().slice(5),
          weight: res.data[i].weight,
        });
      }

      setWeightRecords(weights);
    } catch (e: unknown) {
      console.error(e);
      alert('Unexpected Error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-[3.75rem] pb-[3.5rem] w-full bg-gradient-to-t from-app-gradientFrom to-app-gradientTo font-sans antialiased tracking-tight">
      <Header />

      <div className="w-full p-4 md:flex md:gap-4 md:max-w-6xl md:mx-auto">
        <div className="w-full md:w-1/3 space-y-4">
          {/* 現在の体重 */}
          <div className="py-4">
            <div className="space-y-3 text-white/90">
              <p className="text-2xl font-bold tracking-wide text-white">
                {t('weightPage.currentWeight')}:{' '}
                <span className="text-white">68.3 kg</span>
              </p>
              <p className="text-lg">
                {t('weightPage.sinceLastTime')}:{' '}
                <span className="text-white/90 font-medium">- 0.2 kg</span>
              </p>
              <p className="text-lg">
                {t('weightPage.untilGoal')}:{' '}
                <span className="font-medium">1.7 kg</span>
              </p>
            </div>
          </div>

          {/* 体重入力フォーム */}
          <form onSubmit={handleWeightSubmit} className="pb-4 space-y-4">
            <div className="flex items-center gap-4">
              <Input
                type="number"
                inputMode="decimal"
                step="0.01"
                placeholder={t('weightPage.enterWeight')}
                className="text-lg bg-app-bgInput border-none placeholder:text-app-textSub font-medium tracking-wide"
                required
              />
              <LoadingButton
                loading={submitting}
                type="submit"
                className="bg-primary hover:bg-primary/90 w-[8rem]"
              >
                {t('common.save')}
              </LoadingButton>
            </div>
          </form>
        </div>

        <Tabs
          className="mt-8"
          defaultValue="day"
          onValueChange={tabChangeHandler}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="day">日別</TabsTrigger>
            <TabsTrigger value="week">週別</TabsTrigger>
            {/* <TabsTrigger value="month">月別</TabsTrigger> */}
          </TabsList>
        </Tabs>

        {/* 横幅をデータ数に応じて動的に設定 */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={weightRecords}
            margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="2 2" stroke="#EEE" />
            <XAxis dataKey="date" interval={0} stroke="#ffffff" />
            <YAxis
              // orientation="right"
              stroke="#ffffff"
              unit="kg"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: 'solid 1px gray',
                borderRadius: '8px',
                color: '#333333',
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="weight"
              name={t('common.bodyWeight')}
              stroke="black"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Footer />
    </div>
  );
}
