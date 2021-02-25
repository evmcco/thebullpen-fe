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
      background: 'lightgrey',
    }
  }));

  const classes = useStyles();

  return (
    <>
      {holdings ? (
        <TableContainer className={classes.tableContainer} >
          <Table aria-label="simple table">
            <TableHead className={classes.headerRow}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Ticker</TableCell>
                <TableCell align="right">% Change</TableCell>
                <TableCell align="right">Current Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Market Value</TableCell>
                <TableCell align="right">Cost Basis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {holdings.map((holding) => (
                <TableRow key={holding.id}>
                  <TableCell component="th" scope="row">{holding.name}</TableCell>
                  <TableCell align="right">{holding.ticker_symbol}</TableCell>
                  <TableCell align="right">{!!holding.quote.changePercent ? holding.quote.changePercent : null}</TableCell>
                  <TableCell align="right">{holding.institution_price}</TableCell>
                  <TableCell align="right">{holding.quantity}</TableCell>
                  <TableCell align="right">{holding.institution_value}</TableCell>
                  <TableCell align="right">{holding.cost_basis}</TableCell>
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


