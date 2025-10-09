import HeaderNav from "../components/HeaderComponents";// optional, maybe a smaller version
import Footer from "../components/FooterSection";  // optional for dashboard navigation

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <HeaderNav />

      {/* Page content */}
      <main className="flex-1 p-6">
        {children}  
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;