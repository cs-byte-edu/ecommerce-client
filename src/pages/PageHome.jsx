import { usePageData } from "../hooks/usePageData";
import { Spiner } from "../components/Spiner";
import { PageBuilder } from "../components/PageBuilder";

export const PageHome = () => {
  const {
    data: pageData,
    loading,
    error,
  } = usePageData("dynamic", "page-main");

  if (loading) return <Spiner />;
  if (error) return <div>{error.message}</div>;
  console.log("home data: ", pageData);
  return <PageBuilder pageData={pageData?.main_content} />;
};
