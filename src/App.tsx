import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import AboutPage from "./pages/AboutPage/AboutPage";

const App: React.FC = (): React.ReactElement => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Layout>
  );
};

export default App;
