import React, { useState } from "react";
import LoadingModal from "./LoadingModal";

const APIForm = ({ inputs, handleChange, setSearchType, makeQuery }) => {
	const inputsInfo = [
		"Input an ID to a piece of media (e.g. a movie, TV show, etc.)",
	];
	const [loading, setLoading] = useState(false);
	const submitForm = () => {
		setLoading(true);
		console.log("Loading!", loading);
		const inputsArr = inputs?.eidr_id?.split(",\n");
		setSearchType("byEidrId");
		const jobs = [];
		const jobsSize = inputsArr.length / 1000;
		for (let i = 0; i < jobsSize; i++) {
			jobs.push(inputsArr.slice(i * 1000, (i + 1) * 1000));
		}
		let completedJobs = 0;
		jobs.forEach((job, index) => {
			setTimeout(() => {
				for (let i = 0; i < job.length; i++) {
					makeQuery(job[i]);
				}
				completedJobs++;
				if (completedJobs === jobs.length) {
					setLoading(false); // Hide loading modal when all jobs are done
				}
			}, index * 20000); // Delay each call by 20000 ms more than the previous one
		});
		console.log("Not Loading Anymore!", loading);
	};
	return (
		<div className='max-w-screen-xl mx-auto px-8 text-center font-poppins'>
			<form className='flex justify-between items-stretch relative p-4 flex-wrap'>
				{inputs &&
					Object.entries(inputs).map(([category, value], index) => (
						<li
							className='shadow-md m-1 rounded-lg bg-gray-300 w-96'
							key={index}
						>
							<div>
								<label className='text-xl font-bold mr-2'>{category}</label>
								<textarea
									type='text'
									name={category}
									value={value}
									placeholder='Input this attribute...'
									onChange={handleChange}
									className='font-poppins border-2 border-gray-300 p-2 h-96 w-96'
								/>
							</div>
							<p className='text-sm text-black'>{inputsInfo[index]}</p>
						</li>
					))}
			</form>
			<button
				type='submit'
				className='text-white bg-black rounded-lg shadow-lg p-2 mt-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
				onClick={submitForm}
			>
				Generate From Text Input
			</button>
			{loading && <LoadingModal modalIsOpen={loading} />}
		</div>
	);
};
export default APIForm;
