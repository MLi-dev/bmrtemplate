import React from "react";

const APIForm = ({ inputs, handleChange, onSubmit }) => {
	const inputsInfo = [
		"Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
		"Input eidr id here",
		"Input true or false if you would like your website screenshot to not contain any ads",
		"Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
		"Choose the width of your screenshot (in pixels)",
		"Choose the height of your screenshot (in pixels)",
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
								<input
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
