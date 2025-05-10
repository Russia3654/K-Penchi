import React, { useEffect, useState } from 'react';
import Button from './ui/Button/Button';
import Modal from './ui/Modals/Modal';
import { addRate, deleteRate, getRate, updateRate } from '../pages/api/finance/rate';
import Loader from './ui/Loader/Loader';

const RateManagement = () => {
    const [rates, setRates] = useState([]);
    const [rateId, setRateId] = useState("");
    const [curencyName, setCurencyName] = useState("");
    const [exchangeRate, setExchangeRate] = useState("");
    const [rateModal, setRateModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadCurrency = async () => {
        setLoading(true);
        const rateList = await getRate();
        setRates(rateList);
        setLoading(false);
    }

    useEffect(() => {
        loadCurrency();
    }, []);

    const handelAddRate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addRate({
                curencyName: curencyName,
                exchangeRate: exchangeRate,
            });
            resetForm();
            loadCurrency();
        } catch (error) {
            console.error("Error adding rate: ", error);
        } finally {
            setLoading(false);
        }
    }
    const handelUpdateRate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateRate(rateId, {
                curencyName: curencyName,
                exchangeRate: exchangeRate,
            });
            resetForm();
            loadCurrency();
        } catch (error) {
            console.error("Error updating rate: ", error);
        } finally {
            setLoading(false);
        }
    }
    const handelDeleteRate = async (e) => {
        setLoading(true);
        try {
            await deleteRate(id);
            resetForm();
            loadColors();
        } catch (error) {
            console.error("Error deleting rate: ", error);
        } finally {
            setLoading(false);
        }
    }
    const resetForm = () => {
        setCurencyName("");
        setExchangeRate("");
        setRateId("");
        setIsEditing(false);
        setRateModal(false);
    }

    return (
        <div style={{ display: 'flex' }}>
            <h2>Rate Management</h2>
            <Button onClick={() => { setRateModal(true) }} location="element">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"
                    style={{ fill: '#FFFFFF' }}>
                    <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 11 L 7 11 L 7 13 L 11 13 L 11 17 L 13 17 L 13 13 L 17 13 L 17 11 L 13 11 L 13 7 L 11 7 z"></path>
                </svg>
            </Button>
            {loading ? (
                <Loader />
            ) : (
                <div></div>
            )}
            {rateModal &&
                <Modal visible={rateModal} setVisible={setRateModal} type="productForm">

                </Modal>
            }
        </div>
    );
}

export default RateManagement;
