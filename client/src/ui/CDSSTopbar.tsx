import {Link } from 'react-router-dom';
const CDSSTopbar = () => {

    return (
        <div className="bg-black">
            <div className={"flex mx-7 justify-between items-center"}>
                <div className="flex h-20 w-1/4  shrink-0 items-center">
                    <Link to={"/"}>
                        <img
                            className="h-12 w-auto"
                            src="/images/brand/logo-full-icon-right-white--cdss.png"
                            alt="Your Company"
                        />
                    </Link>
                </div>

                <div className={"flex gap-x-5 w-1/2 justify-center"}>
                    <h1 className="text-white">MDIMA Clinical Decision Support System</h1>
                </div>

                <div className="text-gray-400 text-end w-1/4">
                    <p>Lung Radiology Cancer Detection</p>
                </div>
            </div>
        </div>
    );
}

export default CDSSTopbar;

