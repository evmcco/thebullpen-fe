import React from "react";

import CardsList from "../containers/CardsList"
import InfoCard from "../containers/InfoCard"

export default function HoldingsCards(props) {
  return (
    props.holdings && props.holdings.length > 0 ? (
      <>
        <CardsList title="Equities">
          {props.holdings.map((holding, index) => {
            return (
              <InfoCard
                left={holding.ticker_symbol}
                mid={[holding.currentPrice, `${holding.weight} wt.`, holding.profit]}
                right={{ data: holding.change + '%', color: (holding.change > 0 ? 'green' : holding.change < 0 ? 'red' : 'white') }}
                key={`${holding.ticker_symbol}-${holding.type}-${index}`}
              />
            )
          })}
        </CardsList>
      </>
    ) : null
  )
}


