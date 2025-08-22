import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const Search = ({ onChange }) => {
  return (
    <form className="flex items-center flex-grow p-[.25rem] rounded-[4px] border-[1px] border-white bg-white">
      <input
        type="text"
        placeholder="Search..."
        className="w-full h-[45px] pr-[15px] pl-[15px]"
        onChange={onChange}
      />
      <button className="flex items-center justify-center w-[45px] h-[45px] rounded-[4px] bg-white cursor-pointer">
        <MagnifyingGlassIcon className="size-5 text-blue-500" />
      </button>
    </form>
  );
};
