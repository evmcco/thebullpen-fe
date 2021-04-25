import React, { useState, useEffect } from "react";

import CardsList from "../containers/CardsList"
import InfoCard from "../containers/InfoCard"

export default function TransactionsCards(props) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/user/${props.username}`)
      const data = await response.json()
      setTransactions(data)
      setLoading(false)
    }
    getTransactions()
  }, []
  )

  if (loading === false) {
    return (
      <>
        { transactions && transactions.length > 0 ? (
          <CardsList>
            {transactions.map((transaction) => {
              if (transaction.type !== 'derivative') {
                return (
                  <InfoCard
                    left={transaction.ticker_symbol}
                    mid={[transaction.date, Number(transaction.price).toFixed(2), 'cur. ' + (!!transaction.quote?.latestPrice ? transaction.quote.latestPrice : transaction.close_price)]}
                    right={{ data: transaction.txn_type, color: (transaction.txn_type == 'buy' ? 'green' : transaction.txn_type == 'sell' ? 'red' : 'white') }}
                  />
                )
              } else {
                return (
                  <InfoCard
                    left={transaction.parsedTicker[1]}
                    mid={[transaction.date, Number(transaction.price).toFixed(2), 'cur. ' + (!!transaction.quote?.latestPrice ? transaction.quote.latestPrice : transaction.close_price)]}
                    right={{ data: transaction.txn_type, color: (transaction.txn_type == 'buy' ? 'green' : transaction.txn_type == 'sell' ? 'red' : 'white') }}
                  />
                )
              }
            })}
          </CardsList>
        )
          : (
            <CardsList>
              <h3>No Recent Transactions</h3>
            </CardsList >
          )
        }
      </>
    )
  } else {
    return null
  }
}