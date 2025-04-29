// Chakra UI
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

// Types
import { Record } from "../types";

const ViewModal = ({
  isOpen,
  onClose,
  selectedRecord,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedRecord: Record;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewModal;
