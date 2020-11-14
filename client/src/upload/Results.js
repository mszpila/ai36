import React, { useEffect, Fragment } from "react";
import {
	CircularProgress,
	Box,
	TextareaAutosize,
	makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import "./Results.css";
// import Player from "../videoPage/player/Player";
import "./radio.css";
import "./Drop.css";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import RadioButtonCheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";

function CircularProgressWithLabel(props) {
	const classes = useStylesFacebook();
	return (
		<div className={classes.root}>
			<Box position="relative" display="inline-flex">
				<CircularProgress
					style={{ color: "#065fd4" }}
					thickness={3}
					size={144}
					variant="static"
					{...props}
				/>
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<div
						variant="caption"
						component="div"
						color="textSecondary"
					>{`${Math.round(props.value)}%`}</div>
				</Box>
			</Box>
		</div>
	);
}

CircularProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and static variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired,
};

// Second spinner
// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
	root: {
		position: "relative",
	},
	bottom: {
		// color: theme.palette.grey[theme.palette.type === "dark" ? 200 : 700],
		color: "#fff",
	},
	top: {
		color: "#065fd4",
		animationDuration: "1000ms",
		position: "absolute",
		left: 0,
	},
	circle: {
		strokeLinecap: "round",
	},
}));

function FacebookCircularProgress(props) {
	const classes = useStylesFacebook();

	return (
		<div className={classes.root}>
			<Box position="relative" display="inline-flex">
				<CircularProgress
					variant="determinate"
					className={classes.bottom}
					size={144}
					thickness={3}
					{...props}
					value={100}
				/>
				<CircularProgress
					variant="indeterminate"
					disableShrink
					className={classes.top}
					classes={{
						circle: classes.circle,
					}}
					size={144}
					thickness={3}
					{...props}
				/>
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<div
						variant="caption"
						component="div"
						color="textSecondary"
					>
						Processing...
					</div>
				</Box>
			</Box>
		</div>
	);
}

function UploadForm({ progress, result, type, link }) {
	return (
		<Fragment>
			<div className="uploadForm__title">Results</div>
			<div className="uploadForm">
				{/* </div> */}
				{/* if progress is 100 and there is not video yet change it to circular */}
				<div className="uploadForm__video">
					{type ? (
						type === "video" ? (
							<video className="size">
								<source src={`${link}`}></source>
							</video>
						) : type === "audio" ? (
							<audio src={`${link}`}></audio>
						) : (
							<img
								className="size"
								alt="url"
								src={`${link}`}
							></img>
						)
					) : progress === 100 ? (
						<FacebookCircularProgress />
					) : (
						<CircularProgressWithLabel value={progress} />
					)}
				</div>
			</div>
			<div className="middle">Result {result}</div>
		</Fragment>
	);
}

export default UploadForm;
