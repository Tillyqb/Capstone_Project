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
      <div className="leftMargin">  
        <nav id="materialCalculator">
          <h2>Select what you desire to calculate</h2>
          <div>
            <Link className="clickylink" to="/calculate-material-requirements"> 
              Calculate Material Requirements 
            </Link>
          </div>
          <div>
            <Link className="clickylink" to="/calculate-roll-length"> 
              Calculate Roll Length 
            </Link>
          </div>
          <div>
            <Link className="clickylink" to="/calculate-roll-diameter"> 
              Calculate Roll Diameter 
            </Link>
          </div>
          <div>
            <Link className="clickylink" to="/delete-part"> 
              Remove a Part From the Datapase 
            </Link>
          </div>
          <div>
            <Link className="clickylink" to="/edit-part"> 
              Edit a Part In the Database 
            </Link>
          </div>
          <div>
            <Link className="clickylink" to="/new-part-info">
              Create a New Part
            </Link>
          </div>
        </nav>
      </div>
    )
}

function App() {
  const [showAlert, setShowAlert] = React.useState()
  const [alertText, setAlertText] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState()
  const [alertType, setAlertType] = React.useState('')
  const [alertButtonType, setAlertButtonType] = React.useState('')
  const history = useHistory()

  React.useEffect(() => {
    let userFromStorage = localStorage.getItem('currentUser')
    if (userFromStorage) {
      setCurrentUser(JSON.parse(userFromStorage))
    }
  },[])

  function handleLogOut(evt) {
    evt.preventDefault()
    setShowAlert(true)
    setAlertText('Logged out successfully')
    setAlertType('warning')
    setAlertButtonType('outline-warning')
    localStorage.removeItem('currentUser')
    setCurrentUser(false)
    history.push('/');
  }

  function handleMaterialCalculatorRedirect (evt) {
    evt.preventDefault()
    history.push('/material-calculator')
  }

  function handleAlertDismissal(evt) {
    evt.preventDefault()
    setShowAlert(false)
  }

  return (  
    <div>  
      <TopNav currentUser={currentUser} setCurrentUser={setCurrentUser} setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert}handleLogOut={handleLogOut} />
      <div id="leftMargin">
      <Alert id="alert" role="alert" variant={alertType} show={showAlert}>
        <Alert.Heading>{alertText}</Alert.Heading>
        <Button onClick={handleAlertDismissal} variant={alertButtonType}>
          Dismiss
        </Button>
      </Alert>
      <Link className="clickylink"  to="/about">
        About
      </Link>
        {currentUser ? 
        <div>
          <Link className="clickylink" onClick={handleMaterialCalculatorRedirect}>
            MaterialCalculator
          </Link>
        </div>
        : undefined}
        <div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/calculate-roll-length">
              <CalculateRollLength setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/calculate-material-requirements">
              <CalculateMaterialRequirements setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/calculate-roll-diameter">
              <CalculateRollDiameter setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/delete-part">
              <DeletePart setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/edit-part">
              <EditPart setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/login">
              <LogIn currentUser={currentUser} setCurrentUser={setCurrentUser} setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/material-calculator">
              <MaterialCalculator setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/new-user">
              <CreateUser currentUser={currentUser} setCurrentUser={setCurrentUser} setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/new-part-info">
              <NewPartInfo setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/new-envelope">
              <NewEnvelope setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/new-page-protector">
              <NewPageProtector setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/new-pocket">
              <NewPocket setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/new-single-web-part">
              <NewSingleWebPart setAlertText={setAlertText} setAlertType={setAlertType} setAlertButtonType={setAlertButtonType} setShowAlert={setShowAlert} />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
        </div>
      </div>  
    );
  }

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'))