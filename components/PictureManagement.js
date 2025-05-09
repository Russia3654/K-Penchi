import React, { useState } from 'react';
import { uploadPicture, getPictures, deletePicture } from '../pages/api/pictures/pictures';
import Picture from './Picture';
import Modal from './ui/Modals/Modal';
import Loader from './ui/Loader/Loader';
import Input from './ui/Input/Input';
import Button from './ui/Button/Button';

const PictureManagement = () => {
    const [loading, setLoading] = useState(false);
    const [upLoading, setUpLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [modalPictureVisible, setModalPictureVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handlePictureChange = async (files) => {
        const uploadedPictures = [];
        setUpLoading(true);
        try {
            for (const file of files) {
                const fileData = await uploadPicture(file);
                uploadedPictures.push({ url: fileData.url, id: fileData.fileId });
            }
        } catch (error) {
            console.error('Error uploading pictures: ', error)
        } finally {
            setUpLoading(false);
        }
    };

    const loadPictures = async () => {
        setLoading(true);
        try {
            const fetchedPictures = await getPictures();
            setPictures(fetchedPictures);
        } catch (error) {
            console.error('Error fetching pictures: ', error);
        } finally {
            setLoading(false);
        }
    };

    const DeletePicture = async (pictureID, pictureUrl) => {
        setIsDeleting(true);
        try {
            await deletePicture(pictureID, pictureUrl);
            alert('Picture deleted successfully!');
            // Update local state immediately instead of waiting for reload
            setPictures(prev => prev.filter(pic => pic.id !== pictureID));
        } catch (error) {
            console.error('Error deleting picture: ', error);
            alert('Failed to delete picture. Please try again.');
        } finally {
            setIsDeleting(false);
            loadPictures(); // Refresh the list from server
        }
    };


    return (
        <div>
            <h2>Manage Pictures</h2>
            <Input
                type="file"
                text="Select Pictures"
                componentName="PictureManagement"
                multiple
                onChange={(e) => handlePictureChange(e.target.files)}
            />
            <Button
                onClick={() => {
                    setModalPictureVisible(true);
                    setIsUploading(true);
                    loadPictures();
                }}
                disabled={loading}
            >
                View Cloud Pictures
            </Button>

            {(upLoading || loading || isDeleting) && (
                <Loader text={upLoading ? "Uploading" : loading ? "Loading" : "Deleting"} />
            )}

            {modalPictureVisible && (
                <Modal visible={modalPictureVisible} setVisible={setModalPictureVisible} type="picture">
                    <Picture
                        pictures={pictures}
                        setVisible={setModalPictureVisible}
                        cloudLoader={loadPictures}
                        deletePicture={DeletePicture}
                        modes={{ isUploading, isDeleting }}
                    />
                </Modal>
            )}
        </div>
    );
};

export default PictureManagement;
