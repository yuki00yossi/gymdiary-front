import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CalendarDays, Clock, Flame } from 'lucide-react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const data = [
  { name: 'Mon', workouts: 2 },
  { name: 'Tue', workouts: 1 },
  { name: 'Wed', workouts: 3 },
  { name: 'Thu', workouts: 0 },
  { name: 'Fri', workouts: 2 },
  { name: 'Sat', workouts: 1 },
  { name: 'Sun', workouts: 2 },
];

export default function DashboardWorkout() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-[3.75rem] pb-[3.5rem] w-full bg-gradient-to-t from-app-gradientFrom to-app-gradientTo font-sans antialiased tracking-tight">
        <h1 className="text-2xl font-bold mb-6">Training Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Workouts
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18h 30m</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Calories Burned
              </CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,500</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="workouts" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Next Workout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">
              Upper Body Strength - Tomorrow at 9:00 AM
            </p>
          </CardContent>
        </Card>

        <Button className="w-full">View Past Records</Button>
      </div>
      <Footer />
    </>
  );
}
