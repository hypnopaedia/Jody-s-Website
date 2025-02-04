import { useAppSelector } from "src/redux/store";

export const useProjects = () => useAppSelector((state) => state.Code.projects);
