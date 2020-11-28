function CalculateMaterialRequirements() {
  const [partNo, setPartNo] = React.useState('');
  const [count, setCount] = React.useState('');
  const [needPartData, settNeeedPartData] = React.useState('');
  const [materialRequirementString, setMaterialRequirementString] = React.useState('');
    
  function handleMaterialRequirementCalculation(evt) {
    console.log('handleMaterialRequirementCalculation is running');
    evt.preventDefault();

    const payload = {
      partNo: partNo,
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
      settNeeedPartData(false)
      if (data === 'need material data') {
        settNeeedPartData(true);
      }
      setMaterialRequirementString(data);
      localStorage.setItem('requirementsString', materialRequirementString);
      
    }).catch(error => console.log('error in material calculator', error));
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

    console.log (needPartData);
    if (needPartData) {
      return (
        <Router>
          <div>
            <nav id="root">
              <h3> Part data not in our system </h3>
            <ul>
              <li>
                <Link className="link" to="/new-part-info"> Please enter the part data here, or try abain.</Link>
                </li>
            </ul>
            <Switch>
              <Route path="/new-part-info">
                <NewPartInfo />
              </Route>
            </Switch>
            <Form onSubmit={handleMaterialRequirementCalculation}>
              <Form.Group controlId="formBasicPartNo">
                <Form.Control type="text" name="partNo" placeholder="Enter part number" value={partNo} onChange={handlePartNoChange} />
              </Form.Group>
              <Form.Group controlId="formBasicCount">
                <Form.Control type="text" name="count"  placeholder="Count" value={count} onChange={handleCountChange} />
              </Form.Group>
              <Button className="button" varient="Primary" type="submit">
                Submit
              </Button>
            </Form>
          </nav>
        </div>
        </Router>
      );
    }
    else if (materialRequirementString) {
      return (
        <Router>
          <div>
            <h3> {materialRequirementString} </h3>
          </div>
        <div>
          <nav id="materialCalculator">
          <Form onSubmit={handleMaterialRequirementCalculation}>
              <Form.Group controlId="formBasicPartNo">
                <Form.Control type="text" name="partNo" placeholder="Enter part number" value={partNo} onChange={handlePartNoChange} />
              </Form.Group>
              <Form.Group controlId="formBasicCount">
                <Form.Control type="text" name="count"  placeholder="Count" value={count} onChange={handleCountChange} />
              </Form.Group>
              <Button className="button" varient="Primary" type="submit">
                Submit
              </Button>
            </Form>
          </nav>
        </div>
        </Router>
      );
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
    );}
  }