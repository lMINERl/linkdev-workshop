import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App.tsx";
import "./scss/main.scss";
import { Provider } from "react-redux";
import Store from "./Store/index.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PersistGate persistor={Store.presistor} loading={<h1>loading... </h1>}>
      <Provider store={Store.store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>,
);
