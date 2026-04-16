"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  searchable?: boolean;
  pageSize?: number;
}

export default function DataTable({
  columns,
  data,
  searchable = true,
  pageSize = 10,
}: DataTableProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  return (
    <div>
      {/* Search */}
      {searchable && (
        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Ara..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-light-gray rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-light-gray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-light-gray bg-cream/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left px-4 py-3 font-medium text-muted text-xs uppercase tracking-wider"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-muted"
                  >
                    Kayıt bulunamadı.
                  </td>
                </tr>
              ) : (
                paged.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-light-gray/50 hover:bg-cream/30 transition-colors"
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-primary">
                        {col.render
                          ? col.render(row[col.key], row)
                          : (String(row[col.key] ?? "") )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-light-gray">
            <span className="text-xs text-muted">
              {filtered.length} kayıttan {start + 1}-
              {Math.min(start + pageSize, filtered.length)} arası
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-3 py-1 text-xs font-medium">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
