import './Layout.css'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

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