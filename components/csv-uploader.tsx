"use client";

import { SetStateAction, useEffect, useRef, useState } from "react";
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
import { Icon } from "@iconify/react";

type CSVReadProps = { cols: any[]; rows: any[]; rawCSV: any[] };

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

    return { cols, rows, rawCSV: rawRows };
  };

  // reactCSV can't be triggered by a NextUI Button,
  // so I'm creating a hidden button to trigger the file upload
  const hiddenUploadButtonRef = useRef(null);

  const onHiddenButtonClick = () => {};

  const handleTriggerClick = () => {
    if (hiddenUploadButtonRef.current) {
      hiddenUploadButtonRef.current.click();
    }
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
            {}
            <div className="flex space-x-1 my-4 items-center">
              <button
                hidden={true}
                onClick={onHiddenButtonClick}
                ref={hiddenUploadButtonRef}
                type="button"
                {...getRootProps()}
              ></button>
              <Button
                onClick={handleTriggerClick}
                startContent={<Icon icon="tabler:upload" />}
              >
                Browse file
              </Button>
              <div>{acceptedFile && acceptedFile.name}</div>
            </div>
          </>
        )}
      </CSVReader>

      {csvData.cols.length > 0 && csvData.rows.length > 0 && (
        <Table aria-label="CSV Viewer" className="flex-1 h-full">
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
