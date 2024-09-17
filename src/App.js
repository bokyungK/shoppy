import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Header />
        <Outlet />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
