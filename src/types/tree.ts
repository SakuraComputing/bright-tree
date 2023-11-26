export type IFiles = {
    type: string;
    name: string;
    files?: IFiles[];
    added?: string;
};

export enum SortOption {
    Name = 'name',
    Added = 'added',
    Type = 'type'
};
  
