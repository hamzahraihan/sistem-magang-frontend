import { Outlet } from 'react-router-dom';
import SidebarL from './components/SidebarL/index.jsx';
import UserProvider from './context/UserContext.jsx';
import PostProvider from './context/PostContext.jsx';
import { InternshipProvider } from './context/InternshipContext.jsx';

function App() {
  return (
    <div className="grid text-xs lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 lg:gap-5 md:gap-2 sm:gap-2 gap-2 pt-5 px-3 lg:px-12 md:px-2 sm:px-2 relative">
      <UserProvider>
        <PostProvider>
          <InternshipProvider>
            <SidebarL />
            <Outlet />
          </InternshipProvider>
        </PostProvider>
      </UserProvider>
    </div>
  );
}

export default App;
