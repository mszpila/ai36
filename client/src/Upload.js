// import React, { useState } from "react";
// import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
// import Dropzone from "react-dropzone";
// import axios from "axios";
// import "./UploadVideo.css";

// function UploadVideo({ handleDrop }) {
// 	const [video, setVideo] = useState("");
// 	const [progress, setProgress] = useState(null);
// 	const [response, setResponse] = useState("");

// 	const handleDrop = (files) => {
// 		let formData = new FormData();
// 		const config = {
// 			header: { "content-type": "multipart/form-data" },
// 			onUploadProgress: function (progressEvent) {
// 				var percentCompleted = Math.round(
// 					(progressEvent.loaded * 100) / progressEvent.total
// 				);
// 				setProgress(percentCompleted);
// 			},
// 		};
// 		formData.append("file", files[0]);
// 		axios
// 			.post("/api/upload", formData, config)
// 			.then((response) => {
// 				setVideo(response.data);
// 			})
// 			.catch((err) => console.error(err.data));
// 	};

// 	return (
// 		<div className="uploadVideo">
// 			<div className="uploadVideo__title">Submit video</div>
// 			<div className="uploadVideo__section">
// 				<div className="uploadVideo__circleDrop">
// 					<Dropzone onDrop={(files) => handleDrop(files)}>
// 						{({ getRootProps, getInputProps }) => (
// 							<div
// 								{...getRootProps()}
// 								className="uploadVideo__dropfield"
// 							>
// 								<input {...getInputProps()} />
// 								<PublishRoundedIcon />
// 							</div>
// 						)}
// 					</Dropzone>
// 				</div>
// 				<div className="uploadVideo__info">
// 					<div className="uploadVideo__infoMain">
// 						Drag and drop the video files you want to upload
// 					</div>
// 					<div className="uploadVideo__infoExtra">
// 						Your videos will be private until you publish them.
// 					</div>
// 				</div>
// 				<Dropzone onDrop={(files) => handleDrop(files)}>
// 					{({ getRootProps, getInputProps }) => (
// 						<div {...getRootProps()}>
// 							<input {...getInputProps()} />
// 							<button className="uploadVideo__btn">
// 								CHOOSE FILE
// 							</button>
// 						</div>
// 					)}
// 				</Dropzone>
// 			</div>
// 			<div className="response">{response}</div>
// 		</div>
// 	);
// }

// export default UploadVideo;
