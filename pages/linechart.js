import Head from 'next/head';
import Header from '@/components/Header';
import LineCharts from '@/components/LineCharts';

export default function Chart() {
  
  return (
    <>
      <Head>
        <title>ISCF Lab1 WebApp</title>
      </Head>
      <main className='bg-gray-300 min-h-screen'>
        <Header />
        <div className='p-4'>
          <LineCharts/>
        </div>
      </main>
    </>
  )
}
