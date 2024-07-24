import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import LoadingModal from "./LoadingModal"; // Import the LoadingModal component

function GenerateFileInput({ setSearchType, makeQuery, onLoading }) {
	// State to store the file content
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const submitForm = () => {
		if (file) {
			onLoading(true); // Show loading modal
			const reader = new FileReader();
			reader.onload = (e) => {
				const fileContent = e.target.result;
				const inputsArr = fileContent.split("\n");
				setSearchType("byEidrId");
				const jobs = [];
				const jobsSize = inputsArr.length / 1000;
				for (let i = 0; i < jobsSize; i++) {
					jobs.push(inputsArr.slice(i * 1000, (i + 1) * 1000));
				}
				jobs.forEach((job, index) => {
					setTimeout(() => {
						for (let i = 0; i < job.length; i++) {
							makeQuery(job[i]);
						}
						if (index === jobs.length - 1) {
							onLoading(false); // Hide loading modal when all jobs are done
						}
					}, index * 25000); // Delay each call by 20000 ms more than the previous one
				});
			};
			reader.readAsText(file);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center'>
			<label className='text-xl font-bold mr-2 bg-gray-300 text-lg rounded-lg mb-2 mt-5'>
				Upload a file
			</label>
			<div className='flex items-center bg-white py-2 shadow-md rounded-lg'>
				<input
					type='file'
					accept='.txt'
					onChange={handleFileChange}
					className='file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border file:border-white
    file:text-sm file:font-semibold
    file:text-black-700
    hover:file:bg-blue-100 hover:file:cursor-pointer'
				/>
			</div>
			<button
				type='submit'
				onClick={submitForm}
				className='text-white bg-black rounded-lg shadow-lg p-2 mt-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
			>
				Generate from File
			</button>
			{/* Render LoadingModal */}
		</div>
	);
}

export default GenerateFileInput;
