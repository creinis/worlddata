"use client";

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from "next/image";
import { CountryProp } from '@/components/world/CountryCard';

interface LoadMoreProps {
  allCountries: CountryProp[];
  displayedCountries: CountryProp[];
  setDisplayedCountries: (countries: CountryProp[]) => void;
}

function LoadMore({ allCountries, displayedCountries, setDisplayedCountries }: LoadMoreProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && displayedCountries.length < allCountries.length) {
      // Use a Set to keep track of unique country codes
      const countryCodeSet = new Set(displayedCountries.map(country => country.cca3));
      
      // Filter out countries that are not already displayed
      const newCountries = allCountries.filter(country => !countryCodeSet.has(country.cca3));

      // Update displayed countries with the new set
      setDisplayedCountries([...displayedCountries, ...newCountries]);
    }
  }, [inView, displayedCountries, allCountries, setDisplayedCountries]);

  return (
    <section className="flex justify-center items-center w-full">
      <div ref={ref}>
        <Image
          src="./spinner.svg"
          alt="spinner"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
    </section>
  );
}

export default LoadMore;
