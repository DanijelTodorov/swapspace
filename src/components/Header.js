const Header = () => {
  return (
  <div className="header fixed text-white h-[100px] w-full flex items-center px-[200px] justify-between">
    <label className="text-[2rem] text-yellow-200">SWAPSPACE</label>
    <div className="flex items-center gap-4">
        <label>Products</label>
        <label>Business</label>
        <label>Support</label>
        <label>About</label>
        <label>Explore</label>
    </div>
  </div>);
};

export default Header;
