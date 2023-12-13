import { HashRouter, Route, Routes } from 'react-router-dom'

import Main from './pages/Main'
import Login from './pages/Login'
import Regist from './pages/Regist'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Annotation from './pages/Annotation'
import Verification from './pages/Verification'
import Edit from './pages/Edit'
import BatchUpload from './pages/BatchUpload'
import Download from './pages/Download'

function App() {
  return (
    <HashRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/annotation" element={<Annotation />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/batch_upload" element={<BatchUpload />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
