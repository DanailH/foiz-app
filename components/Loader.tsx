import React from "react"
import {
	Modal,
	Spinner,
} from "native-base";

export default function Loader() {
	return (
		<>
			<Modal isOpen={true}>
				<Modal.Content maxWidth="100px" maxHeight="100px" py="8">
					<Spinner accessibilityLabel="Loading posts" size="lg" />
				</Modal.Content>
			</Modal>
		</>
	)
}