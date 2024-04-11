import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/login.css'
import logo from '../Assets/logo.png'

const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [showBtn, setShowBtn] = useState(true);

	const onSignupClick = async (event) => {
		event.preventDefault();
		const response = await fetch('/api/auth/signup/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password
			}),
		});
		let data = await response.json()
		if (response.status === 200) {
      setErrorMessage('username already exists')
    }
		if (response.status === 201) {
      window.location.href = '/'
    }
    else if (response.status === 401) {

      setErrorMessage(data)
    }
	}

	return (
		<div className="container">
			<div className="heading">
				<img src={logo} alt="App Logo"/>
				<h1>Sign Up</h1>
				<Link to='/login' className="altPage">Login</Link>
			</div>
			<div className="error">{errorMessage}</div>
			<section className="signupSection">
				<form action="" onSubmit={onSignupClick}>
					<div className="inputBox" id="username">
						<input type="text" id="user" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
					</div>
					<div className="inputBox" id="email">
						<input type="email" id="emaddr" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
					</div>
					<div className="inputBox" id="password">
						<input type={showBtn ? 'password' : 'text'} id="pass" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
						<button type="button" className="showPassword" id="show" onClick={() => setShowBtn(!showBtn)} >
							{showBtn ? 'Show' : 'Hide'}
						</button>
					</div>
					<input id="signUp" className='button secondary' type='submit' value='Sign Up' />
				</form>
			</section>
		</div>
	)
}

export default Signup