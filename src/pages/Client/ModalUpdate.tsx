import React from "react";
import { Button, FormGroup, Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import Image from "./Image";

type Modaltype = {
	clientUpdate: any;
	setClientUpdate: Function;
	show: boolean;
	setShow: Function;
	idclient: any;
};

function ModalUpdate({
	clientUpdate,
	setClientUpdate,
	show,
	setShow,
	idclient,
}: Modaltype) {
	const handleClose = () => setShow(false);

	const [images, setImages] = React.useState<string | Blob>(clientUpdate.img);

	async function updateClient(image: string) {
		fetch(`http://localhost:5003/updateclient/${idclient}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				img: image,
				user_id: localStorage.getItem("user_id"),
				nom: clientUpdate.nom,
				prenom: clientUpdate.prenom,
				mail: clientUpdate.mail,
				add: clientUpdate.add,
				tel: clientUpdate.tel,
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
	async function modifierClient() {
		try {
			if (!images) {
				updateClient(clientUpdate.img);
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
						updateClient(data);
					});
			}
		} catch (error) {
			console.log(error);
		}
	}

	// React.useEffect(() => {
	// 	//console.log(clientUpdate.img);
	// 	setImages(clientUpdate.img);
	// }, [clientUpdate]);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modification client</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="d-flex flex-column bd-highlight mb-3">
					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<Label for="Nom">Nom : </Label>
								<Input
									type="text"
									className="form-control"
									defaultValue={clientUpdate.nom} //pour pouvoir faire des modif dans le champ input
									onChange={(e) => {
										clientUpdate.nom = e.target.value;
										setClientUpdate(clientUpdate);
									}}
								/>
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
										defaultValue={clientUpdate.prenom}
										onChange={(e) => {
											clientUpdate.prenom = e.target.value;
											setClientUpdate(clientUpdate);
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
										defaultValue={clientUpdate.mail}
										onChange={(e) => {
											clientUpdate.mail = e.target.value;
											setClientUpdate(clientUpdate);
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
										defaultValue={clientUpdate.add}
										onChange={(e) => {
											clientUpdate.add = e.target.value;
											setClientUpdate(clientUpdate);
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
									<Label for="tel">Tel : </Label>
									<Input
										type="tel"
										className="form-control"
										defaultValue={clientUpdate.tel}
										onChange={(e) => {
											clientUpdate.tel = e.target.value;
											setClientUpdate(clientUpdate);
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
									<Image setImage={setImages} images={clientUpdate.img} />
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
						modifierClient();
						setShow(false);
					}}
				>
					Sauvegarder
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalUpdate;
