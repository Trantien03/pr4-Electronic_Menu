import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const apiUrl = 'http://localhost:8080/api/v1/employees'; // Điều chỉnh URL API thực tế của bạn

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setEmployees(response.data); // Cập nhật toàn bộ danh sách nhân viên
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    if (employees.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Employee List</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Roles</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.fullName}</td>
                        <td>{employee.age}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.roles.map(role => role.name).join(', ')}</td>
                        <td>{employee.enabled ? 'Active' : 'Inactive'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
