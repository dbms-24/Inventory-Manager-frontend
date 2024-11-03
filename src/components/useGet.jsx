import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function Get(url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.get(url, {
        'headers' : {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    getData();
  }, []);
  return data;
}
