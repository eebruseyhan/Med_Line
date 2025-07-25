import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTheme } from './ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Activity, 
  Pill, 
  AlertCircle,
  TrendingUp,
  Heart,
  Thermometer,
  Sun,
  Moon,
} from 'lucide-react';
import { Profile } from "./Profile";
import { AIDiagnosis } from "./AIDiagnosis";
import { DoctorSearch } from "./DoctorSearch";
import { Appointments } from "./Appointments";
import { MedicalRecords } from "./MedicalRecords";
import { Prescriptions } from "./prescriptions";
import { Pharmacy } from "./pharmacy";
import { Notifications } from "./notifications";
import { Feedback } from "./feedback";

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: 'Online' | 'Yüz Yüze';
}

interface HealthMetric {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'normal' | 'warning' | 'critical';
}

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // LocalStorage'dan token ve user bilgilerini temizle
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Ana sayfaya yönlendir
    navigate('/');
  };

  const upcomingAppointments: Appointment[] = [
    {
      id: 1,
      doctor: 'Dr. Ayşe Kaya',
      specialty: 'Kardiyoloji',
      date: '25 Temmuz 2025',
      time: '14:00',
      type: 'Online'
    },
    {
      id: 2,
      doctor: 'Dr. Mehmet Öz',
      specialty: 'Genel Dahiliye',
      date: '28 Temmuz 2025',
      time: '10:30',
      type: 'Yüz Yüze'
    }
  ];

  const healthMetrics: HealthMetric[] = [
    { label: 'Tansiyon', value: '120/80', icon: Heart, status: 'normal' },
    { label: 'Ateş', value: '36.5°C', icon: Thermometer, status: 'normal' },
    { label: 'Nabız', value: '72 bpm', icon: Activity, status: 'normal' }
  ];

  const getGreetingTime = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'İyi günler';
    return 'İyi akşamlar';
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        {activeSection === "dashboard" && (
          <DashboardHome
            theme={theme}
            upcomingAppointments={upcomingAppointments}
            healthMetrics={healthMetrics}
            getGreetingTime={getGreetingTime}
          />
        )}
        {activeSection === "profile" && <Profile />}
        {activeSection === "ai-diagnosis" && <AIDiagnosis />}
        {activeSection === "doctor-search" && <DoctorSearch />}
        {activeSection === "appointments" && <Appointments />}
        {activeSection === "medical-records" && <MedicalRecords />}
        {activeSection === "prescriptions" && <Prescriptions />}
        {activeSection === "pharmacy" && <Pharmacy />}
        {activeSection === "notifications" && <Notifications />}
        {activeSection === "feedback" && <Feedback />}
      </main>
    </div>
  );
}

function DashboardHome({ theme, upcomingAppointments, healthMetrics, getGreetingTime }: any) {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{getGreetingTime()}, Ahmet Bey</h1>
          {theme === 'dark' && <Moon className="w-6 h-6 text-muted-foreground" />}
          {theme === 'light' && <Sun className="w-6 h-6 text-muted-foreground" />}
        </div>
        <p className="text-muted-foreground">Sağlığınızı takip edin ve doktorlarınızla iletişim kurun.</p>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg transition-colors duration-200">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Yaklaşan Randevu</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg transition-colors duration-200">
              <Pill className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Aktif Reçete</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg transition-colors duration-200">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">7</p>
              <p className="text-sm text-muted-foreground">Bu Ay Ölçüm</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg transition-colors duration-200">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-muted-foreground">Sağlık Skoru</p>
            </div>
          </div>
        </Card>
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2 p-6 transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Yaklaşan Randevular</h2>
            <Button variant="outline" size="sm">
              Tümünü Gör
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment: any) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg transition-colors duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{appointment.doctor}</h3>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{appointment.date} - {appointment.time}</span>
                      <Badge variant={appointment.type === 'Online' ? 'secondary' : 'outline'} className="text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Detay
                </Button>
              </div>
            ))}
          </div>
        </Card>
        {/* Health Metrics */}
        <Card className="p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-4">Sağlık Ölçümleri</h2>
          <div className="space-y-4">
            {healthMetrics.map((metric: any, index: number) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{metric.label}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{metric.value}</p>
                    <Badge variant="secondary" className="text-xs">Normal</Badge>
                  </div>
                </div>
              );
            })}
          </div>
          <Button className="w-full mt-4" variant="outline">
            Ölçüm Ekle
          </Button>
        </Card>
      </div>
      {/* Recent Activity */}
      <Card className="p-6 transition-colors duration-200">
        <h2 className="text-xl font-semibold mb-4">Son Aktiviteler</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg transition-colors duration-200">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm">AI ön tanı tamamlandı</p>
              <p className="text-xs text-muted-foreground">2 saat önce</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg transition-colors duration-200">
            <Pill className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm">İlaç siparişi teslim edildi</p>
              <p className="text-xs text-muted-foreground">1 gün önce</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg transition-colors duration-200">
            <Calendar className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm">Randevu onaylandı</p>
              <p className="text-xs text-muted-foreground">2 gün önce</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Dashboard;