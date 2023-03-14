import { getConfig, postConfig } from "@/apis/config.api";
import React, { useState, useEffect } from "react";

type ConfigData = {
  modelEngine: string;
  apiKey: string;
  temperature: number;
};

const ConfigForm = () => {
  const [configData, setConfigData] = useState<ConfigData>({
    modelEngine: "gpt-3.5-turbo",
    apiKey: "",
    temperature: 0.2,
  });

  useEffect(() => {
    (async () => {
      const response = await getConfig();
      const config = response.data?.result;
      if (config) setConfigData(config);
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
    <form onSubmit={onSubmitConfig}>
      <label>
        Model Engine:
        <input type="text" name="modelEngine" value={configData.modelEngine} onChange={onChangeInputText} />
      </label>
      <label>
        API Key:
        <input type="text" name="apiKey" value={configData.apiKey} onChange={onChangeInputText} />
      </label>
      <label>
        Temperature:
        <input type="number" name="temperature" value={configData.temperature} onChange={onChangeInputText} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ConfigForm;
