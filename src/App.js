import React from 'react';
import './App.css';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div style={{textAlign:'center',paddingTop:'20%'}}><Spin size="large" /></div>;

const Login = Loadable({
  loader: () => import('./routes/Login.js'),
  loading: Loading,
});

const Register = Loadable({
  loader: () => import('./routes/Register.js'),
  loading: Loading,
});

const Home = Loadable({
  loader: () => import('./routes/Home.js'),
  loading: Loading,
});

export default class App extends React.Component {
  state = {
    menukey:'1',
  }
  render() {
    return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/home" component={Home}/>
      </Switch>
    </Router>
  )}
}










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
