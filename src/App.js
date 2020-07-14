import React, {useState}  from 'react';
import './App.css';
import ApiExplorer from "./commcare/ApiExplorer";
import ReportDashboard from "./commcare/ReportDashboard";

function App() {
  const [tab, setTab] = useState('explorer');
  let inner;
  if (tab === 'explorer') {
    inner = <ApiExplorer />
  } else {
    inner = <ReportDashboard />
  }
  return (
    <div className="App">
      <ul>
        <li><a onClick={() => setTab('explorer')}>API Explorer</a></li>
        <li><a onClick={() => setTab('dashboard')}>Demo Dashboard</a></li>
      </ul>
      {inner}
    </div>
  )
}

export default App;
