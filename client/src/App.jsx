import { useState, useEffect } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import GenerateTemplate from "./components/GenerateTemplate";
import determineFormatType from "./utils/determineFormatType";
import GeneratedTable from "./components/GeneratedTable";
import APIFormFile from "./components/APIFormFile";

const App = () => {
	const [inputs, setInputs] = useState({
		eidr_id: "",
	});
	const API_URL =
		process.env.NODE_ENV === "production"
			? "https://bmrtemplate-production.up.railway.app"
			: "http://localhost:3001";

	const [searchType, setSearchType] = useState("");
	const [editEIDRList, setEditEIDRList] = useState([]);
	const [eidrErrorList, setEidrErrorList] = useState([]);
	const [nonEpisodicList, setNonEpisodicList] = useState([]);
	const [episodicList, setEpisodicList] = useState([]);
	const [unknownList, setUnknownList] = useState([]);
	const [editXML, setEditXML] = useState([]);
	const [episodicXML, setEpisodicXML] = useState([]);
	const [nonEpisodicXML, setNonEpisodicXML] = useState([]);
	const [unknownXML, setUnknownXML] = useState([]);
	const [hasEditFormat, setHasEditFormat] = useState(false);
	const [hasEpisodic, setHasEpisodic] = useState(false);
	const [hasNonEpisodic, setHasNonEpisodic] = useState(false);
	const [hasUnknown, setHasUnknown] = useState(false);
	const dataConfig = {
		sections: [
			{
				name: "Episodics",
				list: episodicList,
				hasTemplate: hasEpisodic,
				xmlArray: episodicXML,
				buttonName: "Episodics",
			},
			{
				name: "NonEpisodic",
				list: nonEpisodicList,
				hasTemplate: hasNonEpisodic,
				xmlArray: nonEpisodicXML,
				buttonName: "Stand-Alone Works",
			},
			{
				name: "Edits",
				list: editEIDRList,
				hasTemplate: hasEditFormat,
				xmlArray: editXML,
				buttonName: "Edits",
			},
			{
				name: "Unknown",
				list: unknownList,
				hasTemplate: hasUnknown,
				xmlArray: unknownXML,
				buttonName: "Unknown",
			},
			{
				name: "Error",
				list: eidrErrorList,
			},
		],
	};

	const callAPI = async (query, requestOptions, eidr_id) => {
		const response = await fetch(query, requestOptions);
		const text = await response.text(); // Changed from json() to text() to handle XML
		const parser = new DOMParser();
		const xmlDoc = await parser.parseFromString(text, "application/xml");
		const formatType = determineFormatType(xmlDoc);
		if (formatType === "Edit") {
			setEditXML((prev) => [...prev, xmlDoc]);
			setHasEditFormat(true);
			setEditEIDRList((prev) => [...prev, eidr_id]);
		} else if (formatType === "Episodic") {
			setEpisodicXML((prev) => [...prev, xmlDoc]);
			setHasEpisodic(true);
			setEpisodicList((prev) => [...prev, eidr_id]);
		} else if (formatType === "NonEpisodic") {
			setNonEpisodicXML((prev) => [...prev, xmlDoc]);
			setHasNonEpisodic(true);
			setNonEpisodicList((prev) => [...prev, eidr_id]);
		} else {
			setUnknownXML((prev) => [...prev, xmlDoc]);
			setHasUnknown(true);
			setUnknownList((prev) => [...prev, eidr_id]);
		}
	};

	const makeQuery = (eidrId) => {
		let requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		};
		//let query = `https://cors-anywhere.herokuapp.com/https://proxy.eidr.org/resolve/${inputs.eidr_id}?type=Full&followAlias=false`;
		let query = "";
		if (searchType === "byQuery") {
			query = `${API_URL}/api/query`;
			requestOptions = {
				...requestOptions,
				body: JSON.stringify({ title: { words: eidrId } }),
			};
		} else {
			query = `${API_URL}/api/resolve`;
			requestOptions = {
				...requestOptions,
				body: JSON.stringify({ eidr_id: eidrId }),
			};
		}
		callAPI(query, requestOptions, eidrId).catch((error) => {
			console.error("Error:", error);
			setEidrErrorList((prev) => [...prev, eidrId]);
		});
	};
	const reset = () => {
		setInputs({
			title: "",
			eidr_id: "",
		});
	};
	const submitForm = () => {
		const inputsArr = inputs?.eidr_id?.split(",\n");
		console.log(inputsArr);
		setSearchType("byEidrId");
		const jobs = [];
		const jobsSize = inputsArr.length / 1000;
		for (let i = 0; i < jobsSize; i++) {
			jobs.push(inputsArr.slice(i * 1000, (i + 1) * 1000));
		}
		console.log(jobs.length);
		jobs.forEach((job, index) => {
			setTimeout(() => {
				makeQuery(job);
			}, index * 5000); // Delay each call by 5000 ms more than the previous one
		});
	};

	return (
		<div className='min-h-screen w-full md:w-4/5 lg:w-4/4 xl:w-2/3 bg-gradient-to-r from-gray-400 to-green-700 py-6 flex flex-col justify-center sm:py-12 mx-auto flex items-center'>
			<h1 className='text-4xl font-bold text-center mb-4'>
				BMR Template Generator
			</h1>
			<h2 className='text-2xl font-bold mb-10'>Enter the information:</h2>
			<div className='flex'>
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
				<APIFormFile setSearchType={setSearchType} makeQuery={makeQuery} />
			</div>

			<GeneratedTable dataConfig={dataConfig} />
			<br></br>
		</div>
	);
};

export default App;
