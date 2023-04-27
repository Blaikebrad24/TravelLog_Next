import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import TravelLogForm from '@/components/TravelLogForm';
import TravelLogMap from '@/components/TravelLogMap';
import Link from 'next/link'

export default async function Home() {
  const logs = await TravelLogs.find().toArray(); // querying database here
  return (
    <main className='w-full h-full'>
      
        <TravelLogMap logs={logs} />
        {/* <TravelLogForm/> */}
        <div className='fixed top-2 right-2 z-[999]'>
          <Link href="/add" className='btn btn-info'>Add Travel Log</Link>
        </div>
    </main>
  );
}
