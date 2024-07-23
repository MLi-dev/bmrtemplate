export const generateDataConfig = (
	episodicList,
	hasEpisodic,
	episodicXML,
	nonEpisodicList,
	hasNonEpisodic,
	nonEpisodicXML,
	editEIDRList,
	hasEditFormat,
	editXML,
	unknownList,
	hasUnknown,
	unknownXML,
	eidrErrorList
) => {
	return {
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
};
