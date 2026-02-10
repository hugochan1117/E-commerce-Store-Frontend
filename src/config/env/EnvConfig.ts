import DevConfig from "./DevConfig.ts";
import ProdConfig from "./ProdConfig.ts";

export default function getEnvConfig(){
  if (import.meta.env.MODE === "development"){
    return DevConfig;
  }else{
    return ProdConfig;
  }
}