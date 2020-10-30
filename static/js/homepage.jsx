function Homepage(props) {
  return (
    <React.Fragment>
      <h1>What would you like to do?</h1>
      <form action="option_selector" value="option" id="hompage_option">
        <select name = "Content_option">
          <option href="newPartEntry">Enter a new part</option>
          <option href="accessAnExistingPart">Access and existing part</option>
          <option href="rollCalculator">Roll Calculator</option>
        </select>
        <button type="submit" class="button">Submit</button>
      </form>
    </React.Fragment>
  )
}

ReactDOM.render(<Homepage />, document.querySelector('form'));
