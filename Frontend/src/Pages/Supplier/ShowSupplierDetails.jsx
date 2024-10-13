import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import ReactToPrint from 'react-to-print';
import Navbar from '../../Components/guest_header'; 
import Sidebar from '../../Components/sidebar'; 

const ShowSupplierDetailsPage = () => {
  const [supplier, setSupplier] = useState(null); // Use null to indicate loading state
  const { id } = useParams();
  const componentRef = useRef();

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/suppliers/${id}`);
        setSupplier(response.data);
      } catch (error) {
        console.error("Error fetching supplier details:", error);
      }
    };

    fetchSupplierDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="showSupplierDetailsPage">
        <div className="col-md-10 m-auto">
          <br />
          <Link to="/" className="btn btn-outline-danger float-right">Back to main</Link>
        </div>

        <br />
        <div className="col-md-8 m-auto">
          <h1 className="display-6-bold text-center">Supplier Details</h1>
          <p className="text-center">This is the full detail of the supplier</p>
          <hr />
          <br />
        </div>

        <div className="col-md-10 m-auto">
          <ReactToPrint
            trigger={() => <button className="btn btn-primary">Print Supplier Details</button>}
            content={() => componentRef.current} 
            documentTitle="Supplier Details"
            pageStyle="print"
            onAfterPrint={() => console.log('Document printed')}
          />
          <div ref={componentRef}>
            <table className="table table-hover table-dark">
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>ID</td>
                  <td>{supplier ? supplier.supplierID : 'Loading...'}</td> {/* Fallback if supplier is null */}
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Name</td>
                  <td>{supplier ? supplier.name : 'Loading...'}</td> {/* Fallback if supplier is null */}
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Product</td>
                  <td>{supplier ? supplier.product : 'Loading...'}</td> {/* Fallback if supplier is null */}
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>NIC</td>
                  <td>{supplier ? supplier.nic : 'Loading...'}</td> {/* Fallback if supplier is null */}
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Contact No</td>
                  <td>{supplier ? supplier.contactNo : 'Loading...'}</td> {/* Fallback if supplier is null */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-6 m-auto">
          <Link
            to={`/updatedetails/${supplier ? supplier._id : ''}`} // Ensure no error if supplier is null
            className="btn btn-outline-info btn-lg btn-block d-flex justify-content-center"
            style={{ pointerEvents: supplier ? 'auto' : 'none', opacity: supplier ? 1 : 0.5 }} // Disable button if supplier is null
          >
            Edit Supplier
          </Link>
        </div>
      </div>
    </>
  );
}

export default ShowSupplierDetailsPage;
