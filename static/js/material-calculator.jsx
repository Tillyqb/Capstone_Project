function CalculateMaterialRequirements() {
  const [partNo, setPartNo] = React.useState('');
  const [count, setCount] = React.useState('');
  const [largeWebWidth, setLargeWebWidth] = React.useState('');
  const [smallWebWidth, setSmallWebWidth] = React.useState('');
  const [largeWebMat, setLargeWebMat] = React.useState('');
  const [smallWebMat, setSmallWebMat] = React.useState('');
  const [webWidth, setWebWidth] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [feetNeeded, setFeetNeeded] = React.useState('');

  function handleMaterialRequirementCalculation(evt) {
    console.log('handleMaterialRequirementCalculation is running');
    evt.preventDefault();

    const payload = {
      part_no: partNo,
      count: count
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('/api/material-requirements-calculator', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data['status'] === 'two web calculation') {
          setLargeWebWidth(data['largeWebWidth']);
          localStorage.setItem('largeWebWidth', largeWebWidth);
          setSmallWebWidth(data['smallWebWidth']);
          localStorage.setItem('smallWebWidth', smallWebWidth);
          setLargeWebMat(data['largeWebMat']);
          localStorage.setItem('largeWebMat', largeWebMat);
          setSmallWebMat(data['smallWebMat']);
          localStorage.setItem('smallWebMat', smallWebMat);
          setFeetNeeded(data['feet needed']);
          localStorage.setItem('feet needed', feetNeeded);
        } else if (data['status'] === 'single web calculation') {
          setWebWidth(data['webWidth']);
          localStorage.setItem('webWidth', webWidth);
          setMaterial(data['material']);
          localStorage.setItem('material', material);
          setFeetNeeded(data['feet needed']);
          localStorage.setItem('feet needed')
        } else if (data == 'need part data') {
          
        } else {
          console.log('bad return from server')
        }
    }).catch(error => console.log('error in material calculator', error))
  }

  function handlePartNoChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setPartNo(evt.target.value)
    localStorage.setItem('partNo', partNo)
  }

  function handleCountChange(evt) {
    console.log(evt.target.value)
    setCount(evt.target.value)
    localStorage.setItem('count', count)
  }

  if (false) {
    return (
    <Router>
      <div>  
        <nav id="materialCalculator">
          <h2>What type of part are you creating?</h2>
          <ul>
            <li>
                <Link className="link" to="/envelope"> Envelope </Link>
            </li>
            <li>
                <Link className="link" to="/page-protector"> Page Protector </Link>
            </li>
            <li>
                <Link className="link" to="/pocket"> Pocket </Link>
            </li>
            <li>
                <Link className="link" to="/single-web-part"> Single Web Part </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/envelope">
              <NewEnvelope />
            </Route>
            <Route path="/page-protector">
              <NewPageProtector />
            </Route>
            <Route path="/pocket">
              <NewPocket />
            </Route>
             <Route path="/single-web-part">
              <NewSingleWebPart />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
    )
    } else {
      return (
      <Router>
        <div>
          <nav id="materialCalculator">
          <Form onSubmit={handleMaterialRequirementCalculation}>
              <Form.Group controlId="formBasicPartNo">
                <Form.Control type="text" name="partNo" placeholder="Enter part number" value={partNo} onChange={handlePartNoChange} />
              </Form.Group>
              <Form.Group controlId="formBasiccount">
                <Form.Control type="text" name="count"  placeholder="Count" value={count} onChange={handleCountChange} />
              </Form.Group>
              <Button className="button" varient="Primary" type="submit">
                Submit
              </Button>
            </Form>
          </nav>
        </div>
      </Router>
      )};
}