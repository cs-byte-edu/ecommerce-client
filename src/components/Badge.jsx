export const Badge = ({ title, content, children }) => {
  return (
    <div className="flex flex-col items-center font-normal text-sm cursor-pointer">
      <div className="relative">
        {children}
        <div className="absolute top-[-10px] right-[-15px] w-[25px] h-[25px] flex items-center justify-center rounded-full bg-[var(--c-secondary-light)] text-white">
          {content}
        </div>
      </div>
      <span className="">{title}</span>
    </div>
  );
};
