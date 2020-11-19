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
  return <div> Welcome to my site </div>
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

function CalculateRollLength() {
  return(
    <div>
      This component is not finished yet.
    </div>
  );
}

function CalculateRollDiameter() {
  return(
    <div>
      This component is not finished yet.
    </div>
  );
}

function MaterialCalculator() {
  return (
    <Router>
      <div>  
        <nav>
          <ul>
            <li>
                <Link className="link" to="/calculateMaterialRequirements"> Calculate Material Requirements </Link>
            </li>
            <li>
                <Link className="link" to="/calculateRollLength"> Calculate Roll Length </Link>
            </li>
            <li>
                <Link className="link" to="/calculateRollDiameter"> Calculate Roll Diameter </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/calculateMaterialRequirements">
              <CalculateMaterialRequirements />
            </Route>
            <Route path="/calculateRollLength">
              <CalculateRollLength />
            </Route>
            <Route path="/calculateRollDiameter">
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
    console.log('handleLogin is running')
    evt.preventDefault();

    const payload = { 
      'email': email,
      'password': password
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      },
    }

    fetch('/api/login', options)
    .then(response => response.json())
    .then(data => {
      if (data === 'good login') {
        props.setUser(data)
        localStorage.setItem('user',JSON.stringify(data));
        history.push('/')
        alert('Login succsesfull')
      } else if (data === 'bad email') { 
        alert("Email is not in the system.  Please try again.")
      } else {
        alert("Email and password do not match.")
      }
    }
  ).catch(error => console.log('error in login', error))
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  return (
    <div className="base">
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" name="login-email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" name="login-password" placeholder="Enter password" value={email} onChange={handlePasswordChange} />
              </Form.Group>
              <Button className="button" varient="Primary" type="submit">
                Login
              </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
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
          <ul>
            <li>
                <Link className="link" to="/"> Home </Link>
            </li>
            <li>
                <Link className="link" to="/about"> About </Link>
            </li>
            <li>
                <Link className="link" to="/materialCalculator"> Material Calculator </Link>
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
            <Route path="/materialCalculator">
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

