import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function MaterialUITable() {
  const [holdings, setHoldings] = useState([])



  useEffect(() => {
    const getHoldings = async () => {
      const response = await fetch('/holdings/user/1')
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



  if (!!holdings) {
    return (
      <TableContainer className={classes.tableContainer} >
        <Table aria-label="simple table">
          <TableHead className={classes.headerRow}>
            <TableRow>
              <TableCell>Ticker</TableCell>
              <TableCell align="right">Current Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Market Value</TableCell>
              <TableCell align="right">Cost Basis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holdings.map((holding) => (
              <TableRow key={holding.name}>
                <TableCell component="th" scope="row">
                  {holding.ticker_symbol}
                </TableCell>
                <TableCell align="right">{holding.institution_price}</TableCell>
                <TableCell align="right">{holding.quantity}</TableCell>
                <TableCell align="right">{holding.institution_value}</TableCell>
                <TableCell align="right">{holding.cost_basis}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

