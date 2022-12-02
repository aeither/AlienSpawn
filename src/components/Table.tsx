"use client";

import type { FC } from "react";
import React from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export type Tx = {
  block: number;
  fee: string;
  from: string;
  hash: string;
  time: string;
  to: string;
  value: string;
};

export type Txs = {
  txs: Tx[];
};

const columnHelper = createColumnHelper<Tx>();
// {address?.slice(0, 4)}...{address?.slice(-4)}
const columns = [
  columnHelper.accessor("block", {
    header: () => <span>Block</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("fee", {
    header: () => <span>Fee</span>,
  }),
  columnHelper.accessor("from", {
    header: () => <span>From</span>,
    cell: (info) =>
      `${info.getValue().slice(0, 4)}...${info.getValue().slice(-4)}`,
  }),
  columnHelper.accessor("hash", {
    header: () => <span>Hash</span>,
    cell: (info) =>
      `${info.getValue().slice(0, 4)}...${info.getValue().slice(-4)}`,
  }),
  columnHelper.accessor("time", {
    header: () => <span>Time</span>,
  }),
  columnHelper.accessor("to", {
    header: () => <span>To</span>,
    cell: (info) =>
      `${info.getValue().slice(0, 4)}...${info.getValue().slice(-4)}`,
  }),
  columnHelper.accessor("value", {
    header: () => <span>Value</span>,
  }),
];

const Table: FC<Txs> = ({ txs }) => {
  const [data, setData] = React.useState(() => [...txs]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full table-auto overflow-scroll">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};
export default Table;
