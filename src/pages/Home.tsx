import React from "react";

const Home: React.FunctionComponent = () => {
	var prenom = localStorage.getItem("prenom");
	return <h1 className="text-center"> Welcome :  Happy to see you again  Mr(s) {prenom} </h1>;
};

export default Home;
