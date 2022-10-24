import React, { useEffect, useState } from "react";
import { Button, FormGroup} from "react-bootstrap";
import { Label, Input } from "reactstrap";

function Contact() {
	const [user, setUser] = useState({
		user_id: localStorage.getItem("user_id"),
		nom: "",
		add: "",
		mail: "",
		tel: "",
		siret: "",
		logo: "",
	});

    let imageClient = "http://localhost:5003/user.png";

	const [addContact, setAddContact] = useState();

	async function delContact(user_id: any) {
		fetch(`http://localhost:5003//deletesctedetails/${user_id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setAddContact(user_id);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	function getContact() {
		fetch(
			`http://localhost:5003/getsctedetails/${localStorage.getItem("user_id")}`,
			{
				method: "GET",
			}
		)
			.then((res) => res.json())
			.then(
				(result) => {
					console.log(result);
					setUser(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}
	useEffect(() => {
		getContact();
	}, [addContact]);

	return (
		<div className="container my-5">
			<div className="row my-5 d-flex justify-content-center">
				<div className="col-4 mr-5 mt-2">
					{/* <Card style={{ width: "25rem" }}>
						<Card.Img
							style={{ height: "200px" }}
							variant="top"
							src={user.logo}
						/>
						<Card.Body>
							<Card.Title>Nom : {user.nom}</Card.Title>
							<Card.Title>Prénom : {user.add}</Card.Title>
							<Card.Title>E-mail : {user.mail}</Card.Title>
							<Card.Title>Téléphone : {user.tel}</Card.Title>
							<Card.Title>N° de Siret : {user.siret}</Card.Title>
							<div className="d-flex justify-content-between">
								<div className="p-2 bd-highlight">
									<Button
										variant="danger"
										onClick={() => {
											delContact(user.user_id);
										}}
									>
										supprimer
									</Button>
								</div>

								<div className="p-2 bd-highlight">
									<Button
										variant="info"
										onClick={() => {
											setUser(user);
										}}
									>
										modifier
									</Button>
								</div>
							</div>
						</Card.Body>
					</Card> */}
					<FormGroup>
						<div className="form-row">
							<div className="form-group">
								<Label for="nom">Nom de la société</Label>
								<Input
									type="text"
									class="form-control"
									id="nom"
									placeholder="Nom"
								/>
							</div>
						</div>
						<div className="form-group">
							<Label for="adresse">Adresse</Label>
							<Input
								type="text"
								class="form-control"
								id="adresse"
								placeholder="Adresse"
							/>
						</div>
						<div className="form-group">
							<Label for="mail">E-mail</Label>
							<Input
								type="email"
								class="form-control"
								id="mail"
								placeholder="exemple@exemple.org"
							/>
						</div>
						<div className="form-group">
							<Label for="tel">Téléphone</Label>
							<Input
								type="tel"
								class="form-control"
								id="tel"
								placeholder="0165986598"
							/>
						</div>

						<div className="form-group">
							<Label for="siret">N° de Siret</Label>
							<Input
								type="number"
								class="form-control"
								id="siret"
								placeholder="111 111 111 00111"
							/>
						</div>
						<br></br>
						<Button type="submit" className="btn btn-primary">
							Confirmer
						</Button>
					</FormGroup>
				</div>
			</div>
		</div>
	);
}

export default Contact;
