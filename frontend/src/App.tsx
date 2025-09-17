import { useState } from 'react'
import './App.css'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import NotFound from './pages/NotFound'
import DashboardLayout from './components/dashboard/DashboardLayout'
import CredentialPage from './pages/Settings/CredentialPage'
import Jobs from './pages/Data-Migrations/Jobs'


const queryClient = new QueryClient();
// console.log("API base URL:", import.meta.env.VITE_API_BASE_URL);


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/validation-app/">
        <Routes>

          {/* Redirect root to first menu item */}
          <Route path="/" element={<Navigate to="data-migration" replace />} />
          {/* <Route path="/" element={<SqlConvertor />} /> */}
            {/* <Route path='/convert' element={<SqlConvertor />} /> */}
               <Route path="/connection" element={<DashboardLayout><CredentialPage /></DashboardLayout>} />
               <Route path='/data-migration' element={<DashboardLayout><Jobs/></DashboardLayout>}/>


          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
