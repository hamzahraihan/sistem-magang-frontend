import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import NotFound from './pages/NotFound/index.jsx';
import Login from './pages/Login/index.jsx';
import Register from './pages/Register/index.jsx';
import RoleChoose from './pages/Login/RoleChoose.jsx';
import FormLogin from './pages/Login/FormLogin.jsx';
import DetailPost from './pages/Post/index.jsx';
import Logbook from './pages/Logbook/index.jsx';
import Profile from './pages/Profile/index.jsx';
import CreatePost from './pages/Post/CreatePost/index.jsx';
import LogbookDetail from './pages/Logbook/LogbookDetail/index.jsx';
import Internship from './pages/Internship/index.jsx';
import InternshipActivity from './pages/Internship/InternshipActivity.jsx';
import CreateInternship from './pages/Internship/CreateInternship/index.jsx';
import DetailInternship from './pages/Internship/DetailInternship/index.jsx';
import ReportForm from './pages/Report/Upload/index.jsx';
import Report from './pages/Report/index.jsx';
import DetailReport from './pages/Report/Detail/index.jsx';
import UpdateProfile from './pages/Profile/Update/index.jsx';
import ForgotPassword from './pages/ForgetPassword/index.jsx';
import ResetPassword from './pages/ResetPassword/index.jsx';
import DosenMahasiswa from './pages/Dosen/Mahasiswa/index.jsx';
import MahasiswaInternshipReport from './pages/Dosen/Mahasiswa/MahasiswaInternshipReport/index.jsx';
import InternshipWeeklyReport from './pages/Dosen/Mahasiswa/MahasiswaInternshipReport/InternshipWeeklyReport/index.jsx';
import LogbookWeeklyReport from './pages/Dosen/Mahasiswa/MahasiswaInternshipReport/LogbookWeeklyReport/index.jsx';
import ReportInternship from './pages/Dosen/Mahasiswa/ReportInternship/index.jsx';
import ReportDetail from './pages/Dosen/Mahasiswa/ReportInternship/ReportDetail/index.jsx';
import ReportUpdateForm from './pages/Report/Update/index.jsx';
import UpdateInternship from './pages/Internship/UpdateInternship/index.jsx';
import AdminMahasiswa from './pages/Admin/Mahasiswa/index.jsx';
import AdminDashboardDosen from './pages/Admin/Dosen/index.jsx';
import AdminDashboardPost from './pages/Admin/Post/index.jsx';
import DashboardAdmin from './pages/Admin/index.jsx';
import CreateAccountDosen from './pages/Admin/Dosen/ConfigureAccount/CreateAccountDosen.jsx';
import DetailDosen from './pages/Admin/Dosen/DetailDosen/index.jsx';
import AdminLogbookMahasiswa from './pages/Admin/Mahasiswa/Detail/index.jsx';
import InternshipRequirements from './pages/Internship/InternshipRequirements/index.jsx';
import RequirementMenu from './pages/Internship/InternshipRequirements/RequirementMenu.jsx';
import RequestInternship from './pages/Internship/InternshipRequirements/RequestInternship/index.jsx';
import AdminRequestInternship from './pages/Admin/Mahasiswa/RequestInternship/index.jsx';
import DetailRequestInternship from './pages/Admin/Mahasiswa/RequestInternship/Detail/index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/detail-post/:slug',
        element: <DetailPost />,
      },
      {
        path: '/create-post',
        element: <CreatePost />,
      },
      {
        path: '/kegiatan-magang',
        element: <Internship />,
        children: [
          {
            path: '/kegiatan-magang',
            element: <InternshipActivity />,
          },
          {
            path: '/kegiatan-magang/daftar-magang/:letter_id',
            element: <CreateInternship />,
          },
          {
            path: '/kegiatan-magang/detail/:internship_id',
            element: <DetailInternship />,
          },
          {
            path: '/kegiatan-magang/update/:internship_id',
            element: <UpdateInternship />,
          },
        ],
      },
      {
        path: '/berkas-magang',
        element: <InternshipRequirements />,
        children: [
          {
            path: '/berkas-magang',
            element: <RequirementMenu />,
          },
          {
            path: 'permohonan-magang',
            element: <RequestInternship />,
          },
        ],
      },
      {
        path: '/kegiatan-magang/logbook/:mahasiswa_id/:internship_id',
        element: <Logbook />,
      },
      {
        path: '/kegiatan-magang/logbook/aktivitas/:internship_id/:mahasiswa_id/:logbook_id',
        element: <LogbookDetail />,
      },
      {
        path: '/report',
        element: <Report />,
      },
      {
        path: '/report/upload/:internship_id',
        element: <ReportForm />,
      },
      {
        path: '/report/update/:report_id',
        element: <ReportUpdateForm />,
      },
      {
        path: '/report/detail/:report_id',
        element: <DetailReport />,
      },
      {
        path: '/profile/:roleUrl/:slug',
        element: <Profile />,
      },
      {
        path: '/profile/:roleUrl/:slug/edit',
        element: <UpdateProfile />,
      },
      {
        path: '/dashboard/dosen/mahasiswa',
        element: <DosenMahasiswa />,
      },
      {
        path: '/dashboard/dosen/mahasiswa/logbook-mahasiswa/:mahasiswa_id',
        element: <MahasiswaInternshipReport />,
      },
      {
        path: '/dashboard/dosen/mahasiswa/internship-report/:internship_id',
        element: <InternshipWeeklyReport />,
      },
      {
        path: '/dashboard/dosen/mahasiswa/logbook/:logbook_id',
        element: <LogbookWeeklyReport />,
      },
      {
        path: '/dashboard/mahasiswa/laporan-akhir',
        element: <ReportInternship />,
      },
      {
        path: '/dashboard/mahasiswa/laporan-akhir/:report_id',
        element: <ReportDetail />,
      },
      {
        path: 'dashboard/admin',
        element: <DashboardAdmin />,
        children: [
          {
            path: 'mahasiswa',
            element: <AdminMahasiswa />,
          },
          {
            path: 'mahasiswa/:mahasiswa_id',
            element: <AdminLogbookMahasiswa />,
          },
          {
            path: 'mahasiswa/internship-report/:internship_id',
            element: <InternshipWeeklyReport />,
          },
          {
            path: 'permohonan-magang',
            element: <AdminRequestInternship />,
          },
          {
            path: 'permohonan-magang/detail/:letter_id',
            element: <DetailRequestInternship />,
          },
          {
            path: 'dosen',
            element: <AdminDashboardDosen />,
          },
          {
            path: ':roleUrl/:dosen_id',
            element: <DetailDosen />,
          },
          {
            path: 'dosen/create',
            element: <CreateAccountDosen />,
          },
          {
            path: 'post',
            element: <AdminDashboardPost />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    children: [
      {
        path: '/login',
        element: <RoleChoose />,
      },
      {
        path: '/login/:roleUrl',
        element: <FormLogin />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/lupa-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:mahasiswa_id/:tokenResetPassword',
    element: <ResetPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
