import React from 'react';

import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Login = Loadable({
  loader: () => import('./routes/Login.js'),
  loading: Loading,
});

const Pass = Loadable({
  loader: () => import('./routes/Pass.js'),
  loading: Loading,
});

const App = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/pass" component={Pass}/>
      </Switch>
    </Router>
);

export default App;










// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//           <Button type="primary">Button</Button>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
