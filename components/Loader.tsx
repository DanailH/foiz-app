import React from 'react'
import {
  Modal,
  Spinner,
} from 'native-base';

export default function Loader({ isLoading }: any) {
  if (!isLoading) {
    return null;
  }
  
  return (
    <Modal isOpen={true}>
      <Modal.Content maxWidth="100" maxHeight="100" py="8">
        <Spinner accessibilityLabel="Loading" size="lg" />
      </Modal.Content>
    </Modal>
  )
}