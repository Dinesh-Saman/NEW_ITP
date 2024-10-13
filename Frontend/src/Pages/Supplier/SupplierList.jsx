import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierCard from './SupplierCard';
import './SupplierList.css';
import jsPDF from 'jspdf'; // Correct import
import 'jspdf-autotable';
import Navbar from '../../Components/guest_header';
import Sidebar from '../../Components/sidebar';
import letterheadImage from '../../Images/LetterHead.png';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Initialize as an empty string
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filtered = suppliers.filter((supplier) =>
      supplier.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredSuppliers(filtered);
  }, [searchQuery, suppliers]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/api/suppliers')
      .then((res) => {
        setSuppliers(res.data);
        setFilteredSuppliers(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.log('Error while getting data');
      });
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add letterhead image directly from imported file
    doc.addImage(letterheadImage, 'PNG', 10, 10, doc.internal.pageSize.width - 20, 60); // Adjust size and position

    // Add the Supplier List title
    doc.setFontSize(16);
    doc.text('Supplier List', 14, 80);

    // Define table columns and rows
    const tableColumn = ['Supplier Name', 'ID'];
    const tableRow = [];

    filteredSuppliers.forEach((supplier) => {
        const supplierData = [supplier.name, supplier._id];
        tableRow.push(supplierData);
    });

    // Add table of suppliers below the letterhead and title
    doc.autoTable({
        head: [tableColumn],
        body: tableRow,
        startY: 90, // Adjust to start after the title
    });

    // Save the generated PDF
    doc.save('supplier.pdf');
};


  const SupplierListContent =
    suppliers.length === 0
      ? 'No suppliers found!' // Update message for clarity
      : filteredSuppliers.map((supplier, index) => (
          <SupplierCard key={index} supplier={supplier} />
        ));

  return (
    <>
      <Navbar />
      <div className="supplier-page">
        <Sidebar />
        <div className="supplier-list-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search suppliers.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="button">
            <button onClick={generatePDF}>Download PDF</button>
          </div>
          <div className="list">{SupplierListContent}</div>
        </div>
      </div>
    </>
  );
};

export default SupplierList;
