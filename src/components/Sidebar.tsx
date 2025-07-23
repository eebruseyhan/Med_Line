import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import { 
  User, 
  Heart, 
  Calendar, 
  Pill, 
  MessageSquare, 
  Bell, 
  Settings,
  LogOut,
  Menu,
  X,
  Stethoscope,
  FileText,
  Package,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';

export interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function Sidebar({ activeSection, setActiveSection, isCollapsed, setIsCollapsed }: SidebarProps) {
  const { theme, setTheme } = useTheme();

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Ana Sayfa', icon: Heart },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'ai-diagnosis', label: 'AI Ön Tanı', icon: Stethoscope },
    { id: 'doctors', label: 'Doktor Ara', icon: User },
    { id: 'appointments', label: 'Randevular', icon: Calendar },
    { id: 'records', label: 'Tıbbi Kayıtlar', icon: FileText },
    { id: 'prescriptions', label: 'Reçeteler', icon: Pill },
    { id: 'pharmacy', label: 'Eczane', icon: Package },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'feedback', label: 'Geri Bildirim', icon: MessageSquare },
  ];

  const getThemeIcon = (): React.ComponentType<{ className?: string }> => {
    switch (theme) {
      case 'light':
        return Sun;
      case 'dark':
        return Moon;
      default:
        return Monitor;
    }
  };

  const getThemeLabel = (): string => {
    switch (theme) {
      case 'light':
        return 'Açık Tema';
      case 'dark':
        return 'Koyu Tema';
      default:
        return 'Sistem Teması';
    }
  };

  const cycleTheme = (): void => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">MediCare</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${isCollapsed ? 'px-2' : 'px-3'}`}
              onClick={() => setActiveSection(item.id)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${isCollapsed ? 'px-2' : 'px-3'}`}
          onClick={cycleTheme}
          title={getThemeLabel()}
        >
          {(() => {
            const ThemeIcon = getThemeIcon();
            return <ThemeIcon className="w-4 h-4 flex-shrink-0" />;
          })()}
          {!isCollapsed && <span>{getThemeLabel()}</span>}
        </Button>

        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 ${isCollapsed ? 'px-2' : 'px-3'}`}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Ayarlar</span>}
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 ${isCollapsed ? 'px-2' : 'px-3'}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Çıkış Yap</span>}
        </Button>
      </div>
    </div>
  );
}