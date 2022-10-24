import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import ModalUpdateOrder from "./ModalUpdateOrder";
import Swal from "sweetalert2"; //pour le pop-up confirmation panier
import Select from "react-select";

function Order() {
	const [product, setProduct] = React.useState();
	const [listProducts, setListProducts] = useState([]);
	const [update, setIsUpdate] = React.useState<boolean>(false);
	const [show, setShow] = React.useState(false);
	const [tot, setTot] = React.useState(0);
	const [tabCommand, setTabCommand] = useState<any>([]);
	const [listClients, setListClients] = useState([]);
	const [nomClt, setNomClt] = React.useState<any>();
	const [idClt, setidClt] = React.useState<any>();
	// const [selectedOption, setSelectedOption] = useState<any>({
	// 	client_id: "",
	// 	nomclient: "",
	// });
	const [selectedOption, setSelectedOption] = React.useState(0);
	const results: any = [];

	listClients.forEach((element: any, index: any) => {
		results.push({ value: element.client_id, label: element.nom });
	});

	function getClients() {
		fetch(`http://localhost:5003/clients/${localStorage.getItem("user_id")}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setListClients(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	function getProducts() {
		fetch(`http://localhost:5003/products/${localStorage.getItem("user_id")}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setListProducts(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	function totalOrder() {
		let Somme = 0;
		tabCommand.forEach((element: any) => {
			Somme += Number(element.Total);
		});

		setTot(Somme);
	}

	async function insertOrder() {
		var today = new Date();
		
		if (selectedOption !== 0 && tot > 0) {
			await fetch(`http://localhost:5003/addglobalorder`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					user_id: localStorage.getItem("user_id"),
					client_id: idClt,
					nomclient: nomClt,
					// client_id: selectedOption.client_id,
					// nomclient: selectedOption.nom,
					dateorder: today,
					montanttotal: tot,
				}),
			})
				.then((res) => res.json())
				.then(
					(result) => {
						for (const element of tabCommand) {
							detailOrder(element, result.order_id);
							// pour le pop-up on utilise swal.fire
							Swal.fire({
								title: "Merci pour votre commande",
								icon: "success",
								confirmButtonText: "Ok",
							}).then(function () {
								//pour refresh la commande
								setTabCommand([]);
								setTot(0);
							});
						}
					},
					(error) => {
						console.log(error);
					}
				);
		} else {
			Swal.fire({
				title: "Veuillez sélectionner un client et au moins un produit",
				icon: "info",
				confirmButtonText: "Ok",
			});
		}
	}

	async function detailOrder(element: any, id: any) {
		await fetch(`http://localhost:5003/adddetailorder`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user_id: selectedOption,
				order_id: id,
				nom: element.Nom,
				prixunitaire: element.Prix,
				image: element.Image,
				quantite: element.Quantité,
				prixtotal: element.Total,
			}),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					console.log(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	useEffect(() => {
		getClients();
		getProducts();
		setIsUpdate(false);
	}, [update]);

	return (
		<div className="container my-5">
			{/*liste de clients (barre select)*/}
			<div style={{ width: "19rem" }}>
				<Select
					defaultValue={selectedOption}
					onChange={(e: any) => {
						// setSelectedOption({
						// 	nomclient: e.label,
						// 	client_id: e.value,
						// });
						setSelectedOption(e.value);
						//	e.value === 0 ? getOrders() : getListCommand(e.value);
						setNomClt(e.label); /*Pour récupérer le nom du clt*/
						setidClt(e.value);
					}}
					options={results}
				/>
			</div>
			<div className="row my-5">
				<div className="col-8 mr-3 mt-2">
					{" "}
					{/* 2/3 de l'écran col-8*/}
					<div className="row">
						{listProducts.map((product: any) => {
							return (
								<div className="col-sm mt-3">
									<Card style={{ width: "19rem" }}>
										<Card.Img variant="top" src={product.image} />
										<Card.Body>
											<Card.Title>Nom : {product.nom}</Card.Title>
											<Card.Title>Prix : {product.prix}</Card.Title>
											<Card.Title>
												Description : {product.description}
											</Card.Title>
											<div className="d-flex justify-content-center">
												<div className="p-2 bd-highlight">
													<Button
														variant="success"
														onClick={() => {
															setProduct(product);
															setShow(true);
														}}
													>
														Ajouter
													</Button>
												</div>
											</div>
										</Card.Body>
									</Card>
								</div>
							);
						})}
						
						<ModalUpdateOrder
							show={show}
							setShow={setShow}
							product={product}
							tabCommand={tabCommand}
							setTabCommand={setTabCommand}
							setTot={setTot}
						/>
					</div>
				</div>
				<div className="col-4">
					{" "}
					{/* le 1/3 qui restait col-4 */}
					<h1 style={{ textAlign: "center" }}> Votre Panier </h1>
					<table className="table mt-5 text-center">
						<thead>
							<tr>
								<th>Nom</th>
								<th>Prix</th>
								<th>Quantité</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{tabCommand.map((data: any, index: number) => {
								return (
									<tr>
										<td>{data.Nom}</td>
										<td>{data.Prix}€</td>
										<td>{data.Quantité}</td>
										<td>{data.Total}€</td>
										<td>
											<Button
												variant="danger"
												onClick={() => {
													tabCommand.splice(index, 1);
													totalOrder();
													setIsUpdate(true);
												}}
											>
												supprimer
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="d-flex justify-content-between">
						<div className="fas fa-divide ">
							<h5>Total du panier = {tot} €</h5>
						</div>
						<div className="p-2 bd-highlight">
							<Button
								variant="success"
								onClick={() => {
									totalOrder();
									insertOrder();
								}}
							>
								Commander
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Order;
