import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div style={{ float: 'left' }}>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
      </div>
      <div style={{ float: 'right' }}>
        <Link to="/">
          <button>🏠 Home</button>
        </Link>
        <Link to="/stats">
          <button>Stats</button>
        </Link>
        <Link to="/messages">
          <button>Messages</button>
        </Link>
        <Link to="/playlists">
          <button>Playlists</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
