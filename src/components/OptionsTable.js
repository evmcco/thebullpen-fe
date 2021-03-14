import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function OptionsTable(props) {
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
        <>
          <TableContainer className={classes.tableContainer} >
            <h1>Options</h1>
            <Table size="small" aria-label="options table">
              <TableHead className={classes.headerRow}>
                <TableRow>
                  <TableCell className={classes.headerRowCell}>Ticker</TableCell>
                  <TableCell align="right" className={classes.headerRowCell}>Ticker % Change</TableCell>
                  <TableCell align="right" className={classes.headerRowCell}>Expiration Date</TableCell>
                  <TableCell align="right" className={classes.headerRowCell}>Put/Call</TableCell>
                  <TableCell align="right" className={classes.headerRowCell}>Strike Price</TableCell>
                  <TableCell align="right" className={classes.headerRowCell}>Cost Basis</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.holdings.map((holding) => (
                  <TableRow key={holding.id}>
                    <TableCell id="ticker" className={classes.tableRowCell}>
                      {
                        <a
                          className={classes.tableRowCellLink}
                          target="_blank"
                          href={`https://finance.yahoo.com/quote/${holding.parsedTicker[1]}`}
                        >
                          {holding.parsedTicker[1]}
                        </a>}
                    </TableCell>
                    <TableCell id="% change" align="right" className={holding.quote?.changePercent > 0 ? classes.tableRowCellGreen : holding.quote?.changePercent < 0 ? classes.tableRowCellRed : classes.tableRowCell}>{!!holding.quote ? `${(Number(holding.quote.changePercent) * 100).toFixed(2)}%` : null}</TableCell>
                    <TableCell id="expiration date" align="right" className={classes.tableRowCell}>{`${holding.parsedTicker[4]}/${holding.parsedTicker[5]}/20${holding.parsedTicker[3]}`}</TableCell>
                    <TableCell id="put/call" align="right" className={classes.tableRowCell}>{holding.parsedTicker[6]}</TableCell>
                    <TableCell id="strike price" align="right" className={classes.tableRowCell}>${(Number(holding.parsedTicker[7]) / 1000).toFixed(2)}</TableCell>
                    <TableCell align="right" className={classes.tableRowCell}>{!!holding.cost_basis && !!holding.quantity && (Number(holding.cost_basis) / Number(holding.quantity)).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )
        : null
      }
    </>
  )
}


