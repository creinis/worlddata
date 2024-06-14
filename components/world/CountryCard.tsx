import Image from "next/image";
import { MotionDiv } from "../common/MotionDiv";
import '../../app/globals.css';

const stagger = 0.25;

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export interface CountryProp {
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  currencies: { [key: string]: { name: string } };
  demonyms: { [key: string]: { m: string, f: string } };
  capital: string[];
  languages: { [key: string]: string };
  alpha3Code: string;
}

interface Prop {
  country: CountryProp;
  index: number;
}

function CountryCard({ country, index }: Prop) {
  const currency = country.currencies ? Object.values(country.currencies)[0].name : 'N/A';
  const language = country.languages ? Object.values(country.languages)[0] : 'N/A';
  const demonym = country.demonyms ? Object.values(country.demonyms)[0].m : 'N/A';
  const capital = country.capital ? country.capital[0] : 'N/A';
  const code = country.cca3 || country.cca2 || country.ccn3 || country.cioc || 'N/A';
  const formattedPopulation = country.population.toLocaleString('de-DE');

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * stagger,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded p-4 relative w-full"
    >
      <div className="relative w-full h-40">
        <Image
          src={country.flags.svg || "/flag-placeholder.png"}
          alt={country.name.common}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
          style={{ objectPosition: 'center' }}
        />
      </div>
      <div className="py-4 flex flex-col">
        <div className="flex px-4 justify-between items-center gap-2 border-b-2 pb-2">
          <h2 className="font-light text-neutral-200 text-xl line-clamp-1" title={country.name.common}>
            {country.name.common}
          </h2>
          <p className="text-base text-white font-thin">
            {country.region}
          </p>
        </div>
        
        
        <div className="flex justify-between items-center gap-1 pt-2">
          <p className="font-thin text-neutral-200">
            Population:
          </p>
          <p className="text-base text-neutral-200 font-thin">
            {formattedPopulation}
          </p>
        </div>
        
        <div className="flex justify-between items-center gap-1 ">
          <p className="font-thin text-neutral-200">
            $$:
          </p>
          <p className="text-base text-neutral-200 font-thin">
          {currency}
          </p>
        </div>

        <div className="flex justify-between items-center gap-1 ">
          <p className="font-thin text-neutral-200">
          Capital City: 
          </p>
          <p className="text-base text-neutral-200 font-thin">
          {capital}
          </p>
        </div>

        <div className="flex justify-between items-center gap-1 ">
          <p className="font-thin text-neutral-200">
          Language: 
          </p>
          <p className="text-base text-neutral-200 font-thin">
          {language}
          </p>
        </div>

        <div className="flex justify-between items-center gap-1 ">
          <p className="font-thin text-neutral-200">
          Demonym: 
          </p>
          <p className="text-base text-neutral-200 font-thin">
          {demonym}
          </p>
        </div>

        <div className="flex justify-between items-center gap-1 border-b-2 pb-2">
          <p className="font-thin text-neutral-200">
          Code: 
          </p>
          <p className="text-base text-neutral-200 font-thin">
          {code}
          </p>
        </div>
      </div>
    </MotionDiv>
  );
}

export default CountryCard;
