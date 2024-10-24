import React, { useState } from 'react';

const WelcomeForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Chào mừng ${name} đến với Quán BòM!`);
  };

  return (
    <div className="welcome-container">
      <img src="https://o2o.ipos.vn/static/images/icon_staff.svg" alt="Staff Icon" />
      <h1>QUÁN BÒM. Xin Kính chào bạn</h1>
      <p>Mời bạn nhập tên để nhà hàng phục vụ bạn nhanh chóng hơn, chính xác hơn</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên của bạn"
          className="name-input"
        />
        <button type="submit" className="start-btn">Bắt đầu</button>
      </form>
      <div className="language-selector">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" alt="Vietnam Flag" className="flag-icon" />
        <span>VIETNAM</span>
      </div>
    </div>
  );
};

export default WelcomeForm;
