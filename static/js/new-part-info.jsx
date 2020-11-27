function NewPartInfo() {
  const [partNo, setPartNo] = React.useState('');
  const [count, setCount] = React.useState('');
  const [partDict, setPartDict] = React.useState('');
  setPartDict({})
  return (
    <Router>
      <nav id="root">
        <ul>
          <li>
          </li>
        </ul>
      </nav>
    </Router>
  )
}