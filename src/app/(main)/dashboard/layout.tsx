import Navbar from "../components/Navbar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div className="flex w-full flex-col items-center overflow-hidden px-4 py-6">
    <Navbar/>
    {children}
    </div>
)}
