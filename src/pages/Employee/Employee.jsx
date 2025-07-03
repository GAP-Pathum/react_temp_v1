import React from 'react';

const Employee = () => {
  return (
    <div className="container-fluid">
      <h1 className="mt-4">Employee Management</h1>
      <p>This is the employee management page where you can view and manage employees.</p>
      
      <div className="card mb-4">
        <div className="card-header">
          <i className="bi bi-table me-1"></i>
          Employee List
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>Developer</td>
                <td>IT</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jane Smith</td>
                <td>Designer</td>
                <td>UI/UX</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;