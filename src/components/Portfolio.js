import React, { useEffect, useState } from "react";

import HoldingsTable from "./HoldingsTable"
import OptionsTable from "./OptionsTable"
import TransactionsTable from "./TransactionsTable"
import UserInfo from "./UserInfo"
import TopNav from "./TopNav"

const Portfolio = ({ match }) => {
  const [holdings, setHoldings] = useState([])
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0)

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const getHoldings = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/holdings/user/${match.params.username}`)
      const data = await response.json()
      getTotalPortfolioValue(data)
      data.sort((a, b) => {
        if (a.type == 'cash' || a.type == 'other' || a.ticker_symbol == 'CUR:BTC') {
          return 1
        } else if (b.type == 'cash' || b.type == 'other' || b.ticker_symbol == 'CUR:BTC') {
          return -1
        } else {
          return (a.ticker_symbol < b.ticker_symbol) ? -1 : (a.ticker_symbol > b.ticker_symbol) ? 1 : 0
        }
      })
      setHoldings(data)
    }
    getHoldings()
  }, []
  )

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/user/${match.params.username}`)
      const data = await response.json()
      setTransactions(data)
    }
    getTransactions()
  }, []
  )

  const getTotalPortfolioValue = (h) => {
    const reducer = (accumulator, currentValue) => {
      if (currentValue.ticker_symbol == 'CUR:USD') {
        return Number(accumulator) + Number(currentValue.quantity)
      }
      const holdingPrice = !!currentValue.quote?.latestPrice ? currentValue.quote.latestPrice : Number(currentValue.close_price)
      const totalHoldingValue = holdingPrice * Number(currentValue.quantity)
      return Number(accumulator) + totalHoldingValue
    }
    setTotalPortfolioValue(h.reduce(reducer, 0).toFixed(2))
  }
  return (
    <>
      <TopNav />
      <UserInfo username={match.params.username} />
      <HoldingsTable username={match.params.username} holdings={holdings.filter((holding) => { return holding.type != "derivative" })} totalPortfolioValue={totalPortfolioValue} />
      <OptionsTable username={match.params.username} holdings={holdings.filter((holding) => { return holding.type == "derivative" })} totalPortfolioValue={totalPortfolioValue} />
      <TransactionsTable username={match.params.username} transactions={transactions} />
    </>
  )
}

export default Portfolio

