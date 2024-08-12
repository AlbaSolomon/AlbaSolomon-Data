import React from 'react';
import Survey from './components/Survey.jsx';

const App = () => {
  return (
    <div>
      <h1>설문조사 제출 목록</h1>
      <Survey /> {/* Survey2 컴포넌트를 여기서 렌더링 */}
    </div>
  );
};

export default App;
