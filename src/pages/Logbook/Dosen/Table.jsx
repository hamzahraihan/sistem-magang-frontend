import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import useFetchMahasiswaByDosen from '../../../features/user/useFetchMahasiswaByDosen';
import { Link } from 'react-router-dom';
import { Spinner } from '../../../components/Icons';

const Table = () => {
  const { loading, mahasiswaDosen } = useFetchMahasiswaByDosen();
  const columnHelper = createColumnHelper();

  const data = mahasiswaDosen;
  console.log('🚀 ~ Table ~ data:', data);

  const columns = [
    columnHelper.accessor('', {
      id: 'S.No',
      cell: (info) => info.row.index + 1,
      header: () => <span className="ps-2">No.</span>,
    }),
    columnHelper.accessor('first_name', {
      cell: (info) => info.getValue(),
      header: 'Nama depan',
    }),
    columnHelper.accessor('last_name', {
      cell: (info) => info.getValue(),
      header: 'Nama Belakang',
    }),
    columnHelper.accessor('nim', {
      cell: (info) => info.getValue(),
      header: 'NIM',
    }),
    columnHelper.accessor('status', {
      cell: (info) => <div className={`rounded-lg p-2 text-center w-fit m-auto ${info.getValue() == 'Selesai magang' ? 'bg-green-400 text-white' : 'bg-gray-200'}`}>{info.getValue()}</div>,
      header: () => <span className="flex justify-center items-center">Status</span>,
    }),
    columnHelper.accessor('mahasiswa_id', {
      cell: (info) => (
        <Link to={`logbook-mahasiswa/${info.getValue()}`} className="flex p-2 bg-gray-300 rounded-lg m-auto text-center w-fit">
          Logbook
        </Link>
      ),
      header: () => <span className="flex justify-center items-center">Logbook</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 2,
      },
    },
  });

  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="bg-gray-100 rounded-md">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.headers.id}>
              {headerGroup.headers.map((header) => (
                <th className="text-start py-2 text-gray-400" key={header.index}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <div className="flex items-center justify-center text-center w-full">
              <Spinner />
            </div>
          ) : (
            <>
              {table.getRowModel().rows.length
                ? table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell, index) => (
                        <td className=" py-4" key={index}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                : null}
            </>
          )}
        </tbody>
      </table>
      {/* pagination */}
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

        <select className="px-1 p-0 rounded-md bg-transparent border-0 text-xs" value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
