import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css'
export default function NavBar({ user, setUser }) {

  function handleLogOut() {
    // Remove token using the user service
    userService.logOut();
    // Update user state in App
    setUser(null);
  }

  return (
    <nav class="navbar">
      <Link to="/">Word Page</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
      &nbsp; | &nbsp;
      <span>Welcome, {user.name}</span>
      &nbsp; | &nbsp;
    </nav>
  );
}