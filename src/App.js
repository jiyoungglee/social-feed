import { Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Newsfeed from './Components/Newsfeed';
import SearchResults from './Components/SearchResults';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Newsfeed />} />
        <Route path="/searchResults" element={<SearchResults />} />
        
      </Routes>
    </Layout>
  );
}

export default App;
