function EditSingleWebPart(props) {
  // took props out of newuser
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const history = useHistory()
  
  const oldPart = props

  function editSingleWebPartInfo(evt) {
    console.log('handleEditPocketInfo is running');
    evt.preventDefault();
    
    const payload = {
      partNo: oldPart.partNo,
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
    fetch('/api/edit-single-web-part', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      if (data === 'Single web part edited') {
        alert(data + ' successfully')
        history.push('/material-calculator')
      } 
    }).catch(error => console.log('error in swp edit', error))
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
      <h3>The current infor for part {oldPart.partNo}</h3>
        <ul>
          <li>Height = {oldPart.height}</li>
        </ul>
        <ul>
          <li>Width = {oldPart.width}</li>
        </ul>
        <ul>
          <li>Material = {oldPart.material}</li>
        </ul>
        <div>
          <nav>
            <Form onSubmit={editSingleWebPartInfo}>
              <h3> Please enter the corrected specs for thi part</h3>
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
                Edit Single Web Part
              </Button>
            </Form>
          </nav>
        </div>
      </Router>
    </div>
  )
}