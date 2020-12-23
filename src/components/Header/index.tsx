import React from 'react';
import { MdPowerSettingsNew } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';

import logo from '../../assets/logo.webp';

import Avatar from '../Avatar';

import { Container } from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <div>
        <Link to="/dashboard">
          <Avatar size={45} />

          <div>
            <p>Bem Vindo</p>
            <span>{user.name}</span>
          </div>
        </Link>

        <Link to="/dashboard">
          <img src={logo} alt="UpVotes" />
        </Link>

        <div className="icon">
          <MdPowerSettingsNew size={20} color="#999591" onClick={signOut} />
        </div>
      </div>
    </Container>
  );
};

export default Header;
