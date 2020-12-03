function NewPartInfo() {
  return (
    <div>
      <h3> Please select what type of part to add to the database.</h3>
      <div>
        <Link className="clickylink" to="/new-envelope"> Envelope </Link>
      </div>
      <div>
        <Link className="clickylink" to="/new-page-protector"> Page Protector</Link>
      </div>
      <div>
        <Link className="clickylink" to="/new-pocket"> Pocket</Link>
      </div>
      <div>
        <Link className="clickylink" to="/new-single-web-part"> Single Web Part </Link>
      </div>
    </div>
  );
}