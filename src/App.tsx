import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { NovaSala } from "./pages/NovaSala/NovaSala";
import { Sala } from "./pages/Sala/Sala";
import { SalaAdmin } from "./pages/SalaAdmin/SalaAdmin";

import { AuthContextProvider } from "./contexts/AtuhContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sala/nova" component={NovaSala} />
          <Route path="/sala/:id" component={Sala} />
          <Route path="/admin/sala/:id" component={SalaAdmin} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
