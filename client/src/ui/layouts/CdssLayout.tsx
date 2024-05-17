import {Outlet} from 'react-router-dom';
import CDSSTopbar from "../CDSSTopbar.tsx";


const CDSSLayout = () => {
    return (
        <div className={"flex flex-col bg-black h-[100vh] w-full overflow-hidden"}>
            <CDSSTopbar />
            <Outlet/>
        </div>
    );
}

export default CDSSLayout;
