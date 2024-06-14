
import { fetchCountries } from './action';
import ClientComponent from '../components/client/ClientComponent';
import WorldOverview from '@/components/world/WorldOverview';

export default async function Home() {
  const allCountries = await fetchCountries();

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-12">
      <h2 className="text-3xl text-white font-thin pl-3">World Overview</h2>
      <WorldOverview />
      <h2 className="text-3xl text-white font-thin pl-3">Explore Countries</h2>
      <ClientComponent allCountries={allCountries} />
    </main>
  );
}
