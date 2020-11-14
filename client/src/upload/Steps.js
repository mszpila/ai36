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

	const handleDrop = (files) => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		let formData = new FormData();
		const config = {
			header: { "content-type": "multipart/form-data" },
			onUploadProgress: function (progressEvent) {
				var percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
				setProgress(percentCompleted);
			},
		};
		formData.append("file", files[0]);
		axios

			.post("http://localhost:5000/api/upload", formData, config)
			.then((response) => {
				// setActiveStep((prevActiveStep) => prevActiveStep + 1);
				console.log(response.data);
				setFile(response.data.success);
				setType(response.data.type);
				setResult(response.data.success);
				setLink(response.data.link);
			})
			.catch((err) => alert(err.data));
	};

	return <div className="upload">{getStepContent(activeStep)}</div>;
}

export default UploadPage;
