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
          {["Budget", "CPU", "GPU", "RAM", "Memory Type", "Company", "Screen Type", "Resolution", "Weight", "Type", "Prediction"].map(
              (label) => (
                <TableCell>{label}</TableCell>
              )
            )}
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
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rectangular" />
            </TableCell>
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
