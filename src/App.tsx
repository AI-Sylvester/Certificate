import { CertificateGenerator } from './components/CertificateGenerator';
function App() {
  return (
    <div className="min-h-screen w-full bg-[#faf9f6] flex flex-col font-sans relative overflow-hidden">
      
      {/* Clean, subtle decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-[#b48d42]/10 to-transparent rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-tl from-[#b48d42]/10 to-transparent rounded-full blur-[80px] pointer-events-none"></div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full relative z-10 flex flex-col">
        <CertificateGenerator />
      </main>
      
      {/* Footer */}
      <footer className="py-6 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm font-medium text-gray-500">
          Image generated locally in your browser. No data is sent to a server.
        </div>
      </footer>
    </div>
  );
}

export default App;
