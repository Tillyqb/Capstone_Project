function CalculateMaterialRequirements() {
  const [partNo, setPartNo] = React.useState('');
  const [count, setCount] = React.useState('');
  const [needPartData, settNeedPartData] = React.useState('');
  const [twoAcross, setTwoAcross] = React.useState('');
  const [materialRequirementString, setMaterialRequirementString] = React.useState('');
    
  function handleMaterialRequirementCalculation(evt) {
    console.log('handleMaterialRequirementCalculation is running');
    console.log(twoAcross);
    evt.preventDefault();
    

    const payload = {
      partNo: partNo,
      count: count,
      twoAcross: twoAcross
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
      console.log(payload)
      settNeedPartData(false)
      if (data === 'need part data') {
        settNeedPartData(true);
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

  function handleTwoAcrossChange(evt) {
    // evt.preventDefault()
    console.log(evt.target.value)
    if (twoAcross) {
      setTwoAcross(false)
    } else if (!twoAcross) {
      setTwoAcross(true)
    } else {
      console.log('twoAcross is not working')
    }
  }

    if (needPartData) {
      console.log('part data is needed')
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
              <Form.Group controlId="formBasicCheckbox">
                  Two Across
                  <Form.Control type="checkbox" name="twoAcross" checked={twoAcross} onChange={handleTwoAcrossChange} lable="Two Across" />
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
              <Form.Group controlId="formBasicCheckbox">
                  Two Across
                  <Form.Control type="checkbox" name="twoAcross" checked={twoAcross} onChange={handleTwoAcrossChange} lable="Two Across" />
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
              <Form.Group controlId="formBasicCheckbox">
                  Two Across
                  <Form.Control type="checkbox" name="twoAcross" checked={twoAcross} onChange={handleTwoAcrossChange} lable="Two Across" />
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