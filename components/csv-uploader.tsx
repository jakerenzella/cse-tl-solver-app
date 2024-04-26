"use client";

import { SetStateAction, useState } from "react";
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

export const CSVUploader = () => {
  const { CSVReader } = useCSVReader();

  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [cols, setCols] = useState<any[]>([]);

  const dataArrayToRows = (results: any[]) => {
    // a function which takes an array of arrays and returns an array of objects
    // each object has keys from the first array and values from the corresponding index in the other arrays
    // ensure there is a .key property on all objects
    const keys = results[0];
    return results.slice(1).map((row, i) => {
      const obj: any = {};
      row.forEach((value: string, index: number) => {
        obj.key = i;
        obj[keys[index]] = value;
      });
      return obj;
    });
  };

  const dataArrayToCols = (rows: any[]) => {
    // a function which takes an array of arrays and returns an array of objects
    // each object has keys from the first array and values from the corresponding index in the other arrays
    // ensure there is a .key property on all objects
    const keys = rows;
    return keys.map((key: string, i: number) => {
      return { key, label: key };
    });
  };

  return (
    <div>
      <CSVReader
        onUploadAccepted={(results: any) => {
          console.log(dataArrayToRows(results.data));
          console.log(dataArrayToCols(results.data[0]));
          setRows(dataArrayToRows(results.data));
          setCols(dataArrayToCols(results.data[0]));
          setIsLoading(false);
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }: any) => (
          <>
            <div>
              <button type="button" {...getRootProps()}>
                Browse file
              </button>
              <div>{acceptedFile && acceptedFile.name}</div>
              <button {...getRemoveFileProps()}>Remove</button>
            </div>
            <ProgressBar />
          </>
        )}
      </CSVReader>
      {/* onlyt show if there's data */}
      {!isLoading && (
        <Table aria-label="Example table with dynamic content" className="max-w-7xl max-h-dvh">
          <TableHeader columns={cols}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows} emptyContent={"No data found"}>
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
