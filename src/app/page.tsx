import { TravelLogs } from '@/models/TravelLog';
import TravelLogForm from '@/components/TravelLogForm';

export default async function Home() {
  const logs = await TravelLogs.find().toArray(); // querying database here
  return (
    <main>
      <h1>Hello World, this is the travel log app | FullStack | Nextjs | MongoDB</h1>
      <h2>There are {logs.length} in the database</h2>
      {logs.map((log) => (
        <div key={log._id.toString()}>{log.title}</div>
      ))}
      <TravelLogForm />
    </main>
  );
}
