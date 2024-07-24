import editTemplateFormat from "../assets/edittemplate.json";
import episodicTemplate from "../assets/episodictemplate.json";
import nonepisodicTemplate from "../assets/nonepisodictemplate.json";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import unknowntemplate from "../assets/unknowntemplate.json";
import getDataRow from "./getDataRow.js";
const generateExcel = (type, xmlArray, templateFormat) => {
	// Prepare Excel data
	const rows = [];
	rows.push(["version:", "22"]); // Assuming version is static as per the requirement
	const metadataKeys = Object.keys(templateFormat.metadata);
	const metadataRequired = metadataKeys.map((key) => {
		if (templateFormat.metadata[key].required === "TBD") {
			return "TBD";
		}
		return templateFormat.metadata[key].required ? "required" : "optional";
	});
	// rows.push(metadataKeys); // Third row: keys from metadata
	rows.push(metadataRequired); // Second row: required or optional

	// Data keys and their values
	const dataKeys = Object.keys(templateFormat.data);
	const dataValues = dataKeys.map((key) => templateFormat.data[key] || ""); // Replace null with 'null' string
	rows.push(dataKeys); // Third row: keys from data
	xmlArray.forEach((xml, idx) => {
		rows.push(getDataRow(xml, dataKeys, idx)); // Fourth row: values from data
	});
	// Generate Excel file
	const wb = XLSX.utils.book_new();
	const ws = XLSX.utils.aoa_to_sheet(rows);
	XLSX.utils.book_append_sheet(wb, ws, `${type}`); // Set sheet name to "Edits"
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
		`${type}Template.xlsx`
	);
};

export default generateExcel;
