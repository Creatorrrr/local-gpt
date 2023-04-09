import { getConfig, postConfig } from "@/apis/config.api";
import React, { useState, useEffect } from "react";

console.debug("ConfigForm.tsx");

type ConfigData = {
  modelEngine: string;
  apiKey: string;
  temperature: number;
};

const defaultConfigData = {
  modelEngine: "gpt-3.5-turbo",
  apiKey: "",
  temperature: 0.2,
};

const ConfigForm = () => {
  const [configData, setConfigData] = useState<ConfigData>(defaultConfigData);

  useEffect(() => {
    (async () => {
      const response = await getConfig();
      const config = response.data?.result;
      if (config) setConfigData({
        ...defaultConfigData,
        ...config
      });
    })();
  }, []);

  const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConfigData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitConfig = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await postConfig(configData);
      const config = response.data?.result;
      if (config) setConfigData(config);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitConfig} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="modelEngine" className="text-gray-700 font-semibold">
          Model Engine:
        </label>
        <input
          type="text"
          name="modelEngine"
          id="modelEngine"
          value={configData.modelEngine}
          onChange={onChangeInputText}
          className="border-2 border-gray-300 p-2 rounded-lg focus:border-green-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="apiKey" className="text-gray-700 font-semibold">
          API Key:
        </label>
        <input
          type="text"
          name="apiKey"
          id="apiKey"
          value={configData.apiKey}
          onChange={onChangeInputText}
          className="border-2 border-gray-300 p-2 rounded-lg focus:border-green-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="temperature" className="text-gray-700 font-semibold">
          Temperature:
        </label>
        <input
          type="number"
          name="temperature"
          id="temperature"
          value={configData.temperature}
          onChange={onChangeInputText}
          className="border-2 border-gray-300 p-2 rounded-lg focus:border-green-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white font-semibold p-2 rounded-lg hover:bg-green-600 focus:outline-none"
      >
        Save
      </button>
    </form>

  );
};

export default ConfigForm;
