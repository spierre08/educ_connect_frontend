import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Admin from './admin/Admin';
import AdminClasse from './admin/Class';
import AdminSubject from './admin/Subject';
import About from './archive/About';
import Archives from './archive/Page';
import Login from './auth/Login';
import ResetPassword from './auth/Reset-password';
import NotFound from './Not-found';
import Home from './Page';
import Register from './register/Register';
import SendOTPByPhone from './send-otp/Send-OTP';
import OTPPage from './send-otp/Verifiy-OTP';
// import Course from './serie-course/serie-course';
import ChatProfessionnels2 from './student/forum/Chat1';
import ChatProfessionnels1 from './teacher/forum/Chat';
import UserList2 from './student/forum/Liste1';
import DashboardEleve from './student/Student';
import CourseItem from './teacher/components/course.component';
import CourseDetailPageTeacher from './teacher/components/detail-course';
import UserList1 from './teacher/forum/Liste';
import DashboardProfesseur from './teacher/Teacher';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/admin/subject" element={<AdminSubject />}></Route>
        <Route path="/admin/class" element={<AdminClasse />}></Route>
        <Route path="/archive" element={<Archives />}></Route>
        {/* <Route path="/archive/course" element={<Course />}></Route> */}
        <Route path="/auth" element={<Login />}></Route>
        <Route path="/auth/reset-password" element={<ResetPassword />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/send-otp-phone" element={<SendOTPByPhone />}></Route>
        <Route path="/verify-otp" element={<OTPPage />}></Route>
        <Route path="/teacher" element={<DashboardProfesseur />}></Route>
        <Route path="/teacher/forum" element={<UserList1 />}></Route>
        <Route path="/teacher/course" element={<CourseItem />}></Route>
        <Route
          path="/teacher/course/detail/:id"
          element={<CourseDetailPageTeacher />}
        ></Route>
        <Route
          path="/teacher/forum/chat/:id"
          element={<ChatProfessionnels1 />}
        ></Route>
        <Route path="/student" element={<DashboardEleve />}></Route>
        <Route path="/student/forum" element={<UserList2 />}></Route>
        <Route
          path="/student/forum/chat/:id"
          element={<ChatProfessionnels2 />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
