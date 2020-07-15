import React, {useState}  from 'react';

import './App.css';
import ApiExplorer from "./commcare/ApiExplorer";
import ReportDashboard from "./commcare/ReportDashboard";

function App() {
  const [username, setUsername] = useState(process.env.REACT_APP_COMMCARE_DEFAULT_USERNAME);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_COMMCARE_DEFAULT_API_KEY);
  const [tab, setTab] = useState('dashboard');
  let inner;
  if (tab === 'explorer') {
    inner = <ApiExplorer username={username} apiKey={apiKey}
                         setUsername={(username) => setUsername(username)}
                         setApiKey={(apiKey) => setApiKey(apiKey)}/>
  } else {
    inner = <ReportDashboard username={username} apiKey={apiKey} />
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
