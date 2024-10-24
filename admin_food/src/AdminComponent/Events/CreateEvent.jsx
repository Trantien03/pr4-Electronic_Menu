import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// Cập nhật URL API
const url = "http://localhost:8080/api/v1/events";

const CreateEvent = ({ open, handleClose, event }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    startedAt: null,
    endsAt: null,
    discount: '',
  });

  useEffect(() => {
    if (event) {
      setFormValues({
        name: event.name,
        discount: event.discount,
        startedAt: dayjs(event.startDay), // Chuyển đổi chuỗi ISO thành dayjs
        endsAt: dayjs(event.endDay),       // Chuyển đổi chuỗi ISO thành dayjs
      });
    } else {
      setFormValues({
        name: '',
        startedAt: null,
        endsAt: null,
        discount: '',
      });
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.name || !formValues.discount || !formValues.startedAt || !formValues.endsAt) {
      alert("Vui lòng điền tất cả các trường!");
      return;
    }

    if (dayjs(formValues.endsAt).isBefore(formValues.startedAt)) {
      alert("Ngày kết thúc không thể trước ngày bắt đầu!");
      return;
    }

    if (isNaN(formValues.discount) || formValues.discount < 0 || formValues.discount > 100) {
      alert("Giảm giá phải là một số từ 0 đến 100!");
      return;
    }

    const data = {
      name: formValues.name,
      startDay: formValues.startedAt.toISOString(), // Chuyển đổi thành chuỗi ISO
      endDay: formValues.endsAt.toISOString(),     // Chuyển đổi thành chuỗi ISO
      discount: parseFloat(formValues.discount),   // Chuyển đổi sang kiểu số
    };

    try {
      let response;
      if (event) {
        response = await axios.put(`${url}/${event.id}`, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        toast.success("Sự kiện đã được cập nhật thành công!");
      } else {
        response = await axios.post(url, data, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
          toast.success("Sự kiện đã được tạo thành công!");
        } else {
          toast.error("Tạo sự kiện thất bại!");
        }
      }

      handleClose();
    } catch (error) {
      console.error('Error creating/updating event:', error);
      toast.error('Tạo/cập nhật sự kiện thất bại. Vui lòng kiểm tra lại.');
    }
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue, dateType) => {
    setFormValues({ ...formValues, [dateType]: newValue });
  };



  return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                      fullWidth
                      label="Tên sự kiện"
                      name="name"
                      value={formValues.name}
                      onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                      label="Ngày bắt đầu"
                      value={formValues.startedAt}
                      onChange={(newValue) => handleDateChange(newValue, 'startedAt')}
                      renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                      label="Ngày kết thúc"
                      value={formValues.endsAt}
                      onChange={(newValue) => handleDateChange(newValue, 'endsAt')}
                      renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      fullWidth
                      label="Giảm giá (%)"
                      name="discount"
                      value={formValues.discount}
                      onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    {event ? "Cập nhật" : "Tạo sự kiện"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </LocalizationProvider>
        </Box>
      </Modal>
  );
};

export default CreateEvent;
