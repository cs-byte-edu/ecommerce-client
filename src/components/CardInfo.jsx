const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CardInfo = ({ data, className }) => {
  console.log("Card Info: ", data);

  return (
    <div
      className={`${className} flex flex-col justify-between lg:py-[20px] flex-[1_1_25%] py-[16px] px-[20px] rounded-[4px] nth-[1]:bg-[var(--c-blue-30)] nth-[2]:bg-[var(--c-red-10)] nth-[3]:bg-[var(--c-green-50)] nth-[4]:bg-[var(--c-purple-30)]`}
    >
      {data?.name && (
        <h3 className="text-2xl font-semibold mb-[10px]">{data.name}</h3>
      )}

      {data?.description && <p className="mb-[16px]">{data.description}</p>}

      {data?.media?.url && (
        <img
          src={`${BASE_URL}${data.media.url}`}
          className="w-[70px] object-contain"
        />
      )}
    </div>
  );
};
