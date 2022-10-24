import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import ModalAdd2 from "./ModalAdd2";
import ModalUpdate2 from "./ModalUpdate2";

function Products() {
	const [idproduct, setidproduct] = React.useState();
	// liste clients
	const [listProducts, setListProducts] = useState([]);
	// console.log("🚀 ~ file: Products.tsx ~ line 19 ~ listProducts", listProducts);

	const [show, setShow] = React.useState(false);
	const handleShow = () => setShow(true);

	// insert
	const [product, setProduct] = useState({
		user_id: localStorage.getItem("user_id"),
		nom: "",
		prix: "",
		image: "",
		description: "",
	});

	// ajout
	const [addProducts, setAddProducts] = useState();

	async function delProduct(product_id: any) {
		fetch(`http://localhost:5003/deleteproduct/${product_id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setAddProducts(product_id);
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

	useEffect(() => {
		getProducts();
	}, [addProducts]);

	return (
		<div className="container my-5">
			<ModalAdd2
				product={product}
				setAddProducts={setAddProducts}
				setProduct={setProduct}
			/>

			<div className="row my-5 ">
				{listProducts.map((product: any) => {
					return (
						<div className="col-4 mr-5 mt-2 col-lg-4 col-xl-4 col-md-6 ml-0 col-sm-12 col-xs-12 my-2">
							<Card style={{ width: "19rem" }}>
								<Card.Img
									style={{ height: "225px" }}
									variant="top"
									src={product.image}
								/>
								<Card.Body>
									<Card.Title>Nom : {product.nom}</Card.Title>
									<Card.Title>Prix : {product.prix} €</Card.Title>
									<Card.Title>Description : {product.description} </Card.Title>
									<div className="d-flex justify-content-between">
										<div className="p-2 bd-highlight">
											<Button
												variant="danger"
												onClick={() => {
													delProduct(product.product_id);
												}}
											>
												supprimer
											</Button>
										</div>

										<div className="p-2 bd-highlight">
											<Button
												variant="info"
												onClick={() => {
													setidproduct(product.product_id);
													setProduct(product);
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
				<ModalUpdate2
					productUpdate={product}
					setProductUpdate={setProduct}
					show={show}
					setShow={setShow}
					idproduct={idproduct}
				/>
			</div>
		</div>
	);
}

export default Products;
