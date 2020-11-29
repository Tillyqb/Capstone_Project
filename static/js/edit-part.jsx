function EditPart() {
  const [partNo, setPartNo] = React.useState('');

  function handlePartEdit(evt) {
    console.log('handleEnvelopeEdit is running');
    evt.preventDefault();

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
      if (data['pType'] === 'envelope') {
        EditEnvelope(data)
      } else if (data['pType'] === 'page') {
        EditPageProtector(data)
      } else if (data['pType'] === 'pocket') {
        EditPocket(data)
      } else if (data['pType'] === 'swp') {
        EditSingleWebPart(data)
      } else {
        alert('That part is not in the system, try creating it insead.')
        NewPartInfo()
      }
    }).catch(error => console.log('error in part edit', error))
  }
  
  function handlePartNoChange(evt) {
    evt.preventDefault()
    console.log(evt.target.value)
    setPartNo(evt.target.value)
  }
  
  return (
    <div className="root">
      <Router>
        <div>
          <nav>
            <Form onSubmit={handlePartEdit}>
              <Form.Group controlId="formBasicPartNo">
                <Form.Control type="text" name="partNo" placeholder="Part number to be edited" value={partNo} onChange={handlePartNoChange} />
              </Form.Group>
              <Button className="button" varient="Primary" type="submit"> Submit </Button>
            </Form>
          </nav>
        </div>
      </Router>
    </div>
  )
}