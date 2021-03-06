interface FetchOptions {
  url: string;
  headers?: object;
  loadCallback?: (response: string) => void;
  syncInBrowser?: boolean;
}

export function fetchUrl({
  url,
  headers = {},
  loadCallback = () => {},
  syncInBrowser = false
}: FetchOptions) {
  if (!url) {
    throw new Error("'url' is undefined");
  }
  const fail = () => {
    throw new Error(`${url} fetch failed`);
  };

  const fetchReq = new XMLHttpRequest();
  if (syncInBrowser) {
    fetchReq.open("GET", url, false);
    Object.keys(headers).forEach(header => {
      fetchReq.setRequestHeader(header, headers[header])
    })
    fetchReq.send();
    if (fetchReq.status === 200) {
      loadCallback(fetchReq.responseText);
      return fetchReq.responseText;
    } else {
      fail();
    }
  } else {
    fetchReq.open("GET", url, true);
    Object.keys(headers).forEach(header => {
      fetchReq.setRequestHeader(header, headers[header])
    })
    fetchReq.onerror = fail;
    fetchReq.onload = res => {
      loadCallback((res as any).responseText);
    };
    fetchReq.send();
  }
  throw new Error(`${url} was not found`);
}
