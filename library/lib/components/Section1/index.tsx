import '../../assets/landing.css';

export interface HeroProps { };

export const Section1 = ({ }: HeroProps) => {
    return (
        <div className="bg-white">
            <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-6xl">
                <div className="text-center">
                    <h2 className="mb-4 text-3xl font-black md:text-5xl">How it works</h2>
                    <h3
                        className="mx-auto text-balance text-lg font-medium text-gray-500 md:text-xl md:leading-relaxed lg:w-2/3">
                        Its as simple as it sounds and ever more!
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    <div
                        className="rounded-2xl border-2 border-blue-50 bg-gradient-to-t from-blue-50 to-white p-10 text-center transition hover:border-blue-100">
                        <svg className="hi-outline hi-desktop-computer mb-5 inline-block h-12 w-12 text-blue-500"
                            stroke="currentColor" fill="none" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h4 className="mb-2 text-lg font-bold">
                            1. Get your custom dashboard
                        </h4>
                        <p className="text-left text-sm leading-relaxed text-gray-600">
                            Vestibulum ullamcorper, odio sed rhoncus imperdiet, enim elit
                            sollicitudin orci, eget dictum leo mi nec lectus. Nam commodo
                            turpis id lectus scelerisque vulputate.
                        </p>
                    </div>
                    <div
                        className="rounded-2xl border-2 border-indigo-50 bg-gradient-to-t from-indigo-50 to-white p-10 text-center transition hover:border-indigo-100">
                        <svg className="hi-outline hi-cube mb-5 inline-block h-12 w-12 text-indigo-500"
                            stroke="currentColor" fill="none" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                        <h4 className="mb-2 text-lg font-bold">
                            2. Connect to your product
                        </h4>
                        <p className="text-left text-sm leading-relaxed text-gray-600">
                            Vestibulum ullamcorper, odio sed rhoncus imperdiet, enim elit
                            sollicitudin orci, eget dictum leo mi nec lectus. Nam commodo
                            turpis id lectus scelerisque vulputate.
                        </p>
                    </div>
                    <div
                        className="rounded-2xl border-2 border-purple-50 bg-gradient-to-t from-purple-50 to-white p-10 text-center transition hover:border-purple-100 sm:col-span-2 lg:col-span-1">
                        <svg className="hi-outline hi-presentation-chart-line mb-5 inline-block h-12 w-12 text-purple-500"
                            stroke="currentColor" fill="none" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                        <h4 className="mb-2 text-lg font-bold">3. Explore Analytics</h4>
                        <p className="text-left text-sm leading-relaxed text-gray-600">
                            Vestibulum ullamcorper, odio sed rhoncus imperdiet, enim elit
                            sollicitudin orci, eget dictum leo mi nec lectus. Nam commodo
                            turpis id lectus scelerisque vulputate.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Section1;