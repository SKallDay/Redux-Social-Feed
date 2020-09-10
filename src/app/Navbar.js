import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchNotifications, selectAllNotifications } from '../features/notifications/notificationSlice';

export const Navbar = () => {
  const dispatch = useDispatch();

  const notifications = useSelector(selectAllNotifications);
  const numberUnreadNotification = notifications.filter(n =>  !n.read).length;

  let unreadNotificationsBadge;

  if (numberUnreadNotification > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numberUnreadNotification}</span>
    )
  }

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">
              Posts
            </Link>
            <Link to="/users">
              Users
            </Link>
            <Link to="/notifications">Notifications {unreadNotificationsBadge}</Link>
            <button className="button" onClick={fetchNewNotifications}>
              Refresh Notifications
            </button>
          </div>
        </div>
      </section>
    </nav>
  )
}
