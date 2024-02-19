import React, { useEffect, useState, useRef } from 'react';
import { Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { BsPencil, BsTrash } from 'react-icons/bs';

function CRUD() {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        menu_id: '',
        menu_name: '',
        menu_descript: '',
        price: '',
        menu_img: '',
        type: '',
        rating: ''
    });
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of data items to display per page
    const formRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Fetch data from the API
        fetch('http://localhost:8080/apirestaurant/')
            .then((response) => response.json())
            .then((data) => {
                // Sort the data based on menu_id in ascending order
                const sortedData = data.slice().sort((a, b) => a.menu_id - b.menu_id);
                setData(sortedData);
            })
            .catch((error) => {
                console.error("Error fetching data from the API:", error);
            });
    };

    const handleModalOpen = () => {
        setSelectedPlace(null);
        setFormData({
            menu_id: '',
            menu_name: '',
            menu_descript: '',
            price: '',
            menu_img: '',
            type: '',
            rating: ''
        });
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (selectedPlace) {
            // Send the form data to the API using an HTTP PUT request if a place is selected for editing
            fetch(`http://localhost:8080/apirestaurant/${selectedPlace.menu_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(updatedPlace => {
                    // Assuming the API returns the updated data, you can update the state with it
                    setData(data.map(place => (place.menu_id === updatedPlace.menu_id ? updatedPlace : place)));
                    setFormData({
                        menu_id: '',
                        menu_name: '',
                        menu_descript: '',
                        price: '',
                        menu_img: '',
                        type: '',
                        rating: ''
                    });
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error updating data to the API:', error);
                });
            window.alert('แก้ไขสำเร็จแล้ว')
        } else {
            fetch('http://localhost:8080/apirestaurant/', {
                method: 'CREATE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(newPlace => {
                    setData([...data, newPlace]);
                    setFormData({
                        menu_id: '',
                        menu_name: '',
                        menu_descript: '',
                        price: '',
                        menu_img: '',
                        type: '',
                        rating: ''
                    });
                    setShowModal(false);
                })
                .catch(error => {
                    console.error('Error sending data to the API:', error);
                });
            window.alert('เพิ่มข้อมูลสำเร็จแล้ว')
        }
        window.location.reload();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (menu_id) => {
        // Find the selected place from the data array based on the ID
        const placeToEdit = data.find(place => place.menu_id === menu_id);
        if (placeToEdit) {
            setSelectedPlace(placeToEdit);
            setFormData({
                menu_id: placeToEdit.menu_id,
                menu_name: placeToEdit.menu_name,
                menu_descript: placeToEdit.menu_descript,
                price: placeToEdit.price,
                menu_img: placeToEdit.menu_img,
                type: placeToEdit.type,
                rating: placeToEdit.rating
            });
            setShowModal(true);
        }
    };

    const handleDelete = (id) => {
        // Show a confirmation dialog before proceeding with the deletion
        const confirmDelete = window.confirm('ยืนยันการลบข้อมูล');

        if (confirmDelete) {
            // Send a DELETE request to the API to remove the place with the specified ID
            fetch(`http://localhost:8080/apirestaurant/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }) // Send the ID of the place to be deleted in the request body
            })
                .then(response => response.json())
                .then(() => {
                    // Update the state to remove the deleted place from the data array
                    setData(data.filter(place => place.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting data from the API:', error);
                });
        } else {
            // If the user cancels the deletion, do nothing
            console.log('Deletion canceled.');
        }
        window.alert('ลบสำเร็จแล้ว')
        window.location.reload();
    };

    // Calculate the index range for displaying data items based on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    // Update the current page when navigating to a different page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="pagination" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? 'active' : ''}
                        style={{
                            padding: '10px 20px', /* เพิ่มขนาด padding ให้กับปุ่ม */
                            margin: '5px',
                            borderRadius: '5px',
                            backgroundColor: currentPage === page ? 'blue' : 'gray',
                            color: 'white',
                            fontSize: '18px', /* เพิ่มขนาดของตัวอักษรในปุ่ม */
                            cursor: 'pointer',
                            ':hover': {
                                border: '1px solid black',
                            },
                        }}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={handleModalOpen}>
                    เพิ่มข้อมูล
                </Button>
            </div>


            <Dialog open={showModal} onClose={handleModalClose}>
                <DialogTitle>{selectedPlace ? 'แก้ไขข้อมูลอาหาร' : 'เพิ่มข้อมูลอาหาร'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
                        <TextField label="รหัสอาหาร" name="menu_id" value={formData.menu_id} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }} />
                        <TextField label="ชื่ออาหาร" name="menu_name" value={formData.menu_name} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }} />
                        <TextField label="รายละอียดอาหาร" name="menu_descript" value={formData.menu_descript} onChange={handleInputChange} fullWidth multiline rows={4} style={{ marginBottom: '10px', width: '100%' }} />
                        <TextField label="ราคา" name="price" value={formData.price} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }} />
                        <TextField label="รูปอาหาร" name="menu_img" value={formData.menu_img} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }} />
                        <TextField label="ประเภทอาหาร" name="type" value={formData.type} onChange={handleInputChange} fullWidth style={{ marginBottom: '10px' }} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>
                        {selectedPlace ? 'แก้ไข' : 'บันทึก'}
                    </Button>
                    <Button variant="contained" color="error" onClick={handleModalClose}>
                        ยกเลิก
                    </Button>
                </DialogActions>
            </Dialog>

            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">รหัสอาหาร</th>
                            <th className="px-4 py-2">ชื่ออาหาร</th>
                            <th className="px-4 py-2">รายละเอียดอาหาร</th>
                            <th className="px-4 py-2">ราคา</th>
                            <th className="px-4 py-2">รูปอาหาร</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(place => (
                            <tr key={place.menu_id}>
                                <td className="border px-4 py-2">{place.menu_id}</td>
                                <td className="border px-4 py-2">{place.menu_name}</td>
                                <td className="border px-4 py-2">{place.menu_descript}</td>
                                <td className="border px-4 py-2">{place.price}</td>
                                <td className="border px-4 py-2">
                                    <img src={place.menu_img} alt={place.menu_name} style={{ maxWidth: '150px' }} />
                                </td>
                                <td className="border px-4 py-5">
                                    <div className="flex justify-between">
                                        <Button className="py-2 px-4" variant="contained" color="primary" onClick={() => handleEdit(place.menu_id)}>
                                            <BsPencil />
                                        </Button>
                                        <Button className="py-2 px-4" variant="contained" color="error" onClick={() => handleDelete(place.menu_id)}>
                                            <BsTrash />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>




        </div>
    );
}

export default CRUD;
