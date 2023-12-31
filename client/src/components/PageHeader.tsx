import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

type PageHeaderProps = {
  pageHeaderName: string;
};

const PageHeader = ({ pageHeaderName }: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex font-bold text-2xl gap-3 items-center pt-3">
      <BiLeftArrowAlt
        className="text-3xl"
        onClick={() => {
          navigate(-1);
        }}
      />
      <p>{pageHeaderName}</p>
    </div>
  );
};

export default PageHeader;
