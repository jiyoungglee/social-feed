import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login';
import Newsfeed from './Components/Newsfeed';
import Register from './Components/Register';
import SearchResults from './Components/SearchResults';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Newsfeed />} />
        <Route path="/searchResults" element={<SearchResults />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
