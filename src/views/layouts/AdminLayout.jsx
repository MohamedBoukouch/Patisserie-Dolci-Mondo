// src/layouts/AdminLayout.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* SIDEBAR - z-index: 50 (on top) */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />
      
      {/* TOPBAR - z-index: 40 (below sidebar), moves with sidebar */}
      <Topbar 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
      />
      
      {/* MAIN CONTENT - Adjusts based on sidebar and topbar */}
      <main 
        className={`
          pt-16 
          min-h-screen 
          transition-all 
          duration-300
          ${isCollapsed ? 'lg:pr-20' : 'lg:pr-64'}
        `}
      >
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;