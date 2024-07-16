import React from "react";

const ResolutionResult = ({ response }) => {
	const inputs = [];
	for (let k of Object.keys(response)) {
		if (typeof response[k] === "string") {
			let pair = {};
			pair.key = k;
			pair.value = response[k];
			inputs.push(pair);
		} else if (typeof response[k] === "object" && response[k].length > 0) {
			let arr = response[k];
			arr.forEach((obj) => {
				let pair = {};
				pair.key = k;
				pair.value = obj.value;
				inputs.push(pair);
			});
			console.log("I am array");
		} else {
			let pair = {};
			pair.key = k;
			if (k === "ResourceName") {
				pair.value = `${response[k].value} ${response[k]._lang} ${response[k]._titleClass}`;
			} else if (k === "Administrators") {
				pair.value = `${response[k].Registrant}`;
			} else if (k === "ExtraObjectMetadata") {
				pair.value = `${response[k]?.SeriesInfo?.DateRequired} ${response[k]?.SeriesInfo?.EndDate} ${response[k]?.SeriesInfo?.NumberRequired} ${response[k]?.SeriesInfo?.OriginalTitleRequired}`;
			}

			inputs.push(pair);
		}
	}
	console.log(inputs);
	return (
		<div className='w-full max-h-[500px] overflow-auto bg-gray-100'>
			<table className='table-auto w-full'>
				<thead>
					<tr className='bg-gray-400'>
						<th className='border-2 border-gray-800 px-4 py-2'>Content ID</th>
						<th className='border-2 border-gray-800 px-4 py-2'>Title</th>
						<th className='border-2 border-gray-800 px-4 py-2'>
							Title Language
						</th>
						<th className='border-2 border-gray-800 px-4 py-2'>
							Reference Type
						</th>
						<th className='border-2 border-gray-800 px-4 py-2'>
							Relationships
						</th>
						<th className='border-2 border-gray-800 px-4 py-2'>
							Original Language
						</th>
						<th className='border-2 border-gray-800 px-4 py-2'>
							Language Mode
						</th>
						<th className='border-2 border-gray-800 px-4 py-2'>
							Structural Type
						</th>
						<th className='border-2 border-gray-800 px-4 py-2'>Release Date</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='border-2 border-gray-800 px-4 py-2'>
							{response?.ID}
						</td>
						<td className='border-2 border-gray-800 px-4 py-2'>
							{response?.ResourceName?.value}
						</td>
						<td className='border-2 border-gray-800 px-4 py-2'>
							{response?.ResourceName?._lang}
						</td>
						<td className='border-2 border-gray-800 px-4 py-2'>
							{response?.ReferentType}
						</td>
						<td className='border-2 border-gray-800 px-4 py-2'>
							{response?.AssociatedOrg?.[0]?._role}
						</td>
						<td className='border-2 border-gray-800 px-4 py-2'>
							{response?.OriginalLanguage?.[0]?.value}
						</td>
						<td className='border-2 border-gray-800 px-4 py-2'>
							{response?.OriginalLanguage?.[0]?._mode}
						</td>
						<td className='border-2 border-gray-800 px-4 py-2'>
							{response?.StructuralType}
						</td>
						<td className='border-2 border-gray-800 px-4 py-2'>
							{response?.ReleaseDate}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default ResolutionResult;
