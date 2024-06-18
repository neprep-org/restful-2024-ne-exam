import { ReactComponent as DashboardLogoSVG } from "../assets/logo.svg";
const name = 10;
const DashboardLogo = () => {
  return (
    <div className=" flex justify-center items-center">
      <DashboardLogoSVG height={100} width={150} />
    </div>
  );
};

export default DashboardLogo;
