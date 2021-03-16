export const requestPlaidHoldings = async (item_id, username, plaid_access_token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/plaid/request/holdings`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      item_id: item_id,
      username: username,
      plaid_access_token: plaid_access_token
    })
  })
}