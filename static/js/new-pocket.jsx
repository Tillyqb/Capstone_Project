function NewPocket() {
  // took props out of newuser
  const [partNo, setPartNo] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [throat, setThroat] = React.useState('');
  const [largeWebMat, setLargeWebMat] = React.useState('');
  const [smallWebMat, setSmallWebMat] = React.useState('');
  const history = useHistory()
  
  function newPocketInfo(evt) {
    console.log('handleNewPocketInfo is running');
    evt.preventDefault();
    
    const payload = {
      partNo: partNo,
      height: height,
      width: width,
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
    fetch('/api/new-pocket', options)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data === 'Pocket created') {
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
        <div>
          <nav>
            <Form onSubmit={newPocketInfo}>
              <Form.Group 
              controlId="formBasicPartNo">
                <Form.Control 
                type="text" 
                name="partNo" 
                placeholder="partNo"
                value={partNo} 
                onChange={handlePartNoChange} />
              </Form.Group>
              <Form.Group controlId="formBasicHeight">
                <Form.Control type="text" name="height" placeholder="Height" value={height} onChange={handleHeightChange} />
              </Form.Group>
              <Form.Group controlId="formBasicWidth">
                <Form.Control type="text" name="width"  placeholder="Width" value={width} onChange={handleWidthChange}></Form.Control>
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
                Create Pocket
              </Button>
            </Form>
          </nav>
        </div>
      </Router>
    </div>
  )
}