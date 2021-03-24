import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function TransactionsTable(props) {
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
      {props.transactions && props.transactions.length > 0 ? (
        <TableContainer className={classes.tableContainer} >
          <h1>Transactions</h1>
          <Table size="small" aria-label="holdings table">
            <TableHead className={classes.headerRow}>
              <TableRow>
                <TableCell className={classes.headerRowCell}>Ticker</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Date</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Direction</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Price</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Current Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell id="ticker" className={classes.tableRowCell}>
                    {(transaction.type == 'etf' || transaction.type == 'equity') ?
                      <a
                        className={classes.tableRowCellLink}
                        target="_blank"
                        href={`https://finance.yahoo.com/quote/${transaction.ticker_symbol}`}
                      >
                        {transaction.ticker_symbol}
                      </a> :
                      !!transaction.unofficial_currency_code ? transaction.unofficial_currency_code : transaction.ticker_symbol}
                  </TableCell>
                  <TableCell id="date" align="right" className={classes.tableRowCell}>{!!transaction.date && transaction.date}</TableCell>
                  <TableCell id="direction" align="right" className={transaction.txn_type == 'buy' ? classes.tableRowCellGreen : transaction.txn_type == 'sell' ? classes.tableRowCellRed : classes.tableRowCell}>{!!transaction.txn_type && transaction.txn_type}</TableCell>
                  <TableCell id="price" align="right" className={classes.tableRowCell}>{!!transaction.price && Number(transaction.price).toFixed(3)}</TableCell>
                  <TableCell id="current price" align="right" className={classes.tableRowCell}>{!!transaction.quote?.latestPrice ? transaction.quote.latestPrice : transaction.close_price}</TableCell>
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


