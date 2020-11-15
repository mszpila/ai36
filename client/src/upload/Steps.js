import React, { useState } from "react";
import "./Steps.css";
import axios from "axios";
import Drop from "./Drop";
import Results from "./Results";

function UploadPage() {
	const [file, setFile] = useState("");
	const [progress, setProgress] = useState(null);
	const [result, setResult] = useState("");
	const [type, setType] = useState("");
	const [link, setLink] = useState("");

	// setter which step is now active
	const [activeStep, setActiveStep] = useState(0);

	// steps content
	const getStepContent = (stepIndex) => {
		switch (stepIndex) {
			case 0:
				return <Drop handleDrop={handleDrop} />;
			case 1:
				return (
					<Results
						progress={progress}
						result={result}
						type={type}
						link={link}
					/>
				);
			default:
				return "Unknown stepIndex";
		}
	};

	const getSignedRequest = async (file) => {
		const { name, type } = file;
		if (type !== "video" || type !== "image") {
			return false;
		}
		const response = await axios.get("/api/sign", {
			params: { filename: name, type },
		});
		uploadFile(file, response.data.signedRequest, response.data.url, type);
		return true;
	};

	const uploadFile = async (file, signedRequest, url, type) => {
		const config = {
			header: { "content-type": "multipart/form-data" },
			onUploadProgress: function (progressEvent) {
				var percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				setProgress(percentCompleted);
			},
		};
		await axios.put(signedRequest, file, config);
		setType(type);
		setLink(url);
	};

	const handleDrop = async (files) => {
		const sign = await getSignedRequest(files[0]);
		if (sign) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	return <div className="upload">{getStepContent(activeStep)}</div>;
}

export default UploadPage;
