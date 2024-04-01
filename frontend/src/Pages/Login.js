import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/login.css'
import logo from '../Assets/logo.png'

const Login = () => {
	let showBtn = document.getElementById("show");
	let password = document.getElementById("pass");
	let username = document.getElementById("user");
	
	const onLoginClick = (event) => {
		let usernameValue = username.value;
		let passwordValue = password.value;
		
		const { data, status } = useQuery({
			queryKey: [usernameValue],
			queryFn: async () => {
				return fetch(`/api/user/password/`).then(res => res.json()
				);
			}
		});
		
		if(data == passwordValue) {
			//login
		}
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
				<h1>Log In</h1>
				<div class="altPage">Sign Up</div>
			</div>
			<section>
				<form action="" onSubmit={onLoginClick}>
					<div class="inputBox" id="username">
						<input type="text" id="user" placeholder="Username"/>
					</div>
					<div class="inputBox" id="password">
						<input type="password" id="pass" placeholder="Password"/>
						<button onclick={onShowClick} type="button" class="showPassword" id="show">Show</button>
					</div>
					<button type="submit" id="logIn">Log In</button>
				</form>
			</section>
			<footer>
				<div class="forgotPassword">Forgot your password?</div>
			</footer>
		</div>
    )
}

export default Login



/*References: https://www.youtube.com/watch?v=8QgQKRcAUvM
			  https://www.youtube.com/watch?v=945xZpwy9w8 */