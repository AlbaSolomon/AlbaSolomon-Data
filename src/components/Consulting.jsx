import React, { useEffect, useState } from 'react';

const Consulting = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [consultingData, setConsultingData] = useState([]);

  const getConsultingLists = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = 'https://localhost:3000//api/consultations';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setConsultingData(data);
      } else {
        setError('상담신청 목록을 조회할 수 없습니다.');
      }
    } catch (error) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConsultingLists();
  });
};

export default Consulting;
