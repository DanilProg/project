import { ITab } from "../Tabs.tsx";

interface TabProps {
  tab?: ITab;
}
export const TabContent = ({ tab }: TabProps) => {
  return <div>{tab?.content}</div>;
};
