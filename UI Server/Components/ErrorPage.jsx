import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="container mt-5 text-center">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-danger">Page Not Found</h2>
                            <p className="card-text">Sorry, the page you are looking for does not exist.</p>
                            <Link to="/" className="btn btn-primary">Go to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
