import React from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  Button,
} from "@mui/material";

function DatasetTable({ data }) {
  return (
    <Table
      size="small"
      sx={{ width: "100%", height: "auto", margin: "0 auto" }}
    >
      <TableHead size="small">
        <TableRow>
          <TableCell size="small">Code</TableCell>
          <TableCell size="small">Name</TableCell>
          <TableCell size="small">action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody size="small">
        {data.length === 0 ? (
          <TableRow>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
          </TableRow>
        ) : (
          data.map((data) => (
            <TableRow aria-labelledby={data.kode}>
              <TableCell size="small">{data.kode}</TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>
                <Button variant="outlined" color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default DatasetTable;
