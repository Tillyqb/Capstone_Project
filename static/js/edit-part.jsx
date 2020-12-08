function EditPart() {
  const [partNo, setPartNo] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [width, setWidth] = React.useState('');
  const [flap, setFlap] = React.useState('');
  const [throat, setThroat] = React.useState('');
  const [largeWebMat, setLargeWebMat] = React.useState('');
  const [smallWebMat, setSmallWebMat] = React.useState('');
  const [material, setMaterial] = React.useState('');
  const [envelope, setEnvelope] = React.useState('');
  const [pocket, setPocket] = React.useState('');
  const [page, setPage] = React.useState('');
  const [swp, setSwp] = React.useState('');
  const history = useHistory()

  function handlePartEdit(evt) {
    console.log('handlePartEdit is running');
    evt.preventDefault()

    const payload = {
      part_no: partNo
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('/api/check-part', options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setEnvelope(data['pType'] === 'envelope');
      setPocket(data['pType'] === 'pocket');
      setPage(data['pType'] === 'page');
      setSwp(data['pType'] === 'swp');
      localStorage.setItem('oldPart', data);
      if (data === 'part not in system') {
          alert('That part is not in the system, try creating it insead.')
      } 
      
    }).catch(error => console.log('error in part edit', error))
  }
  
  function editEnvelopeInfo(evt) {
    console.log('handleEditEnvelopeInfo is running');
    evt.preventDefault();
    
    const payload = {
      partNo: partNo,
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
      if (data === 'Envelope edited ') {
        alert(data + ' successfully')
        history.push('/material-calculator')
      } 
    }).catch(error => console.log('error in envelope edit', error))
  }
  
  function editPageProtectorInfo(evt) {
    console.log('handleEditPageProtectorInfo is running');
    evt.preventDefault();
    
    const payload = {
      partNo: partNo,
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
    fetch('/api/edit-page-protector', options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data === 'Page protector edited') {
        alert(data + ' successfully')
        history.push('/material-calculator')
      } 
    }).catch(error => console.log('error in page edit', error))
  }
  
  function editPocketInfo(evt) {
    console.log('handleEditPocketInfo is running');
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
    fetch('/api/edit-pocket', options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data === 'Pocket edited') {
        alert(data + ' successfully')
        history.push('/material-calculator')
      } 
    }).catch(error => console.log('error in pocket edit', error))
  }

  function editSingleWebPartInfo(evt) {
    console.log('handleEditSingleWebPartInfo is running');
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
  
  function handlePartNoChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setPartNo(evt.target.value)
  }

  function handleHeightChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setHeight(evt.target.value)
  }

  function handleWidthChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setWidth(evt.target.value)
  }

  function handleFlapChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setFlap(evt.target.value)
  }
  function handleThroatChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setThroat(evt.target.value)
  }
  
  function handleLargeWebMatChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setLargeWebMat(evt.target.value)
  }

  function handleSmallWebMatChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setSmallWebMat(evt.target.value)
  }

  function handleMaterialChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setMaterial(evt.target.value)
  }

  if (envelope) {
    return (
      <div className="base">
      <Router>
        <h3>Please enter new information for part {partNo}</h3>
        <div>
          <nav>
            <Form onSubmit={editEnvelopeInfo}>
              <Form.Group controlId="formBasicHeight">
                <Form.Control type="text" className="text-entry" name="height" placeholder="Height" value={height} onChange={handleHeightChange} />
              </Form.Group>
              <Form.Group controlId="formBasicWidth">
                <Form.Control type="text" className="text-entry" name="width"  placeholder="Width" value={width} onChange={handleWidthChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicFlap">
                <Form.Control type="text" className="text-entry" name="flap"  placeholder="Flap" value={flap} onChange={handleFlapChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicThroat">
                <Form.Control type="text" className="text-entry" name="throat"  placeholder="Throat" value={throat} onChange={handleThroatChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicLargeWebMat">
                <Form.Control type="text" className="text-entry" name="largeWebMat"  placeholder="Large web material" value={largeWebMat} onChange={handleLargeWebMatChange}></Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicSmallWebMat">
                <Form.Control type="text" className="text-entry" name="smallWebMat"  placeholder="Small web material" value={smallWebMat} onChange={handleSmallWebMatChange}></Form.Control>
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
  } else if (page) {
    return (
      <div className="base">
        <Router>
        <h3>Please enter new information for part {partNo}</h3>
          <div>
            <nav>
              <Form onSubmit={editPageProtectorInfo}>
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
  } else if (pocket) {
    return (
      <div className="base">
        <Router>
        <h3>Please enter new information for part {partNo}</h3>
          <div>
            <nav>
              <Form onSubmit={editPocketInfo}>
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
                  Edit Envelope
                </Button>
              </Form>
            </nav>
          </div>
        </Router>
      </div>
    )
  } else if (swp) {
    return (
      <div className="base">
        <h3>Please enter new information for part {partNo}</h3>
        <Router>
          <div>
            <nav>
              <Form onSubmit={editSingleWebPartInfo}>
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
  } else {
    return (
      <div className="root">
        <Router>
          <div>
            <nav>
              <Form onSubmit={handlePartEdit}>
                <Form.Group controlId="formBasicPartNo">
                  <Form.Control type="text" name="partNo" placeholder="Part number to be edited" value={partNo} onChange= {handlePartNoChange} />
                </Form.Group>
                <Button className="button" varient="Primary" type="submit">   Submit </Button>
              </Form>
            </nav>
          </div>
        </Router>
      </div>
    )
  }
}