import React from 'react';
import { NavLink, Route, useHistory, useParams } from 'react-router-dom';
import message from '../assets/messages.json';
import { formatDate, getFolder, getMessByFolder } from '../models/DataMessageModel';

const Message = (props: any) => {
  const { user } = props

  return <div>
    <ul className='list-group'>
      {getFolder(message, user).map((item, index) => {
        return <NavLink className='list-group-item' key={index} activeClassName="activeClass"
          to={`/messages/${item}`}>{item}</NavLink>

      })}
    </ul>
    <Route path="/messages/:folder"><MessagePreview user={user} /> </Route>
  </div>;
}

const MessagePreview = (props: any) => {
  const { folder } = useParams() as any
  const history = useHistory()

  const _handleEmailClick = (id: string) => {
    history.push(`/messages/${folder}/${id}`)
  }

  return <>
    <div className="email-preview">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Sender</th>
            <th scope="col">Subject</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {getMessByFolder(folder, props.user).map(item => {
            return <tr key={item._id} onClick={() => _handleEmailClick(item._id)}>
              <td>{item.from}</td>
              <td>{item.subject}</td>
              <td>{formatDate(item.date)}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </>
}

export default Message