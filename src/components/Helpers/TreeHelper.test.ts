import { sortTree } from "./TreeHelper"; // Replace with the actual path to your file
import { IFiles, SortOption } from "../../types/tree";

describe("sortTree function", () => {
  it("should sort files based on the selected sort option name", () => {
    // Arrange
    const inputNode: IFiles = {
      name: "root",
      type: "folder",
      files: [
        { name: "fileC", type: "file", added: "2023-01-01" },
        { name: "fileA", type: "file", added: "2023-01-03" },
        { name: "fileB", type: "file", added: "2023-01-02" },
      ],
    };

    const expectedSortedNode: IFiles = {
      name: "root",
      type: "folder",
      files: [
        { name: "fileA", type: "file", added: "2023-01-03" },
        { name: "fileB", type: "file", added: "2023-01-02" },
        { name: "fileC", type: "file", added: "2023-01-01" },
      ],
    };

    const sortOption = SortOption.Name;
    const result = sortTree(inputNode, sortOption);

    expect(result).toEqual(expectedSortedNode);
  });
});
