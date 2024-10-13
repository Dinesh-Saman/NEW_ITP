import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/guest_header';
import Sidebar from '../../Components/sidebar';

const InsertPromotion = () => {
  const [promotion, setPromotions] = useState({
    promotionID: '',
    code: '',
    foodItem: '',
    codeCategory: '',
    discount: '',
    expirationDate: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'discount') {
      const discountValue = Math.max(1, Math.min(100, parseInt(value, 10) || 0));
      setPromotions((prevPromotion) => ({
        ...prevPromotion,
        [name]: discountValue,
      }));
    } else {
      setPromotions((prevPromotion) => ({
        ...prevPromotion,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const discountValue = parseInt(promotion.discount, 10);

    if (discountValue < 1 || discountValue > 100) {
      setErrorMessage('Discount must be between 1 and 100.');
      setShowPopup(true); // Show popup for the error message
      setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
      return;
    }

    const minDate = new Date('2024-01-01');
    const maxDate = new Date('2025-12-31');
    const selectedExpirationDate = new Date(promotion.expirationDate);

    if (selectedExpirationDate < minDate || selectedExpirationDate > maxDate) {
      setErrorMessage('Expiration date must be between 2024 and 2025.');
      setShowPopup(true); // Show popup for the error message
      setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
      return;
    }

    setErrorMessage('');

    axios.post('http://localhost:3002/api/promotions', promotion)
      .then(() => {
        setPromotions({
          promotionID: '',
          code: '',
          foodItem: '',
          codeCategory: '',
          discount: '',
          expirationDate: '',
        });
        setSuccessMessage('Promotion code added successfully!');
        setShowPopup(true); // Show popup for the success message
        setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
      })
      .catch((error) => {
        console.error('There was an error adding the promotion code!', error);
        setErrorMessage('There was an error adding the promotion code. Please try again.');
        setShowPopup(true); // Show popup for the error message
        setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
      });
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', backgroundColor: '#f8f9fa' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff' }}>
          <div style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px', fontFamily:'cursive', color:'purple', textAlign:'center' }}>Add Promotion Code</div>
          <div style={{ backgroundColor: '#f1f1f1', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            {/* Success/Error Popup */}
            {showPopup && (
              <div style={{
                padding: '10px', 
                backgroundColor: errorMessage ? '#f8d7da' : '#d4edda', 
                color: errorMessage ? '#721c24' : '#155724', 
                border: `1px solid ${errorMessage ? '#f5c6cb' : '#c3e6cb'}`, 
                borderRadius: '5px',
                marginBottom: '20px'
              }}>
                {errorMessage || successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor='promoCodeId'>Promotion Code ID</label>
                <input
                  type='text'
                  id='promoCodeId'
                  name='promotionID'
                  placeholder='Enter Code ID'
                  onChange={handleChange}
                  value={promotion.promotionID}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label htmlFor='promoCode'>Promotion Code</label>
                <input
                  type='text'
                  id='promoCode'
                  name='code'
                  placeholder='Enter Promotion Code'
                  onChange={handleChange}
                  value={promotion.code}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label htmlFor='appliedFoodItem'>Applied Food Item</label>
                <select
                  id='appliedFoodItem'
                  name='foodItem'
                  value={promotion.foodItem}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value='' disabled>
                    Select a Food Item
                  </option>
                  <option value='Golden Cheese Fries'>Golden Cheese Fries</option>
                  <option value='Cheinese Fish Soup'>Cheinese Fish Soup</option>
                  <option value='Fried Rice'>Fried Rice</option>
                  <option value='Burger'>Burger</option>
                  <option value='Biriyani'>Biriyani</option>
                  <option value='Chicken Kottu'>Chicken Kottu</option>
                  <option value='Cheese Kottu'>Cheese Kottu</option>
                  <option value='Devilled Chicken Pizza'>Devilled Chicken Pizza</option>
                  <option value='Seafood Pizza'>Seafood Pizza</option>
                  <option value='Cheezy Pasta'>Cheezy Pasta</option>
                  {/* Add other food items */}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label htmlFor='promoCodeCategory'>Promotion Code Category</label>
                <select
                  id='promoCodeCategory'
                  name='codeCategory'
                  value={promotion.codeCategory}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value='' disabled>
                    Select a Category
                  </option>
                  <option value='Time Based'>Time Based</option>
                  {/* Add other categories */}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label htmlFor='discount'>Discount</label>
                <input
                  type='number'
                  id='discount'
                  name='discount'
                  placeholder='Enter Discount'
                  onChange={handleChange}
                  value={promotion.discount}
                  min='1'
                  max='100'
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label htmlFor='expirationDate'>Expiration Date</label>
                <input
                  type='date'
                  id='expirationDate'
                  name='expirationDate'
                  onChange={handleChange}
                  value={promotion.expirationDate}
                  min='2024-01-01'
                  max='2025-12-31'
                  style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
              </div>

              <button style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }} type='submit'>
                Add Promotion Code
              </button>
            </form>
          </div>

          {/* View List Button */}
          <Link to="/view-list" style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            View Promotions List
          </Link>
        </div>
      </div>
    </>
  );
};

export default InsertPromotion;
