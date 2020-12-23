import React, { createContext, useCallback, useState, useContext } from 'react';

interface SignInCredentials {
  name: string;
}

interface AuthContextData {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  user: IUser;
}

interface IUser {
  name: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@UpVotes:user');

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ name }) => {
    const user = {
      name,
    };

    localStorage.setItem('@UpVotes:user', JSON.stringify(user));

    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@UpVotes:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const contenxt = useContext(AuthContext);
  if (!contenxt) {
    throw new Error('useAuth must be used with an AuthProvider');
  }
  return contenxt;
}

export { AuthProvider, useAuth };
