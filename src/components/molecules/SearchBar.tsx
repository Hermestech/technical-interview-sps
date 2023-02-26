import * as React from 'react';

type SearchBarProps = {
    onSearch: (value: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => { 
    return (
        <div>
            <input type="text" onChange={(e) => onSearch(e.target.value)} />
        </div>
    )
}