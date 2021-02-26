import React from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import CreateAccount from './Account/CreateAccount';

const App = () => {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route path="/create" component={CreateAccount} exact/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;