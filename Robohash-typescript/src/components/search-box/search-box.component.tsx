import './search-box.styles.css'
import { ChangeEvent } from 'react'

type ISearchBoxProps = {
    className: String;
    placeholder?: string;
    onChangeHandler: (event:ChangeEvent<HTMLInputElement>)=>void;
}

const SearchBox = ({ className, placeholder, onChangeHandler }: ISearchBoxProps) => (
    <input
        className={`search-box ${className}`}
        type='search'
        placeholder={placeholder}
        onChange={onChangeHandler}
    />
)

export default SearchBox