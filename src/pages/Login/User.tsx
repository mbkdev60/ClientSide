import Login from "./Login";
import Register from "./Register";

type usertype = {
  setuser: Function;
  login: any;
  setlogin: Function;
};

function User({ login, setlogin, setuser}: usertype) {
	return (
		<div>
			{login ? (
				<Login setlogin={setlogin} setuserlogin={setuser} />
			) : (
				<Register setlogin={setlogin}  />
			)}
		</div>
	);
}

export default User;
