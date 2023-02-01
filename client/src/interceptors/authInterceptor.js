import fetchIntercept from "fetch-intercept";
import environment from "../environments/environment";

export const AuthInterceptor = () => {
  let refresh = false;
  fetchIntercept.register({
    request: function (url, config) {
      // Modify the url or config here
      if (config?.headers) {
        config.headers.name = "________________________++++++++++++++++";
      }
      return [url, config];
    },

    requestError: function (error) {
      // Called when an error occured during another 'request' interceptor call
      return Promise.reject(error);
    },

    response: function (response) {
      console.log(response);
      // Modify the reponse object
      if (response.status === 401 && !refresh) {
        refresh = true;

        fetch(environment.API_URL + "/api/auth/refresh", {
          method: "GET",
          credentials: "include",
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return res.text().then((text) => {
              throw new Error(text);
            });
          })
          .then((res) => {
            console.log(res);
            localStorage.setItem("access_token", res.access_token);
          });
      }
      if (response.status === 401 && refresh) {
        window.location.href = "/login";
        return;
      }
      return response;
    },

    responseError: function (error) {
      console.log(error);
      // Handle an fetch error
      return Promise.reject(error);
    },
  });
};
