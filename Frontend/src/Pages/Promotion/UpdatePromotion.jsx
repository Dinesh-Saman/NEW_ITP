import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/guest_header';
import Sidebar from '../../Components/sidebar';
import './UpdatePromotion.css';
import style from './../../../node_modules/@material-ui/system/es/style';
import { fontFamily } from './../../../node_modules/@material-ui/system/esm/typography';

function UpdatePromotion() {
  const [promotion, setPromotions] = useState({
    promotionID: '',
    code: '',
    foodItem: '',
    codeCategory: '',
    discount: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3002/api/promotions/${id}`)
      .then((res) => {
        setPromotions({
          promotionID: res.data.promotionID,
          code: res.data.code,
          foodItem: res.data.foodItem,
          codeCategory: res.data.codeCategory,
          discount: res.data.discount,
        });
      })
      .catch((err) => {
        console.log('Error from update promotions');
      });
  }, [id]);

  const onChange = (e) => {
    setPromotions({ ...promotion, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      promotionID: promotion.promotionID,
      code: promotion.code,
      foodItem: promotion.foodItem,
      codeCategory: promotion.codeCategory,
      discount: promotion.discount,
    };

    axios
      .put(`http://localhost:3002/api/promotions/${id}`, data)
      .then((res) => {
        navigate(`/view-list`);
      })
      .catch((err) => {
        console.log('Error in Update');
      });
  };

  return (
    <>
      <style>
        {`
          .update-promotion {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 20px;
          }

          .admin-container {
            flex: 1;
            display: flex;
            align-items: center;
          }

          .promo-code-form {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .form-group {
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
          }

          input[type="text"],
          input[type="number"],
          select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
          }

          input[type="text"]:focus,
          input[type="number"]:focus,
          select:focus {
            outline: none;
            border-color: #555;
          }

          .btn-submit {
            padding: 12px;
            background-color: #6c63ff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 18px;
          }

          .btn-submit:hover {
            background-color: #574bff;
          }

          .form-header {
            font-weight: bold;
            font-size: xx-large;
            text-align: center;
            margin-bottom: 20px;
            fontFamily:'cursive'
          }
        `}
      </style>
      <Navbar />
      <div style={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <div className='admin-container update-promotion' style={{ flex: 1, marginTop:'40px' }}>
          <div className='form-header' style={{fontFamily:'cursive', color:'purple'}}>Update Promotion Code</div>
          <form onSubmit={onSubmit} className="promo-code-form">
            <div className="form-group">
              <label htmlFor="promotionID">Promotion Code ID</label>
              <input
                type="text"
                id="promotionID"
                name="promotionID"
                placeholder="Enter Code ID"
                value={promotion.promotionID}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="code">Promotion Code</label>
              <input
                type="text"
                id="code"
                name="code"
                placeholder="Enter Promotion Code"
                value={promotion.code}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="foodItem">Applied Food Item</label>
              <select
                id="foodItem"
                name="foodItem"
                value={promotion.foodItem}
                onChange={onChange}
              >
                <option value="" disabled>
                  Select a Food Item
                </option>
                <option value="Golden Cheese Fries">Golden Cheese Fries</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="codeCategory">Promotion Code Category</label>
              <select
                id="codeCategory"
                name="codeCategory"
                value={promotion.codeCategory}
                onChange={onChange}
              >
                <option value="" disabled>
                  Select a Category
                </option>
                <option value="Time Based">Time Based</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="discount">Discount</label>
              <input
                type="text"
                id="discount"
                name="discount"
                placeholder="Enter Discount"
                value={promotion.discount}
                onChange={onChange}
              />
            </div>

            <button className="btn-submit" type="submit">
              Update Promotion Code
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdatePromotion;
