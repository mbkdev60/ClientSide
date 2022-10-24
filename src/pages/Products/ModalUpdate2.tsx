import React from "react";
import { Button, FormGroup, Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import Image from "../Client/Image";

type Modaltype = {
	productUpdate: any;
	setProductUpdate: Function;
	show: boolean;
	setShow: Function;
	idproduct: any;
};

function ModalUpdate2({
	productUpdate,
	setProductUpdate,
	show,
	setShow,
	idproduct,
}: Modaltype) {
	const handleClose = () => setShow(false);

	const [images, setImages] = React.useState<string | Blob>(
		productUpdate.image
	);

	async function updateProduct(image: string) {
		fetch(`http://localhost:5003/updateproduct/${idproduct}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				image: image,
				user_id: localStorage.getItem("user_id"),
				nom: productUpdate.nom,
				prix: productUpdate.prix,
				description: productUpdate.description,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setShow(false); // pour fermer le modal
					// window.location.reload();
				},

				(error) => {
					console.log(error);
				}
			);
	}
	async function modifierProduct() {
		try {
			if (!images) {
				updateProduct(productUpdate.image);
			} else {
				var formData = new FormData();
				let img: any = images;
				for (const i of Object.keys(img)) {
					formData.append("imgCollection", img[i as unknown as number]);
				}
				await fetch(`http://localhost:5003/uploadImage`, {
					body: formData,
					method: "POST",
				})
					.then((response) => response.json())
					.then((data: any) => {
						updateProduct(data);
					});
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header>
				<Modal.Title>Modification du produit</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex flex-column bd-highlight mb-3">
					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Label for="Nom">Nom : </Label>
									<Input
										type="text"
										className="form-control"
										defaultValue={productUpdate.nom} //pour pouvoir faire des modif dans le champ input                    onChange={(e: any) => {
										onChange={(e) => {
											productUpdate.nom = e.target.value;
											setProductUpdate(productUpdate);
										}}
									/>
								</FormGroup>
							</div>
						</div>
					</div>

					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Label for="Prix">Prix: </Label>
									<Input
										type="number"
										className="form-control"
										defaultValue={productUpdate.prix}
										onChange={(e) => {
											productUpdate.prix = e.target.value;
											setProductUpdate(productUpdate);
										}}
									/>
								</FormGroup>
							</div>
						</div>
					</div>

					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Label for="Description">Description: </Label>
									<Input
										type="text"
										className="form-control"
										defaultValue={productUpdate.description}
										onChange={(e) => {
											productUpdate.description = e.target.value;
											setProductUpdate(productUpdate);
										}}
									/>
								</FormGroup>
							</div>
						</div>
					</div>

					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Image setImage={setImages} images={productUpdate.image} />
								</FormGroup>
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="warning" onClick={handleClose}>
					Fermer
				</Button>
				<Button
					variant="success"
					onClick={() => {
						modifierProduct();
						setShow(false);
					}}
				>
					Sauvegarder
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalUpdate2;
