import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TrainingRecordForm from '@/components/TrainingRecordForm/TrainingRecordForm';

export default function TrainingRecordPage() {
  return (
    <div className="h-screen pt-[3.75rem] pb-[3.5rem] w-full bg-app-bgMain font-sans antialiased tracking-tight">
      <Header />
      <TrainingRecordForm />
      <Footer />
    </div>
  );
}
