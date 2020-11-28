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
          alert('Part {partNo} successfully removed from the database')
        } else if (data === 'part not in system') {
          alert('There is no part with a number of {partNo} in the database')
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
                <Form.Control type="text" name="partNo" placeholder="Part for Deletion" value={partNo} onChange={handlePartNoChange} />
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