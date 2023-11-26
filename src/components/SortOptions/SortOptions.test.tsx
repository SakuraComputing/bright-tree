import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SortOptions from "./SortOptions";
import { SortOption } from "../../data/files";

describe("SortOptions", () => {
  it("renders SortOptions component correctly", () => {
    const sortOption = SortOption.Name;
    const onSortChangeMock = jest.fn();

    render(
      <SortOptions sortOption={sortOption} onSortChange={onSortChangeMock} />
    );

    expect(screen.getByText("Sort by:")).toBeInTheDocument();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeChecked();

    expect(screen.getByLabelText("Added")).toBeInTheDocument();
    expect(screen.getByLabelText("Added")).not.toBeChecked();

    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Type")).not.toBeChecked();
  });

  it("triggers onSortChange when a radio button is clicked", () => {
    const sortOption = SortOption.Name;
    const onSortChangeMock = jest.fn();

    render(
      <SortOptions sortOption={sortOption} onSortChange={onSortChangeMock} />
    );

    fireEvent.click(screen.getByLabelText("Added"));
    
    expect(onSortChangeMock).toHaveBeenCalledWith(SortOption.Added);
  });
});
