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

  // React.useEffect(() => {
  //   // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   setCurrentUser(currentUser)
  //   console.log(currentUser)
  //   },[]);

  const [currentUser, setCurrentUser] = React.useState()
  // setCurrentUser(localStorage.getItem('currentUser'))
    console.log(currentUser)

  function handleLogOut() {
    localStorage.removeItem('currentUser');
  }

    if (localStorage.getItem('currentUser')){
    return (
      <Router>
        <h1> Material Calculator Web App </h1>
        <h2> Current user is {localStorage.getItem('currentUser')} </h2>
        <Form onSubmit={handleLogOut}>
          <Button 
            className="button" 
            varient="Primary" 
            type="submit">
              Log Out
          </Button>
        </Form>
        {/* <TopNav user={user} setUser={setUser} /> */}
         <nav id="root">
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
             <li>
                 <Link className="link" to="/edit-part"> Edit part </Link>
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
    } else {
      return (
        <Router>
          {/* <TopNav user={user} setUser={setUser} /> */}
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
              <Route path="/">
                <Homepage />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))