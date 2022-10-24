import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FormGroup, Label, Input } from "reactstrap";
import Image from "./Image";

type Modaltype = {
	client: any;
	setClient: Function;
	setAddClients: Function;
};

function ModalAdd({ client, setClient, setAddClients }: Modaltype) {
	// modal
	const [show, setShow] = React.useState<boolean>(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [images, setImages] = React.useState("");

	let imageClient = "http://localhost:5003/user.png";

	async function addClient(image: string) {
		fetch("http://localhost:5003/addclient", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				img: image,
				user_id: localStorage.getItem("user_id"),
				nom: client.nom,
				prenom: client.prenom,
				mail: client.mail,
				add: client.add,
				tel: client.tel,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setAddClients(result);
					setShow(false); // fermer le modal
				},

				(error) => {
					console.log(error);
				}
			);
	}
	async function RegisterClient() {
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
						console.log(data);
						addClient(data);
					});
			} catch (error) {
				console.log(error);
			}
		} else {
			addClient(imageClient);
		}
	}

	return (
		<>
			<Button className=" my-4" variant="primary" onClick={handleShow}>
				Ajouter un nouveau client
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Nouveau client</Modal.Title>
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
											placeholder=""
											onChange={(e: any) => {
												client.nom = e.target.value;
												setClient(client);
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
										<Label for="Prenom">Prénom : </Label>
										<Input
											type="text"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												client.prenom = e.target.value;
												setClient(client);
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
										<Label for="Email">Email : </Label>
										<Input
											type="email"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												client.mail = e.target.value;
												setClient(client);
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
										<Label for="add">Adresse : </Label>
										<Input
											type="text"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												client.add = e.target.value;
												setClient(client);
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
										<Label for="Tel">Tel : </Label>
										<Input
											type="tel"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												client.tel = e.target.value;
												setClient(client);
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
						<div></div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="warning" onClick={handleClose}>
						Fermer
					</Button>
					<Button variant="success" onClick={RegisterClient}>
						Confirmer
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalAdd;
