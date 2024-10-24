import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
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
  TablePagination, // Import TablePagination
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const OrderTable = ({ url = `http://localhost:8080` }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0); // State cho phân trang
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số hàng trên mỗi trang
  const [totalOrders, setTotalOrders] = useState(0); // Tổng số đơn hàng

  // Hàm lấy danh sách đơn hàng với phân trang
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/orders`, {
        params: {
          page,
          size: rowsPerPage, // Số hàng mỗi trang
        },
      });
      if (response.status === 200) {
        setOrderItems(response.data.content); // Cập nhật danh sách đơn hàng
        setTotalOrders(response.data.totalElements); // Tổng số đơn hàng
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  // Lấy danh sách đơn hàng khi component mount hoặc khi thay đổi page/rowsPerPage
  useEffect(() => {
    if (url) {
      fetchAllOrders();
    }
  }, [url, page, rowsPerPage]); // Gọi lại API khi page hoặc rowsPerPage thay đổi

  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Hàm xử lý thay đổi số hàng trên mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset lại về trang đầu tiên
  };

  return (
    <Box>
      <Card className="mt-1">
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
              {orderItems.length > 0 ? (
                orderItems.map((order, index) => (
                  <TableRow key={index} style={{ cursor: "pointer" }}>
                    <TableCell onClick={() => handleOpenModal(order.id)}>{order.billNumber}</TableCell>
                    <TableCell align="left" onClick={() => handleOpenModal(order.id)}>
                      {order.restaurantTable ? order.restaurantTable.nameTable : "N/A"}
                    </TableCell>
                    <TableCell align="left" onClick={() => handleOpenModal(order.id)}>
                      {order.customer}
                    </TableCell>
                    <TableCell align="left" onClick={() => handleOpenModal(order.id)}>
                      ${order.totalPrice}
                    </TableCell>
                    <TableCell align="left" onClick={() => handleOpenModal(order.id)}>
                      {new Date(order.createAt).toLocaleString()}
                    </TableCell>
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

        {/* Phân trang */}
        <TablePagination
          component="div"
          count={totalOrders} // Tổng số đơn hàng
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
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
              <Typography>
                <strong>Customer:</strong> {selectedOrder.nameCustomer}
              </Typography>
              {selectedOrder.table ? (
                <Typography>
                  <strong>Table:</strong> {selectedOrder.table.nameTable}
                </Typography>
              ) : (
                <Typography>
                  <strong>Table:</strong> Not Assigned
                </Typography>
              )}
              <Typography>
                <strong>Type:</strong> {selectedOrder.type}
              </Typography>
              <Typography>
                <strong>Original Price:</strong> ${selectedOrder.originalPrice}
              </Typography>
              <Typography>
                <strong>Total Discount:</strong> ${selectedOrder.totalDiscount}
              </Typography>
              <Typography>
                <strong>Total Price:</strong> ${selectedOrder.totalPrice}
              </Typography>
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

export default OrderTable;
