function Alerts() {
  
  const [alertType, setAlertType] = React.useState('');
  const [alertText, setAlertText] = React.useState('');
  const [show, setShow] = React.useState(true);
  const [alertButtonType, setAlertButtonType] = React.useState('');

  
  setAlertText(localStorage.getItem('alertText'))
  setAlertType(localStorage.getItem('alertType'))
  setAlertButtonType('outline-'+alertType)
  console.log(alertType, alertText, alertButtonType)

  function handleAlertDismissal(evt) {
    evt.preventDefault()
    setShow(false)
  }

  if (show) {
    return (
      <Alert role="alert" variant={alertType}>
        <Alert.Heading>{alertText}{localStorag.getItem('currentUser')}</Alert.Heading>
        <Button onClick={handleAlertDismissal} variant={alertButtonType}>
            Dismiss
          </Button>
      </Alert>
    );
  } else {return 0}
}