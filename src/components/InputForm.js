import React, {useContext} from 'react'
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Text,
  useToast
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../context/DataProvider';
import { endOfDay } from 'date-fns';

function InputForm({setTableData}) {
  const toast = useToast();
  const { data, setData } = useContext(DataContext);

  function validateTitle(value) {
    let error
    if (!value) {
      error = 'Title is required'
    } else if (typeof value !== 'string') {
      error = 'Title must be a string'
    } 
    return error
  }

  function validateUpvotes(value) {
    let error;
    if (!value) {
      error = 'Upvotes is required';
    } else if (isNaN(value) || value < 0 || value > 100) {
      error = 'Upvotes must be a number between 0 and 100';
    }
    return error;
  }

  function validateDate(value) {
    let error;
    if (!value) {
      error = 'Date is required';
    }
    return error;
  }


  function openDatabase() {
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
  }
  


  return (

    <>

    <Text color="#000" pb={3}>Add Record</Text>
    <Formik
      initialValues={{ title: '', upvotes: '', date: '' }}
      onSubmit={(values, actions) => {
        openDatabase().then(db => {
            const transaction = db.transaction('records', 'readwrite');
            const objectStore = transaction.objectStore('records');
            const date = new Date(values.date);
            const endOfDayDate = endOfDay(date); // Set the time to the end of the day
            const record = {
                id: uuidv4(),
                title: values.title,
                upvotes: values.upvotes,
                date: endOfDayDate.toISOString().split('T')[0]
            };
            const request = objectStore.add(record);
    
            request.onsuccess = () => {
                console.log('Record added successfully');
                actions.resetForm(); // Reset the form after submission
    
                // Fetch all records and update the context's data state
                const fetchData = async () => {
                    const allRecords = await new Promise((resolve, reject) => {
                        const getDataRequest = objectStore.getAll();
    
                        getDataRequest.onsuccess = () => {
                            resolve(getDataRequest.result);
                        };
    
                        getDataRequest.onerror = (event) => {
                            reject(event.target.error);
                        };
                    });
    
                    console.log("Test", allRecords);
                    setData(allRecords);
                    setTableData(allRecords);
                };
                fetchData();
            };
    
            request.onerror = (event) => {
                console.error('Error adding record:', event.target.error);
            };
        });
    }}
    
      validateOnChange={false}
    >
      {(props) => (
      <Form>
        <Field name='title' validate={validateTitle} pb={8}>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.title && form.touched.title}>
              <Input {...field} placeholder='Enter title...' />
              <FormErrorMessage mb={4} mt={0}>{form.errors.title}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name='upvotes' validate={validateUpvotes}>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.upvotes && form.touched.upvotes}>
              <Input {...field} placeholder='Enter upvotes number between 0 and 100...' type='number'/>
              <FormErrorMessage mb={4} mt={0}>{form.errors.upvotes}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name='date' validate={validateDate}>
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.date && form.touched.date}>
              <DatePicker placeholderText="Enter Date..." className='date-input' {...field} selected={field.value} onChange={(val) => form.setFieldValue(field.name, val)} />
              <FormErrorMessage mb={4} mt={0}>{form.errors.date}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Button
          className='submit-btn'
          bg='#00a233'
          color='#fff'
          isLoading={props.isSubmitting}
          type='submit'
          disabled={!props.isValidating && !props.dirty}
        >
          Add Data
        </Button>
      </Form>
      )}
    </Formik>

    </>
  )
}

export default InputForm
