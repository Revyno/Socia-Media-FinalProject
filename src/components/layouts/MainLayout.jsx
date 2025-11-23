import Header from './Header';
import Sidebar from './Sidebar';
import BottomNavigation from './BottomNavigation';

export default function MainLayout({ children, currentPage, onPageChange }) {
  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />
      
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
        
        <main className="flex-1 pb-20 lg:pb-6">
          {children}
        </main>
      </div>
      
      <BottomNavigation currentPage={currentPage} onPageChange={onPageChange} />
    </div>
  );
}