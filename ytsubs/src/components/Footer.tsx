const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <footer className="flex items-center justify-center p-4 bg-gray-800 text-white">
                <div className="flex items-center">
                    <p className="ml-2 text-lg font-semibold">YouTube Subscribers</p>
                </div>
                {children}
            </footer>
        </>
    )
}

export default Footer;