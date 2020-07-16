import React, {useState, useEffect}  from 'react';
import './App.css';
import {ApiKey} from "./commcare/ApiKey";

function App() {
  const [username, setUsername] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [api, setApi] = useState('');
  const [apiData, setApiData] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const hitApi = function () {
    setIsLoading(true);
    fetch(api,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `ApiKey ${username}:${apiKey}`
        })
      }
    )
      .then(res => res.json())
      .then(response => {
        setIsLoading(false);
        setApiData(JSON.stringify(response, null, 2));
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
        setApiData(JSON.stringify(error));
      });
  };

  return (
    <div className="App">
      <h1>CommCare API Explorer</h1>
      <ApiKey username={username} apiKey={apiKey}
              onUsernameChanged={(username) => setUsername(username)}
              onApiKeyChanged={(apiKey) => setApiKey(apiKey)}
      />
      <p>Your username is <strong>{username}</strong> and your api key is <strong>{apiKey}</strong></p>
      <h2>API Url</h2>
      <input type="text" style={{width: "60em"}} value={api} onChange={(event) => setApi(event.target.value)}/>
      <br />
      <br />
      <input type="button" onClick={() => hitApi()} value="Request API"/>
      <h2>API Results</h2>
      <pre>
        {apiData}
      </pre>
    </div>
  );
}

export default App;
