import React from "react";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";
import Dropzone from "react-dropzone";
import "./Drop.css";

function UploadVideo({ handleDrop }) {
	return (
		<div className="uploadVideo">
			<div className="uploadVideo__title">Submit video</div>
			<div className="uploadVideo__section">
				<div className="uploadVideo__circleDrop">
					<Dropzone onDrop={(file) => handleDrop(file)}>
						{({ getRootProps, getInputProps }) => (
							<div
								{...getRootProps()}
								className="uploadVideo__dropfield"
							>
								<input {...getInputProps()} />
								<PublishRoundedIcon />
							</div>
						)}
					</Dropzone>
				</div>
				<div className="uploadVideo__info">
					<div className="uploadVideo__infoMain">
						Drag and drop the files you want to analyze
					</div>
					<div className="uploadVideo__infoExtra">AI_36</div>
				</div>
				<Dropzone onDrop={(files) => handleDrop(files)}>
					{({ getRootProps, getInputProps }) => (
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<button className="uploadVideo__btn">
								CHOOSE FILE
							</button>
						</div>
					)}
				</Dropzone>
			</div>
		</div>
	);
}

export default UploadVideo;
