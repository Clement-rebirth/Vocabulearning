import { useContext, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { UserContext } from './providers/UserProvider';
import { ROUTES } from './constants';
import { signOut } from './utils/firebase/authMethods';

import Menu from './components/Menu/Menu';
import ShowAllLists from './pages/ShowAllLists/ShowAllLists';
import ShowOneList from './pages/ShowOneList/ShowOneList';
import SearchProvider from './providers/SearchProvider';
import ListsProvider from './providers/ListsProvider';

import './App.css';
import './assets/icons-css/icofont.min.css';

const App = () => {

  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  let { user, setUser } = useContext(UserContext);

  let location = useLocation();
  let redirectAfterAuth = location.state && location.state.redirectAfterAuth;

  const handleSignOut = () => {
    signOut(() => {
      setUser(false);
      navigate(ROUTES.LANDING, { replace: true });
    }, error => {
      console.log('logout error : ', error);
    });
  };

  // if the user is not connected and hasn't just been redirected after loged in
  // meaning that if the user is false because the user just loged in (so it's loading) we don't redirect
  if (user === false && !redirectAfterAuth) return <Navigate to={ROUTES.LANDING} replace={true} />;

  return (
    <div className='app'>
      <Menu
        isShow={showMenu}
        handleClose={() => setShowMenu(false)}
        handleSignOut={handleSignOut}
      />

      <ListsProvider>
        <SearchProvider showMenu={() => setShowMenu(true)}>
          <Routes>
            <Route path='/' element={<ShowAllLists navigate={navigate} user={user} />} />
            <Route path={ROUTES.DISPLAY_ONE_LIST} element={<ShowOneList navigate={navigate} user={user} />} />
          </Routes>
        </SearchProvider>
      </ListsProvider>
    </div>
  );
}

export default App;
