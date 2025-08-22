export const ProductOverlay = ({ children }) => {
  return (
    <div className="absolute pt-[16px] pr-[24px] hidden group-hover/product:flex flex-col items-end gap-[10px] top-0 right-0 bottom-0 left-0 bg-[var(--c-green-50)]">
      {children}
    </div>
  );
};
