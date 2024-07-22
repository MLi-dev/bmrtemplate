import React, { useState } from "react";
function APIFormFile({ setSearchType, makeQuery }) {
	// State to store the file content
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	// Process file content (example usage)
	const handleSubmit = () => {
		console.log(file); // Example: log to console or send to an API
	};

	const submitForm = () => {
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const fileContent = e.target.result;
				const inputsArr = fileContent.split(",\n");
				console.log(inputsArr);
				setSearchType("byEidrId");
				for (let i = 0; i < inputsArr.length; i++) {
					makeQuery(inputsArr[i]);
				}
			};
			reader.readAsText(file);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center p-4 space-y-4 bg-gray-50 rounded-lg shadow mt-5'>
			<input
				type='file'
				accept='.txt'
				onChange={handleFileChange}
				className='file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-black-700
        file:text-sm file:font-semibold
        file:text-black-700
        hover:file:bg-blue-100 hover:file:cursor-pointer'
			/>
			<button
				type='submit'
				onClick={submitForm}
				className='text-white bg-black rounded-lg shadow-lg p-2 mt-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
			>
				Generate from File
			</button>
			{/* Display file content or process it as needed */}
		</div>
	);
}

export default APIFormFile;
