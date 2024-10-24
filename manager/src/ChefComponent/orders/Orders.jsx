import React, { useState } from 'react';
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import OrderStatus from "./OrderStatus.jsx";
import OrderCard from './OrderCard.jsx';

const orderStatus = [
  { label: "PENDING", value: "Pending" },
  { label: "PENDING PAYMENT", value: "PendingPayment" },
];

const Orders = () => {
  const [filterValue, setFilterValue] = useState("Pending"); // Set a default value

  const handleFilter = (e) => {
    setFilterValue(e.target.value); // Update state with the selected value
  };

  return (
      <div className='px-2'>
        <Card 
          className='p-5' 
          sx={{ 
            width: '1180px', 
            height: '120px', 
            background: 'linear-gradient(135deg, #ffe5b4 0%, #ffffff 100%)'  // Màu cam nhạt sang trắng
          }}
        >
          <Typography sx={{ paddingBottom: "1rem" }} variant='h5'>
            Order Status
          </Typography>
          <FormControl>
            <RadioGroup
                onChange={handleFilter} // Use onChange instead of onClick
                row
                name='category'
                value={filterValue}
            >
              {orderStatus.map((item) => (
                  <FormControlLabel
                      key={item.label}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      sx={{ color: "gray" }} // Ensure this matches your theme
                  />
              ))}
            </RadioGroup>
          </FormControl>
        </Card>

        {filterValue === "Pending" && <OrderCard status="Pending" />}
        {filterValue === "PendingPayment" && <OrderStatus status="PendingPayment" />}
      </div>
  );
};

export default Orders;
