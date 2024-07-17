import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import template from "../assets/edittemplate.json";

const getDataRow = (xmlDoc, dataKeys) => {
	const elements = xmlDoc.getElementsByTagName("BaseObjectData");
	let row = [];
	const excelToXMLMap = {
		"Parent EIDR/Row ID": "ID",
		"Structural Type": "StructuralType",
		"Referent Type": "ReferentType",
		Title: "ResourceName",
		"Release Date": "ReleaseDate",
		"Approximate Length": "ApproximateLength",
		"Actor 1:": "Actor",
		"Actor 2:": "Actor",
		"Actor 3:": "Actor",
		"Actor 4:": "Actor",
		"Director 1": "Director",
		"Director 2": "Director",
	};
	if (elements.length > 0) {
		const baseObjectData = elements[0]; // Assuming we're only interested in the first BaseObjectData element

		dataKeys.forEach((key) => {
			const foundElements = baseObjectData.getElementsByTagName(
				excelToXMLMap[key] || key
			);
			console.log(key);
			let value = "";
			if (key === "Director 1") {
				value = baseObjectData
					.getElementsByTagName("Director")[0]
					.getElementsByTagName("md:DisplayName")[0].textContent;
				row.push(value);
			} else if (key === "Director 2") {
				value = baseObjectData
					.getElementsByTagName("Director")[1]
					?.getElementsByTagName("md:DisplayName")[0].textContent;
				row.push(value);
			} else if (key === "Actor 1") {
				value = baseObjectData
					.getElementsByTagName("Actor")[0]
					.getElementsByTagName("md:DisplayName")[0].textContent;
				row.push(value);
			} else if (key === "Actor 2") {
				value = baseObjectData
					.getElementsByTagName("Actor")[1]
					.getElementsByTagName("md:DisplayName")[0].textContent;
				row.push(value);
			} else if (key === "Actor 3") {
				value = baseObjectData
					.getElementsByTagName("Actor")[2]
					.getElementsByTagName("md:DisplayName")[0].textContent;
				row.push(value);
			} else if (key === "Actor 4") {
				value = baseObjectData
					.getElementsByTagName("Actor")[3]
					.getElementsByTagName("md:DisplayName")[0].textContent;
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

const EditTemplate = ({ xml }) => {
	const generateExcelFromEditTemplate = () => {
		// Prepare Excel data
		console.log(xml);
		const rows = [];
		rows.push(["version:", "22"]); // Assuming version is static as per the requirement
		const metadataKeys = Object.keys(template.metadata);
		const metadataRequired = metadataKeys.map((key) => {
			if (template.metadata[key].required === "TBD") {
				return "TBD";
			}
			return template.metadata[key].required ? "required" : "optional";
		});
		// rows.push(metadataKeys); // Third row: keys from metadata
		rows.push(metadataRequired); // Second row: required or optional

		// Data keys and their values
		const dataKeys = Object.keys(template.data);
		const dataValues = dataKeys.map((key) => template.data[key] || ""); // Replace null with 'null' string
		rows.push(dataKeys); // Third row: keys from data
		rows.push(getDataRow(xml, dataKeys)); // Fourth row: values from data

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
	};

	// Example usage with a button click
	const handleButtonClick = () => {
		const templateData = {
			metadata: {
				"Edit Class 1": { required: true },
				// Add the rest of your metadata here
			},
			data: {
				"Unique Row ID": null,
				// Add the rest of your data here
			},
		};

		generateExcelFromEditTemplate(templateData);
	};

	return (
		<div>
			<button onClick={handleButtonClick}>Generate Excel</button>
		</div>
	);
};

export default EditTemplate;
