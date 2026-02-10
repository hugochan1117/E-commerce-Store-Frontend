import {createContext} from "react";
import type {UserData} from "../ui/data/UserData.ts";

export const UserContext = createContext<UserData | null | undefined>(undefined)