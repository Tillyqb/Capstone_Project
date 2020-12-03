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
    <Navbar className="topNav" expand="lg">
      <h2 id="siteheader"> Material Calculator Web App </h2>
        <Button onClick={handleHomeRedirect} className="button" varient="primary" type="submit">
          Home
        </Button>
        {props.currentUser ?
          <Button onClick={props.handleLogOut} className="button" varient="primary" type="submit">
            LogOut
          </Button>
        :
          <div>
            <Button onClick={handleLoginRedirect} className="button" varient="primary" type="submit">
              Log In
            </Button> 
            <Button onClick={handleCreateUserRedirect} className="button" varient="primary" type="submit">
              New User
            </Button>
          </div>
        }
    </Navbar>
  );
}
