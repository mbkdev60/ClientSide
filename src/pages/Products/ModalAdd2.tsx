import React from "react";
import { Button, FormGroup, Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import Image from "../Client/Image";

type Modaltype = {
	product: any;
	setProduct: Function;
	setAddProducts: Function;
};

function ModalAdd2({ product, setProduct, setAddProducts }: Modaltype) {
	// modal
	const [show, setShow] = React.useState<boolean>(false);
	const handleClose = () => {
		setImages("");
		setShow(false);
	};
	const handleShow = () => setShow(true);
	const [images, setImages] = React.useState("");

	let imageProduct = "http://localhost:5003/product.png";

	async function addProduct(image: string) {
		fetch("http://localhost:5003/addproduct", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				image: image,
				user_id: localStorage.getItem("user_id"),
				nom: product.nom,
				prix: product.prix,
				description: product.description,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setAddProducts(result);
					setImages("");
					setShow(false); // fermer le modal
				},

				(error) => {
					console.log(error);
				}
			);
	}
	async function RegisterProduct() {
		if (images) {
			try {
				var formData = new FormData();
				let img = images;
				for (const i of Object.keys(img)) {
					formData.append("imgCollection", img[i as unknown as number]);
				}
				await fetch(`http://localhost:5003/uploadImage`, {
					body: formData,
					method: "POST",
				})
					.then((response) => response.json())
					.then((data: any) => {
						addProduct(data);
					});
			} catch (error) {
				console.log(error);
			}
		} else {
			addProduct(imageProduct);
		}
	}

	return (
		<>
			<Button className=" my-4" variant="primary" onClick={handleShow}>
				Ajouter un nouveau produit
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Nouveau produit</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="d-flex flex-column bd-highlight mb-3">
						<div className="p-2 bd-highlight">
							<div className="d-flex flex-column bd-highlight mb-3">
								<div className="p-2 bd-highlight">
									<FormGroup>
										<Label for="nom">Nom : </Label>
										<Input
											type="text"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												product.nom = e.target.value;
												setProduct(product);
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
										<Label for="prix">Prix : </Label>
										<Input
											type="number"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												product.prix = e.target.value;
												setProduct(product);
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
										<Label for="prix">Description : </Label>
										<Input
											type="text"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												product.description = e.target.value;
												setProduct(product);
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
										<Image setImage={setImages} images={images} />
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
					<Button variant="success" onClick={RegisterProduct}>
						Confirmer
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalAdd2;
