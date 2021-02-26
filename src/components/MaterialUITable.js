import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useAuth0 } from "@auth0/auth0-react";

export default function MaterialUITable(props) {
  const [holdings, setHoldings] = useState([])

  useEffect(() => {
    const getHoldings = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/holdings/user/${props.username}`)
      const data = await response.json()
      data.sort((a, b) => {
        if (a.type == 'cash') {
          return 1
        } else if (b.type == 'cash') {
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
      {holdings ? (
        <TableContainer className={classes.tableContainer} >
          <Table aria-label="simple table">
            <TableHead className={classes.headerRow}>
              <TableRow>
                {/* <TableCell className={classes.headerRowCell}>Name</TableCell> */}
                <TableCell className={classes.headerRowCell}>Ticker</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>% Change</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Current Price</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Quantity</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Market Value</TableCell>
                <TableCell align="right" className={classes.headerRowCell}>Cost Basis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow key={holding.id}>
                  {/* <TableCell component="th" scope="row" className={classes.tableRowCell}>{holding.name}</TableCell> */}
                  <TableCell className={classes.tableRowCell}><a className={classes.tableRowCellLink} target="_blank" href={`https://finance.yahoo.com/quote/${holding.ticker_symbol}`}>{holding.ticker_symbol}</a></TableCell>
                  <TableCell align="right" className={holding.quote?.changePercent > 0 ? classes.tableRowCellGreen : holding.quote?.changePercent < 0 ? classes.tableRowCellRed : classes.tableRowCell}>{!!holding.quote ? `${(Number(holding.quote.changePercent) * 100).toFixed(2)}%` : null}</TableCell>
                  <TableCell align="right" className={classes.tableRowCell}>{!!holding.quote?.latestPrice ? holding.quote.latestPrice : holding.institution_price}</TableCell>
                  <TableCell align="right" className={classes.tableRowCell}>{holding.quantity}</TableCell>
                  <TableCell align="right" className={classes.tableRowCell}>{!!holding.quote?.latestPrice ? (Number(holding.quantity) * holding.quote.latestPrice).toFixed(2) : holding.institution_value}</TableCell>
                  <TableCell align="right" className={classes.tableRowCell}>{Number(holding.cost_basis).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
        : (
          <h1>Loading...</h1>
        )
      }
    </>
  )
}


