import { useSelector } from "react-redux"
import Dashboard from "./Dashboard";
import CostsTables from "./CostsTables";

export default function Views({ project }) {
	const slot = useSelector(state => state.main.slot);
	const costs = useSelector(state => state.project.costsProject);

	return slot === "dashboard"
		? <Dashboard project={project} costs={costs} />
		: <CostsTables project={project} costs={costs} />
}
