import { useEffect, useState } from 'react';
import axios from 'axios';

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const data = await axios.get('https://api-upwork.onrender.com/auth');
      setUsers(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return { users };
};

export default useGetAllUsers;
