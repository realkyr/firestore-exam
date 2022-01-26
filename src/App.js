import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'antd/dist/antd.min.css'
import './App.css'

import * as Pages from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/edit" element={<Pages.Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
