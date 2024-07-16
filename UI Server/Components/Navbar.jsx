import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import EmployeeDirectory from "./EmployeeDirectory.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeDetails from "./EmployeeDetails.jsx";
import EmployeeEdit from "./EmployeeEdit.jsx";
import ErrorPage from "./ErrorPage.jsx";

class Navbar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">{this.props.name}</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/search/all">Search</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create">Create</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<EmployeeDirectory />} />
                        <Route path="/search/:type" element={<EmployeeSearch />} />
                        <Route path="/search" element={<EmployeeSearch />} />
                        <Route path="/create" element={<EmployeeCreate />} />
                        <Route path="/employee/:id" element={<EmployeeDetails />} />
                        <Route path="/edit/:id" element={<EmployeeEdit />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }
}

export default Navbar;
