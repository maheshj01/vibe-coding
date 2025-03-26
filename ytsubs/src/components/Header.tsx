import React from "react";

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <header>
            <div className="flex items-center">
                <h1 className="ml-2 text-lg font-semibold">YouTube Subscribers</h1>
            </div>
            {(children) && <div>{children}</div>}
        </header>
    );
}

export default Header;