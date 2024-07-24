import editTemplateFormat from "../assets/edittemplate.json";
import episodicTemplate from "../assets/episodictemplate.json";
import nonepisodicTemplate from "../assets/nonepisodictemplate.json";
import unknowntemplate from "../assets/unknowntemplate.json";
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
				templateFormat: episodicTemplate,
			},
			{
				name: "NonEpisodic",
				list: nonEpisodicList,
				hasTemplate: hasNonEpisodic,
				xmlArray: nonEpisodicXML,
				buttonName: "Stand-Alone Works",
				templateFormat: nonepisodicTemplate,
			},
			{
				name: "Edits",
				list: editEIDRList,
				hasTemplate: hasEditFormat,
				xmlArray: editXML,
				buttonName: "Edits",
				templateFormat: editTemplateFormat,
			},
			{
				name: "Unknown",
				list: unknownList,
				hasTemplate: hasUnknown,
				xmlArray: unknownXML,
				buttonName: "Unknown",
				templateFormat: unknowntemplate,
			},
			{
				name: "Error",
				list: eidrErrorList,
			},
		],
	};
};
