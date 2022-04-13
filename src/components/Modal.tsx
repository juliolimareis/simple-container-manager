import React, { ReactNode } from "react"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"

const ModalComponent = (
	props: {
		size?: string,
		title?: string,
		isOpen: boolean,
		body?: ReactNode,
		footer?: ReactNode,
		onClose(): void
	}): JSX.Element => (
  <Modal isOpen={props.isOpen} onClose={props.onClose} size={props.size}>
    <ModalOverlay />

    <ModalContent>
      <ModalHeader>{props.title}</ModalHeader>

      <ModalCloseButton />

      <ModalBody>
        {props.body}
      </ModalBody>

      <ModalFooter>
        {props.footer}
      </ModalFooter>

    </ModalContent>
  </Modal>
)
export default ModalComponent
