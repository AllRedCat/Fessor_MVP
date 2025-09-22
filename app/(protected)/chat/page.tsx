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
        <div className="w-full h-full bg-black/10 dark:bg-white/15">
            <main className="h-[92%] max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className='h-full w-full rounded-3xl flex justify-center items-center relative bg-black/10'>
                    <div className="w-[96%] h-[90%] absolute top-4 overflow-y-auto"></div>
                    <div
                        className="w-[96%] h-14 bg-black/10 dark:bg-white/10 absolute bottom-4 rounded-full
                        flex items-center justify-between p-2 gap-2"
                    >
                    </div>
                </div>
            </main>
        </div>
    );
}