/*
Applications often have to communicate with a back-end server for different purposes like authen-
ticating users, fetching data, submitting forms, etc. Making an API request is as simple as calling the
fetch function and passing a URL of an API endpoint. This way, we would make direct calls to a server
from anywhere in an application.

This approach is suﬀicient for small applications, but in larger applications, there are usually many
different endpoints and third-party servers that your app can communicate with. Two significant issues
quickly arise when working on large applications.

1. Lack of standardisation
Projects that do not have a common and opinionated way of doing something can have as many ways
of doing it as many developers that worked the application. For instance, one part of an application
could be using the fretch API, the second part could use the Axios library, and yet another part, pure XHR request, because why not. 
This inconsistency increases the maintenance burden and wastes
developers’ time, especially those who recently joined your team. Instead of coding, developers need to
think about the appropriate way of performing API requests.

2. Updating the client-side when the server-side endpoint changes
Imagine that your app has a custom analytics endpoint that receives requests from 30 different pages,
and the calls are done in this manner:

axios.post('https://www.mydomain.com/api/analytics/user/user_id', {
  timestamp: Date.now(),
  action: 'click',
  page: 'Profile'
})

This works perfectly fine, but what happens if:
• The website is moving to a different domain
• The back-end is rolling out a new API endpoint under /api/v2/
• The company decided to move to a third-party analytics solution
• An endpoint now accepts payload data in a different format

Basically, we now have to update every place where the aforementioned API call
is made, so in this example case, just 30 pages. What’s more, we also have to test every single page that is making this API
call to ensure it still works as it should. It’s worth remembering that, unfortunately, not every application
has automated test suites, so have fun testing all of it manually.

Instead of having our components and services make API calls to the server directly, we want to create
a layer in between.

*/

import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/";

const axiosParams = {
  baseURL: API_BASE_URL,
};

const api = (axios) => {
  return {
    get: (url, config = {}) => axios.get(url, config),
    delete: (url, config = {}) => axios.delete(url, config),
    post: (url, body, config = {}) => axios.post(url, body, config),
    patch: (url, body, config = {}) => axios.patch(url, body, config),
    put: (url, body, config = {}) => axios.put(url, body, config),
  };
};

export const axiosInstance = axios.create(axiosParams);
export default api(axiosInstance);
