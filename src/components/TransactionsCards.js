import React, { useState, useEffect } from "react";

import CardsList from "../containers/CardsList"
import InfoCard from "../containers/InfoCard"

export default function TransactionsCards(props) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [equities, setEquities] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/user/${props.username}`)
      const data = await response.json()
      setEquities(data.filter(txn => txn.type !== "derivative"))
      setOptions(data.filter(txn => txn.type === "derivative"))
      setTransactions(data)
      setLoading(false)
    }
    getTransactions()
  }, []
  )

  const parseOptionsTxn = (transaction) => {
    const putCall = transaction.parsedTicker[6] === "P" ? "put" : transaction.parsedTicker[6] === "C" ? "call" : null
    return `${transaction.txn_type} ${putCall}`
  }

  const removeCur = (ticker) => {
    if (ticker.startsWith('CUR:')) {
      return ticker.substring(4)
    } else {
      return ticker
    }
  }

  if (loading === false && !equities.length && !options.length) {
    return (
      <CardsList title="No Recent Transctions" />
    )
  }
  else if (loading === false) {
    return (
      <>
        {
          (equities.length > 0) &&
            <CardsList title="Equities">
              {equities.map((transaction, index) => {
                return (
                  <InfoCard
                    key={`${transaction.date}-${transaction.ticker_symbol}-${index}`}
                    left={removeCur(transaction.ticker_symbol)}
                    mid={[transaction.date, Number(transaction.price).toFixed(2), 'cur. ' + (!!transaction.quote?.latestPrice ? Number(transaction.quote.latestPrice).toFixed(2) : transaction.close_price)]}
                    right={{ data: transaction.txn_type, color: (transaction.txn_type == 'buy' ? 'green' : transaction.txn_type == 'sell' ? 'red' : 'white') }}
                  />
                )
              })}
            </CardsList>
        }
        {
          (options.length > 0) &&
            <CardsList title="Options" className='OPTIONS'>
              {options.map((transaction, index) => {
                return (
                  <InfoCard
                    key={`${transaction.date}-${transaction.ticker_symbol}-${index}`}
                    left={transaction.parsedTicker[1]}
                    mid={[transaction.date, Number(transaction.price).toFixed(2), 'cur. ' + (!!transaction.quote?.latestPrice ? transaction.quote.latestPrice : transaction.close_price)]}
                    right={{ data: parseOptionsTxn(transaction), color: (transaction.txn_type == 'buy' ? 'green' : transaction.txn_type == 'sell' ? 'red' : 'white') }}
                  />
                )
              })
              }
            </CardsList>
        }
      </>
    )
  } else {
    return null
  }
}
