// React
import React, { useState, useContext } from "react";

// Chakra UI
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
  useDisclosure,
  useToast,
  Text,
  Input,
} from "@chakra-ui/react";

// Utils
import { deleteRecord, getAllRecords, updateRecord } from "../../utils/dbUtils";
import { DataContext } from "../../context/DataProvider";

// Components
import SearchTable from "../SearchTable";
import SortFilters from "../SortFilters";
import ConfirmationModal from "../ConfirmationModal";
import ViewModal from "../ViewModal";

// Types
import { Record } from "../../types";

const ViewRecord: React.FC = () => {
  const toast = useToast();
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const { data, setData } = useContext(DataContext);
  const [editRecord, setEditRecord] = useState<Record | null>(null);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();

  const handleViewClick = (record: Record) => {
    setSelectedRecord(record);
    onViewOpen();
  };

  const handleEditClick = (record: Record) => {
    setEditRecord(record);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditRecord((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : null
    );
  };

  const handleSaveClick = async () => {
    try {
      if (!editRecord) return;

      await updateRecord(editRecord);
      const updatedRecords = await getAllRecords();
      setData(updatedRecords);
      setEditRecord(null);

      toast({
        title: "Success",
        description: "Record updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error saving record:", error);
      toast({
        title: "Error",
        description: "Failed to save record",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = (record: Record) => {
    setSelectedRecord(record);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async (id: number) => {
    try {
      await deleteRecord(id);
      const updatedRecords = await getAllRecords();
      setData(updatedRecords);

      toast({
        title: "Success",
        description: "Record deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose();
    } catch (error) {
      console.error("Error deleting record:", error);
      toast({
        title: "Error",
        description: "Failed to delete record",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <SearchTable
        data={data}
        setData={setData}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <SortFilters sortBy={sortBy} setSortBy={setSortBy} />

      <div className={data.length > 7 ? "scroll-container" : ""}>
        <TableContainer bg={"white"}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Upvotes</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length === 0 ? (
                <Tr>
                  <Td colSpan={4} textAlign="center">
                    <Text>No records found</Text>
                  </Td>
                </Tr>
              ) : (
                data.map((item: Record) => (
                  <Tr key={item.id}>
                    {editRecord && editRecord.id === item.id ? (
                      <>
                        <Td>
                          <Input
                            type="text"
                            name="title"
                            value={editRecord.title}
                            onChange={handleInputChange}
                          />
                        </Td>
                        <Td>
                          <Input
                            type="number"
                            name="upvotes"
                            value={editRecord.upvotes}
                            onChange={handleInputChange}
                          />
                        </Td>
                        <Td>
                          <Input
                            type="date"
                            name="date"
                            value={editRecord.date}
                            onChange={handleInputChange}
                          />
                        </Td>
                        <Td>
                          <Flex gap={2}>
                            <Button
                              bg="#007ea6"
                              color="#fff"
                              size="sm"
                              onClick={handleSaveClick}
                            >
                              Save
                            </Button>
                            <Button
                              bg="#a81502"
                              color="#fff"
                              size="sm"
                              onClick={() => setEditRecord(null)}
                            >
                              Cancel
                            </Button>
                          </Flex>
                        </Td>
                      </>
                    ) : (
                      <>
                        <Td>{item.title}</Td>
                        <Td>{item.upvotes}</Td>
                        <Td>{item.date}</Td>
                        <Td>
                          <Flex gap={2}>
                            <Button
                              bg="#00a233"
                              color="#fff"
                              size="sm"
                              onClick={() => handleViewClick(item)}
                            >
                              View
                            </Button>
                            <Button
                              bg="#007ea6"
                              color="#fff"
                              size="sm"
                              onClick={() => handleEditClick(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              bg="#a81502"
                              color="#fff"
                              size="sm"
                              onClick={() => handleDeleteClick(item)}
                            >
                              Delete
                            </Button>
                          </Flex>
                        </Td>
                      </>
                    )}
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      <ViewModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        selectedRecord={selectedRecord as Record}
      />
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        selectedRecord={selectedRecord as Record}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default ViewRecord;
