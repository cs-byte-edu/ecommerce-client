import { Tabs } from "radix-ui";

export const TabsSection = ({ tabsTriggers, tabsContent, className }) => {
  return (
    <Tabs.Root defaultValue="tab1" className={className}>
      <Tabs.List aria-label="tabs" className="TabsList">
        {tabsTriggers.map((tab, idx) => (
          <Tabs.Trigger
            value={`tab${idx + 1}`}
            className="TabsTrigger"
            key={tab + idx + 1}
          >
            {tab}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabsContent.map((tabsContentItem, idx) => (
        <Tabs.Content value={`tab${idx + 1}`} key={`tab${idx + 1}`}>
          {tabsContentItem}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
