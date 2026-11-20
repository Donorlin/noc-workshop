import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable, type DataTableColumn } from "./DataTable";

interface Row {
  id: string;
  name: string;
  room?: string | null;
}

const rows: Row[] = Array.from({ length: 23 }, (_, index) => ({
  id: String(index + 1),
  name: `Session ${String(index + 1).padStart(2, "0")}`,
  room: index === 0 ? null : `R${index}`,
}));

const columns: DataTableColumn<Row>[] = [
  { id: "name", header: "Name", accessor: "name", sortable: true },
  { id: "room", header: "Room", accessor: "room" },
];

const bodyRows = () => screen.getAllByRole("row").slice(1);

describe("DataTable", () => {
  it("shows 10 rows per page, the result count and an empty placeholder for missing values", () => {
    render(<DataTable columns={columns} data={rows} getRowId={(row) => row.id} />);

    expect(bodyRows()).toHaveLength(10);
    expect(screen.getByText("23 results")).toBeInTheDocument();
    expect(screen.getByText("Showing 1–10 of 23")).toBeInTheDocument();
    expect(bodyRows()[0]).toHaveTextContent("Session 01–");
  });

  it("pages client-side and reports the page when controlled", async () => {
    const onPageChange = vi.fn();
    const { rerender } = render(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        pageIndex={0}
        onPageChange={onPageChange}
      />,
    );

    await userEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onPageChange).toHaveBeenCalledWith(2);

    rerender(
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        pageIndex={2}
        onPageChange={onPageChange}
      />,
    );
    expect(bodyRows()).toHaveLength(3);
    expect(screen.getByText("Showing 21–23 of 23")).toBeInTheDocument();
  });

  it("does not slice data when rowCount switches to server-side pagination", () => {
    render(<DataTable columns={columns} data={rows.slice(0, 10)} rowCount={95} getRowId={(row) => row.id} />);

    expect(bodyRows()).toHaveLength(10);
    expect(screen.getByText("95 results")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 10" })).toBeInTheDocument();
  });

  it("sorts by a sortable column", async () => {
    render(<DataTable columns={columns} data={rows} getRowId={(row) => row.id} />);

    await userEvent.click(screen.getByRole("button", { name: /Name/ }));
    await userEvent.click(screen.getByRole("button", { name: /Name/ }));

    expect(bodyRows()[0]).toHaveTextContent("Session 23");
    expect(screen.getByRole("columnheader", { name: /Name/ })).toHaveAttribute("aria-sort", "descending");
  });

  it("opens a row by click and keyboard", async () => {
    const onRowClick = vi.fn();
    render(<DataTable columns={columns} data={rows} getRowId={(row) => row.id} onRowClick={onRowClick} />);

    await userEvent.click(screen.getByText("Session 02"));
    bodyRows()[2]!.focus();
    await userEvent.keyboard("{Enter}");

    expect(onRowClick).toHaveBeenNthCalledWith(1, rows[1]);
    expect(onRowClick).toHaveBeenNthCalledWith(2, rows[2]);
  });

  it("renders the empty state without pagination", () => {
    render(<DataTable columns={columns} data={[]} getRowId={(row) => row.id} emptyState="Nothing here" />);

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Pagination" })).not.toBeInTheDocument();
  });
});
