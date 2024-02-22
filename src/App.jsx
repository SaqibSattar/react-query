import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HomePage } from './components/Home.page.jsx';
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page.jsx';
import { SuperHeroesPage } from './components/SuperHeroes.page.jsx';
import { RQSuperHeroPage } from './components/RQSuperHeroPage.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
            
          </ul>
        </nav>
        <Routes>
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage />} />
        </Routes>
      </div>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
    </QueryClientProvider>
  );
}

export default App;
