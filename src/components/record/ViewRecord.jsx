import React, { useState } from "react";
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
} from "@chakra-ui/react";

// Services
import { deleteRecord, getAllRecords } from "../../utils/dbUtils";

// Components
import SearchTable from "../../components/SearchTable";
import SortFilters from "../../components/SortFilters";
import ViewModal from "../../components/ViewModal";
import ConfirmationModal from "../../components/ConfirmationModal";

const ViewRecord = ({ tableData }) => {
  const toast = useToast();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState(null);

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

  const handleViewClick = (record) => {
    setSelectedRecord(record);
    onViewOpen();
  };

  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    onDeleteOpen();
  };

  const handleDeleteConfirm = async (id) => {
    try {
      // Delete the record
      await deleteRecord(id);

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
        tableData={tableData}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <SortFilters
        tableData={tableData}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className={tableData.length > 7 ? "scroll-container" : ""}>
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
              {tableData.map((item) => (
                <Tr key={item.id}>
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
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>

      {/* View Modal - View Record */}
      <ViewModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        selectedRecord={selectedRecord}
      />
      {/* Confirmation Modal - Delete Record */}
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        selectedRecord={selectedRecord}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default ViewRecord;
