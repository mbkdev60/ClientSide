import React from "react";
import { Input } from "reactstrap";
import "./image.css";

type ImageProps = {
	setImage: Function;
	images: any;
};
function Image({ setImage, images }: ImageProps) {
	const [object, selectedobject] = React.useState(images);
	function onFileChange(e: any) {
		setImage(e.target.files);
		selectedobject(e.target.files[0]);
	}
	console.log("object" + object);
	return (
		<div>
			{object && images ? (
				<div
					style={{
						padding: "10px",
					}}
				>
					<img
						className="card-img-top"
						onClick={(): void => {
							setImage("");
							selectedobject("");
						}}
						src={
							typeof object === "string" ? object : URL.createObjectURL(object)
						}
						aria-hidden
						alt="Default image"
						width="-webkit-fill-availabl"
						height="100px"
					/>
				</div>
			) : (
				<Input type="file" onChange={onFileChange} id="file1" />
			)}
		</div>
	);
}

export default Image;
