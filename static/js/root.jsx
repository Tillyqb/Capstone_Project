const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useParams = ReactRouterDOM.useParams;
const useHistory = ReactRouterDOM.useHistory;
// same as the above but using destructing syntax 
// const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function Homepage() {
  return <div></div>
}

function About() {
  return <div> 
    This is an app that is intended to calculate the material <br /> 
    requirements for a two web printing operation. <br />
    The material calculator was designd as a project for the <br /> 
    purpose of learning durring the coarse of a Software Engineering <br />
    fellowship at
    <a className="link" href="https://www.hackbrightacademy.com">Hackbright Academy.</a>
  </div>
}

function CalculateMaterialRequirements() {
  return(
    <div>
      This component is not finished yet.
    </div>
  );
}

function CalculateRollLength(props) {

  const [rollDia, setRollDia] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [coreDia, setCoreDia] = React.useState('');
  const history = useHistory()

  function handleLengthCalculation(evt) {
    console.log('handleLengthCalculation is running');
    evt.preventDefault();

    const payload = {
      rollDia: rollDia,
      material: material,
      coreDia: coreDia
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('/api/calculate-roll-length', options)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('rollLength',JSON.stringify(data));
        history.push('/');
      console.log('The length of your roll is ' + data + ' feet');
      return (
        <Router>
          <nav>
            <h3>Your roll is {{data}} feet long. </h3>
          </nav>
        </Router>
      )
    }).catch(error => console.log('error in length calculator', error))
  }

  function handleRollDiaChange(evt) {
    console.log(evt.target.value)
    setRollDia(evt.target.value)
  }

  function handleMaterialChange(evt) {
    console.log(evt.target.value)
    setMaterial(evt.target.value)
  }

  function handleCoreDiaChange(evt) {
    console.log(evt.target.value)
    setCoreDia(evt.target.value)
  }

  return (
    <div className="base">
      <Router>
        <div>
          <nav>
            <Form onSubmit={handleLengthCalculation}>
              <Form.Group controlId="formBasicDiameter">
                <Form.Control type="text" name="rollDia" placeholder="Roll Diameter" value={rollDia} onChange={handleRollDiaChange} />
              </Form.Group>
              <Form.Group controlId="formBasicMaterial">
                <Form.Control type="text" name="material" placeholder="Material" value={material} onChange={handleMaterialChange} />
              </Form.Group>
              <Form.Group 
              controlId="formBasicCoreDia">
                <Form.Control 
                type="text" 
                name="coreDia" 
                placeholder="Core Diameter" 
                value={coreDia} 
                onChange={handleCoreDiaChange} />
              </Form.Group>
              <Button 
              className="button" 
              varient="Primary" 
              type="submit">
                Submit
              </Button>
            </Form>
          </nav>
        </div>
      </Router>
    </div>
  )
}

function displayRollLength(length) {
  return (
    <h3>Your roll is {length} feet long. </h3>
    )
}

function CalculateRollDiameter() {

  const [rollLength, setRollLength] = React.useState('');
  const [material, setMaterial] = React.useState[''];
  const [coreDia, setCoreDia] = React.useState[''];
  const history = useHistory()

  function handleDameterCalculation(evt){
    console.log('handleDiameterCalculator is running');
    evt.preventDefault();

    const payload = {
      rollLength: rollLength,
      material: material,
      coreDia: coreDia
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: 
      {
        'Content-Type': 'application/json'
      }
    }
  
    fetch('api/diameter-calculator', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      displayRollDiameter(data)
    }).catch(error => console.log('error in diameter calculator', data, error))
  }
      
  function handleLengthChange(evt) 
  {
    console.log(evt.target.value)
    setEmail2(evt.target.value)
  }

  function handleMaterialChange(evt) 
  {
    console.log(evt.target.value)
    setPassword(evt.target.value)
  }

  function handleCoreDiaChange(evt) 
  {
    console.log(evt.target.value)
    setPassword2(evt.target.value)
  }


    
    return (
      <div className="base">
        <Router>
          <div>
            <nav>
              <Form onSubmit={handleDameterCalculation}>
                <Form.Group controlId="formRollDiameter">
                  <Form.Control type="text" name="rollLength" placeholder="Enter roll length" value={rollLength} onChange={handleLengthChange} />
                </Form.Group>
                <Form.Group controlId="formMaterial">
                  <Form.Control type="text" name="material"  placeholder="Material number" value={material} onChange={handleMaterialChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="formCoreDiameter">
                  <Form.Control type="pastextsword" name="coreDia"  placeholder="Core outer diameter" value={coreDia} onChange={handleCoreDiaChange}></Form.Control>
                </Form.Group>
                <Button className="button" varient="Primary" type="submit">
                  Submit
                </Button>
              </Form>
            </nav>
          </div>
        </Router>
      </div>
    );
}

function displayRollDiameter(diameter) {
  return (
    <h3>The diameter of you roll will be {diameter} in. </h3>
    )
}

function MaterialCalculator() {
  return (
    <Router>
      <div>  
        <nav id="materialCalculator">
          <h2>Select what you desire to calculate</h2>
          <ul>
            <li>
                <Link className="link" to="/calculate-material-requirements"> Calculate Material Requirements </Link>
            </li>
            <li>
                <Link className="link" to="/calculate-roll-length"> Calculate Roll Length </Link>
            </li>
            <li>
                <Link className="link" to="/calculate-roll-diameter"> Calculate Roll Diameter </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/calculate-material-requirements">
              <CalculateMaterialRequirements />
            </Route>
            <Route path="/calculate-roll-length">
              <CalculateRollLength />
            </Route>
            <Route path="/calculate-roll-diameter">
              <CalculateRollDiameter />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    )
}

function LogIn(props) { 

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory()

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
      if (data === 'good login') {
        localStorage.setItem('user',JSON.stringify(data));
        history.push('/')
        alert('Login succsesfull')
      } else if (data === 'bad email') {
        alert("Email is not in the system.  Please try again.")
      } else {
        alert("Email and password do not match.")
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
                <NewUser />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  )
}

function NewUser(props) {
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
        alert('Account created successfully')
      } else if (data === 'email in system') {
        alert('Email is already in use in the system')
      } else if (data === 'email mismatch') {
        alert('Emails do not match')
      } else if (data === 'password mismatch') {
        alert('Passwords do not match')
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
              <Button 
              className="button" 
              varient="Primary" 
              type="submit">
                Register
              </Button>
            </Form>
          </nav>
        </div>
      </Router>
    </div>
  )
}


function App() {

  function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    return currentUser
  }

  const [user, setUser] = React.useState(getCurrentUser)
  console.log(user)

    return (
      <Router>
        <nav id="root">
          <h1> Material Calculator Web App </h1>
          <ul>
            <li>
                <Link className="link" to="/"> Home </Link>
            </li>
            <li>
                <Link className="link" to="/about"> About </Link>
            </li>
            <li>
                <Link className="link" to="/material-calculator"> Material Calculator </Link>
            </li>
            <li>
                <Link className="link" to="/login"> Login </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/material-calculator">
              <MaterialCalculator />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))