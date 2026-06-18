"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
  value?: (row: T) => string | number;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchPlaceholder = "Search…",
  searchKeys,
  pageSize = 10,
  toolbar,
}: {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  pageSize?: number;
  toolbar?: React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      (searchKeys ?? (Object.keys(row) as (keyof T)[])).some((k) =>
        String(row[k]).toLowerCase().includes(q)
      )
    );
  }, [data, query, searchKeys]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * pageSize, current * pageSize);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
        {toolbar}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key} className={c.className}>
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((c) => (
                <TableCell key={c.key} className={c.className}>
                  {c.render
                    ? c.render(row)
                    : c.value
                    ? c.value(row)
                    : String((row as Record<string, unknown>)[c.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-12 text-center text-muted-foreground"
              >
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
        <span>
          Showing {rows.length} of {filtered.length}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={current <= 1}
            onClick={() => setPage(current - 1)}
          >
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <span className="px-2 font-medium text-foreground">
            {current} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={current >= totalPages}
            onClick={() => setPage(current + 1)}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
