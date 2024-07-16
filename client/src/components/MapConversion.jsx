const MapConversion = ({ response }) => {
	const products = [];
	{
		response &&
			Object.keys(response).forEach((key, index) => {
				products.push(
					<li>
						<h2>{key}</h2>
						<h2>{response[key]}</h2>
					</li>
				);
			});
	}
	return products;
};
export default MapConversion;
