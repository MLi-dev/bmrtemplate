import { useState } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";
import QueryResult from "./components/QueryResult";
import ResolutionResult from "./components/ResolutionResult";
import fs from "fs";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const App = () => {
	const [inputs, setInputs] = useState({
		title: "",
		eidr_id: "",
	});
	const [currentImage, setCurrentImage] = useState(null);
	const [prevImages, setPrevImages] = useState([]);
	const [response, setResponse] = useState({});
	const [searchType, setSearchType] = useState("");

	const callAPI = async (query, requestOptions) => {
		const response = await fetch(query, requestOptions);
		const text = await response.text(); // Changed from json() to text() to handle XML
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(text, "application/xml");
		console.log(xmlDoc);
		const rows = [];
		const elements = xmlDoc.getElementsByTagName("BaseObjectData"); // Assuming main data is under BaseObjectData

		for (let element of elements) {
			const row = {
				ID: element.getElementsByTagName("ID")[0].textContent,
				StructuralType:
					element.getElementsByTagName("StructuralType")[0].textContent,
				Mode: element.getElementsByTagName("Mode")[0].textContent,
				ReferentType:
					element.getElementsByTagName("ReferentType")[0].textContent,
				ResourceName:
					element.getElementsByTagName("ResourceName")[0].textContent,
				TitleClass: element
					.getElementsByTagName("ResourceName")[0]
					.getAttribute("titleClass"),
				ReleaseDate: element.getElementsByTagName("ReleaseDate")[0].textContent,
				Status: element.getElementsByTagName("Status")[0].textContent,
				ApproximateLength:
					element.getElementsByTagName("ApproximateLength")[0].textContent,
				Registrant: element.getElementsByTagName("Registrant")[0].textContent,
				Director: element
					.getElementsByTagName("Director")[0]
					.getElementsByTagName("md:DisplayName")[0].textContent,
				Actor1: element
					.getElementsByTagName("Actor")[0]
					.getElementsByTagName("md:DisplayName")[0].textContent,
				Actor2: element
					.getElementsByTagName("Actor")[1]
					.getElementsByTagName("md:DisplayName")[0].textContent,
				Actor3: element
					.getElementsByTagName("Actor")[2]
					.getElementsByTagName("md:DisplayName")[0].textContent,
				Actor4: element
					.getElementsByTagName("Actor")[3]
					.getElementsByTagName("md:DisplayName")[0].textContent,
			};
			rows.push(row);
		}

		// Convert rows to CSV
		const csvHeaders = Object.keys(rows[0]).join(",") + "\n";
		const csvRows = rows.map((row) => Object.values(row).join(",")).join("\n");
		const csvContent = csvHeaders + csvRows;

		// Create a Blob from the CSV content
		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);

		// Create a link and trigger a download
		const a = document.createElement("a");
		a.href = url;
		a.download = "data.csv"; // Specify the file name
		document.body.appendChild(a); // Append the link to the document
		a.click(); // Simulate a click on the link

		// Clean up
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		// Assuming the server response has a root element <response>
		// const json = Array.from(xmlDoc.getElementsByTagName("response")).map(
		// 	(node) => ({
		// 		url: node.getElementsByTagName("url")[0]?.textContent, // Example of extracting data
		// 		// Add other fields as needed
		// 	})
		// )[0]; // Simplified conversion to JSON, adjust according to actual XML structure

		// if (json.url === null) {
		// 	alert("Oops! Something went wrong with that query, let's try again!");
		// } else {
		// 	setResponse(json);
		// }
	};

	const makeQuery = () => {
		let requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		};
		//let query = `https://cors-anywhere.herokuapp.com/https://proxy.eidr.org/resolve/${inputs.eidr_id}?type=Full&followAlias=false`;
		let query = "";
		if (searchType === "byQuery") {
			query = `http://localhost:3001/api/query`;
			requestOptions = {
				...requestOptions,
				body: JSON.stringify({ title: { words: inputs.title } }),
			};
		} else {
			query = `http://localhost:3001/api/resolve`;
			requestOptions = {
				...requestOptions,
				body: JSON.stringify({ eidr_id: inputs.eidr_id }),
			};
		}
		callAPI(query, requestOptions).catch(console.error);
	};
	const reset = () => {
		setInputs({
			title: "",
			eidr_id: "",
		});
	};
	const submitForm = () => {
		let defaultValues = {
			title: "Seinfeld",
			eidr_id: "10.5240/301C-0DFA-B184-5448-BB3E-I",
		};
		// for (const [key, value] of Object.entries(inputs)) {
		// 	if (value === "") {
		// 		inputs[key] = defaultValues[key];
		// 	}
		// }
		if (inputs.title === "" || inputs.title === " ") {
			setSearchType("byEidrId");
		} else {
			setSearchType("byQuery");
		}
		makeQuery();
	};

	return (
		<div className='min-h-screen w-full md:w-4/5 lg:w-4/4 xl:w-2/3 bg-gradient-to-r from-gray-400 to-green-700 py-6 flex flex-col justify-center sm:py-12 mx-auto'>
			<h1 className='text-4xl font-bold text-center mb-4'>
				Entertainment Identifier Registry
			</h1>
			<APIForm
				inputs={inputs}
				handleChange={(e) =>
					setInputs((prevState) => ({
						...prevState,
						[e.target.name]: e.target.value.trim(),
					}))
				}
				onSubmit={submitForm}
			/>
			{currentImage ? (
				<img
					className='mx-auto mt-4 rounded-lg shadow-lg'
					src={currentImage}
					alt='Screenshot returned'
				/>
			) : (
				<div></div>
			)}
			<br></br>
			<div className='container mx-auto px-4'>
				{response && searchType === "byEidrId" && (
					<ResolutionResult response={response} />
				)}
				{response && searchType === "byQuery" && (
					<QueryResult items={response} />
				)}
			</div>
			<br></br>
		</div>
	);
};

export default App;
