function NewSingleWebPart() {
  // took props out of newuser
  const [partNo, setPartNo] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [material, material] = React.useState('');
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
      if (data === 'Part created') {
        alert(data + ' successfully')
        history.push('/material-calculator')
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
                <Form.Control 
                type="text" 
                name="partNo" 
                placeholder={partNo} 
                value={partNo} 
                onChange={handlePartNoChange} />
              </Form.Group>
              <Form.Group controlId="formBasicHeight">
                <Form.Control type="text" name="height" placeholder="Height" value={height} onChange={handleHeightChange} />
              </Form.Group>
              <Form.Group controlId="formBasicWidth">
                <Form.Control type="text" name="width"  placeholder="Width" value={width} onChange={handleWidthChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicMaterial">
                <Form.Control type="text" name="material"  placeholder="Material" value={material} onChange={handleMaterialChange}></Form.Control>
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