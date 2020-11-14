require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const AWS = require("aws-sdk");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static("/files"));
// app.use(express.static(path.join(__dirname, "client/build")));
app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, "view/build")));

// Set storage
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/");
	},
	filename: function (req, file, cb) {
		// cb(null, file.fieldname + "-" + Date.now());
		const fileName = `${Date.now()}_${file.originalname
			.toLowerCase()
			.split(" ")
			.join("_")}`;
		cb(null, fileName);
	},
	fileFilter: (req, file, cb) => {
		if (
			file.mimetype == "video" ||
			file.mimetype == "audio" ||
			file.mimetype == "image"
		) {
			cb(null, true);
		} else {
			return cb(new Error("Not supported file", false));
		}
	},
});

const upload = multer({ storage });

// const s3 = new AWS.S3({
// 	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// 	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

app.post("/api/upload", upload.single("file"), async (req, res) => {
	// const fileUpload = () => {
	// 	const paramsFile = {
	// 		Bucket: `${process.env.S3_BUCKET_NAME}/public/uploads/ai`,
	// 		Key: `${req.file.filename}`, // File name you want to save as in S3
	// 		// Body: `public/uploads/videos/${customFilename}.gif`,
	// 		Body: fs.readFileSync(
	// 			path.join(__dirname, `files`, `${req.file.filename}`)
	// 		),
	// 	};
	// 	return new Promise((resolve) => {
	// 		s3.upload(paramsFile, function (err, data) {
	// 			if (err) {
	// 				throw err;
	// 			}
	// 			// console.log(`File uploaded successfully. ${data.Location}`);
	// 			resolve(data.Location);
	// 		});
	// 	});
	// };
	// const link = await fileUpload();

	const link = req.file.path.replace(/\\/g, "/");
	const type = req.file.mimetype;
	res.json({ success: true, type, link });
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.statusCode || 500).json({ message: "Server error" });
});

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/view/build/index.html"));
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
	console.log(`Server Started at PORT ${PORT}`);
});
