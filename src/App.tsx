import React, { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { AIDiagnosis } from "./components/AIDiagnosis";

function App(): React.ReactElement {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "ai-diagnosis":
        return <AIDiagnosis />;
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="medicare-ui-theme">
      <div className="flex h-screen bg-background transition-colors duration-300">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </ThemeProvider>
  );
}

export default App;
