import React from "react";

const APIForm = ({ inputs, handleChange, onSubmit }) => {
	const inputsInfo = [
		"Input an ID to a piece of media (e.g. a movie, TV show, etc.)",
	];
	return (
		<div className='max-w-screen-xl mx-auto px-8 text-center font-poppins'>
			<h2 className='text-2xl font-bold mb-10'>Enter the information:</h2>
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
				onClick={onSubmit}
			>
				Generate
			</button>
		</div>
	);
};
export default APIForm;
