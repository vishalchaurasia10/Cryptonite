import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import { FaBitcoin } from 'react-icons/fa';
import { LuTrendingUp } from 'react-icons/lu';
import { SiGoogleanalytics } from 'react-icons/si';

const Navbar = () => {

    return (
        <div className="fixed z-50 bottom-0 lg:top-0 lg:left-0 w-full lg:h-screen lg:w-16 flex flex-row lg:flex-col bg-[rgba(255,255,255,0.2)] shadow-lg backdrop-blur-2xl">
            <SideBarIcon icon={<FaBitcoin size="28" />} text='Home' toUrl='/' />
            <Divider />
            <SideBarIcon icon={<LuTrendingUp size="30" />} text='Trending' toUrl='/trending' />
            <SideBarIcon icon={<SiGoogleanalytics size="20" />} text='Explore' toUrl='/explore' />
            <SideBarIcon icon={<BsSearch size="20" />} text='Search coins 🔍' toUrl='' />
            <Divider />
        </div>
    );
};

type SideBarIconProps = {
    icon: React.ReactNode;
    text?: string;
    toUrl: string;
};

const SideBarIcon = ({ icon, text = 'tooltip 💡', toUrl = '/' }: SideBarIconProps) => {
    const content = (
        <div className="sidebar-icon group mx-2">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    );

    return toUrl ? (
        <Link className='' href={toUrl}>
            {content}
        </Link>
    ) : (
        content
    );
};


const Divider = () => <hr className="h-8 lg:h-0 my-auto lg:my-0 sidebar-hr" />;

export default Navbar;