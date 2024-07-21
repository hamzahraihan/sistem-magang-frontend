import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import ExportButton from './ExportButton';
import SearchTableInput from './SearchTableInput';
import { Dropdown, Spinner } from 'flowbite-react';
import { SearchIcon } from '../Icons';
import { useState } from 'react';
import PropTypes from 'prop-types';

const Table = ({ columns, data, fileName, loading }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([
    {
      id: 'Tanggal',
      desc: false,
    },
  ]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <>
      <div className="flex mb-2 gap-2 ">
        <div className="flex items-center gap-2">
          <div className="text-gray-400">
            <SearchIcon />
          </div>
          <SearchTableInput value={globalFilter ?? ''} onChange={(value) => setGlobalFilter(value)} />
        </div>
        <div className="flex gap-2 ms-auto">
          <div>
            <Dropdown color="gray" size="sm" label="Option" dismissOnClick={false}>
              {table.getAllLeafColumns().map((column) => {
                return (
                  <div className="p-2 hover:bg-gray-100 active:bg-gray-200 duration-150" key={column.id}>
                    <button type="button" className="flex gap-2 items-center w-full" onClick={column.getToggleVisibilityHandler()}>
                      <input
                        {...{
                          type: 'checkbox',
                          checked: column.getIsVisible(),
                          onChange: column.getToggleVisibilityHandler(),
                        }}
                      />{' '}
                      {column.id}
                    </button>
                  </div>
                );
              })}
            </Dropdown>
          </div>
          <ExportButton data={data} fileName={fileName} />
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-gray-100 rounded-xl">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="text-start py-2 text-gray-400 "
                  key={header.index}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  title={header.column.getCanSort() ? (header.column.getNextSortingOrder() === 'asc' ? 'Sort ascending' : header.column.getNextSortingOrder() === 'desc' ? 'Sort descending' : 'Clear sort') : undefined}
                  style={{ width: `${header.getSize()}px` }}
                >
                  <div className="flex p-2 items-center gap-1 hover:bg-gray-200 active:bg-gray-300 duration-150 rounded-md cursor-pointer select-none">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {
                      {
                        asc: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path
                              fillRule="evenodd"
                              d="M13.78 10.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l.97.97V5.75a.75.75 0 0 1 1.5 0v5.69l.97-.97a.75.75 0 0 1 1.06 0Z"
                              clipRule="evenodd"
                              stroke="gray"
                            />
                            <path
                              fillRule="evenodd"
                              d="M2.22 5.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V4.56l-.97.97a.75.75 0 0 1-1.06 0Z"
                              clipRule="evenodd"
                              stroke="black"
                            />
                          </svg>
                        ),
                        desc: (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                            <path
                              fillRule="evenodd"
                              d="M13.78 10.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l.97.97V5.75a.75.75 0 0 1 1.5 0v5.69l.97-.97a.75.75 0 0 1 1.06 0Z"
                              clipRule="evenodd"
                              stroke="black"
                            />
                            <path
                              fillRule="evenodd"
                              d="M2.22 5.53a.75.75 0 0 1 0-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v5.69a.75.75 0 0 1-1.5 0V4.56l-.97.97a.75.75 0 0 1-1.06 0Z"
                              clipRule="evenodd"
                              stroke="gray"
                            />
                          </svg>
                        ),
                      }[header.column.getIsSorted() ?? null]
                    }
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="m-auto text-center items-center justify-center p-10" colSpan={6}>
                <Spinner />
              </td>
            </tr>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <td className="ps-2 py-4" key={index}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-gray-400 text-center">
              <td className="p-10" colSpan={table.getAllColumns().length}>
                Tidak ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex items-center justify-end gap-2 h-fit">
        <button className="p-1 border border-gray-400 px-2 rounded-md disabled:opacity-30" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          {'<'}
        </button>
        <button className="p-1 border border-gray-400 px-2 rounded-md disabled:opacity-30" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        <span>
          <p className="font-bold">
            Showing page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
        </span>
        <span className="flex items-center gap-2">
          <p>| Page </p>
          <input
            className="rounded-md w-12 px-2 p-0 bg-transparent"
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>

        <select className="px-4 rounded-md bg-transparent border-0 text-xs" value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.any,
  fileName: PropTypes.string,
  loading: PropTypes.any,
};

export default Table;
