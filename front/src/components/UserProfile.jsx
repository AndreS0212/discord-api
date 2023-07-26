import discordIcon from "../assets/discord-icon.svg";
const UserProfile = ({ userData }) => {
  return (
    <div className="mt-6">
      <div
        className={`flex flex-row justify-evenly items-center mb-5
           `}
      >
        <img
          src={userData?.urlAvatar}
          alt="Avatar"
          className={`h-[105px] w-fit rounded-full `}
        />
        <div className="flex items-center ">
          <div className="flex flex-col align-middle">
            <div className="flex flex-col items-center justify-center">
              <p className="ms-1 text-md font-bold max-w-[230px]">
                ID: {userData?.id}
              </p>
            </div>
            <div className=" flex flex-col items-center justify-center mt-1">
              <div className="flex flex-row mb-1">
                <img src={discordIcon} alt="Discord Icon" className="h-6" />
                <p className="ms-1 text-xl font-bold max-w-[150px] truncate">
                  {userData?.username}
                </p>
              </div>
            </div>
            <p className="mt-1">
              Fecha de creación: {userData?.created_time.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
