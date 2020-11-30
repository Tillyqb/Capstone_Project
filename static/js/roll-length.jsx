function CalculateRollLength() {
  const [rollDia, setRollDia] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [coreDia, setCoreDia] = React.useState('');
  const [length, setLength] = React.useState('');
  // const history = useHistory()

  function handleLengthCalculation(evt) {
    console.log('handleLengthCalculation is running');
    evt.preventDefault();

    const payload = {
      rollDia: rollDia,
      material: material,
      coreDia: coreDia
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('/api/calculate-roll-length', options)
    .then(response => response.json())
    .then(data => {
      setLength(data)
      console.log('The length of your roll is ' + data + ' feet');
      DisplayRollLength(length)
    }).catch(error => console.log('error in length calculator', error))
  }

  function handleRollDiaChange(evt) {
    console.log(evt.target.value)
    setRollDia(evt.target.value)
  }

  function handleMaterialChange(evt) {
    console.log(evt.target.value)
    setMaterial(evt.target.value)
  }

  function handleCoreDiaChange(evt) {
    console.log(evt.target.value)
    setCoreDia(evt.target.value)
  }
  if (length) {
    return (
      <div className="base">
        <h3> Your roll is {length} feet long. </h3>
        <Router>
          <div>
            <nav>
              <Form onSubmit={handleLengthCalculation}>
                <Form.Group controlId="formBasicDiameter">
                  <Form.Control type="text" name="rollDia" placeholder="Roll  Diameter" value={rollDia} onChange={handleRollDiaChange} />
                </Form.Group>
                <Form.Group controlId="formBasicMaterial">
                  <Form.Control type="text" name="material"   placeholder="Material" value={material} onChange= {handleMaterialChange} />
                </Form.Group>
                <Form.Group 
                controlId="formBasicCoreDia">
                  <Form.Control 
                  type="text" 
                  name="coreDia" 
                  placeholder="Core Diameter" 
                  value={coreDia} 
                  onChange={handleCoreDiaChange} />
                </Form.Group>
                <Button 
                className="button" 
                varient="Primary" 
                type="submit">
                  Submit
                </Button>
              </Form>
            </nav>
          </div>
        </Router>
      </div>
    )
  }
  else {
    return (
     <div className="base">
        <Router>
          <div>
            <nav>
              <Form onSubmit={handleLengthCalculation}>
                <Form.Group controlId="formBasicDiameter">
                  <Form.Control type="text" name="rollDia" placeholder="Roll  Diameter" value={rollDia} onChange={handleRollDiaChange} />
                </Form.Group>
                <Form.Group controlId="formBasicMaterial">
                  <Form.Control type="text" name="material"   placeholder="Material" value={material} onChange= {handleMaterialChange} />
                </Form.Group>
                <Form.Group 
                controlId="formBasicCoreDia">
                  <Form.Control 
                  type="text" 
                  name="coreDia" 
                  placeholder="Core Diameter" 
                  value={coreDia} 
                  onChange={handleCoreDiaChange} />
                </Form.Group>
                <Button 
                className="button" 
                varient="Primary" 
                type="submit">
                  Submit
                </Button>
              </Form>
            </nav>
          </div>
        </Router>
      </div>
    )
  }
}

function DisplayRollLength(length) {
  return (
    <Router>
      <h3>Your roll is {length} feet long. </h3>
    </Router>
    )
}