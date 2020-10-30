function PartTypeSelector(props) {
  return (
    <React.Fragment>
      <h1>What type of part?</h1>
      <form action="partTypeSelector" value="partType">
        <select name="newPartType">
          <option href="envelope">Envelope</option>
          <option href="pocket">Pocket</option>
          <option href="pageProtector">Page protector</option>
        </select>
        <button type="submit"></button>
        </form>
    </React.Fragment>
  )
}

ReactDOM.render(<new-part-type />, document.querySelector('form'));

