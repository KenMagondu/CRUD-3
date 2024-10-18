/** HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to the eCommerce App</h1>
        <p className="lead">
          This web application allows you to browse and purchase items online.
          Sign up or log in to start shopping!
        </p>
        <hr className="my-4" />
        <p>
          To get started, create an account or log in if you already have one.
        </p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/register" role="button">
            Register
          </Link>
          <span className="ml-3"></span>
          <Link className="btn btn-success btn-lg" to="/login" role="button">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default HomePage;

*/
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <h1 className="display-4">Welcome to the MySchool App</h1>
        <p className="lead">
          This web application allows you to browse and learn online.
          Sign up or log in to start learning!
        </p>
        <hr className="my-4" />
        <p>
          To get started, create an account or log in if you already have one.
        </p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/register" role="button">
            Register
          </Link>
          <span className="ml-3"></span>
          <Link className="btn btn-success btn-lg" to="/login" role="button">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default HomePage;