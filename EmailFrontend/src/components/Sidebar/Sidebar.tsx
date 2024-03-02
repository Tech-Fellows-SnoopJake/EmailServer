import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@nextui-org/react";
import iconFolderSvg from "../../assets/createfolder.svg";

const Sidebar: React.FC = () => {
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState<string[]>([]);
  const [showInput, setShowInput] = useState(false);

  const handleCreateFolder = async () => {
    try {
      // Realiza una solicitud POST al backend para crear la carpeta
      console.log("Folder name:", folderName);
      const response = await axios.post("http://34.227.46.194:8000/", {
        name: folderName,
      });
      // Si la creación es exitosa, actualiza el estado de las carpetas con la nueva carpeta
      setFolders((prevFolders) => [...prevFolders, folderName]);
      // Si la creación es exitosa, puedes hacer algo como recargar la lista de carpetas
      console.log("Folder created successfully:", response.data);
      // Aquí podrías recargar la lista de carpetas si es necesario

      // Oculta el input después de crear la carpeta
      setShowInput(false);
      setFolderName("");
    } catch (error) {
      console.error("Failed to create folder:", error);
      // Manejar errores de creación de carpeta
    }
  };

  const handleFolderNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFolderName(event.target.value);
  };

  return (
    <aside className="sidebar w-56 bg-gray-100 p-4 h-screen border-1 border-r-gray-200 flex-[0_0_250px]">
      <nav>
        <div className="mb-4">
          <Link
            to="/compose"
            className="block px-4 py-2 bg-purple-700 text-white font-bold rounded-md text-center hover:bg-purple-600"
          >
            Compose Email
          </Link>
        </div>
        <ul className="list-none p-0">
          <li className="py-2 hover:bg-gray-200">
            <Link to="/inbox" className="text-gray-700 hover:text-purple-700 ">
              Inbox
            </Link>
          </li>
          <li className="py-2 hover:bg-gray-200">
            <Link to="/sent" className="text-gray-700 hover:text-purple-700">
              Sent
            </Link>
          </li>
          <li className="py-2 hover:bg-gray-200">
            <Link to="/drafts" className="text-gray-700 hover:text-purple-700">
              Drafts
            </Link>
          </li>
          <li className="text-center pt-10 ">
            <Button
              className="px-12 py-2 bg-purple-700 text-white font-bold rounded-md text-center hover:text-purple-700"
              onClick={() => setShowInput(true)}
            >
              <img
                src={iconFolderSvg}
                alt="User profile"
                className="profile-icon size-8"
              />
              Create Folder
            </Button>
            {showInput && (
              <div>
                <input
                  type="text"
                  value={folderName}
                  onChange={handleFolderNameChange}
                  placeholder="Enter folder name"
                  className="rounded-md border border-gray-300 p-2"
                />
                <Button onClick={handleCreateFolder}>Save</Button>
                <Button onClick={() => setShowInput(false)}>Cancel</Button>
              </div>
            )}
          </li>
          {/* Mostrar las carpetas creadas */}
          {folders.map((folder, index) => (
            <li key={index} className="py-2 hover:bg-gray-200">
              <Link
                to={`/folder/${folder}`}
                className="text-gray-700 hover:text-purple-700"
              >
                {folder}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
