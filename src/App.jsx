import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={
          <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-md text-center">
              <h1 className="text-7xl font-bold text-foreground">404</h1>
              <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <a href="/" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-white">Go home</a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
