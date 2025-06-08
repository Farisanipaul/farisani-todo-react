import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => useSelector(selector);