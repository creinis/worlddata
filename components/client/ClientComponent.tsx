
"use client";

import { useState, useEffect } from 'react';
import { CountryProp } from '../world/CountryCard';
import CountryCard from '../world/CountryCard';
import LoadMore from '../common/LoadMore';

interface ClientComponentProps {
  allCountries: CountryProp[];
}

const ClientComponent = ({ allCountries }: ClientComponentProps) => {
  const [displayedCountries, setDisplayedCountries] = useState<CountryProp[]>(allCountries.slice(0, 8));

  useEffect(() => {
    setDisplayedCountries(allCountries.slice(0, 8));
  }, [allCountries]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {displayedCountries.map((country, index) => (
          <CountryCard key={country.cca3} country={country} index={index} />
        ))}
      </section>
      <LoadMore
        allCountries={allCountries}
        setDisplayedCountries={setDisplayedCountries}
        displayedCountries={displayedCountries}
      />
    </>
  );
};

export default ClientComponent;
