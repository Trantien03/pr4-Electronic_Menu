import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardHeader,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Modal,
    Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const OrderStatus = ({ status }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10); // Số lượng đơn hàng trên mỗi trang

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/orders/status?status=${status}`);
            if (response.status === 200) {
                setOrderItems(response.data);
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("An error occurred while fetching orders");
        }
    };

    const fetchOrderById = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/orders/${orderId}`);
            if (response.status === 200) {
                setSelectedOrder(response.data);
                setOpenModal(true);
            } else {
                toast.error("Error fetching order details");
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
            toast.error("An error occurred while fetching order details");
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [status]);

    const handleOpenModal = (orderId) => {
        fetchOrderById(orderId);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedOrder(null);
    };

    // Tính toán các chỉ số cho phân trang
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderItems.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orderItems.length / ordersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Box>
            <Card className="mt-1">
                <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, minHeight: 400 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Bill Number</TableCell>
                                <TableCell align="left">Table</TableCell>
                                <TableCell align="left">Customer</TableCell>
                                <TableCell align="left">Total Price</TableCell>
                                <TableCell align="left">Created At</TableCell>
                                <TableCell align="left">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentOrders.length > 0 ? (
                                currentOrders.map((order, index) => (
                                    <TableRow key={index} style={{ cursor: "pointer" }}>
                                        <TableCell onClick={() => handleOpenModal(order.id)}>{order.billNumber}</TableCell>
                                        <TableCell align="left" onClick={() => handleOpenModal(order.id)}>
                                            {order.table ? order.table.nameTable : "N/A"}
                                        </TableCell>
                                        <TableCell align="left" onClick={() => handleOpenModal(order.id)}>{order.nameCustomer}</TableCell>
                                        <TableCell align="left" onClick={() => handleOpenModal(order.id)}>${order.totalPrice}</TableCell>
                                        <TableCell align="left" onClick={() => handleOpenModal(order.id)}>{new Date(order.createAt).toLocaleString()}</TableCell>
                                        <TableCell align="left">
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    borderRadius: "20px",
                                                    backgroundColor: order.status === "Paid" ? "green" : "gray",
                                                    color: "white",
                                                    padding: "5px 20px",
                                                }}
                                                onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click đi lên
                                            >
                                                {order.status}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No orders found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Các nút điều hướng phân trang */}
                <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                    <Button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</Button>
                    <Typography>Page {currentPage} of {totalPages}</Typography>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
                </Box>
            </Card>

            {/* Modal hiển thị chi tiết đơn hàng */}
            {selectedOrder && (
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 500,
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            boxShadow: 2,
                            p: 4,
                            maxHeight: "80vh",
                            overflowY: "auto",
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
                            Order: {selectedOrder.billNumber}
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <Typography><strong>Customer:</strong> {selectedOrder.nameCustomer}</Typography>
                            {selectedOrder.table ? (
                                <Typography><strong>Table:</strong> {selectedOrder.table.nameTable}</Typography>
                            ) : (
                                <Typography><strong>Table:</strong> Not Assigned</Typography>
                            )}
                            <Typography><strong>Type:</strong> {selectedOrder.type}</Typography>
                            <Typography><strong>Original Price:</strong> ${selectedOrder.originalPrice}</Typography>
                            <Typography><strong>Total Discount:</strong> ${selectedOrder.totalDiscount}</Typography>
                            <Typography><strong>Total Price:</strong> ${selectedOrder.totalPrice}</Typography>
                        </Box>

                        <Typography sx={{ mt: 2, mb: 2, fontWeight: "bold" }} variant="subtitle1">
                            Ordered Dishes:
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {selectedOrder.items.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        borderBottom: "1px solid #ddd",
                                        paddingBottom: 1,
                                        paddingTop: 1,
                                    }}
                                >
                                    <img
                                        src={`http://localhost:8080/images/${item.dish.image}`}
                                        alt={item.dish.name}
                                        style={{
                                            width: 60,
                                            height: 60,
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            marginRight: 16,
                                        }}
                                    />
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                            {item.dish.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#555" }}>
                                            Quantity: {item.quantity}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#555" }}>
                                            Price: ${item.price}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Modal>
            )}
        </Box>
    );
};

export default OrderStatus;
