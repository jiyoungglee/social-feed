import http from "./http-common";
import { useContext, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Newsfeed from './Components/pages/Newsfeed';
import SearchResults from './Components/pages/SearchResults';
import { Actions, UserContext } from './store/UserContext';
import LoginPage from './Components/pages/LoginPage';
import ProfilePage from './Components/pages/ProfilePage';
import RegisterPage from './Components/pages/RegisterPage';

function App() {
  const { state, dispatch } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    async function getCurrentUser() {
    try {
      const response = await http.get('/users/currentUser');
      dispatch({
        type: Actions.UPDATE,
        payload: {
          userId: response.data,
        }
      })
    } catch(error){
      dispatch({
        type: Actions.RESET
      })
    }}
    getCurrentUser();

  },[dispatch, location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route 
          path="/"
          element={
            typeof state.userId !== 'undefined' 
            && (state.userId ? <Newsfeed /> : <LoginPage />)
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/searchResults" element={typeof state.userId !== 'undefined' && <SearchResults />} />
        <Route path="/profile/:userId" element={typeof state.userId !== 'undefined' && <ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
