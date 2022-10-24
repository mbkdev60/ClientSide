import { useState } from "react";

type logintype = {
  setuserlogin: Function;
  setlogin: Function;
};

function Login({ setlogin, setuserlogin }: logintype) {
	const [user, setUser] = useState({
		mail: "",
		mdp: "",
	});

  async function checkUser() {
	
	fetch("http://localhost:5003/getuser", {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify(user),
	})
	  .then((res) => res.json())
	  .then(
		(result) => {
			setuserlogin(user);
			localStorage.setItem("user_id", result.user_id);
			localStorage.setItem("user", user.mail);
			localStorage.setItem("prenom", result.prenom);
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
								<h1 className="text-uppercase text-center mb-6">Sign In</h1>
								<div className="text-center">
									Not registered yet?{" "}
									<span
									className="link-primary"
									onClick={() => {
										setlogin(false);
									}}
									>
									Sign Up
									</span>
								</div>
								<form>
									<div className="form-outline mb-4">
										<label className="form-label" htmlFor="form3Example5cg">
											Email :
										</label>
										<input
											type="text"
											id="form3Example5cg"
											className="form-control form-control-lg"
											onChange={(e: any) => {
												user.mail = e.target.value;
												setUser(user);
											}}
										/>
									</div>

									<div className="form-outline mb-4">
									<label
										className="form-label mt-5"
										htmlFor="form3Example4cg"
									>
										Password :
									</label>

									<input
										type="text"
										id="form3Example4cg"
										className="form-control form-control-lg"
										onChange={(e: any) => {
										user.mdp = e.target.value;
										setUser(user);
										}}
									/>
									</div>

									<div className="d-flex justify-content-center">
									<button
										type="button"
										className="btn btn-success btn-block btn-lg gradient-custom-8text-body"
										onClick={checkUser}
									>
										Login
									</button>
									</div>
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

export default Login;
