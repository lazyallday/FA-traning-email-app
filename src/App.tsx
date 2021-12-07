import React, { Suspense, useState } from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { MessageDetail } from './components/MessageDetail';
import { getUser } from './models/DataMessageModel';

const MessageComponent = React.lazy(() => import('./components/Message'))
const ContactsComponent = React.lazy(() => import('./components/Contacts'))
const PerferencesComponent = React.lazy(() => import('./components/Preferences'))

function App() {
  const [user, setUser] = useState('')

  const _handleUserChange = (value: any) => {
    setUser(value)
  }

  return (
    <BrowserRouter>
      <div className='container'>
        <div className="d-flex justify-content-between">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink className="nav-link" to="/messages">Messages</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacts">Contacts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/preferences">Preferences</NavLink>
            </li>
          </ul>
          <select className="select-user" onChange={(event) => _handleUserChange(event.target.value)}>
            <option value='-'>Choose user</option>
            {getUser().map((_user, index) => <option key={index} value={_user}>{_user}</option>)}
          </select>
        </div>
      </div>

      <Suspense fallback={<>Loading...</>}>
        <Switch>
          <Redirect exact from='/' to='/messages' />
          <Route path='/messages' render={() => <MessageComponent user={user} />} />
          <Route path='/contacts' component={ContactsComponent} />
          <Route path='/preferences' component={PerferencesComponent} />
        </Switch>
        <Route path="/messages/:folder/:id" component={MessageDetail}></Route>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
