import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/routes/home.tsx";
import Movie from "@/routes/movie.tsx";
import { toast } from "sonner";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "@/providers/toast-provider.tsx";
import HeaderProvider from "@/providers/header-provider.tsx";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) =>
      toast.error(`Something went wrong: ${error.message}`),
  }),
});

function App() {
  return (
    <ToastProvider>
      <HeaderProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<Movie />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </HeaderProvider>
    </ToastProvider>
  );
}

export default App;
