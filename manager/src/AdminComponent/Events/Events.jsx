import React, { useState } from 'react';
import EventTable from './EventTable';
import CreateEvent from './CreateEvent.jsx';
import { Card, CardHeader, IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

const Events = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <main>
                <Card className='mt-1'>
                    <CardHeader
                        action={
                            <IconButton onClick={handleOpenModal} aria-label="add-event">
                                <CreateIcon /> {/* Nút mở modal */}
                            </IconButton>
                        }
                        title={"Event List"}
                        sx={{ pt: 2, alignItems: "center" }}
                    />
                </Card>
                <EventTable />

                {/* Modal CreateEvent - Hiển thị riêng biệt */}
                <CreateEvent open={isModalOpen} handleClose={handleCloseModal} />
            </main>
        </div>
    );
};

export default Events;
