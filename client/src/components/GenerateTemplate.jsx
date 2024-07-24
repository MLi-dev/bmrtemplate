import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import generateExcel from "../utils/generateExcel";

const handleButtonClick = (type, xmlArray, templateFormat) => {
	generateExcel(type, xmlArray, templateFormat);
};

const GenerateTemplate = ({ xmlArray, buttonName, templateFormat }) => {
	return (
		<div className='relative flex items-center'>
			<button
				onClick={() => handleButtonClick(buttonName, xmlArray, templateFormat)}
				className='group'
			>
				<FontAwesomeIcon
					icon={faDownload}
					className='text-gray-500 hover:text-gray-700'
				/>
				<span className='absolute left-1/2 transform -translate-x-1/2 -bottom-8 w-auto p-2 bg-black text-white text-xs rounded-md scale-0 group-hover:scale-100 transition-transform duration-150 ease-in-out'>
					Generate {buttonName}
				</span>
			</button>
		</div>
	);
};

export default GenerateTemplate;
