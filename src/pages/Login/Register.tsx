import { useState } from "react";
import { Button, Input, Label } from "reactstrap";

type logintype = {
	setlogin: Function;
};
function Register({ setlogin }: logintype) {
	const [adduser, setAdduser] = useState({
		nom: "",
		prenom: "",
		mail: "",
		mdp: "",
	});

	async function addUser() {
		fetch("http://localhost:5003/adduser", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(adduser),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setlogin(true); //pour revenir à la page login
				},

				(error) => {
					console.log(error);
				}
			);
	}

	return (
		<section className="vh-100 bg-image">
			<div className="mask d-flex align-items-center h-100 gradient-custom-4">
				<div className="container h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col-12 col-md-9 col-lg-7 col-xl-6">
							<div className="card" style={{ borderRadius: 15 }}>
								<div className="card-body p-5">
									<h2 className="text-uppercase text-center mb-6">Sign Up</h2>
									<div className="text-center">
										Already registered yet?{" "}
										<span
											className="link-primary"
											onClick={() => {
												setlogin(true);
											}}
										>
											Sign In
										</span>
									</div>
									<form>
										<div className="form-outline mb-4">
											<Label className="form-label" htmlFor="form3Example3cg">
												Lastname :
											</Label>
											<Input
												type="text"
												id="form3Example3cg"
												className="form-control form-control-lg"
												onChange={(e: any) => {
													adduser.nom = e.target.value;
													setAdduser(adduser);
												}}
											/>
										</div>

										<div className="form-outline mb-4">
											<Label className="form-label" htmlFor="form3Example3cg">
												Firstname :
											</Label>
											<Input
												type="text"
												id="form3Example3cg"
												className="form-control form-control-lg"
												onChange={(e: any) => {
													adduser.prenom = e.target.value;
													setAdduser(adduser);
												}}
											/>
										</div>

										<div className="form-outline mb-4">
											<Label className="form-label" htmlFor="form3Example5cg">
												Email :
											</Label>
											<Input
												type="email"
												id="form3Example5cg"
												className="form-control form-control-lg"
												onChange={(e: any) => {
													adduser.mail = e.target.value;
													setAdduser(adduser);
												}}
											/>
										</div>

										<div className="form-outline mb-4">
											<Label
												className="form-label mt-5"
												htmlFor="form3Example4cg"
											>
												Password :
											</Label>
											<Input
												type="password"
												id="form3Example4cg"
												className="form-control form-control-lg"
												onChange={(e: any) => {
													adduser.mdp = e.target.value;
													setAdduser(adduser);
												}}
											/>
										</div>

										<div
											className="form-check d-flex justify-content-center mb-3
										"
										>
											<Input
												className="form-check-input me-2"
												type="checkbox"
												id="form2Example3cg"
											/>
											<Label
												className="form-check-label"
												htmlFor="form2Example3g"
											>
												I agree all statements in
												<a href="#!" className="text-body">
													<u>Terms of service</u>
												</a>
											</Label>
										</div>
										<div className="d-flex justify-content-center">
											<Button
												type="button"
												className="btn btn-success btn-block btn-lg gradient-custom-8text-body"
												onClick={addUser}
											>
												Submit
											</Button>
										</div>
										{/* <div>
											<label
												className="form-check-label"
												htmlFor="form2Example3g"
											>
												Forgot <a href="#"> password? </a>
											</label>
										</div> */}
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Register;
