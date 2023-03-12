import GitHubButton from "react-github-btn";

const Navbar = () => {
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <img src="images/vagrant-icon.png" className="h-6 mr-3 sm:h-10" alt="Flowbite Logo"/>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            VagrantFile Generator
          </span>
        </a>
        <GitHubButton
          href="https://github.com/jianan1104/vagrantfile-generator"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star google/vagrantfile-generator on GitHub"
        >
          Star
        </GitHubButton>
      </div>
    </nav>
  );
};

export default Navbar;
