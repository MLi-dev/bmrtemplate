import { useState, useEffect } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import EditTemplate from "./components/editTemplate";
import determineFormatType from "./utils/FormatTypeUtil";

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
		for (let i = 0; i < inputsArr.length; i++) {
			makeQuery(inputsArr[i]);
		}
	};

	return (
		<div className='min-h-screen w-full md:w-4/5 lg:w-4/4 xl:w-2/3 bg-gradient-to-r from-gray-400 to-green-700 py-6 flex flex-col justify-center sm:py-12 mx-auto'>
			<h1 className='text-4xl font-bold text-center mb-4'>
				BMR Template Generator
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
			<table className='min-w-full divide-y divide-gray-200 mt-6'>
				<thead className='bg-gray-50'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Episodic: {episodicList?.length}
							{hasEpisodic && (
								<EditTemplate xmlArray={episodicXML} buttonName={"Episodic"} />
							)}
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							NonEpisodic: {nonEpisodicList?.length}
							{hasNonEpisodic && (
								<EditTemplate
									xmlArray={nonEpisodicXML}
									buttonName={"NonEpisodic"}
								/>
							)}
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Edit: {editEIDRList?.length}
							{hasEditFormat && (
								<EditTemplate xmlArray={editXML} buttonName={"Edit"} />
							)}
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Unknown: {unknownList?.length}
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Errors: {eidrErrorList?.length}
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{/* Example Row - Repeat or dynamically generate rows based on your data */}
					<tr>
						<td className='px-6 py-4 whitespace-nowrap'>
							{episodicList?.length > 0 &&
								episodicList.map((eidr_id) => <div>{eidr_id}</div>)}
						</td>
						<td className='px-6 py-4 whitespace-nowrap'>
							{nonEpisodicList?.length > 0 &&
								nonEpisodicList.map((eidr_id) => <div>{eidr_id}</div>)}
						</td>
						<td className='px-6 py-4 whitespace-nowrap'>
							{editEIDRList?.length > 0 &&
								editEIDRList.map((eidr_id) => <div>{eidr_id}</div>)}
						</td>
						<td className='px-6 py-4 whitespace-nowrap'>
							{unknownList?.length > 0 &&
								unknownList.map((eidr_id) => <div>{eidr_id}</div>)}
						</td>
						<td className='px-6 py-4 whitespace-nowrap'>
							{eidrErrorList?.length > 0 &&
								eidrErrorList.map((eidr_id) => <div>{eidr_id}</div>)}
						</td>
					</tr>
				</tbody>
			</table>

			<br></br>
		</div>
	);
};

export default App;
