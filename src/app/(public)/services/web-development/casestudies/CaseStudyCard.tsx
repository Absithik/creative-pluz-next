'use client';

interface Props {
    data: any;
    index: number;
}

const CaseStudyCard = ({ data, index }: Props) => {
    return (
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white border rounded-3xl p-6 md:p-10 shadow-xl">
            {/* INDEX */}
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index}
            </div>

            {/* TEXT */}
            <div className="space-y-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                        <span className="text-white">{data.tag.icon}</span>
                    </div>
                    <span className="text-xs md:text-sm uppercase tracking-widest text-gray-500">
                        {data.tag.text}
                    </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold">
                    {data.title}
                </h3>

                <p className="text-gray-600 text-sm md:text-base">
                    {data.description}
                </p>

                <button className="text-black font-semibold">
                    {data.cta}
                </button>
            </div>

            {/* IMAGE MOCK */}
            <div className="rounded-2xl bg-gray-100 p-6 flex items-center justify-center min-h-[200px]">
                <span className="text-sm md:text-base font-semibold text-gray-600">
                    {data.image.badge}
                </span>
            </div>
        </div>
    );
};

export default CaseStudyCard;
