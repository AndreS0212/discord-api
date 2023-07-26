import { useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";
import discordIcon from "./assets/discord-icon.svg";
import { useMutation } from "@tanstack/react-query";
import GuildProfile from "./components/GuildProfile";

function App() {
  //url o usuario a buscar
  const [searchValue, setSearchValue] = useState("");
  //info de steam que llega del backend
  const [discordInfo, setDiscordInfo] = useState({});
  //destructuring de la info de discord
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  //si se apreta enter se hace el fetch
  const handleOnKeyDown = async (e) => {
    if (e.key === "Enter") {
      mutate();
    } else {
      return;
    }
  };

  //fetch a la api
  const { mutate, isLoading, isIdle, error, data } = useMutation(
    ["discord", searchValue],
    async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/discord`,
        { url: searchValue },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_BACKEND_TOKEN}`,
          },
        }
      );
      return data;
    },
    {
      onSuccess: ({ data }) => {
        setDiscordInfo(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <div
      //Si isIdle o isLoading es true se muestra el div de busqueda sino se muestra el perfil
      className={`${
        isIdle || isLoading
          ? "flex flex-col max-h-[190px]  rounded-xl  bg-white text-black"
          : `${
              discordInfo.type === "guild" ? "h-[290px]" : "h-[190px]"
            } rounded-xl text-white bg-[#171a21]`
      } mx-auto my-12 p-4 max-w-[390px]   shadow-2xl rounded-3x `}
      // Set inline style for the background color based on userData?.color
    >
      {isLoading ? (
        <p className="text-black text-center">Loading...</p>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full">
          <img src={discordIcon} alt="" className="h-12 mb-1" />
          <p className="text-2xl text-black text-center">
            ID de usuario de discord incorrecto.
          </p>
        </div>
      ) : data ? (
        // Use a conditional statement to render the appropriate component
        discordInfo.type === "user" ? (
          <UserProfile userData={discordInfo} />
        ) : discordInfo.type === "guild" ? (
          <GuildProfile guildData={discordInfo} />
        ) : (
          <p className="text-black text-center">Invalid type data</p>
        )
      ) : (
        <Search
          searchValue={searchValue}
          handleSearchChange={handleSearchChange}
          handleOnKeyDown={handleOnKeyDown}
        />
      )}
    </div>
  );
}

export default App;
