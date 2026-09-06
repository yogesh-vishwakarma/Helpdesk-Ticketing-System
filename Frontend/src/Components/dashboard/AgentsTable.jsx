import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 7;

function AgentsTable({ data = [] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const currentAgents = useMemo(() => {
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
          No agents available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Email</th>
                <th>Assigned Tickets</th>
              </tr>
            </thead>

            <tbody>
              {currentAgents.map((agent) => (
                <tr key={agent._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="w-10 rounded-full bg-primary text-primary-content">
                          <span className="font-semibold">
                            {agent.name?.charAt(0)?.toUpperCase() || "A"}
                          </span>
                        </div>
                      </div>

                      <span className="font-medium">
                        {agent.name || "Unknown"}
                      </span>
                    </div>
                  </td>

                  <td>{agent.email || "-"}</td>

                  <td>
                    <span className="badge badge-info">
                      {agent.totalTickets || 0}
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

export default AgentsTable;