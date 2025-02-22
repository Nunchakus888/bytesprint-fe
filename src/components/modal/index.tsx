import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export default function ModalDialog(props: {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  buttonText?: string;
  onSure?: () => void;
  size?: string;
  btnGroup?: React.ReactNode;
  isLoading?: boolean;
  width?: string;
  closeOnOverlayClick?: boolean;
}) {
  const {
    isOpen,
    onClose,
    title,
    buttonText,
    onSure,
    children,
    size,
    btnGroup,
    isLoading,
    width,
    closeOnOverlayClick = true,
  } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size || '6xl'}
      isCentered={true}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <ModalOverlay />
      <ModalContent background="#0c1437" width={width}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {btnGroup ? (
            btnGroup
          ) : (
            <>
              <Button background="#7551FF" isLoading={isLoading} mr={3} onClick={onSure}>
                {buttonText || 'Sure'}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
