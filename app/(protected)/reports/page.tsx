'use client';

export default function ReportsPage() {
    return (
        <>
            <ReportsContent />
        </>
    );
}

function ReportsContent() {
    return (
        <div className="h-full bg-black/10 dark:bg-white/15">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className='bg-white/10 w-full rounded-3xl h-80 flex justify-center items-center'>
                    <h1 className='text-4xl font-bold'>Relatórios</h1>
                </div>
            </main>
        </div>
    );
}