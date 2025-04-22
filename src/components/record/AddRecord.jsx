import { Formik, Form, Field } from "formik";
import {
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { endOfDay } from "date-fns";
import { openDatabase, getAllRecords } from "../../utils/dbUtils";
import { recordSchema } from "../../utils/formik/validationSchema";

function AddRecord({ onDataUpdate }) {
  const toast = useToast();

  return (
    <>
      <Text color="#000" pb={3}>
        Add Record
      </Text>
      <Formik
        initialValues={{ title: "", upvotes: "", date: "" }}
        validationSchema={recordSchema}
        onSubmit={(values, actions) => {
          openDatabase().then((db) => {
            const transaction = db.transaction("records", "readwrite");
            const objectStore = transaction.objectStore("records");
            const date = new Date(values.date);
            const endOfDayDate = endOfDay(date);
            const record = {
              id: uuidv4(),
              title: values.title,
              upvotes: values.upvotes,
              date: endOfDayDate.toISOString().split("T")[0],
            };
            const request = objectStore.add(record);

            request.onsuccess = () => {
              console.log("Record added successfully");
              actions.resetForm();

              // Fetch all records and update the data
              const fetchData = async () => {
                try {
                  const allRecords = await getAllRecords();
                  console.log("Fetched records:", allRecords);
                  onDataUpdate(allRecords);
                  toast({
                    title: "Success",
                    description: "Record added successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                } catch (error) {
                  console.error("Error fetching records:", error);
                  toast({
                    title: "Error",
                    description: "Failed to fetch records",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              };
              fetchData();
            };

            request.onerror = (event) => {
              console.error("Error adding record:", event.target.error);
              toast({
                title: "Error",
                description: "Failed to add record",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            };
          });
        }}
      >
        {(props) => (
          <Form>
            <Field name="title">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.title && form.touched.title}
                >
                  <Input {...field} placeholder="Enter title..." />
                  <FormErrorMessage mb={4} mt={0}>
                    {form.errors.title}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="upvotes">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.upvotes && form.touched.upvotes}
                >
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter number between 0 and 100..."
                  />
                  <FormErrorMessage mb={4} mt={0}>
                    {form.errors.upvotes}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="date">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.date && form.touched.date}>
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => form.setFieldValue("date", date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select date"
                    className="form-control date-input"
                  />
                  <FormErrorMessage mb={4} mt={0}>
                    {form.errors.date}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="green"
              isLoading={props.isSubmitting}
              type="submit"
              className="submit-btn"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddRecord;
