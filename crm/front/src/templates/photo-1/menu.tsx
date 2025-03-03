import React, { useRef } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import {
    HeartIcon,
    PaperAirplaneIcon,
    ChatBubbleOvalLeftIcon,
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';

const ExtraMenu = () => {
    const menuRef = useRef<HTMLButtonElement>(null);

    return (
        <Menu
            as="div"
            className="relative inline-block text-left"
            onMouseLeave={() => {
                if (
                    menuRef &&
                    menuRef.current &&
                    menuRef.current.hasAttribute('data-active')
                ) {
                    menuRef.current.click();
                }
            }}
        >
            <div
                onMouseEnter={() => {
                    if (
                        menuRef &&
                        menuRef.current &&
                        !menuRef.current.hasAttribute('data-active')
                    ) {
                        menuRef.current.click();
                    }
                }}
            >
                <MenuButton as={Fragment} ref={menuRef}>
                    {({ active }) => (
                        <button
                            className={`inline-flex w-full justify-center gap-x-1.5 ${
                                active ? 'text-white' : 'text-zinc-500'
                            } hover:text-white`}
                        >
                            Download
                            {active ? (
                                <ChevronUpIcon
                                    aria-hidden="true"
                                    className="-mr-1 mt-0.5 size-5 text-white pointer-events-none"
                                />
                            ) : (
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="-mr-1 mt-0.5 size-5 text-gray-400 pointer-events-none"
                                />
                            )}
                        </button>
                    )}
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 w-56 origin-top-right rounded-md bg-black ring-1 shadow-lg ring-black/5 text-zinc-500"
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
    );
};

const DownloadDropdown = () => {
    const menuRef = useRef<HTMLButtonElement>(null);

    return (
        <Menu
            as="div"
            className="relative inline-block text-left"
            onMouseLeave={() => {
                if (
                    menuRef &&
                    menuRef.current &&
                    menuRef.current.hasAttribute('data-active')
                ) {
                    menuRef.current.click();
                }
            }}
        >
            <div
                onMouseEnter={() => {
                    if (
                        menuRef &&
                        menuRef.current &&
                        !menuRef.current.hasAttribute('data-active')
                    ) {
                        menuRef.current.click();
                    }
                }}
            >
                <MenuButton
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-10 py-3 text-sm ring-1 ring-zinc-300 ring-inset hover:bg-zinc-50 hover:text-black"
                    ref={menuRef}
                >
                    Options
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 size-5 text-zinc-400"
                    />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 w-56 origin-top-right rounded-md bg-black ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
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
    );
};

const MenuPhoto1: React.FC = () => (
    <header
        className="sticky top-0 p-6"
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
                    <ExtraMenu />
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

                <DownloadDropdown />
            </div>
        </div>
    </header>
);

export default MenuPhoto1;
