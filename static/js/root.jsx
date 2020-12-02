const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useParams = ReactRouterDOM.useParams;
const useHistory = ReactRouterDOM.useHistory;
// const Alert = ReactBootstrap.alert-dismissible;
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
            </li><li>
                <Link className="link" to="/delete-part"> Remove a part from the datapase </Link>
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
            </Route><Route path="/delete-part">
              <DeletePart />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    )
}

function App() {
  const [showAlert, setShowAlert] = React.useState()
  const [alertText, setAlertText] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState('')
  const [alertType, setAlertType] = React.useState('')
  const [alertButtonType, setAlertButtonType] = React.useState('')

  React.useEffect(() => {
    let userFromStorage = localStorage.getItem('currentUser')
    if (userFromStorage) {
      setCurrentUser(JSON.parse(userFromStorage))
    }
  },[])

    console.log(currentUser)

  function handleLogOut(evt) {
    evt.preventDefault()
    setShowAlert(true)
    setAlertText('Logged out successfully')
    setAlertType('warning')
    setAlertButtonType('outline-warning')
    localStorage.removeItem('currentUser')
    setCurrentUser(false)
  }

  function handleAlertDismissal() {
    setShowAlert(false)
  }
    return (
      <Router>
      <Alert role="alert" variant={alertType} show={showAlert}>
        <Alert.Heading>{alertText}</Alert.Heading>
        <Button onClick={handleAlertDismissal} variant={alertButtonType}>
            Dismiss
          </Button>
      </Alert>
        <h1> Material Calculator Web App </h1>
        {currentUser ? <h2> Current user is {currentUser} </h2> : undefined}
        {currentUser ? <Form onSubmit={handleLogOut}>
          <Button 
            className="button" 
            varient="Primary" 
            type="submit">
              Log Out
          </Button>
        </Form> : undefined }
        {/* <TopNav user={user} setUser={setUser} /> */}
          <nav id="root">
            <ul>
              <li>
                <Link className="link" to="/"> Home </Link>
              </li>
              <li>
                <Link className="link" to="/about"> About </Link>
              </li>
              { currentUser ? 
              <li>
                <Link className="link" to="/material-calculator"> Material Calculator </Link> 
             </li>: undefined}
             { currentUser ? undefined :
             <li>
                 <Link className="link" to="/login"> Login </Link>
             </li>}
             { currentUser ? 
             <li>
                 <Link className="link" to="/edit-part"> Edit part </Link>
             </li> : undefined }
           </ul>
         </nav>
        <div>
           <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <LogIn currentUser={currentUser} setCurrentUser={setCurrentUser} setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/material-calculator">
              <MaterialCalculator />
            </Route>
            <Route path="/edit-part">
              <EditPart />
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