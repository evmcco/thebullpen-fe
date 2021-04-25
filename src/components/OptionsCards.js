import React from "react";

import CardsList from "../containers/CardsList"
import InfoCard from "../containers/InfoCard"

export default function OptionsCards(props) {
  return (
    props.holdings && props.holdings.length > 0 ? (
      <CardsList>
        {props.holdings.map((holding, index) => {
          return (
            <InfoCard
              left={holding.ticker_symbol}
              mid={[`${holding.longshort} ${holding.putcall}`, "exp. " + holding.expirationDate, "str. " + holding.strikePrice]}
              right={{ data: holding.tickerChange + '%', color: (holding.tickerChange > 0 ? 'green' : holding.tickerChange < 0 ? 'red' : 'white') }}
              key={index}
            />
          )
        })}
      </CardsList>
    ) : null
  )
}


