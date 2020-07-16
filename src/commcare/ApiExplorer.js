import React, {useState}  from 'react';
import {ApiKey} from "./ApiKey";
import {fetchCommCareApi} from "./Client";



function ApiExplorer(props) {
  const [api, setApi] = useState(process.env.REACT_APP_COMMCARE_DEFAULT_API);
  const [apiData, setApiData] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const hitApi = function () {
    setIsLoading(true);
    fetchCommCareApi(
      api, props.username, props.apiKey, {
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
  const debug = <p>Your username is <strong>{props.username}</strong> and your api key is <strong>{props.apiKey}</strong></p>;
  return (
    <div className="ApiExplorer">
      <h1>CommCare API Explorer</h1>
      <ApiKey username={props.username} apiKey={props.apiKey}
              onUsernameChanged={(username) => props.setUsername(username)}
              onApiKeyChanged={(apiKey) => props.setApiKey(apiKey)}
      />
      {props.devMode ? debug : ''}
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
