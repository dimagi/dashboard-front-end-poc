import React, {useState}  from 'react';

import './App.css';
import ApiExplorer from "./commcare/ApiExplorer";
import ReportDashboard from "./commcare/ReportDashboard";

function App() {
  const devMode = process.env.REACT_APP_DEV_MODE || false;
  const [username, setUsername] = useState(process.env.REACT_APP_COMMCARE_DEFAULT_USERNAME);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_COMMCARE_DEFAULT_API_KEY);
  const [tab, setTab] = useState(devMode ? 'dashboard' : 'explorer');
  let inner;
  if (tab === 'explorer') {
    inner = <ApiExplorer devMode={devMode} username={username} apiKey={apiKey}
                         setUsername={(username) => setUsername(username)}
                         setApiKey={(apiKey) => setApiKey(apiKey)}/>
  } else {
    inner = <ReportDashboard username={username} apiKey={apiKey} />
  }
  const navLinks = (<ul>
    <li><a onClick={() => setTab('explorer')}>API Explorer</a></li>
    <li><a onClick={() => setTab('dashboard')}>Report Explorer</a></li>
  </ul>);
  return (
    <div className="App">
      { devMode ? navLinks : ''}
      {inner}
    </div>
  )
}

export default App;
