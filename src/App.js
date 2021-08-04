import Graph from "./Graph";

function Header(){
    return (
        <header className="hero is-link is-medium">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">
                        横浜市の気温変化
                    </p>
                </div>
            </div>
        </header>
    )
}

function Footer(){
    return (
        <footer className="footer">
            <div className="container has-text-centered">
                <p className="copyright">&copy; Shuhei Koizumi</p>
            </div>
        </footer>
    )
}

function App(){
    return (
        
        <div>
            <Header />
            <div className="container has-text-centered">
                <Graph />
            </div>
            <Footer />
        </div>
    );
}

export default App;