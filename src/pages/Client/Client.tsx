import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";

import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";

function Clients() {
	// liste clients
	const [listClients, setListClients] = useState([]);

	const [idclient, setidclient] = React.useState();

	const [show, setShow] = React.useState(false);
	const handleShow = () => setShow(true);

	// insert
	const [client, setClient] = useState({
		user_id: localStorage.getItem("user_id"),
		img: "",
		nom: "",
		prenom: "",
		email: "",
		add: "",
		tel: "",
	});

	// ajout
	const [addClients, setAddClients] = useState();

	async function delClient(client_id: any) {
		fetch(`http://localhost:5003/deleteclient/${client_id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setAddClients(client_id);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	function getClients() {
		fetch(`http://localhost:5003/clients/${localStorage.getItem("user_id")}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setListClients(result);
					setAddClients(result.length);
				},

				(error) => {
					console.log(error);
				}
			);
	}
	
	useEffect(() => {
		getClients();
	}, [addClients]);

	return (
		//   <TaskText>Clients</TaskText>
		<div className="container my-5">
			<ModalAdd
				client={client}
				setAddClients={setAddClients}
				setClient={setClient}
			/>

			<div className="row my-5 ">
				{listClients
					// .filter((element: any) => (element.nom === "vxvx"))
					.map((client: any) => {
						return (
							<div className="col-4 mr-5 mt-2 col-lg-4 col-xl-4 col-md-6 ml-0 col-sm-12 col-xs-12 my-2">
								<Card style={{ width: "19rem" }}>
									<Card.Img
										style={{ height: "225px" }}
										variant="top"
										src={client.img}
									/>
									<Card.Body>
										<Card.Title>Nom : {client.nom}</Card.Title>
										<Card.Title>Prénom : {client.prenom}</Card.Title>
										<Card.Title>Email : {client.mail}</Card.Title>
										<Card.Title>Adresse : {client.add}</Card.Title>
										<Card.Title>Téléphone : {client.tel}</Card.Title>
										<div className="d-flex justify-content-between">
											<div className="p-2 bd-highlight">
												<Button
													variant="danger"
													onClick={() => {
														delClient(client.client_id);
													}}
												>
													supprimer
												</Button>
											</div>

											<div className="p-2 bd-highlight">
												<Button
													variant="info"
													onClick={() => {
														setidclient(client.client_id);
														setClient(client);
														handleShow();
													}}
												>
													modifier
												</Button>
											</div>
										</div>
									</Card.Body>
								</Card>
							</div>
						);
					})}
				<ModalUpdate
					clientUpdate={client}
					setClientUpdate={setClient}
					show={show}
					setShow={setShow}
					idclient={idclient}
				/>
			</div>
		</div>
	);
}

export default Clients;
