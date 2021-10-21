import React from "react"
import {
    Modal,
    Spinner,
} from "native-base";

export default function Loader() {
    return (
        <>
            <Modal isOpen={true}>
                <Modal.Content maxWidth="200px" maxHeight="200px" py="16">
                    <Spinner accessibilityLabel="Loading posts" size="sm" />
                </Modal.Content>
            </Modal>
        </>
    )
}