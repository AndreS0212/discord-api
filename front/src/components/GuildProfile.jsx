import discordIcon from "../assets/discord-icon.svg";
const GuildProfile = ({ guildData }) => {
  return (
    <div className="mt-4">
      <div
        className={`flex flex-row justify-evenly items-center mb-5
           `}
      >
        <a href={guildData?.url} target="_blank" rel="noopener noreferrer">
          <img
            src={guildData?.urlAvatar}
            alt="Avatar"
            className={`h-[120px] w-fit rounded-full `}
          />
        </a>
        <div className="flex items-center ">
          <div className="flex flex-col align-middle">
            <div className=" flex flex-col items-center justify-center ">
              <a
                href={guildData?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex flex-col mb-2 items-center">
                  <img src={discordIcon} alt="Discord Icon" className="h-6" />
                  <p className="ms-1 text-xl font-bold max-w-[150px] text-center">
                    {guildData?.name}
                  </p>
                </div>
              </a>
            </div>
            <p className="ms-1 text-[14px] text-center max-w-[220px] line-clamp-2">
              {guildData.description || "Este servidor no tiene descripción."}
            </p>
            <div className="flex flex-col items-center justify-center mt-1">
              <div className="flex flex-row items-center ">
                <div className="w-3 h-3 rounded-full bg-white mr-1"></div>
                <p className="text-[14px]">
                  {guildData?.members.toLocaleString()} miembros
                </p>
              </div>
              <div className="mt-1 flex flex-row items-center ">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                <p className=" text-[14px]">
                  {guildData?.online.toLocaleString()} en línea
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="w-full mt-1 bg-blue-500 h-[50px] ">
        <a href={guildData?.url} target="_blank" rel="noopener noreferrer">
          Unirse al servidor
        </a>
      </button>
    </div>
  );
};
export default GuildProfile;
