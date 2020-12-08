function DeletePart() {
  const [partNo, setPartNo] = React.useState('');
  const [part, setPart] = React.useState('');

    function handleRemovePart(evt) {
      evt.preventDefault()

      const options = {
        method: 'POST',
      body: JSON.stringify({part_no: partNo}),
      headers: {
        'Content-Type': 'application/json'
        }
      }
      fetch('api/delete-part', options)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data === 'deletion successful') {
          props.setShow(true)
          props.setAlertText('Part {partNo} deleted successfully')
          props.setAlertType('success')
          props.setAlertButtonType('outline-success')
          history.push('/material-calculator')
        } else if (data === 'part not in system') {
          props.setShow(true)
          props.setAlertText('Part {partNo} is not in the system')
          props.setAlertType('sarning')
          props.setAlertButtonType('warning-success')
          history.push('/material-calculator')
        }
      }).catch(error => console.log('error in deletePart', error))
      }

      function handlePartNoChange(evt) {
        evt.preventDefault()
        console.log(evt.target.value)
        setPartNo(evt.target.value)
      }
   

  return (
    <div id="root">
      <Router>
        <div>
          <nav>
            <Form onSubmit={handleRemovePart}>
              <Form.Group controlId="formBasicPartNo">
                <Form.Control type="text" className= "textentry" name="partNo" placeholder="Part for Deletion" value={partNo} onChange={handlePartNoChange} />
              </Form.Group>
              <Button className="button" varient="Primary" type="submit">
                Delete {NewPartInfo}
              </Button>
            </Form>
          </nav>
        </div>
      </Router>
    </div>
  )
}