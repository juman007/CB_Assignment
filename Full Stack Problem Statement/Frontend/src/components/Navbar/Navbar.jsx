import React from "react";
import "./Navbar.css";

const Navbar = () => {
   return (
      <div>
         <nav
            className="navbar bg-dark border-bottom border-body"
            data-bs-theme="dark"
         >
            <div className="container-fluid">
               <a className="navbar-brand fw-bold fs-4">
                  Full Stack Problem Statement
               </a>
               <form className="d-flex" role="search">
                  <button type="button" className="btn btn-primary me-2">
                     Sign Up
                  </button>
                  <button type="button" className="btn btn-danger">
                     Sign In
                  </button>
               </form>
            </div>
         </nav>
      </div>
   );
};

export default Navbar;
