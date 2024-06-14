"use client";

import { useEffect, useState } from "react";
import { fetchCountries } from "../../app/action";
import Image from 'next/image';

interface Country {
  population: number;
  independent: boolean;
  languages?: { [key: string]: string };
  currencies?: { [key: string]: { name: string } };
  cca3: string;
  name: {
    common: string;
  };
}

interface LanguageCount {
  [key: string]: number;
}

const calculateTotals = (countries: Country[]) => {
  let totalPopulation = 0;
  const countrySet: Set<string> = new Set(); // Set to store unique country codes
  let independentCountries = 0;
  const languageCount: LanguageCount = {};
  const currencySet: Set<string> = new Set();
  const languageCountryMap: { [key: string]: string[] } = {};

  countries.forEach(country => {
    totalPopulation += country.population;

    // Use Set to ensure each country is counted only once
    if (!countrySet.has(country.cca3)) {
      countrySet.add(country.cca3);
      // Count total independent countries
      if (country.independent) {
        independentCountries += 1;
      }
    }

    if (country.languages) {
      Object.values(country.languages).forEach(language => {
        if (languageCount[language]) {
          languageCount[language] += country.population;
        } else {
          languageCount[language] = country.population;
        }
        if (languageCountryMap[language]) {
          languageCountryMap[language].push(country.name.common);
        } else {
          languageCountryMap[language] = [country.name.common];
        }
      });
    }
    if (country.currencies) {
      Object.keys(country.currencies).forEach(currency => {
        currencySet.add(currency);
      });
    }
  });

  const totalCountries = countrySet.size;

  const totalLanguages = Object.keys(languageCount).length;
  const mostSpokenLanguages = Object.entries(languageCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([language, population]) => ({
      language,
      population,
      numberOfCountries: languageCountryMap[language].length,
      countries: languageCountryMap[language],
    }));

  return {
    totalPopulation,
    totalCountries,
    independentCountries,
    totalLanguages,
    mostSpokenLanguages,
    differentCurrencies: currencySet.size,
  };
};

function WorldOverview() {
  const [totals, setTotals] = useState<any>(null);

  useEffect(() => {
    fetchCountries().then(countries => {
      const calculatedTotals = calculateTotals(countries);
      setTotals(calculatedTotals);
    });
  }, []);

  if (!totals) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Image
          src="./spinner.svg"
          alt="spinner"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white p-8 tracking-wider">
      <p className='text-paragraph text-justify'>
        The Total World Population is <span className='font-normal'>{totals.totalPopulation.toLocaleString()}</span> inhabitants.
        The World is divided into <span className='font-normal'>{totals.totalCountries}</span> countries. 
        There are controversies about the definition of the word country, therefore, here is a broad and 
        exhaustive count considering: the member countries of the United Nations (UN), 195, also including 
        the CIA Factbook which lists 237 countries, also considering dependent territories, autonomous 
        states, observer states, or disputed regions.
        Of these, <span className='font-normal'>{totals.independentCountries}</span> are independent. <br/>
      <p className='text-paragraph'>
        There are <span className='font-normal'>{totals.differentCurrencies}</span> different currencies in the world today.
        Humans communicate through <span className='font-normal'>{totals.totalLanguages}</span> different official languages ​​
        and there are several other dialects and variations of these languages ​​that are
        not included here.
      </p>
      </p>

        <div>
            <p className='text-paragraph'>
            <span className='font-normal'>{totals.mostSpokenLanguages[0]?.language} </span> 
            is currently the most spoken language in the world, it is the official language for 
            <span className='font-normal'> {totals.mostSpokenLanguages[0]?.numberOfCountries} </span>  countries, 
            totaling around  
            <span className='font-normal'> {totals.mostSpokenLanguages[0]?.population.toLocaleString()} </span>  
            people. You can see the full list of countries here.
            <br/>
            <p className='text-paragraph'>
            A West Germanic language that originated from the Anglo-Frisian dialects, 
            brought to Great Britain by Germanic invaders from several islands in the region that 
            currently corresponds to the Netherlands and northwestern Germany. The English language 
            has its roots in the Germanic peoples of Northern Europe. <br/>
            </p>
            <p className='text-paragraph'>
            The history of the English language can be divided into three main periods: <br/>
            </p>
            <p className='text-paragraph'>
            Old English: This is the first form of the language, in vogue between the 5th and 11th 
            centuries. English emerged with the languages ​​spoken by the Germanic peoples who occupied 
            present-day England from the 5th century onwards, especially the Angles and Saxons. 
            The language that began to emerge in the British Isles from then on is called “Old English”, 
            “Anglo-Saxon” or even “Englisc” in the original, meaning “language of the Angles”. <br/>
            </p>
            <p className='text-paragraph'>
            Middle English: This is the middle development of the language, from the 11th to the 16th 
            centuries. The next stage of the language, Middle English, is believed to have begun with the 
            Battle of Hastings in 1066, when King William the Conqueror defeated the Anglo-Saxon army and 
            imposed his laws, his system of government and his language, French.
            </p>
            <p className='text-paragraph pb-4'>
            Modern English: This is the modern form of the language, from the 16th century to the present 
            day. Modern English, as known from the works of William Shakespeare, is generally dated from 
            1550, when Great Britain became a colonial empire, spreading across all continents. <br/>
            </p>
            </p>
        </div>

      <div className='text-neutral-200 font-light text-xs border-t-2 pt-2'>
      <ul>
        {totals.mostSpokenLanguages.map((languageInfo: any, index: number) => (
          <li key={index}>
            {languageInfo.language} : {languageInfo.population.toLocaleString()} : {languageInfo.numberOfCountries} : { JSON.stringify( languageInfo.countries)}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default WorldOverview;
