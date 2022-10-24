import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FormGroup, Label, Input } from "reactstrap";

type Modaltype = {
	user: any;
	setUser: Function;
	setAddUsers: Function;
};
function ModalAddContact({ user, setUser, setAddUsers }: Modaltype) {
	const [show, setShow] = React.useState<boolean>(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	async function addContact() {
		fetch("http://localhost:5003/addsctedetails", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: localStorage.getItem("user_id"),
				nom: user.nom,
				mail: user.mail,
				add: user.add,
				tel: user.tel,
				siret: user.siret,
				logo: user.logo,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setAddUsers(result);
					setShow(false); // fermer le modal
				},

				(error) => {
					console.log(error);
				}
			);
	}
	return (
		<div>
			<h1>test</h1>
		</div>
		// <div>
		// 	<Button className=" my-4" variant="primary" onClick={handleShow}>
		// 		Ajouter un nouveau contact
		// 	</Button>
		// 	<Modal show={show} onHide={handleClose}>
		// 		<Modal.Header closeButton>
		// 			<Modal.Title>Nouveau contact</Modal.Title>
		// 		</Modal.Header>
		// 		<Modal.Body>
		// 			<div className="d-flex flex-column bd-highlight mb-3">
		// 				<div className="p-2 bd-highlight">
		// 					<div className="d-flex flex-column bd-highlight mb-3">
		// 						<div className="p-2 bd-highlight">
		// 							<FormGroup>
		// 								<Label for="Nom">Nom : </Label>
		// 								<Input
		// 									type="text"
		// 									className="form-control"
		// 									placeholder=""
		// 									onChange={(e: any) => {
		// 										user.nom = e.target.value;
		// 										setUser(user);
		// 									}}
		// 								/>
		// 							</FormGroup>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="p-2 bd-highlight">
		// 					<div className="d-flex flex-column bd-highlight mb-3">
		// 						<div className="p-2 bd-highlight">
		// 							<FormGroup>
		// 								<Label for="add">Adresse : </Label>
		// 								<Input
		// 									type="text"
		// 									className="form-control"
		// 									placeholder=""
		// 									onChange={(e: any) => {
		// 										user.add = e.target.value;
		// 										setUser(user);
		// 									}}
		// 								/>
		// 							</FormGroup>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="p-2 bd-highlight">
		// 					<div className="d-flex flex-column bd-highlight mb-3">
		// 						<div className="p-2 bd-highlight">
		// 							<FormGroup>
		// 								<Label for="Email">Email : </Label>
		// 								<Input
		// 									type="email"
		// 									className="form-control"
		// 									placeholder=""
		// 									onChange={(e: any) => {
		// 										user.mail = e.target.value;
		// 										setUser(user);
		// 									}}
		// 								/>
		// 							</FormGroup>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="p-2 bd-highlight">
		// 					<div className="d-flex flex-column bd-highlight mb-3">
		// 						<div className="p-2 bd-highlight">
		// 							<FormGroup>
		// 								<Label for="tel">Tel : </Label>
		// 								<Input
		// 									type="tel"
		// 									className="form-control"
		// 									placeholder=""
		// 									onChange={(e: any) => {
		// 										user.tel = e.target.value;
		// 										setUser(user);
		// 									}}
		// 								/>
		// 							</FormGroup>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="p-2 bd-highlight">
		// 					<div className="d-flex flex-column bd-highlight mb-3">
		// 						<div className="p-2 bd-highlight">
		// 							<FormGroup>
		// 								<Label for="siret">N° de Siret : </Label>
		// 								<Input
		// 									type="tel"
		// 									className="form-control"
		// 									placeholder=""
		// 									onChange={(e: any) => {
		// 										client.tel = e.target.value;
		// 										setClient(client);
		// 									}}
		// 								/>
		// 							</FormGroup>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div className="p-2 bd-highlight">
		// 					<div className="d-flex flex-column bd-highlight mb-3">
		// 						<div className="p-2 bd-highlight">
		// 							<FormGroup>
		// 								<Image setImage={setImages} images={images} />
		// 							</FormGroup>
		// 						</div>
		// 					</div>
		// 				</div>
		// 				<div></div>
		// 			</div>
		// 		</Modal.Body>
		// 		<Modal.Footer>
		// 			<Button variant="warning" onClick={handleClose}>
		// 				Fermer
		// 			</Button>
		// 			<Button variant="success" onClick={RegisterClient}>
		// 				Confirmer
		// 			</Button>
		// 		</Modal.Footer>
		// 	</Modal>
		// </div>
	);
}

export default ModalAddContact;
