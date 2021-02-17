export const requestPlaidHoldings = async (username, plaid_access_token) => {
  console.log("REQUESTING PLAID HOLDINGS")
  const response = await fetch(`${process.env.REACT_APP_API_URL}/plaid/request/holdings`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      plaid_access_token: plaid_access_token
    })
  })
}