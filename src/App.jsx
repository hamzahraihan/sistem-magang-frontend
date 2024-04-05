import { Outlet } from 'react-router-dom';
import SidebarL from './components/SidebarL/index.jsx';
import UserProvider from './context/UserContext.jsx';
import PostProvider from './context/PostContext.jsx';
import { InternshipProvider } from './context/InternshipContext.jsx';
import LogbookProvider from './context/LogbookContext.jsx';
import LogbookDailyProvider from './context/LogbookDailyContext.jsx';
import LogbookWeeklyProvider from './context/LogbookWeeklyContext.jsx';
import LogbookWeeklyActivityProvider from './context/LogbookWeelyActivityContext.jsx';
import { Toaster } from 'react-hot-toast';
import ReportInternProvider from './context/ReportInternContext.jsx';
import BottomNavMobile from './components/BottomNavMobile/index.jsx';

function App() {
  return (
    <div className="grid text-xs lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-4 lg:gap-5 md:gap-2 sm:gap-2 gap-2 pt-5 px-3 lg:px-12 md:px-2 sm:px-2 relative lg:mb-0 md:mb-0 sm:mb-0 mb-14">
      <UserProvider>
        <PostProvider>
          <LogbookProvider>
            <LogbookWeeklyProvider>
              <LogbookDailyProvider>
                <LogbookWeeklyActivityProvider>
                  <InternshipProvider>
                    <ReportInternProvider>
                      <SidebarL />
                      <Outlet />
                      <BottomNavMobile />
                      <Toaster position="top-center" />
                    </ReportInternProvider>
                  </InternshipProvider>
                </LogbookWeeklyActivityProvider>
              </LogbookDailyProvider>
            </LogbookWeeklyProvider>
          </LogbookProvider>
        </PostProvider>
      </UserProvider>
    </div>
  );
}

export default App;
