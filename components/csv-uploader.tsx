"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { useCSVReader } from "react-papaparse";

type CSVReadProps = { cols: any[]; rows: any[], rawCSV: any[] };

export const CSVUploader: React.FC<{
  csvData: CSVReadProps;
  onLoadedCSV: (data: CSVReadProps) => void;
}> = ({ csvData, onLoadedCSV }) => {

  const { CSVReader } = useCSVReader();

  const dataArrayToObject = (rawRows: any[]) => {
    // get the cols
    const colKeys = rawRows[0];
    const cols = colKeys.map((key: string, i: number) => {
      return { key, label: key };
    });

    // get the rows
    const rows = rawRows.slice(1).map((row, i) => {
      const obj: any = {};
      row.forEach((value: string, index: number) => {
        obj.key = i;
        obj[colKeys[index]] = value;
      });
      return obj;
    });

    return { cols, rows, rawCSV: rawRows};
  };

  return (
    <div>
      <CSVReader
        onUploadAccepted={(results: any) => {
          onLoadedCSV(dataArrayToObject(results.data));
        }}
      >
        {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
          <>
            <div>
              <button type="button" {...getRootProps()}>
                Browse file
              </button>
              <div>{acceptedFile && acceptedFile.name}</div>
              <button {...getRemoveFileProps()}>Remove</button>
            </div>
          </>
        )}
      </CSVReader>

      {csvData.cols.length > 0 && csvData.rows.length > 0 && (
        <Table
          aria-label="Example table with dynamic content"
          className="max-w-7xl max-h-dvh"
        >
          <TableHeader columns={csvData.cols}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={csvData.rows} emptyContent={"No data found"}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
