import discordIcon from "../assets/discord-icon.svg";

const Search = ({ searchValue, handleSearchChange, handleOnKeyDown }) => {
  return (
    <div className="flex flex-row">
      <img src={discordIcon} alt="Discord Icon" className="h-[30px] mb-1 " />
      <input
        className="flex mx-3 max-w-[85%] w-[85%] outline-none "
        type="text"
        placeholder={"URL de invitación o ID de usuario"}
        onKeyDown={handleOnKeyDown}
        onChange={handleSearchChange}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
