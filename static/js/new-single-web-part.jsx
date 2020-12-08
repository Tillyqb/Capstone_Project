function NewSingleWebPart() {
  // took props out of newuser
  const [partNo, setPartNo] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const history = useHistory()
  
  function newSingleWebPartInfo(evt) {
    console.log('handleNewPocketInfo is running');
    evt.preventDefault();
    
    const payload = {
      partNo: partNo,
      height: height,
      width: width,
      material: material 
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('/api/new-single-web-part', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data === 'Single web part created') {
        props.setShow(true)
        props.setAlertText('Part created successfully')
        props.setAlertType('success')
        props.setAlertButtonType('outline-success')
        history.push('/material-calculator')
      } else if (data === 'That part is already in the system') {
        props.setShowAlert(true)
        props.setAlertText('Part is already in the system')
        props.setAlertType('warning')
        props.setAlertButtonType('outline-warning')
        history.push('/material-calculator')
      } else {
        props.setShow(true)
        props.setAlertText('There was an error in creating the part.')
        props.setAlertType('danger')
        props.setAlertButtonType('outline-danger')
      }
    }).catch(error => console.log('error in pocket creation', error))
  }

  function handlePartNoChange(evt) 
  {
    console.log(evt.target.value)
    setPartNo(evt.target.value)
  }

  function handleHeightChange(evt) 
  {
    console.log(evt.target.value)
    setHeight(evt.target.value)
  }

  function handleWidthChange(evt) 
  {
    console.log(evt.target.value)
    setWidth(evt.target.value)
  }
  function handleMaterialChange(evt) 
  {
    console.log(evt.target.value)
    setMaterial(evt.target.value)
  }

  return (
    <div className="base">
      <Router>
        <div>
          <nav>
            <Form onSubmit={newSingleWebPartInfo}>
              <Form.Group 
              controlId="formBasicPartNo">
                <Form.Control type="text" className="text-entry" name="partNo" placeholder="partNo" value={partNo} onChange={handlePartNoChange} />
              </Form.Group>
              <Form.Group controlId="formBasicHeight">
                <Form.Control type="text" className="text-entry" name="height" placeholder="Height" value={height} onChange={handleHeightChange} />
              </Form.Group>
              <Form.Group controlId="formBasicWidth">
                <Form.Control type="text" className="text-entry" name="width"  placeholder="Width" value={width} onChange={handleWidthChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicMaterial">
                <Form.Control type="text" className="text-entry" name="material"  placeholder="Material" value={material} onChange={handleMaterialChange}></Form.Control>
              </Form.Group>
              <Button 
              className="button" 
              varient="Primary" 
              type="submit">
                Create Single Web Part
              </Button>
            </Form>
          </nav>
        </div>
      </Router>
    </div>
  )
}