import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import BusinessDashboard from "./pages/business/Dashboard";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Verificar estado inicial de autenticação
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session?.user) {
        setUserType(session.user.user_metadata.user_type);
      }
    });

    // Escutar mudanças no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Mudança no estado de autenticação:", event);
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        // Buscar o tipo de usuário do perfil
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
        
        console.log("Perfil do usuário:", profile);
        setUserType(profile?.user_type || null);
      } else {
        setUserType(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Aguardar verificação inicial de autenticação
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                !isAuthenticated ? (
                  <Index />
                ) : (
                  <Navigate to={userType === 'admin' ? '/admin' : '/business'} />
                )
              } 
            />
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/reset-password" 
              element={<Login />} 
            />
            {/* Rotas administrativas */}
            <Route
              path="/admin"
              element={
                isAuthenticated && userType === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Rotas do Dono de Negócio */}
            <Route
              path="/business"
              element={
                isAuthenticated && userType === 'business_owner' ? (
                  <BusinessDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Redirecionar qualquer outra rota para a página inicial */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;