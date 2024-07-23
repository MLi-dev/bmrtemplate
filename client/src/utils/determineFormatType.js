const determineFormatType = (xmlDoc) => {
	const baseObjectDatas = xmlDoc.getElementsByTagName("BaseObjectData");
	if (baseObjectDatas.length > 0) {
		const baseObjectData = baseObjectDatas[0];
		const referentTypes = baseObjectData.getElementsByTagName("ReferentType");
		if (referentTypes.length > 0) {
			const referentType = referentTypes[0].textContent;
			if (referentType === "Series" || referentType === "Season") {
				return "Episodic";
			}
		}
	}

	const extraObjectMetadatas = xmlDoc.getElementsByTagName(
		"ExtraObjectMetadata"
	);
	if (extraObjectMetadatas.length > 0) {
		const extraObjectMetadata = extraObjectMetadatas[0];
		if (extraObjectMetadata.getElementsByTagName("EditInfo").length > 0) {
			return "Edit";
		} else {
			const tags = [
				"SeriesInfo",
				"SeasonInfo",
				"ClipInfo",
				"ManifestationInfo",
				"CompilationInfo",
				"EpisodeInfo",
			];
			const hasNonEpisodicTags = tags.some(
				(tag) => extraObjectMetadata.getElementsByTagName(tag).length === 0
			);
			if (hasNonEpisodicTags) {
				return "NonEpisodic";
			}
		}
	}

	return "Unknown";
};
export default determineFormatType;
