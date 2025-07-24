import React, { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { AIDiagnosis } from "./components/AIDiagnosis";
import { DoctorSearch } from "./components/DoctorSearch";
import { Appointments } from "./components/Appointments";
import { Profile } from "./components/Profile";
import { MedicalRecords } from "./components/MedicalRecords";
import { Prescriptions } from "./components/prescriptions";
import { Pharmacy } from "./components/pharmacy";
import { Notifications } from "./components/notifications";
import { Feedback } from "./components/feedback";

function App(): React.ReactElement {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <Profile />; 
      case "ai-diagnosis":
        return <AIDiagnosis />;
      case "doctor-search":
        return <DoctorSearch />;
      case "appointments":
        return <Appointments />;
      case "medical-records":
        return <MedicalRecords />;
      case "prescriptions":
        return <Prescriptions />;
      case "pharmacy":
        return <Pharmacy />;
      case "notifications":
        return <Notifications />;
      case "feedback":
        return <Feedback />;
 
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
