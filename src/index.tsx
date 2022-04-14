import "piral/polyfills";
import * as React from "react";
import { render } from "react-dom";
import { Redirect } from "react-router-dom";
import { createInstance, createStandardApi, Piral, Dashboard } from "piral";
import { isLoggedIn, login } from "./client";
import { layout, errors } from "./layout";
import { createMyApi } from "./plugin";

isLoggedIn().then((loggedIn) => {
  if (loggedIn) {
    // success case
    const feedUrl = "https://feed.piral.cloud/api/v1/pilet/empty";

    const instance = createInstance({
      state: {
        components: layout,
        errorComponents: errors,
        routes: {
          "/": Dashboard,
          "/auth": () => <Redirect from="/auth" to="/" />,
        },
      },
      plugins: [...createStandardApi(), createMyApi()],
      requestPilets() {
        return fetch(feedUrl)
          .then((res) => res.json())
          .then((res) => res.items);
      },
    });

    render(<Piral instance={instance} />, document.querySelector("#app"));
  } else {
    // error case; not logged in
    login();
  }
});
