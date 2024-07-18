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
	const [nonEpisodicList, setNonEpisodicList] = useState([]);
	const [episodicList, setEpisodicList] = useState([]);
	const [editXML, setEditXML] = useState([]);
	const [episodicXML, setEpisodicXML] = useState([]);
	const [nonEpisodicXML, setNonEpisodicXML] = useState([]);
	const [hasEditFormat, setHasEditFormat] = useState(false);
	const [hasEpisodic, setHasEpisodic] = useState(false);
	const [hasNonEpisodic, setHasNonEpisodic] = useState(false);

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
		}
	};

	const makeQuery = () => {
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
				body: JSON.stringify({ title: { words: inputs.title } }),
			};
		} else {
			query = `${API_URL}/api/resolve`;
			requestOptions = {
				...requestOptions,
				body: JSON.stringify({ eidr_id: inputs.eidr_id }),
			};
		}
		callAPI(query, requestOptions, inputs.eidr_id).catch(console.error);
	};
	const reset = () => {
		setInputs({
			title: "",
			eidr_id: "",
		});
	};
	const submitForm = () => {
		setSearchType("byEidrId");
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
			<table className='min-w-full divide-y divide-gray-200 mt-6'>
				<thead className='bg-gray-50'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Episodic
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							NonEpisodic
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Edit
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{/* Example Row - Repeat or dynamically generate rows based on your data */}
					<tr>
						<td className='px-6 py-4 whitespace-nowrap'>
							{episodicList?.length > 0 &&
								episodicList.map((eidr_id) => <div>{eidr_id}</div>)}
							{hasEpisodic && (
								<EditTemplate xmlArray={episodicXML} buttonName={"Episodic"} />
							)}
						</td>
						<td className='px-6 py-4 whitespace-nowrap'>
							{nonEpisodicList?.length > 0 &&
								nonEpisodicList.map((eidr_id) => <div>{eidr_id}</div>)}
							{hasNonEpisodic && (
								<EditTemplate
									xmlArray={nonEpisodicXML}
									buttonName={"NonEpisodic"}
								/>
							)}
						</td>
						<td className='px-6 py-4 whitespace-nowrap'>
							{editEIDRList?.length > 0 &&
								editEIDRList.map((eidr_id) => <div>{eidr_id}</div>)}
							{hasEditFormat && (
								<EditTemplate xmlArray={editXML} buttonName={"Edit"} />
							)}
						</td>
					</tr>
				</tbody>
			</table>

			<br></br>
		</div>
	);
};

export default App;
