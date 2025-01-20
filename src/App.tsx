import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/business/Dashboard";
import Media from "@/pages/business/Media";
import Stamps from "@/pages/business/Stamps";
import Videos from "@/pages/business/Videos";
import QRCodes from "@/pages/business/QRCodes";
import Plans from "@/pages/business/Plans";
import View from "@/pages/ar/View";
import AR from "@/pages/business/AR";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#121212]">
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/business/dashboard" element={<Dashboard />} />
            <Route path="/business/media" element={<Media />} />
            <Route path="/business/stamps" element={<Stamps />} />
            <Route path="/business/videos" element={<Videos />} />
            <Route path="/business/qrcodes" element={<QRCodes />} />
            <Route path="/business/plans" element={<Plans />} />
            <Route path="/business/ar" element={<AR />} />
            <Route path="/ar/view/:stampId" element={<View />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;