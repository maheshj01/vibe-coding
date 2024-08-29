interface HeaderProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, children, className }) => {
    return (
        <div className={`flex flex-row w-full justify-between px-8  items-center shadow-md ${className}`}>
            <p className="text-2xl font-bold">{title}</p>
            {children}
        </div>
    )
}

export default Header;