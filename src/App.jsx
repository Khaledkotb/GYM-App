import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import PageMeta from "./components/common/PageMeta";

function App() {
  return (
    <BrowserRouter>
      <PageMeta />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;