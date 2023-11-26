import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Filter from "./Filter";

describe("Filter", () => {
  it("renders Filter component correctly", () => {
    const filter = "test filter";
    const handleFilterChangeMock = jest.fn();

    render(
      <Filter filter={filter} handleFilterChange={handleFilterChangeMock} />
    );

    expect(screen.getByPlaceholderText("Filter files...")).toBeInTheDocument();
    expect(screen.getByTestId("filterInput")).toHaveValue(filter);
  });

  it("triggers handleFilterChange when input value changes", () => {
    const filter = "test filter";
    const handleFilterChangeMock = jest.fn();

    render(
      <Filter filter={filter} handleFilterChange={handleFilterChangeMock} />
    );

    fireEvent.change(screen.getByTestId("filterInput"), { target: { value: "new filter" } });

    expect(handleFilterChangeMock).toHaveBeenCalled();
  });
});
