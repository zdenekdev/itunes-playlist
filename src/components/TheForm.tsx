import { debounce } from "lodash-es";
import { useRef } from "react";
import "./TheForm.scss";
import Spinner from "react-spinkit";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface searchTerm {
  getSearchTerm: (term: string) => void;
  loading: string;
  emptySearch: string;
}

function TheForm(props: searchTerm) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = debounce(() => {
    searchForMusic();
  }, 500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchForMusic();
  };

  const searchForMusic = (): void => {
    let input = inputRef.current!.value.toString();
    if (input.length > 2) {
      props.getSearchTerm(input);
    }
  };

  return (
    <div className="formContainer">
      <form className="theform" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="hledat píseň nebo interpreta..."
          onChange={handleChange}
          ref={inputRef}
        />
        <button type="submit">
          <MagnifyingGlassIcon className="searchIcon" />
        </button>
      </form>
      <Spinner
        className={props.loading}
        name="three-bounce"
        fadeIn="none"
        color="white"
      />
      <div className={props.emptySearch}>
        <div className="emptyDiv">
          <MagnifyingGlassIcon className="searchIcon" />
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
