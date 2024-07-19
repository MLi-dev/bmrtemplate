import EditTemplate from "./editTemplate";
const GeneratedTable = ({ dataConfig }) => {
	return (
		<table className='min-w-full divide-y divide-gray-200 mt-6'>
			<thead className='bg-gray-50'>
				<tr>
					{dataConfig.sections.map((section) => (
						<th
							key={section.name}
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							{section.name}: {section.list?.length}
							{section.hasTemplate && (
								<EditTemplate
									xmlArray={section.xmlArray}
									buttonName={section.buttonName}
								/>
							)}
						</th>
					))}
				</tr>
			</thead>
			<tbody className='bg-white divide-y divide-gray-200'>
				<tr>
					{dataConfig.sections.map((section) => (
						<td key={section.name} className='px-6 py-4 whitespace-nowrap'>
							{section.list?.length > 0 &&
								section.list.map((eidr_id) => (
									<div key={eidr_id}>{eidr_id}</div>
								))}
						</td>
					))}
				</tr>
			</tbody>
		</table>
	);
};
export default GeneratedTable;
