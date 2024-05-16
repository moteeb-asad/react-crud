import React, { useEffect, useState, useContext } from 'react';
import { Container, Flex, Box } from '@chakra-ui/react';
import InputForm from '../components/InputForm';
import MainTable from '../components/MainTable';
import { DataContext } from '../context/DataProvider';

function Home() {
    const [tableData, setTableData] = useState([]);
    const { data, setData } = useContext(DataContext);

    useEffect(() => {
        const openDatabase = () => {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open('crudDB', 1);

                request.onerror = (event) => {
                    console.error('Database error:', event.target.errorCode);
                    reject(event.target.errorCode);
                };

                request.onsuccess = (event) => {
                    const db = event.target.result;
                    resolve(db);
                };

                request.onupgradeneeded = (event) => {
                    const db = event.target.result;
                    const objectStore = db.createObjectStore('records', { keyPath: 'id', autoIncrement: true });
                    objectStore.createIndex('title', 'title', { unique: false });
                    objectStore.createIndex('upvotes', 'upvotes', { unique: false });
                    objectStore.createIndex('date', 'date', { unique: false });
                };
            });
        };

        if (data) {
            openDatabase().then(db => {
                const transaction = db.transaction('records', 'readonly');
                const objectStore = transaction.objectStore('records');
                const allRecords = objectStore.getAll();
                allRecords.onsuccess = (event) => {
                    setTableData(event.target.result);
                };
            });
        }
    }, [data]);

    return (
        <>
            <Container maxW='8xl' color='white' padding={4} mt={50} mb={50}>
                <Flex gap={20}>
                    <Box flex="3" bg="#fff" pl={8} pr={8} pt={6} pb={6} className='form-box-wrap'>
                        <InputForm setTableData={setTableData}/>
                    </Box>
                    <Box flex="6">
                        <MainTable tableData={tableData} setTableData={setTableData} />
                    </Box>
                </Flex>
            </Container>
        </>
    );
}

export default Home;
