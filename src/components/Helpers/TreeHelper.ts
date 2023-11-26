import { IFiles, SortOption } from "../../types/tree";

export const sortTree = (node: IFiles, sortOption: SortOption): IFiles => {
    if(node === null) return node;

    const sortedNode: IFiles = {
        ...node,
        // @ts-ignore÷
        files: node.files ? node.files.map(sortTree) : undefined,
    };

    // Sort the node's children based on the selected sort option
    if (sortedNode.files) {
        sortedNode.files.sort((a, b) => {
        switch (sortOption) {
            case SortOption.Name:
                return a.name.localeCompare(b.name);
            case SortOption.Added:
            return (a.added || '').localeCompare(b.added || '');
            case SortOption.Type:
            return a.type.localeCompare(b.type);
            default:
            return 0;
        }
        });
    }

    return sortedNode;
};
