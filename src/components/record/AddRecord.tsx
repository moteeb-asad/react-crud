// React
import React, { useContext } from "react";

// Chakra UI
import {
  FormControl,
  Input,
  Button,
  useToast,
  Box,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";

// Third party libraries
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "../../styles/datePicker.css";
import { Formik, Form, Field } from "formik";

// Context
import { DataContext } from "../../context/DataProvider";

// Assets
import { FaCalendarAlt } from "react-icons/fa";

// Utils
import { addRecordSchema } from "../../utils/formik/validationSchema";
import { formatDate } from "../../utils/date";
import { openDatabase } from "../../utils/dbUtils";

// Types
import { FormData } from "../../types";

const AddRecord: React.FC = () => {
  const toast = useToast();
  const { setData } = useContext(DataContext);

  const handleSubmit = async (values: FormData, { resetForm }: any) => {
    try {
      // Open database
      const db = await openDatabase();
      const transaction = db.transaction("records", "readwrite");
      const objectStore = transaction.objectStore("records");

      // Add record to database
      await new Promise<void>((resolve, reject) => {
        const request = objectStore.add({
          title: values.title,
          upvotes: parseInt(values.upvotes),
          date: values.date ? formatDate(new Date(values.date)) : "",
        });

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Fetch updated records
      const updatedTransaction = db.transaction("records", "readonly");
      const updatedObjectStore = updatedTransaction.objectStore("records");
      const updatedRequest = updatedObjectStore.getAll();

      // Update the data context
      updatedRequest.onsuccess = () => {
        setData(updatedRequest.result);
      };

      // Reset form
      resetForm();

      toast({
        title: "Success",
        description: "Record added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding record:", error);
      toast({
        title: "Error",
        description: "Failed to add record",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Text fontSize="16px" mb={4} color="black">
        Add Record
      </Text>
      <Formik
        initialValues={{
          title: "",
          upvotes: "",
          date: "",
        }}
        validationSchema={addRecordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <FormControl isInvalid={Boolean(errors.title && touched.title)}>
              <Field
                as={Input}
                name="title"
                placeholder="Enter Title"
                type="text"
                mb={errors.title ? "0" : "4"}
              />
              <FormErrorMessage mb={4}>{errors.title}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.upvotes && touched.upvotes)}>
              <Field
                as={Input}
                name="upvotes"
                placeholder="Enter upvotes number between 0 and 100"
                type="number"
                mb={errors.upvotes && touched.upvotes ? "0" : "4"}
              />
              <FormErrorMessage mb={4}>{errors.upvotes}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={Boolean(errors.date && touched.date)}
              mb={errors.date && touched.date ? "0" : "4"}
            >
              <DatePicker
                onChange={(date: any) => setFieldValue("date", date)}
                value={values.date}
                format="y-MM-dd"
                clearIcon={null}
                calendarIcon={<FaCalendarAlt />}
                className={`custom-date-picker ${
                  errors.date && touched.date ? "is-invalid" : ""
                }`}
              />
              <FormErrorMessage mb={4}>{errors.date}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="#00a233"
              bg="#00a233"
              width="100%"
              height="48px"
            >
              Add Data
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddRecord;
