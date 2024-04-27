"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

type CSVReadProps = { cols: any[]; rows: any[]; rawCSV: any[] };

export const CSVViewer: React.FC<{
  csvData: CSVReadProps;
  onLoadedCSV: (data: CSVReadProps) => void;
}> = ({ csvData, onLoadedCSV }) => {
  const dataArrayToObject = (rawRows: any[]) => {
    if (rawRows?.length === 0) {
      return;
    }
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

  if (csvData?.cols.length === 0 && csvData?.rows.length === 0) {
    onLoadedCSV(dataArrayToObject(csvData?.rawCSV) as CSVReadProps);
  }

  return (
    <div>
      {csvData?.cols.length > 0 && csvData?.rows.length > 0 && (
        <Table
          aria-label="CSV Viewer"
          className=""
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
