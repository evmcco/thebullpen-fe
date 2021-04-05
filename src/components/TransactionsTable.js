import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

export default function TransactionsTable(props) {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/user/${props.username}`)
      const data = await response.json()
      setTransactions(data)
    }
    getTransactions()
  }, []
  )

  const useStyles = makeStyles((theme) => ({
    card: {
      backgroundColor: theme.palette.grey[800],
      margin: '1em 5% 0 5%',
      maxWidth: '90%',
    },
    tableContainer: {
    },
    tableTitle: {
      borderBottom: 'solid 1px',
      color: theme.palette.grey[50],
      marginTop: 0
    },
    headerRow: {
      background: theme.palette.navy,
    },
    headerRowCell: {
      color: theme.palette.grey[50]
    },
    tableRowCell: {
      color: theme.palette.grey[50]
    },
    tableRowCellLink: {
      color: theme.palette.grey[50]
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
      {transactions && transactions.length > 0 ? (
        <Card className={classes.card}>
          <CardContent>
            <TableContainer className={classes.tableContainer} >
              <h2 className={classes.tableTitle}>Transactions</h2>
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
                  {transactions.map((transaction) => (
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
          </CardContent>
        </Card>
      )
        : (
          null
        )
      }
    </>
  )
}


