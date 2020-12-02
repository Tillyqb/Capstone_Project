function LogIn(props) { 
  // angie deleted incoming props bc they were not being used
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory()
  const [showLogin, setShowLogin] = React.useState(true);
  
  function handleLogin(evt) {
    console.log('handleLogin is running');
    evt.preventDefault();

    const payload = { 
      email: email,
      password: password
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: 
      {
        'Content-Type': 'application/json'
      }
    }

    fetch('/api/login', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data === 'Good login') {
        setShowLogin(false)
        props.setCurrentUser(email)
        localStorage.setItem('currentUser', JSON.stringify(email));
        props.setShowAlert(true)
        props.setAlertText('Logged in successfully')
        props.setAlertType('success')
        props.setAlertButtonType('outline-success')
      } else if (data === 'bad email') {
        props.setShowAlert(true)
        props.setAlertText('Email is not in our system')
        props.setAlertType('danger')
        props.setAlertButtonType('outline-danger')
      } else {
        props.setShowAlert(true)
        props.setAlertText('Email and password do not match')
        props.setAlertType('danger')
        props.setAlertButtonType('outline-danger')
      }
    }).catch(error => console.log('error in login', error))
  }

  function handleEmailChange(evt) 
  {
    console.log(evt.target.value)
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) 
  {
    setPassword(evt.target.value)
  }
  if (showLogin) {
  return (
    <div className="base">
      <Router>
        <div>
          <nav>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" name="password"  placeholder="Password" value={password} onChange={handlePasswordChange}></Form.Control>
              </Form.Group>
              <Button className="button" varient="Primary" type="submit">
                Login
              </Button>
            </Form>
            <ul>
              <li>
                <Link className="link" to="/newUser"> Click here to create a new account. </Link>
              </li>
            </ul>
          </nav>
          <div>
            <Switch>
              <Route path="/newUser">
                <NewUser currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} setAlertText={props.setAlertText} setAlertType={props.setAlertType} setAlertButtonType={props.setAlertButtonType} setShowAlert={props.setShowAlert} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  )
  } else {
    return (
      <div>
        
      </div>
    )
  }
}

function NewUser(props) {
  // took props out of newuser
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email2, setEmail2] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const history = useHistory()
  
  function handleRegister(evt) {
    console.log('handleRegister is running');
    evt.preventDefault();
    
    const payload = {
      email: email,
      email2: email2,
      password: password,
      password2: password2 
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('/api/new-user', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data === 'good registaration') {
        history.push('/')        
        props.setShowAlert(true)
        props.setAlertText('Account created successfully, please log in')
        props.setAlertType('success')
        props.setAlertButtonType('outline-success')
      } else if (data === 'email in system') {        
        props.setShowAlert(true)
        props.setAlertText('Email is already in use')
        props.setAlertType('danger')
        props.setAlertButtonType('outline-danger')
      } else if (data === 'email mismatch') {
        props.setShowAlert(true)
        props.setAlertText('Emails do not match')
        props.setAlertType('danger')
        props.setAlertButtonType('outline-danger')
      } else if (data === 'password mismatch') {
        props.setShowAlert(true)
        props.setAlertText('Passwords do not match')
        props.setAlertType('danger')
        props.setAlertButtonType('outline-danger')
      }
    }).catch(error => console.log('error in account creation', error))
  }

  function handleEmailChange(evt) 
  {
    console.log(evt.target.value)
    setEmail(evt.target.value)
  }

  function handleEmail2Change(evt) 
  {
    console.log(evt.target.value)
    setEmail2(evt.target.value)
  }

  function handlePasswordChange(evt) 
  {
    console.log(evt.target.value)
    setPassword(evt.target.value)
  }

  function handlePassword2Change(evt) 
  {
    console.log(evt.target.value)
    setPassword2(evt.target.value)
  }

  return (
    <div className="base">
      <Router>
        <div>
          <nav>
            <Form onSubmit={handleRegister}>
              <Form.Group 
              controlId="formBasicEmail">
                <Form.Control 
                type="email" 
                name="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail2">
                <Form.Control type="email" name="email2" placeholder="Retype email" value={email2} onChange={handleEmail2Change} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password" name="password"  placeholder="Password" value={password} onChange={handlePasswordChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicPassword2">
                <Form.Control type="password" name="password2"  placeholder="Retype Password" value={password2} onChange={handlePassword2Change}></Form.Control>
              </Form.Group>
              <Button className="button" varient="Primary" type="submit">
                Register
              </Button>
            </Form>
          </nav>
        </div>
      </Router>
    </div>
  )
}