


export function fetchCommCareApi(api, username, apiKey, options) {
  let url = new URL(api);
  if (options.urlParams) {
    url.search = new URLSearchParams(options.urlParams).toString();
  }
  fetch(url,
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
