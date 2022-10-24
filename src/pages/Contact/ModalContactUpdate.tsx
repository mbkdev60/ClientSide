import React from "react";
import { Button, FormGroup, Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";

type Modaltype = {
	userUpdate: any;
	setUserUpdate: Function;
	show: boolean;
	setShow: Function;
    idUser: any;
};

function ModalContactUpdate({
	userUpdate,
	setUserUpdate,
	show,
	setShow,
    idUser,
}: Modaltype) {
    const handleClose = () => setShow(false);

    async function updateContact() {
			fetch(
				`http://localhost:5003/updatesctedetails/${localStorage.getItem(
					"user_id"
				)}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						user_id: localStorage.getItem("user_id"),
						nom: userUpdate.nom,
						mail: userUpdate.mail,
						add: userUpdate.add,
						tel: userUpdate.tel,
                        siret: userUpdate.siret,
                        logo: userUpdate.logo
					}),
				}
			)
				.then((res) => res.json())
				.then(
					(result) => {
						setShow(false);
					},

					(error) => {
						console.log(error);
					}
				);
		}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modification détails contact</Modal.Title>
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
									defaultValue={userUpdate.nom} //pour pouvoir faire des modif dans le champ input
									onChange={(e) => {
										userUpdate.nom = e.target.value;
										setUserUpdate(userUpdate);
									}}
								/>
							</div>
						</div>
					</div>

					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Label for="Adresse">Adresse : </Label>
									<Input
										type="text"
										className="form-control"
										defaultValue={userUpdate.add}
										onChange={(e) => {
											userUpdate.add = e.target.value;
											setUserUpdate(userUpdate);
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
									<Label for="Email">E-mail : </Label>
									<Input
										type="email"
										className="form-control"
										defaultValue={userUpdate.mail}
										onChange={(e) => {
											userUpdate.mail = e.target.value;
											setUserUpdate(userUpdate);
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
									<Label for="siret">N° de Siret : </Label>
									<Input
										type="text"
										className="form-control"
										defaultValue={userUpdate.siret}
										onChange={(e) => {
											userUpdate.siret = e.target.value;
											setUserUpdate(userUpdate);
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
										type="text"
										className="form-control"
										defaultValue={userUpdate.tel}
										onChange={(e) => {
											userUpdate.tel = e.target.value;
											setUserUpdate(userUpdate);
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
									<Label for="logo">Logo : </Label>
									<Input
										type="text"
										className="form-control"
										defaultValue={userUpdate.tel}
										onChange={(e) => {
											userUpdate.tel = e.target.value;
											setUserUpdate(userUpdate);
										}}
									/>
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
				        setShow(false);
                        updateContact();

					}}
				>
					Sauvegarder
				</Button>
			</Modal.Footer>
		</Modal>
	);
    
}

export default ModalContactUpdate;
