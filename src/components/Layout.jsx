import Header from './Header'
import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <div>
      <Header />

      <div className="main-container">
        <Sidebar />

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout