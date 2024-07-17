import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import editTemplateFormat from "../assets/edittemplate.json";
import episodicTemplate from "../assets/episodictemplate.json";
import nonepisodicTemplate from "../assets/nonepisodictemplate.json";
import excelToXMLMap from "./ExcelToXMLMap";

const getDataRow = (xmlDoc, dataKeys) => {
	const baseElements = xmlDoc.getElementsByTagName("SelfDefinedMetadata");
	let row = [];
	if (baseElements.length > 0) {
		const baseObjectData = baseElements[0]; // Assuming we're only interested in the first BaseObjectData element

		dataKeys.forEach((key) => {
			const foundElements = baseObjectData.getElementsByTagName(
				excelToXMLMap[key] || key
			);
			let value = "";
			if (key === "Director 1") {
				value =
					baseObjectData.getElementsByTagName("Director").length > 0
						? baseObjectData
								.getElementsByTagName("Director")[0]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Director 2") {
				value =
					baseObjectData.getElementsByTagName("Director").length > 1
						? baseObjectData
								.getElementsByTagName("Director")[1]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Actor 1") {
				value =
					baseObjectData.getElementsByTagName("Actor").length > 0
						? baseObjectData
								.getElementsByTagName("Actor")[0]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Actor 2") {
				value =
					baseObjectData.getElementsByTagName("Actor").length > 1
						? baseObjectData
								.getElementsByTagName("Actor")[1]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Actor 3") {
				value =
					baseObjectData.getElementsByTagName("Actor").length > 2
						? baseObjectData
								.getElementsByTagName("Actor")[2]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Actor 4") {
				value =
					baseObjectData.getElementsByTagName("Actor").length > 3
						? baseObjectData
								.getElementsByTagName("Actor")[3]
								.getElementsByTagName("md:DisplayName")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Edit Class 1") {
				value =
					baseObjectData.getElementsByTagName("EditClass").length > 0
						? baseObjectData.getElementsByTagName("EditClass")[0].textContent
						: "";
				row.push(value);
			} else if (key === "Edit Class 2") {
				value =
					baseObjectData.getElementsByTagName("EditClass").length > 1
						? baseObjectData.getElementsByTagName("EditClass")[1].textContent
						: "";
				row.push(value);
			} else if (key === "Edit Class 3") {
				value =
					baseObjectData.getElementsByTagName("EditClass").length > 2
						? baseObjectData.getElementsByTagName("EditClass")[2].textContent
						: "";
				row.push(value);
			} else {
				if (foundElements.length > 0) {
					// Assuming we only care about the first found element for each key

					// console.log(excelToXMLMap[key]);
					value = foundElements[0].textContent || "";
					row.push(value);
				} else {
					row.push(""); // Push an empty string if the element was not found
				}
			}
		});
	}
	return row;
};

const EditTemplate = ({ xmlArray, buttonName }) => {
	const generateExcelFromEditTemplate = (type) => {
		// Prepare Excel data
		const rows = [];
		rows.push(["version:", "22"]); // Assuming version is static as per the requirement
		if (type === "Edit") {
			const metadataKeys = Object.keys(editTemplateFormat.metadata);
			const metadataRequired = metadataKeys.map((key) => {
				if (editTemplateFormat.metadata[key].required === "TBD") {
					return "TBD";
				}
				return editTemplateFormat.metadata[key].required
					? "required"
					: "optional";
			});
			// rows.push(metadataKeys); // Third row: keys from metadata
			rows.push(metadataRequired); // Second row: required or optional

			// Data keys and their values
			const dataKeys = Object.keys(editTemplateFormat.data);
			const dataValues = dataKeys.map(
				(key) => editTemplateFormat.data[key] || ""
			); // Replace null with 'null' string
			rows.push(dataKeys); // Third row: keys from data
			xmlArray.forEach((xml) => {
				rows.push(getDataRow(xml, dataKeys)); // Fourth row: values from data
			});
			// Generate Excel file
			const wb = XLSX.utils.book_new();
			const ws = XLSX.utils.aoa_to_sheet(rows);
			XLSX.utils.book_append_sheet(wb, ws, "Edits"); // Set sheet name to "Edits"
			const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
			function s2ab(s) {
				const buf = new ArrayBuffer(s.length);
				const view = new Uint8Array(buf);
				for (let i = 0; i < s.length; i++) {
					view[i] = s.charCodeAt(i) & 0xff;
				}
				return buf;
			}

			// Save to file
			saveAs(
				new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
				"editTemplate.xlsx"
			);
		} else if (type === "Episodic") {
			const metadataKeys = Object.keys(episodicTemplate.metadata);
			const metadataRequired = metadataKeys.map((key) => {
				if (episodicTemplate.metadata[key].required === "TBD") {
					return "TBD";
				}
				return episodicTemplate.metadata[key].required
					? "required"
					: "optional";
			});
			// rows.push(metadataKeys); // Third row: keys from metadata
			rows.push(metadataRequired); // Second row: required or optional

			// Data keys and their values
			const dataKeys = Object.keys(episodicTemplate.data);
			const dataValues = dataKeys.map(
				(key) => episodicTemplate.data[key] || ""
			); // Replace null with 'null' string
			rows.push(dataKeys); // Third row: keys from data
			xmlArray.forEach((xml) => {
				rows.push(getDataRow(xml, dataKeys)); // Fourth row: values from data
			});
			// Generate Excel file
			const wb = XLSX.utils.book_new();
			const ws = XLSX.utils.aoa_to_sheet(rows);
			XLSX.utils.book_append_sheet(wb, ws, "Episodic"); // Set sheet name to "Episodic"
			const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
			function s2ab(s) {
				const buf = new ArrayBuffer(s.length);
				const view = new Uint8Array(buf);
				for (let i = 0; i < s.length; i++) {
					view[i] = s.charCodeAt(i) & 0xff;
				}
				return buf;
			}

			// Save to file
			saveAs(
				new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
				"Episodic.xlsx"
			);
		} else if (type === "NonEpisodic") {
			const metadataKeys = Object.keys(nonepisodicTemplate.metadata);
			const metadataRequired = metadataKeys.map((key) => {
				if (nonepisodicTemplate.metadata[key].required === "TBD") {
					return "TBD";
				}
				return nonepisodicTemplate.metadata[key].required
					? "required"
					: "optional";
			});
			// rows.push(metadataKeys); // Third row: keys from metadata
			rows.push(metadataRequired); // Second row: required or optional

			// Data keys and their values
			const dataKeys = Object.keys(nonepisodicTemplate.data);
			const dataValues = dataKeys.map(
				(key) => nonepisodicTemplate.data[key] || ""
			); // Replace null with 'null' string
			rows.push(dataKeys); // Third row: keys from data
			xmlArray.forEach((xml) => {
				rows.push(getDataRow(xml, dataKeys)); // Fourth row: values from data
			});
			// Generate Excel file
			const wb = XLSX.utils.book_new();
			const ws = XLSX.utils.aoa_to_sheet(rows);
			XLSX.utils.book_append_sheet(wb, ws, "NonEpisodic"); // Set sheet name to "Episodic"
			const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
			function s2ab(s) {
				const buf = new ArrayBuffer(s.length);
				const view = new Uint8Array(buf);
				for (let i = 0; i < s.length; i++) {
					view[i] = s.charCodeAt(i) & 0xff;
				}
				return buf;
			}

			// Save to file
			saveAs(
				new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
				"NonEpisodic.xlsx"
			);
		}
	};

	// Example usage with a button click
	const handleButtonClick = (type) => {
		generateExcelFromEditTemplate(type);
	};

	return (
		<div>
			<button
				className='text-white bg-black rounded-lg shadow-lg p-2 mt-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
				onClick={() => handleButtonClick(buttonName)}
			>
				Generate {buttonName} Excel
			</button>
		</div>
	);
};

export default EditTemplate;
