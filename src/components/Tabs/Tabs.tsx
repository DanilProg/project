import { ReactNode, useState } from "react";
import { TabBar } from "./TabBar/TabBar.tsx";
import { TabContent } from "./TabContent/TabContent.tsx";

export interface ITab {
  title: string;
  content: ReactNode;
  key: string;
}
interface TabsProps {
  tabs: ITab[];
}

export const Tabs = ({ tabs }: TabsProps) => {
  const [active, setActive] = useState<null | string>(null);
  return (
    <div>
      <TabBar tabs={tabs} active={active} setActive={setActive} />
      <TabContent tab={tabs.find((tab) => tab.key === active)} />
    </div>
  );
};
