import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import '../styles/login.css'
import logo from '../Assets/logo.png'

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [showBtn, setShowBtn] = useState(true);
	
	const onLoginClick = async (event) => {
		event.preventDefault();
		const response = await fetch('/api/auth/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				password: password
			}),
		});
		if (response.status === 200) {
      window.location.href = '/'
    }
    else if (response.status === 401) {
      setErrorMessage('username or password is incorrect')
    }
	}
	
	return (
		<div className="container">
			<div className="heading">
				<img src={logo} alt="App Logo"/>
				<h1>Log In</h1>
				<Link to='/signup' className="altPage">Sign Up</Link>
			</div>
			<div className="error">{errorMessage}</div>
			<section>
				<form action="" onSubmit={onLoginClick}>
					<div className="inputBox" id="username">
						<input type="text" id="user" placeholder="Username" value={username} onChange={(e => setUsername(e.target.value))}/>
					</div>
					<div className="inputBox" id="password">
						<input type={showBtn ? 'password' : 'text'} id="pass" placeholder="Password" value={password} onChange={(e => setPassword(e.target.value))} />
						<button onClick={() => setShowBtn(!showBtn)} type="button" className="showPassword" id="show">
							{showBtn ? 'Show' : 'Hide'}
						</button>
					</div>
					<input id="logIn" className='button secondary' type='submit' value='Log In' />
				</form>
			</section>
			<footer>
				<div className="forgotPassword">Forgot your password?</div>
			</footer>
		</div	>
	)
}

export default Login



/*References: https://www.youtube.com/watch?v=8QgQKRcAUvM
			  https://www.youtube.com/watch?v=945xZpwy9w8 */