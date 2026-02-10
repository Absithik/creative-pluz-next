import Image from 'next/image';

interface Props {
    step: string;
    title: string;
    desc: string;
    image: string;
    reverse?: boolean;
}

export default function ProcessItem({
    step,
    title,
    desc,
    image,
    reverse,
}: Props) {
    return (
        <div
            className={`process-item grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''
                }`}
        >
            {/* TEXT */}
            <div>
                <span className="text-emerald-500 font-bold text-sm tracking-widest">
                    STEP {step}
                </span>
                <h3 className="mt-3 text-3xl font-extrabold text-slate-900">
                    {title}
                </h3>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                    {desc}
                </p>
            </div>

            {/* IMAGE */}
            <div className="relative h-72 rounded-2xl overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
}
