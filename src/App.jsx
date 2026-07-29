import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'
import AdminPage from './pages/AdminPage'
import SobrePage from './pages/SobrePage'
import TermosPage from './pages/TermosPage'
import PrivacidadePage from './pages/PrivacidadePage'
import CookiesPage from './pages/CookiesPage'
import ProfilePage from './pages/ProfilePage'
import ContatoPage from './pages/ContatoPage'
import ArticlePage from './components/article/ArticlePage'
import CookieConsent from './components/ui/CookieConsent'
import SecurityWrapper from './components/ui/SecurityWrapper'

export default function App() {
  return (
    <SecurityWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/termos-de-uso" element={<TermosPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="/artigo/:id" element={<ArticlePage />} />
      </Routes>
      <CookieConsent />
    </SecurityWrapper>
  )
}
