import fetch from "node-fetch";
import pkg from "express-xml-bodyparser";
const { xmlparser } = pkg;
const getRecordsById = async (req, res) => {
	console.log(req.body);
	try {
		const body = req.body;
		let headers = {
			"Content-Type": "application/xml",
			Accept: "*/*",
			Authorization:
				"Eidr 10.5238/mli:10.5237/9241-BC57:BXM3mQKgqh32HmV2Dgg4AA==",
		};
		let query = `https://sandbox1.eidr.org/EIDR/object/${body.eidr_id}?type=SelfDefined`;

		const response = await fetch(query, {
			method: "GET",
			headers: headers,
		});
		const xmlResp = await response.text();
		console.log(xmlResp);
		res.status(200).type("application/xml").send(xmlResp); // Correctly set the content type and send the XML response
	} catch (error) {
		console.log(error);
		res.status(400).send({ error: error.message });
	}
};
const getRecordsByQuery = async (req, res) => {
	try {
		console.log(req.body);
		const body = req.body;
		let headers = {
			"Content-Type": "application/json",
			Accept: "*/*",
			Authorization:
				"Eidr 10.5238/mli:10.5237/9241-BC57:BXM3mQKgqh32HmV2Dgg4AA==",
		};
		let query = "https://proxy.eidr.org/query";
		const response = await fetch(query, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(body),
		});
		const jsonResp = await response.json();
		res.status(200).json(jsonResp);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error.message });
	}
};

export default {
	getRecordsById,
	getRecordsByQuery,
};
