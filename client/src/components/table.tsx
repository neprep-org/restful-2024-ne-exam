import React, { useState, useMemo, useEffect } from "react";
import Modal from "./modal";

type Column = {
  Header: string;
  accessor: string;
};

export type Data = {
  [key: string]: string | number | Date;
};

type TableProps = {
  columns: Column[];
  data: Data[];
};

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [currentPage, setCurrentPage] = useState(1); // Default page
  const [rowsPerPage] = useState(7); // Default number of rows per page
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Data[]>([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  /**
   * Takes table data and search query as an array
   * Return filtered data based on the search query
   * Search is performed on all columns
   */
  const filteredData = useMemo(() => {
    if (!searchQuery) return tableData;
    return tableData.filter((row) =>
      columns.some((column) =>
        String(row[column.accessor])
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  }, [tableData, searchQuery, columns]);

  /**
   * Takes filtered data as an array
   * Return all data from starting index up to the last page
   * Start Index is always updated based on the current page
   */
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleAddEntity = (newData: Data) => {
    setTableData([...tableData, newData]);
  };

  const renderPagination = () => {
    const pageNumbers: any = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pageNumbers.map((page, index) =>
      typeof page === "string" ? (
        <span key={index} className="px-2 py-1">
          {page}
        </span>
      ) : (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`px-2 py-1 ${
            page === currentPage
              ? "bg-primary text-white"
              : "bg-white border-primary border"
          } rounded text-sm`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded outline-none focus:border-primary text-sm w-[30%]"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm text-white bg-green-500 rounded"
        >
          Add Entity
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="bg-[#fefdfd] min-w-full p-4">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-8 py-6 text-sm text-center text-gray-700 border-b border-opacity-50 border-primary-light whitespace-nowrap"
                >
                  {column.Header}
                </th>
              ))}
              <th className="px-4 py-2 text-sm text-center text-gray-700 border-b border-opacity-50 border-primary-light whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="px-4 py-2 text-sm text-center text-gray-700 border-b border-opacity-50 border-primary-light whitespace-nowrap"
                    >
                      {String(
                        column.accessor === "createdAt"
                          ? new Date(
                              row[column.accessor] as string
                            ).toLocaleDateString()
                          : row[column.accessor]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-sm border-b border-opacity-50 border-primary-light whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 text-sm text-white rounded bg-primary-light">
                        Update
                      </button>
                      <button className="px-2 py-1 text-sm text-white bg-orange-300 rounded">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center mt-8 ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 text-sm bg-white border rounded border-primary disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex mx-4 space-x-2">{renderPagination()}</div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 text-sm bg-white border rounded border-primary disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddEntity}
      />
    </div>
  );
};

export default Table;
