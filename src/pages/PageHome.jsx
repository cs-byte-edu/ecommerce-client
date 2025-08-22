import { usePageData } from "../hooks/usePageData";
import { Spiner } from "../components/Spiner";
// import { PageBuilder } from "../components/PageBuilder";

export const PageHome = () => {
  const { data, loading, error } = usePageData("dynamic", "page-main");

  if (loading) return <Spiner />;
  if (error) return <div>{error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
  // return <PageBuilder pageData={pageData} />;
};
