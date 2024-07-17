import { useState, useEffect } from "react";
import "./App.css";
import APIForm from "./components/APIForm";
import Gallery from "./components/Gallery";
import QueryResult from "./components/QueryResult";
import ResolutionResult from "./components/ResolutionResult";
import EditTemplate from "./components/editTemplate";

const App = () => {
	const [inputs, setInputs] = useState({
		title: "",
		eidr_id: "",
	});
	const API_URL =
		process.env.NODE_ENV === "production"
			? "bmrtemplate-production.up.railway.app"
			: "http://localhost:3001";
	const [currentImage, setCurrentImage] = useState(null);
	const [prevImages, setPrevImages] = useState([]);
	const [response, setResponse] = useState({});
	const [searchType, setSearchType] = useState("");
	const [eidrs, setEIDRs] = useState([]);
	const [editXML, setEditXML] = useState([]);
	const [hasEditFormat, setHasEditFormat] = useState(false);
	const [hasEpisodic, setHasEpisodic] = useState(false);
	const [hasNonEpisodic, setHasNonEpisodic] = useState(false);

	const callAPI = async (query, requestOptions) => {
		const response = await fetch(query, requestOptions);
		const text = await response.text(); // Changed from json() to text() to handle XML
		const parser = new DOMParser();
		const xmlDoc = await parser.parseFromString(text, "application/xml");
		//add the xmlDoc to setEditXML existing array
		setEditXML((prev) => [...prev, xmlDoc]);
		const baseObjectDatas = xmlDoc.getElementsByTagName("BaseObjectData");
		if (baseObjectDatas.length > 0) {
			const baseObjectData = baseObjectDatas[0];
			let ReferentType;
			if (
				baseObjectData.getElementsByTagName("ReferentType") &&
				baseObjectData.getElementsByTagName("ReferentType").length > 0
			) {
				ReferentType =
					baseObjectData.getElementsByTagName("ReferentType")[0].textContent;
				if (ReferentType === "Series" || ReferentType === "Season") {
					setHasEpisodic(true);
				}
			}
		}
		const extraObjectMetadatas = xmlDoc.getElementsByTagName(
			"ExtraObjectMetadata"
		);
		if (extraObjectMetadatas.length > 0) {
			const extraObjectMetadata = extraObjectMetadatas[0];
			if (extraObjectMetadata.getElementsByTagName("EditInfo")) {
				setHasEditFormat(true);
			} else {
				if (
					!extraObjectMetadata.getElementsByTagName("SeriesInfo") ||
					!extraObjectMetadata.getElementsByTagName("SeasonInfo") ||
					!extraObjectMetadata.getElementsByTagName("ClipInfo") ||
					!extraObjectMetadata.getElementsByTagName("ManifestationInfo") ||
					!extraObjectMetadata.getElementsByTagName("CompilationInfo") ||
					!extraObjectMetadata.getElementsByTagName("EpisodeInfo")
				) {
					setHasNonEpisodic(true);
				}
			}
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
			setEIDRs((prev) => [...prev, inputs.eidr_id]);
			query = `${API_URL}/api/resolve`;
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

			{eidrs.length > 0 && eidrs.map((eidr_id) => <div>{eidr_id}</div>)}
			{hasEpisodic && (
				<EditTemplate xmlArray={editXML} buttonName={"Episodic"} />
			)}
			{hasEditFormat && <EditTemplate xmlArray={editXML} buttonName={"Edit"} />}
			{hasNonEpisodic && (
				<EditTemplate xmlArray={editXML} buttonName={"NonEpisodic"} />
			)}
			<br></br>
		</div>
	);
};

export default App;
