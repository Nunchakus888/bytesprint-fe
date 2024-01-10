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
}) {
  const { isOpen, onClose, title, buttonText, onSure, children, size, btnGroup, isLoading } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size || '6xl'}>
      <ModalOverlay />
      <ModalContent background="#0C1437">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {btnGroup ? (
            btnGroup
          ) : (
            <>
              <Button background="#7551FF" isLoading={isLoading} mr={3} onClick={onSure}>
                {buttonText || '确定'}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                取消
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
