import { useLocation, Link } from 'react-router-dom';
function BreadCrumbs() {
    const location = useLocation()
    const currPath = location.pathname
    const tabPath = ["dashboard", ...currPath.split("/")]
    const newtabPath = tabPath.flatMap((x)=> {
        if (x === "dashboard") {
            return { label: "Strona główna", link: x }
        }
        if (x === "tickets") {
            return { label: "Zgłoszenia", link: x }
        }
        if (x === "users") {
            return { label: "Użytkownicy", link: x }
        }
        if (x === "edit" || x === "accept" ) {
            return { label: "", link: "" }
        }
        if (x === "add") {
            return { label: "Dodaj", link: "" }
        }
        return { label: x, link: x }
    }).filter(x => x.label);

    return (
        <div className="nav-item">
            {newtabPath.map((path, i) => {
                if (i === newtabPath.length - 1) {
                    return (
                            <div key={i}  className=" breadcrumb active">
                                {path.label}
                            </div>
                    )
                }
                return (
                
                        <div key={i} className="pe-2 breadcrumb noactive" >
                            <Link to={"/" + path.link}>{path.label}</Link>
                        </div>
                     
                  
                )
            })}
        </div>
    )
}

export default BreadCrumbs