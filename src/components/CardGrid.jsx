import { CardInfo } from "./CardInfo";

const CardGrid = ({ data }) => {
  console.log("cardGridData: ", data);
  // return null;
  return (
    <section className="lg:pt-[60px] lg:pb-[60px] box">
      {data?.section_heading && (
        <h2 className="lg:text-3xl font-semibold mb-[20px]">
          {data?.section_heading}
        </h2>
      )}
      <div className="flex gap-[20px]">
        {data?.card_items.map((cardItem) => (
          <CardInfo key={cardItem.documentId} data={cardItem} />
        ))}
      </div>
    </section>
  );
};

export default CardGrid;
