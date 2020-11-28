function NewPartInfo() {
  return (
    <Router>
      <nav id="root">
        <h3> Please select what type of part to add to the database.</h3>
        <ul>
          <li>
            <Link className="link" to="/new-envelope"> Envelope </Link>
          </li>
          <li>
            <Link className="link" to="/new-page-protector"> Page Protector</Link>
          </li>
          <li>
            <Link className="link" to="/new-pocket"> Pocket</Link>
          </li>
          <li>
            <Link className="link" to="/new-single-web-part"> Single Web Part </Link>
          </li>
        </ul>
      </nav>
      <div>
        <Switch>
          <Route path="/new-envelope">
            <NewEnvelope />
          </Route>
          <Route path="/new-page-protector">
            <NewPageProtector />
          </Route>
          <Route path="/new-pocket">
            <NewPocket />
          </Route>
          <Route path="/new-single-web-part">
            <NewSingleWebPart />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}