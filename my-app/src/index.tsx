import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import AddTransacao from './containers/transacoes';
import AddConta from './containers/addconta';
import Home from './containers/home';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {Route,BrowserRouter} from 'react-router-dom';


ReactDOM.render(
  (<BrowserRouter>
  			<App>
  				<Route exact={true} path="/" component={App} />
  				<Route path="/home" component={Home} />
  				<Route path="/addconta" component={AddConta} />
  				<Route path="/transacoes" component={AddTransacao} />
  			</App>
  	</BrowserRouter>),
  //<App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
