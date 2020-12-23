import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import Header from '../components/Header/index';

interface Props extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const RouteWrapper: React.FC<Props> = ({
  component: Component,
  isPrivate = false,
  ...rest
}) => {
  const { user } = useAuth();

  const urlRedirect = '/dashboard';

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (isPrivate === !!user) {
          if (isPrivate) {
            return (
              <>
                <Header />
                <Component />
              </>
            );
          }

          return <Component />;
        }
        return (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : urlRedirect,
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default RouteWrapper;
