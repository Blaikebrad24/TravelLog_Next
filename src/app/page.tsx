import { TravelLogs } from '@/models/TravelLog/TravelLogs';
import TravelLogForm from '@/components/TravelLogForm';
import TravelLogMap from '@/components/TravelLogMap';

export default async function Home() {
  const logs = await TravelLogs.find().toArray(); // querying database here
  return (
    <main className='w-full h-full'>
      
        <TravelLogMap logs={logs} />
        {/* <TravelLogForm/> */}

    </main>
  );
}
