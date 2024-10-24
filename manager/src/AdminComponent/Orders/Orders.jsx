import React, { useState } from 'react';
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import OrderTable from './OrderTable';
import OrderStatus from "./OrderStatus.jsx";

const orderStatus = [
  { label: "PENDING", value: "Pending" },
  { label: "PENDING PAYMENT", value: "PendingPayment" },
  { label: "PAID", value: "Paid" },
  { label: "ALL", value: "All" }
];

const Orders = () => {
  const [filterValue, setFilterValue] = useState("All"); // Set a default value

  const handleFilter = (e) => {
    setFilterValue(e.target.value); // Update state with the selected value
  };

  return (
      <div className='px-2'>
        <Card className='p-5'>
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

        {filterValue === "Pending" && <OrderStatus status="Pending" />}
        {filterValue === "PendingPayment" && <OrderStatus status="PendingPayment" />}
        {filterValue === "Paid" && <OrderStatus status="Paid" />}
        {filterValue === "All" && <OrderTable />}

      </div>
  );
};

export default Orders;
