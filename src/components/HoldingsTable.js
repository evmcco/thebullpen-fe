import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function HoldingsTable(props) {
  const useStyles = makeStyles((theme) => ({
    tableContainer: {
      maxWidth: '90%',
      margin: '5%',
    },
    headerRow: {
      background: '#616161',
      color: '#fafafa',
    },
    headerRowCell: {
      color: '#fafafa'
    },
    tableRowCell: {
      color: '#fafafa'
    },
    tableRowCellLink: {
      color: '#fafafa'
    },
    tableRowCellGreen: {
      color: '#4caf50'
    },
    tableRowCellRed: {
      color: '#f44336'
    },
  }));

  const classes = useStyles();

  return (
    <>
      {props.holdings && props.holdings.length > 0 ? (
        <TableContainer className={classes.tableContainer} >
          <h1>Equities, Crypto, and Cash</h1>
          <Table size="small" aria-label="holdings table">
            <TableHead className={classes.headerRow}>
              <TableRow>
                {/* <TableCell className={classes.headerRowCell}>Name</TableCell> */}
                <TableCell className={classes.headerRowCell}>Ticker</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>% Change</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Current Price</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Portfolio Weight</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Average Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.holdings.map((holding) => (
                <TableRow key={holding.id}>
                  {/* <TableCell component="th" scope="row" className={classes.tableRowCell}>{holding.name}</TableCell> */}
                  <TableCell id="ticker" className={classes.tableRowCell}>
                    {(holding.type == 'etf' || holding.type == 'equity') ?
                      <a
                        className={classes.tableRowCellLink}
                        target="_blank"
                        href={`https://finance.yahoo.com/quote/${holding.ticker_symbol}`}
                      >
                        {holding.ticker_symbol}
                      </a> :
                      !!holding.unofficial_currency_code ? holding.unofficial_currency_code : holding.ticker_symbol}
                  </TableCell>
                  <TableCell id="change" align="right" className={holding.quote?.changePercent > 0 ? classes.tableRowCellGreen : holding.quote?.changePercent < 0 ? classes.tableRowCellRed : classes.tableRowCell}>{!!holding.quote ? `${(Number(holding.quote.changePercent) * 100).toFixed(2)}%` : null}</TableCell>
                  <TableCell id="current price" align="right" className={classes.tableRowCell}>{!!holding.quote?.latestPrice ? holding.quote.latestPrice : holding.close_price}</TableCell>
                  <TableCell id="weight" align="right" className={classes.tableRowCell}>{(((!!holding.quote?.latestPrice ? (Number(holding.quantity) * holding.quote.latestPrice).toFixed(2) : (Number(holding.quantity) * Number(holding.close_price))) / props.totalPortfolioValue) * 100).toFixed(2)}%</TableCell>
                  <TableCell id="average cost" align="right" className={classes.tableRowCell}>{!!holding.cost_basis && !!holding.quantity && (Number(holding.cost_basis) / Number(holding.quantity)).toFixed(3)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
        : (
          null
        )
      }
    </>
  )
}


