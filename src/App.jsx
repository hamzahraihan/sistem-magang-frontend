import { Outlet } from 'react-router-dom';
import SidebarL from './components/SidebarL/index.jsx';
import SidebarR from './components/SidebarR/index.jsx';

function App() {
  return (
    <div className="grid grid-cols-3">
      <SidebarL />
      <Outlet />
      <SidebarR />
    </div>
  );
}

export default App;
