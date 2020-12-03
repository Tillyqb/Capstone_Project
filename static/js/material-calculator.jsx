function CalculateMaterialRequirements(props) {
  const [partNo, setPartNo] = React.useState('');
  const [count, setCount] = React.useState('');
  const [needPartData, setNeedPartData] = React.useState('');
  const [twoAcross, setTwoAcross] = React.useState('');
  const [materialRequirementString, setMaterialRequirementString] = React.useState('');
  const history=useHistory()
    
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
      console.log(data)
      setNeedPartData(false)
      if (data === 'need part data') {
        props.setAlertType('warning')
        props.setAlertText('Part is not in the database, please enter the dimensions for the new part.')
        props.setShowAlert(true)
        props.setAlertButtonType('outline-warning')
        history.push('/new-part-info')
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


      return (
        <Router>
          <div>
            {materialRequirementString ? 
            <h3> {materialRequirementString} </h3>
            : undefined}
          </div>
        <div>
          <nav id="materialCalculator">
            <h3>Enter part number and count desired.</h3>
            <div className="col-3">
            <Container>
          <Form onSubmit={handleMaterialRequirementCalculation}>
              <Form.Group controlId="formBasicPartNo">
                <Form.Control className="text-entry" type="text" name="partNo" placeholder="Enter part number" value={partNo} onChange={handlePartNoChange} />
              </Form.Group>
              <Form.Group controlId="formBasicCount">
                <Form.Control className="text-entry" type="text" name="count"  placeholder="Count" value={count} onChange={handleCountChange} />
              </Form.Group>
                <Form.Group className="checkbox" controlId="formBasicCheckbox">
                  Two Across
                  <Form.Control type="checkbox" name="twoAcross" checked={twoAcross} onChange={handleTwoAcrossChange} lable="Two Across" />
                </Form.Group>
              <Button className="button" varient="Primary" type="submit">
                Submit
              </Button>
            </Form>
            </Container>
            </div>
            <div className="col-9">

            </div>
          </nav>
        </div>
        </Router>
      );
    }