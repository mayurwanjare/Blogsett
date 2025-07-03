import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import Base from './components/Base';
import { BrowserRouter, Routes, Route} from 'react-router-dom' 
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userdashboard from './pages/user-routes/Userdashboard';
import Privateroute from './components/Privateroute';
import ProfilesInfo from './pages/user-routes/ProfilesInfo';
import bg from './assets/web-background.jpg';
import PostPage from './pages/PostPage';
import ContactPage from './pages/ContactPage';
import UpdatePost from './pages/UpdatePost';

function App() {
  return (
    
   <BrowserRouter>
     <div className="App" >
     {/* <div className="App" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', minHeight: '100vh' }}> */}

      <ToastContainer position="bottom-center"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
        <Route path="/posts/:postId" element={<PostPage />} />

        <Route path="/user" element={<Privateroute />} >
          <Route path="dashboard" element={<Userdashboard />} />
          <Route path="profile-info" element={<ProfilesInfo />} />
        </Route>


      </Routes>
      </div>
   </BrowserRouter>



  );
}

export default App;
