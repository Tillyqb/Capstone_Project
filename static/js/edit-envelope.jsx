function EditEnvelope(props) {
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [flap, setFlap] = React.useState('');
  const [throat, setThroat] = React.useState('');
  const [largeWebMat, setLargeWebMat] = React.useState('');
  const [smallWebMat, setSmallWebMat] = React.useState('');
  const history = useHistory()

  const oldPart = props
  
  function editEnvelopeInfo(evt) {
    console.log('handleEditEnvelopeInfo is running');
    evt.preventDefault();
    
    const payload = {
      partNo: oldPart.partNo,
      height: height,
      width: width,
      flap: flap,
      throat: throat,
      largeWebMat: largeWebMat,
      smallWebMat: smallWebMat 
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('/api/edit-envelope', options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data === 'Envelope created') {
        alert(data + ' successfully')
        history.push('/material-calculator')
      } 
    }).catch(error => console.log('error in envelope edit', error))
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

  function handleFlapChange(evt) 
  {
    console.log(evt.target.value)
    setFlap(evt.target.value)
  }
  function handleThroatChange(evt) 
  {
    console.log(evt.target.value)
    setThroat(evt.target.value)
  }
  function handleLargeWebMatChange(evt) 
  {
    console.log(evt.target.value)
    setLargeWebMat(evt.target.value)
  }
  function handleSmallWebMatChange(evt) 
  {
    console.log(evt.target.value)
    setSmallWebMat(evt.target.value)
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
          <li>Flap = {oldPart.flap}</li>
        </ul>
        <ul>
          <li>Throat = {oldPart.throat}</li>
        </ul>
        <ul>
          <li>Top web materiaa = {oldPart.smallWebMat}</li>
        </ul>
        <ul>
          <li>Bottom web material = {oldPart.largeWebMat}</li>
        </ul>
        <div>
          <nav>
            <Form onSubmit={editEnvelopeInfo}>
              <h3> Please enter the corrected specs for thi part</h3>
              <Form.Group controlId="formBasicHeight">
                <Form.Control type="text" name="height" placeholder="Height" value={height} onChange={handleHeightChange} />
              </Form.Group>
              <Form.Group controlId="formBasicWidth">
                <Form.Control type="text" name="width"  placeholder="Width" value={width} onChange={handleWidthChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicFlap">
                <Form.Control type="text" name="flap"  placeholder="Flap" value={flap} onChange={handleFlapChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicThroat">
                <Form.Control type="text" name="throat"  placeholder="Throat" value={throat} onChange={handleThroatChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicLargeWebMat">
                <Form.Control type="text" name="largeWebMat"  placeholder="Large web material" value={largeWebMat} onChange={handleLargeWebMatChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicSmallWebMat">
                <Form.Control type="text" name="smallWebMat"  placeholder="Small web material" value={smallWebMat} onChange={handleSmallWebMatChange}></Form.Control>
              </Form.Group>
              <Button 
              className="button" 
              varient="Primary" 
              type="submit">
                Edit Envelope
              </Button>
            </Form>
          </nav>
        </div>
      </Router>
    </div>
  )
}