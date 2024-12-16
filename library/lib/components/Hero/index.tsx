import '../../assets/landing.css';
import image from '../../assets/unsplash-8fe0ec7b13b.jpg';

export interface HeroProps {};

export const Hero = ({ }: HeroProps) => {
    return (
        <div className="relative bg-white">
            <div className="absolute inset-0 -skew-y-3 bg-gradient-to-t from-blue-50 to-white"></div>
            <header id="page-header" className="relative flex flex-none items-center py-10">
                <div
                    className="container mx-auto flex flex-col gap-6 px-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-0 lg:px-10 xl:max-w-6xl">
                    <div>
                        <a href=""
                            className="group inline-flex items-center gap-2 text-lg font-bold text-gray-800 transition hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                data-slot="icon"
                                className="hi-mini hi-arrows-up-down inline-block size-5 rotate-45 text-blue-500 transition group-hover:rotate-90">
                                <path fillRule="evenodd"
                                    d="M2.24 6.8a.75.75 0 0 0 1.06-.04l1.95-2.1v8.59a.75.75 0 0 0 1.5 0V4.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0L2.2 5.74a.75.75 0 0 0 .04 1.06Zm8 6.4a.75.75 0 0 0-.04 1.06l3.25 3.5a.75.75 0 0 0 1.1 0l3.25-3.5a.75.75 0 1 0-1.1-1.02l-1.95 2.1V6.75a.75.75 0 0 0-1.5 0v8.59l-1.95-2.1a.75.75 0 0 0-1.06-.04Z"
                                    clipRule="evenodd" />
                            </svg>
                            <span>Static</span>
                        </a>
                    </div>
                    <nav className="space-x-4 sm:space-x-6">
                        <a href="javascript:void(0)"
                            className="text-sm font-semibold text-gray-600 hover:text-gray-950">
                            <span>Features</span>
                        </a>
                        <a href="javascript:void(0)"
                            className="text-sm font-semibold text-gray-600 hover:text-gray-950">
                            <span>Pricing</span>
                        </a>
                        <a href="javascript:void(0)"
                            className="text-sm font-semibold text-gray-600 hover:text-gray-950">
                            <span>About</span>
                        </a>
                        <a href="javascript:void(0)"
                            className="text-sm font-semibold text-gray-600 hover:text-gray-950">
                            <span>Contact</span>
                        </a>
                    </nav>
                    <div>
                        <a href="javascript:void(0)"
                            className="inline-flex items-center justify-center gap-2 rounded border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-700 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700 active:border-gray-200 active:bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                data-slot="icon"
                                className="hi-mini hi-arrow-right-end-on-rectangle inline-block size-5 opacity-50">
                                <path fillRule="evenodd"
                                    d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                                    clipRule="evenodd" />
                                <path fillRule="evenodd"
                                    d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z"
                                    clipRule="evenodd" />
                            </svg>
                            <span>Login</span>
                        </a>
                    </div>
                </div>
            </header>

            <div className="container relative mx-auto overflow-hidden px-4 py-16 lg:px-8 lg:py-32 xl:max-w-6xl">
                <div className="text-center">
                    <h2 className="mb-4 text-3xl font-black md:text-5xl">
                        Analytics just made <span className="text-blue-600">simple</span>
                    </h2>
                    <h3
                        className="mx-auto text-balance text-lg font-medium text-gray-500 md:text-xl md:leading-relaxed lg:w-2/3">
                        Get access to the best software for your online business and get
                        control of your earnings and growth.
                    </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-4 pb-24 pt-10">
                    <a href="javascript:void(0)"
                        className="inline-flex items-center justify-center gap-2 rounded bg-blue-700 px-6 py-3 font-semibold leading-6 text-white transition hover:border-blue-800 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring focus:ring-blue-500/50 active:border-blue-700 active:bg-blue-700">
                        <span>Get Access</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            data-slot="icon" className="hi-mini hi-arrow-right inline-block size-5 opacity-50">
                            <path fillRule="evenodd"
                                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                                clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="javascript:void(0)"
                        className="inline-flex items-center justify-center gap-2 rounded bg-gray-700 px-6 py-3 font-semibold leading-6 text-white transition hover:border-gray-800 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring focus:ring-gray-500/50 active:border-gray-700 active:bg-gray-700">
                        <span>Learn More</span>
                    </a>
                </div>
                <div
                    className="relative rounded-xl bg-white p-2 shadow-lg ring-1 ring-blue-100 lg:mx-40 lg:flex lg:items-center lg:justify-center">
                    <div className="absolute left-0 top-0 -ml-20 -mt-12 h-48 w-48 rounded-full bg-blue-200/50"></div>
                    <div className="absolute right-0 top-0 -mr-16 -mt-20 h-32 w-32 rotate-3 rounded-xl bg-green-200/50">
                    </div>
                    <div className="absolute bottom-0 right-0 -mb-10 -mr-16 h-40 w-40 rounded-full bg-gray-200/50">
                    </div>
                    <div
                        className="absolute bottom-0 left-0 -mb-16 -ml-12 h-20 w-20 -rotate-12 rounded-xl bg-red-200/50">
                    </div>
                    <div className="aspect-h-10 aspect-w-16 w-full">
                        <img src={image} alt="Hero Image" className="mx-auto rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;