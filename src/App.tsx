import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';
import { PWAInstallPrompt } from './components/common/PWAInstallPrompt';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { LoginPage } from './pages/LoginPage';

// Admin Layout & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminPlaceholderPage } from './pages/AdminPlaceholderPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Public Layout Wrapper
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <PWAInstallPrompt />
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          {/* Public Area Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<ProductsPage />} />
            <Route path="/produtos/:id" element={<ProductDetailPage />} />
            <Route path="/acompanhar-os" element={<TrackOrderPage />} />
          </Route>

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Area Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="os" element={<AdminPlaceholderPage />} />
            <Route path="kanban" element={<AdminPlaceholderPage />} />
            <Route path="clientes" element={<AdminPlaceholderPage />} />
            <Route path="equipamentos" element={<AdminPlaceholderPage />} />
            <Route path="produtos" element={<AdminPlaceholderPage />} />
            <Route path="estoque" element={<AdminPlaceholderPage />} />
            <Route path="vendas" element={<AdminPlaceholderPage />} />
            <Route path="financeiro" element={<AdminPlaceholderPage />} />
            <Route path="tecnicos" element={<AdminPlaceholderPage />} />
            <Route path="fornecedores" element={<AdminPlaceholderPage />} />
            <Route path="relatorios" element={<AdminPlaceholderPage />} />
            <Route path="usuarios" element={<AdminPlaceholderPage />} />
            <Route path="configuracoes" element={<AdminPlaceholderPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
