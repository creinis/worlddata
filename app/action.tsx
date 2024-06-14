"use server";

export const fetchCountries = async () => {
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();
  return data;
};
