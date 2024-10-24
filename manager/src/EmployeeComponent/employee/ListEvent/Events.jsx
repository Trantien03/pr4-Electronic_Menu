import React, { useState } from 'react';
import ListEvents from './EventTable';

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
             
                <ListEvents />

                {/* Modal CreateEvent - Hiển thị riêng biệt */}
                {/* <CreateEvent open={isModalOpen} handleClose={handleCloseModal} /> */}
            </main>
        </div>
    );
};

export default Events;
