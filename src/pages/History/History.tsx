import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";

import ModalDetailOrder from "./ModalDetailOrder";

function History() {
	const [listClients, setListClients] = useState([]);
	const [selectedOption, setSelectedOption] = React.useState(0);
	const [listOrder, setlistOrder] = React.useState<any>();
	const [detailCmd, setDetailCmd] = useState<any>();
	const [show, setShow] = React.useState(false);
	const [cmd, setCmd] = useState(0);
	const [nomClt, setNomClt] = React.useState<any>();
	const [idClt, setidClt] = React.useState<any>();
	const componentRef = useRef<HTMLDivElement>(null);
	const [listClient, setListClient] = React.useState<any>([]);

	const results: any = [];

	listClients.forEach((element: any, index: any) => {
		results.push({ value: element.client_id, label: element.nom });
	});

	async function getClients() {
		await fetch(
			`http://localhost:5003/clients/${localStorage.getItem("user_id")}`,
			{
				method: "GET",
			}
		)
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

	async function getOrders() {
		await fetch(
			`http://localhost:5003/getglobalOrder/${localStorage.getItem("user_id")}`,
			{
				method: "GET",
			}
		)
			.then((res) => res.json())
			.then(
				(result) => {
					setlistOrder(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	async function getDetailOrder(order_id: any) {
		await fetch(`http://localhost:5003/getdetailorder/${order_id}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setDetailCmd(result);
					console.log(
						"🚀 ~ file: History.tsx ~ line 74 ~ getProductOrder ~ setDetailCmd",
						detailCmd
					);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	async function detailClt(idclient: string) {
		fetch(`http://localhost:5003/getclient/${idclient}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setListClient(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	useEffect(() => {
		getClients();
		getOrders();
	}, []);
	// console.log(listCommand);
	return (
		<div className="container my-5">
			<div className="d-flex justify-content-between">
				<div style={{ width: "19rem" }}>
					<Select
						defaultValue={selectedOption}
						onChange={(e: any) => {
							setSelectedOption(e.value);
							//	e.value === 0 ? getOrders() : getListCommand(e.value);
							setNomClt(e.label); /*Pour récupérer le nom du clt*/
							setidClt(e.value);
						}}
						options={results}
					/>
				</div>
				<div>
					<ReactToPrint
						trigger={() => (
							<Button
								style={{ marginRight: "25px" }}
								disabled={selectedOption === 0}
							>
								Imprimer{" "}
							</Button>
						)}
						content={() => componentRef.current}
					/>
					<div >
						<div ref={componentRef}>
							<h3 className="text-center" style={{ marginTop: "30px" }}>
								{" "}
								Commandes du Client : {nomClt}
							</h3>
							<table className="table mt-5 text-center">
								<thead>
									<tr>
										<th>N° de Commande</th>
										<th>Date</th>
										<th>Montant Total</th>
									</tr>
								</thead>
								<tbody>
									{listOrder
										?.filter((el: any) => el.client_id === idClt)
										?.map((data: any, index: number) => {
											return (
												<tr>
													<td>{data.order_id}</td>
													<td>{data.dateorder}</td>
													<td>{data.montanttotal} €</td>
												</tr>
											);
										})}
									{/* <ModalDetailOrder
										show={show}
										setShow={setShow}
										detailCmd={detailCmd}
										setDetailCmd={setDetailCmd}
										cmd={cmd}
										listClient={listClient}
									/> */}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div>
				<table className="table mt-5 text-center">
					<thead>
						<tr>
							<th>N° de Commande</th>
							<th>Client</th>
							<th>Date</th>
							<th>Montant Total</th>
						</tr>
					</thead>
					<tbody>
						{listOrder?.map((data: any, index: number) => {
							return (
								<tr>
									<td>{data.order_id}</td>
									<td>{data.nomclient}</td>
									<td>{data.dateorder}</td>
									<td>{data.montanttotal} €</td>
									<td>
										<Button
											className=" btn btn-info btn-rounded"
											onClick={() => {
												getDetailOrder(data.order_id);
												setShow(true);
												setCmd(data.order_id);
												detailClt(data.client_id);
											}}
											// disabled={selectedOption === 0}
										>
											Détails
										</Button>
									</td>
								</tr>
							);
						})}
						<ModalDetailOrder
							show={show}
							setShow={setShow}
							detailCmd={detailCmd}
							setDetailCmd={setDetailCmd}
							cmd={cmd}
							listClient={listClient}
						/>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default History;
