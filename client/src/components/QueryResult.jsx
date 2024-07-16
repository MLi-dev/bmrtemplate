import ResolutionResult from "./ResolutionResult";

const QueryResult = ({ items }) => {
	return (
		items &&
		items.results &&
		items.results.length > 0 &&
		items.results.map((input, index) => {
			return <ResolutionResult response={input} />;
		})
	);
};
export default QueryResult;
