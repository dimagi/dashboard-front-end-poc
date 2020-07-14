


export function fetchCommCareApi(api, username, apiKey, options) {
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
      if (options.onSuccess) {
        options.onSuccess(response);
      }
    })
    .catch(error => {
      if (options.onError) {
        console.error(error);
        options.onError(error);
      }
    });
}
