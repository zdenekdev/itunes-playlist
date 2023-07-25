import { debounce } from "lodash-es";
import { useCallback, useRef, useState } from "react";
import "../styles/TheForm.scss";
import Spinner from "react-spinkit";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { MusicalNoteIcon } from "@heroicons/react/24/outline";

interface searchTerm {
  getSearchTerm: (term: string) => void;
  loading: string;
  emptySearch: string;
}

function TheForm(props: searchTerm) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState(false);

  const handleChange = () => {
    let input = inputRef.current!.value.trim().toString();
    if (input.length > 0) {
      setInputText(true);
    } else {
      setInputText(false);
    }

    debouncedSearchForMusic();
  };

  const searchForMusic = (): void => {
    let input = inputRef.current!.value.trim().toString();

    if (input.length > 1) {
      props.getSearchTerm(input);
    }
  };

  const debouncedSearchForMusic = useCallback(
    debounce(() => {
      searchForMusic();
    }, 500),
    []
  );
  const handleSubmit = (e: React.FormEvent) => {
    inputRef.current!.blur();
    e.preventDefault();
    searchForMusic();
  };

  const deleteInput = () => {
    inputRef.current!.value = "";
    setInputText(false);
    inputRef.current!.focus();
  };

  return (
    <div className="form-container">
      <div className="form-spinner">
        <form className="theform" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Hledat píseň, interpreta nebo album"
            onChange={handleChange}
            ref={inputRef}
            autoComplete="off"
          />
          <button type="submit">
            <MagnifyingGlassIcon className="search-icon" />
          </button>
          {inputText && (
            <XMarkIcon className="delete-icon" onClick={deleteInput} />
          )}
        </form>
        <Spinner
          className={props.loading}
          name="three-bounce"
          fadeIn="none"
          color="white"
        />
      </div>
      <div className={props.emptySearch}>
        <div className="empty-div">
          <MusicalNoteIcon className="note-icon" />
          <div>
            <h2>Nic jsme nenašli</h2>
            <p>Zkuste prosím hledaný výraz upravit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheForm;
