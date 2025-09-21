'use client';

export default function ChatPage() {
    return (
        <>
            <ChatContent />
        </>
    );
}

function ChatContent() {
    return (
        <div className="min-h-screen bg-black/10 dark:bg-white/15">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className='border-4 border-dashed w-full rounded-xl h-80 flex justify-center items-center'>
                    <h1 className='text-4xl font-bold'>Chat AI</h1>
                </div>
            </main>
        </div>
    );
}