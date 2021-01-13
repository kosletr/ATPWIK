import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/loginForm";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Products from "./components/products";
import HomePage from "./components/homePage";
import RegisterForm from "./components/registerForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

function App() {
  return (
    <div>
      <Navbar style={{ marginBottom: "2em" }} />
      <main className="container" style={{ marginTop: "2em" }}>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/products" component={Products} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={HomePage} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
