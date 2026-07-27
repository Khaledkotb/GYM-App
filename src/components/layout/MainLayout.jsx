import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
    return (
        <>
            <style>{`
                .main-layout-shell {
                    display: flex;
                    min-height: 100vh;
                    background: #f8fafc;
                }

                .main-layout-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }

                .main-layout-main {
                    padding: 20px;
                }

                @media (max-width: 900px) {
                    .main-layout-shell {
                        flex-direction: column;
                    }

                    .main-layout-main {
                        padding: 14px;
                    }
                }
            `}</style>

            <div className="main-layout-shell">
                <Sidebar />

                <div className="main-layout-content">
                    <Navbar />
                    <main className="main-layout-main">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}

export default MainLayout;