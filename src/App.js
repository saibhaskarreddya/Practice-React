// import logo from './logo.svg';
// import React from 'react';
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import './App.css';
// import Name from './practice/jsx';
// import List from './practice/list';
// import Todo from './practice/Todolist';
// import Packing from './practice/condition';
// import Array from './practice/Array';
// import Filter from './practice/filter';
// import App from './practice/button';
// import Pages from './practice/page';

// function Application() {
//   return (
//     <BrowserRouter>
//       <div>
//         <nav>
//           <Link to="/">Home</Link><br />
//           <Link to="practice/page">Pages</Link>
//         </nav>
//         <Routes>
//           {/* Define a route for the home page */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <Name />
//                 <App />
//                 <List />
//                 <Todo />
//                 <Packing />
//                 <Array />
//                 <Filter />
//               </>
//             }
//           />
//           {/* Route for the Pages component */}
//           <Route path="/practice/page" element={<Pages />} />
//         </Routes>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default Application;
import React from 'react';
import Navbar from './practice/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Practice from './pages/Practice';
import Investmentchart from './pages/Graph';
import Work from './Work/Work';
import TrendlyneWidget from './Work/Swot';
import MyComponent from './Work/Heatmap';
import HeatMaps from './Work/Heat';
import Cagr from './Work/Cagr';
import Demo from './Work/Demo';
import Login from './pages/Login';
import Sign from './pages/Signup';
import MyComponents from './Work/Git';
import Nav from './css/Navbar';
function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        {/* git remote add origin https://github.com/saibhaskarreddya/practice.git
git branch -M main
git push -u origin main */}

        <Routes>
          <Route path='/home' exact Component={Home} />
          <Route path='/navbar' exact Component={Navbar} />
          <Route path='/dashboard' exact Component={Dashboard} />
          <Route path='/About' exact Component={About} />
          <Route path='/practice' exact Component={Practice} />
          <Route path='/chart' exact Component={Investmentchart} />
          <Route path='/work' exact Component={Work} />
          <Route path='/swot' exact Component={TrendlyneWidget} />
          <Route path='/heatmap' exact Component={MyComponent} />
          <Route path='/heatmapp' exact Component={HeatMaps} />
          <Route path='/cagr' exact Component={Cagr} />
          <Route path='/demo' exact Component={Demo} />
          <Route path='/' exact Component={Login} />
          <Route path='/sign' exact Component={Sign} />
          <Route path='/component' exact Component={MyComponents} />
          <Route path='/navbars' exact Component={Nav} />

        </Routes>
      </BrowserRouter>

    </>
  )
}
export default App;