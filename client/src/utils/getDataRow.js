import excelToXMLMap from "../components/ExcelToXMLMap.js";
const getDataRow = (xmlDoc, dataKeys, idx) => {
	const baseElements = xmlDoc.getElementsByTagName("SelfDefinedMetadata");
	let row = [];
	if (baseElements.length > 0) {
		const baseObjectData = baseElements[0]; // Assuming we're only interested in the first BaseObjectData element

		dataKeys.forEach((key) => {
			const foundElements = baseObjectData.getElementsByTagName(
				excelToXMLMap[key] || key
			);
			let value = "";
			if (key === "Unique Row ID") {
				row.push(idx + 1);
			} else if (key === "Director 1") {
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
			} else if (key === "Made for Region 1") {
				value =
					baseObjectData.getElementsByTagName("MadeForRegion").length > 0
						? baseObjectData.getElementsByTagName("MadeForRegion")[0]
								.textContent
						: "";
				row.push(value);
			} else if (key === "Made for Region 2") {
				value =
					baseObjectData.getElementsByTagName("MadeForRegion").length > 1
						? baseObjectData.getElementsByTagName("MadeForRegion")[1]
								.textContent
						: "";
				row.push(value);
			} else if (key === "Made for Region 3") {
				value =
					baseObjectData.getElementsByTagName("MadeForRegion").length > 2
						? baseObjectData.getElementsByTagName("MadeForRegion")[2]
								.textContent
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
export default getDataRow;
