function TopNav(props){

  const history = useHistory()

  function handleLoginRedirect(evt){
    evt.preventDefault()
    history.push('/login');
  }

  function handleCreateUserRedirect(evt){
    evt.preventDefault()
    history.push('/new-user');
  }

  function handleHomeRedirect(evt){
    evt.preventDefault()
    history.push('/')
  }
  return(
    <div>
      <Navbar className="topNav" expand="lg">
        <div className="row">
          <div className="col-8  order-2">
           <h1 id="siteheader"> Material Calculator Web App </h1>
          </div>
          <div className="col-2 order-1">
            <Button onClick={handleHomeRedirect} className="navbar-button" varient="primary" type="submit">
              Home
            </Button>
          {props.currentUser ?
            <Button onClick={props.handleLogOut} className="navbar-button" varient="primary" type="submit">
              LogOut
            </Button>
          :
            <div>
              <Button onClick={handleLoginRedirect} className="navbar-button" varient="primary" type="submit">
                Log In
              </Button> 
              <Button onClick={handleCreateUserRedirect} className="navbar-button" varient="primary" type="submit">
                New User
              </Button>
            </div>
          }
        </div>
        <div className="col order-12">

        </div>
      </div>
    </Navbar>
  </div>
);
}
