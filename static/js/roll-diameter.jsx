function CalculateRollDiameter(props) {

  const [rollLength, setRollLength] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [coreDia, setCoreDia] = React.useState('');
  const history = useHistory()

  function handleDiameterCalculation(evt) {
    console.log('handleDiameterCalculation is running');
    evt.preventDefault();

    const payload = {
      rollLength: rollLength,
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
      localStorage.setItem('rollLength',JSON.stringify(data));
        history.push('/');
      console.log('Your roll has a diameter ' + data + ' feet');
      return (
        <Router>
          <nav>
            <h3>Your roll has a diameter of {{data}} feet. </h3>
          </nav>
        </Router>
      )
    }).catch(error => console.log('error in diameter calculator', error))
  }

  function handleRollLengthChange(evt) {
    console.log(evt.target.value)
    setRollLength(evt.target.value)
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
      <Router>
        <div>
          <nav>
            <Form onSubmit={handleDiameterCalculation}>
              <Form.Group controlId="formBasicLength">
                <Form.Control type="text" name="rollLength" placeholder="Roll length" value={rollLength} onChange={handleRollLengthChange} />
              </Form.Group>
              <Form.Group controlId="formBasicMaterial">
                <Form.Control type="text" name="material" placeholder="Material" value={material} onChange={handleMaterialChange} />
              </Form.Group>
              <Form.Group controlId="formBasicCoreDia">
                <Form.Control type="text" name="coreDia" placeholder="Core Diameter" value={coreDia} onChange={handleCoreDiaChange} />
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


function displayRollDiameter(diameter) {
  return (
    <h3>The diameter of you roll will be {diameter} in. </h3>
    )
}