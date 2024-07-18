import React, { useState } from "react";

//Original code
const APIForm = ({ inputs, handleChange, onSubmit }) => {
	const inputsInfo = [
		"Input an ID to a piece of media (e.g. a movie, TV show, etc.)",
	];
	return (
		<div className='max-w-screen-xl mx-auto px-8 text-center font-poppins'>
			<h2 className='text-2xl font-bold mb-4'>Enter the information:</h2>
			<form className='flex justify-between items-stretch relative p-4 flex-wrap'>
				{inputs &&
					Object.entries(inputs).map(([category, value], index) => (
						<li
							className='p-4 shadow-md m-1 rounded-lg bg-gray-300 w-72'
							key={index}
						>
							<div className='flex justify-between items-center mb-2'>
								<label className='text-xl font-bold mr-2'>{category}</label>
								<textarea
									type='text'
									name={category}
									value={value}
									placeholder='Input this attribute...'
									onChange={handleChange}
									className='font-poppins border-2 border-gray-300 p-2 w-full'
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
				Search
			</button>
		</div>
	);
};
export default APIForm;

// const APIForm = ({ onSubmit }) => {
// 	// State to manage an array of IDs
// 	const [inputs, setInputs] = useState([{ id: "" }]);

// 	// Function to handle input change
// 	const handleChange = (index, event) => {
// 		const newInputs = [...inputs];
// 		newInputs[index].id = event.target.value;
// 		setInputs(newInputs);
// 	};

// 	// Function to add a new input field
// 	const addInput = () => {
// 		setInputs([...inputs, { id: "" }]);
// 	};

// 	// Function to remove an input field
// 	const removeInput = (index) => {
// 		const newInputs = [...inputs];
// 		newInputs.splice(index, 1);
// 		setInputs(newInputs);
// 	};

// 	// Modified onSubmit to handle an array of inputs
// 	const handleSubmit = (event) => {
// 		event.preventDefault();
// 		onSubmit(inputs.map((input) => input.id));
// 	};

// 	return (
// 		<div className='max-w-screen-xl mx-auto px-8 text-center font-poppins'>
// 			<h2 className='text-2xl font-bold mb-4'>Enter the information:</h2>
// 			<form
// 				className='flex flex-col items-center relative p-4'
// 				onSubmit={handleSubmit}
// 			>
// 				{inputs.map((input, index) => (
// 					<div key={index} className='flex items-center mb-2'>
// 						<textarea
// 							type='text'
// 							name={`id-${index}`}
// 							value={input.id}
// 							placeholder='Input an ID...'
// 							onChange={(e) => handleChange(index, e)}
// 							className='font-poppins border-2 border-gray-300 p-2 mr-2'
// 						/>
// 						<button
// 							type='button'
// 							onClick={() => removeInput(index)}
// 							className='bg-red-500 text-white p-2'
// 						>
// 							Remove
// 						</button>
// 					</div>
// 				))}
// 				<button
// 					type='button'
// 					onClick={addInput}
// 					className='bg-blue-500 text-white p-2 mb-4'
// 				>
// 					Add Another ID
// 				</button>
// 				<button
// 					type='submit'
// 					className='text-white bg-black rounded-lg shadow-lg p-2'
// 				>
// 					Search
// 				</button>
// 			</form>
// 		</div>
// 	);
// };

// export default { APIForm };
