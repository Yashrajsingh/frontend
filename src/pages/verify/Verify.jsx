import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../components/Context/StoreContext';
import './verify.css';
import axios from 'axios';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {

        try {

            const response = await axios.post(`${url}/api/order/verify`, { success, orderId });

            if (response.data.success) {
                
                navigate("/myorders");

            } else {

                await axios.delete(`${url}/api/order/delete/${orderId}`);
                navigate("/");

            }
        } catch (error) {

            console.error("Payment verification failed:", error);
            navigate("/");

        }
    };

    useEffect(() => {

        if (success !== null && orderId) {
        
            verifyPayment();

        } else {

            navigate("/");

        }
    }, [success, orderId, navigate]);

    return (

        <div className="verify">
            <div className="spinner"></div>
        </div>

    );
};

export default Verify;
