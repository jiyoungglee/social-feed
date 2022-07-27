import Navbar from "./Navbar";
import './Layout.css';

function Layout(props) {
  return (
    <div>
      <Navbar />
      <main className="page-layout">
        {props.children}
      </main>
    </div>

  )
}

export default Layout;
