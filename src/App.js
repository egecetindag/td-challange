
import Home from './containers/Home';
import UploadPage from './containers/UploadPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './utils/store';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/upload' component={UploadPage} />
          </Switch>
        </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
