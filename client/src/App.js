import "./App.css";
import LoginComponent from "./components/login/login.component";
import HomeComponent from "./components/home/home.component";
import HeaderComponent from "./components/header/header.component";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <header className="App-header">
              <LoginComponent />
            </header>
          </Route>
          <Route path="/">
            <HeaderComponent />
            <Switch>
              <Route path="/home">
                <HomeComponent />
              </Route>
            </Switch>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
