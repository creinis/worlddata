"use client";
import React, { useState } from 'react';

interface MainTextProps {
  totals: any;
}

const MainText: React.FC<MainTextProps> = ({ totals }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    console.log('clicked buton')
    setExpanded(!expanded);
  };

  return (
    <div className="bg-gray-800 text-white p-8 tracking-wider user-select: text">
      <div className='text-paragraph text-justify'>
        <p>
          The Total World Population is <span className='font-normal'>{totals.totalPopulation.toLocaleString()}</span> inhabitants.
          The World is divided into <span className='font-normal'>{totals.totalCountries}</span> countries. 
          There are controversies about the definition of the word country, therefore, here is a broad and 
          exhaustive count considering: the member countries of the United Nations (UN), 195, also including 
          the CIA Factbook which lists 237 countries, also considering dependent territories, autonomous 
          states, observer states, or disputed regions.
          Of these, <span className='font-normal'>{totals.independentCountries}</span> are independent.
        </p>
        <p>
          There are <span className='font-normal'>{totals.differentCurrencies}</span> different currencies in the world today.
          Humans communicate through <span className='font-normal'>{totals.totalLanguages}</span> different official languages ​​
          and there are several other dialects and variations of these languages ​​that are
          not included here.
        </p>
      </div>

      {/* Texto expandido */}
      <div className={`${expanded ? '' : 'hidden'} text-paragraph`}>
        <p>
          <span className='font-normal'>{totals.mostSpokenLanguages[0]?.language} </span> 
          is currently the most spoken language in the world, it is the official language for 
          <span className='font-normal'> {totals.mostSpokenLanguages[0]?.numberOfCountries} </span>  countries, 
          totaling around  
          <span className='font-normal'> {totals.mostSpokenLanguages[0]?.population.toLocaleString()} </span>  
          people. You can see the full list of countries here.
        </p>
        <p className='text-paragraph'>
          A West Germanic language that originated from the Anglo-Frisian dialects, 
          brought to Great Britain by Germanic invaders from several islands in the region that 
          currently corresponds to the Netherlands and northwestern Germany. The English language 
          has its roots in the Germanic peoples of Northern Europe.
        </p>
        <p className='text-paragraph'>
          The history of the English language can be divided into three main periods:
        </p>
        <p className='text-paragraph'>
          Old English: This is the first form of the language, in vogue between the 5th and 11th 
          centuries. English emerged with the languages ​​spoken by the Germanic peoples who occupied 
          present-day England from the 5th century onwards, especially the Angles and Saxons. 
          The language that began to emerge in the British Isles from then on is called “Old English”, 
          “Anglo-Saxon” or even “Englisc” in the original, meaning “language of the Angles”.
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
          1550, when Great Britain became a colonial empire, spreading across all continents.
        </p>
      </div>

      {/* Botão para expandir/recolher texto */}
      {!expanded && (
        <div className="mb-4">
          <button
            type="button"
            className='text-sm text-blue-500 cursor-pointer focus:outline-none'
            onClick={toggleExpanded}
          >
            Continuar Lendo
          </button>
        </div>
      )}

      {expanded && (
        <div className="mb-4">
          <button
            type="button"
            className='text-sm text-blue-500 cursor-pointer focus:outline-none'
            onClick={toggleExpanded}
          >
            Mostrar Menos
          </button>
        </div>
      )}

      {/* Lista de idiomas mais falados, visível somente quando expandido */}
      {expanded && (
        <div className='text-neutral-200 font-thin text-xs border-t-2 pt-2 tracking-wide'>
          <ul>
            {totals.mostSpokenLanguages.map((languageInfo: any, index: number) => (
              <li key={index}>
                {languageInfo.language} : {languageInfo.population.toLocaleString()} : {languageInfo.numberOfCountries} : { JSON.stringify(languageInfo.countries)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MainText;
