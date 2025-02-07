import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import {
    HeartIcon,
    PaperAirplaneIcon,
    ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';

export default function EditorPreviewPage() {
    return (
        <>
            <div
                className="flex flex-col min-h-screen text-white"
                style={{
                    backgroundColor: '#1E1E1E',
                    fontFamily: '"PT Sans", serif',
                }}
            >
                <div
                    id="hero"
                    className="relative h-screen flex flex-col items-center justify-end bg-cover bg-center text-white p-[10%]"
                    style={{
                        backgroundImage:
                            "url('https://i.wfolio.ru/x/TwCkTSnjzeE6f_BUuBXFwXbgdJ2VF8Ay/3p1guTRDJGs5wbisvzVYmo6n4suYpHbI/qL1LWWIHa1aljhYtvOfJXAKQs_tCSgAk/RTJo29LSF2p9ap-Zh0_sgMG6pDgvctAw/8X3u4WNrmhRxgKIXCqO9pJcKUtA4tcfQ/NROugTDpLobYWauHSsKmPYaA_fYpfL-D/Lc7N8JMzUXolPeMfMH6tGXQrjl1uDOF3/gX12JlRCFbNEzlKkc0B2e6GVZl3hHVKk/lcp4h_CvVPfK7yIHuO1qg8P3LaH9aNaF/-07Kml42lcsWelcOuvP_lFSlm42xPq2f/DYZW5inT0dxmH8d0b64_Ms-E1SRvSbpj/cvumRz1z7qClmXSMFpsIAgY1xF6Dt2sh/-A-4ilxaRX4J8OeoJA5B3aZCo17eMNMZ/Qc_USPqgNmHjmO0_s17OCuxpI0br-DYN/q4w-NZbajObh03Edk7IxQyqDH8DCf3qE/WE6Po8D93qnx_jsJWhbJRxJdDlOjX0OU/SKUPHFuAkilZw2iIgNgTCc9hNsgnzHea/l0MU2Dnm9jGkPiKsZNxqnYlX__9oFZwv/VZLe8-ns0mKBasZ5qALvkS9r2WEu2JpT/LuCIjNtfHes.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-black/50"></div>

                    <div className="relative text-center">
                        <h1 className="text-6xl mb-4">Prograin</h1>
                        <p className="text-lg">
                            Максим Тонких |{' '}
                            <a href="https://mxtkh.ru" className="underline">
                                mxtkh.ru
                            </a>
                        </p>
                    </div>

                    <div className="absolute bottom-4 animate-bounce">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col flex-grow">
                    <header
                        className="sticky top-0 z-10 p-6"
                        style={{ backgroundColor: '#1E1E1E' }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-4">
                                <div className="text-zinc-500">Item1</div>
                                <div className="text-zinc-500">Item2</div>
                                <div className="text-zinc-500">Item3</div>
                                <div className="text-zinc-500">Item4</div>
                                <div className="text-zinc-500">Item5</div>

                                <div className="relative group">
                                    <Menu
                                        as="div"
                                        className="relative inline-block text-left"
                                        data-hover="true"
                                    >
                                        <div>
                                            <MenuButton as={Fragment}>
                                                {({ active }) => (
                                                    <button
                                                        className={`inline-flex w-full justify-center gap-x-1.5 ${
                                                            active
                                                                ? 'text-white'
                                                                : 'text-zinc-500'
                                                        } hover:text-white`}
                                                    >
                                                        Download
                                                        {active ? (
                                                            <ChevronUpIcon
                                                                aria-hidden="true"
                                                                className="-mr-1 mt-0.5 size-5 text-gray-400"
                                                            />
                                                        ) : (
                                                            <ChevronDownIcon
                                                                aria-hidden="true"
                                                                className="-mr-1 mt-0.5 size-5 text-gray-400"
                                                            />
                                                        )}
                                                    </button>
                                                )}
                                            </MenuButton>
                                        </div>

                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in text-zinc-500"
                                        >
                                            <div className="py-1">
                                                <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm hover:bg-zinc-800 hover:text-white"
                                                    >
                                                        item6
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="block px-4 py-2 text-sm hover:bg-zinc-800 hover:text-white"
                                                    >
                                                        item7
                                                    </a>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button>
                                    <HeartIcon
                                        aria-hidden="true"
                                        className="-mr-1 mt-0.5 size-5 text-white"
                                    />
                                </button>

                                <button>
                                    <PaperAirplaneIcon
                                        aria-hidden="true"
                                        className="-mr-1 mt-0.5 size-5 text-white"
                                    />
                                </button>

                                <button>
                                    <ChatBubbleOvalLeftIcon
                                        aria-hidden="true"
                                        className="-mr-1 mt-0.5 size-5 text-white"
                                    />
                                </button>

                                <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                    data-hover="true"
                                >
                                    <div>
                                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-10 py-3 text-sm ring-1 ring-zinc-300 ring-inset hover:bg-zinc-50 hover:text-black">
                                            Options
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="-mr-1 size-5 text-zinc-400"
                                            />
                                        </MenuButton>
                                    </div>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <div className="py-1">
                                            <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm hover:bg-zinc-800"
                                                >
                                                    Account settings
                                                </a>
                                            </MenuItem>
                                            <MenuItem>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm hover:bg-zinc-800"
                                                >
                                                    Support
                                                </a>
                                            </MenuItem>
                                        </div>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </header>
                    <main className="flex-grow p-6">
                        {/* <div className="grid grid-cols-3 gap-4"> */}
                        {/* <div className="grid grid-flow-row auto-cols-max">
                            {[1, 2, 3, 4, 5].map((i) => <div>
                                <img src={`/demo/${i}.jpg`} width={'100%'} />
                            </div>)}
                        </div> */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="grid gap-4">
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <img
                                        className="h-auto max-w-full rounded-lg"
                                        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="text-center text-sm p-4 mt-auto">
                        Website by us
                    </footer>
                </div>
            </div>
        </>
    );
}
