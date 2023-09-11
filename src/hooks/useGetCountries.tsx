import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetCountries = () => {
  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const data = await axios.get('https://api-upwork.onrender.com/countries');
      setCountries(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return { countries };
};

export default useGetCountries;
