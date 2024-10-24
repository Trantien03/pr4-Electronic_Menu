import React from 'react';
// import OrderCard from './OrderCard.jsx';
// import OrderTable from './OrderTable.jsx';
import Orders from './Orders.jsx';


const ListOrders = () => {
    return (
        <div className="p-4">
            {/*<div className="flex justify-between items-center mb-4">*/}
            {/*    <div className="text-red-500 font-bold text-lg">Status</div>*/}
            {/*    <button className="bg-green-500 text-white px-4 py-2 rounded">Check all</button>*/}
            {/*</div>*/}
            <div className="flex flex-wrap">
                <Orders/>
            </div>
        </div>
    );
}

export default ListOrders;

