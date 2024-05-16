
import React, { useEffect, useState, useContext } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex,
    Button,
    Text,
    Input,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
  import { DataContext } from '../context/DataProvider';  

function MainTable({tableData,setTableData}) {

    const { data,setData } = useContext(DataContext);
    // const [tableData, setTableData] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        upvotes: '',
        date: ''
    });

    const containerClass = tableData.length > 7 ? 'scroll-container' : '';

    const sortTable = (key) => {
        let sortedData = [...tableData];
        if (key === 'upvotes') {
            sortedData.sort((a, b) => b.upvotes - a.upvotes);
        } else if (key === 'date') {
            sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        setTableData(sortedData);
        setSortBy(key);
    };

    const handleViewClick = (record) => {
        setSelectedRecord(record);
        onViewOpen();
    };

    const handleDeleteClick = (record) => {
        setSelectedRecord(record);
        onDeleteOpen();
    };

    const handleDeleteConfirm = () => {
        if (!selectedRecord) {
            return;
        }
    
        const request = indexedDB.open('crudDB', 1);
    
        request.onerror = (event) => {
            console.error('Database error:', event.target.errorCode);
        };
    
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['records'], 'readwrite');
            const objectStore = transaction.objectStore('records');
            const deleteRequest = objectStore.delete(selectedRecord.id);
    
            deleteRequest.onsuccess = () => {
                setTableData(prevData => prevData.filter(item => item.id !== selectedRecord.id));

                // Perform any additional actions after deletion
                setData(prevData => ({
                    result: Array.isArray(prevData.result) ? prevData.result.filter(item => item.id !== selectedRecord.id) : []
                }));
            };
    
            deleteRequest.onerror = (event) => {
                console.error('Error deleting record:', event.target.error);
            };
        };
    
        onDeleteClose();
    };
    
    const handleEditClick = (record) => {
        setSelectedRecord(record);
        setEditMode(true);
        setFormData({
            title: record.title,
            upvotes: record.upvotes,
            date: record.date
        });
    };
    
    const handleSaveEdits = () => {
        const updatedData = tableData.map((item) =>
            item.id === selectedRecord.id ? { ...item, ...formData } : item
        );
        setTableData(updatedData);
        setEditMode(false);
        setFormData({
            title: '',
            upvotes: '',
            date: ''
        });
    
        const request = indexedDB.open('crudDB', 1);
    
        request.onerror = (event) => {
            console.error('Database error:', event.target.errorCode);
        };
    
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['records'], 'readwrite');
            const objectStore = transaction.objectStore('records');
            const updatedRecord = { ...selectedRecord, ...formData, upvotes: parseInt(formData.upvotes) };

            const updateRequest = objectStore.put(updatedRecord);
    
            updateRequest.onsuccess = () => {
                console.log('Record updated successfully');
            };
    
            updateRequest.onerror = (event) => {
                console.error('Error updating record:', event.target.error);
            };
        };
    };

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };
    
    const delayedSearch = debounce((text) => {
        if (data && data.result) {
            if (text.length >= 3) {
                const filteredData = data.result.filter((item) =>
                    item.title.toLowerCase().includes(text.toLowerCase())
                );
                setTableData(filteredData);
            } else if (text === '') {
                setTableData(data.result);
            }
        }
    }, 1000);
    
    const handleSearchChange = (e) => {
        const text = e.target.value;
        console.log("text-----",text);
        setSearchText(text);
        if (data && data.result) {
            if (text.length >= 3) {
                delayedSearch(text);
            } else if (text === '') {
                setTableData(data.result);
            }
        }
    };
    


  return (
    <>
    <Box className='search-wrap'>
        <Input
            placeholder="Search the record..."
            bg='#fff'
            color='#000'
            value={searchText}
            onChange={handleSearchChange}
        />
    </Box>
    <Flex justify='center' mt={6} mb={6} gap={5} alignItems='center'>
        <Text color='#000' >SORT BY</Text>
        <Button bg='#00a233' color='#fff' borderRadius={0} onClick={() => sortTable('upvotes')} colorScheme={sortBy === 'upvotes' ? 'blue' : 'gray'}>
            Most Upvoted
        </Button>
        <Button bg='#00a233' color='#fff' borderRadius={0} onClick={() => sortTable('date')} colorScheme={sortBy === 'date' ? 'blue' : 'gray'}>
            Most Recent
        </Button>
    </Flex>
    <div className={containerClass}>
    <TableContainer bg={'white'}>
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th>Title</Th>
                    <Th>Upvotes</Th>
                    <Th>Date</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {tableData.map((item) => (
                    <Tr key={item.id}>
                        <Td>{editMode && selectedRecord.id === item.id ? <input className="edit-input" type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} /> : item.title}</Td>
                        <Td>{editMode && selectedRecord.id === item.id ? <input className="edit-input" type="text" value={formData.upvotes} onChange={(e) => setFormData({...formData, upvotes: e.target.value})} /> : item.upvotes}</Td>
                        <Td>{editMode && selectedRecord.id === item.id ? <input className="edit-input" type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} /> : item.date}</Td>
                        <Td>
                            <Flex gap={2}>
                                {editMode && selectedRecord.id === item.id ? (
                                    <>
                                        <Button
                                            bg='#00a233'
                                            color='#fff'
                                            size='sm'
                                            onClick={handleSaveEdits}
                                        >
                                            Save Edits
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button bg='#00a233' color='#fff' size='sm' onClick={() => handleViewClick(item)}>View</Button>
                                        <Button bg='#007ea6' color='#fff' size='sm' onClick={() => handleEditClick(item)}>Edit</Button>
                                        <Button bg='#a81502' color='#fff' size='sm' onClick={() => handleDeleteClick(item)}>Delete</Button>
                                    </>
                                )}    
                            </Flex>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </TableContainer>
    </div>

    <Modal isOpen={isViewOpen} onClose={onViewClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>View Record</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {selectedRecord && (
                    <>
                        <p>Label: {selectedRecord.title}</p>
                        <p>Value: {selectedRecord.upvotes}</p>
                    </>
                )}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onViewClose}>
                    Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to delete this record?
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleDeleteConfirm}>
                    Confirm
                </Button>
                <Button onClick={onDeleteClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    
    </>
  )
}

export default MainTable