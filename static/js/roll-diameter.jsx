function CalculateRollDiameter() {
  const [diameter, setDiameter] = React.useState(false);
  const [material, setMaterial] = React.useState('');
  const [coreDia, setCoreDia] = React.useState('');
  const [length, setLength] = React.useState('');

  function handleDiameterCalculation(evt) {
    console.log('handleDiameterCalculation is running');
    evt.preventDefault();

    const payload = {
      length: length,
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
    fetch('/api/calculate-roll-diameter', options)
    .then(response => response.json())
    .then(data => {
      setDiameter(data)
      console.log(data)
    }).catch(error => console.log('error in diameter calculator', error))
  }

  function handleRollLengthChange(evt) {
    console.log(evt.target.value)
    setLength(evt.target.value)
  }

  function handleMaterialChange(evt) {
    console.log(evt.target.value)
    setMaterial(evt.target.value)
  }

  function handleCoreDiaChange(evt) {
    console.log(evt.target.value)
    setCoreDia(evt.target.value)
  }
    return (
      <div className="base">
        {diameter ?
        <h3> The diameter of your roll will be {diameter} inches. </h3>: undefined}
        <Router>
          <div>
            <nav>
              <Form onSubmit={handleDiameterCalculation}>
                <Form.Group controlId="formBasicLength">
                  <Form.Control type="text" className="text-entry" name="length" placeholder="Target length" value={length} onChange={handleRollLengthChange} />
                </Form.Group>
                <Form.Group controlId="formBasicMaterial">
                  <Form.Control type="text" className="text-entry" name="material"   placeholder="Material" value={material} onChange= {handleMaterialChange} />
                </Form.Group>
                <Form.Group 
                controlId="formBasicCoreDia">
                  <Form.Control type="text" className="text-entry" name="coreDia" placeholder="Core Diameter" value={coreDia} onChange={handleCoreDiaChange} />
                </Form.Group>
                <Button className="button" varient="Primary" type="submit">
                  Submit
                </Button>
              </Form>
            </nav>
          </div>
        </Router>
      </div>
    )
  }