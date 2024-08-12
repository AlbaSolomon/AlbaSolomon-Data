import React, { useState, useEffect } from 'react';

const Survey = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState('desc');

  const getSurveyLists = async (page) => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = 'https://localhost:3000/api/responses';
      const params = {
        page: page || 1,
        order: order || 'desc',
      };
      const queryString = new URLSearchParams(params).toString();
      const queryUrl = `${baseUrl}?${queryString}`;
      const response = await fetch(queryUrl);

      if (response.ok) {
        const data = await response.json();
        setSurveyData(data.data);
      } else {
        setError('설문조사 목록을 조회할 수 없습니다.');
      }
    } catch (error) {
      setError('오류가 발생했습니다. 다시 시도해주세요.');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 자동으로 가져옴
  useEffect(() => {
    getSurveyLists(page);
  }, [page]); // page 상태가 변경될 때마다 새로운 데이터를 가져옴

  // 페이지 전환 함수
  const handlePageChange = (newPage) => {
    setPage(newPage); // 페이지 상태 업데이트
  };

  return (
    <div>
      <h1>설문조사 조회</h1>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 설문조사 데이터를 렌더링 */}
      {surveyData.length > 0 ? (
        <div>
          <h2>Survey Responses (Page {page})</h2>
          {surveyData.map((response) => (
            <div key={response.responseId} style={{ marginBottom: '20px' }}>
              <h3>Response ID: {response.responseId}</h3>
              <p>Corporation Type: {response.corporationType}</p>
              <p>Employee Number: {response.employeeNumber}</p>
              <ul>
                {Object.keys(response)
                  .filter((key) => key.startsWith('question'))
                  .map((questionKey) => (
                    <li key={questionKey}>
                      {questionKey}: {response[questionKey]}
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          {/* 페이지 전환 버튼 */}
          <div>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              이전 페이지
            </button>
            <button onClick={() => handlePageChange(page + 1)}>
              다음 페이지
            </button>
          </div>
        </div>
      ) : (
        <p>No survey responses available.</p>
      )}
    </div>
  );
};

export default Survey;
