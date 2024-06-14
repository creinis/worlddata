"use client";

import React, { useState } from 'react';

interface ShowMoreProps {
  text: string;
  initialLength: number;
}

const ShowMore: React.FC<ShowMoreProps> = ({ text, initialLength }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const displayedText = expanded ? text : text.slice(0, initialLength);

  return (
    <div>
      <p>{displayedText}</p>
      <button
        type='button'
        onClick={() => toggleExpanded}
        className="text-sm text-blue-500 cursor-pointer focus:outline-none"
      >
        {expanded ? 'Mostrar Menos' : 'Continuar Lendo'}
      </button>
    </div>
  );
};

export default ShowMore;
