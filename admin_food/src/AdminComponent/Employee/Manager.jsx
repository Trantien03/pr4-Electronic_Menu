import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Delete } from "@mui/icons-material";
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [open, setOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        fullName: '',
        age: '',
        email: '',
        phone: '',
        password: '',
        roles: [] // Giữ roles là mảng
    });

    const apiUrl = 'http://localhost:8080/api/v1/employees';
    const rolesApiUrl = 'http://localhost:8080/api/v1/roles';

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await axios.get(rolesApiUrl);
                setRoles(response.data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchEmployeeData();
        fetchRoles();
    }, []);

    const handleDeleteClick = async (employeeId) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?");
        if (isConfirmed) {
            try {
                await axios.delete(`${apiUrl}/${employeeId}`);
                setEmployees(employees.filter(employee => employee.id !== employeeId));
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        // Reset newEmployee khi đóng dialog
        setNewEmployee({
            fullName: '',
            age: '',
            email: '',
            phone: '',
            password: '',
            roles: [] // Đặt lại trạng thái roles
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleRoleChange = (e) => {
        const selectedIds = e.target.value; // Lấy mảng các ID vai trò được chọn
        setNewEmployee(prev => ({
            ...prev,
            roles: selectedIds.map(id => roles.find(role => role.id === id)).filter(Boolean) // Lấy cả ID và tên vai trò
        }));
    };



    const handleAddEmployee = async () => {
        try {
            // Chỉ cần tạo đối tượng với tất cả thông tin cần thiết
            const employeeToAdd = {
                fullName: newEmployee.fullName,
                age: newEmployee.age,
                email: newEmployee.email,
                phone: newEmployee.phone,
                password: newEmployee.password,
                roles: newEmployee.roles.map(role => ({
                    id: role.id,
                    name: role.name // Bao gồm cả tên vai trò
                })) // Giữ nguyên đối tượng vai trò
            };

            await axios.post(apiUrl, employeeToAdd);
            setEmployees([...employees, employeeToAdd]); // Cập nhật danh sách nhân viên
            handleCloseDialog(); // Đóng dialog
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };



    if (employees.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Quản lý nhân viên</h1>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                        Thêm mới nhân viên
                    </Button>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <div className="flex items-center mb-4">
                        <span className="mr-4">Đang làm việc:</span>
                        <div className="flex-1 border-b border-gray-300"></div>
                        <span className="ml-4">Tất cả nhân viên</span>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                        <tr>
                            <th className="border-b p-2">Email</th>
                            <th className="border-b p-2">Tên nhân viên</th>
                            <th className="border-b p-2">Tuổi</th>
                            <th className="border-b p-2">Số điện thoại</th>
                            <th className="border-b p-2">Chức vụ</th>
                            <th className="border-b p-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td className="border-b p-2">{employee.email}</td>
                                <td className="border-b p-2">{employee.fullName}</td>
                                <td className="border-b p-2">{employee.age}</td>
                                <td className="border-b p-2">{employee.phone}</td>
                                <td className="border-b p-2">
                                    {employee.roles.map(role => role.name).join(', ')}
                                </td>
                                <td className="border-b p-2">
                                    <IconButton onClick={() => handleDeleteClick(employee.id)}>
                                        <Delete />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Dialog thêm mới nhân viên */}
                <Dialog open={open} onClose={handleCloseDialog}>
                    <DialogTitle>Thêm mới nhân viên</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="fullName"
                            label="Tên nhân viên"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newEmployee.fullName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="age"
                            label="Tuổi"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={newEmployee.age}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={newEmployee.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="phone"
                            label="Số điện thoại"
                            type="tel"
                            fullWidth
                            variant="outlined"
                            value={newEmployee.phone}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={newEmployee.password}
                            onChange={handleInputChange}
                        />
                        <TextField
                            select
                            margin="dense"
                            label="Chọn vai trò"
                            fullWidth
                            variant="outlined"
                            value={newEmployee.roles.map(role => role.id)} // Đảm bảo mảng chứa các ID vai trò
                            onChange={handleRoleChange}
                            SelectProps={{
                                multiple: true, // Cho phép chọn nhiều vai trò
                            }}
                        >
                            {roles.map(role => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </TextField>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={handleAddEmployee} color="primary">
                            Thêm
                        </Button>
                    </DialogActions>
                </Dialog>
            </main>
        </div>
    );
};

export default EmployeeList;
