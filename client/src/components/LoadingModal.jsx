import ReactModal from "react-modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingModal = (modalOpen) => {
	return (
		<ReactModal
			isOpen={modalOpen}
			contentLabel='Loading Modal'
			ariaHideApp={false}
			style={{
				overlay: {
					backgroundColor: "rgba(0, 0, 0, 0.5)",
				},
				content: {
					top: "50%",
					left: "50%",
					right: "auto",
					bottom: "auto",
					marginRight: "-50%",
					transform: "translate(-50%, -50%)",
					background: "white",
					border: "1px solid #ccc",
					padding: "20px",
					borderRadius: "8px",
					textAlign: "center",
				},
			}}
		>
			<FontAwesomeIcon icon={faSpinner} size='3x' spin />
			<p>Files processing, do not close browser</p>
		</ReactModal>
	);
};

export default LoadingModal;
