function GetNewEnvelopeData(props) {
  return (
    <React.Fragment>
      <h1>What type of part?</h1>
      <form action="partDataEntry" value="part">
        <p>Part #<input type="text" name="partNo" value="partNo"></input></p>
        <p>Height<input type="text" name="height" value="height"></input></p> 
        <p>Width<input type="text" name="width" value="width"></input></p>
        <p>Flap<input type="text" name="flap" value="flap"></input></p>
        <p>Throat<input type="text" name="Throay" value="Throat"></input></p>
        <button type="submit"></button>
      </form>
    </React.Fragment>
  )
}

ReactDOM.render(<new-part-type />, document.querySelector('form'));
  
  