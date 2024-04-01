import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/login.css'
import logo from '../Assets/logo.png'

const Signup = () => {
	let showBtn = document.getElementById("show");
	let password = document.getElementById("pass");
	let username = document.getElementById("user");
	let email = document.getElementById("emaddr");
	
	const onSignupClick = (event) => {
		let usernameValue = username.value;
		let emailValue = email.value;
		let passwordValue = password.value;
		
		//insert this data into the database
	}
	
	const onShowClick = () => {
		if(password.type == "password") {
			password.type = "text";
			showBtn.textContent = "Hide";
		} else {
			password.type = "password";
			showBtn.textContent = "Show";
		}
	}
	
    return (
        <div class="container">
			<div class="heading">
				<img src="logo.png" alt="App Logo"/>
				<h1>Sign Up</h1>
				<div class="altPage">Login</div>
			</div>
			<section class="signupSection">
				<form action="" onSubmit={onSignupClick}>
					<div class="inputBox" id="username">
						<input type="text" id="user" placeholder="Username"/>
					</div>
					<div class="inputBox" id="email">
						<input type="email" id="emaddr" placeholder="Email"/>
					</div>
					<div class="inputBox" id="password">
						<input type="password" id="pass" placeholder="Password"/>
						<button onclick={onShowClick} type="button" class="showPassword" id="show">Show</button>
					</div>
					<button type="submit" id="signUp">Sign Up</button>
				</form>
			</section>
		</div>
    )
}

export default Signup