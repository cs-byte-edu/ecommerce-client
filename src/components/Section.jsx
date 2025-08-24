const Section = ({ sectionHeader, children }) => {
  return (
    <section className="lg:pt-[60px] lg:pb-[60px] box">
      {sectionHeader?.section_heading && (
        <h2 className="lg:text-3xl font-semibold mb-[20px]">
          {sectionHeader?.section_heading}
        </h2>
      )}

      {sectionHeader?.section_description && (
        <p className="text-xl font-semibold mb-[36px]">
          {sectionHeader?.section_description}
        </p>
      )}
      {children}
    </section>
  );
};

export default Section;
