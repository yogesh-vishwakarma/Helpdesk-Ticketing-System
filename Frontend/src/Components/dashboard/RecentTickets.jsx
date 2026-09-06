import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 7;

function RecentTickets({ data = [] }) {
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
        <p className="py-8 text-center text-sm text-base-content/50">
          No recent tickets available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {currentTickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>
                    <div className="max-w-xs">
                      <p className="truncate font-medium">
                        {ticket.title || ticket.subject || "Untitled Ticket"}
                      </p>

                      <p className="truncate text-xs text-base-content/50">
                        #{ticket._id}
                      </p>
                    </div>
                  </td>

                  <td>{ticket.category || "-"}</td>

                  <td>
                    {ticket.priority ? (
                      <span className="badge badge-outline">
                        {ticket.priority}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td>
                    {ticket.status ? (
                      <span className="badge badge-primary badge-outline">
                        {ticket.status}
                      </span>
                    ) : (
                      "-"
                    )}
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

export default RecentTickets;