import Header from "../Components/Shared/Header"

interface LayoutProps{
    children:React.ReactNode,
}

const Layout = ({children}:LayoutProps) => {
  return (
    <>
        <Header />

        <main>
            {children}
        </main>
    </>
  )
}

export default Layout