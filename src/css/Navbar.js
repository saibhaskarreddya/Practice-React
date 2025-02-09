import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/dropdown';


function Nav() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item ">
                <a class="nav-link active" aria-current="page" href="#">CODES</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">BLOGS</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link active" aria-current="page" href="#">INDICES</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="/dashboard">MUTUALFUNDS</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link active" aria-current="page" href="/chart">INDUSTRIES</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="#">STOCKS</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link active" aria-current="page" href="#">PROFILE</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link" href="#">LOGOUT</a>
              </li>

            </ul>

          </div>
        </div>
      </nav>



      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">

          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item ">
              <a class="nav-link active" aria-current="page" href="#">CODES</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">BLOGS</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link active" aria-current="page" href="#">INDICES</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="/dashboard">MUTUALFUNDS</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link active" aria-current="page" href="/chart">INDUSTRIES</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#">STOCKS</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link active" aria-current="page" href="#">PROFILE</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link" href="#">LOGOUT</a>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Nav;