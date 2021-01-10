import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import LoginForm from "./components/loginForm";
import Navbar from "./components/navbar";

function App() {
  return (
    <div>
      <Navbar style={{ marginBottom: "2em" }} />
      <div className="container" style={{ marginTop: "2em" }}>
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
