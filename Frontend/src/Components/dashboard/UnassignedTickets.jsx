import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 7;

function UnassignedTickets({ data = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const currentTickets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return data.slice(start, start + ITEMS_PER_PAGE);
  }, [data, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      {data.length === 0 ? (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-xl text-success">
            ✓
          </div>

          <p className="mt-3 font-medium">Everything is assigned</p>

          <p className="mt-1 text-sm text-base-content/50">
            There are no unassigned tickets.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentTickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>
                    <p className="max-w-xs truncate font-medium">
                      {ticket.title || ticket.subject || "Untitled Ticket"}
                    </p>
                  </td>

                  <td>{ticket.category || "-"}</td>

                  <td>{ticket.priority || "-"}</td>

                  <td>
                    <span className="badge badge-error badge-outline">
                      Unassigned
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default UnassignedTickets;