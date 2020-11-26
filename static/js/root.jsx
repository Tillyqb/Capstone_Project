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

function App() {

  React.useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem('user'));
    setUser(currentuser)
    console.log(user)
    },[]);

  const [user, setUser] = React.useState()

  function getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    return currentUser
  }

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
              <LogIn setUser={setUser} />
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