import Head from 'next/head';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Head>
        <title>ISCF Lab1 WebApp</title>
      </Head>
      <main className='bg-gray-300 min-h-screen'>
        <Header />
      </main>
    </>
  )
}
