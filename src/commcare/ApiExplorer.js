import React, {useState}  from 'react';
import {ApiKey} from "./ApiKey";
import {fetchCommCareApi} from "./Client";



function ApiExplorer() {
  const [username, setUsername] = useState(process.env.REACT_APP_COMMCARE_DEFAULT_USERNAME);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_COMMCARE_DEFAULT_API_KEY);
  const [api, setApi] = useState(process.env.REACT_APP_COMMCARE_DEFAULT_API);
  const [apiData, setApiData] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const hitApi = function () {
    setIsLoading(true);
    fetchCommCareApi(
      api, username, apiKey, {
        onSuccess: (response) => {
          setIsLoading(false);
          setApiData(JSON.stringify(response, null, 2));
        },
        onError: (error) => {
          setIsLoading(false);
          console.error(error);
          debugger;
          setApiData(error.message);
        }
      }
    );
  };

  return (
    <div className="ApiExplorer">
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
        {isLoading ? "Loading..." : apiData}
      </pre>
    </div>
  );
}

export default ApiExplorer;
