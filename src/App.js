import {observer} from "mobx-react-lite";
import {Dashboard} from "./components/dashboard";

function App() {

    return (
        <main>
           <Dashboard />
        </main>
    );
}

export default observer(App);
